---
title: ODSC Workshop on Experimental Reproducibility in Data Science
author:
    - Karthik Rajasethupathy
    - Jason Tam
date: '2018-05-07'
categories:
- data science
tags:
- sacred
- data science
- python
- odsc2018
- workshop
- conferences
feature-image: experimental-reproducibility/experimental-reproducibility-unsplash.jpg
  credit: Photo by Katie Smith on Unsplash
  creditlink: https://unsplash.com/photos/uQs1802D0CQ
---

On May 2nd, we presented at the [Open Data Science Conference](https://odsc.com/boston) in Boston, MA. We demonstrated
how to build a machine learning project from scratch with [Sacred](https://github.com/IDSIA/sacred), an open source
library for experiment tracking, and how to view the results using
[Sacredboard](https://github.com/chovanecm/sacredboard).

# Workshop Abstract

There are ways to incorporate experimental reproducibility into machine learning projects that are clean and lightweight.
In this introductory level workshop, we demonstrate how to use Sacred to motivate reproducible research and
experiment monitoring in machine learning. We discuss how this enables any data scientist to provide a solution
(a model or set of predictions) to any problem, compare their solution to previous models results on the same test
data, and select the best model for production. Finally, we provide examples of machine learning problems in retail
and demonstrate how data scientists can easily work across multiple problems.

# What is Experimental Reproducibility

Specifying the inputs, contexts, and steps involved in producing a result such that one can execute those
instructions _and_ produce the same result.

# Machine Learning is Experiments

You might be thinking, what is the connection between machine learning and experiments? Well, every time we build a
model, we’re making hypotheses on which data to use for training and testing, pre-processing steps to apply, features
and/or architectures to engineer, and learning algorithm(s) to use that will best fit our training data and generalize
to unseen data.

Additionally, we’re running these experiments from dynamic and (sometimes) complex code bases, on computing environments
with a whole another host of specifications.

So, while we are not working in a wetlab, we’re definitely running experiments and making many decisions that should
be recorded!

# Why do we need an approach to this

Adhoc efforts at tracking experiments are **incomplete**, and **messy**.

**Incomplete**: It becomes very hard to annotate everything that we want to track: the version of the code we're
running; logging the config that we're using for a particular run of an experiment (from the steps used for
preprocessing to the hyperparameters used in the model); the specifications of the host where the experiment is run;
and so on...

**Messy**: We want this information to be logged in such a way that we can easily add new parameters to track (without
having to change a lot of code) and search through experiments that we've already tried. Looking through pages of a
notebook, or scanning excel sheets stored in various folders is not an efficient and desirable way to do this.

# What should we track to make Machine Learning reproducible?

We suggest tracking the following:

- Version Control: What is the git hash of the repository when we run the experiment? Is the code that was run in a
*dirty* state (some local changes)? To take this a step further, can we just store the source code that we ran?

- Config: This might include (but is not limited to) which data is loaded for training/testing, preprocessing steps,
learning algorithms, hyperparameters, etc

- Seed: Set/store a global seed so that any functions that have some randomness yield consistent results.

- Results: Store the performance of each run so that we can compare different experimental runs
and select the best model. For certain models, we may also want to track its performance for each training
step.

# Enter Sacred

Sacred makes this possible. Sacred is a tool that is designed to introduce experimental reproducibility into
projects with very little overhead. There's 3 actors in the Sacred ecosystem: **Ingredients**, **Experiments**, and
**Observers**.

We can define **Ingredients**:

```python
from Sacred import Ingredient

name_ingredient = Ingredient('name')

@name_ingredient.config
def config():
    first = "Jane"
    last = "Doe"

@name_ingredient.capture
def fullname(first, last):
    return "Jane" + " " + "Doe"

```

We can define an **Experiment** that uses Ingredients to produce some outcome that we wish to record:

```python
from Sacred import Experiment
from my_ingredients import name_ingredient, fullname

greeting_ex = Experiment('greeting_experiment', ingredients=[name_ingredient])

@greeting_ex.config
def config():
    greeting = "Hello"

@greeting_ex.automain
def run(greeting):
    return greeting + ", " + fullname()

```

Finally, we can run this experiment from the command line with an **Observer** (e.g. a mongo server), which will record
everything we have explicitly indicated that we wish to track (any parameter defined in a function with an
`@Ingredient.config` decorator), along with what Sacred implicitly tracks (source code, version control info, seed,
host info, etc). Assuming the experiment code above is written in a file called `greeting_experiment.py`:

```bash
python greeting_experiment.py -m sacred
```

The `-m sacred` parameter specifies that the observer should record everything to the sacred db in a local mongo
instance. Sacred has a powerful command line tool in which we can modify the values of parameters before an experiment
run.

```bash
python greeting_experiment.py -m sacred with greeting_experiment.greeting=Goodbye
```

This will return the result `Goodbye, Jane Doe`.

Sacred is an extremely lightweight and powerful tool - we urge you to check out
[Sacred](https://github.com/IDSIA/sacred), and our presentation materials for more examples of how to use Sacred in
machine learning with a variety of examples including hyperparmater optimization and model blending.

## Materials

Examples using Sacred to do reproducible machine learning on [titanic survivorship](https://www.kaggle.com/c/titanic)
are available here:

- [Repository](https://github.com/gilt/odsc-2018)
- [Slides](https://github.com/gilt/odsc-2018/blob/master/slides.pdf)
