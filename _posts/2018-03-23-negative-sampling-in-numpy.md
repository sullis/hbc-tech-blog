---
title: Negative Sampling (in Numpy)
description: Alright, time to have some fun exploring efficient negative sampling implementations in NumPy...
author: Jason Tam

date: '2018-03-23'

categories:
- data science
#
tags:
- numpy
- sampling
- python
- algorithms
---

_Alright, time to have some fun exploring efficient negative sampling implementations in NumPy..._

Negative sampling is a technique used to train machine learning models that generally have several order of magnitudes more negative observations compared to positive ones. And in most cases, these negative observations are not given to us explicitly and instead, must be generated somehow. Today, I think the most prevalent usages of negative sampling is in training Word2Vec (or similar) and in training implicit recommendation systems (BPR). In this post, I’m going to frame the problem under the recommendation system setting — sorry NLP fans.

# Problem

For a given user, we have the indices of positive items corresponding to that user. These are items that the user has consumed in the past. We also know the fixed size of the entire item catalog. Oh, we will also assume that the given positive indices are ordered. This is quite a reasonable assumption because positive items are often stored in CSR interaction matrices (err… at least in the world of recommender systems).

And from this information, we would like to sample from the other (non-positive) items with equal probability.

```python
n_items = 10
pos_inds = [3, 7]
```

item_ind  |  Probability 
----------|--------------
0     |    1/8 
1     |    1/8 
2     |    1/8 
3     |     0 
4     |    1/8 
5     |    1/8 
6     |    1/8 
7     |     0 
8     |    1/8 
9     |    1/8 

# Bad Ideas

We could enumerate all the possible choices of negative items and then use `np.random.choice` (or similar). However, as there are usually orders of magnitude more negative items than positive items, this is not memory friendly.

# Incremental Guess and Check

As a trivial (but feasible) solution, we are going to continually sample a random item from our catalog, and keep items if they are not positive. This will continue until we have enough negative samples.

```python
def negsamp_incr(pos_check, pos_inds, n_items, n_samp=32):
    """ Guess and check with arbitrary positivity check
    """
    neg_inds = []
    while len(neg_inds) < n_samp:
        raw_samp = np.random.randint(0, n_items)
        if not pos_check(raw_samp, pos_inds):
            neg_inds.append(raw_samp)
    return neg_inds
```

A major downside here is that we are sampling a single value many times — rather than sampling many values once. And although it will be infrequent, we have to re-sample if we get unlucky and randomly choose a positive item.

This family of strategies will pretty much only differ by how item positivity is checked. We will go through a couple of ways to tinker with the complexity of the positivity check, but keep in mind that the number of positive items is generally small, so these modifications are actually not super-duper important.

## Using `in` operator on the raw list:

With a `list`, the item positivity check is O(n) as it checks every element of the list.

```python
def negsamp_incr_naive(pos_inds, n_items, n_samp=32):
    """ Guess and check with list membership
    """
    pos_check = lambda raw_samp, pos_inds: raw_samp in pos_inds
    return negsamp_incr(pos_check, pos_inds, n_items, n_samp)
```

## Using `in` operator on a set created from the list:

Here, we’re going to first convert our `list` into a python `set` which is implemented as a hashtable. Insertion is O(1), so the conversion itself is O(n). However, once the set is created, our item positivity check (set membership) will be O(1) thereon after. So we can expect this to be a nicer strategy if `n_samp` is large.

```python
def negsamp_incr_set(pos_inds, n_items, n_samp=32):
    """ Guess and check with hashtable membership
    """
    pos_inds = set(pos_inds)
    pos_check = lambda raw_samp, pos_inds: raw_samp in pos_inds
    return negsamp_incr(pos_check, pos_inds, n_items, n_samp)
```

## Using a binary search on the list (assuming it’s sorted):

One of best things you can do exploit the sortedness of a list is to use binary search. All this does is change our item positivity check to O(log(n)).

```python
from bisect import bisect_left
def bsearch_in(search_val, val_arr):
    i = bisect_left(val_arr, search_val)
    return i != len(val_arr) and val_arr[i] == search_val
    
def negsamp_incr_bsearch(pos_inds, n_items, n_samp=32):
    """ Guess and check with binary search
    `pos_inds` is assumed to be ordered
    """
    pos_check = bsearch_in
    return negsamp_incr(pos_check, pos_inds, n_items, n_samp)
```

