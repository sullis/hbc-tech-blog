/* scripts */

$(document).ready(function() {

	var App = {

        init: function() {
            this.bindEvents();
            LazyLoadRecircArticles.init();
        },

        bindEvents: function() {
            // set listeners for mouse events
        }
    }

    var LazyLoadRecircArticles = {

	    init: function() {
	    	this.setupScenes();
            this.articleAnimationTiming();
	    	this.randomizeArticleHeaderColors();
	    },

	    setupScenes: function() {
	    	var controller = new ScrollMagic.Controller({globalSceneOptions:{refreshInterval: 0}});               

            // show articles in article listing
            this.staggerAnimationDelay($(".snippet"));
            $(".snippet").each(function(index, element) {    

                new ScrollMagic.Scene({triggerHook: 1, triggerElement: element, offset: -250, reverse: false})
                    .setClassToggle(element, "snippet--reveal")
                    // .addIndicators({name: "snippet"})
                    .addTo(controller)
            });

            // show recirc articles in article footer
            // this scene is almost redundant
            new ScrollMagic.Scene({triggerHook: 1, triggerElement: ".article__content__footer", offset: 400, reverse: false})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "recirc"})
                .addTo(controller)

            // show article share tools
			new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".article__content__title", reverse: false})
	            .setClassToggle(".share-buttons__link-item", "share-buttons__link-item--reveal")
                .addTo(controller);

            // Scale sticky header
            new ScrollMagic.Scene({triggerHook: 0, duration: 100, offset: 10, reverse: true})
                .setTween(".site-header", {height: "65px", boxShadow: "rgb(204, 204, 204) 0px 1px 3px;"})
                // .addIndicators({name: "header (duration: 100)"})
                .addTo(controller);
            new ScrollMagic.Scene({triggerHook: 0, offset: 50, reverse: true})
                .setClassToggle(".site-header__logo", "site-header__logo--scaled")
                // .addIndicators({name: "header__logo (duration: 0)"})
                .addTo(controller);
            new ScrollMagic.Scene({triggerHook: 0, duration: 100, offset: 50, reverse: true})
                .setTween(".navigation", {margin: "13px 30px 0 0"})
                // .addIndicators({name: "navigation (duration: 100)"})
                .addTo(controller);
            new ScrollMagic.Scene({triggerHook: 0, triggerElement: ".article__content__title", offset: 50, reverse: true})
                .setClassToggle(".sticky-nav-title", "sticky-nav-title--show")
                // .addIndicators({name: "navigation (duration: 100)"})
                .addTo(controller);
        },

        randomizeArticleHeaderColors: function() {
            var $headerBackgroundElm = $(".article__no-feature-image");
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

            $($headerBackgroundElm).css({background: "linear-gradient(to bottom right, " + randomBrandColor1 + ", " + randomBrandColor2});
        },

        articleAnimationTiming: function() {            
            this.staggerAnimationDelay($(".share-buttons__link-item"));
            this.staggerAnimationDelay($(".recirc__articles__item"));
        },

        staggerAnimationDelay: function($elmements) {
            var delay = 0;
            var offset = 100;

            $elmements.each(function(index){
                $(this).css({
                    'animation-delay': delay + 'ms'
                });

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
