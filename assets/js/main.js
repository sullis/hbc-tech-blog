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
	    	this.setupScene();
	    	this.updateArticleCSS();
	    },

	    setupScene: function() {

	    	var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 0, reverse: false}});

			new ScrollMagic.Scene({triggerElement: ".article__content__footer"})
	            .setClassToggle(".recirc__articles__item", "reveal")

            .addTo(controller);
        },

	    updateArticleCSS: function() {
            var delay = 100;
            var offset = 150;
            var $articles = $(".recirc__articles__item");

            _.each($articles, function(recircItem, index) {
				$(recircItem).css({
	                'animation-delay': delay + 'ms'
	            });

                delay += offset;
            });
        }
    }

    App.init();

});