(Aside: LightFM, a popular recommendation system implements this in Cython. They also have a good reason to implement this in a sequential fashion — but we won’t go into that.)


## Vectorized Binary Search

Here we are going to address the issue of incremental generation. All random samples will now be generated and verified in vectorized manners. The upside here is that we will reap the benefits of NumPy’s underlying optimized vector processing. Any positives found during this check will then be masked off. A new problem arises in that if we hit any positives, we will end up returning less samples than prescribed by the `n_samp` parameter. Yeah, we could fill in the holes with the previously discussed strategies, but let’s just leave it at that.

```python
def negsamp_vectorized_bsearch(pos_inds, n_items, n_samp=32):
    """ Guess and check vectorized
    Assumes that we are allowed to potentially 
    return less than n_samp samples
    """
    raw_samps = np.random.randint(0, n_items, size=n_samp)
    ss = np.searchsorted(pos_inds, raw_samps)
    pos_mask = raw_samps == np.take(pos_inds, ss, mode='clip')
    neg_inds = raw_samps[~pos_mask]
    return neg_inds
```

## Vectorized Pre-verified Binary Search

Finally, we are going to address both main pitfalls of the guess-and-check strategies.

Vectorize: generate all our random samples at once
Pre-verify: no need for an item positivity check
We know how many negative items are available to be sampled since we have the size of our item catalog, and the number of positive items ( `len(pos_inds)` is just O(1) ) to subtract off. So let’s sample uniformly over a range of imaginary negative indices with 1–1 correspondence with our negative items. This gives us the correct distribution since we have the correct number of negative item slots to sample from; however, the indices now need to be adjusted.

To fix our imaginary index, we must add the number of positive items that precede each position. Assuming our positive indices are sorted, this is just a binary search (compliments of np.searchsorted). But keep in mind that in our search, for each positive index, we also need to subtract the number of positive items that precede each position.

```python
def negsamp_vectorized_bsearch(pos_inds, n_items, n_samp=32):
    """ Pre-verified with binary search
    `pos_inds` is assumed to be ordered
    """
    raw_samp = np.random.randint(0, n_items - len(pos_inds), size=n_samp)
    pos_inds_adj = pos_inds - np.arange(len(pos_inds))
    ss = np.searchsorted(pos_inds_adj, raw_samp, side='right')
    neg_inds = raw_samp + ss
    return neg_inds
```

Briefly, let’s look at how this works for all possible raw sampled values.

```python
n_items = 10
pos_inds = [3, 7]
# raw_samp = np.random.randint(0, n_items - len(pos_inds), size=n_samp)
# Instead of sampling, see what happens to each possible sampled value
raw_samp = np.arange(0, n_items - len(pos_inds))
raw_samp: array([0, 1, 2, 3, 4, 5, 6, 7])
# Subtract the number of positive items preceding
pos_inds_adj = pos_inds - np.arange(len(pos_inds))
pos_inds_adj: array([3, 6])
# Find where each raw sample fits in our adjusted positive indices
ss = np.searchsorted(pos_inds_adj, raw_samp, side='right')
ss: array([0, 0, 0, 1, 1, 1, 2, 2])
# Adjust our raw samples
neg_inds = raw_samp + ss
neg_inds: array([0, 1, 2, 4, 5, 6, 8, 9])
```

As desired, each of our sampled values has a 1–1 mapping to a negative item.

## Summary Notebook with Results

The notebook linked below compares the implementations discussed in this post in some example scenarios. The previously discussed “Vectorized Pre-verified Binary Search” strategy seems to be the most performant except in the edge case where `n_samp=1` where vectorization no longer pays off (in that case, all strategies are very close).

[Notebook with results](https://gist.github.com/JasonTam/89ff752d7e35ec17d730c87aea96c19b#file-neg_samp_experiments-ipynb)

## Concluding Remarks

In models that require negative sample, the sample stage is often a bottleneck in the training process. So even little optimizations like this are pretty helpful.

Some further thinking:

* how to efficiently sample for many users at a time (variable length number of positive items)
* at what point (sparsity of our interaction matrix) does our assumption that `n_neg_items >> n_pos_items` wreck each implementation
* how easy is it to modify each implementation to accommodate for custom probability distributions — if we wanted to take item frequency or expose into account
