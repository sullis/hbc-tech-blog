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

// , globalSceneOptions: {duration: 0, reverse: false, refreshInterval: 0}
	    	var controller = new ScrollMagic.Controller({loglevel: 0, refreshInterval: 0});

            // show recirc articles in article footer
            new ScrollMagic.Scene({triggerElement: ".article__content__footer", offset: -100, reverse: false, refreshInterval: 0})
                .setClassToggle(".recirc__articles__item", "reveal")
                // .addIndicators({name: "1 (duration: 0)"})
                .addTo(controller);

            // show article share tools
			new ScrollMagic.Scene({triggerElement: ".article__content__title", offset: 800, reverse: false, refreshInterval: 0})
	            .setClassToggle(".share-buttons__link-item", "share-buttons__link-item--reveal")
                .addTo(controller);

            // Scale sticky header
            new ScrollMagic.Scene({triggerElement: ".content", duration: 200, offset: 350, refreshInterval: 0})
                .setTween(".site-header", {height: "65px", boxShadow: "rgb(204, 204, 204) 0px 1px 3px;"},)
                // .addIndicators({name: "1 (duration: 200)"})
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: ".content", duration: 100, offset: 300, refreshInterval: 0})
                .setTween(".site-header__logo", {scale: 0.7, margin: "10px 0 10px 20px"})
                // .setClassToggle(".site-header__logo", "site-header__logo--scale")
                // .addIndicators({name: "2 (duration: 200)"})
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: ".content", duration: 200, offset: 400, refreshInterval: 0})
                .setTween(".navigation", {margin: "10px 30px 0 0"})
                // .addIndicators({name: "3 (duration: 200)"})
                .addTo(controller);
        },

        updateArticleCSS: function() {
            var delay = 50;
            var offset = 100;
            var $articles = $(".recirc__articles__item");

            _.each($articles, function(recircItem, index) {
                $(recircItem).css({
                    'animation-delay': delay + 'ms'
                });

                delay += offset;
            });
        },

	    updateShareButtonsCSS: function() {
            var delay = 50;
            var offset = 100;
            var $shareButtons = $(".share-buttons__link-item");

            _.each($shareButtons, function(button, index) {
				$(button).css({
	                'animation-delay': delay + 'ms'
	            });

                delay += offset;
            });
        }
    }

    App.init();

});
