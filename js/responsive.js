
(function($,sr){
 
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          }
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 500); 
      };
  };
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
}(jQuery,'smartresize'));

/*
 * All java script logic for the mobile layout.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */
(function(app, $, undefined) {
	
	app.responsive = {
	
		mobileLayoutWidth : 767,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					homepageSlider: $('#homepage-slider'),
					mobileNav : $('#mobile-nav'),
					accordionUl : $('ul.menu-category-mobile')
				};
			
			app.responsive.removeLayoutStyle();
			
			// toggle menu element
			$cache.mobileNav.off('click')
				.on('click',function(e){
					e.preventDefault();
					DieselUS.ui.responsiveHeader.reset($(this).attr('data-target'));
					jQuery('.header-nav-arrow').slideToggle();
					jQuery('.header-menus').find('.menu-category-mobile').slideToggle(400,function(){
						var pageName = $("#wrapper").data('pagename');
						if(pageName == 'Homepage') {
							if($(".header-menus .menu-category-mobile").is(":visible")){
								$("#wrapper").append("<div class='ui-widget-overlay menu-overlay'></div>");
								$(".ui-widget-overlay").css({
									"width":"100%",
									"height":$("body").height(),
									"z-index":4
								});
								
								$("#header").css({
									"position":"relative",
									"z-index":8
								});
							}
							else {
								$(".menu-overlay").remove();
								$("#header").css({
									"position":"static",
									"z-index":"auto"
								});
								
							}
						}
						
					});	
					
					
				});
			


			// check onload to see if mobile enabled
			if( $cache.wrapper.width() <= this.mobileLayoutWidth ) {
				app.responsive.enableMobileNav();
				app.responsive.disableMobileLeftNav();
			}
			
		},		
		// build vertical, collapsable menu
		enableMobileNav : function(){
			var level1 = $('.menu-category-mobile > li'),
				level2 = $('.menu-category-mobile ul.mobile-level-2'),
				level3 = $('.menu-category-mobile ul.mobile-level-3'),
				level4 = $('.menu-category-mobile ul.mobile-level-4'),
				level5 = $('.menu-category-mobile ul.mobile-level-5'),
				_this  = this,
				_selected_el_class = 'open';
			$(".menu-category-mobile li:not(:has('ul'))").addClass("empty-child");
			
			$('.menu-category-mobile.level-1 li > a.level-1').unbind('click').click(function(e){
				e.preventDefault();
				_this.accordion($(this),level2,_selected_el_class);
			});
			$('.mobile-level-2 > li > a').unbind('click').click(function(e){
				e.preventDefault();
				_this.accordion($(this),level3,_selected_el_class);
			});
			$('.mobile-level-3 > li > a').unbind('click').click(function(e){
				e.preventDefault();
				_this.accordion($(this),level4,_selected_el_class);
			});
			$('.mobile-level-4 > li > a').unbind('click').click(function (e) {
				e.preventDefault();
				_this.accordion($(this), level5, _selected_el_class);
			});
		},
		accordion : function (_this,level,_expand_class) {
			if (_this.parent().children('ul').length === 0) {
				window.location = _this.attr('href');
				return true;
			}
			_this.each(function(k){
				var child = _this.parent().parent().children('li').children('a');
				if(child.hasClass(_expand_class)) {child.removeClass(_expand_class);}
			});

			level.slideUp();
			if (_this.next().css('display') === 'none') {
				if (_this.hasClass(_expand_class)) {_this.removeClass(_expand_class);}
				_this.addClass(_expand_class);
				_this.next().slideDown();
				
			}else{
				if(_this.hasClass(_expand_class)) {_this.removeClass(_expand_class);}
				_this.next().slideUp();
			}
			return false;
		},		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			$cache.navigation.find('.menu-category').show();
			$cache.navigation.find('.menu-category-mobile').hide();
			if($("#wrapper .menu-overlay").length > 0){$("#wrapper .menu-overlay").remove();}
			$(".diesel-mobile-nav .header-nav-arrow").hide();
			
		},
		
		// pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
			if($cache.homepageSlider.length > 0){
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
			}
		},
		
		disableMobileLeftNav: function() {
		    //nest according to the page 
			$('#primary .refinements-filter').show();
			$('#main').on('click','.refinements .refinements-filter a',function(e){				
					e.preventDefault();					
					$('#primary').css('height','auto').show();
					$('#secondary .refinement').hide();			
			});
			$('#main').on('click','.search-result-options .refinements-filter a',function(e){			
					e.preventDefault();
					$('#secondary').css('height','auto').show();	
					$('#secondary .refinement').show();				
			});
		},
		removeLayoutStyle: function(){
			if(scriptIsmobile()){
				$("body").removeClass("layout1024");
				$("body").removeClass("layout1280");
			} 
		}
	};
	
	$(document).ready(function(){
		
		app.responsive.init();
		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if((screen.width > 767 && screen.height < 767) ||(screen.width < 767 && screen.height > 767)){ //screen like kindle7 or nexus 7
			
			$(window).smartresize(function(){
				app.responsive.init();
				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
					app.responsive.enableMobileNav();
					app.responsive.rebuildHomepageSlides();
				}
				else {
					app.responsive.disableMobileNav();
					app.responsive.rebuildHomepageSlides();
				}
	
			});
		
		}

	});
		
}(window.app = window.app || {}, jQuery));