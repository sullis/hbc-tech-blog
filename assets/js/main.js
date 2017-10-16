/* scripts */
document.addEventListener('DOMContentLoaded',function() {

    var App = {

        init: function() {
            this.bindEvents();
            LazyLoadRecircArticles.setupScenes();
            LazyLoadRecircArticles.articleAnimationTiming();
        },

        bindEvents: function() {
            // set listeners for mouse events
            // document.body.onscroll = ScrollEvents.toggleClass();
            // document.querySelector('.container').onscroll = function() {
            //     ScrollEvents.toggleClass();
            // }
        }
    }

    // replacing scrollmagic with the following
    // var ScrollEvents = {

    //     // listen for watched elements to move off the screen and toggle a class
    //     toggleClass: function() {

    //         var scrollTop = document.body.scrollTop;

    //         // watched elements
    //         var articleTitle = document.querySelector('.article__content__title');
    //         var siteHeader = document.querySelector('.site-header');

    //         var watchedElements = [
    //             articleTitle,
    //             siteHeader
    //         ];

    //         var targetElement = watchedElements[0].getBoundingClientRect();

    //         // console.log("scrollTop: " + scrollTop + " articleTitlePosition: " + articleTitlePosition.top);

    //         if (scrollTop > targetElement.top) {
    //             console.log("the " + watchedElements[0].className + " is off the screen");
    //         } else {
    //             console.log("we can see the " + watchedElements[0].className);
    //         }
    //     }
    // }

    var LazyLoadRecircArticles = {

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

            new ScrollMagic.Scene({triggerHook: 0, offset: 60, delay:1, reverse: true})
                // .setClassToggle(".site-header", "site-header--shaddow")
                .setClassToggle(".site-header", "site-header--shaddow")
                // .addIndicators({name: "header (duration: 100)"})
                .addTo(controller);

            new ScrollMagic.Scene({triggerHook: 0, offset: 60, reverse: true})
                .setClassToggle(".sticky-nav-meta", "sticky-nav-meta--show")
                // .addIndicators({name: "navigation (duration: 100)"})
                .addTo(controller);
        },

        randomNumber: function() {

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
                    deslay = 0;
                };
            });
        }
    }

    App.init();

});

