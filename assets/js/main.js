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
            this.updateArticleCSS();
	    	this.updateShareButtonsCSS();
	    },

	    setupScenes: function() {
	    	var controller = new ScrollMagic.Controller({globalSceneOptions:{refreshInterval: 0}});               

            // show articles in article listing
            $(".article-listing .snippet").each(function(index) {
                var snippet = this;
                var delay;

                if (index === 2 ) {
                    delay = "-50";
                } else {
                    delay = "-200";
                }

                new ScrollMagic.Scene({triggerHook: 1, triggerElement: snippet, offset: delay, reverse: false})
                    .setClassToggle(this, "snippet--reveal")
                    // .addIndicators({name: "snippet"})
                    .addTo(controller)
            });

            // show recirc articles in article footer
            new ScrollMagic.Scene({triggerHook: 1, triggerElement: ".article__content__footer", offset: 400, reverse: false})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "recirc"})
                .addTo(controller)

            // show article share tools
			new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".article__content__title", reverse: false})
	            .setClassToggle(".share-buttons__link-item", "share-buttons__link-item--reveal")
                .addTo(controller);

            // Scale sticky header
            new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".content", duration: 100, offset: 0, reverse: true})
                .setTween(".site-header", {height: "65px", boxShadow: "rgb(204, 204, 204) 0px 1px 3px;"})
                // .addIndicators({name: "header (duration: 100)"})
                .addTo(controller);
            new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".content", duration: 0, offset: 0, reverse: true})
                .setClassToggle(".site-header__logo", "site-header__logo--scaled")
                // .addIndicators({name: "header__logo (duration: 0)"})
                .addTo(controller);
            new ScrollMagic.Scene({triggerHook: 0.05, triggerElement: ".content", duration: 100, offset: 0, reverse: true})
                .setTween(".navigation", {margin: "10px 30px 0 0"})
                // .addIndicators({name: "navigation (duration: 100)"})
                .addTo(controller);
        },

        updateArticleCSS: function() {
            var delay = 50;
            var offset = 100;

            $(".recirc__articles__item").each(function(){
                $(this).css({
                    'animation-delay': delay + 'ms'
                });

                delay += offset;
            });
        },

	    updateShareButtonsCSS: function() {
            var delay = 50;
            var offset = 100;
            
            $(".share-buttons__link-item").each(function() {
				$(this).css({
	                'animation-delay': delay + 'ms'
	            });

                delay += offset;
            });
        }
    }

    App.init();

});
