/* scripts */
document.addEventListener('DOMContentLoaded',function() {

    // GLOBAL VARS
    var isNavOpen = false;
    var isSearchOpen = false;

    var App = {

        init: function() {
            this.bindEvents();
            LazyLoadArticleSnippets.setupScenes();
            LazyLoadArticleSnippets.articleAnimationTiming();
            SearchEvents.init();
        },

        bindEvents: function() {
            document.getElementById('nav').addEventListener("click", NavEvents.toggleNav, false);
            document.getElementById('header-search__svg').addEventListener("click", SearchEvents.toggleSearch, false);
        },

        setView: function(view) {

            if (view === "search") {

                var searchContainer = document.getElementById('header-search');
                var searchInput = document.getElementById('header-search-input');
                var searchResults = document.getElementById('header-search__results');

                if (!isSearchOpen) {
                    isSearchOpen = true;
                    searchContainer.className += ' ' + 'header-search--active';

                    if(isNavOpen) { this.setView("nav") };
                } else {
                    isSearchOpen = false;
                    searchContainer.className = 'header-search';
                    searchResults.innerHTML = '';
                }

            } else if (view === "nav") {

                var navContainer = document.getElementById('nav');
                
                if (!isNavOpen) {
                    isNavOpen = true;
                    navContainer.className += ' ' + 'navigation--open';
                    if(isSearchOpen) { this.setView("search") };
                } else {
                    isNavOpen = false;
                    navContainer.className = 'navigation';
                }
            }
        }
    };

    var NavEvents = {

        toggleNav: function(evt) {
            App.setView("nav");
        }
    };

    var SearchEvents = {

        init: function() {

            const siteSearch = new jekyllSearch(
                '/search.json',
                '#search-input',
                '#search-results'
            );

            const headerSearch = new jekyllSearch(
                '/search.json',
                '#header-search-input',
                '#header-search__results'
            );

            headerSearch.init();
            siteSearch.init();
        },

        toggleSearch: function(evt) {
            App.setView("search");
        },

        displayResults: function() {
            // animate show reults
            var results = document.querySelectorAll('.header-search--active__results .snippet')

            results.forEach(function(element, index) {
                element.className += ' ' + 'snippet--reveal';
            });
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
                    .addTo(controller);
            });

            new ScrollMagic.Scene({triggerHook: 1, triggerElement: ".article__content__footer", offset: 400, reverse: false})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "recirc"})
                .addTo(controller);

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

