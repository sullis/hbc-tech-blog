/* scripts */
document.addEventListener('DOMContentLoaded',function() {

    // GLOBAL VARS
    var isNavOpen = false;
    var isSearchOpen = false;
    var searchToggle = document.getElementById('header-search__toggle');
    var siteHeader = document.getElementById('site-header');
    var searchInput = document.getElementById('header-search-input');
    var searchResults = document.getElementById('header-search__results');
    var mobileMenu = document.getElementById('menu');


    var App = {

        init: function() {
            this.bindEvents();
            LazyLoadArticleSnippets.setupScenes();
            LazyLoadArticleSnippets.articleAnimationTiming();
            Search.init();
            Utils.randomizeArticleHeaderColors();
        },

        bindEvents: function() {
            mobileMenu.addEventListener("click", NavEvents.toggleNav, false);
            searchToggle.addEventListener("click", NavEvents.toggleSearch, false);

            // if user hits esc key, close search 
            searchInput.addEventListener('keyup', event => {
                if (event.keyCode === 27) {
                    App.setView("default");
                }
            });

            searchInput.onblur = function(event) {
                // delayed reset because blur event fires before mouse events.
                // Timeout allows user to click a search link and navigate before UI reset.
                setTimeout(NavEvents.delayedReset, 200);
            };
        },

        // this controls all the view displays.
        setView: function(view) {

            if (view === "search") {
                if (isSearchOpen === true) {
                    searchInput.focus();
                    siteHeader.className += ' ' + 'header-search--active';
                    mobileMenu.className = 'navigation';

                    isNavOpen = false;

                } else {
                    // reset UI
                    searchInput.blur();
                    siteHeader.className = 'site-header';
                    // clear out prev search query
                    searchInput.value = '';
                    searchInput.placeholder = ' Search';
                    searchResults.innerHTML = '';
                    searchResults.className = 'header-search__results';
                }

            } else if (view === "nav") {
                if (isNavOpen === true) {
                    siteHeader.className += ' ' + 'navigation--open';
                    
                    if(isSearchOpen) { NavEvents.toggleSearch() };

                } else {
                    // reset UI
                    siteHeader.className = 'site-header';
                }

            } else if (view === "default") {
                // reset for BOTH search UI and the mobile menu
                searchInput.blur();
                siteHeader.className = 'site-header';
                // clear out prev search query
                searchInput.value = '';
                searchInput.placeholder = '';
                searchResults.innerHTML = '';
                searchResults.className = 'header-search__results';

            }
        }
    };

    // the menu icon (only displayed below desktop breakpoints) 
    // and the search icon have listeners that call these functions on click
    var NavEvents = {

        toggleNav: function(evt) {
            isNavOpen = !isNavOpen;
            App.setView("nav");
        },

        toggleSearch: function(evt) {
            isSearchOpen = !isSearchOpen;
            App.setView("search");

            // this is redundant because of safari
            if (isSearchOpen === true) {
                searchInput.focus();
            }
        },

        delayedReset: function() {
            isSearchOpen = false;
            App.setView("search");
        }
    };

    // init constructor class to handle fuzy search
    var Search = {

        init: function() {

            const headerSearch = new jekyllSearch(
                'https://saksdirect.github.io/hbc-tech-blog/search.json',
                '#header-search-input',
                '#header-search__results'
            );

            headerSearch.init();
        },

        displayResults: function() {
            // animate show results
            var results = document.querySelectorAll('.header-search--active__results .snippet')

            results.forEach(function(element, index) {
                element.className += ' ' + 'snippet--reveal';
            });
        }
    };

    var Utils = {

        randomizeArticleHeaderColors: function() {
            
            var colorsArray = [
                "#00704a",
                "#b30838",
                "#eeb211",
                "#00274c",
                "#00704a",
                "#b30838",
                "#eeb211",
                "#00274c"
            ];

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var randomBrandColor1 = colorsArray[getRandomInt(0, 8)];
            var randomBrandColor2 = colorsArray[getRandomInt(0, 8)];
            var headerBackground = document.getElementById("no-image-placeholder");

            if (headerBackground) {
                headerBackground.style.background = 'linear-gradient(to bottom right, ' + randomBrandColor1 + ',' + randomBrandColor2;
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
                    .addTo(controller);
            });

            new ScrollMagic.Scene({triggerHook: 1, triggerElement: ".article__content__footer", offset: 400, reverse: false})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "recirc"})
                .addTo(controller);

            // show article share tools
            new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".article__content", reverse: false})
                .setClassToggle(".share-buttons__link-item", "share-buttons__link-item--reveal")
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

