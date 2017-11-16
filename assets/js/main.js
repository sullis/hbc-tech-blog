/* scripts */
document.addEventListener('DOMContentLoaded',function() {

    var App = {

        init: function() {
            this.bindEvents();
            LazyLoadArticleSnippets.setupScenes();
            LazyLoadArticleSnippets.articleAnimationTiming();
            Search.init();
        },

        bindEvents: function() {
            // document.getElementById('menu').click(console.log(this));
        }
    };

    var Search = {

        init: function() {

            var searchTerm = this.getQueryVariable('query');
            if (searchTerm) {
                document.getElementById('search-box').setAttribute("value", searchTerm);

                // Initalize lunr with the fields it will be searching on. I've given title
                // a boost of 10 to indicate matches on this field are more important.
                var idx = lunr(function () {
                    this.field('id');
                    this.field('title', { boost: 10 });
                    this.field('author');
                    this.field('category');
                    this.field('content');
                    this.field('date');

                    for (var key in window.store) { // Add the data to lunr
                        this.add({
                            'id': key,
                            'title': window.store[key].title,
                            'author': window.store[key].author,
                            'category': window.store[key].category,
                            'content': window.store[key].content,
                            'date': window.store[key].date
                        });
                    }
                });

                var results = idx.search(searchTerm); // Get lunr to perform a search
                this.displaySearchResults(results, window.store); // We'll write this in the next section
            }
        },

        displaySearchResults: function(results, store) {
            var searchTerm = this.getQueryVariable('query');
            var searchResults = document.getElementById('search-results');

            if (results.length) { // Are there any results?
                    
                var appendString = '<header class="page__header"><h1 class="page__title">'+ results.length +' matching results for "'+ searchTerm +'"</h1></header>';

                for (var i = 0; i < results.length; i++) {  // Iterate over the results
                    var item = store[results[i].ref];

                    appendString += 
                    '<section class="snippet">'+
                    '<div class="snippet__meta">'+
                        '<a class="meta__category-link" href="/category/'+ item.category +'">'+ item.category +'</a>'+
                        '<span class="meta__author">' + item.author +'</span>'+
                        '<span class="meta__date">' + item.date +'</span>'+
                    '</div>'+
                    '<h1 class="snippet__title"><a href="' + item.url + '" class="snippet__title__link" title="' + item.title +'">' + item.title +'</a></h1>'+
                    '<a href="' + item.url +'" class="snippet__excerpt__link" title="' + item.title +'"><p class="snippet__excerpt">' + item.content.substring(0, 150) +'</p></a>'+
                    '</section>';
                }

                searchResults.innerHTML = appendString;
            } else {
                searchResults.innerHTML = '<header class="page__header"><h1 class="page__title">No results found</h1></header>';
            }
        },

        getQueryVariable: function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');

                if (pair[0] === variable) {
                    return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                }
            }
        }
    };

    var LazyLoadArticleSnippets = {

        setupScenes: function() {
            var controller = new ScrollMagic.Controller({globalSceneOptions:{refreshInterval: 0}});               

            // show articles in article listing
            var articleSnippet = document.querySelectorAll('.snippet')
            this.staggerAnimationDelay(articleSnippet);

            articleSnippet.forEach(function(element, index) {

                new ScrollMagic.Scene({triggerHook: 1, triggerElement: element, offset: -250, reverse: false})
                    .setClassToggle(element, "snippet--reveal")
                    // .addIndicators({name: "snippet"})
                    .addTo(controller)
            });

            new ScrollMagic.Scene({triggerHook: 1, triggerElement: ".article__content__footer", offset: 400, reverse: false})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "recirc"})
                .addTo(controller)

            // show article share tools
            new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".article__content__title", reverse: false})
                .setClassToggle(".share-buttons__link-item", "share-buttons__link-item--reveal")
                .addTo(controller);

            new ScrollMagic.Scene({triggerHook: 0, offset: 120, reverse: true})
                // .setClassToggle(".site-header", "site-header--shaddow")
                .setClassToggle(".site-header", "site-header--minified")
                // .addIndicators({name: "header"})
                .addTo(controller);

            new ScrollMagic.Scene({triggerHook: 0, offset: 2, reverse: true})
                // .setClassToggle(".site-header", "site-header--shaddow")
                .setClassToggle(".site-header--sub-page", "site-header--sub-page--minified")
                // .addIndicators({name: "sub-page header"})
                .addTo(controller);

            new ScrollMagic.Scene({triggerHook: 0, offset: 150, reverse: true})
                .setClassToggle(".sticky-nav-meta", "sticky-nav-meta--show")
                // .addIndicators({name: "navigation (duration: 100)"})
                .addTo(controller);
        },

        articleAnimationTiming: function() {            
            this.staggerAnimationDelay(document.querySelectorAll(".share-buttons__link-item"));
            this.staggerAnimationDelay(document.querySelectorAll(".recirc__articles__item"));
        },

        staggerAnimationDelay: function(elmements) {
            var delay = 0;
            var offset = 100;

            elmements.forEach(function(element, index){
                element.style.animationDelay = delay + 'ms';
                // we only want to stagger what's visible and let scrollmagic triggers take care of the rest.
                if (index < 3) {                    
                    delay += offset;
                } else {
                    delay = 0;
                };
            });
        }
    }

    App.init();

});

