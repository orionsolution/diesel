/**
 *
 * All java script logic for the application. (c) 2009-2012 Demandware Inc.
 * Subject to standard usage terms and conditions The code relies on the jQuery
 * JS library to be also loaded. For all details and documentation:
 * https://github.com/Demandware/Site-Genesis
 */
// semi-colon to assure functionality upon script concatenation and minification
window.sblSliderss = [];
// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
  var s = document.createElement('script');
  s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
  s.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(s);
}
/** @namespace */
var app = (function(app, $) {
  // allows the use of $ within this function without conflicting with other
  // JavaScript libraries which are using it (JQuery extension)
  document.cookie = "dw=1";
  //  window.shuffleplp=0;
  window.pckry = $($('.packery')[0]);
  window.pckry_dbg = $($('.packery')[1]);
  window.storeLocalplp = new Persist.Store('pdptoplp');
  /** ****** private functions & vars ********* */
  /**
   * @private
   * @function
   * @description Cache dom elements which are being accessed multiple times.<br/>app.ui
   *              holds globally available elements.
   */
  function initUiCache() {
    app.ui = {
      searchContainerNew: $('.header-search-content #search'),
      searchContainer: $("#header .header-search"), //Old search Container
      searchIconId: $(".header-search-icon"),
      searchCloseId: $("#header-search-close-icon"),
      searchDownIcon: $(".header-search-arrow"),
      printPage: $("a.print-page"),
      main: $("#main"),
      primary: $("#primary"),
      secondary: $("#secondary"),
      // elements found in content slots
      slots: {
        subscribeEmail: $(".subscribe-email")
      },
      filterPosition: 0,
      currentSelectedFilter: null,
      selectedFilterMobile: null,
      clickedFilterType: "default",
      currentFilterOpenState: false,
      lastfilter: true
    };
    if ($(".search-result-options .result-options-right .current-page-label").length > 0) {
      //	app.ui.plptotaldata=$(".search-result-options .result-options-right .current-page-label").html().split('/')[0].trim("") ;
      //	 storeLocalplp.set('plpcountpdp',app.ui.plptotaldata);
      if ($("#" + storeLocalplp.get("plptileid")).length > 0) {}
    }
    $(document).on("click", ".search-result-content .grid-tile .product-tile-content .product-view-container li a", function(e) {
      e.preventDefault();
      window.plpid = $(this).parent().parent().attr("id");
      if ($($("#" + storeLocalplp.get("plptileid"))).parents().find(".dbg_section").hasClass("dbg_section")) {
        storeLocalplp.set('plpsection', "dbg");
      }
      storeLocalplp.set('plptileid', plpid);
      window.urlplp = window.location.href;
      storeLocalplp.set('plpwindowurl', urlplp);
      storeLocalplp.set('plptopdp', 'true');
      location.href = this.href;
    });
  }
  /**
   * @private
   * @function
   * @description Apply dialogify event handler to all elements that match one
   *              or more of the specified selectors.
   */
  function initializeEvents() {
    var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];
    $("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify).on("keydown", "textarea[data-character-limit]", function(e) {
      var text = $(this).val(),
        charsLimit = $(this).data("character-limit"),
        charsUsed = text.length;
      if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {
        e.preventDefault();
      }
    }).on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
      var text = $(this).val(),
        charsLimit = $(this).data("character-limit"),
        charsUsed = text.length,
        charsRemain = charsLimit - charsUsed;
      if (charsRemain < 0) {
        $(this).val(text.slice(0, charsRemain));
        charsRemain = 0;
      }
      $(this).next('div.char-count').find('.char-remain-count').html(charsRemain);
    });
    $('body').on('blur', 'input, select', function(e) {
      var $parent = $(this).parents(".form-row");
      if ($parent.find('.error-message')[0]) {
        $parent.find('.error-message').first().remove();
        //Remove red backgroud of field if no client side error
        if ($parent.find('span.error').length === 0) {
          $($parent[0]).removeClass('error');
        }
      }
    });
    /**
     * 
     * Button with js control will be disabled by default to make sure user click event should not filed until js is completely loaded. 
     * Once DOM is ready we will remove the disabled attribute along with js-disabled css class 
     *
     */
    if ($('.js-disabled').length > 0) {
      $('.js-disabled').each(function() {
        $(this).removeAttr('disabled').removeClass('js-disabled');
      });
    }
    /* remove data attributes for dialog for iphone */
    if (navigator.userAgent.match(/iPhone/i)) {
      $('.open-dialog').removeAttr('data-dlg-action').removeAttr('data-dlg-options').removeClass('open-dialog');
    }
    // initialize search suggestions
    app.searchsuggest.init(app.ui.searchContainerNew, app.resources.SIMPLE_SEARCH);
    // print handler
    app.ui.printPage.on("click", function() {
      window.print();
      return false;
    });
    // add show/hide navigation elements
    $('.secondary-navigation .toggle').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('expanded').next('ul').slideToggle();
    });
    // add generic toggle functionality
    $('.gift-registry-advanced .toggle').next('.toggle-content').hide();
    $('.gift-registry-advanced .toggle').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('expanded').next('.toggle-content').toggle();
    });
    // initialize dynamic grid
    if ($('.slottemplate.product').length >= 1) {
      $('.slottemplate.product .overlay-content').on('click', function(e) {
        e.preventDefault();
        window.location.href = $(this).children('h2').children('a').attr('href');
      });
    }
    // footer country flyout
    $('.footer-close').on('click', function(e) {
      e.preventDefault();
      $('.country-flyout-options').hide();
    });
    $('.selected-country').on('click', function(e) {
      e.preventDefault();
      if ($('.country-flyout-options').is(':visible')) {
        $('.country-flyout-options').hide();
      } else {
        DieselUS.ui.togglePopup.resetPopup();
        $('.country-flyout-options').show();
      }
    });
    var num_of_column = function() {
      var windowWidth = $('#wrapper').width();
      if (windowWidth >= 1025) {
        return 5;
      }
      if (windowWidth >= 768 && windowWidth <= 1023) {
        return 4;
      }
      if (windowWidth === 639) {
        return 3;
      }
      return 2;
    };
    var k = num_of_column();
    if ($('.search-result-items > div').length >= 1 && $('#grid-slot > div').children().length >= 1 && ($('.breadcrumb-refined-by').length === 0 || $('.breadcrumb-refinement-name').length === 0)) {
      app.dynamicGrid.init($('.search-result-items .reorder'), $('#grid-slot > div'), 'default-column');
      // app.dynamicGrid.redraw(k);
      app.product.tile.init();
    }
    if (window.DeviceOrientationEvent) {
      window.addEventListener('orientationchange', function(eventData) {
        if ($('.search-result-items > div').length >= 1 && $('#grid-slot > div').children().length >= 1 && ($('.breadcrumb-refined-by').length === 0 || $('.breadcrumb-refinement-name').length === 0)) {
          //  app.dynamicGrid.redraw(num_of_column());
          app.product.tile.init();
        }
      });
    }
    $('#main').on('click', '.refinements .refinements-filter a', function(e) {
      e.preventDefault();
      $('#secondary').hide();
      $('#primary').addClass('full-width').removeClass('default-column');
      $('.search-result-items > div div').attr('style', "");
      $('.search-result-options .refinements-filter').show();
      app.cookies.createCookie('searchfilter', 'hide', 0);
      if ($('.search-result-items > div').length >= 1 && $('#grid-slot > div').children().length >= 1 && $('#wrapper').width() >= 768 && $('.breadcrumb-refined-by').length === 0) {
        // app.dynamicGrid.redraw(num_of_column());
        app.product.tile.init();
      }
      // event tracking for filter collapse
      var pageName = $('.pageName:visible').attr('data-pagename');
      if (pageName) {
        if (pageName === 'Denim Guide') {
          app.analytics.init(app.$cache[58].event_cat, app.$cache[58].event_action, '');
        } else app.analytics.init(app.$cache[12].event_cat, app.$cache[12].event_action, '');
      } else app.analytics.init(app.$cache[12].event_cat, app.$cache[12].event_action, '');
    });
    $('#main').on('click', '.search-result-options .refinements-filter a', function(e) {
      e.preventDefault();
      $('#secondary').show();
      $('.search-result-options .refinements-filter').hide();
      $('#primary').removeClass('full-width');
      $('#primary').addClass('default-column');
      $('.search-result-items > div div').attr('style', "");
      app.cookies.createCookie('searchfilter', 'show', 0);
      if ($('.search-result-items > div').length >= 1 && $('#grid-slot > div').children().length >= 1 && $('#wrapper').width() >= 768 && $('.breadcrumb-refined-by').length === 0) {
        var l = n;
        //app.dynamicGrid.redraw(num_of_column());
        app.product.tile.init();
      }
      // event tracking for filter expand
      var pageName = $('.pageName:visible').attr('data-pagename');
      if (pageName) {
        if (pageName === 'Denim Guide') {
          app.analytics.init(app.$cache[57].event_cat, app.$cache[57].event_action, '');
        } else app.analytics.init(app.$cache[11].event_cat, app.$cache[11].event_action, '');
      } else app.analytics.init(app.$cache[11].event_cat, app.$cache[11].event_action, '');
    });
    if ($('.breadcrumb-refined-by').next().length === 0) {
      $('.breadcrumb-refined-by').hide();
    }
    $('#dwfrm_ordertrack_postalCode').on('focusout', function(e) {
      $('.form-row.zipcode.required').removeClass('error');
      $('.check-order span.error-message').hide();
    });
    // subscribe email box
    if (app.ui.slots.subscribeEmail.length > 0) {
      app.ui.slots.subscribeEmail.focus(function() {
        var val = $(this.val());
        if (val.length > 0 && val !== app.resources.SUBSCRIBE_EMAIL_DEFAULT) {
          return; // do not animate when contains
          // non-default value
        }
        $(this).animate({
          color: '#999999'
        }, 500, 'linear', function() {
          $(this).val('').css('color', '#333333');
        });
      }).blur(function() {
        var val = $.trim($(this.val()));
        if (val.length > 0) {
          return; // do not animate when contains
          // value
        }
        $(this).val(app.resources.SUBSCRIBE_EMAIL_DEFAULT).css('color', '#999999').animate({
          color: '#333333'
        }, 500, 'linear');
      });
    }
    /**
     *
     * My account and help flyout
     */
    if (!scriptIsmobile()) {
      $('.menu-utility li.help, .menu-utility-user li.myacc').hover(function() {
        $($(this).find('div')).css('display', 'block');
        $(this).addClass("menu-visible");
      }, function() {
        $($(this).find('div')).css('display', 'none');
        $(this).removeClass("menu-visible");
      });
    } else if ($("body").width() >= 768 && $("body").width() <= 1024) {
      $('.menu-utility li.help, .menu-utility-user li.myacc').off('touchstart').on('touchstart', function(e) {
        if (!$(this).find('div').is(':visible')) {
          e.preventDefault();
          $($(this).find('div')).css('display', 'block');
          $(this).addClass("menu-visible");
        }
      });
    } else {
      if ($(".menu-utility-mobile li.myacc").hasClass("loggedin")) {
        //$(".menu-utility-mobile li.myacc .user-account").off();
        $('.menu-utility-mobile li.myacc').off('touchstart').on('touchstart', function(e) {
          $(this).parent().find('div.mobile-account').slideToggle("slow");
          /* if (!$(this).parent().find('div.mobile-account').is(':visible')) {
               e.preventDefault();
               $($(this).parent().find('div.mobile-account')).css('display', 'block');
           }*/
        });
        /*else{
        	$(".menu-utility-mobile li.myacc .user-account").on("click");
        }*/
      }
    }
    /** hide flyouts on body touch
     * */
    if (scriptIsmobile()) {
      $('body').off('touchstart').on('touchstart', function(e) {
        //code moved to header.js for navigation
        //                if (!$($(e.target).parents('li')).is('ul.level-1 > li') && !$('#saleLanding').length) {
        //                    $('div.level-2').filter('#header div.level-2').hide();
        //                    $('a .main-nav-arr').hide();
        //                }
        if (!$(e.target).parents('.mini-cart-total').length && !$(e.target).parents('.mini-cart-content').length) {
          app.minicart.close();
          $('.mini-cart-arrow').hide();
        }
        if (!$(e.target).parents('#tooltip').length && !$(e.target).is($('.tooltip')) && !$(e.target).parents('.tooltip').length) {
          $('#tooltip').remove();
        }
        if (!$(e.target).is($(".grid-tile")) && !$(e.target).parents('.grid-tile').length) {
          $(".grid-tile").find(".product-tile").removeClass("product-tile-quickview");
          $(".grid-tile").css('overflow', 'hidden');
          $('#quickviewbutton').hide();
        }
        if (!$(e.target).is($('.menu-utility li.help')) && !$(e.target).parents('.menu-utility li.help').length) {
          $('.menu-utility li.help div').css('display', 'none');
        }
        if (!$(e.target).is($('.menu-utility-user li.myacc')) && !$(e.target).parents('.menu-utility-user li.myacc').length) {
          $('.menu-utility-user li.myacc div').css('display', 'none');
          $(".menu-utility-user li.myacc").removeClass("menu-visible");
        }
      });
    }
    /**Ovelay add curson dynamicaly**/
    $('.overlay-content').each(function(key, val) {
      if ($(val).attr('data-url')) {
        $(val).addClass('cursor');
      }
    });
    /** footer newsletter success false*/
    $('#footer .newsletter form,#footer-burger .newsletter form').on('submit', function(e) {
      e.preventDefault();
      app.newsletterForm.submit.call(this);
    });
    /* clear the newsletter notification   */
    $('body').on('keyup focus', ' #subscription-overlay .newsletter form .form-row input, #footer .newsletter form .form-row input, #footer-burger .newsletter form .form-row input', function(e) {
      e.preventDefault();
      app.newsletterForm.clearNotification.call(this);
    });
    $('#password-reset-mobile').click(function(e) {
      $('#mobile-nav-myaccount').children('span.sprite-icon').hide();
      $($(this).data('target')).slideUp();
    });
    if (scriptIsmobile() && $('body').width() < 767) {
      $('#send-to-friend-form .cancel-button').on('click', function(e) {
        e.preventDefault();
        window.history.back();
      });
      /*
	       $('#send-to-friend-form .close-button').on('click',function(e){
	        	e.preventDefault();
	        	window.history.back();
	        });*/
    }
  }
  /**
   * @private
   * @function
   * @description Adds class ('js') to html for css targeting and loads js
   *              specific styles.
   */
  function initializeDom() {
    // add class to html for css targeting
    $('html').addClass('js');
    if (app.clientcache.LISTING_INFINITE_SCROLL) {
      $('html').addClass('infinite-scroll');
    }
    // load js specific styles
    app.util.limitCharacters();
  }
  /**
   * @property {Object} _app "inherits" app object via $.extend() at the end
   *           of this seaf (Self-Executing Anonymous Function)
   */
  var _app = {
    containerId: "content",
    ProductCache: null, // app.Product object ref to the current/main
    // product
    ProductDetail: null,
    currencyCodes: app.currencyCodes || {}, // holds currency
    // code/symbol for the site
    /**
     * @name init
     * @function
     * @description Master page initialization routine
     */
    init: function() {
      if (document.cookie.length === 0) {
        $("<div/>").addClass("browser-compatibility-alert").append($("<p/>").addClass("browser-error").html(app.resources.COOKIES_DISABLED)).appendTo("#browser-check");
      }
      // init global cache
      initUiCache();
      // init global dom elements
      initializeDom();
      // init global events
      initializeEvents();
      initRadioFocus();
      // init specific global components
      app.tooltips.init();
      app.minicart.init();
      app.validator.init();
      app.components.init();
      app.searchplaceholder.init();
      app.util.lazyLoad();
      app.searchboxtoggle.init(app.ui.searchIconId, app.ui.searchCloseId, app.ui.searchDownIcon, app.ui.searchContainerNew);
      // execute page specific initializations
      var ns = app.page.ns;
      if (ns && app[ns] && app[ns].init) {
        app[ns].init();
      }
    }
  };
  return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));
/**
 * @class app.storefront
 */
(function(app, $) {
  var $cache = {};

  function setMobileTopSlot() {
    if ($(window).width() < 768) {
      var isSlider = $('.main-slider .grid').contents().filter(function() {
        return this.nodeType == 1;
      }).length;
      if (isSlider == 0) {
        $(".main-top-slot").show();
      }
    }
  }
  app.storefront = {
    init: function() {
      $(".grid").each(function(key, val) {
        if ($(val).find("ul li").length > 1) {
          var wrap = $(val);
          var sid = $(val).find(".slottemplate");
          var sl = $(val).find("li");
          app.util.setCarousel({
            sliderid: sid,
            sliderwrapper: wrap,
            slide: sl,
            auto: true,
            circular: true,
            nav: true
          });
        }
      });
      setMobileTopSlot();
      $(window).resize(function() {
        setMobileTopSlot();
      });
      app.util.setSlotLink();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.tooltip
 */
(function(app, $) {
  var $cache = {};
  app.tooltips = {
    /**
     * @function
     * @description Initializes the tooltip-content and layout
     */
    init: function() {
      $('.tooltip').on('click', function(e) {
        e.preventDefault();
      });
      if (!scriptIsmobile()) {
        $('.tooltip').tooltip({
          track: true,
          showURL: false,
          bodyHandler: function() {
            // add a data attribute of
            // data-layout="some-class" to your
            // tooltip-content container if you want a
            // custom class
            var tooltipClass = "";
            if (tooltipClass = $(this).find('.tooltip-content').data("layout")) {
              tooltipClass = " class='" + tooltipClass + "' ";
            }
            return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>";
          },
          showURL: false
        });
      } else {
        $('.tooltip').off('touchstart').on('touchstart', function(e) {
          e.preventDefault();
          var toolTipContent = $($($(this).parent()).find('.tooltip-content')).clone();
          var top = $(this).offset().top + $(this).height();
          var left = $(this).offset().left;
          //ipad portrait and kindle landscape
          if (($("body").width() < 1000) && ($(this).parents(".wishlist-detail .cvn-tip").length > 0)) {
            left = left - 160;
          }
          $('body').append('<div id="tooltip" class="viewport-bottom">' + '<h3 style="display: none;"></h3>' + '<div class="body">' + '<div class="small">' + toolTipContent.html() + '</div>' + '</div>' + '<div class="url" style="display: none;"></div>' + '</div>');
          $('#tooltip').css({
            top: top,
            left: left,
            display: 'block'
          });
        });
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.product
 */
(function(app, $) {
  var $cache;
  /** ************* app.product private vars and functions ************** */
  /**
   * @function
   * @description Sets the main image attributes and the href for the
   *              surrounding <a> tag
   * @param {Object}
   *            atts Simple object with url, alt, title and hires properties
   */
  function setMainImage(atts) {
    var imgZoom = $cache.pdpMain.find("a.main-image");
    if (imgZoom.length > 0 && atts.hires && atts.hires != '' && atts.hires != 'null') {
      imgZoom.attr("href", atts.hires);
    }
    imgZoom.find("img.primary-image").attr({
      "src": atts.url,
      "alt": atts.alt,
      "title": atts.title
    });
  }
  /**
   * @function
   * @description replaces the images in the image container. for example when
   *              a different color was clicked.
   */
  function replaceImages() {
    var newImages = $("#update-images");
    var imageContainer = $cache.pdpMain.find("div.product-image-container");
    imageContainer.html(newImages.html());
    newImages.remove();
    setMainImageLink();
  }
  /**
   * @function
   * @description Adds css class (image-zoom) to the main product image in
   *              order to activate the zoom viewer on the product detail
   *              page.
   */
  function setMainImageLink() {
    if (app.quickView.isActive() || app.isMobileUserAgent) {
      $cache.pdpMain.find("a.main-image").removeAttr("href");
    } else {
      $cache.pdpMain.find("a.main-image").addClass("image-zoom");
    }
  }
  /**
   * @private
   * @function
   * @description Initializes the DOM of the product detail page (images,
   *              reviews, recommendation and product-navigation).
   */
  function initializeDom() {
    setMainImageLink();
    if ($cache.productSetList.length > 0) {
      var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
      if (unavailable.length > 0) {
        $cache.addAllToCart.attr("disabled", "disabled");
        // this may be a bundle
      }
    }
    app.tooltips.init();
  }
  /**
   * @private
   * @function
   * @description Initializes the cache on the product detail page.
   */
  function initializeCache() {
    $cache = {
      productId: $("#pid"),
      pdpMain: $("#pdpMain"),
      productContent: $("#product-content"),
      thumbnails: $("#thumbnails"),
      bonusProductGrid: $(".bonusproductgrid"),
      imageContainer: $(".product-primary-image"),
      productSetList: $(".product-set-lists"),
      addToCart: $("#add-to-cart"),
      addAllToCart: $("#add-all-to-cart")
    };
    $cache.detailContent = $cache.pdpMain.find("div.detail-content");
    $cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
    $cache.swatches = $cache.pdpMain.find("ul.swatches");
    $cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
    $cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
  }

  function variationSelection(url, isColor) {
    isColor = typeof isColor == 'undefined' ? false : isColor;
    var target = $cache.productContent;
    app.ajax.load({
      url: url,
      callback: function(data) {
        var dataGotoSelected = $(".goto_sec h5 a.active").parents('h5').attr("data-goto");
        target.html(data);
        $(".goto_sec h5 a").removeClass("active");
        $(".goto_sec h5[data-goto='" + dataGotoSelected + "'] a").addClass("active");
        //set selected swatch value to text field
        $('ul.swatch-variation').each(function() {
          var seletedValue = $(this).find('li.selected').text();
          if (seletedValue.length > 0) {
            var attributeLabel = $(this).parents('.customSelectBox').find('.selectedVal').text();
            $(this).parents('.customSelectBox').find('.selectedVal').html(seletedValue);
            $(this).prepend("<li class='attribute-label'><a class='disable'>" + attributeLabel + "</a></li>");
          }
        });
        //reinitialize customSelectBox
        $('.customSelectBox').customSelectBox();
        app.product.initAddThis();
        app.product.initAddToCart();
        if (isColor) {
          replaceImages();
          $("body").trigger("closePDPZoom");
        } else {
          $("#update-images").remove();
        }
        app.tooltips.init();
        app.product.setPdpCarousel(); // updated pdp slider
        DieselUS.ui.equalHeight.init();
        DieselUS.ui.togglePopup.init();
        DieselUS.ui.alineTop.init();
        var multiple = 4;
        if ($('body').width() > 767 && $('body').width() < 1023) {
          multiple = 3;
        } else if ($('body').width() > 1023 && $('body').width() < 1280) {
          multiple = 3;
        } else if ($('body').width() > 319 && $('body').width() < 768) {
          multiple = 3;
        } else if ($('body').width() == 1280) {
          multiple = 4;
        }
        if ($('#QuickViewDialog').length > 0) {
          multiple = 3;
        }
        $('.swatch-wrapper').each(function(key, val) {
          app.util.setCarousel({
            sliderid: $(val).find('.swatches.Color.color-slides'),
            sliderwrapper: $(val),
            auto: false,
            isFixed: true,
            width: $($(val).find('.swatch-Slider')).width(),
            nav: false,
            multiple: multiple
          });
          window.pdpCenterColorSlide($(this));
        });
        /*DieselUS.pdp.mobileMainImageSlider.init();
        setTimeout(function() {
          DieselUS.pdp.mobileMainImageSlider.init();
        }, 1000);
        DieselUS.pdp.thumbnailSlider.init();*/
        DieselUS.ui.gridsForPDPCustomDropDown.init();
        DieselUS.ui.swatchColorSelected.init();
        if (isColor) {
          DieselUS.pdp.closeMobileDesc();
          DieselUS.flexTemplate.videoCommonCode.init()
            // new code changes
          if ($('.my-bag-product-list').length > 0) {
            var wrapper = $('.product-slides-wrapper');
            var sliders = $(wrapper).find('.my-bag-product-list li').length;
            var element = $(wrapper).find('.my-bag-product-list'),
              setting = {
                minSlides: 1,
                maxSlides: 1,
                prevSelector: $(wrapper).find(".slider-prev1"),
                nextSelector: $(wrapper).find(".slider-next1"),
                onSlideAfter: function($slideElement, oldIndex, newIndex) {
                  $(wrapper).find(".slide-number1 .remaining").html(newIndex + 1);
                },
                onSliderLoad: function() {
                  $(".product-slides-list li").css({
                    visibility: "visible"
                  });
                }
              },
              sliderss = element.css({
                height: "auto"
              }).bxSlider(setting);
            $(wrapper).find(".slide-number1 .remaining").html("1");
            $(wrapper).find(".slide-number1 .total").html(sliderss.getSlideCount());
          }
        }
        sr_refreshSRDOM();
      }
    });
  }

  function productSetVariationSelection(ic, url, setContainer, parent) {
    ic.load(url, function() {
      app.progress.hide();
      if ($cache.productSetList.find("button.add-to-cart[disabled]").length > 0 || $cache.productSetList.find('.product-notify-link').length > 0) {
        $cache.addAllToCart.attr("disabled", "disabled");
        //this  may be a bundle
      } else {
        $cache.addAllToCart.removeAttr("disabled");
        $cache.addToCart.removeAttr("disabled");
        // this may be a bundle
      }
      $(setContainer).find('.product-slides-list').html($(parent).find('.product-slides-list-updated .product-slides-list li'));
      $(setContainer).find('.product-slides').html($(parent).find('.product-slides-list-updated .product-slides'));
      $(".update-images").remove();
      app.product.initAddToCart(ic);
      DieselUS.ui.equalHeight.init();
      DieselUS.ui.togglePopup.init();
      DieselUS.ui.alineTop.init();
      DieselUS.ui.swatchColorSelected.init();
      app.product.initShopByLook();
      app.product.initAddThis(ic.find('.addthis_toolbox'));
      app.product.initLookPDPCarousel($(parent).find('.product-slides-wrapper'), 0);
      //set selected swatch value to text field
      $(ic).find('ul.swatch-variation').each(function() {
        var seletedValue = $(this).find('li.selected').text();
        if (seletedValue.length > 0) {
          var attributeLabel = $(this).parents('.customSelectBox').find('.selectedVal').text();
          $(this).parents('.customSelectBox').find('.selectedVal').html(seletedValue);
          $(this).prepend("<li class='attribute-label'><a class='disable'>" + attributeLabel + "</a></li>");
        }
      });
      //reinitialize customSelectBox
      $('.customSelectBox').customSelectBox();
      DieselUS.ui.gridsForPDPCustomDropDown.init();
      if (scriptIsmobile() && $('body').width() < 767) {
        $(parent).find('.view-product-details').click();
      }
      var multiple = 4,
        wrapperWidth = 0;
      if ($('.product-set-container').length != 0) {
        multiple = 3
      }
      if ($('#QuickViewDialog').length > 0) {
        multiple = 3;
        wrapperWidth = 195;
        if ($('body').width() > 319 && $('body').width() < 768) {
          wrapperWidth = 108;
        }
      } else {
        if ($('body').width() > 767 && $('body').width() < 1023) {
          multiple = 3;
        } else if ($('body').width() > 1023 && $('body').width() < 1280) {
          multiple = 3;
        } else if ($('body').width() > 319 && $('body').width() < 768) {
          multiple = 3;
        } else if ($('body').width() == 1280) {
          if ($('.product-set-container').length != 0) {
            multiple = 3
          } else {
            multiple = 4;
          }
        }
      }
      $('.swatch-wrapper').each(function(key, val) {
        app.util.setCarousel({
          sliderid: $(val).find('.swatches.Color.color-slides'),
          sliderwrapper: $(val),
          auto: false,
          isFixed: true,
          width: wrapperWidth > 0 ? wrapperWidth : $($(val).find('.swatch-Slider')).width(),
          nav: false,
          multiple: multiple
        });
        window.pdpCenterColorSlide($(this));
      });
    });
  }
  /**
   * @private
   * @function
   * @description Initializes events on the product detail page for the
   *              following elements:
   *              availability message
   *              add to cart functionality
   *              images and swatches
   *              variation selection
   *              option selection
   *              send to friend functionality
   *              
   */
  function success_wishlist(data) {}

  function initializeEvents() {
    app.product.initAddThis();
    // add or update shopping cart line item
    app.product.initAddToCart();
    // Add to Wishlist and Add to Gift Registry links behaviors
    $(document).on("click", "a.wl-action", function(e, wishlist) {
      e.preventDefault();
      var isMobile = $("body").width() <= 767;
      var element = $('.pdp-main-wrapper.shop-by-look .product-set-container').length > 0 ? $(this).closest('.product-set-lists') : $('.product-col-2');
      //var element = 
      var selectError = false,
        count = 0,
        preMessage = {},
        message = "Please select ";
      if (element.find('.swatches.Color li')[0] && !$(element.find('.swatches.Color li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "color";
      }
      if (element.find('.swatches.size li')[0] && !$(element.find('.swatches.size li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "size";
      }
      if (element.find('.swatches.length li')[0] && !$(element.find('.swatches.length li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "length";
      }
      if (isMobile && !wishlist && wishlist != "wishlist-button") {
        $(".add-btn").trigger("click", "wishlist-button");
      }
      if (selectError) {
        if (count == 1) {
          message = message + preMessage[1];
        } else if (count == 2) {
          message = message + preMessage[1] + " and " + preMessage[2];
        } else if (count == 3) {
          message = message + preMessage[1] + ", " + preMessage[2] + " and " + preMessage[3];
        }
        openProductTootip($(this), message, {
          // top: '0px',
          left: '0px'
        }, "17%");
        return;
      }
      /**Init google analytics for wishlist**/
      if ($('#pageName')) {
        var pageName = $('#pageName').val();
        var isQuickView = $('#isQuickView').val();
        var productName = $('#pname').val();
        if (pageName == "ProductDetail") {
          if (isQuickView == "true") {
            app.analytics.init(app.$cache[18].event_cat, app.$cache[18].event_action, productName);
          } else {
            app.analytics.init(app.$cache[15].event_cat, app.$cache[15].event_action, productName);
          }
        } else if (pageName == "ShopByLook") {
          var pname = $($(this).parents('.product-add-to-cart').find('#pname'));
          productName = pname.val();
          if (isQuickView == "true") {
            app.analytics.init(app.$cache[41].event_cat, app.$cache[41].event_action, productName);
          } else {
            app.analytics.init(app.$cache[45].event_cat, app.$cache[45].event_action, productName);
          }
        }
      }
      var data = app.util.getQueryStringParams($(this).closest("form.pdpForm").serialize());
      if (data.cartAction) {
        delete data.cartAction;
      }
      var url = app.util.appendParamsToUrl(this.href, data);
      url = this.protocol + "//" + this.hostname + ((url.charAt(0) === "/") ? url : ("/" + url));
      if ($('#isUserLogin') && $('#isUserLogin').val() == "true") {
        var _this = this;
        console.log($(this));
        url = app.util.appendParamsToUrl(url, {
          'format': 'ajax'
        });
        url = this.protocol + "//" + this.hostname + ((url.charAt(0) === "/") ? url : ("/" + url));
        var topPos = 0;
        var leftPos = 0;
        if ($(".product-set-lists").length) {
          topPos = ($(this).offset().top - $(this).parents(".product-set-lists").find(".product-add-to-cart").offset().top) - 42;
          leftPos = "-35px";
        }
        $.ajax({
          type: 'GET',
          url: url,
          dataType: 'jsonp',
          error: function(data) {
            openProductTootip($(_this), "successfully added to wishlist", {
              top: $(_this).position().top - 50,
              left: $(_this).position().left - 1
            }, "17%");
            /*if(isMobile){
            	$(".add-btn").trigger("click");
            }*/
          }
        });
      } else {
        if (app.device.mobile()) {
          window.location.href = url;
        } else {
          url = $(this).attr('href') + "&target=iframe",
            data = {
              'url': url,
              'width': app.device.is('ipad') ? 768 : 880,
              'element': '#wishlist-sigin-overlay',
              'currentNode': $(e.currentTarget),
              'iFrame': true,
              'wrapperClass': 'iPadWishlistPosFixed'
            };
          DieselUS.ui.loginOverlay.getLoginOverlayData(data);
        }
      }
    });
    /** 
     * Allow product details button to go to the PDP with retained selections
     */
    $cache.pdpMain.on("click", ".link-text.quickview", function(e) {
      var variationContainer = $('.product-variations'),
        variationsAttr = variationContainer.find('li.attribute'),
        qs = '?',
        url = $(this).attr("href");
      variationsAttr.each(function() {
        var selectedVariation = $(this).find('li.selected a');
        if (selectedVariation.length === 0) return;
        var type = $(this).data('variation-type'),
          result = app.util.getQueryStringParams($(selectedVariation).data('productdetailsurl')),
          param = 'dwvar_' + result['pid'] + '_' + $(this).data('variation-type');
        if (qs.indexOf('=') > 0) qs = qs + '&';
        qs = qs + param + "=" + result[param];
      });
      if (variationsAttr.length === qs.split("=").length - 1) window.location.href = url;
      else window.location.href = url + qs;
    });
    /**
     * Trigger click event on product details link on click of product image
     */
    $cache.pdpMain.on('click', '#QuickViewDialog .pd-image-quickview', function(e) {
      e.preventDefault();
      $('.link-text.quickview').trigger('click');
    });
    /**
     *  Trigger click event on product details link on click of product image for new PDP
     */
    if ($('.pdp-main').hasClass('pdp-redesign')) {
      $cache.pdpMain.on('click', '#QuickViewDialog .product-slides-list .product-image', function(e) {
        e.preventDefault();
        $('.link-text.quickview').trigger('click');
      });
    }
    // dropdown variations
    $cache.pdpMain.on("change", ".product-options select", function(e) {
      var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");
      var selectedItem = $(this).children().filter(":selected").first();
      var combinedPrice = selectedItem.data("combined");
      salesPrice.text(combinedPrice);
    });
    // prevent default behavior of thumbnail link and add this Button
    $cache.pdpMain.on("click", ".thumbnail-link, .addthis_toolbox a", false);
    $cache.pdpMain.on("click", "li.unselectable a", false);
    // handle drop down variation attribute value selection event
    $cache.pdpMain.on("change", ".variation-select", function(e) {
      if ($(this).val().length === 0) {
        return;
      }
      var qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
        listid = $cache.pdpForm.find("input[name='productlistid']").first().val(),
        productSet = $(this).closest('.subProduct'),
        params = {
          Quantity: isNaN(qty) ? "1" : qty,
          format: "ajax"
        };
      if (listid) params.productlistid = listid;
      var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
      var url = app.util.appendParamsToUrl($(this).val(), params);
      app.progress.show($cache.pdpMain);
      app.ajax.load({
        url: url,
        callback: function(data) {
          //alert("selectCalled")
          target.html(data);
          app.product.initAddThis();
          app.product.initAddToCart();
          $("#update-images").remove();
          app.tooltips.init();
        }
      });
    });
    // swatch anchor onclick()
    $cache.pdpMain.on("click", "div.product-detail a.swatchanchor", function(e) {
      e.preventDefault();
      var el = $(this);
      if (el.parents('li').hasClass('selected')) return;
      var isColor = el.closest("ul.swatches").hasClass("Color");
      var anchor = el,
        qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
        listid = $cache.pdpForm.find("input[name='productlistid']").first().val(),
        productSet = $(anchor).closest('.subProduct'),
        params = {
          Quantity: isNaN(qty) ? "1" : qty
        };
      if (listid) params.productlistid = listid;
      if ($(this).parents(".quickview").length || $(this).parents(".pdp-cart-edit-mobile").length) {
        if ($(this).parents(".wishlist-true").length) {
          params.source = "wishlist";
        } else {
          params.source = "cart";
        }
      }
      var url = app.util.appendParamsToUrl(this.href, params);
      app.progress.show($cache.pdpMain);
      variationSelection(url, isColor);
    });
    $cache.productSetList.on("click", "div.product-set-item li a[href].swatchanchor", function(e) {
      e.preventDefault();
      /* DQP-2136 - Return, if color is already selected or unselectable */
      var noUpdates = $(this).parents('li');
      if (noUpdates.hasClass('selected')) return;
      // get the querystring from the anchor element
      var params = app.util.getQueryStringParams(this.search);
      var psItem = $(this).closest(".product-set-item");
      // set quantity to value from form
      var qty = psItem.find("form").find("input[name='Quantity']").first().val();
      params.Quantity = isNaN(qty) ? "1" : qty;
      var url = app.urls.getSetItem + "?" + $.param(params);
      var parent = $(this).closest(".zoom-image-container");
      var setContainer = $(parent).find(".product-set-image");
      // get container
      var ic = $(this).closest(".product-set-item");
      productSetVariationSelection(ic, url, setContainer, parent);
    });
    $cache.addAllToCart.on("click", function(e) {
      e.preventDefault();
      var psForms = $cache.productSetList.find("form").toArray(),
        miniCartHtml = "",
        addProductUrl = app.util.ajaxUrl(app.urls.addProduct);
      // add items to cart
      function addItems() {
        var form = $(psForms.shift());
        var itemid = form.find("input[name='pid']").val();
        $.ajax({
          dataType: "html",
          url: addProductUrl,
          data: form.serialize()
        }).done(function(response) {
          // success
          miniCartHtml = response;
        }).fail(function(xhr, textStatus) {
          // failed
          var msg = app.resources.ADD_TO_CART_FAIL;
          $.validator.format(msg, itemid);
          if (textStatus === "parsererror") {
            msg += "\n" + app.resources.BAD_RESPONSE;
          } else {
            msg += "\n" + app.resources.SERVER_CONNECTION_ERROR;
          }
          window.alert(msg);
        }).always(function() {
          if (psForms.length > 0) {
            addItems();
          } else {
            app.quickView.close();
            app.minicart.show(miniCartHtml);
            sr_refreshSRDOM();
          }
        });
      }
      if (validateBeforeAddingCart()) addItems();
      return false;
    });
    if ($(window).width() > 767) {
      app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");
    }
  }
  /**
   * @private
   * @function
   * @description Event handler to handle the add to cart event
   * @type jq {Object}
   * 
   */
  function validateBeforeAddingCart() {
    var validation = [],
      isValid = true,
      scroll = true;
    $('.add-to-cart').each(function() {
      var element = $($(this).closest('.product-set-lists')),
        selectError = false,
        count = 0,
        preMessage = {},
        message = "Please select ";
      if (element.find('.swatches.Color li')[0] && !$(element.find('.swatches.Color li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "color";
      }
      if (element.find('.swatches.size li')[0] && !$(element.find('.swatches.size li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "size";
      }
      if (element.find('.swatches.length li')[0] && !$(element.find('.swatches.length li')).hasClass('selected')) {
        count++;
        selectError = true;
        preMessage[count] = "length";
      }
      if (selectError) {
        if (count == 1) {
          message = message + preMessage[1];
        } else if (count == 2) {
          message = message + preMessage[1] + " and " + preMessage[2];
        } else if (count == 3) {
          message = message + preMessage[1] + ", " + preMessage[2] + " and " + preMessage[3];
        }
        validation.push(false);
        if ($('body').width() < 767) {
          $('.sbl-redesign', element).removeClass('hidden-shopbylook');
        }
        openProductTootip($(this), message);
        if (scroll) {
          $('html, body').animate({
            'scrollTop': $(element).find('.add-to-cart').offset().top - 50
          }, 500);
          scroll = false;
        }
      }
    });
    isValid = validation.join().indexOf('false') >= 0 ? false : true;
    return isValid;
  }
  /**
   * @private
   * @function
   * @description Event handler to handle the add to cart event
   */
  function setAddToCartHandler(e) {
    e.preventDefault();
    /*add to cart selection validation*/
    var element = $('.pdp-main-wrapper.shop-by-look .product-set-container').length > 0 ? $(this).closest('.product-set-lists') : $(this).closest('.product-col-2'),
      selectError = false,
      count = 0,
      preMessage = {},
      message = "Please select ";
    if (element.find('.swatches.Color li')[0] && !$(element.find('.swatches.Color li')).hasClass('selected')) {
      count++;
      selectError = true;
      preMessage[count] = "color";
    }
    if (element.find('.swatches.size li')[0] && !$(element.find('.swatches.size li')).hasClass('selected')) {
      count++;
      selectError = true;
      preMessage[count] = "size";
    }
    if (element.find('.swatches.length li')[0] && !$(element.find('.swatches.length li')).hasClass('selected')) {
      count++;
      selectError = true;
      preMessage[count] = "length";
    }
    if (selectError) {
      if (count == 1) {
        message = message + preMessage[1];
      } else if (count == 2) {
        message = message + preMessage[1] + " and " + preMessage[2];
      } else if (count == 3) {
        message = message + preMessage[1] + ", " + preMessage[2] + " and " + preMessage[3];
      }
      openProductTootip($(this), message);
      return;
    }
    $(element).addClass("product-validation-passed");
    var form = $(this).closest("form");
    var qty = form.find("input[name='Quantity']");
    var isSubItem = $(this).hasClass("sub-product-item");
    if (qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
      qty.val("1");
    }
    var data = form.serialize();
    // event tracking for add to cart
    if ($('#updateProduct', form).val() === 'true') {
      var productName = '';
      var pageName = '';
      var isQuickView = false;
      var dataArr = data.split('&');
      for (var i = 0; i < dataArr.length; i++) {
        var elementArr = dataArr[i].split('=');
        if (elementArr[0] == "pageName") {
          pageName = elementArr[1];
        }
        if (elementArr[0] == "pname") {
          productName = $('input[name="pname"]', form).val();
        }
        if (elementArr[0] == "isQuickView") {
          isQuickView = elementArr[1];
        }
      }
      eventTracking_addToCart(productName, pageName, isQuickView);
    }
    app.cart.update(data, function(response) {
      var uuid = form.find("input[name='uuid']");
      if (uuid.length > 0 && uuid.val().length > 0) {
        /* Fix for DQP-2354 */
        app.cart.refreshPage();
      } else {
        if (!isSubItem) {
          app.quickView.close();
        }
        var hostname = window.location.hostname;
        var protocol = window.location.protocol;
        ga('send', 'pageview', protocol + '//' + hostname + '/mini-cart');
        $('.product-validation-passed').find("#product-content-detail").addClass("feedback-show");
        $('.product-validation-passed').removeClass('product-validation-passed');
        app.minicart.show(response);
        //iGoDigital call
        if ($(".rtaminicart").length > 0) {
          var rtaMiniCart = $(".rtaminicart");
          rtaCart = rtaMiniCart.data("rtacart");
          rtaCartSku = rtaMiniCart.data("rtacartsku");
          rtaCartAmounts = rtaMiniCart.data("rtacartamounts");
          rtaCartQuantities = rtaMiniCart.data("rtacartquantities");
          rtaSpecial = rtaMiniCart.data("rtaSpecial");
          rtaTags = rtaMiniCart.data("rtaTags");
          callRTA();
        }
        sr_refreshSRDOM();
      }
      if ($(window).width() < 767 && window.location.href.indexOf('source=cart') != '-1') {
        setTimeout(function() {
          window.location.href = app.urls.cartShow;
        }, 520);
      }
    });
  }

  function openProductTootip(element, message, pos, arrowPos) {
    var top = element.offset().top;
    var left = ($($('.product-add-cart')[0]).outerWidth() / 2) - ($('.product-tool-tip').outerWidth() / 2);
    if (element) {
      var parent = $('.pdp-main-wrapper.shop-by-look .product-set-container').length > 0 ? $(element).closest('.product-set-lists') : $('.product-col-2');
      var tooltip = parent.find('.product-tool-tip');
      var wrapper_tooltip = $('.product-add-cart');
      if ($('.pdp-main-wrapper.shop-by-look').length) {
        wrapper_tooltip = $('.product-bottom-wrap');
      }
      left = ($(wrapper_tooltip[0]).outerWidth() / 2) - ($('.product-tool-tip').outerWidth() / 2);
      $(tooltip).css({
        display: 'block',
        left: left
      });
      if (pos && pos.left) {
        $(tooltip).css({
          left: pos.left
        });
      }
      if (pos && pos.top) {
        $(tooltip).css({
          top: pos.top
        });
      }
      if (arrowPos) {
        $($(tooltip).find('.arrow')).css('left', arrowPos);
      }
      $($(tooltip).find('.msg')).text(message);
      setTimeout(function() {
        $(tooltip).removeAttr('style');
        $(tooltip).removeAttr('style');
      }, 5000);
    } else {
      $('.product-tool-tip').css({
        display: 'block',
        left: left
      });
      if (pos) {
        $('.product-tool-tip').css({
          top: pos.top,
          left: (left - 20)
        });
      }
      if (arrowPos) {
        $('.product-tool-tip .arrow').css('left', arrowPos);
      }
      $('.product-tool-tip .msg').text(message);
      setTimeout(function() {
        $('.product-tool-tip').removeAttr('style');
        $('.product-tool-tip .arrow').removeAttr('style');
      }, 5000);
    }
  }
  /** ************* app.product public object ************** */
  app.product = {
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
      this.setPdpCarousel();
      if ($('.product-set-container')[0]) this.initShopByLook();
      // Custom SelectBox
      $('ul.swatch-variation').each(function() {
        var seletedValue = $(this).find('li.selected').text();
        if (seletedValue.length > 0) {
          var attributeLabel = $(this).parents('.customSelectBox').find('.selectedVal').text();
          $(this).parents('.customSelectBox').find('.selectedVal').html(seletedValue);
          $(this).prepend("<li class='attribute-label'><a class='disable'>" + attributeLabel + "</a></li>");
        }
      });
      $("div.customSelectBox").customSelectBox();
      /* Fix for DQP-2055 - Animation is added for transition */
      $('#wrapper .product-view-detail a.link-text').on('click touchstart', function(e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: $('#pdp-actions').offset().top - 10
        }, 600);
      });
      if ($('.pdp-main-wrapper').hasClass('shop-by-look')) {
        $('.sbl-redesign ul.swatches.Color').each(function() {
          $('a.swatchanchor:first', this).trigger('click');
        });
      }
    },
    /**
     * Shop by look init
     */
    initShopByLook: function() {
      $('.product-set-mobile-slider li a').on('click', function(e) {
        e.preventDefault();
      });
      var multiple = 16;
      if ($('body').width() > 1260 && $('body').width() < 1300) {
        multiple = 15;
      } else if ($('body').width() > 1000 && $('body').width() < 1030) {
        multiple = 12;
      } else if ($('body').width() > 800 && $('body').width() < 810) {
        multiple = 10;
      } else if ($('body').width() === 768) {
        multiple = 9;
      } else if ($('body').width() === 568) {
        multiple = 7;
      } else if ($('body').width() > 530 && $('body').width() < 540) {
        multiple = 6;
      } else if ($('body').width() === 320) {
        multiple = 4;
      }
      app.util.setCarousel({
        sliderid: '.shop-by-look-slider',
        sliderwrapper: '.shop-by-look-slider-wrapper',
        slide: '.shop-by-look-slider-wrapper .shop-by-look-slider li',
        auto: false,
        multiple: multiple,
        isFixed: true
      });
      //$('.shop-by-look-slider li .selected-overlay').css('height', $($('.shop-by-look-slider li img')[0]).height());
      /* update go back to shop by look*/
      var bcLength = $('.breadcrumb li a').length - 1;
      $('.back-to-all').attr('href', $($('.breadcrumb li a')[bcLength]).attr('href'));
      if ($(window).width() < 768) {
        $('.product-set-container').each(function(key, val) {
          app.util.setCarousel({
            sliderid: $(val).find('.product-set-mobile-slider'),
            sliderwrapper: $(val).find('.product-col-1.product-set'),
            slide: $($(val).find('.product-col-1.product-set')).find('li'),
            isZoom: true,
          });
          /*
           *$(val).find('.product-col-1').css('top', $($(val).find('.product-content-header')).outerHeight() + "px");
            $($(val).find('.product-overflow-image')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
            $($(val).find('.product-col-1')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
            $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).load(function () {
              $($(val).find('.product-overflow-image')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
              $($(val).find('.product-col-1')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
            });
           */
        });
      }
      $(window).resize(function() {
        var multiple = 16;
        if ($('body').width() > 1260 && $('body').width() < 1300) {
          multiple = 15;
        } else if ($('body').width() > 1000 && $('body').width() < 1030) {
          multiple = 12;
        } else if ($('body').width() > 800 && $('body').width() < 810) {
          multiple = 10;
        } else if ($('body').width() === 768) {
          multiple = 9;
        } else if ($('body').width() === 568) {
          multiple = 7;
        } else if ($('body').width() > 530 && $('body').width() < 540) {
          multiple = 6;
        } else if ($('body').width() === 320) {
          multiple = 4;
        }
        //   $('.shop-by-look-slider li .selected-overlay').css('height', $($('.shop-by-look-slider li img')[0]).height());
        app.util.setCarousel({
          sliderid: '.shop-by-look-slider',
          sliderwrapper: '.shop-by-look-slider-wrapper',
          slide: '.shop-by-look-slider-wrapper .shop-by-look-slider li',
          auto: false,
          multiple: multiple,
          isFixed: true
        });
        if ($(window).width() < 768) {
          $('.product-set-container').each(function(key, val) {
            app.util.setCarousel({
              sliderid: $(val).find('.product-set-mobile-slider'),
              sliderwrapper: $(val).find('.product-col-1.product-set'),
              slide: $($(val).find('.product-col-1.product-set')).find('li'),
              isZoom: true,
            });
            /*setTimeout(function(){
	                        $(val).find('.product-col-1').css('top', $($(val).find('.product-content-header')).outerHeight() + "px");
	                        $($(val).find('.product-overflow-image')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
	                        $($(val).find('.product-col-1')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
	                        $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).load(function () {
	                            $($(val).find('.product-overflow-image')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
	                            $($(val).find('.product-col-1')).css('height', $($(val).find('.product-set-mobile-slider .ps-medium-img:first img')).outerHeight());
	                        });
                        }, 500);
                        */
          });
        } else {
          $($('.product-col-1.product-set').find('li')).removeAttr('style');
          $($('.product-col-1.product-set').find('.jcarousel-prev')).remove();
          $($('.product-col-1.product-set').find('.jcarousel-next')).remove();
        }
      });
      $('.product-set-mobile-slider .zoom-image.alone a.zoom.pdp-controls').on('click touchstart', function(e) {
        e.preventDefault();
        $('.product-set-mobile-slider').find('li').removeClass('zoom-selected');
        $(this).parents('li').addClass('zoom-selected');
      });
      this.toggleMoreDetails();
      this.openZoom();
      /*
      if ($('.shop-by-look-slider')[0]) {
          $('.shop-by-look-slider li .selected-overlay').off('mouseenter').on('mouseenter', function () {
              var img = $($(this).parent()).find('img'),
                  selectedImg = $(this);
              $(img).css({
                  'position': 'absolute',
                  '-webkit-transform': 'scale(1.2,1.2)',
                  '-ms-transform': 'scale(1.2,1.2)',
                  'transform': 'scale(1.2,1.2)',
                  'z-index': '10'
              });
              $(selectedImg).css({
                  '-webkit-transform': 'scale(1.2,2.2)',
                  '-ms-transform': 'scale(1.2,1.2)',
                  'transform': 'scale(1.2,1.2)'
              });

          }).off('mouseleave').on('mouseleave', function () {
              var img = $($(this).parent()).find('img'),
                  selectedImg = $(this);
              $(img).removeAttr('style');
              $(selectedImg).css({
                  '-webkit-transform': '',
                  '-ms-transform': '',
                  'transform': ''
              });
          });
      }*/
    },
    initLookPDPCarousel: function(wrapper, delay) {
      var sliders = $(wrapper).find('.product-slides-list li').length,
        winWidth = $(window).width();
      var pdpCircular = true;
      if ((sliders <= 2 && winWidth >= 1024) || (sliders == 1)) {
        pdpCircular = false;
      }
      //             	 app.util.setCarousel({
      //                      sliderid: $(wrapper).find('.product-slides-list'),
      //                      sliderwrapper: $(wrapper),
      //                      slide: $(wrapper).find('.product-slides-list li'),
      //                      auto: false,
      //                      scroll: '1',
      //                      circular: pdpCircular,
      //                      isZoom: true
      //                  });
      var element = $(wrapper).find('.product-slides-list');
      //if($("body").width() )
      var setting = {
        prevSelector: $(wrapper).find(".slider-prev1"),
        nextSelector: $(wrapper).find(".slider-next1"),
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
          $(wrapper).find(".slide-number1 .remaining").html(newIndex + 1);
        }
      };
      if ($("body").width() <= 768) {
        setting.controls = false;
        setting.pager = true;
      }
      $.each(window.sblSliderss, function(x, y) {
        if (typeof y.destroySlider != "undefined") {
          //console.log($(wrapper).find(".product-slides-list")[0]);
          if ($(wrapper).find(".product-slides-list")[0] === $(y[0])[0]) {
            //alert("hello");
            y.destroySlider();
          }
          //y.destroySlider();
        }
      });
      setTimeout(function() {
        var sliderss = element.css({
          height: "auto"
        }).bxSlider(setting);
        $(wrapper).find(".slide-number1 .remaining").html("1");
        $(wrapper).find(".slide-number1 .total").html(sliderss.getSlideCount());
        window.sblSliderss.push(sliderss);
      }, delay);
      if (sliders == 1) {
        $(this).addClass("no-slider");
      }
    },
    toggleMoreDetails: function() {
      $('.view-product-details').off('click').on('click', function() {
        $(this).next().toggleClass('hidden-shopbylook');
        if ($(this).text().trim() == 'View Product Details') {
          $(this).text('Hide Product Details');
        } else {
          $(this).text('View Product Details');
        }
      });
    },
    openZoom: function() {
      $('.zoom-img-ps').on('click', function() {
        var li = $(this).parents('li');
        var img = $(li).find('img');
        $(li).addClass('zoom-selected');
        DieselUS.ui.zoomWindow.zoomImg(this);
      });
    },
    /**
     * @private
     * @function
     * @description PDP carousel
     */
    setPdpCarousel: function() {
      $('.product-slides-wrapper').each(function() {
        var sliders = $(this).find('.product-slides-list li').length,
          winWidth = $(window).width();
        var pdpCircular = true;
        if (sliders == 1) { //(sliders <= 2 && winWidth >= 1024) || (sliders == 1)
          pdpCircular = false;
        }
        app.util.setCarousel({
          sliderid: $(this).find('.product-slides-list'),
          sliderwrapper: $(this),
          slide: $(this).find('.product-slides-list li'),
          auto: false,
          scroll: '1',
          circular: pdpCircular,
          isZoom: true
        });
        if (sliders == 1) {
          $(this).addClass("no-slider");
        }
      });
      /* Fix for DQP-2053  */
      var recoMultiple = 5,
        sliderWidth = 0;
      if ($('body').width() > 767 && $('body').width() < 1023) {
        recoMultiple = 3;
      } else if ($('body').width() > 1023 && $('body').width() < 1200) {
        recoMultiple = 4;
      } else if ($('body').width() > 319 && $('body').width() < 768) {
        recoMultiple = 3;
        if (window.innerHeight > window.innerWidth) { //Portrait mode
          sliderWidth = $(window).height();
        }
      } else if ($('body').width() >= 1200) {
        recoMultiple = 5;
      }
      app.util.setCarousel({
        sliderid: '.reco-slider',
        sliderwrapper: '.recommendations-wrapper',
        slide: '.recommendations-wrapper .reco-slider .reco-slides ',
        auto: false,
        circular: false,
        multiple: recoMultiple,
        isFixed: true,
        height: 423,
        width: sliderWidth || $('.recommendations-wrapper').width(),
        nav: false
      });
      var multiple = 4,
        wrapperWidth = 0;
      if ($('#QuickViewDialog').length > 0) {
        multiple = 3;
        wrapperWidth = 195;
        if ($('body').width() > 319 && $('body').width() < 768) {
          wrapperWidth = 108;
        }
      } else {
        /* Fix for DQP-2053  */
        if ($('body').width() > 767 && $('body').width() < 1023) {
          multiple = 3;
        } else if ($('body').width() > 1023 && $('body').width() < 1200) {
          multiple = 3;
        } else if ($('body').width() > 319 && $('body').width() < 768) {
          multiple = 3;
        } else if ($('body').width() >= 1200) {
          multiple = 4;
        }
      }
      $('.swatch-wrapper').each(function(key, val) {
        app.util.setCarousel({
          sliderid: $(val).find('.swatches.Color.color-slides'),
          sliderwrapper: $(val),
          auto: false,
          isFixed: true,
          width: wrapperWidth > 0 ? wrapperWidth : $($(val).find('.swatch-Slider')).width(),
          nav: false,
          multiple: multiple,
          sliderWidth: parseInt($(this).data('sliderwidth'), 10)
        });
      });
      $('.more-this-wrapper').each(function(key, val) {
        app.util.setCarousel({
          sliderid: $(val).find('.more-this-slider'),
          sliderwrapper: $(val),
          slide: '.more-this-wrapper .more-this-slider .more-this-slides ',
          auto: false,
          circular: false,
          multiple: recoMultiple,
          isFixed: true,
          height: 423,
          nav: false
        });
      });
      //JIRA : 2381
      if (window.DeviceOrientationEvent) {
        $(window).on('orientationchange', function() {
          //reinit color carousel
          if ($('#QuickViewDialog').dialog('isOpen') !== true) {
            $('.swatch-wrapper').each(function(key, val) {
              app.util.setCarousel({
                sliderid: $(val).find('.swatches.Color.color-slides'),
                sliderwrapper: $(val),
                auto: false,
                isFixed: true,
                width: wrapperWidth > 0 ? wrapperWidth : $($(val).find('.swatch-Slider')).width(),
                nav: false,
                multiple: multiple,
                sliderWidth: parseInt($(this).data('sliderwidth'), 10)
              });
            });
          }
        });
      }
    },
    /**
     * @function
     * @description Loads a product into a given container div
     * @param {Object}
     *            options An object with the following properties:</br>
     *            containerId - id of the container div, if empty then
     *            global app.containerId is used
     *            source - source string e.g. search, cart etc.
     *            label - label for the add to cart button, default is Add
     *            to Cart
     *            url - url to get the product
     *            id - id of the product to get, is optional only used when
     *            url is empty
     */
    get: function(options) {
      var target = options.target || app.quickView.init();
      var source = options.source || "";
      var productListID = options.productlistid || "";
      var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
      if (source.length > 0) {
        productUrl = app.util.appendParamToURL(productUrl, "source", source);
      }
      if (productListID.length > 0) {
        productUrl = app.util.appendParamToURL(productUrl, "productlistid", productListID);
      }
      // show small loading image
      app.ajax.load({
        target: target,
        url: productUrl,
        data: options.data || "",
        // replace with callback passed in by options
        callback: options.callback || app.product.init
      });
    },
    /**
     * @function
     * @description Gets the availability to given product and quantity
     */
    getAvailability: function(pid, quantity, callback) {
      app.ajax.getJson({
        url: app.util.appendParamsToUrl(app.urls.getAvailability, {
          pid: pid,
          Quantity: quantity
        }),
        callback: callback
      });
    },
    /**
     * @function
     * @description Initializes the 'AddThis'-functionality for the social
     *              sharing plugin
     */
    initAddThis: function(ele) {
      var addThisServices = ["compact", "facebook", "twitter", "google", "myspace"],
        addThisToolbox = $(".addthis_toolbox"),
        addThisLinks = "";
      var i, len = addThisServices.length;
      for (i = 0; i < len; i++) {
        addThisLinks += '<a class="addthis_button_' + addThisServices[i] + '"></a>';
      }
      if (addThisLinks.length === 0) {
        return;
      }
      if (ele) {
        ele.html(addThisLinks);
      } else {
        addThisToolbox.html(addThisLinks);
      }
      addthis.toolbox(".addthis_toolbox");
    },
    /**
     * @function
     * @description Binds the click event to a given target for the
     *              add-to-cart handling
     * @param {Element}
     *            target The target on which an add to cart event-handler
     *            will be set
     */
    initAddToCart: function(target) {
      if (target) {
        $(target).find('.add-to-cart').off('click').on('click', setAddToCartHandler);
      } else {
        $(".add-to-cart").off('click').on("click", setAddToCartHandler);
      }
    },
    invokeVariationSelection: function(url, isProductSet, that) {
      if (isProductSet === true) {
        var parent = $(that).closest(".zoom-image-container");
        var setContainer = $(parent).find(".product-set-image");
        var ic = $(that).closest(".product-set-item");
        productSetVariationSelection(ic, url, setContainer, parent);
      } else variationSelection(url);
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.product.tile
 */
(function(app, $) {
  var $cache = {};
  var isNewPLP = false;
  if ($('.plp-redesign')[0] && $('.product-tile.default-products').length > 0) {
    isNewPLP = true;
  }
  categoryHeaderBanner = function() {
    $("#primary .slot-grid-header").appendTo(".category-header-banner");
    $("#primary .category-heading").appendTo(".category-header");
  };
  // hover effect of Quickview product images
  quickviewHoverImage = function() {
    //  $($cache.container.find('.primary-image:visible:first')).load(function () {
    //     $(this).parents('li').css({'min-height': $(this).height(), 'min-width': $(this).width()});
    //  });
    $(window).resize(function() {
      $($cache.container.find('.primary-image')).each(function(key, val) {
        $(val).removeAttr('style');
        $(val).css('min-height', $(val).height());
      });
    });
    var imgLoaded = false;
    $('.product-tile .selected-overlay').off('click').on('click', function(e) {
      e.preventDefault();
      window.location.href = $($($(this).closest('li.selected')).find('a')).attr('href');
    });
  };
  /**
   * @private
   * @function
   * @description Initializes events on the product-tile for the following
   *              elements:
   *              swatches
   *              thumbnails
   */
  function initializeEvents() {
    app.quickView.initializeButton($cache.container, ".product-image");
    $($cache.container.find('.swatch-list a.swatch img')).off("mouseenter").on("mouseenter", function(e) {
      var altImg = JSON.parse($(this).attr('data-thumb')).altimg;
      var src = JSON.parse($(this).attr('data-thumb')).src;
      var primaryImg = $($($(this).closest('.product-tile-content')).find('.product-image a img.primary-image'));
      if (primaryImg.attr('src-backup') && primaryImg.attr('alt-backup')) {
        primaryImg.attr('src-backup', primaryImg.attr('src-backup'));
        primaryImg.attr('alt-backup', primaryImg.attr('alt-backup'));
      } else {
        primaryImg.attr('src-backup', primaryImg.attr('src'));
        primaryImg.attr('alt-backup', primaryImg.attr('data-altimg'));
      }
      primaryImg.attr('src', src);
      primaryImg.attr('data-altimg', altImg);
    });
    $($cache.container.find('.swatch-list a.swatch')).off('mouseenter').on('mouseenter', function(e) {
      e.preventDefault();
      $($($(this).closest('.swatch-list')).find('>li')).removeClass('selected');
      $($(this).parent()).addClass("selected");
      var img = $(this).find('img');
      var altImg = JSON.parse($(img).attr('data-thumb')).altimg;
      var src = JSON.parse($(img).attr('data-thumb')).src;
      var primaryImg = $($($(img).closest('.product-tile-content')).find('.product-image a img.primary-image'));
      $(primaryImg).parent().attr('href', $(this).attr('href'));
      $(primaryImg).removeAttr('src-backup');
      $(primaryImg).removeAttr('alt-backup');
      primaryImg.attr('src', src);
      primaryImg.attr('data-altimg', altImg);
      $($($(img).closest('.product-tile-content')).find('.product-image a')).attr('href', $(this).attr('href'));
    });
    if ($('.refinement')[0]) {
      $('.refinement').each(function() {
        var length = $(this).find('ul li').length;
        if (length == 0) {
          $(this).remove();
        }
      });
    }
  }

  function initShopByLookPLP() {
    /* Setting mobile image */
    if ($(window).width() < 767) {
      $(".search-result-content .product-image img").each(function() {
        var mobileImage = $(this).data('mobileimage');
        $(this).addClass('sbl-device').attr('src', mobileImage);
      });
    } else {
      $(".search-result-content .product-image img").each(function() {
        var desktopImage = $(this).data('desktopimage');
        $(this).addClass('sbl-desktop').attr('src', desktopImage);
      });
    }
    $(".sblLarge:first img").load(function() {
      if ($(window).width() > 767) {
        var largeImgHeight = $(".sblLarge:first").height();
        $(".sblMedium").css("height", largeImgHeight / 2);
      }
    });
    $(window).resize(function() {
      if ($(window).width() > 767) {
        var largeImgHeight = $(".sblLarge:first").height();
        $(".sblMedium").css("height", largeImgHeight / 2);
      }
    });
  }
  /** ************* app.product.tile public object ************** */
  app.product.tile = {
    /**
     * @function
     * @description Cache, events and initialization
     */
    init: function() {
      $cache = {
        container: $(".tiles-container"),
        scrollerDefault: $('.breadcrumb-and-pagination').length > 0 ? $('.breadcrumb-and-pagination').offset().top - 10 : 0
      };
      //console.log("hello" + $cache.scrollerDefault);
      categoryHeaderBanner();
      quickviewHoverImage();
      initializeEvents();
      var multiple = 3,
        wrapperWidth = 195;
      if ($('body').width() > 319 && $('body').width() < 768) {
        wrapperWidth = 108;
      }
      $('.grid-swatch-list').each(function(key, val) {
        if ($(val).find('.swatch-list li').length > 3) {
          app.util.setCarousel({
            sliderid: $(val).find('.swatch-list'),
            sliderwrapper: $(val),
            multiple: multiple,
            isFixed: true,
            width: wrapperWidth,
            height: $(val).find('.swatch-list').height()
          });
        }
      });
      $('.breadcrumb span.comma:last').hide();
      if ($("#primary.shopbylook").length > 0) initShopByLookPLP();
      /* Sticky filters */
      if ($(window).width() > 767 && $('#wrapper.plp-redesign.horizontal-filter') && $('#wrapper.plp-redesign.horizontal-filter').length) {
        var _this = this;
        this.stickyFilter();
        $(window).scroll(_this.stickyFilter);
      }
      app.util.lazyLoad();
    },
    stickyFilter: function() {
      var position = $('.breadcrumb').offset().top - 10;
      var wTop = $('html').scrollTop() > 0 ? $('html').scrollTop() : $('body').scrollTop(),
        hFilter = $('.refinementRedesign, .breadcrumb'),
        hSortBy = $('.search-result-options, .pagination'),
        dWidth = $('#wrapper').offset().left;
      var headerfilter = $('#search-result').offset().top;
      var contexualfilter = $('#search-result').offset().top + $('#search-result').outerHeight(true);
      if (wTop >= headerfilter && wTop < contexualfilter) {
        $('.refinementRedesign, .search-result-options, .breadcrumb, .pagination').addClass('fixed');
        var heightfilter = parseInt($(".refinementRedesign.fixed").outerHeight(), 10) + parseInt($(".refinementRedesign.fixed").outerHeight(), 10);
        $(".stickyfiltermove").css("height", heightfilter);
        $(".stickyfiltermove").css("display", "block");
        hFilter.css({
          'left': dWidth,
          'max-width': $('#wrapper').width()
        });
        hSortBy.css({
          'right': dWidth
        });
        $('.refinementRedesign').css("min-height", "40px");
      } else {
        $('.refinementRedesign, .search-result-options, .breadcrumb, .pagination').removeClass('fixed').removeAttr('style');
        $(".stickyfiltermove").css("visibility", "hidden");
        $(".stickyfiltermove").css("height", "0px");
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.product.compare
 */
(function(app, $) {
  var $cache = {},
    _currentCategory = "",
    _isClearing = false,
    MAX_ACTIVE = 6,
    CI_PREFIX = "ci-";
  /**
   * @private
   * @function
   * @description Verifies the number of elements in the compare container and
   *              updates it with sequential classes for ui targeting
   */
  function refreshContainer() {
    if (_isClearing) {
      return;
    }
    var ac = $cache.compareContainer.find(".active").length;
    if (ac < 2) {
      $cache.compareButton.attr("disabled", "disabled");
    } else {
      $cache.compareButton.removeAttr("disabled");
    }
    // update list with sequential classes for ui targeting
    var compareItems = $cache.compareContainer.find('.compare-item');
    for (i = 0; i < compareItems.length; i++) {
      compareItems.removeClass('compare-item-' + i);
      $(compareItems[i]).addClass('compare-item-' + i);
    }
    $cache.compareContainer.toggle(ac > 0);
  }
  /**
   * @private
   * @function
   * @description Adds an item to the compare container and refreshes it
   */
  function addToList(data) {
    // get the first compare-item not currently active
    var item = $cache.compareContainer.find(".compare-item").not(".active").first();
    if (item.length === 0) {
      return;
    } // safety only
    // if already added somehow, return
    if ($("#" + CI_PREFIX + data.uuid).length > 0) {
      return;
    }
    // set as active item
    item.addClass("active").attr("id", CI_PREFIX + data.uuid).data("itemid", data.itemid);
    // replace the item image
    var itemImg = item.children("img.compareproduct").first();
    itemImg.attr({
      src: $(data.img).attr("src"),
      alt: $(data.img).attr("alt")
    });
    // refresh container state
    refreshContainer();
    var tile = $("#" + data.uuid);
    if (tile.length === 0) {
      return;
    }
    // ensure that the associated checkbox is checked
    tile.find(".compare-check")[0].checked = true;
  }
  /**
   * @private
   * @function description Removes an item from the compare container and
   *           refreshes it
   */
  function removeFromList(uuid) {
    var item = $("#" + CI_PREFIX + uuid);
    if (item.length === 0) {
      return;
    }
    // replace the item image
    var itemImg = item.children("img.compareproduct").first();
    itemImg.attr({
      src: app.urls.compareEmptyImage,
      alt: app.resources.EMPTY_IMG_ALT
    });
    // remove class, data and id from item
    item.removeClass("active").removeAttr("id").removeAttr("data-itemid").data("itemid", "");
    // use clone to prevent image flash when removing item from list
    var cloneItem = item.clone();
    item.remove();
    cloneItem.appendTo($cache.comparePanel);
    refreshContainer();
    // ensure that the associated checkbox is not checked
    var tile = $("#" + uuid);
    if (tile.length === 0) {
      return;
    }
    tile.find(".compare-check")[0].checked = false;
  }
  /**
   * @private
   * @function description Initializes the cache of compare container
   */
  function initializeCache() {
    $cache = {
      primaryContent: $("#primary"),
      compareContainer: $("#compare-items"),
      compareButton: $("#compare-items-button"),
      clearButton: $("#clear-compared-items"),
      comparePanel: $("#compare-items-panel")
    };
  }
  /**
   * @private
   * @function
   * @description Initializes the DOM-Object of the compare container
   */
  function initializeDom() {
    _currentCategory = $cache.compareContainer.data("category") || "";
    var active = $cache.compareContainer.find(".compare-item").filter(".active");
    active.each(function() {
      var uuid = this.id.substr(CI_PREFIX.length);
      var tile = $("#" + uuid);
      if (tile.length === 0) {
        return;
      }
      tile.find(".compare-check")[0].checked = true;
    });
    // set container state
    refreshContainer();
  }
  /**
   * @private
   * @function
   * @description Initializes the events on the compare container
   */
  function initializeEvents() {
    // add event to buttons to remove products
    $cache.primaryContent.on("click", ".compare-item-remove", function(e, async) {
      var item = $(this).closest(".compare-item");
      var uuid = item[0].id.substr(CI_PREFIX.length);
      var tile = $("#" + uuid);
      var args = {
        itemid: item.data("itemid"),
        uuid: uuid,
        cb: tile.length === 0 ? null : tile.find(".compare-check"),
        async: async
      };
      app.product.compare.removeProduct(args);
      refreshContainer();
    });
    // Button to go to compare page
    $cache.primaryContent.on("click", "#compare-items-button", function(e) {
      window.location.href = app.util.appendParamToURL(app.urls.compareShow, "category", _currentCategory);
    });
    // Button to clear all compared items
    $cache.primaryContent.on("click", "#clear-compared-items", function(e) {
      _isClearing = true;
      $cache.compareContainer.hide().find(".active .compare-item-remove").trigger("click", [false]);
      _isClearing = false;
    });
  }
  /** ************* app.product.compare public object ************** */
  app.product.compare = {
    /**
     * @function
     * @description Cache, events and initialization
     */
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
    },
    initCache: initializeCache,
    /**
     * @function
     * @description Adds product to the compare table
     */
    addProduct: function(args) {
      var items = $cache.compareContainer.find(".compare-item");
      var cb = $(args.cb);
      var ac = items.filter(".active").length;
      if (ac === MAX_ACTIVE) {
        if (!window.confirm(app.resources.COMPARE_CONFIRMATION)) {
          cb[0].checked = false;
          return;
        }
        // remove product using id
        var item = items.first();
        // safety check only. should never occur.
        if (item[0].id.indexOf(CI_PREFIX) !== 0) {
          cb[0].checked = false;
          window.alert(app.resources.COMPARE_ADD_FAIL);
          return;
        }
        var uuid = item[0].id.substr(CI_PREFIX.length);
        app.product.compare.removeProduct({
          itemid: item.data("itemid"),
          uuid: uuid,
          cb: $("#" + uuid).find(".compare-check")
        });
      }
      app.ajax.getJson({
        url: app.urls.compareAdd,
        data: {
          'pid': args.itemid,
          'category': _currentCategory
        },
        callback: function(response) {
          if (!response || !response.success) {
            // response failed. uncheck the checkbox return
            cb.checked = false;
            window.alert(app.resources.COMPARE_ADD_FAIL);
            return;
          }
          // item successfully stored in session, now add to list...
          addToList(args);
        }
      });
    },
    /**
     * @function
     * @description Removes product from the compare table
     */
    removeProduct: function(args) {
      if (!args.itemid) {
        return;
      }
      var cb = args.cb ? $(args.cb) : null;
      app.ajax.getJson({
        url: app.urls.compareRemove,
        data: {
          'pid': args.itemid,
          'category': _currentCategory
        },
        async: args.async,
        callback: function(response) {
          if (!response || !response.success) {
            // response failed. uncheck the checkbox return
            if (cb && cb.length > 0) {
              cb[0].checked = true;
            }
            window.alert(app.resources.COMPARE_REMOVE_FAIL);
            return;
          }
          // item successfully removed session, now remove from to
          // list...
          removeFromList(args.uuid);
        }
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.compare
 */
(function(app, $) {
  var $cache = {};
  /**
   * @private
   * @function
   * @description Initializes the cache on the compare table
   */
  function initializeCache() {
    $cache = {
      compareTable: $("#compare-table"),
      categoryList: $("#compare-category-list")
    };
  }
  /**
   * @private
   * @function
   * @description Initializes the DOM on the product tile
   */
  function initializeDom() {
    app.product.tile.init();
  }
  /**
   * @private
   * @function
   * @description Binds the click events to the remove-link and quick-view
   *              button
   */
  function initializeEvents() {
    $cache.compareTable.on("click", ".remove-link", function(e) {
      e.preventDefault();
      app.ajax.getJson({
        url: this.href,
        callback: function(response) {
          app.page.refresh();
        }
      });
    }).on("click", ".open-quick-view", function(e) {
      e.preventDefault();
      var form = $(this).closest("form");
      app.quickView.show({
        url: form.attr("action"),
        source: "quickview",
        data: form.serialize()
      });
    });
    $cache.categoryList.on("change", function() {
      $(this).closest("form").submit();
    });
  }
  /** ************* app.compare public object ************** */
  app.compare = {
    /**
     * @function
     * @description Initializing of Cache, DOM and events
     */
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
      app.product.initAddToCart();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.sendToFriend
 */
(function(app, $) {
  var $cache = {},
    initialized = false;
  /**
   * @private
   * @function
   * @description Initializes the events (preview, send, edit, cancel and
   *              close) on the send to friend form
   */
  function initializeEvents() {
    app.util.limitCharacters();
    if (initialized) {
      return;
    }
    $cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function(e) {
      e.preventDefault();
      $cache.form.validate();
      if (!$cache.form.valid()) {
        return false;
      }
      var requestType = $cache.form.find("#request-type");
      if (requestType.length > 0) {
        requestType.remove();
      }
      $("<input/>").attr({
        id: "request-type",
        type: "hidden",
        name: $(this).attr("name"),
        value: $(this).attr("value")
      }).appendTo($cache.form);
      var data = $cache.form.serialize();
      app.ajax.load({
        url: $cache.form.attr("action"),
        data: data,
        target: $cache.dialog,
        callback: function() {
          app.validator.init();
          app.util.limitCharacters();
          $cache.form = $("#send-to-friend-form");
          $(".ui-dialog-content").dialog("option", "position", "center");
        }
      });
    }).on("click", ".cancel-button, .close-button", function(e) {
      e.preventDefault();
      $cache.dialog.dialog("close");
    });
    initialized = true;
  }
  /** ************* app.sendToFriend public object ************** */
  app.sendToFriend = {
    init: function() {
      $cache = {
        form: $("#send-to-friend-form"),
        dialog: $("#send-to-friend-dialog"),
        pdpForm: $("form.pdpForm")
      };
      initializeEvents();
    },
    /**
     * @function
     * @description
     */
    initializeDialog: function(eventDelegate, eventTarget) {
      $(eventDelegate).on("click", eventTarget, function(e) {
        e.preventDefault();
        var dlg = app.dialog.create({
          target: $("#send-to-friend-dialog"),
          options: {
            width: 600,
            height: 'auto',
            dialogClass: 'basic-dialog-theming send-to-friend-privacy',
            title: this.title,
            open: function() {
              app.sendToFriend.init();
              app.validator.init();
            }
          }
        });
        var data = app.util.getQueryStringParams($("form.pdpForm").serialize());
        if (data.cartAction) {
          delete data.cartAction;
        }
        var url = app.util.appendParamsToUrl(this.href, data);
        url = this.protocol + "//" + this.hostname + ((url.charAt(0) === "/") ? url : ("/" + url));
        app.ajax.load({
          url: app.util.ajaxUrl(url),
          target: dlg,
          callback: function() {
            dlg.dialog("open"); // open after load to ensure dialog is centered
          }
        });
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.search
 */
(function(app, $) {
  var $cache = {},
    shufflepl = 0,
    denimGuidePath = window.location.pathname,
    hashObj = {},
    otherHashString = "";
  searchFilterV2 = false; //boolean to check new version of search filter
  /**
   * @private
   * @function
   * @description replaces breadcrumbs, lefthand nav and product listing with
   *              ajax and puts a loading indicator over the product listing
   */
  function updateProductListing(isHashChange) {
    var hash = encodeURI(decodeURIComponent(window.location.hash));
    if (searchFilterV2 === true) {
      hashUrlToHashObj(decodeURIComponent(window.location.hash));
    }
    if (hash === '#results-content' || hash === '#results-products' || hash === "#primary") {
      return;
    }
    /*
     * Denim guide code changes
     */
    var refineUrl = null,
      actualUrl,
      denimGuidePLP = $('#denim-guide-product-listing');
    actualUrl = denimGuidePLP.length > 0 ? denimGuidePath : window.location.pathname;
    if (hash.length > 0) {
      refineUrl = actualUrl + "?" + hash.substr(1);
    } else if (isHashChange) {
      refineUrl = window.location.href;
    }
    if (!refineUrl) {
      return;
    }
    refineUrl = refineUrl.replace('%2F', '\/');
    app.progress.show($cache.content);
    if (searchFilterV2 === true && hash.length === 0) {
      refineUrl = window.location.href.split('#')[0];
    }
    if (denimGuidePLP.length > 0) {
      $.get(app.util.appendParamToURL(refineUrl, "format", "ajax"), function(data) {
        var temp = $('<div> </div>');
        temp.html(data);
        $cache.main.find('.breadcrumb').html(temp.find('.breadcrumb').html());
        $cache.main.find('.pagination').html(temp.find('.pagination').html());
        $cache.main.find('#search-result').remove();
        $cache.main.append(temp.find('#search-result'));
        delete temp;
      }).done(function() {
        reInitializePLPDependencies();
      });
    } else {
      if (storeLocalplp.get("plpcountpdp") != null && storeLocalplp.get("plptileid") != null) {
        refineUrl = app.util.appendParamToURL(refineUrl, "elementsLoaded", storeLocalplp.get("plpcountpdp"));
      }
      $cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), reInitializePLPDependencies);
    }
  }
  /**
   *@function
   *@description reinitialize the javascripts after refinements in plp page
   *
   */
  app.filterFunctionality = {
    init: function() {
      var isMobile = $("body").width() <= 767;
      if ($(".filterNav.filterrefine").length > 0) {
        $(".filterNav").removeClass("filterrefine")
      }
      if (!$('.filterWrap').is('.started') && !isMobile) {
        //dividing elements into columns
        $('.filterWrap .col').each(function() {
          //console.log($(".filterContent").height());
          var parentLi = $(this).parents("li"),
            childrenLi = $(this).find("li").length,
            col = 1;
          if (childrenLi <= 4) {
            col = 1;
            parentLi.css('width', 230);
          } else if (childrenLi <= 6) {
            col = 2;
            parentLi.css('width', 350);
          } else {
            col = 3;
            parentLi.css('width', 471);
          }
          $(this).columnize({
            columns: col
          });
        });
        if ($("body").width() > 767) {
          if ($(".selectedFilters ul li").length >= 0 && app.ui.lastfilter == false) {
            $(".filterDetail").addClass("filterrefine");
          }
          if ($(".filterDetail").hasClass("filterrefine")) {
            if ($(".filterNav").hasClass("hideFilterDesc")) {
              $(".filterContent").css("height", "auto");
              $(".filterContentWrapper > ul > li").css("height", "auto");
              height = $(".filterWrap .filterContent").height() + $(".filterWrap .filterState").height() + 30;
              $(".filterDetail").animate({
                'height': height
              }, function() {
                $(".filterContentWrapper > ul > li").css("height", $(".filterWrap .filterContent").height());
              });
            } else {
              $(".filterContent").css("height", "0px");
              height = $(".filterWrap .filterState").height() + 30;
              $(".filterDetail").animate({
                'height': height
              });
            }
          }
        }
        //calculating amount left to animate
        var calculateLeft = function() {
            var animateEl = $(".filterContentWrapper"),
              parent = animateEl.parent(),
              percentBuffer = 5,
              bufferinPx = (parent.width() * percentBuffer) / 100,
              parentWidth = $(parent).width(),
              allElementWidth = 0;
            //setting positioning of elements
            $(".filterWrap .tabs nav a").each(function(event) {
              var tabMap = $(this).attr("data-id"),
                tabToShow = $(".filterContentWrapper li[data-map='" + tabMap + "']");
              //  event.isPropagationStopped();
              $(this).attr("data-offsetLeft", $(tabToShow).position().left);
            });
            //calculating every element width
            $(".filterContentWrapper > ul > li").each(function() {
              allElementWidth += $(this).width();
            });
            //assigning position to slide for responsiveness
            $(".filterContentWrapper > ul > li").each(function(i, v) {
              var that = this,
                newOffset = 0,
                nextAllWidth = $(that).outerWidth(),
                anchor = $(".filterWrap .tabs nav a").eq(i),
                dataOffset = parseFloat($(anchor).attr("data-offsetleft"));
              $(that).nextAll().each(function() {
                nextAllWidth += $(this).outerWidth();
              });
              if (allElementWidth < parentWidth) {
                $(anchor).attr("data-newOffset", 0);
              } else {
                if (parentWidth > nextAllWidth) {
                  newOffset = dataOffset - (parentWidth - nextAllWidth);
                  $(anchor).attr("data-newOffset", newOffset);
                } else $(anchor).attr("data-newOffset", dataOffset);
              }
            });
          },
          //common code for triggering click on previous next and swipe controls
          triggerClick = function(to) {
            var activeNav = $(".filterWrap .tabs nav a.active"),
              elTo = null;
            if ($(activeNav).length == 0) $(".filterWrap .tabs nav a:first").trigger("click");
            if (to == "prev") elTo = activeNav.prev();
            else if (to == "next") elTo = activeNav.next();
            $(elTo).trigger("click");
          },
          createFilterList = function() {
            $(".selectedFilters .wrapper ul").html("");
            $(".filterContentWrapper li.selected").each(function() {
              var text = $(this).text()
              $(".selectedFilters .wrapper ul").append("<li><a data-val='" + value + "'>" + text + "</a></li>");
            });
          };
        var allowBxSlider = function() {
          var fullWidth = $(".selectedFilters > .wrapper").width(),
            liLength = $(".selectedFilters .wrapper ul li").length
          fullliWidth = liLength * $(".selectedFilters .wrapper ul li:last").width() + ((liLength - 1) * 10);
          if (fullWidth < fullliWidth) {
            $(".selectedFilters .wrapper ul").bxSlider({
              minSlides: 6,
              maxSlides: 10,
              moveSlides: 1,
              slideWidth: 170,
              infiniteLoop: false,
              nextSelector: '.selectedFilters .next',
              prevSelector: '.selectedFilters .prev',
              wrapperClass: "bx-wrapper filterbxSlider"
            });
          }
        }();
        //tabbing events;
        $(".filterWrap .tabs nav a").bind('click', function(e) {
          e.preventDefault();
          var elementTo = $(".filterContentWrapper"),
            tabMap = $(this).attr("data-id"),
            tabToShow = $(".filterContentWrapper li[data-map='" + tabMap + "']"),
            offsetLeft = parseFloat($(this).attr("data-newOffset"));
          $(".filterContentWrapper li, .filterWrap .tabs nav a").removeClass("active");
          $(tabToShow).addClass("active");
          $(this).addClass("active");
          //animating element to position
          elementTo.animate({
            left: (-1) * offsetLeft
          }, 300, function() {
            app.ui.filterPosition = $(".filterContentWrapper").offset().left - 21;
            app.ui.currentSelectedFilter = $(".filterWrap .tabs nav a.active").data("id");
          });
        });
        //triggering on previous Next button
        $(".filterContent .controls .prev, .filterContent .controls .next").bind('click', function(e) {
          e.preventDefault();
          if ($(this).is(".prev")) triggerClick("prev");
          else if ($(this).is(".next")) triggerClick("next");
        });
        //selecting on element highlight
        $(".filterContentWrapper > ul > li").bind('click', function(e) {
          if (e.target.nodeName !== "A") {
            var tabMap = $(this).attr("data-map"),
              tabToShow = $(".filterWrap .tabs nav a[data-id='" + tabMap + "']");
            $(tabToShow).trigger("click");
          } else {
            app.ui.currentSelectedFilter = $(e.target).parents(".filterContentWrapper > ul > li").data("map");
          }
        });
        //reset filters
        $(".filterWrap .reset").bind("click", function(e) {
          app.ui.lastfilter = true;
          hashObj = {};
          var url = hashObjToHashUrl();
          //e.preventDefault();
          window.location.hash = url;
        });
        //remove filter
        /*$("body").on("click", ".selectedFilters .wrapper a", function(e) {
            e.preventDefault();
            var dataVal = $(this).attr("data-val");
            $(".filterContentWrapper input[value='" + dataVal + "']").prop("checked", false);
            $(".filterContentWrapper input:checkbox").trigger("change");
            $(".filterWrap").addClass("filterClicked");
        });*/
        //show hide filter
        $(".filterNav").bind("click", function(e) {
          e.preventDefault();
          var height = 0;
          if ($(".filterDetail").hasClass("filterrefine")) {
            if ($(this).is(".showFilterDesc")) {
              $(this).addClass("hideFilterDesc").removeClass("showFilterDesc");
              $(".filterContent").css("height", "auto");
              $(".filterContentWrapper > ul > li").css("height", "auto")
              height = $(".filterWrap .filterContent").height() + $(".filterWrap .filterState").height() + 30;
              $(".filterDetail").animate({
                'height': height
              }, function() {
                $(".filterContentWrapper > ul > li").css("height", $(".filterWrap .filterContent").height());
              });
            } else {
              $(this).removeClass("hideFilterDesc").addClass("showFilterDesc");
              $(".filterContent").css("height", "0px");
              height = $(".filterWrap .filterState").height() + 30;
              $(".filterDetail").animate({
                'height': height
              });
            }
          } else {
            if ($(this).is(".showFilterDesc")) {
              $(this).addClass("hideFilterDesc").removeClass("showFilterDesc");
              height = $(".filterWrap .filterContent").height() + $(".filterWrap .filterState").height() + 30;
            } else $(this).removeClass("hideFilterDesc").addClass("showFilterDesc");
            $(".filterDetail").animate({
              'height': height
            });
          }
        });
        $(".tabs nav a").bind("click", function(e) {
          if (!$(".filterNav").hasClass("hideFilterDesc")) {
            $(".filterNav").trigger("click");
          }
        });
        $(".filter_by").bind("click", function(e) {
          if (!$(".filterNav").hasClass("hideFilterDesc")) {
            $(".filterNav").trigger("click");
          } else if (!$(".filterNav").hasClass("showFilterDesc")) {
            $(".filterNav").trigger("click");
          }
        });
        calculateLeft();
        $(".filterContentWrapper > ul > li").css('height', $(".filterWrap .filterContent").height());
        $(window).resize(function() {
          calculateLeft();
        });
        //swipe behaviour for tablets
        var elementToSwipe = $(".filterContentWrapper")[0],
          mc = new Hammer(elementToSwipe),
          swipeDirection = "right";
        mc.on("panend", function(event) {
          if (swipeDirection == "left") $(".filterContent .controls .next").trigger("click");
          else if (swipeDirection == "right") $(".filterContent .controls .prev").trigger("click");
        });
        mc.on("panleft panright", function(event) {
          var eventType = event.type;
          if (eventType == "panleft") swipeDirection = "left";
          else if (eventType == "panright") swipeDirection = "right";
        });
        $(".filterWrap").addClass("started");
      } else {
        $(".filterContentWrapper h4").unbind("click").bind("click", function(e) {
          if (!$(this).hasClass('active')) {
            $(".filterContentWrapper h4").removeClass("active");
            $(".filterContentWrapper .col").slideUp();
            $(this).addClass('active');
            $(this).next('.col').slideDown(function() {});
            //		        		$(this).next('.discription-list').css({
            //		        			'overflow':'auto'
            //		        		})
          } else {
            $(".filterContentWrapper h4").removeClass("active");
            $(".filterContentWrapper .col").slideUp();
          }
          return false;
        });
        $(".filterNav").unbind("click").bind("click", function(e) {
          e.preventDefault();
          $(".filterWrap").hide();
          $(".filterOverlay").remove();
        });
        $(".showFilter.mobile").unbind("click").bind("click", function(e) {
          e.preventDefault();
          $(".filterWrap").show();
          $(".filterWrap").before("<div class='filterOverlay'>&nbsp;</div>")
        });
        //reset filters
        $(".filterWrap .reset").bind("click", function() {
          hashObj = {};
          var url = hashObjToHashUrl();
          window.location.hash = url;
        });
        $(".filterWrap").css('height', $(window).height());
      }
    }
  }

  function changeBrand() {
    //shuffleplp=1;
    var value = $(".selectedBrandValue").val(),
      val = value.toLowerCase();
    containers = $(".first-cat, .next-cat");
    $('.select-brand-dropdown select option[value="' + value + '"]').prop('selected', true);
    $(containers).addClass('hideMe');
    $(".search-result-options .result-options-right .pagination").show();
    if (val == "all" || val == "" || val == "selectbrand") {
      $(containers).removeClass('hideMe');
    } else if (val === "diesel") {
      $(".first-cat").removeClass('hideMe');
    } else if (val === "dbg") {
      $(".next-cat").removeClass('hideMe');
      $(".search-result-options .result-options-right .pagination").hide();
    }
    return false;
  }

  function changeView() {
    var value = $(".plp_view_type").val(),
      val = value.toLowerCase();
    if (val === "outfit_view") {
      $(".result-options-left > li#outfit-view-tab").trigger("click");
    }
    return false;
  }

  function reInitializePLPDependencies() {
    changeBrand();
    app.product.compare.init();
    app.product.tile.init();
    //    app.filterFunctionality.init();
    app.progress.hide();
    if (app.clientcache.LISTING_INFINITE_SCROLL) {
      jQuery(document).trigger('grid-update');
    }
    $('#secondary').show();
    $('.search-result-options .refinements-filter').hide();
    $('#primary').removeClass('full-width');
    $('#primary').addClass('default-column');
    $('.refinement h3.toggle.expanded').next('ul').hide();
    if ($('body').hasClass('cat-dieselblackgold') && $('#search-result').attr('data-layout') == 'denim') {
      //Denim DBG
    } else {
      $('.refinement h3.toggle.expanded').each(function(k, val) {
        if ($(this).parent().css('display') == 'block') {
          $(this).removeClass('expanded').next('ul').show();
          return false;
        }
      });
    }
    DieselUS.ui.leftNavCheck.init();
    // event tracking for refinement on search result        
    $('.refinement').on('click', 'a', function(e) {
      var baseRefinement = $(this).parents('.refinement').attr('class').trim();
      var baseRefinementArr = baseRefinement.split(' ');
      var pageName = $('.pageName:visible').attr('data-pagename');
      if (pageName) {
        if (pageName === 'Denim Guide') {
          app.analytics.init(app.$cache[56].event_cat, app.$cache[56].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
        } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
      } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
    });
    customizeSelectNow();
    setTimeout(function() {
      if ($('.breadcrumb-refined-by').next().length === 0 || !($($('.breadcrumb-refined-by').next()).is(':visible'))) {
        $('.breadcrumb-refined-by').hide();
      }
    }, 100);
    $(".loader").remove();
    if (searchFilterV2 === true) {
      reInitRedesignFilter();
    }
    $('.loader').hide();
    setTimeout(changeView(), 1000);
    $(".filterContentWrapper").css("left", app.ui.filterPosition);
    $(".filterWrap .tabs nav a[data-id='" + app.ui.currentSelectedFilter + "']").addClass("active");
    $(".filterContentWrapper ul li[data-map='" + app.ui.currentSelectedFilter + "']").addClass("active");
    if ($("#" + storeLocalplp.get("plptileid")).length > 0) {
      $("html, body").scrollTop($("#" + storeLocalplp.get("plptileid")).offset().top);
      // if(storeLocalplp.get("plpcountpdp")!=null){
      storeLocalplp.remove("plpcountpdp");
      storeLocalplp.remove("plptileid");
      storeLocalplp.remove("plpwindowurl");
      storeLocalplp.remove("plpcountpdpdbg");
      storeLocalplp.remove("plpsection");
      storeLocalplp.remove("plptopdp");
      //  }
    }
  }
  //pagination for the scroll replace by the click
  /**
   * @private
   * @function
   * @description
   */
  /**
   * @private
   * @function
   * @description
   */
  //    function initInfiniteScroll() {
  //        jQuery(window)
  //            .bind(
  //                'scroll ready grid-update',
  //                function (e) {
  //                    // getting the hidden div, which is the placeholder
  //                    // for the next page
  //                    var loadingPlaceHolder = jQuery('.infinite-scroll-placeholder[data-loading-state="unloaded"]');
  //                    if (loadingPlaceHolder.length == 1 && app.util.elementInViewport(loadingPlaceHolder.get(0), 270)) {
  //                        // switch state to 'loading'
  //                        // - switches state, so the above selector is
  //                        // only matching once
  //                        // - shows loading indicator
  //                        loadingPlaceHolder.attr('data-loading-state',
  //                            'loading');
  //                        loadingPlaceHolder
  //                            .addClass('infinite-scroll-loading');
  //
  //                        // get url hidden in DOM
  //                        var gridUrl = loadingPlaceHolder
  //                            .attr('data-grid-url');
  //
  //                        /**
  //                         * named wrapper function, which can either be
  //                         * called, if cache is hit, or ajax repsonse is
  //                         * received
  //                         */
  //                        var fillEndlessScrollChunk = function (html) {
  //                            loadingPlaceHolder
  //                                .removeClass('infinite-scroll-loading');
  //                            loadingPlaceHolder.attr(
  //                                'data-loading-state', 'loaded');
  //                            jQuery('.search-result-items').append(
  //                                html);
  //                            jQuery(document).trigger('grid-update');
  //                            setTimeout(function () {
  //                                app.product.tile.init();
  //                            }, 200);
  //
  //                        };
  //                        if (app.clientcache.LISTING_INFINITE_SCROLL && 'sessionStorage' in window && sessionStorage["scroll-cache_" + gridUrl]) {
  //                            // if we hit the cache
  //                            fillEndlessScrollChunk(sessionStorage["scroll-cache_" + gridUrl]);
  //                        } else {
  //                            // else do query via ajax
  //                            jQuery.ajax({
  //                                type: "GET",
  //                                dataType: 'html',
  //                                url: gridUrl,
  //                                success: function (response) {
  //                                    // put response into cache
  //                                    try {
  //                                        sessionStorage["scroll-cache_" + gridUrl] = response;
  //                                    } catch (e) {
  //                                        // nothing to catch in case of out of memory of session storage it will fall back to load via ajax
  //                                    }
  //                                    // update UI
  //                                    fillEndlessScrollChunk(response);
  //                                }
  //                            });
  //                        }
  //                    }
  //                });
  //    }
  /**
   * @private
   * @function
   * @description Initializes events for the following elements:<br/>
   *              refinement blocks
   *              updating grid: refinements, pagination, breadcrumb
   *              item click
   *              sorting changes
   */
  function initializeEvents() {
    // compare checked
    $cache.main.on("click", "input[type='checkbox'].compare-check", function(e) {
      var cb = $(this);
      var tile = cb.closest(".product-tile");
      var func = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
      var itemImg = tile.find("div.product-image a img").first();
      func({
        itemid: tile.data("itemid"),
        uuid: tile[0].id,
        img: itemImg
      });
    });
    // handle toggle refinement blocks
    $cache.main.on("click", ".refinement h3.toggle", function(e) {
      e.preventDefault();
      var $div = $(this).next('ul');
      if ($div.is(":visible")) {
        $(this).addClass('expanded').next('ul').hide();
      } else {
        $(this).removeClass('expanded').next('ul').show();
      }
    });
    DieselUS.ui.leftNavCheck.init();
    $('.denim-guide-link').off('click').on('click', function(e) {
      e.preventDefault();
      window.location.href = $(this).attr('href');
    });
    // Filter events for older version
    if (searchFilterV2 === false) {
      $cache.main.on("click", ".filterContentWrapper a", function(e) {
        if ($(this).is(".refinement-link")) {
          window.location.href = $(this).attr("href");
          return false;
        }
        if ($(this).is(".apply")) {
          //do nothing
        } else {
          $(".filterWrap").addClass("filterClicked");
        }
        if ($(this).parent().hasClass("unselectable")) {
          return;
        }
        var catparent = $(this).parents('.category-refinement');
        var folderparent = $(this).parents('.folder-refinement');
        // if the anchor tag is uunderneath a div with the
        // class names & , prevent the double encoding of
        // the url
        // else handle the encoding for the url
        if (catparent.length > 0 || folderparent.length > 0) {
          return true;
        } else {
          e.preventDefault();
          if ($(e.target).is('a')) {
            denimGuidePath = $(e.target).attr('href').split('?')[0];
          }
          var uri = app.util.getUri(this);
          if (uri.query.length > 1) {
            window.location.hash = encodeURI(decodeURI(uri.query.substring(1)));
          } else {
            window.location.href = this.href;
          }
          return false;
        }
      });
    } /**/
    // handle events for updating grid
    // handle events item click. append params.
    $cache.main.on("click", ".product-tile a:not('#quickviewbutton')", function(e) {
      var a = $(this);
      // get current page refinement values
      var wl = window.location;
      var qsParams = (wl.search.length > 1) ? app.util.getQueryStringParams(wl.search.substr(1)) : {};
      var hashParams = (wl.hash.length > 1) ? app.util.getQueryStringParams(wl.hash.substr(1)) : {};
      // merge hash params with querystring params
      var params = $.extend(hashParams, qsParams);
      if (!params.start) {
        params.start = 0;
      }
      // get the index of the selected item and save as start
      // parameter
      var tile = a.closest(".product-tile");
      var idx = tile.data("idx") ? +tile.data("idx") : 0;
      // convert params.start to integer and add index
      params.start = (+params.start) + (idx + 1);
      // set the hash and allow normal action to continue
      a[0].hash = $.param(params);
    });
    // handle sorting change
    $cache.main.on("change", ".sort-by select", function(e) {
      var refineUrl = $(this).find('option:selected').val();
      var uri = app.util.getUri(refineUrl);
      denimGuidePath = refineUrl.split('?')[0];
      window.location.hash = uri.query.substr(1);
      return false;
    }).on("change", ".items-per-page select", function(e) {
      var refineUrl = $(this).find('option:selected').val();
      if (refineUrl == "INFINITE_SCROLL") {
        jQuery('html').addClass('infinite-scroll');
        jQuery('html').removeClass('disable-infinite-scroll');
      } else {
        jQuery('html').addClass('disable-infinite-scroll');
        jQuery('html').removeClass('infinite-scroll');
        var uri = app.util.getUri(refineUrl);
        window.location.hash = uri.query.substr(1);
      }
      return false;
    }).on("change", ".select-brand-dropdown select", function(e) {
      $(".selectedBrandValue").val($(this).val());
      changeBrand();
      app.plpBanner.init();
    });
    $("body").prepend("<input type='hidden' class='selectedBrandValue' /> <input type='hidden' class='plp_view_type' />");
    // handle hash change
    $(window).hashchange(function() {
      updateProductListing(true);
    });
  }

  function initializeFilterEvent() {
    // filter click event
    $cache.main.on("click", ".refinement-item  li span", function(e) {
      if ($(this).parent().hasClass("unselectable")) {
        return;
      }
      $(this).parent().toggleClass('selected');
    });
    // filter apply event
    /*  $(document).on("click",".filterState .apply",function (e) {
      	 if($("body").width()>767){
      		if($(".selectedFilters ul li").length<1 ){  
      			app.ui.lastfilter=true;
      		}
      		else{
      			app.ui.lastfilter=false;
      		}
      	 }
      	$(".filterNav").addClass("filterrefine");
      	updateProductListing(true);
      	
      });*/
    $(document).on("click", ".apply-refinement span", function(e) {
      var selEleArray = [],
        prefName = $(this).parents('.refinement-item').find('li a:first').data('prefn'),
        selectedItems = $(this).parents('.refinement-item').find('li.selected a'),
        pageName = $('.pageName:visible').attr('data-pagename'),
        refinementName = $(this).parents("li.refinement-header-item").find("h3:first span").text();
      if (pageName) {
        if (pageName === 'Denim Guide') {
          app.analytics.init(app.$cache[56].event_cat, app.$cache[56].event_action, refinementName);
        } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, refinementName);
      } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, refinementName);
      if (selectedItems.length === 0) {
        if (hashObj.hasOwnProperty(prefName)) {
          //Removing from prefname from hashObj
          resetHashObj(prefName);
        } else {
          return;
        }
      } else {
        selectedItems.each(function() {
          var prefValue = $(this).data('prefv');
          selEleArray.push(prefValue);
        });
        //Adding element to hashObject
        if (hashObj.hasOwnProperty(prefName)) {
          hashObj[prefName]["value"] = selEleArray;
        } else {
          var jsonObj = {
            "value": selEleArray
          };
          hashObj[prefName] = jsonObj;
        }
        if ($('.category-images')[0] && $('.category-images li.active')[0]) {
          denimGuidePath = $(this).parents('.refinement-item').find('li:first a').attr('href').split('?')[0];
        }
        var url = hashObjToHashUrl();
        window.location.hash = url;
      }
    });
    // Globally resest filter
    $(document).on("click", ".filter-global-reset span", function(e) {
      hashObj = {};
      var url = hashObjToHashUrl();
      window.location.hash = url;
    });
    $(document).on("click", ".refinements a, .pagination a, .breadcrumb-refinement-value a", function(e) {
      if ($(this).parent().hasClass("unselectable")) {
        return;
      }
      if ($(this).parent().hasClass("reset-refinement")) {
        /* Local reset */
        var allItems = $('.refinement-item');
        allItems.find('li').removeClass('selected');
        var pageName = $('.pageName:visible').attr('data-pagename'),
          refinementName = $(this).parents("li.refinement-header-item").find("h3:first span").text();
        if (pageName) {
          if (pageName === 'Denim Guide') {
            app.analytics.init(app.$cache[56].event_cat, app.$cache[56].event_action, refinementName);
          } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, refinementName);
        } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, refinementName);
      }
      var catparent = $(this).parents('.category-refinement'),
        folderparent = $(this).parents('.folder-refinement');
      // if the anchor tag is uunderneath a div with the
      // class names & , prevent the double encoding of
      // the url
      // else handle the encoding for the url
      if (catparent.length > 0 || folderparent.length > 0) {
        return true;
      } else {
        e.preventDefault();
        if ($(window).width() >= 768) {
          //filter pref is clicked
          var listItems = $(this).parents('.refinement-item li');
          if (listItems.length > 0) {
            if ($(this).parent().hasClass("unselectable")) {
              return;
            }
            $(this).parent().toggleClass('selected');
            return;
          }
        }
        if ($(e.target).is('a')) {
          denimGuidePath = $(e.target).attr('href').split('?')[0];
        }
        var uri = app.util.getUri(this);
        if (uri.query.length > 1) {
          window.location.hash = encodeURIComponent(decodeURIComponent(uri.query.substring(1)));
        } else {
          window.location.href = this.href;
        }
        return false;
      }
    });
    $cache.main.on("click", ". filter-global-reset", function() {
      $(this).hide();
      $(".filter-wrapper").show();
    });
    $(document).on("click", ".show-filter", function() { //For mobile
      $(this).hide();
      $(".filter-wrapper").show();
    });
    $(document).on("click", ".hide-filter-block", function() { // For mobile
      $(this).parents('.filter-wrapper').hide();
      $(".show-filter").show();
    });
  }

  function hashUrlToHashObj(hash) {
    // find prefn
    hash = decodeURI(hash).substr(1);
    hashObj = {};
    var hashArr = hash.split('&');
    var otherHashArr = [],
      prefIndex, equalToPos;
    for (var i = 0; i < hashArr.length; i++) {
      if (hashArr[i].indexOf('prefn') === 0) {
        equalToPos = hashArr[i].indexOf('=');
        prefIndex = hashArr[i].substring(5, equalToPos);
        var prefName = hashArr[i].substr(equalToPos + 1);
        hashObj[prefName] = {
          "key": prefIndex
        };
      } else if (hashArr[i].indexOf('prefv') !== 0) {
        otherHashArr.push(hashArr[i]);
      }
    }
    // find prefv	
    for (var i = 0; i < hashArr.length; i++) {
      if (hashArr[i].indexOf('prefv') === 0) {
        equalToPos = hashArr[i].indexOf('=');
        prefIndex = hashArr[i].substring(5, equalToPos);
        var prefvString = hashArr[i].substr(equalToPos + 1);
        var prefvArr = prefvString.split("|");
        for (var obj in hashObj) {
          if (hashObj.hasOwnProperty(obj)) {
            if (hashObj[obj]["key"] == prefIndex) {
              hashObj[obj]["value"] = prefvArr;
            }
          }
        }
      }
    }
    if (otherHashArr.length > 0) {
      otherHashString = otherHashArr.join("&");
    }
  }

  function hashObjToHashUrl() {
    var hashData = "";
    var i = 1;
    for (var obj in hashObj) {
      var prefName = obj;
      var prefValues = hashObj[obj]["value"].join("|");
      if (i > 1) hashData += "&";
      hashData = hashData + "prefn" + i + "=" + prefName + "&prefv" + i + "=" + prefValues;
      i++;
    }
    if (otherHashString.length > 0) hashData = hashData.length > 0 ? hashData + "&" + otherHashString : otherHashString;
    //hashData = hashData+"&"+otherHashString;
    return hashData;
  }

  function addToHashObj(prefn, prefv) {
    if (hashObj.hasOwnProperty(prefn)) {
      if (hashObj[prefn]["value"].indexOf(prefv) === -1) {
        hashObj[prefn]["value"].push(prefv);
      }
    } else {
      var jsonObj = {
        "value": new Array(prefv)
      };
      hashObj[prefn] = jsonObj;
    }
  }

  function removeFromHashObj(prefn, prefv) {
    if (hashObj.hasOwnProperty(prefn)) {
      hashObj[prefn]["value"].splice(hashObj[prefn]["value"].indexOf(prefv), 1);
      if (hashObj[prefn]["value"].length === 0) delete(hashObj[prefn]);
    }
  }

  function resetHashObj(prefn) {
    if (hashObj.hasOwnProperty(prefn)) {
      delete(hashObj[prefn]);
    }
  }

  function initializeFilter() {
    $(document).on("click", ".refinement-header-item > h3", function(e) {
      $('.refinement-header-item').not($(e.target).parents('.refinement-header-item')).removeClass('active');
      $(this).parents('.refinement-header-item').toggleClass('active');
    });
    $("body").on("click", function(e) {
      if ($(e.target).parents('.refinement-header-item').length === 0) {
        $('.refinement-header-item').removeClass('active');
      }
    });
    reInitRedesignFilter();
  }

  function reInitRedesignFilter() {
    app.plpBanner.init();
    //Repositioning of refinement top level
    var refinementTopLevel = $(".refinement-list .category-refinement").find(".refinement-top-level");
    if (refinementTopLevel.length > 0) {
      $(".view-brand-link span").html($(refinementTopLevel[0]).html()).addClass('active');
    }
    //Removing empty filters
    var refinementHeaderList = $(".refinement-list .refinement-header-item .refinement-item ");
    $(refinementHeaderList).each(function() {
      if ($(this).find('ul>li').length === 0) {
        $(this).parent().hide();
      }
    });
    jQuery(document).trigger('plp-reinitialize');
  }

  function initializeHashObj() {
    var queryString = location.search;
    var hashString = window.location.hash;
    var url = "";
    if (hashString.length > 0) {
      hashString = hashString.substr(1);
      url = url + hashString;
    }
    if (queryString.length > 0) {
      queryString = queryString.substr(1);
      if (url.length > 0) url = url + "&" + queryString;
      else url = queryString;
    }
    if (url.length > 0) {
      url = "#" + url;
      hashUrlToHashObj(url);
    }
  }
  /** ***** app.search public object ******* */
  app.plpBanner = {
    initInfiniteScroll: function() {
      /**
       * named wrapper function, which can either be
       * called, if cache is hit, or ajax repsonse is
       * received
       */
      var fillEndlessScrollChunk = function(html, loadMoreButton, pageElement, loadingPlaceHolder, outerpager) {
        var buttonWrapper = loadMoreButton.parent(),
          parent = buttonWrapper.prev(".packery");
        //	if($(".current-page-label").val)
        loadMoreButton.show();
        $(buttonWrapper).find(".load-ajax-content").hide();
        loadingPlaceHolder.removeClass('infinite-scroll-loading');
        loadingPlaceHolder.removeClass('new-loaded');
        loadingPlaceHolder.attr('data-loading-state', 'loaded');
        parent.append(html);
        $(document).trigger('grid-update');
        setTimeout(function() {
          app.product.tile.init();
        }, 200);
        app.plpBanner.checkLayout();
        if ($("#outfit-view-tab.view-button.active").length > 0) {
          $(".product-view.swatch-itemslider").hide();
        }
        if (outerpager) {
          if (pageElement > loadingPlaceHolder.attr('data-totalcount')) {
            $(".next-cat").find(".current-page-label").html(loadingPlaceHolder.attr('data-totalcount') + " /");
          } else {
            $(".next-cat").find(".current-page-label").html(pageElement + " /");
          }
          app.ui.plptotaldatadbg = $(".dbg_showing .current-page-label").html().split('/')[0].trim("");
          storeLocalplp.set('plpcountpdpdbg', app.ui.plptotaldatadbg);
          if (storeLocalplp.get("plpcountpdp") != null) {
            storeLocalplp.remove("plpcountpdp");
          }
        } else {
          if (pageElement > loadingPlaceHolder.attr('data-totalcount')) {
            $(".search-result-options").find(".current-page-label").html(loadingPlaceHolder.attr('data-totalcount') + " /");
          } else {
            $(".search-result-options").find(".current-page-label").html(pageElement + " /");
          }
          app.ui.plptotaldata = $(".search-result-options .result-options-right .current-page-label").html().split('/')[0].trim("");
          storeLocalplp.set('plpcountpdp', app.ui.plptotaldata);
          if (storeLocalplp.get("plpcountpdpdbg") != null) {
            storeLocalplp.remove("plpcountpdpdbg");
          }
        }
        if (pageElement >= loadingPlaceHolder.attr('data-totalcount')) {
          $(buttonWrapper).find(".current-page-label").html(loadingPlaceHolder.attr('data-totalcount') + " /");
          // load more hide logic
          $(buttonWrapper).hide();
          loadMoreButton.hide();
        } else {
          $(buttonWrapper).find(".current-page-label").html(pageElement + " /");
          $(buttonWrapper).show();
          loadMoreButton.show();
        }
        // time from 2000 is reduced due to load more images not showing persistintly
        setTimeout(function() {
          $(document).trigger("plp:load:more");
        }, 1000);
      };
      $(".load-more").unbind().bind('click ready grid-update', function(e) {
        var that = $(this),
          outerpager = false,
          parent = that.parent().prev(".packery");
        outerpager = (that.parents('.next-cat').length > 0);
        // getting the hidden div, which is the placeholder
        // for the next page
        //$('#main').html('<img id="loader-img" alt="" src="http://adrian-design.com/images/loading.gif" width="100" height="100" align="center" />');
        $(that).prev('.load-ajax-content').show();
        $(that).hide();
        var loadingPlaceHolder = $(parent).find('.infinite-scroll-placeholder[data-loading-state="unloaded"]');
        if (loadingPlaceHolder.length == 1 && app.util.elementInViewport(loadingPlaceHolder.get(0), 270)) {
          // switch state to 'loading'
          // - switches state, so the above selector is
          // only matching once
          // - shows loading indicator
          loadingPlaceHolder.attr('data-loading-state', 'loading');
          loadingPlaceHolder.addClass('infinite-scroll-loading');
          // get url hidden in DOM
          var gridUrl = loadingPlaceHolder.attr('data-grid-url');
          var pageElement = parseInt(app.plpBanner.getURLParameter(gridUrl, 'start')) + parseInt(app.plpBanner.getURLParameter(gridUrl, 'sz'));
          if (app.clientcache.LISTING_INFINITE_SCROLL && 'sessionStorage' in window && sessionStorage["scroll-cache_" + gridUrl]) {
            // if we hit the cache
            fillEndlessScrollChunk(sessionStorage["scroll-cache_" + gridUrl], that, pageElement, loadingPlaceHolder, outerpager);
          } else {
            // else do query via ajax
            jQuery.ajax({
              type: "GET",
              dataType: 'html',
              url: gridUrl,
              success: function(response) {
                // put response into cache
                //  	$('#main').html('<img id="loader-img" alt="" src="http://adrian-design.com/images/loading.gif" width="100" height="100" align="center" />').remove();
                try {
                  sessionStorage["scroll-cache_" + gridUrl] = response;
                } catch (e) {
                  // nothing to catch in case of out of memory of session storage it will fall back to load via ajax
                }
                // update UI
                fillEndlessScrollChunk(response, that, pageElement, loadingPlaceHolder, outerpager);
              }
            });
          }
        }
      });
    },
    getURLParameter: function(url, name) {
      return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
    },
    mobileLayout: function() {
      var plpmobwidth = parseInt($(".search-result-content .item.w2").width(), 10);
      var plpmobheight = parseInt($(".search-result-content .item.h2").height(), 10);
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          transitionDuration: 0,
          isResizeBound: false,
          masonry: {
            columnWidth: plpmobwidth,
            rowHeight: plpmobheight,
            gutter: 10
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          transitionDuration: 0,
          isResizeBound: false,
          masonry: {
            columnWidth: plpmobwidth,
            rowHeight: plpmobheight,
            gutter: 10
          }
        });
      $(".packery").css('visibility', 'visible');
      var width = $(".packery").width();
      $(".load-more-wrap").css({
        'width': width,
        'margin': '0 auto'
      });
    },
    mobileLayoutLand: function() {
      var plpmobwidth = parseInt($(".search-result-content .item.w2").width(), 10);
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          transitionDuration: 0,
          isResizeBound: false,
          masonry: {
            columnWidth: plpmobwidth,
            rowHeight: 280,
            isFitWidth: true,
            gutter: 10
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          transitionDuration: 0,
          isResizeBound: false,
          masonry: {
            columnWidth: plpmobwidth,
            rowHeight: 280,
            isFitWidth: true,
            gutter: 10
          }
        });
      $(".packery").css('visibility', 'visible');
      var width = $(".packery").width();
      $(".load-more-wrap").css({
        'width': width,
        'margin': '0 auto'
      });
    },
    desktopMedium: function() {
      //console.log("In desktopmedium Layout");
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          layoutMode: 'packery',
          transitionDuration: 0,
          isResizeBound: false,
          packery: {
            columnWidth: 232,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 18
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          layoutMode: 'packery',
          transitionDuration: 0,
          isResizeBound: false,
          packery: {
            columnWidth: 232,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 18
          }
        });
      $(".packery").css('visibility', 'visible');
    },
    tabletLayout: function() {
      //console.log("In tablet Layout");
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          layoutMode: 'packery',
          transitionDuration: 0,
          isResizeBound: false,
          packery: {
            columnWidth: 232,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 12
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          layoutMode: 'packery',
          transitionDuration: 0,
          isResizeBound: false,
          packery: {
            columnWidth: 232,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 12
          }
        });
      $(".packery").css('visibility', 'visible');
    },
    desktopLayout: function() {
      var plpmobwidth = parseInt($(".search-result-content .item.w2").width(), 10);
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          layoutMode: 'packery',
          packery: {
            columnWidth: plpmobwidth,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 25
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          layoutMode: 'packery',
          packery: {
            columnWidth: plpmobwidth,
            rowHeight: 1,
            isFitWidth: true,
            gutter: 25
          }
        });
      $(".packery").css('visibility', 'visible');
    },
    desktopLayoutMac: function() {
      var plpmobwidth = parseInt($(".search-result-content .item.w2").width(), 10);
      pckry = new Isotope($('.packery')[0], {
          itemSelector: '.item',
          layoutMode: 'packery',
          packery: {
            columnWidth: plpmobwidth,
            rowHeight: 425,
            isFitWidth: true,
            gutter: 44
          }
        }),
        pckry_dbg = new Isotope($('.packery')[1], {
          itemSelector: '.item',
          layoutMode: 'packery',
          packery: {
            columnWidth: plpmobwidth,
            rowHeight: 425,
            isFitWidth: true,
            gutter: 44
          }
        });
      $(".packery").css('visibility', 'visible');
    },
    checkLayout: function() {
      window.widthplpiso = $(window).width();
      if ($(window).width() < 568 && $(window).width() >= 320) {
        app.plpBanner.mobileLayout();
      } else if ($(window).width() >= 568 && $(window).width() < 767) {
        app.plpBanner.mobileLayoutLand();
      } else if ($(window).width() > 1023 && $(window).width() < 1300) {
        app.plpBanner.desktopMedium();
      } else if ($(window).width() > 1400 && $(window).width() < 1450) {
        app.plpBanner.desktopLayoutMac();
      } else if ($(window).width() >= 767 && $(window).width() < 1023) {
        app.plpBanner.tabletLayout();
      } else {
        app.plpBanner.desktopLayout();
      }
    },
    init: function() {
      $(".packery").each(function(i, v) {
        if ($(this).find(".infinite-scroll-placeholder").length < 1) {
          $(this).next(".load-more-wrap").hide();
        } else {
          $(this).next(".load-more-wrap").show();
        }
      })
      $(".two-slot").hide();
      $(".two_by_two").each(function() {
        if ($(this).find("img").length == 0) {
          $(this).remove();
        }
      });
      if ($(".two-slot img").length >= 1) {
        $(".two-slot").show();
      }
      if (window.location.href.indexOf("#") > -1) {
        $(".two_by_two").hide();
        $(".two-slot").hide();
      }
      app.plpBanner.checkLayout();
      if ($("body").width() < 1025) {
        $(window).resize(function() {
          // var widthplpiso = $(window).width();
          if ($(this).width() != widthplpiso) {
            if ($(".packery").length > 1) {
              //	alert("hi");
              pckry.destroy();
              pckry_dbg.destroy();
            } else {
              pckry.destroy();
            }
            setTimeout(function() {
              app.plpBanner.checkLayout();
            }, 20);
          }
        });
      }
      app.plpBanner.initInfiniteScroll();
      $(".dbg_section").prepend("<div class='dbgMarker'>&nbsp;</div>");
      var topPos = 0;
      $(window).scroll(function() {
        if ($(".dbg_section").length > 0) {
          var scrolltop = $(window).scrollTop(),
            sectionTop = $(".dbg_section").offset().top,
            sectionHeight = $(".dbg_section").height(),
            containerToScroll = $(".dbg_section .dbgintro > div");
          if (sectionTop + sectionHeight - containerToScroll.height() < $(".dbgMarker").offset().top) {
            return;
          }
          if (scrolltop >= sectionTop) {
            topPos = $(".dbgMarker").offset().top - sectionTop;
          } else if (scrolltop < sectionTop) {
            topPos = 0
          }
          containerToScroll.css('top', topPos)
        }
      });
    }
  };
  /** ***** app.search public object ******* */
  app.search = {
    init: function() {
      $cache = {
        main: $("#main"),
        filterWrap: $("#search-result"),
        items: $("#search-result-items")
      };
      $cache.content = $cache.main.find(".search-result-content");
      app.util.setSlotLink();
      updateProductListing(false);
      if (app.clientcache.LISTING_INFINITE_SCROLL) {
        app.plpBanner.initInfiniteScroll();
      }
      app.product.tile.init();
      initializeEvents();
      if ($('#homepage-slider').length > 0) {
        app.util.setCarousel({
          sliderid: '#homepage-slides',
          sliderwrapper: '.main-slider',
          slide: '#homepage-slider li.slide',
          auto: true
        });
      }
      if ($('.pt_storefront .main-slider').length) {
        DieselUS.ui.setupCarouselLinks.init();
      }
      $(".grid").each(function() {
        if ($(this).find("#homepage-slider").length === 0 && $(this).find("ul li").length > 1) {
          var wrap = $(this);
          var sid = $(this).find(".slottemplate");
          var sl = $(this).find("li");
          app.util.setCarousel({
            sliderid: sid,
            sliderwrapper: wrap,
            slide: sl,
            auto: false,
            circular: false,
            nav: true
          });
        }
      });
      app.denimguide.init();
    }
  };
  /** ***** app.search public object ******* */
  app.searchV2 = {
    init: function() {
      $cache = {
        main: $("#main"),
        filterWrap: $("#search-result"),
        items: $("#search-result-items")
      };
      searchFilterV2 = true;
      $cache.content = $cache.main.find(".search-result-content");
      app.util.setSlotLink();
      updateProductListing(false);
      if (app.clientcache.LISTING_INFINITE_SCROLL) {
        app.plpBanner.initInfiniteScroll();
      }
      app.product.tile.init();
      initializeHashObj();
      initializeEvents();
      initializeFilterEvent();
      initializeFilter();
      //  app.filterFunctionality.init();
      if ($('#homepage-slider').length > 0) {
        app.util.setCarousel({
          sliderid: '#homepage-slides',
          sliderwrapper: '.main-slider',
          slide: '#homepage-slider li.slide',
          auto: true
        });
      }
      $(".grid").each(function() {
        if ($(this).find("#homepage-slider").length === 0 && $(this).find("ul li").length > 1) {
          var wrap = $(this);
          var sid = $(this).find(".slottemplate");
          var sl = $(this).find("li");
          app.util.setCarousel({
            sliderid: sid,
            sliderwrapper: wrap,
            slide: sl,
            auto: false,
            circular: false,
            nav: true
          });
        }
      });
      app.denimguide.init();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.bonusProductsView
 */
(function(app, $) {
  var $cache = {};
  var selectedList = [];
  var maxItems = 1;
  var bliUUID = "";
  /**
   * @private
   * @function description Gets a list of bonus products related to a promoted
   *           product
   */
  function getBonusProducts() {
    var o = {};
    o.bonusproducts = [];
    var i, len;
    for (i = 0, len = selectedList.length; i < len; i++) {
      var p = {
        pid: selectedList[i].pid,
        qty: selectedList[i].qty,
        options: {}
      };
      var a, alen, bp = selectedList[i];
      for (a = 0, alen = bp.options.length; a < alen; a++) {
        var opt = bp.options[a];
        p.options = {
          optionName: opt.name,
          optionValue: opt.value
        };
      }
      o.bonusproducts.push({
        product: p
      });
    }
    return o;
  }
  /**
   * @private
   * @function
   * @description Updates the summary page with the selected bonus product
   */
  function updateSummary() {
    if (selectedList.length === 0) {
      $cache.bonusProductList.find("li.selected-bonus-item").remove();
    } else {
      var ulList = $cache.bonusProductList.find("ul.selected-bonus-items").first();
      var itemTemplate = ulList.children(".selected-item-template").first();
      var i, len;
      for (i = 0, len = selectedList.length; i < len; i++) {
        var item = selectedList[i];
        var li = itemTemplate.clone().removeClass("selected-item-template").addClass("selected-bonus-item");
        li.data("uuid", item.uuid).data("pid", item.pid);
        li.find(".item-name").html(item.name);
        li.find(".item-qty").html(item.qty);
        var ulAtts = li.find(".item-attributes");
        var attTemplate = ulAtts.children().first().clone();
        ulAtts.empty();
        var att;
        for (att in item.attributes) {
          var attLi = attTemplate.clone();
          attLi.addClass(att);
          attLi.children(".display-name").html(item.attributes[att].displayName);
          attLi.children(".display-value").html(item.attributes[att].displayValue);
          attLi.appendTo(ulAtts);
        }
        li.appendTo(ulList);
      }
      ulList.children(".selected-bonus-item").show();
    }
    // get remaining item count
    var remain = maxItems - selectedList.length;
    $cache.bonusProductList.find(".bonus-items-available").text(remain);
    if (remain <= 0) {
      $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
    } else {
      $cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
    }
  }
  /** ******* public app.bonusProductsView object ******** */
  app.bonusProductsView = {
    /**
     * @function
     * @description Initializes the bonus product dialog
     */
    init: function() {
      $cache = {
        bonusProduct: $("#bonus-product-dialog"),
        resultArea: $("#product-result-area")
      };
    },
    /**
     * @function
     * @description Opens the bonus product quick view dialog
     */
    show: function(url) {
      // add element to cache if it does not already exist
      if (!$cache.bonusProduct) {
        app.bonusProductsView.init();
      }
      // create the dialog
      $cache.bonusProduct = app.dialog.create({
        target: $cache.bonusProduct,
        options: {
          width: 795,
          dialogClass: 'quickview',
          title: app.resources.BONUS_PRODUCTS
        }
      });
      // load the products then show
      app.ajax.load({
        target: $cache.bonusProduct,
        url: url,
        callback: function() {
          $cache.bonusProduct.dialog('open');
          app.bonusProductsView.initializeGrid();
        }
      });
    },
    /**
     * @function
     * @description Closes the bonus product quick view dialog
     */
    close: function() {
      $cache.bonusProduct.dialog('close');
    },
    /**
     * @function
     * @description Loads the list of bonus products into quick view dialog
     */
    loadBonusOption: function() {
      $cache.bonusDiscountContainer = $(".bonus-discount-container");
      if ($cache.bonusDiscountContainer.length === 0) {
        return;
      }
      app.dialog.create({
        target: $cache.bonusDiscountContainer,
        options: {
          height: 'auto',
          width: 350,
          dialogClass: 'quickview',
          title: app.resources.BONUS_PRODUCT
        }
      });
      $cache.bonusDiscountContainer.dialog('open');
      // add event handlers
      $cache.bonusDiscountContainer.on("click", ".select-bonus-btn", function(e) {
        e.preventDefault();
        var uuid = $cache.bonusDiscountContainer.data("lineitemid");
        var url = app.util.appendParamsToUrl(app.urls.getBonusProducts, {
          bonusDiscountLineItemUUID: uuid,
          source: "bonus"
        });
        $cache.bonusDiscountContainer.dialog('close');
        app.bonusProductsView.show(url);
      }).on("click", ".no-bonus-btn", function(e) {
        $cache.bonusDiscountContainer.dialog('close');
      });
    },
    /**
     * @function
     * @description
     */
    initializeGrid: function() {
      $cache.bonusProductList = $("#bonus-product-list"),
        bliData = $cache.bonusProductList.data("line-item-detail");
      maxItems = bliData.maxItems;
      bliUUID = bliData.uuid;
      if (bliData.itemCount >= maxItems) {
        $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
      }
      var cartItems = $cache.bonusProductList.find(".selected-bonus-item");
      cartItems.each(function() {
        var ci = $(this);
        var product = {
          uuid: ci.data("uuid"),
          pid: ci.data("pid"),
          qty: ci.find(".item-qty").text(),
          name: ci.find(".item-name").html(),
          attributes: {}
        };
        var attributes = ci.find("ul.item-attributes li");
        attributes.each(function() {
          var li = $(this);
          product.attributes[li.data("attributeId")] = {
            displayName: li.children(".display-name").html(),
            displayValue: li.children(".display-value").html()
          };
        });
        selectedList.push(product);
      });
      $cache.bonusProductList.on("click", "div.bonus-product-item a[href].swatchanchor", function(e) {
        e.preventDefault();
        var anchor = $(this),
          bpItem = anchor.closest(".bonus-product-item"),
          bpForm = bpItem.find("form.bonus-product-form"),
          qty = bpForm.find("input[name='Quantity']").first().val(),
          params = {
            Quantity: isNaN(qty) ? "1" : qty,
            format: "ajax",
            source: "bonus",
            bonusDiscountLineItemUUID: bliUUID
          };
        var url = app.util.appendParamsToUrl(this.href, params);
        app.progress.show(bpItem);
        app.ajax.load({
          url: url,
          callback: function(data) {
            bpItem.html(data);
          }
        });
      }).on("click", "button.button-select-bonus", function(e) {
        e.preventDefault();
        if (selectedList.length >= maxItems) {
          $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
          $cache.bonusProductList.find("bonus-items-available").text("0");
          return;
        }
        var form = $(this).closest("form.bonus-product-form"),
          detail = $(this).closest(".product-detail");
        uuid = form.find("input[name='productUUID']").val(), qtyVal = form.find("input[name='Quantity']").val(),
          qty = isNaN(qtyVal) ? 1 : (+qtyVal);
        var product = {
          uuid: uuid,
          pid: form.find("input[name='pid']").val(),
          qty: qty,
          name: detail.find(".product-name").text(),
          attributes: detail.find(".product-variations").data("current"),
          options: []
        };
        var optionSelects = form.find("select.product-option");
        optionSelects.each(function(idx) {
          product.options.push({
            name: this.name,
            value: $(this).val(),
            display: $(this).children(":selected").first().html()
          });
        });
        selectedList.push(product);
        updateSummary();
      }).on("click", ".remove-link", function(e) {
        e.preventDefault();
        var container = $(this).closest("li.selected-bonus-item");
        if (!container.data("uuid")) {
          return;
        }
        var uuid = container.data("uuid");
        var i, len = selectedList.length;
        for (i = 0; i < len; i++) {
          if (selectedList[i].uuid === uuid) {
            selectedList.splice(i, 1);
            break;
          }
        }
        updateSummary();
      }).on("click", ".add-to-cart-bonus", function(e) {
        e.preventDefault();
        var url = app.util.appendParamsToUrl(app.urls.addBonusProduct, {
          bonusDiscountLineItemUUID: bliUUID
        });
        var bonusProducts = getBonusProducts();
        // make the server call
        $.ajax({
          type: "POST",
          dataType: "json",
          cache: false,
          contentType: "application/json",
          url: url,
          data: JSON.stringify(bonusProducts)
        }).done(function(response) {
          // success
          app.page.refresh();
        }).fail(function(xhr, textStatus) {
          // failed
          if (textStatus === "parsererror") {
            window.alert(app.resources.BAD_RESPONSE);
          } else {
            window.alert(app.resources.SERVER_CONNECTION_ERROR);
          }
        }).always(function() {
          $cache.bonusProduct.dialog("close");
        });
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.giftcert
 * @description Loads gift certificate details
 */
(function(app, $) {
  var $cache;

  function setAddToCartHandler(e) {
    e.preventDefault();
    var form = $(this).closest("form");
    var options = {
      url: app.util.ajaxUrl(form.attr('action')),
      method: 'POST',
      cache: false,
      contentType: 'application/json',
      data: form.serialize()
    };
    $.ajax(options).done(function(response) {
      if (response.success) {
        app.ajax.load({
          url: app.urls.minicartGC,
          data: {
            lineItemId: response.result.lineItemId
          },
          callback: function(response) {
            app.minicart.show(response);
            form.find('input,textarea').val('');
            sr_refreshSRDOM();
          }
        });
      } else {
        form.find('span.error').hide();
        for (id in response.errors.FormErrors) {
          var error_el = $('#' + id).addClass('error').removeClass('valid').next('.error');
          if (!error_el || error_el.length === 0) {
            error_el = $('<span for="' + id + '" generated="true" class="error" style=""></span>');
            $('#' + id).after(error_el);
          }
          error_el.text(response.errors.FormErrors[id].replace(/\\'/g, "'")).show();
        }
      }
    }).fail(function(xhr, textStatus) {
      // failed
      if (textStatus === "parsererror") {
        window.alert(app.resources.BAD_RESPONSE);
      } else {
        window.alert(app.resources.SERVER_CONNECTION_ERROR);
      }
    });
  }

  function initializeCache() {
    $cache = {
      addToCart: $("#AddToBasketButton"),
    };
  }

  function initializeEvents() {
    $cache.addToCart.on('click', setAddToCartHandler);
  }
  app.giftcert = {
    init: function() {
      initializeCache();
      initializeEvents();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.giftcard
 * @description Loads gift certificate details
 */
(function(app, $) {
  app.giftcard = {
    /**
     * @function
     * @description Load details to a given gift certificate
     * @param {String}
     *            id The ID of the gift certificate
     * @param {Function}
     *            callback A function to called
     */
    checkBalance: function(id, callback) {
      // load gift certificate details
      var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCertificateID", id);
      app.ajax.getJson({
        url: url,
        callback: callback
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.checkout
 */
(function(app, $) {
  var $cache = {},
    isShipping = false,
    isMultiShipping = false,
    shippingMethods = null,
    isShippingCouponCode = false;
  /**
   *
   * Remove background at address verification
   */
  function removeSecondaryBackground() {
    if ($('.adress-entered')[0]) {
      $('#primary').css('background', 'none');
      if (!scriptIsmobile()) {
        if ($('.col-1') && $('.col-2') && $('.adrr-or')) {
          equiHeight('.col-1', '.col-2');
        }
      }
    }
  }
  /**
   * @function
   * @description Method which is to make the heights of the primary and
   *              secondary sections equal.
   * @author sandesh chikkaveermath
   */
  function equiHeight(primary, secondary) {
    if ($(primary).height() > $(secondary).height()) {
      $(secondary).css('height', $(primary).height());
    } else if ($(primary).height() < $(secondary).height()) {
      $(primary).css('height', $(secondary).height());
    }
  }

  function dissableEquiheight(primary, secondary) {
    $(primary).css('height', 'auto');
    $(secondary).css('height', 'auto');
  }
  /**
   * @function
   * @description Helper method which constructs a URL for an AJAX request
   *              using the entered address information as URL request
   *              parameters.
   */
  function getShippingMethodURL(url) {
    var newUrl = app.util.appendParamsToUrl(url, {
      address1: $cache.address1.val(),
      countryCode: $cache.countryCode.val(),
      stateCode: $cache.stateCode.val(),
      postalCode: $cache.postalCode.val(),
      city: $cache.city.val()
    }, true);
    return newUrl;
  }
  /**
   * @function
   * @description updates the order summary based on a possibly recalculated
   *              basket after a shipping promotion has been applied
   */
  function updateSummary() {
    var url = app.urls.summaryRefreshURL;
    var summary = $("#secondary.summary #right-nav-wrapper");
    // indicate progress
    app.progress.show();
    // load the updated summary area
    summary.load(url, function() {
      // hide edit shipping method link
      summary.fadeIn("fast");
      summary.find('.checkout-mini-cart .minishipment .header a').hide();
      summary.find('.order-totals-table .order-shipping .label a').hide();
      if ($('.minicart-checkout')[0]) {
        if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
          $('.minicart-checkout').tinyscrollbar();
        } else {
          $('.minicart-checkout').find('.scrollbar').css('display', 'none');
          $('.minicart-checkout').find('.viewport').css({
            'width': '100%',
            'height': 'auto',
            'max-height': 'none'
          });
          $('.minicart-checkout').find('.overview').css('position', 'relative');
        }
      }
      app.tooltips.init();
    });
  }
  /**
   * @function
   * @description selects a shipping method for the default shipment and
   *              updates the summary section on the right hand side
   * @param
   */
  function selectShippingMethod(shippingMethodID) {
    // nothing entered
    if (!shippingMethodID) {
      return;
    }
    // attempt to set shipping method
    var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList, {
      countryCode: $cache.countryCode.val(),
      stateCode: $cache.stateCode.val(),
      postalCode: $cache.postalCode.val(),
      city: $cache.city.val(),
      shippingMethodID: shippingMethodID
    }, true);
    $('.continue-shipping-btn').attr('disabled', 'disabled');
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        updateSummary();
        if (!data || !data.shippingMethodID) {
          window.alert("Couldn't select shipping method.");
          $('.continue-shipping-btn').removeAttr('disabled');
          return false;
        }
        // display promotion in UI and update the summary section,
        // if some promotions were applied
        $(".shippingpromotions").empty();
        if (data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
          var i, len = data.shippingPriceAdjustments.length;
          for (i = 0; i < len; i++) {
            var spa = data.shippingPriceAdjustments[i];
          }
        }
        if (!$('#cstmHzmat').length) {
          $('.continue-shipping-btn').removeAttr('disabled');
        }
        app.progress.hide();
      }
    });
  }
  /**
   * @function
   * @description Make an AJAX request to the server to retrieve the list of
   *              applicable shipping methods based on the merchandise in the
   *              cart and the currently entered shipping address (the address
   *              may be only partially entered). If the list of applicable
   *              shipping methods has changed because new address information
   *              has been entered, then issue another AJAX request which
   *              updates the currently selected shipping method (if needed)
   *              and also updates the UI.
   */
  function updateShippingMethodList() {
    if (!$cache.shippingMethodList || $cache.shippingMethodList.length === 0) {
      return;
    }
    // indicate progress
    app.progress.show();
    var url = getShippingMethodURL(app.urls.shippingMethodsJSON);
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        validateShippingAddress();
        if (!data) {
          window.alert("Couldn't get list of applicable shipping methods.");
          return false;
        }
        if (shippingMethods && shippingMethods.toString() === data.toString() && !isShippingCouponCode) {
          // No need to update the UI. The list has not
          // changed.
          return true;
        }
        // We need to update the UI. The list has changed.
        // Cache the array of returned shipping methods.
        shippingMethods = data;
        isShippingCouponCode = false;
        var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);
        // load the shipping method form
        $cache.shippingMethodList.load(smlUrl, function() {
          $cache.shippingMethodList.fadeIn("fast");
          // rebind the radio buttons onclick function to a handler.
          // shipping method commented temp
          $cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function() {
            selectShippingMethod($(this).val());
          });
          // update the summary
          updateSummary();
          app.tooltips.init();
          initRadioFocus();
          validateShippingAddress();
          sr_refreshSRDOM();
          app.progress.hide();
        });
      }
    });
  }
  // shipping page logic
  // checkout gift message counter
  /**
   * @function
   * @description Initializes gift message box, if shipment is gift
   */
  function initGiftMessageBox() {
    // show gift message box, if shipment is gift
    if ($cache.checkoutForm.find("#is-gift-yes")[0]) $cache.giftMessage.toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
  }
  /**
   * @function
   * @description Initializes gift message box for multiship shipping, the
   *              message box starts off as hidden and this will display it if
   *              the radio button is checked to yes, also added event handler
   *              to listen for when a radio button is pressed to display the
   *              message box
   */
  function initMultiGiftMessageBox() {
    $.each($("table.item-list"), function() {
      // handle initial load
      if ($(this).find(".js-isgiftyes").is(':checked')) {
        $(this).find(".gift-message-text").css('display', 'block');
      }
      // set event listeners
      $(this).bind('change', function() {
        if ($(this).find(".js-isgiftyes").is(':checked')) {
          $(this).find(".gift-message-text").css('display', 'block');
        } else if ($(this).find(".js-isgiftno").is(':checked')) {
          $(this).find(".gift-message-text").css('display', 'none');
        }
      });
    });
  }
  /**
   * @function
   * @description this function inits the form so that uses client side
   *              validation before submitting to the server
   */
  function initmultishipshipaddress() {
    // init the continue button as disabled
    var selectvalue = [];
    $(this).removeClass('error');
    $("select option:selected").each(function() {
      selectvalue.push(this.value);
    });
    // if we found a empty value disable the button
    if (selectvalue.indexOf('') == -1) {
      $('.formactions button').removeAttr('disabled');
    } else {
      $('.formactions button').attr('disabled', 'disabled');
    }
    // add error classes to selects that don't have an address associated
    // with them when the button is clicked
    $('.formactions').bind('click', function() {
      $.each($(".cart-row .shippingaddress select.selectbox"), function() {
        if (this.value == '') {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }
      });
    });
    // add listeners to the selects to enable the continue button
    $.each($(".cart-row .shippingaddress select.selectbox"), function() {
      $(this).bind('change', function() {
        if (this.value == '') {
          $('.formactions button').attr('disabled', 'disabled');
          $(this).addClass('error');
        } else {
          // check to see if any select box has a empty vlaue
          var selectvalues = [];
          $(this).removeClass('error');
          $("select option:selected").each(function() {
            selectvalues.push(this.value);
          });
          // if we found a empty value disable the button
          if (selectvalues.indexOf('') == -1) {
            $('.formactions button').removeAttr('disabled');
          } else {
            $('.formactions button').attr('disabled', 'disabled');
          }
        }
      });
    });
  }
  /**
   * @function
   * @description shows gift message box, if shipment is gift
   */
  function shippingLoad() {
    $cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function() {
      $cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
    }).on("blur", "input[name$='_addressFields_address1'], input[name$='_addressFields_city'], input[name$='_addressFields_zip']", updateShippingMethodList);
    $cache.checkoutForm.on("change", "select[name$='_addressFields_states_state']", updateShippingMethodList);
    // gift message character limitation
    initGiftMessageBox();
    updateShippingMethodList();
    $cache.checkoutForm.on('blur', "input[name$='_addressFields_address1']", function() {
      validateShippingAddress();
    });
    applyCoupon();
    return null;
  }

  function validateShippingAddress() {
    var URL = getShippingMethodURL(app.urls.shippingAddressValidation);
    $('#hazmatShippingmethod').hide();
    var _this = this;
    app.ajax.getJson({
      url: URL,
      callback: function(data) {
        var parent = $("input[name$='_addressFields_address1']").parent();
        if (data[0]) {
          $('.continue-shipping button').attr('disabled', 'disabled');
          var content = $("#hazmat").html();
          $($('.hazmat-error').find('#cstmHzmat')).remove();
          $('.hazmat-error').append("<span id='cstmHzmat' class='error'>" + content + "</span>");
          $("input[name$='_addressFields_address1']").addClass('error');
          $('.no-shipping-methods').hide();
          //app.resources.CC_LOAD_ERROR
        } else {
          $($('.hazmat-error').find('#cstmHzmat')).remove();
          $('.continue-shipping button').removeAttr('disabled');
          $("input[name$='_addressFields_address1']").removeClass('error');
        }
        if (data[1]) {
          $('#hazmatShippingmethod').hide();
        } else {
          $('#hazmatShippingmethod').show();
        }
        if (data[2]) {
          $('.statutary-warning').show();
        } else {
          $('.statutary-warning').hide();
        }
      }
    });
  }
  /**
   * @function
   * @description Selects the first address from the list of addresses
   */
  function addressLoad() {
    // select address from list
    $cache.addressList.on("change", function() {
      var selected = $(this).children(":selected").first();
      var data = $(selected).data("address");
      if (!data) {
        return;
      }
      var p;
      for (p in data) {
        if ($cache[p] && data[p]) {
          $cache[p].val(data[p].replace("^", "'"));
          // special handling for countrycode => stateCode combo
          if ($cache[p] === $cache.countryCode) {
            app.util.updateStateOptions($cache[p]);
            $cache.stateCode.val(data.stateCode);
            $cache.stateCode.trigger("change");
          } else {
            updateShippingMethodList();
          }
        }
      }
      //Removing class mandatory from the payment details
      if ($cache.paymentMethods) {
        $cache.paymentMethods.find('input,select').each(function() {
          if (!$(this).hasClass('error')) {
            $(this).removeClass('required');
          }
        });
      }
      // re-validate the form
      $cache.checkoutForm.validate().form();
      //adding class mandatory to the payment details once the validation of address form is complete
      if ($cache.paymentMethods) {
        $cache.paymentMethods.find('input,select').each(function(key, val) {
          if (!$(this).hasClass('required') && !$(val).is($('#creditCardList')) && !$(val).is($('.input-checkbox'))) {
            $(this).addClass('required');
          }
        });
      }
    });
    // update state options in case the country changes
    $cache.countryCode.on("change", function() {
      app.util.updateStateOptions(this);
    });
  }
  /**
   * @function
   * @description shows gift message box in multiship, and if the page is the
   *              multi shipping address page it will call
   *              initmultishipshipaddress() to initialize the form
   */
  function multishippingLoad() {
    initMultiGiftMessageBox();
    if ($(".cart-row .shippingaddress select.selectbox").length > 0) {
      initmultishipshipaddress();
    }
    return null;
  }
  /**
   * @function
   * @description Changes the payment method form depending on the passed
   *              paymentMethodID
   * @param {String}
   *            paymentMethodID the ID of the payment method, to which the
   *            payment method form should be changed to
   */
  function changePaymentMethod(paymentMethodID) {
    $cache.paymentMethods.removeClass("payment-method-expanded");
    var pmc = $cache.paymentMethods.filter("#PaymentMethod_" + paymentMethodID);
    if (pmc.length === 0) {
      pmc = $("#PaymentMethod_Custom");
    }
    pmc.addClass("payment-method-expanded");
    // ensure checkbox of payment method is checked
    if ($("#is-" + paymentMethodID)[0]) $("#is-" + paymentMethodID)[0].checked = true;
    var bmlForm = $cache.checkoutForm.find("#PaymentMethod_BML");
    bmlForm.find("select[name$='_year']").removeClass("required");
    bmlForm.find("select[name$='_month']").removeClass("required");
    bmlForm.find("select[name$='_day']").removeClass("required");
    bmlForm.find("input[name$='_ssn']").removeClass("required");
    if (paymentMethodID === "BML") {
      var yr = bmlForm.find("select[name$='_year']");
      bmlForm.find("select[name$='_year']").addClass("required");
      bmlForm.find("select[name$='_month']").addClass("required");
      bmlForm.find("select[name$='_day']").addClass("required");
      bmlForm.find("input[name$='_ssn']").addClass("required");
    }
    app.validator.init();
  }
  /**
   * @function
   * @description Fills the Credit Card form with the passed data-parameter
   *              and clears the former cvn input
   * @param {Object}
   *            data The Credit Card data (holder, type, masked number,
   *            expiration month/year)
   */
  function setCCFields(data) {
    $cache.ccOwner.val(data.holder);
    $cache.ccType.val(data.type);
    $cache.ccNum.val(data.maskedNumber);
    $cache.ccMonth.val(data.expirationMonth);
    $cache.ccYear.val(data.expirationYear);
    $cache.ccCcv.val("");
    // remove error messages
    $cache.ccContainer.find(".errormessage").toggleClass("errormessage").filter("span").remove();
    $cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
  }
  /**
   * @function
   * @description Updates the credit card form with the attributes of a given
   *              card
   * @param {String}
   *            cardID the credit card ID of a given card
   */
  function populateCreditCardForm(cardID) {
    // load card details
    var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        if (!data) {
          window.alert(app.resources.CC_LOAD_ERROR);
          return false;
        }
        $cache.ccList.data(cardID, data);
        setCCFields(data);
      }
    });
  }
  /**
   * @function
   * @description loads billing address, Gift Certificates, Coupon and Payment
   *              methods
   */
  function billingLoad() {
    if (!$cache.paymentMethodId) return;
    $cache.paymentMethodId.on("click", function() {
      changePaymentMethod($(this).val());
    });
    // get selected payment method from payment method form
    var paymentMethodId = $cache.paymentMethodId.filter(":checked");
    changePaymentMethod(paymentMethodId.length === 0 ? "CREDIT_CARD" : paymentMethodId.val());
    // select credit card from list
    $cache.ccList.on("change", function() {
      var cardUUID = $(this).val();
      if (!cardUUID) {
        return;
      }
      var ccdata = $cache.ccList.data(cardUUID);
      if (ccdata && ccdata.holder) {
        setCCFields(ccdata);
        return;
      }
      populateCreditCardForm(cardUUID);
    });
    // handle whole form submit (bind click to continue checkout button)
    // append form fields of current payment form to this submit
    // in order to validate the payment method form inputs too
    $cache.save.on('click', function() {
      // determine if the order total was paid using gift
      // cert or a promotion
      if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
        // as a safety precaution, uncheck any existing
        // payment methods
        $cache.paymentMethodId.filter(":checked").removeAttr("checked");
        // add selected radio button with gift card
        // payment method
        $("<input/>").attr({
          name: $cache.paymentMethodId.first().attr("name"),
          type: "radio",
          checked: "checked",
          value: app.constants.PI_METHOD_GIFT_CERTIFICATE
        }).appendTo($cache.checkoutForm);
      }
      var tc = $cache.checkoutForm.find("input[name$='bml_termsandconditions']");
      if ($cache.paymentMethodId.filter(":checked").val() === "BML" && !$cache.checkoutForm.find("input[name$='bml_termsandconditions']")[0].checked) {
        alert(app.resources.BML_AGREE_TO_TERMS);
        return false;
      }
    });
    $cache.gcCheckBalance.on("click", function(e) {
      e.preventDefault();
      $cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
      $cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
      if ($cache.gcCode.length === 0 || $cache.gcCode.val().length === 0) {
        var error = $cache.balance.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo($cache.balance);
        }
        error.html(app.resources.GIFT_CERT_MISSING);
        return;
      }
      app.giftcard.checkBalance($cache.gcCode.val(), function(data) {
        if (!data || !data.giftCertificate) {
          // error
          var error = $cache.balance.find("span.error");
          if (error.length === 0) {
            error = $("<span>").addClass("error").appendTo($cache.balance);
          }
          error.html(app.resources.GIFT_CERT_INVALID);
          return;
        }
        // display details in UI
        $cache.balance.find("span.error").remove();
        var balance = data.giftCertificate.balance;
        $cache.balance.html(app.resources.GIFT_CERT_BALANCE + " " + balance);
      });
    });
    $cache.addCoupon.on("click", function(e) {
      e.preventDefault();
      $cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
      $cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
      var val = $cache.couponCode.val();
      if (val.length === 0) {
        var error = $cache.redemption.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo($cache.redemption);
        }
        error.html(app.resources.COUPON_CODE_MISSING);
        return;
      }
      var url = app.util.appendParamsToUrl(app.urls.addCoupon, {
        couponCode: val,
        format: "ajax"
      });
      $.getJSON(url, function(data) {
        var fail = false;
        var msg = "";
        if (!data) {
          msg = app.resources.BAD_RESPONSE;
          fail = true;
        } else if (!data.success) {
          msg = data.message;
          fail = true;
        }
        if (fail) {
          var error = $cache.redemption.find("span.error");
          if (error.length === 0) {
            $("<span>").addClass("error").appendTo($cache.redemption);
          }
          error.html(msg);
          return;
        }
        $cache.redemption.html(data.message);
      });
    });
    applyCoupon();
  }
  /**
   * @function
   * @description coupon code handler 
   * 
   */
  function applyCoupon() {
    var addCoupon = $('#secondary.summary #add-coupon');
    $("#add-coupon").off().on("click", function(e) {
      if ($(e.target).attr('id') !== 'add-coupon') {
        return;
      }
      e.preventDefault();
      var form = $('form#apply-coupon'),
        couponCode = form.find("input[name$='_couponCode']"),
        redemption = form.find("div.error.coupon-error"),
        val = couponCode.val().toUpperCase(),
        $main = $('#main'),
        secondary = $('#secondary.summary'),
        formAction = form.attr('action'),
        couponBlock = form.find('.coupon-list');
      redemption.empty();
      if ($.trim(val) === '') {
        var error = redemption.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo(redemption);
        }
        error.html(app.resources.COUPON_CODE_MISSING);
        return;
      }
      var url = app.util.appendParamsToUrl(app.urls.addCoupon, {
        couponCode: val,
        format: "ajax"
      });
      app.progress.show();
      $.getJSON(url, function(data) {
        var fail = false;
        var msg = "";
        if (!data) {
          msg = app.resources.BAD_RESPONSE;
          fail = true;
        } else if (!data.success) {
          msg = data.message;
          fail = true;
        }
        if (fail) {
          var error = redemption.find("span.error");
          if (error.length === 0) {
            $("<span>").addClass("error").html(msg).appendTo(redemption);
          }
          error.html(msg);
          app.progress.hide();
          return;
        }
        updateCoupon(e, val);
      });
    });
    if ($('#secondary.cart').length === 0) {
      $('#secondary').off().on('click', 'button[id^="removeCouponCode"]', function(e) {
        app.progress.show();
        e.preventDefault();
        var form = $('form#apply-coupon');
        var $main = $('#main');
        var parentElem = $(this).parent();
        var formAction = form.attr('action');
        form.find("div.error.coupon-error").empty();
        var url = app.util.appendParamsToUrl(app.urls.removeCoupon, {
          couponCode: $(this).data('couponcode'),
          format: "ajax"
        });
        app.progress.show();
        removeCoupon(url, $(this));
      });
    }
  }
  /**
   * @function
   * @description template to show applied coupon
   * 
   */
  function removeCoupon(url, elem) {
    var form = $('form#apply-coupon');
    var couponBlock = form.find('.coupon-list');
    var parent = elem.parent('li');
    $.ajax({
      type: 'get',
      url: url || app.util.appendParamsToUrl(window.location.href, {
        format: 'ajax'
      }),
      data: {},
      dataType: 'html'
    }).done(function(response) {
      response = JSON.parse(response);
      if (!response.success) {
        return;
      } else {
        if ($('.payment-method-options').length > 0) {
          updateSummary();
        } else {
          isShippingCouponCode = true;
          updateShippingMethodList();
        }
        parent.remove();
      }
    }).always(function() {
      app.progress.hide();
    });
  }
  /**
   * @function
   * @description display the coupon in the billing and shipping page
   *              
   */
  function updateCoupon(e, msg) {
    var form = $('form#apply-coupon');
    var _template = $('<li></li>').html($('#coupon-template').find('li').html());
    var couponBlock = form.find('.coupon-list').length > 0 ? form.find('.coupon-list') : $('<ul class="coupon-list"></ul>').prependTo(form);
    var size = couponBlock.find('li').length;
    if ($('.payment-method-options').length > 0) {
      updateSummary();
    } else {
      isShippingCouponCode = true;
      updateShippingMethodList();
    }
    if ($(e.target).prop('tagName') === 'button') {
      $(e.target).parent('li').remove();
    } else {
      _template.find('.coupon-code').html(msg);
      _template.find('button').attr('id', 'removeCouponCode-' + msg).attr('name', 'removeCoupon_' + msg);
      _template.find('button').attr('data-couponcode', msg);
      couponBlock.append(_template);
      form.find('input[id="dwfrm_cart_couponCode"]').val('');
    }
    app.progress.hide();
  }
  /**
   * @function
   * @description Sets a boolean variable (isShipping) to determine the
   *              checkout stage
   */
  function initializeDom() {
    isShipping = $(".checkout-shipping").length > 0;
    isMultiShipping = $(".checkout-multi-shipping").length > 0;
  }
  /**
   * @function
   * @description Initializes the cache of the checkout UI
   */
  function initializeCache() {
    $cache.checkoutForm = $("form.address");
    $cache.addressList = $cache.checkoutForm.find(".select-address select[id$='_addressList']");
    $cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
    $cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
    $cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
    $cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
    $cache.city = $cache.checkoutForm.find("input[name$='_city']");
    $cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
    $cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
    $cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
    $cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
    $cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");
    if ($cache.checkoutForm.hasClass("checkout-shipping")) {
      // shipping only
      $cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
      $cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
      $cache.shippingMethodList = $("#shipping-method-list");
    }
    if ($cache.checkoutForm.hasClass("checkout-billing")) {
      // billing only
      $cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
      $cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
      $cache.paymentMethods = $cache.checkoutForm.find("div.payment-method");
      $cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
      $cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
      $cache.ccList = $("#creditCardList");
      $cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
      $cache.ccType = $cache.ccContainer.find("select[name$='_type']");
      $cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
      $cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
      $cache.ccYear = $cache.ccContainer.find("[name$='_year']");
      $cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
      $cache.BMLContainer = $("#PaymentMethod_BML");
      $cache.gcCheckBalance = $("#gc-checkbalance");
      $cache.addCoupon = $("#add-coupon");
    }
  }
  /**
   * @function Initializes the page events depending on the checkout stage
   *           (shipping/billing)
   */
  function initializeEvents() {
    addressLoad();
    if (isShipping) {
      shippingLoad();
    } else if (isMultiShipping) {
      multishippingLoad();
    } else {
      billingLoad();
    }
  }
  /** ***** app.checkout public object ******* */
  app.checkout = {
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
      /**
       *
       * added scroll for shipping page mini cart
       */
      if ($('.minicart-checkout')[0]) {
        if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
          $('.minicart-checkout').tinyscrollbar();
        } else {
          $('.minicart-checkout').find('.scrollbar').css('display', 'none');
          $('.minicart-checkout').find('.viewport').css({
            'width': '100%',
            'height': 'auto',
            'max-height': 'none'
          });
          $('.minicart-checkout').find('.overview').css('position', 'relative');
        }
      }
      app.util.limitCharacters();
      if ($('.default-addr-shipping')[0] && $("input[name$='_addressFields_address1']").val() == '') {
        $('.default-addr-shipping').change();
      }
      removeSecondaryBackground();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.checkout2
 */
(function(app, $) {
  var $cache = {
      isShipping: false,
      isMultiShipping: false,
      isBilling: false,
      isSubmitOrder: false,
      isShippingCouponCode: false
    },
    shippingMethods = null,
    dieselSiteUrl = window.location.hostname,
    googleAnalyticPath = {
      checkoutOption: dieselSiteUrl + '/Checkout:Options',
      stepShipping: dieselSiteUrl + '/Checkout:Step1_Shipping',
      stepVerify: dieselSiteUrl + '/Checkout:Step1_Verify',
      stepBilling: dieselSiteUrl + '/Checkout:Step2_Billing',
      stepReview: dieselSiteUrl + '/Checkout:Step3_Review'
    };
  var isShippingInitialized = false;
  /* define a global variable to hold current shipping address */
  var currentShippingAddress = {};
  //    $cache.shippingForm = $("form.checkout-shipping");
  //    $cache.billingForm = $("form.checkout-billing");
  //    $cache.shippingAccordian = $(".accordion-group.shipping");
  //    $cache.billingAccordian = $(".accordion-group.billing");
  /**
   *
   * Remove background at address verification
   */
  function removeSecondaryBackground() {
    if ($('.adress-entered')[0]) {
      $('#primary').css('background', 'none');
      if (!scriptIsmobile()) {
        if ($('.col-1') && $('.col-2') && $('.adrr-or')) {
          equiHeight('.col-1', '.col-2');
        }
      }
    }
  }
  /**
   * @function
   * @description Method which is to make the heights of the primary and
   *              secondary sections equal.
   * @author sandesh chikkaveermath
   */
  function equiHeight(primary, secondary) {
    if ($(primary).height() > $(secondary).height()) {
      $(secondary).css('height', $(primary).height());
    } else if ($(primary).height() < $(secondary).height()) {
      $(primary).css('height', $(secondary).height());
    }
  }

  function dissableEquiheight(primary, secondary) {
    $(primary).css('height', 'auto');
    $(secondary).css('height', 'auto');
  }
  /**
   * @function
   * @description Helper method which constructs a URL for an AJAX request
   *              using the entered address information as URL request
   *              parameters.
   */
  function getShippingMethodURL(url) {
    var newUrl = app.util.appendParamsToUrl(url, {
      address1: currentShippingAddress.address1.val(),
      countryCode: currentShippingAddress.countryCode.val(),
      stateCode: currentShippingAddress.stateCode.val(),
      postalCode: currentShippingAddress.postalCode.val(),
      city: currentShippingAddress.city.val()
    }, true);
    return newUrl;
  }
  /**
   * @function
   * @description updates the order summary based on a possibly recalculated
   *              basket after a shipping promotion has been applied
   */
  function updateSummary() {
    var url = app.urls.summaryRefreshURL;
    var summary = $("#secondary.summary #right-nav-wrapper");
    // indicate progress
    // load the updated summary area
    summary.load(url, function() {
      // hide edit shipping method link
      summary.fadeIn("fast");
      summary.find('.checkout-mini-cart .minishipment .header a').hide();
      summary.find('.order-totals-table .order-shipping .label a').hide();
      if ($('.minicart-checkout')[0]) {
        if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
          $('.minicart-checkout').tinyscrollbar();
        } else {
          $('.minicart-checkout').find('.scrollbar').css('display', 'none');
          $('.minicart-checkout').find('.viewport').css({
            'width': '100%',
            'height': 'auto',
            'max-height': 'none'
          });
          $('.minicart-checkout').find('.overview').css('position', 'relative');
        }
      }
      app.tooltips.init();
      var shipDiscount = $('.approaching-discounts .order-shipping-discount');
      var $discountValue = $('#secondary #right-nav-wrapper .checkout-order-totals .order-shipping-discount.discount .value');
      if ($discountValue.length > 0) {
        shipDiscount.find('.discount-amount').html($discountValue.html());
        shipDiscount.css('display', 'block');
      } else {
        shipDiscount.css('display', 'none');
      }
      sr_refreshSRDOM();
    });
  }
  /**
   * @function
   * @description selects a shipping method for the default shipment and
   *              updates the summary section on the right hand side
   * @param
   */
  function selectShippingMethod(shippingMethodID) {
    // nothing entered
    if (!shippingMethodID) {
      return;
    }
    // attempt to set shipping method
    var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList, {
      countryCode: currentShippingAddress.countryCode.val(),
      stateCode: currentShippingAddress.stateCode.val(),
      postalCode: currentShippingAddress.postalCode.val(),
      city: currentShippingAddress.city.val(),
      shippingMethodID: shippingMethodID
    }, true);
    $('.continue-shipping-btn').attr('disabled', 'disabled');
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        updateSummary();
        if (!data || !data.shippingMethodID) {
          window.alert("Couldn't select shipping method.");
          $('.continue-shipping-btn').removeAttr('disabled');
          return false;
        }
        // display promotion in UI and update the summary section,
        // if some promotions were applied
        $(".shippingpromotions").empty();
        if (data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
          var i, len = data.shippingPriceAdjustments.length;
          for (i = 0; i < len; i++) {
            var spa = data.shippingPriceAdjustments[i];
          }
        }
        if (!$('#cstmHzmat').length) {
          $('.continue-shipping-btn').removeAttr('disabled');
        }
        /**
         * update shipping details once shipping m/d is changed
         * 
         */
        if ($('.details', '.shipping-closed')[0] && $('.shipping-closed').is(':visible')) {
          loadShippingSummary();
        }
        app.progress.hide();
      }
    });
  }
  /**
   * @function
   * @description Make an AJAX request to the server to retrieve the list of
   *              applicable shipping methods based on the merchandise in the
   *              cart and the currently entered shipping address (the address
   *              may be only partially entered). If the list of applicable
   *              shipping methods has changed because new address information
   *              has been entered, then issue another AJAX request which
   *              updates the currently selected shipping method (if needed)
   *              and also updates the UI.
   */
  function updateShippingMethodList() {
    if (!$cache.shippingMethodList || $cache.shippingMethodList.length === 0) {
      return;
    }
    var url = getShippingMethodURL(app.urls.shippingMethodsJSON);
    $.getJSON(url, function(data) {
      validateShippingAddress();
      if (!data) {
        window.alert("Couldn't get list of applicable shipping methods.");
        return false;
      }
      //commented for DQP-2661
      //                    if (shippingMethods && shippingMethods.toString() === data
      //                        .toString() && !isShippingCouponCode) {
      //                        // No need to update the UI. The list has not
      //                        // changed.
      //                        return true;
      //                    }
      // We need to update the UI. The list has changed.
      // Cache the array of returned shipping methods.
      shippingMethods = data;
      isShippingCouponCode = false;
      var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);
      // indicate progress
      app.progress.show();
      // load the shipping method form
      $cache.shippingMethodList.load(smlUrl, function() {
        $cache.shippingMethodList.fadeIn("fast");
        // rebind the radio buttons onclick function to a handler.
        // shipping method commented temp
        $cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function() {
          selectShippingMethod($(this).val());
        });
        /**
         * Shop runner - Mixed cart
         * Disable all other shipping methods if Standard ground shipping is available
         * 
         */
        if ($('#shipping-method-ANY_FREE_STD')[0]) {
          if ($('#shipping-method-list .shipping-method-wrapper').data('authtoken-status')) {
            $(".shipping-method-wrapper input[name$='_shippingMethodID']").not('#shipping-method-ANY_FREE_STD').each(function() {
              $(this).attr('disabled', 'disabled');
              $(this).parent().find('label, .form-caption').css('opacity', '0.4');
            });
            if ($('#shipping-method-ANY_FREE_STD').is(':checked')) $('#shipping-method-ANY_FREE_STD').click();
          } else {
            $(".shipping-method-wrapper input[name$='_shippingMethodID']:first").click();
          }
        }
        // update the summary
        updateSummary();
        app.progress.hide();
        app.tooltips.init();
        initRadioFocus();
        validateShippingAddress();
        if ($('#shipping-method-list .shipping-method-wrapper').data('ud-init') && $('#shipping-method-ANY_2DAY_SR').is(':checked')) {
          $('#shipping-method-ANY_2DAY_SR').click();
          $('#shipping-method-list .shipping-method-wrapper').removeAttr('data-ud-init');
        }
        if ($('#shipping-method-ANY_2DAY_SR')[0] && !$('#shipping-method-list .shipping-method-wrapper').data('authtoken-status') && !isShippingInitialized && typeof returnFromPaypal == 'undefined') {
          if (!$(".shipping-method-wrapper input[name$='_shippingMethodID']").filter(':checked').length) $(".shipping-method-wrapper input[name$='_shippingMethodID']").not(':disabled').first().click();
        }
        // Fix for DQP-2461
        if ($('#shipping-method-ANY_2DAY_SR')[0] && !$('#shipping-method-list .shipping-method-wrapper').data('authtoken-status') && $('input[name=dwfrm_singleshipping_shippingAddress_shippingMethodID]').val() == "ANY_2DAY_SR" && isShippingInitialized && !$('input[name=dwfrm_singleshipping_shippingAddress_shippingMethodID]').is(':checked')) {
          $("input[name$='_shippingMethodID']").not('#shipping-method-ANY_2DAY_SR').first().trigger('click');
        }
        sr_refreshSRDOM();
        isShippingInitialized = true;
      });
    });
  }
  // shipping page logic
  // checkout gift message counter
  /**
   * @function
   * @description Initializes gift message box, if shipment is gift
   */
  function initGiftMessageBox() {
    // show gift message box, if shipment is gift
    if ($cache.shippingForm.find("#is-gift-yes")[0]) $cache.giftMessage.toggle($cache.shippingForm.find("#is-gift-yes")[0].checked);
  }
  /**
   * @function
   * @description Initializes gift message box for multiship shipping, the
   *              message box starts off as hidden and this will display it if
   *              the radio button is checked to yes, also added event handler
   *              to listen for when a radio button is pressed to display the
   *              message box
   */
  function initMultiGiftMessageBox() {
    $.each($("table.item-list"), function() {
      // handle initial load
      if ($(this).find(".js-isgiftyes").is(':checked')) {
        $(this).find(".gift-message-text").css('display', 'block');
      }
      // set event listeners
      $(this).bind('change', function() {
        if ($(this).find(".js-isgiftyes").is(':checked')) {
          $(this).find(".gift-message-text").css('display', 'block');
        } else if ($(this).find(".js-isgiftno").is(':checked')) {
          $(this).find(".gift-message-text").css('display', 'none');
        }
      });
    });
  }
  /**
   * @function
   * @description this function inits the form so that uses client side
   *              validation before submitting to the server
   */
  function initmultishipshipaddress() {
    // init the continue button as disabled
    var selectvalue = [];
    $(this).removeClass('error');
    $("select option:selected").each(function() {
      selectvalue.push(this.value);
    });
    // if we found a empty value disable the button
    if (selectvalue.indexOf('') == -1) {
      $('.formactions button').removeAttr('disabled');
    } else {
      $('.formactions button').attr('disabled', 'disabled');
    }
    // add error classes to selects that don't have an address associated
    // with them when the button is clicked
    $('.formactions').bind('click', function() {
      $.each($(".cart-row .shippingaddress select.selectbox"), function() {
        if (this.value === '') {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }
      });
    });
    // add listeners to the selects to enable the continue button
    $.each($(".cart-row .shippingaddress select.selectbox"), function() {
      $(this).bind('change', function() {
        if (this.value == '') {
          $('.formactions button').attr('disabled', 'disabled');
          $(this).addClass('error');
        } else {
          // check to see if any select box has a empty vlaue
          var selectvalues = [];
          $(this).removeClass('error');
          $("select option:selected").each(function() {
            selectvalues.push(this.value);
          });
          // if we found a empty value disable the button
          if (selectvalues.indexOf('') == -1) {
            $('.formactions button').removeAttr('disabled');
          } else {
            $('.formactions button').attr('disabled', 'disabled');
          }
        }
      });
    });
  }
  /**
   * @function
   * @description shows gift message box, if shipment is gift
   */
  function shippingLoad() {
    $cache.shippingForm.on("click", "#is-gift-yes, #is-gift-no", function() {
      $cache.shippingForm.find(".gift-message-text").toggle($cache.shippingForm.find("#is-gift-yes")[0].checked);
    }).on("blur", "input[name$='_addressFields_address1'], input[name$='_addressFields_city'], input[name$='_addressFields_zip']", updateShippingMethodList);
    $cache.shippingForm.on("change", "select[name$='_addressFields_states_state']", updateShippingMethodList);
    // gift message character limitation
    initGiftMessageBox();
    if ($('#ship-to-store').hasClass('ui-tabs-hide')) updateShippingMethodList();
    $cache.shippingForm.on('blur', "input[name$='_addressFields_address1']", function() {
      validateShippingAddress();
    });
    applyCoupon();
    saveShipping();
    return null;
  }
  /**
   * @description Floodlight Tagging Analytics call for Shipping Page
   */
  function flsAnalyticsShipping() {
    var flsSrc = $('iframe.fls-iframe').attr('src');
    if (typeof flsSrc != 'undefined') {
      var flsShippingData = ';u1=' + $('form.checkout-shipping [name$="_city"]').val() + ';u2=' + $('form.checkout-shipping [name$="_state"]').val() + ';u3=' + $('form.checkout-shipping [name$="_zip"]').val() + ';u4=' + $('form.checkout-shipping [name$="_country"]').val();
      var flsSrcUpdated = flsSrc.replace(flsSrc.substring(flsSrc.indexOf(';u1='), flsSrc.indexOf(';u5=')), flsShippingData);
      $('iframe.fls-iframe').attr('src', flsSrcUpdated);
    }
  }
  /**
   * @function saveShipping
   * @description Submit event on shipping section
   */
  function saveShipping() {
    $cache.shippingForm.on('submit', function(e) {
      e.preventDefault();
      // indicate progress
      //  app.progress.show();
      var buttonName = $(this).find("button[type=submit][value=Continue]").attr("name");
      var formData = $(this).serialize();
      //var formData = $(this).parents("form").serialize();
      formData += "&" + buttonName + "=" + buttonName;
      //app.ajaxbuttonloader.show($('#continueOnShipping'));
      var url = $(this).attr("action");
      url = app.util.appendParamsToUrl(url, {
        format: "ajax"
      });
      //false = error  
      if (!globalValidationResult) {
        return;
      }
      // Remove error message or red background come from server side.
      var errorFields = $(this).find(".form-row.error");
      if (errorFields.length > 0) {
        $(errorFields).each(function(key, value) {
          $(value).removeClass("error");
          $(value).find("span.error-message").remove();
        });
      }
      app.progress.show();
      jQuery.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: "html",
        success: function(responseData) {
          //Address verification popup
          if ($(responseData).filter('div#verifyAddress').length) {
            //open in dialog model
            var param = {
              target: '#dialog-container-verifyAdd',
              options: {
                dialogClass: "dialog-verify-address"
              }
            };
            var dlg = app.dialog.create(param);
            dlg.empty().html(responseData);
            dlg.dialog("open");
            //google analyst 
            ga('send', 'pageview', googleAnalyticPath.stepVerify);
            verifyAddressEvent();
            app.progress.hide();
          }
          //Billing section   
          else if ($(responseData).filter('div#checkoutBillingSection').length) {
            $cache.billingInner.empty().html(responseData);
            $($('form#dwfrm_billing')).validate(app.validator.settings);
            loadShippingSummary();
            toggleAccordion($cache.billingHeader);
            app.checkout2.initBilling();
            updateSummary();
            app.progress.hide();
            if (window.location.hash == '') app.history.push({
              step: 1
            }, '', window.location.href + '#step1');
            else if (window.location.hash == '#') app.history.push({
              step: 1
            }, '', window.location.href + 'step1');
            flsAnalyticsShipping();
          }
          //Error on shipping page
          else if ($(responseData).find('div#checkoutShippingSection').length) {
            $cache.shippingInner.html(responseData);
            customizeSelectNow();
            //Reintialize shipping method data
            shippingMethods = null;
            $($('form#dwfrm_singleshipping_shippingAddress')).validate(app.validator.settings);
            app.checkout2.initShipping();
            app.progress.hide();
          }
          //other errors
          else {
            window.location.href = app.urls.cart;
          }
          sr_refreshSRDOM();
        }
      });
    });
  }
  /**
   * @function loadBillingSummary
   * @description Load billing address summary on billing section after submitting billing section
   */
  function loadBillingSummary() {
    var url = app.util.appendParamsToUrl(app.urls.billingSummary, {
      format: "ajax"
    });
    jQuery.ajax({
      type: "GET",
      url: url,
      success: function(responseData) {
        //   $cache.billingInner.find("#checkoutBillingSection").hide();
        //   if($cache.billingInner.find(".mini-shipment").length) {
        //   	$cache.billingInner.find(".mini-shipping").remove();
        //    }
        $cache.billingSumamry.empty().html(responseData);
      }
    });
  }
  /**
   * @function loadShippingSummary
   * @description Load shipping address summary
   */
  function loadShippingSummary() {
    var url = app.util.appendParamsToUrl(app.urls.shippingSummary, {
      format: "ajax"
    });
    jQuery.ajax({
      type: "GET",
      url: url,
      success: function(responseData) {
        //    $cache.shippingInner.find("#checkoutShippingSection").hide();
        //    if($cache.shippingInner.find(".mini-shipment").length) {
        //    	$cache.shippingInner.find(".mini-shipment").remove();
        //    }
        $cache.shippingSummary.empty().html(responseData);
      }
    });
  }

  function loadShippingForm() {
    $("#dwfrm_singleshipping_shippingAddress_addressFields_address1").val($("input[name='dwfrm_verifyaddress_useThisAddress']:checked").parent().parent().find('span.addr1').attr('data-address1'));
    $("#dwfrm_singleshipping_shippingAddress_addressFields_address2").val($("input[name='dwfrm_verifyaddress_useThisAddress']:checked").parent().parent().find('span.addr2').attr('data-address2'));
    $("#dwfrm_singleshipping_shippingAddress_addressFields_states_state").val($("input[name='dwfrm_verifyaddress_useThisAddress']:checked").parent().parent().find('span.mainDivision').attr('data-attr-maindivision'));
    $("#dwfrm_singleshipping_shippingAddress_addressFields_city").val($("input[name='dwfrm_verifyaddress_useThisAddress']:checked").parent().parent().find('span.city').attr('data-attr-city'));
    $("#dwfrm_singleshipping_shippingAddress_addressFields_zip").val($("input[name='dwfrm_verifyaddress_useThisAddress']:checked").parent().parent().find('span.pCode').attr('data-attr-zipCode'));
    updateShippingMethodList();
  }
  /**
   * @function saveBilling
   * @description Binding Ajax request on click continue button on Billing section
   * 
   **/
  function saveBilling() {
    $cache.billingForm.on('submit', function(e) {
      if (!$('#PaymentMethod_CREDIT_CARD').is(':visible')) //continue with paypal
      {
        app.progress.show();
        return;
      }
      //continue with credit card
      e.preventDefault();
      // indicate progress
      var buttonName = $(this).find("button[type=submit][value=Continue]").attr("name");
      var formData = $(this).serialize();
      formData += "&" + buttonName + "=" + buttonName;
      var url = $(this).attr("action");
      url = app.util.appendParamsToUrl(url, {
        format: "ajax"
      });
      if (!globalValidationResult) {
        return;
      }
      // Remove error message or red background come from server side.
      var errorFields = $(this).find(".form-row.error");
      if (errorFields.length > 0) {
        $(errorFields).each(function(key, value) {
          $(value).removeClass("error");
          $(value).find("span.error-message").remove();
        });
      }
      app.progress.show();
      jQuery.ajax({
        type: "POST",
        url: url,
        data: formData,
        success: function(responseData) {
          //error on billing
          if ($(responseData).filter('div#checkoutBillingSection').length) {
            $cache.billingInner.empty().html(responseData);
            customizeSelectNow();
            $($('form#dwfrm_billing')).validate(app.validator.settings);
            app.checkout2.initBilling();
            app.progress.hide();
            app.tooltips.init();
          }
          //success with order review response 
          else if ($(responseData).filter('div.mini-summary-wrapper').length) {
            $cache.reviewInner.empty().html(responseData);
            toggleAccordion($cache.reviewHeader);
            app.progress.hide();
            var reviewMiniCart = $('.review .minicart-checkout');
            if (reviewMiniCart.find('.mini-cart-product').length > 2) {
              reviewMiniCart.tinyscrollbar();
            } else {
              reviewMiniCart.find('.scrollbar').css('display', 'none');
              reviewMiniCart.find('.viewport').css({
                'width': '100%',
                'height': 'auto',
                'max-height': 'none'
              });
              reviewMiniCart.find('.overview').css('position', 'relative');
            }
            if (window.location.hash.indexOf('step2') == -1) app.history.push({
              step: 2
            }, '', window.location.href + '|step2');
          } else { //other errors
            window.location.href = app.urls.cart;
          }
          sr_refreshSRDOM();
        }
      });
    });
  }

  function verifyAddressEvent() {
    var suggestionForms = $("div#verifyAddress").find('form');
    $(suggestionForms).each(function(key, value) {
      $(value).find("button[type=submit]").on('click', function(e) {
        e.preventDefault();
        var buttonId = e.target.id;
        if (buttonId == "shipToThisAddressOriginal" || buttonId == "shipToThisAddressSuggested") {
          //google analytics calls
          if (buttonId == "shipToThisAddressOriginal") app.analytics.init(app.$cache[29].event_cat, app.$cache[29].event_action, '');
          else if (buttonId == "shipToThisAddressSuggested") app.analytics.init(app.$cache[30].event_cat, app.$cache[30].event_action, '');
          var buttonName = e.target.name;
          var formData = $(this).parents("form").serialize();
          if (formData) {
            formData += "&" + buttonName + "=" + buttonName;
          } else formData += buttonName + "=" + buttonName;
          if (buttonId == "shipToThisAddressSuggested") loadShippingForm();
          var url = $(this).parents("form").attr("action");
          url = app.util.appendParamsToUrl(url, {
            format: "ajax"
          });
          app.progress.show();
          jQuery.ajax({
            type: "POST",
            url: url,
            data: formData,
            success: function(responseData) {
              app.dialog.close();
              //success to move on billing
              if ($(responseData).filter('div#checkoutBillingSection').length) {
                //suggested address is choosed
                if (buttonId == "shipToThisAddressSuggested") {
                  refreshShippingForm();
                }
                $cache.billingInner.empty().html(responseData);
                loadShippingSummary();
                $($('form#dwfrm_billing')).validate(app.validator.settings);
                app.checkout2.initBilling();
                toggleAccordion($cache.billingHeader);
                updateSummary();
                app.progress.hide();
                if (window.location.hash == '') app.history.push({
                  step: 1
                }, '', window.location.href + '#step1');
                else if (window.location.hash == '#') app.history.push({
                  step: 1
                }, '', window.location.href + 'step1');
                flsAnalyticsShipping();
              }
              //error on shipping
              else if ($(responseData).filter('div#checkoutShippingSection').length) {
                $cache.shippingInner.empty().html(responseData);
                customizeSelectNow();
                //Reintialize shipping method data
                shippingMethods = null;
                $($('form#dwfrm_singleshipping_shippingAddress')).validate(app.validator.settings);
                app.checkout2.initShipping();
                app.progress.hide();
              }
              //other error message
              else {
                window.location.href = app.urls.cart;
              }
            }
          });
        }
      });
    });
    // back to shipping button
    $('.dialog-verify-address').on('click', "button#cancel", function() {
      app.dialog.close();
      ga('send', 'pageview', googleAnalyticPath.stepShipping);
    });
  }

  function refreshShippingForm() {
    var url = app.urls.shippingForm;
    url = app.util.appendParamsToUrl(url, {
      format: "ajax"
    });
    jQuery.ajax({
      type: "GET",
      url: url,
      success: function(responseData) {
        if ($(responseData).filter('div#checkoutShippingSection').length) {
          $cache.shippingInner.empty().html(responseData);
          //Reintialize shipping method data
          shippingMethods = null;
          $($('form#dwfrm_singleshipping_shippingAddress')).validate(app.validator.settings);
          app.checkout2.initShipping();
        }
      }
    });
  }

  function validateShippingAddress() {
    var URL = getShippingMethodURL(app.urls.shippingAddressValidation);
    $('#hazmatShippingmethod').hide();
    var _this = this;
    app.ajax.getJson({
      url: URL,
      callback: function(data) {
        var parent = $("input[name$='_addressFields_address1']").parent();
        if (data[0]) {
          $('.continue-shipping button').attr('disabled', 'disabled');
          var content = $("#hazmat").html();
          $($('.hazmat-error').find('#cstmHzmat')).remove();
          $('.hazmat-error').append("<span id='cstmHzmat' class='error'>" + content + "</span>");
          $("input[name$='_addressFields_address1']").addClass('error');
          $('.no-shipping-methods').hide();
          //app.resources.CC_LOAD_ERROR
        } else {
          $($('.hazmat-error').find('#cstmHzmat')).remove();
          $('.continue-shipping button').removeAttr('disabled');
          $("input[name$='_addressFields_address1']").removeClass('error');
        }
        if (data[1]) {
          $('#hazmatShippingmethod').hide();
        } else {
          $('#hazmatShippingmethod').show();
        }
        if (data[2]) {
          $('.statutary-warning').show();
        } else {
          $('.statutary-warning').hide();
        }
      }
    });
  }
  /**
   * @private
   * @function
   * @description store currently selected shipping method. 
   * @param {object}
   */
  function updateCurrentShippingAddress(currentForm) {
    currentShippingAddress.firstName = currentForm.find("input[name$='_firstName']"),
      currentShippingAddress.lastName = currentForm.find("input[name$='_lastName']"),
      currentShippingAddress.address1 = currentForm.find("input[name$='_address1']"),
      currentShippingAddress.address2 = currentForm.find("input[name$='_address2']"),
      currentShippingAddress.city = currentForm.find("input[name$='_city']"),
      currentShippingAddress.postalCode = currentForm.find("input[name$='_zip']"),
      currentShippingAddress.phone = currentForm.find("input[name$='_phone']"),
      currentShippingAddress.countryCode = currentForm.find("select[id$='_country']"),
      currentShippingAddress.stateCode = currentForm.find("select[id$='_state']"),
      currentShippingAddress.addToAddressBook = currentForm.find("input[name$='_addToAddressBook']");
    return currentShippingAddress;
  }
  /**
   * @function
   * @description Selects the first address from the list of addresses
   */
  function addressLoad() {
    // select address from list
    $('.checkout-wrapper #primary').off('change').on("change", ".select-address select[id$='_addressList']", function() {
      var currentForm = $(this).parents('form');
      var selected = $(this).children(":selected").first();
      var data = $(selected).data("address");
      if (!data) {
        return;
      }
      updateCurrentShippingAddress(currentForm);
      var p;
      for (p in data) {
        if (currentShippingAddress[p] && data[p]) {
          currentShippingAddress[p].val(data[p].replace("^", "'"));
          // special handling for countrycode => stateCode combo
          if (currentShippingAddress[p] === currentShippingAddress.countryCode) {
            app.util.updateStateOptions(currentShippingAddress[p]);
            currentShippingAddress.stateCode.val(data.stateCode);
            // addressForm.stateCode.trigger("change");
          } else {
            // updateShippingMethodList();
          }
        } else if (currentShippingAddress[p]) {
          currentShippingAddress[p].val('');
        }
      }
      /* only for shipping form */
      if ($(this).attr('id').indexOf('_singleshipping_addressList') > 0) updateShippingMethodList();
      //Removing class mandatory from the payment details
      if ($cache.paymentMethods) {
        $cache.paymentMethods.find('input,select').each(function() {
          if (!$(this).hasClass('error')) {
            $(this).removeClass('required');
          }
        });
      }
      // re-validate the form
      //   $cache.shippingForm.validate().form();
      //adding class mandatory to the payment details once the validation of address form is complete
      if ($cache.paymentMethods) {
        $cache.paymentMethods.find('input,select').each(function(key, val) {
          if (!$(this).hasClass('required') && !$(val).is($('#creditCardList')) && !$(val).is($('.input-checkbox'))) {
            $(this).addClass('required');
          }
        });
      }
    });
    // update state options in case the country changes
    $cache.countryCode.on("change", function() {
      app.util.updateStateOptions(this);
    });
  }
  /**
   * @function
   * @description shows gift message box in multiship, and if the page is the
   *              multi shipping address page it will call
   *              initmultishipshipaddress() to initialize the form
   */
  function multishippingLoad() {
    initMultiGiftMessageBox();
    if ($(".cart-row .shippingaddress select.selectbox").length > 0) {
      initmultishipshipaddress();
    }
    return null;
  }
  /**
   * @function
   * @description Changes the payment method form depending on the passed
   *              paymentMethodID
   * @param {String}
   *            paymentMethodID the ID of the payment method, to which the
   *            payment method form should be changed to
   */
  function changePaymentMethod(paymentMethodID) {
    $cache.paymentMethods.removeClass("payment-method-expanded");
    var pmc = $cache.paymentMethods.filter("#PaymentMethod_" + paymentMethodID);
    if (pmc.length === 0) {
      pmc = $("#PaymentMethod_Custom");
    }
    pmc.addClass("payment-method-expanded");
    // ensure checkbox of payment method is checked
    if ($("#is-" + paymentMethodID)[0]) $("#is-" + paymentMethodID)[0].checked = true;
    var bmlForm = $cache.billingForm.find("#PaymentMethod_BML");
    bmlForm.find("select[name$='_year']").removeClass("required");
    bmlForm.find("select[name$='_month']").removeClass("required");
    bmlForm.find("select[name$='_day']").removeClass("required");
    bmlForm.find("input[name$='_ssn']").removeClass("required");
    if (paymentMethodID === "BML") {
      var yr = bmlForm.find("select[name$='_year']");
      bmlForm.find("select[name$='_year']").addClass("required");
      bmlForm.find("select[name$='_month']").addClass("required");
      bmlForm.find("select[name$='_day']").addClass("required");
      bmlForm.find("input[name$='_ssn']").addClass("required");
    }
  }
  /**
   * @function
   * @description Fills the Credit Card form with the passed data-parameter
   *              and clears the former cvn input
   * @param {Object}
   *            data The Credit Card data (holder, type, masked number,
   *            expiration month/year)
   */
  function setCCFields(data) {
    $cache.ccOwner.val(data.holder);
    $cache.ccType.val(data.type);
    $cache.ccNum.val(data.maskedNumber);
    $cache.ccMonth.val(data.expirationMonth);
    $cache.ccYear.val(data.expirationYear);
    $cache.ccCcv.val("");
    $cache.ccNum.on('focus', function() {
      if (($(this).val().length) == 16) {
        $(this).val("");
      }
    });
    // remove error messages
    $cache.ccContainer.find(".errormessage").toggleClass("errormessage").filter("span").remove();
    $cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
  }
  /**
   * @function
   * @description Updates the credit card form with the attributes of a given
   *              card
   * @param {String}
   *            cardID the credit card ID of a given card
   */
  function populateCreditCardForm(cardID) {
    // load card details
    var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        if (!data) {
          window.alert(app.resources.CC_LOAD_ERROR);
          return false;
        }
        $cache.ccList.data(cardID, data);
        setCCFields(data);
      }
    });
  }
  /**
   * @function
   * @description loads billing address, Gift Certificates, Coupon and Payment
   *              methods
   */
  function billingLoad() {
    if (!$cache.paymentMethodId) return;
    $cache.paymentMethodId.on("click", function() {
      changePaymentMethod($(this).val());
    });
    // get selected payment method from payment method form
    var paymentMethodId = $cache.paymentMethodId.filter(":checked");
    changePaymentMethod(paymentMethodId.length === 0 ? "CREDIT_CARD" : paymentMethodId.val());
    // select credit card from list
    $cache.ccList.on("change", function() {
      var cardUUID = $(this).val();
      if (!cardUUID) {
        return;
      }
      populateCreditCardForm(cardUUID);
    });
    // handle whole form submit (bind click to continue checkout button)
    // append form fields of current payment form to this submit
    // in order to validate the payment method form inputs too
    $cache.save.on('click', function() {
      // determine if the order total was paid using gift
      // cert or a promotion
      if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
        // as a safety precaution, uncheck any existing
        // payment methods
        $cache.paymentMethodId.filter(":checked").removeAttr("checked");
        // add selected radio button with gift card
        // payment method
        $("<input/>").attr({
          name: $cache.paymentMethodId.first().attr("name"),
          type: "radio",
          checked: "checked",
          value: app.constants.PI_METHOD_GIFT_CERTIFICATE
        }).appendTo($cache.billingForm);
      }
      var tc = $cache.billingForm.find("input[name$='bml_termsandconditions']");
      if ($cache.paymentMethodId.filter(":checked").val() === "BML" && !$cache.billingForm.find("input[name$='bml_termsandconditions']")[0].checked) {
        alert(app.resources.BML_AGREE_TO_TERMS);
        return false;
      }
    });
    $cache.gcCheckBalance.on("click", function(e) {
      e.preventDefault();
      $cache.gcCode = $cache.gcCode || $cache.billingForm.find("input[name$='_giftCertCode']");
      $cache.balance = $cache.balance || $cache.billingForm.find("div.balance");
      if ($cache.gcCode.length === 0 || $cache.gcCode.val().length === 0) {
        var error = $cache.balance.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo($cache.balance);
        }
        error.html(app.resources.GIFT_CERT_MISSING);
        return;
      }
      app.giftcard.checkBalance($cache.gcCode.val(), function(data) {
        if (!data || !data.giftCertificate) {
          // error
          var error = $cache.balance.find("span.error");
          if (error.length === 0) {
            error = $("<span>").addClass("error").appendTo($cache.balance);
          }
          error.html(app.resources.GIFT_CERT_INVALID);
          return;
        }
        // display details in UI
        $cache.balance.find("span.error").remove();
        var balance = data.giftCertificate.balance;
        $cache.balance.html(app.resources.GIFT_CERT_BALANCE + " " + balance);
      });
    });
    $cache.addCoupon.on("click", function(e) {
      e.preventDefault();
      $cache.couponCode = $cache.couponCode || $cache.billingForm.find("input[name$='_couponCode']");
      $cache.redemption = $cache.redemption || $cache.billingForm.find("div.redemption.coupon");
      var val = $cache.couponCode.val();
      if (val.length === 0) {
        var error = $cache.redemption.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo($cache.redemption);
        }
        error.html(app.resources.COUPON_CODE_MISSING);
        return;
      }
      var url = app.util.appendParamsToUrl(app.urls.addCoupon, {
        couponCode: val,
        format: "ajax"
      });
      $.getJSON(url, function(data) {
        var fail = false;
        var msg = "";
        if (!data) {
          msg = app.resources.BAD_RESPONSE;
          fail = true;
        } else if (!data.success) {
          msg = data.message;
          fail = true;
        }
        if (fail) {
          var error = $cache.redemption.find("span.error");
          if (error.length === 0) {
            $("<span>").addClass("error").appendTo($cache.redemption);
          }
          error.html(msg);
          return;
        }
        $cache.redemption.html(data.message);
      });
    });
    applyCoupon();
    //Same as billing address
    $cache.billingForm.find("input[name$='_useAsBillingAddress']").on('click', function() {
      if ($(this).prop('checked')) {
        //hide billing prefield form
        $cache.billingForm.find(".shipping-form-wrapper").stop().slideToggle();
        //coping shipping fields to billing fields
        $cache.shippingForm.find("input[name$='_useAsBillingAddress']").prop('checked', true);
        $cache.billingForm.find("input[name$='_firstName']").val($cache.shippingForm.find("input[name$='_firstName']").val());
        $cache.billingForm.find("input[name$='_lastName']").val($cache.shippingForm.find("input[name$='_lastName']").val());
        $cache.billingForm.find("input[name$='_address1']").val($cache.shippingForm.find("input[name$='_address1']").val());
        $cache.billingForm.find("input[name$='_address2']").val($cache.shippingForm.find("input[name$='_address2']").val());
        $cache.billingForm.find("input[name$='_city']").val($cache.shippingForm.find("input[name$='_city']").val());
        $cache.billingForm.find("input[name$='_zip']").val($cache.shippingForm.find("input[name$='_zip']").val());
        $cache.billingForm.find("input[name$='_phone']").val($cache.shippingForm.find("input[name$='_phone']").val());
        $cache.billingForm.find("select[id$='_country']").val($cache.shippingForm.find("select[id$='_country']").val());
        $cache.billingForm.find("select[id$='_state']").val($cache.shippingForm.find("select[id$='_state']").val());
        $cache.billingForm.find("input[name$='_phone']").val($cache.shippingForm.find("input[name$='_phone']").val());
        $cache.billingForm.find("input[name$='_emailAddress']").val($cache.shippingForm.find("input[name$='_emailAddress']").val());
        $cache.billingForm.find("select[id$='_addressList'] option:first").attr('selected', 'selected');
      } else {
        $cache.shippingForm.find("input[name$='_useAsBillingAddress']").prop('checked', false);
        $cache.billingForm.find(".shipping-form-wrapper").stop().slideToggle();
        if (applyCustomizeSelectFlag === true) {
          customizeSelectNow();
          applyCustomizeSelectFlag = false;
        }
      }
    });
    /* Update Credit Card expiration year */
    if ($('input[name="CCSelectedYearOfExpiration"]').length) {
      var options = $('select[id$="paymentMethods_creditCard_year"] option');
      options.each(function() {
        if ($(this).val() === $('input[name="CCSelectedYearOfExpiration"]').val()) {
          $(this).attr("selected", "selected");
          return;
        }
      });
    }
  }
  /**
   * @function
   * @description coupon code handler 
   * 
   */
  function applyCoupon() {
    var addCoupon = $('#secondary.summary #add-coupon');
    $("#add-coupon").off().on("click", function(e) {
      if ($(e.target).attr('id') !== 'add-coupon') {
        return;
      }
      e.preventDefault();
      var form = $('form#apply-coupon'),
        couponCode = form.find("input[name$='_couponCode']"),
        redemption = form.find("div.error.coupon-error"),
        val = couponCode.val(),
        $main = $('#main'),
        secondary = $('#secondary.summary'),
        formAction = form.attr('action'),
        couponBlock = form.find('.coupon-list');
      redemption.empty();
      if ($.trim(val) === '') {
        var error = redemption.find("span.error");
        if (error.length === 0) {
          error = $("<span>").addClass("error").appendTo(redemption);
        }
        error.html(app.resources.COUPON_CODE_MISSING);
        return;
      }
      var url = app.util.appendParamsToUrl(app.urls.addCoupon, {
        couponCode: val,
        format: "ajax"
      });
      app.progress.show();
      $.getJSON(url, function(data) {
        var fail = false;
        var msg = "";
        if (!data) {
          msg = app.resources.BAD_RESPONSE;
          fail = true;
        } else if (!data.success) {
          msg = data.message;
          fail = true;
        }
        if (fail) {
          var error = redemption.find("span.error");
          if (error.length === 0) {
            $("<span>").addClass("error").html(msg).appendTo(redemption);
          }
          error.html(msg);
          app.progress.hide();
          return;
        }
        updateCoupon(e, val);
      });
    });
    if ($('#secondary.cart').length === 0) {
      $('#secondary').off().on('click', 'button[id^="removeCouponCode"]', function(e) {
        app.progress.show();
        e.preventDefault();
        var form = $('form#apply-coupon');
        var $main = $('#main');
        var parentElem = $(this).parent();
        var formAction = form.attr('action');
        form.find("div.error.coupon-error").empty();
        var url = app.util.appendParamsToUrl(app.urls.removeCoupon, {
          couponCode: $(this).data('couponcode'),
          format: "ajax"
        });
        app.progress.show();
        removeCoupon(url, $(this));
      });
    }
  }
  /**
   * @function
   * @description template to show applied coupon
   * 
   */
  function removeCoupon(url, elem) {
    var form = $('form#apply-coupon');
    var couponBlock = form.find('.coupon-list');
    var parent = elem.parent('li');
    $.ajax({
      type: 'get',
      url: url || app.util.appendParamsToUrl(window.location.href, {
        format: 'ajax'
      }),
      data: {},
      dataType: 'html'
    }).done(function(response) {
      response = JSON.parse(response);
      if (!response.success) {
        return;
      } else {
        if ($('.payment-method-options').length > 0) {
          updateSummary();
        } else {
          isShippingCouponCode = true;
          updateShippingMethodList();
        }
        parent.remove();
      }
    }).always(function() {
      app.progress.hide();
    });
  }
  /**
   * @function
   * @description display the coupon in the billing and shipping page
   *              
   */
  function updateCoupon(e, msg) {
    var form = $('form#apply-coupon');
    var _template = $('<li></li>').html($('#coupon-template').find('li').html());
    var couponBlock = form.find('.coupon-list').length > 0 ? form.find('.coupon-list') : $('<ul class="coupon-list"></ul>').prependTo(form);
    var size = couponBlock.find('li').length;
    if ($('.payment-method-options').length > 0) {
      updateSummary();
    } else {
      isShippingCouponCode = true;
      updateShippingMethodList();
    }
    if ($(e.target).prop('tagName') === 'button') {
      $(e.target).parent('li').remove();
    } else {
      _template.find('.coupon-code').html(msg);
      _template.find('button').attr('id', 'removeCouponCode-' + msg).attr('name', 'removeCoupon_' + msg);
      _template.find('button').attr('data-couponcode', msg);
      couponBlock.append(_template);
      form.find('input[id="dwfrm_cart_couponCode"]').val('');
    }
    app.progress.hide();
  }
  /**
   * @function toggleAccordian
   * @param heading : accordian header example .accordion-heading
   * @description Accordian functionality adn intialize shipping/billing/summary dom
   * 
   */
  function toggleAccordion(heading) {
    //Note : Shipping header as parameter comes only in case of edit shipping
    var toggleBlock = $(heading).parent('.accordion-group');
    if (toggleBlock.hasClass('shipping')) {
      if ($(heading).hasClass('up')) {
        ga('send', 'pageview', googleAnalyticPath.stepShipping);
        $cache.current.siblings('.accordion-inner').stop().slideToggle({
          duration: 800,
          complete: function() {
            $('html, body').animate({
              scrollTop: toggleBlock.offset().top
            });
            customizeSelectNow();
          }
        });
        $cache.shippingInner.stop().slideToggle(400);
        customizeSelectNow();
        $cache.billingHeader.find('a').hide();
        $cache.shippingHeader.toggleClass('up');
        $($cache.current).toggleClass('up');
        $cache.shippingHeader.removeClass("sumamryView");
        $cache.shippingSummary.hide();
        if ($('.payment-closed').children().length > 0) {
          $cache.billingSummary.show();
        }
        $cache.shippingHeader.find('a').hide();
        $cache.current = $cache.shippingHeader;
        //Update checkout step counter
        $cache.currentCheckoutStep.text('1');
        $('#secondary #right-nav-wrapper').removeAttr('class').addClass('one');
      }
    } else if (toggleBlock.hasClass('billing')) {
      if ($(heading).hasClass('up')) {
        ga('send', 'pageview', googleAnalyticPath.stepBilling);
        $cache.shippingHeader.find('a').show();
        $cache.current.siblings('.accordion-inner').stop().slideToggle({
          duration: 800,
          complete: function() {
            $('html, body').animate({
              scrollTop: toggleBlock.offset().top
            });
            customizeSelectNow();
          }
        });
        $cache.billingInner.stop().slideToggle(400);
        $cache.billingHeader.toggleClass('up');
        $cache.current.toggleClass('up');
        $cache.shippingHeader.addClass("sumamryView");
        $cache.shippingSummary.show();
        $cache.billingSummary.show();
        $cache.billingHeader.find('a').hide();
        $cache.current = $cache.billingHeader;
        $cache.currentCheckoutStep.text('2');
        $('#secondary #right-nav-wrapper').removeAttr('class').addClass('two');
      }
    } else if (toggleBlock.hasClass('review')) {
      if ($(heading).hasClass('up')) {
        ga('send', 'pageview', googleAnalyticPath.stepReview);
        $cache.current.siblings('.accordion-inner').stop().slideToggle({
          duration: 800,
          complete: function() {
            $('html, body').animate({
              scrollTop: toggleBlock.offset().top
            });
            customizeSelectNow();
          }
        });
        $cache.reviewInner.stop().slideToggle(400);
        $cache.reviewHeader.toggleClass('up');
        $cache.current.toggleClass('up');
        $cache.shippingHeader.removeClass("sumamryView");
        $cache.shippingSummary.hide();
        $cache.reviewInner.show();
        // $cache.shippingInner.find('a').show();
        $cache.billingHeader.find('a').show();
        $cache.current = $cache.reviewHeader;
        $cache.currentCheckoutStep.text('3');
        $('#secondary #right-nav-wrapper').removeAttr('class').addClass('three');
      }
    }
  }
  /*
   * BILLING FUNCTIONS
   */
  function initializeBillingDom() {
    $cache.isShipping = false;
    $cache.isMultiShipping = false;
    $cache.isBilling = true;
    $cache.isSummary = false;
  }

  function initializeShippingDom() {
    $cache.isShipping = true;
    $cache.isMultiShipping = false;
    $cache.isBilling = false;
    $cache.isSummary = false;
    //	initializeAddressEdit();
  }

  function initializeReviewDom() {
    $cache.isShipping = false;
    $cache.isMultiShipping = false;
    $cache.isBilling = false;
    $cache.isSummary = true;
  }
  /*
   * MULTI SHIPPING FUNCTIONS
   */
  function initializeMultiShippingDom() {
    $cache.isShipping = false;
    $cache.isMultiShipping = true;
    $cache.isBilling = false;
    $cache.isSummary = false;
  }
  /**
   * @function
   * @description Sets a boolean variable (isShipping) to determine the
   *              checkout stage
   */
  function initializeDom() {
    //isShipping = $(".checkout-shipping").length > 0;
    //isMultiShipping = $(".checkout-multi-shipping").length > 0;
    if ($('.checkout-shipping').length) {
      initializeShippingDom();
    } else {
      initializeMultiShippingDom();
    }
    /*isShipping:false,
		isMultiShipping:false,
		isBilling:false,
		isSubmitOrder:false,
		shippingMethods:null
     */
  }
  /**
   * @function
   * @description Initializes the cache of the checkout UI
   */
  function initializeCache() {
    if (!$cache.current) { // one-time cache of elements used in accordion
      $cache.shippingHeader = $('div.accordion-group.shipping .accordion-heading');
      $cache.shippingInner = $('div.accordion-group.shipping .accordion-inner:not(.innermost)');
      $cache.shippingSummary = $('div.accordion-group.shipping .shipping-closed');
      $cache.billingHeader = $('div.accordion-group.billing .accordion-heading');
      $cache.billingInner = $('div.accordion-group.billing .accordion-inner');
      $cache.billingSummary = $('div.accordion-group.billing .billing-closed');
      $cache.reviewHeader = $('div.accordion-group.review .accordion-heading');
      $cache.reviewInner = $('div.accordion-group.review .accordion-inner');
      $cache.currentCheckoutStep = $('#currentCheckoutStep');
    }
    // currently showed section in accordion, shipping is the default
    $cache.current = $cache.current || $cache.shippingHeader;
    if ($cache.isMultiShipping) {
      $cache.currentForm = $(".multishipping-addresses-form");
      $cache.multiShippingForm = $cache.currentForm;
    } else if ($cache.isShipping || $cache.isBilling) {
      // below list of elements need to be re-cached as we move into
      // shipping or billing
      $cache.currentForm = ($cache.isShipping) ? $(".checkout-shipping") : $(".checkout-billing");
      $cache.addressList = $cache.currentForm.find(".select-address select[id$='_addressList']");
      $cache.firstName = $cache.currentForm.find("input[name$='_firstName']");
      $cache.lastName = $cache.currentForm.find("input[name$='_lastName']");
      $cache.address1 = $cache.currentForm.find("input[name$='_address1']");
      $cache.address2 = $cache.currentForm.find("input[name$='_address2']");
      $cache.city = $cache.currentForm.find("input[name$='_city']");
      $cache.postalCode = $cache.currentForm.find("input[name$='_zip']");
      $cache.phone = $cache.currentForm.find("input[name$='_phone']");
      $cache.countryCode = $cache.currentForm.find("select[id$='_country']");
      $cache.stateCode = $cache.currentForm.find("select[id$='_state']");
      $cache.addToAddressBook = $cache.currentForm.find("input[name$='_addToAddressBook']");
      if ($cache.isShipping) { // one-time cache of shipping elements
        $cache.shippingForm = $cache.currentForm;
        $cache.useForBilling = $cache.currentForm.find("input[name$='_useAsBillingAddress']");
        $cache.giftMessage = $cache.currentForm.find(".gift-message-text");
        $cache.shippingMethodList = $("#shipping-method-list");
        updateCurrentShippingAddress($cache.shippingForm);
      } else if ($cache.isBilling) { // one-time cache of billing elements
        $cache.billingForm = $cache.currentForm;
        $cache.email = $cache.currentForm.find("input[name$='_emailAddress']");
        $cache.save = $cache.currentForm.find("button[name$='_billing_save']");
        $cache.paymentMethods = $cache.currentForm.find("div.payment-method");
        $cache.paymentMethodId = $cache.currentForm.find("input[name$='_selectedPaymentMethodID']");
        $cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
        $cache.ccList = $("#creditCardList");
        $cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
        $cache.ccType = $cache.ccContainer.find("select[name$='_type']");
        $cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
        $cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
        $cache.ccYear = $cache.ccContainer.find("[name$='_year']");
        $cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
        $cache.BMLContainer = $("#PaymentMethod_BML");
        $cache.gcCheckBalance = $("#gc-checkbalance");
        $cache.addCoupon = $("#add-coupon");
      }
    } else if ($cache.isSummary) {
      $cache.currentForm = $(".submit-order");
      $cache.summaryForm = $cache.currentForm;
      $cache.passwordField = $cache.currentForm.find("input[name$='_password']");
      $cache.passwordConfirm = $cache.currentForm.find("input[name$='_passwordconfirm']");
      $cache.checkOutButton = $cache.currentForm.find(".check-out-button");
    }
  }
  /**
   * @function Initializes the page events depending on the checkout stage
   *           (shipping/billing)
   */
  function initializeEvents() {
    if (typeof returnFromPaypal == 'undefined') {
      //Run in normal flow
      if ($cache.isShipping) {
        app.checkout2.initShipping();
      } else {
        app.checkout2.initMultiShipping();
        $('.shipping-address select:visible').first().trigger('change');
      }
    }
    //Edit link
    $('.accordion-heading a').click(function(e) {
      e.preventDefault();
      var _parentAccordionHead = $(this).parents('.accordion-heading');
      if (_parentAccordionHead.siblings('.accordion-inner').children().length > 0) {
        toggleAccordion(_parentAccordionHead);
        initializeCache();
      }
    });
  }

  function shipToStoreHideShow() {
    var tabSelected = 0;
    if ($('.ship-to-address #shipToStore').hasClass("active")) {
      tabSelected = 1;
    }
    if ($('.ship-to-address #shipToStore').hasClass("active") || $('.ship-to-address #shipToYourAddress').hasClass("active")) {
      checkShipToStore(tabSelected);
      showStoreInfo();
    }
    $(".ship-to-address").tabs({
      selected: tabSelected
    });
    $(".ship-to-address").bind("tabsselect", function(event, ui) {
      checkShipToStore(ui.index);
    });
  }

  function checkShipToStore(tabSelected) {
    var continueToPaymentBtn = $('.state-menu .continue-shipping button');
    if ($('.store-menu .store-details').length > 0) {
      continueToPaymentBtn.removeAttr("disabled", "disabled");
    } else {
      continueToPaymentBtn.attr("disabled", "disabled");
    }
    var isShipToStore = tabSelected == 1 ? true : false;
    if (isShipToStore) {
      var url = app.urls.shippingMethodsList;
      url = app.util.appendParamToURL(url, "isShipToStore", isShipToStore);
      jQuery.ajax({
        url: url,
        success: function(response) {
          updateSummary();
        }
      });
    } else {
      updateShippingMethodList();
    }
  }

  function showStoreMap() {
    $('#ship-to-store .store-map .view-map').click(function() {
      var parentDiv = $(this).parents('.store-map');
      var longitude = $(this).attr("data-long");
      var latitude = $(this).attr("data-lat");
      var mapCanvas;
      if ($(window).width() < 767) {
        mapCanvas = parentDiv.find('.map-view').find('.map-canvas')[0];
        $(mapCanvas).width(($(window).width()) * 0.99);
        $(mapCanvas).height(($(window).height()) * 0.7);
      } else {
        $(this).hide();
        parentDiv.find('.close-map').show();
        mapCanvas = parentDiv.find('.map-canvas')[0];
        if (mapCanvas.innerHTML.length > 0) {
          $(mapCanvas).show();
          return;
        }
        $(mapCanvas).css({
          'background-color': 'grey',
          "height": "400px",
          "width": "100%",
          "margin-top": "20px"
        });
        $('html, body').animate({
          scrollTop: $(this).parents('.accordion-inner').offset().top
        });
      }
      var image = app.urls.gmappointer;
      var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var markerPos = new google.maps.LatLng(latitude, longitude);
      var marker = new google.maps.Marker({
        position: markerPos,
        map: map,
        title: "Diesel Store",
        icon: image
      });
      if ($(window).width() < 767) {
        var content = $(this).parents('.accordion-content').find('.store-details').html();
        var titleContent = $(this).parents('.accordion-content').find('.store-details').find('.storeName').html();
        $('.pt_checkout').hide();
        $('body').css({
          'overflow': 'hidden',
          'height': '100%'
        }).addClass('mapDialog');
        $('.mapDialog').find('.ui-dialog-titlebar').find('#ui-dialog-title-1').html(titleContent);
        $('.mapDialog').find('.ui-dialog-titlebar').find('.ui-dialog-title').show();
        $(this).parents('.store-map').find('.map-info').html(content);
        $(this).parents('.store-map').find('.map-info').find('.details5').hide();
        var mapView = $(this).parents('.store-map').find('.map-view');
        $(mapView).dialog({
          dialogClass: 'dialog-store-map'
        });
        $(mapView).dialog({
          width: $(window).width()
        });
        $(mapView).parent().css('height', $(window).height());
        $(mapView).dialog({
          position: {
            my: "left top",
            at: "left top",
            of: window
          }
        });
        $(this).parents('.store-map').append('<div class="map-view"><div class="map-info"></div><div class="map-canvas"></div></div>');
        $(mapView).dialog({
          close: function(event, ui) {
            $('body').css('overflow', 'inherit').removeClass('mapDialog');
            $('.pt_checkout').show();
          }
        });
      }
    });
    $('#ship-to-store .store-map .close-map').click(function() {
      var parentDiv = $(this).parents('.store-map');
      parentDiv.find('.map-canvas').hide();
      parentDiv.find('.view-map').show();
      $(this).hide();
    });
  }
  /** Upper case plugin to Tranform Dropdown Text and Value attribute to Uppercase **/
  $.fn.uppercaseOptions = function() {
    $(this).find('option').each(function() {
      $(this).text($(this).text().toUpperCase());
      $(this).attr("label", $(this).attr("label").toUpperCase());
    });
  };

  function showStores() {
    var stateName = $('#ship-to-store select[name$="_states_stateShipToStore"]').val();
    var continueToPaymentBtn = $('.state-menu .continue-shipping button');
    if ($(window).width() < 767) {
      $('#ship-to-store .state-menu .store-menu .head .store-info').html('');
    }
    $(".state-inline").uppercaseOptions();
    $(".input-select.country").uppercaseOptions();
    $('.state-menu .input-select').change(function() {
      $('.state-menu .form-row span.error').html("");
      $('#ship-to-store .state-menu .store-menu').html("");
      var url = app.urls.getStores;
      var stateValue = $('.state-menu .state-inline .input-select').val();
      url = app.util.appendParamToURL(url, "stateCode", stateValue);
      jQuery.ajax({
        url: url,
        dataType: 'html',
        success: function(response) {
          if (response) {
            $('#ship-to-store .state-menu .store-menu').show();
          }
          $('#ship-to-store .state-menu .store-menu').html($(response).find('.store-menu').html());
          if ($(window).width() < 767) {
            $('#ship-to-store .state-menu .store-menu .head .store-info').html('');
          }
          if (($('#ship-to-store .state-menu .store-menu').find('.input-radio')[0]) == undefined) {
            continueToPaymentBtn.attr("disabled", "disabled");
          } else {
            continueToPaymentBtn.removeAttr("disabled", "disabled");
          }
          showStoreInfo();
        },
        failure: function(response) {
          alert(app.resources["SERVER_ERROR"]);
        }
      });
    });
  }

  function showStoreInfo() {
    jQuery(document).ready(function() {
      $('#ship-to-store .state-menu .store-menu .head').click(function() {
        $('#ship-to-store .state-menu .store-menu .head').not($(this)).each(function() {
          if (($(this).find(' #closeButton')).is(':visible')) {
            $(this).next().slideToggle();
            $(this).find('a').toggle();
          }
        });
        var storeValue = $(this).parent().attr('id');
        $(this).next().slideToggle({
          complete: function() {
            $('html, body').animate({
              scrollTop: $("#" + storeValue).offset().top - 77
            });
          }
        });
        $('#ship-to-store .state-menu .store-menu').find('#' + storeValue).find('.head').find('a').toggle();
        return false;
      }).next().hide();
    });
    if ($(window).width() < 767) {
      showStoreHours();
    }
    showStoreMap();
  }

  function showStoreHours() {
    $('#ship-to-store .store-menu .store-details .details5 .store-hours').hide();
    $('#ship-to-store .store-menu .store-details .details5 p').click(function() {
      $(this).next().slideToggle();
      //alert($(this).css("background-position-y"));
      if (!($(this).hasClass('hideHours'))) {
        $(this).addClass('hideHours');
        $(this).removeClass('showHours');
      } else {
        $(this).removeClass('hideHours');
        $(this).addClass('showHours');
      }
    });
  }
  /** ***** app.checkout2 public object ******* */
  app.checkout2 = {
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
      /**
       * PayPal checkout
       * 
       */
      $('.pt_checkout2').on('click', "#PaymentMethod_PayPal", function() {
        $('button[name="dwfrm_billing_save"]').trigger('click');
      });
      /**
       * handle SR signin/signout events
       * Warning::: Do not change the jquery object sr_$.jQ
       * sr_$.jQ is used by Shop Runner for jquery reference
       */
      if (typeof sr_$ === "undefined") {
        setTimeout(this.initSREvents, 3000);
      } else {
        this.initSREvents();
      }
      /**
       * added scroll for shipping page mini cart
       */
      if ($('.minicart-checkout')[0]) {
        if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
          $('.minicart-checkout').tinyscrollbar();
        } else {
          $('.minicart-checkout').find('.scrollbar').css('display', 'none');
          $('.minicart-checkout').find('.viewport').css({
            'width': '100%',
            'height': 'auto',
            'max-height': 'none'
          });
          $('.minicart-checkout').find('.overview').css('position', 'relative');
        }
      }
      if ($('.default-addr-shipping')[0] && $("input[name$='_addressFields_address1']").val() == '') {
        $('.default-addr-shipping').change();
      }
      removeSecondaryBackground();
      //Return from paypal
      var url;
      if (typeof returnFromPaypal != 'undefined') {
        if (returnFromPaypal == 'success') {
          //Load Shipping form
          url = app.util.appendParamsToUrl(app.urls.shippingForm, {
            format: "ajax"
          });
          jQuery.ajax({
            type: "GET",
            url: url,
            success: function(responseData) {
              var temp = "<div></div>";
              if ($(temp).html(responseData).find('div#checkoutShippingSection').length) {
                $cache.shippingInner.html(responseData);
                $($('form#dwfrm_singleshipping_shippingAddress')).validate(app.validator.settings);
                app.checkout2.initShipping();
              }
              //Load Billing
              url = app.util.appendParamsToUrl(app.urls.billingStart, {
                format: "ajax"
              });
              jQuery.ajax({
                type: "GET",
                url: url,
                success: function(responseData) {
                  var temp = "<div></div>";
                  if ($(temp).html(responseData).find('div#checkoutBillingSection').length) {
                    $cache.billingInner.html(responseData);
                    $($('form#dwfrm_billing')).validate(app.validator.settings);
                    app.checkout2.initBilling();
                  }
                }
              });
            }
          });
          setTimeout(function() {
            $cache.current = $cache.reviewHeader;
            $cache.currentCheckoutStep.text('3');
            $('#secondary #right-nav-wrapper').removeAttr('class').addClass('three');
          }, 1000);
        } else if (returnFromPaypal == 'cancel') {
          //Load Shipping form
          url = app.util.appendParamsToUrl(app.urls.shippingForm, {
            format: "ajax"
          });
          jQuery.ajax({
            type: "GET",
            url: url,
            success: function(responseData) {
              //Address verification popup
              var temp = "<div></div>";
              if ($(temp).html(responseData).find('div#checkoutShippingSection').length) {
                $cache.shippingInner.html(responseData);
                customizeSelectNow();
                $($('form#dwfrm_singleshipping_shippingAddress')).validate(app.validator.settings);
                app.checkout2.initShipping();
                app.checkout2.initBilling();
                $cache.current = $cache.billingHeader;
                $cache.currentCheckoutStep.text('2');
              }
            }
          });
        }
        delete returnFromPaypal;
      }
    },
    initShipping: function() { // SHIPPING
      if (app.enableShipToStore) {
        shipToStoreHideShow();
        showStores();
      }
      initializeShippingDom();
      initializeCache();
      //initializeShippingEvents();
      addressLoad();
      shippingLoad();
      app.util.limitCharacters();
      // showStoreInfo();
    },
    initMultiShipping: function() { // MULTI SHIP
      initializeMultiShippingDom();
      initializeCache();
      //initializeMultiShippingEvents();
      multishippingLoad();
    },
    initBilling: function() { // BILLING
      initializeBillingDom();
      initializeCache();
      //initializeBillingEvents();
      addressLoad();
      billingLoad();
      saveBilling();
      applyCustomizeSelectFlag = true;
    },
    initSREvents: function() {
      if (typeof sr_$ === "undefined") return;
      sr_$.jQ('body').on('sr_sign_out', function(e) {
        $("input[name$='_shippingMethodID']").removeAttr('disabled', 'disabled');
        $('#shipping-method-ANY_2DAY_SR').attr('disabled', 'disabled');
        if ($('#shipping-method-ANY_STD')[0]) {
          $('#shipping-method-ANY_STD').attr("checked", "checked").trigger('click');
        } else {
          $("input[name$='_shippingMethodID']").not('#shipping-method-ANY_2DAY_SR').first().attr("checked", "checked").trigger('click');
        }
      });
      sr_$.jQ('body').on('sr_sign_in', '#sr_global', function(e) {
        $("input[name$='_shippingMethodID']").attr('disabled', 'disabled');
        $('#shipping-method-ANY_2DAY_SR').removeAttr('disabled', 'disabled').attr("checked", "checked").trigger('click');
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.quickview
 */
(function(app, $) {
  var $cache = {};
  /**
   * @function
   * @description Binds a 'click'-event to the quick view button
   */
  function bindQvButton() {
    $cache.qvButton.off('click').on("click", function(e) {
      e.preventDefault();
      var _this = this;
      // fetching product ID for quick view click event
      var prodID = $(this).closest("div.product-tile").data('itemid');
      var url = $($(this).closest("div.product-tile")).find('.product-image a.thumb-link').attr('href');
      if (url.indexOf('#') != -1) {
        var url = url.substr(0, url.indexOf('#'));
      }
      app.quickView.show({
        url: url,
        source: "quickview",
        item: _this
      });
      var pageName = $('.pageName:visible').attr('data-pagename');
      if (pageName) {
        if (pageName === 'Denim Guide') {
          app.analytics.init(app.$cache[55].event_cat, app.$cache[55].event_action, prodID);
        } else app.analytics.init(app.$cache[9].event_cat, app.$cache[9].event_action, prodID);
      } else app.analytics.init(app.$cache[9].event_cat, app.$cache[9].event_action, prodID);
      return false;
    });
  }

  function quickViewAction() {
    var quickViewButtons = $('.trigger-quickview');
    quickViewButtons.each(function() {
      $(this).off('click').on("click", function(e) {
        e.preventDefault();
        var _this = this;
        // fetching product ID for quick view click event
        var prodID = $(this).closest("div.product-tile").data('itemid');
        var url = $($(this).closest("div.product-tile")).find('.product-image li:visible a').attr('href');
        if (url.indexOf('#') != -1) {
          var url = url.substr(0, url.indexOf('#'));
        }
        app.quickView.show({
          url: url,
          source: "quickview",
          item: _this
        });
        var pageName = $('.pageName:visible').attr('data-pagename');
        if (pageName) {
          if (pageName === 'Denim Guide') {
            app.analytics.init(app.$cache[55].event_cat, app.$cache[55].event_action, prodID);
          } else app.analytics.init(app.$cache[9].event_cat, app.$cache[9].event_action, prodID);
        } else app.analytics.init(app.$cache[9].event_cat, app.$cache[9].event_action, prodID);
        return false;
      });
    });
  }
  var testpp = false;
  /** ***** app.quickView public object ******* */
  app.quickView = {
    /**
     * @function
     * @description
     */
    initializeButton: function(container, target) {
      var isPLPV2 = $('#wrapper').hasClass('plp-redesign') && ($('.product-tile.default-products').length > 0);
      if (isPLPV2) {
        quickViewAction();
      }
      var kindleBrowserSilk = /\bSilk\b/,
        kindleModel = /\bKFTT\b/,
        isKindle = false;
      if (kindleBrowserSilk.test(navigator.userAgent) && kindleModel.test(navigator.userAgent)) {
        isKindle = true;
      }
      if (isKindle) {
        $(window).resize(function() {
          if ($('body').width() >= 533 && $('body').width() < 801) {
            $('#QuickViewDialog').dialog("close");
          }
        });
      }
    },
    init: function() {
      if (app.quickView.exists()) {
        return $cache.quickView;
      }
      $cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
      return $cache.quickView;
    },
    // show quick view dialog and send request to the server to get the
    // product
    // options.source - source of the dialog i.e. search/cart
    // options.url - product url
    /**
     * @function
     * @description
     */
    show: function(options) {
      var _this = this;
      var button = options.item;
      options.target = app.quickView.init();
      options.callback = function() {
        app.product.init();
        DieselUS.ui.togglePopup.init();
        var dialogHeight = 561;
        if ($(window).height() < 561) {
          dialogHeight = $(window).height() - 20;
        }
        app.dialog.create({
          target: $cache.quickView,
          options: {
            height: dialogHeight,
            width: 'auto',
            dialogClass: 'quickview iPadPosFixed',
            title: 'Product Quickview',
            position: 'center',
            open: function() {
              app.progress.hide();
            }
          }
        });
        var dheight = 465;
        if ($("#wrapper").width() >= 768 && $("#wrapper").width() < 1024) {
          dheight = 500;
        }
        $cache.quickView.dialog({
          width: 700,
          height: dheight,
          open: function(event, ui) {
            DieselUS.ui.equalHeight.init($('div#pdpMain'));
            var height = $('#QuickViewDialog').height() - 99;
            $('#QuickViewDialog').dialog('option', 'position', 'center');
            if (!(app.device.is('mobile'))) {
              $('.scrollbar').css('height', 0);
              var wrapper = $('.product-slides-wrapper');
              var sliders = $(wrapper).find('.my-bag-product-list li').length,
                winWidth = $(window).width();
              var element = $(wrapper).find('.my-bag-product-list'),
                setting = {
                  minSlides: 1,
                  maxSlides: 1,
                  prevSelector: $(wrapper).find(".slider-prev1"),
                  nextSelector: $(wrapper).find(".slider-next1"),
                  onSlideAfter: function($slideElement, oldIndex, newIndex) {
                    $(wrapper).find(".slide-number1 .remaining").html(newIndex + 1);
                  },
                  onSliderLoad: function() {
                    $(".product-slides-list li").css({
                      visibility: "visible"
                    });
                  }
                },
                sliderss = element.css({
                  height: "auto"
                }).bxSlider(setting);
              $(wrapper).find(".slide-number1 .remaining").html("1");
              $(wrapper).find(".slide-number1 .total").html(sliderss.getSlideCount());
              // window.sblSliderss.push(sliderss); 
              if (!$(button).closest('.shopbylook').length) {
                $('#qv_scrolbar .product-col-1 .primary-image').first().load(function() {
                  if ($('#QuickViewDialog').height() < $('#qv_scrolbar').find('.overview:first').height()) {
                    $('#qv_scrolbar').tinyscrollbar();
                    $('.scrollbar .top-arrow').show();
                    $('.scrollbar .bottom-arrow').show();
                    testpp = true;
                    $('#qv_scrolbar').find('.scrollbar:first').css('height', 0);
                    setTimeout(function() {
                      $('#qv_scrolbar').find('.scrollbar:first').css('height', height);
                      $('#qv_scrolbar').find('.thumb:first').css('height', $('#qv_scrolbar').find('.thumb:first').height() - 99);
                      _this.quickViewScrollControls();
                    }, 600);
                  }
                });
              } else {
                if ($('#QuickViewDialog').height() < $('#qv_scrolbar').find('.overview:first').height()) {
                  $('#qv_scrolbar').tinyscrollbar();
                  $('.scrollbar .top-arrow').show();
                  $('.scrollbar .bottom-arrow').show();
                  $('#qv_scrolbar').find('.scrollbar:first').css('height', 0);
                  setTimeout(function() {
                    $('#qv_scrolbar').find('.scrollbar:first').css('height', height);
                    $('#qv_scrolbar').find('.thumb:first').css('height', $('#qv_scrolbar').find('.thumb:first').height() - 99);
                    _this.quickViewScrollControls();
                  }, 600);
                }
              }
              $('body').addClass('noscroll');
              //                            $('#QuickViewDialog').jScrollPane({
              //                            	autoReinitialise:true
              //                            });
            }
            DieselUS.ui.gridsForPDPCustomDropDown.init();
          }
        });
        //ent tracking for add to wishlist
        $cache.quickView.dialog('open');
        //iGoDigital call
        if ($("#igdRTA-quickview").length > 0) {
          rtaProductSKU = $("#igdRTA-quickview").data("rtaproductsku");
          rtaSpecial = $("#igdRTA-quickview").data("rtaSpecial");
          rtaTags = $("#igdRTA-quickview").data("rtaTags");
          //reset variable set on plp
          rtaCategory = "";
          rtaSearch = "";
          //reset variable set on cart
          rtaCart = "";
          rtaCartSku = "";
          rtaCartAmounts = "";
          rtaCartQuantities = "";
          callRTA();
        }
        // renders horizontal/vertical carousels for product slots
        $('.swatch-wrapper').each(function(key, val) {
          app.util.setCarousel({
            sliderid: $(val).find('.swatches.Color.color-slides'),
            sliderwrapper: $(val),
            auto: false,
            isFixed: true,
            width: $(val).find('.swatch-Slider').width(),
            nav: false,
            multiple: 3
          });
          window.pdpCenterColorSlide($(this));
        });
        DieselUS.ui.swatchColorSelected.init();
      };
      app.product.get(options);
      return $cache.quickView;
    },
    quickViewScrollControls: function() {
      var thumbRatio = $('#qv_scrolbar .scrollbar').height() - $('#qv_scrolbar .scrollbar .thumb').height();
      var contentRatio = $('#QuickViewDialog #pdpMain').height() - $('#QuickViewDialog').height();
      var scrollRatio = contentRatio / thumbRatio;
      $('#qv_scrolbar .top-arrow').on('click', function(e) {
        e.preventDefault();
        var topThumb = parseInt($('#qv_scrolbar .scrollbar .thumb').css('top').substr(0, $('#qv_scrolbar .scrollbar .thumb').css('top').indexOf('px')));
        if (topThumb > 0) {
          topThumb = topThumb - 10;
          $('#qv_scrolbar .scrollbar .thumb').css('top', (topThumb) + "px");
          $('#qv_scrolbar .overview').css('top', (-1 * topThumb * scrollRatio) + "px");
        }
      });
      $('#qv_scrolbar .bottom-arrow').on('click', function(e) {
        e.preventDefault();
        var topThumb = parseInt($('#qv_scrolbar .scrollbar .thumb').css('top').substr(0, $('#qv_scrolbar .scrollbar .thumb').css('top').indexOf('px')));
        if (topThumb < thumbRatio) {
          topThumb = topThumb + 10;
          $('#qv_scrolbar .scrollbar .thumb').css('top', (topThumb) + "px");
          $('#qv_scrolbar .overview').css('top', (-1 * topThumb * scrollRatio) + "px");
        }
      });
    },
    // close the quick view dialog
    close: function() {
      if ($cache.quickView) {
        $cache.quickView.dialog('close').empty();
        $('body').removeClass('noscroll');
        return $cache.quickView;
      }
    },
    exists: function() {
      return $cache.quickView && ($cache.quickView.length > 0);
    },
    isActive: function() {
      return $cache.quickView && ($cache.quickView.length > 0) && ($cache.quickView.children.length > 0);
    },
    container: $cache.quickView
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.util
 */
(function(app, $) {
  // sub namespace app.util.* contains utility functions
  app.util = {
    /**
     * @function
     * @description trims a prefix from a given string, this can be used to
     *              trim a certain prefix from DOM element IDs for further
     *              processing on the ID
     */
    trimPrefix: function(str, prefix) {
      return str.substring(prefix.length);
    },
    /**
     * @function
     * @description
     */
    wishcountCallback: function(data) {
      //console.log(data);
      $('.elements').find('.favourite_count_red').html(data.wishlistcount);
      if (data.wishlisttooltip != "") {
        $('.wishlist-tooltip').find('.msg').html(data.wishlisttooltip);
        $('.wishlist-tooltip').show();
        //hiding tooltip after 8ms
        setTimeout(function() {
          $('.wishlist-tooltip').hide();
          var url = app.newUrls.tooltipMsgclear + '?format=ajax';
          $.ajax({
            url: url,
            error: function(xhr, status, errorThrown) {
              //alert('error')
            },
            success: function(data) {
              //alert('hiiii-i')
            }
          });
        }, 8000);
      }
      if (data.wishlistcount > 0) {
        $('.elements').find('.favourite_icon').removeClass('favourite_icon_black').addClass('favourite_icon_red');
      } else {
        $('.elements').find('.favourite_icon').removeClass('favourite_icon_red').addClass('favourite_icon_black');
      }
    },
    setDialogify: function(e) {
      e.preventDefault();
      var dlg;
      if ($('#dialog-container').find('.error').length && $($('#dialog-container').find('.error')).is(':visible')) {
        return;
      }
      var actionSource = $(this),
        dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
        dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {});
      dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";
      dlgOptions.dialogClass = dlgOptions.dialogClass || "basic-dialog-theming" + " " + "send-friend-privacy"
        //Email notification 
      if ($(e.target).parents('.product-notify-link').length > 0) {
        var that = this;
        var isProductSet = $(this).parents('.product-set-item').length > 0 ? true : false;
        var resetSelectionUrl = $($(e.target).parents('#product-content-detail').find('.customSelectBox li.selected a')[0]).attr('href');
        var resetUrlArr = resetSelectionUrl.split('?');
        var queryParameterArr = resetUrlArr[1].split('&');
        var queryWithColorOnly = [];
        for (var i = 0; i < queryParameterArr.length; i++) {
          if (queryParameterArr[i].indexOf('size') > 0 || queryParameterArr[i].indexOf('length') > 0) {
            continue;
          }
          queryWithColorOnly.push(queryParameterArr[i]);
        }
        var newResetSelectionUrl;
        if (queryWithColorOnly.length > 0) newResetSelectionUrl = resetUrlArr[0] + '?' + queryWithColorOnly.join('&');
        if (isProductSet) {
          var psItem = $(this).closest(".product-set-item");
          // set quantity to value from form
          var qty = psItem.find("form").find("input[name='Quantity']").first().val();
          var quantity = isNaN(qty) ? "1" : qty;
          queryWithColorOnly.push('Quantity=' + quantity);
          newResetSelectionUrl = app.urls.getSetItem + "?" + queryWithColorOnly.join('&');
        }
        // For mobile
        if ($(window).width() < 768) {
          $('.product-notify-body').show();
          app.validator.init();
          $('.product-notify-body form#notifyEmailForm').on('submit', function(e) {
            e.preventDefault();
            if ($(this).find('div.form-row .error').is(':visible')) {
              return false;
            }
            var url = $(this).attr("action");
            $.ajax({
              url: url,
              data: $(this).serialize(),
              type: "POST"
            }).done(function(response) {
              if (response.success == true) {
                $('.notifyme-content .success-message').show();
                setTimeout(function() {
                  app.product.invokeVariationSelection(newResetSelectionUrl, isProductSet, that);
                }, 3000);
              }
            });
          });
          $('.product-notify-body form#notifyEmailForm button[name="dwfrm_emailnotification_cancel"]').on('click', function(e) {
            e.preventDefault();
            app.product.invokeVariationSelection(newResetSelectionUrl, isProductSet, that);
          });
          return;
        }
        // For desktop and tablet
        dlg = app.dialog.create({
          target: dlgAction.target,
          options: dlgOptions
        });
        dlg.empty().html($('.product-notify-body').html());
        dlg.find('form').attr('id', 'notifyEmailFormDialog');
        dlg.dialog({
          beforeClose: function(event, ui) {
            app.product.invokeVariationSelection(newResetSelectionUrl, isProductSet, that);
          }
        });
        dlg.dialog("open"); // open after load to ensure dialog is
        app.validator.init();
        $('.dialog-notify-email form#notifyEmailFormDialog').on('submit', function(e) {
          e.preventDefault();
          if ($(this).find('div.form-row .error').is(':visible')) {
            return false;
          }
          var url = $(this).attr("action");
          $.ajax({
            url: url,
            data: $(this).serialize(),
            type: "POST"
          }).done(function(response) {
            if (response.success == true) {
              $('#dialog-container .notifyme-content .success-message').show();
              setTimeout(function() {
                dlg.dialog("close");
              }, 3000);
            }
          });
        });
        $('.dialog-notify-email form#notifyEmailFormDialog button[name="dwfrm_emailnotification_cancel"]').on('click', function(e) {
          e.preventDefault();
          dlg.dialog("close");
        });
        return;
      }
      //Readmore on denim guide
      if ($(e.target).hasClass('dg-readmore')) {
        dlg = app.dialog.create({
          target: dlgAction.target,
          options: dlgOptions
        });
        var fullDescription = $(e.target).parents('.description').find('.product-description-full').html();
        dlg.empty().html(fullDescription);
        dlg.dialog("open"); // open after load to ensure dialog is
        if ($(window).width() < 768) {
          $('#wrapper').hide();
          dlg.on("dialogclose", function(event, ui) {
            $('#wrapper').show();
          });
        }
        return;
      }
      var url = dlgAction.url || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) || $(actionSource).attr("href");
      // url from data or  url from form actionif isForm=true or url from href
      if (!url) {
        return;
      }
      var form = jQuery(this).parents('form');
      var method = form.attr("method") || "POST";
      // if this is a content link, update url from Page-Show to
      // Page-Include
      if ($(this).hasClass("attributecontentlink")) {
        var uri = app.util.getUri(url);
        url = app.urls.pageInclude + uri.query;
      }
      if (method && method.toUpperCase() == "POST") {
        var postData = form.serialize() + "&" + jQuery(this).attr("name") + "=submit";
      } else {
        if (url.indexOf('?') == -1) {
          url += '?';
        } else {
          url += '&';
        }
        url += form.serialize();
        url = app.util.appendParamToURL(url, jQuery(this).attr('name'), "submit");
      }
      dlg = app.dialog.create({
        target: dlgAction.target,
        options: dlgOptions
      });
      if ($(window).width() < 767 && $(actionSource).hasClass('privacy-policy-dialog')) {
        window.open($(actionSource).attr("href"));
        return true;
      }
      app.ajax.load({
        url: $(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
        target: dlg,
        callback: function() {
          dlg.dialog("open"); // open after load to ensure dialog is
          // centered
          app.validator.init(); // re-init validator
          $('input, select').on('blur', function(e) {
            var $parent = $(this).parent();
            if ($parent.find('.error-message')) {
              $parent.find('.error-message').remove();
            }
            if ($(this).parents('#PasswordResetForm').length > 0) {
              var forgetPassForm = $(this).parents('#PasswordResetForm');
              if (forgetPassForm.find('.error-form')) {
                forgetPassForm.find('.error-form').remove();
              }
            }
          });
        },
        data: !$(actionSource).attr("href") ? postData : null
      });
    },
    /**
     * @function
     * @description Appends a character to the left side of a numeric string
     *              (normally ' ')
     * @param {String}
     *            str the original string
     * @param {String}
     *            padChar the character which will be appended to the
     *            original string
     * @param {Number}
     *            len the length of the end string
     */
    padLeft: function(str, padChar, len) {
      var digs = len || 10;
      var s = str.toString();
      var dif = digs - s.length;
      while (dif > 0) {
        s = padChar + s;
        dif--;
      }
      return s;
    },
    /**
     * @function
     * @description appends the parameter with the given name and value to
     *              the given url and returns the changed url
     * @param {String}
     *            url the url to which the parameter will be added
     * @param {String}
     *            name the name of the parameter
     * @param {String}
     *            value the value of the parameter
     */
    appendParamToURL: function(url, name, value) {
      var c = "?";
      if (url.indexOf(c) !== -1) {
        c = "&";
      }
      return url + c + name + "=" + encodeURIComponent(value);
    },
    /**
     * @function
     * @description
     * @param {String}
     * @param {String}
     */
    elementInViewport: function(el, offsetToTop) {
      var top = el.offsetTop,
        left = el.offsetLeft,
        width = el.offsetWidth,
        height = el.offsetHeight;
      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }
      if (typeof(offsetToTop) != 'undefined') {
        top -= offsetToTop;
      }
      if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        return (top < (document.documentElement.scrollTop + document.documentElement.clientHeight));
      } else {
        return (top < (window.pageYOffset + window.innerHeight));
      }
    },
    /**
     * @function
     * @description appends the parameters to the given url and returns the
     *              changed url
     * @param {String}
     *            url the url to which the parameters will be added
     * @param {String}
     *            params a JSON string with the parameters
     */
    appendParamsToUrl: function(url, params) {
      var uri = app.util.getUri(url),
        includeHash = arguments.length < 3 ? false : arguments[2];
      var qsParams = $.extend(uri.queryParams, params);
      var result = uri.path + "?" + $.param(qsParams);
      if (includeHash) {
        result += uri.hash;
      }
      if (result.indexOf("http") < 0 && result.charAt(0) !== "/") {
        result = "/" + result;
      }
      return result;
    },
    /**
     * @function
     * @description removes the parameter with the given name from the given
     *              url and returns the changed url
     * @param {String}
     *            url the url from which the parameter will be removed
     * @param {String}
     *            name the name of the parameter
     */
    removeParamFromURL: function(url, parameter) {
      var urlparts = url.split('?');
      if (urlparts.length >= 2) {
        var urlBase = urlparts.shift();
        var queryString = urlparts.join("?");
        var prefix = encodeURIComponent(parameter) + '=';
        var pars = queryString.split(/[&;]/g);
        var i = pars.length;
        while (0 > i--) {
          if (pars[i].lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
          }
        }
        url = urlBase + '?' + pars.join('&');
      }
      return url;
    },
    /**
     * @function
     * @description Returns the static url for a specific relative path
     * @param {String}
     *            path the relative path
     */
    staticUrl: function(path) {
      if (!path || $.trim(path).length === 0) {
        return app.urls.staticPath;
      }
      return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path);
    },
    /**
     * @function
     * @description Appends the parameter 'format=ajax' to a given path
     * @param {String}
     *            path the relative path
     */
    ajaxUrl: function(path) {
      return app.util.appendParamToURL(path, "format", "ajax");
    },
    /**
     * @function
     * @description
     * @param {String}
     *            url
     */
    toAbsoluteUrl: function(url) {
      if (url.indexOf("http") !== 0 && url.charAt(0) !== "/") {
        url = "/" + url;
      }
      return url;
    },
    /**
     * @function
     * @description Loads css dynamically from given urls
     * @param {Array}
     *            urls Array of urls from which css will be dynamically
     *            loaded.
     */
    loadDynamicCss: function(urls) {
      var i, len = urls.length;
      for (i = 0; i < len; i++) {
        app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
      }
    },
    /**
     * @function
     * @description Loads css file dynamically from given url
     * @param {String}
     *            url The url from which css file will be dynamically
     *            loaded.
     */
    loadCssFile: function(url) {
      return $("<link/>").appendTo($("head")).attr({
        type: "text/css",
        rel: "stylesheet"
      }).attr("href", url); // for i.e. <9, href must be added after
      // link has been appended to head
    },
    // array to keep track of the dynamically loaded CSS files
    loadedCssFiles: [],
    /**
     * @function
     * @description Removes all css files which were dynamically loaded
     */
    clearDynamicCss: function() {
      var i = app.util.loadedCssFiles.length;
      while (0 > i--) {
        $(app.util.loadedCssFiles[i]).remove();
      }
      app.util.loadedCssFiles = [];
    },
    /**
     * @function
     * @description Extracts all parameters from a given query string into
     *              an object
     * @param {String}
     *            qs The query string from which the parameters will be
     *            extracted
     */
    getQueryStringParams: function(qs) {
      if (!qs || qs.length === 0) {
        return {};
      }
      var params = {},
        unescapedQS = unescape(qs);
      // Use the String::replace method to iterate over each
      // name-value pair in the string.
      unescapedQS.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
        params[$1] = $3;
      });
      return params;
    },
    /**
     * @function
     * @description Returns an URI-Object from a given element with the
     *              following properties:
     *              protocol
     *              host
     *              hostname
     *              port
     *              path
     *              query
     *              queryParams
     *              hash
     *              url
     *              urlWithQuery
     * @param {Object}
     *            o The HTML-Element
     */
    getUri: function(o) {
      var a;
      if (o.tagName && $(o).attr("href")) {
        a = o;
      } else if (typeof o === "string") {
        a = document.createElement("a");
        a.href = o;
      } else {
        return null;
      }
      return {
        protocol: a.protocol, // http:
        host: a.host, // www.myexample.com
        hostname: a.hostname, // www.myexample.com'
        port: a.port, // :80
        path: a.pathname, // /sub1/sub2
        query: a.search, // ?param1=val1&param2=val2
        queryParams: a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
        hash: a.hash, // #OU812,5150
        url: a.protocol + "//" + a.host + a.pathname,
        urlWithQuery: a.protocol + "//" + a.host + a.port + a.pathname + a.search
      };
    },
    /**
     * @function
     * @description Appends a form-element with given arguments to a
     *              body-element and submits it
     * @param {Object}
     *            args The arguments which will be attached to the
     *            form-element:
     *            url
     *            fields - an Object containing the query-string parameters
     */
    postForm: function(args) {
      var form = $("<form>").attr({
        action: args.url,
        method: "post"
      }).appendTo("body");
      var p;
      for (p in args.fields) {
        $("<input>").attr({
          name: p,
          value: args.fields[p]
        }).appendTo(form);
      }
      form.submit();
    },
    /**
     * @function
     * @description Returns a JSON-Structure of a specific key-value pair
     *              from a given resource bundle
     * @param {String}
     *            key The key in a given Resource bundle
     * @param {String}
     *            bundleName The resource bundle name
     * @param {Object}
     *            A callback function to be called
     */
    getMessage: function(key, bundleName, callback) {
      if (!callback || !key || key.length === 0) {
        return;
      }
      var params = {
        key: key
      };
      if (bundleName && bundleName.length === 0) {
        params.bn = bundleName;
      }
      var url = app.util.appendParamsToUrl(app.urls.appResources, params);
      $.getJSON(url, callback);
    },
    /**
     * @function
     * @description Updates the states options to a given country
     * @param {String}
     *            countrySelect The selected country
     */
    updateStateOptions: function(countrySelect) {
      var country = $(countrySelect);
      if (country.length === 0 || !app.countries[country.val()]) {
        return;
      }
      var form = country.closest("form");
      var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
      if (stateField.length === 0) {
        return;
      }
      form = country.closest("form");
      var c = app.countries[country.val()],
        arrHtml = [],
        labelSpan = form.find("label[for='" + stateField[0].id + "'] span").not(".required-indicator");
      // set the label text
      labelSpan.html(c.label + "*");
      var s;
      for (s in c.regions) {
        arrHtml.push('<option value="' + s + '">' + c.regions[s] + '</option>');
      }
      // clone the empty option item and add to stateSelect
      var o1 = stateField.children().first().clone();
      stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
      stateField[0].selectedIndex = 0;
    },
    /**
     * @function
     * @description Updates the number of the remaining character based on
     *              the character limit in a text area
     */
    limitCharacters: function() {
      $('form').find('textarea[data-character-limit]').each(function() {
        var characterLimit = $(this).data("character-limit");
        var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG, '<span class="char-remain-count">' + characterLimit + '</span>', '<span class="char-allowed-count">' + characterLimit + '</span>');
        var charCountContainer = $(this).next('div.char-count');
        if (charCountContainer.length === 0) {
          charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
        }
        charCountContainer.html(charCountHtml);
        // trigger the keydown event so that any
        // existing character data is calculated
        $(this).change();
      });
    },
    /**
     * @function
     * @description Binds the onclick-event to a delete button on a given
     *              container, which opens a confirmation box with a given
     *              message
     * @param {String}
     *            container The name of element to which the function will
     *            be bind
     * @param {String}
     *            message The message the will be shown upon a click
     */
    setDeleteConfirmation: function(container, message) {
      $(container).on("click", ".delete", function(e) {
        return confirm(message);
      });
    },
    /**
     * @function
     * @description Scrolls a browser window to a given x point
     * @param {String}
     *            The x coordinate
     */
    scrollBrowser: function(xLocation) {
      $('html, body').animate({
        scrollTop: xLocation
      }, 500);
    },
    lazyLoad: function(e) {
      /*   jQuery("img.lazy").lazyload({
          effect: "fadeIn",
          effectTime: '200'
      }).removeClass("lazy").addClass("loaded"); */
    },
    setCarousel: function(option) {
      if (option.minli) {
        var numSlides = $(option.sliderid).find('>li').length;
        if (numSlides < option.minli) return;
      }
      $(option.sliderwrapper).carousel({
        slider: $(option.sliderid),
        circular: option.circular ? option.circular : false,
        nav: option.nav ? option.nav : false,
        multiple: option.multiple ? option.multiple : 0,
        isZoom: option.isZoom ? option.isZoom : false,
        isFixed: option.isFixed ? option.isFixed : false,
        height: option.height ? option.height : false,
        auto: option.auto ? option.auto : false,
        goTo: option.goTo ? option.goTo : 0,
        width: option.width ? option.width : null,
        callback: option.callback ? option.callback : function() {},
        sliderWidth: option.sliderWidth || 0,
        resize: option.resize || false
      });
    },
    setSlotLink: function(e) {
      $(".slottemplate").on("click", ".overlay-content", function(e) {
        e.stopImmediatePropagation();
        if ($(this).data('url')) {
          window.location = $(this).data('url');
        } else {
          return false;
        }
      });
    },
    /**
     * @function
     * @description show element
     * @param {object}
     *
     */
    show: function(el) {
      return $(el).hasClass('hide') ? $(el).removeClass('hide').addClass('show') : $(el).addClass('show');
    },
    /**
     * @function
     * @description show element
     * @param {object}
     *
     */
    hide: function(el) {
      return $(el).hasClass('show') ? $(el).removeClass('show').addClass('hide') : $(el).addClass('hide');
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.page
 */
(function(app, $) {
  app.page = {
    title: "",
    type: "",
    setContext: function(o) {
      $.extend(app.page, o);
    },
    params: app.util.getQueryStringParams(window.location.search.substr(1)),
    redirect: function(newURL) {
      var t = setTimeout("window.location.href='" + newURL + "'", 0);
    },
    refresh: function() {
      var t = setTimeout("window.location.assign(window.location.href);", 500);
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.registry
 */
(function(app, $) {
  var $cache = {};
  /**
   * @function
   * @description Loads address details to a given address and fills the
   *              "Pre-Event-Shipping" address form
   * @param {String}
   *            addressID The ID of the address to which data will be loaded
   */
  function populateBeforeAddressForm(addressID) {
    // load address details
    var url = app.urls.giftRegAdd + addressID;
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        if (!data || !data.address) {
          window.alert(app.resources.REG_ADDR_ERROR);
          return false;
        }
        // fill the form
        $cache.addressBeforeFields.filter("[name$='_addressid']").val(data.address.ID);
        $cache.addressBeforeFields.filter("[name$='_firstname']").val(data.address.firstName);
        $cache.addressBeforeFields.filter("[name$='_lastname']").val(data.address.lastName);
        $cache.addressBeforeFields.filter("[name$='_address1']").val(data.address.address1);
        $cache.addressBeforeFields.filter("[name$='_address2']").val(data.address.address2);
        $cache.addressBeforeFields.filter("[name$='_city']").val(data.address.city);
        $cache.addressBeforeFields.filter("[name$='_zip']").val(data.address.postalCode);
        $cache.addressBeforeFields.filter("[name$='_state']").val(data.address.stateCode);
        $cache.addressBeforeFields.filter("[name$='_country']").val(data.address.countryCode);
        $cache.addressBeforeFields.filter("[name$='_phone']").val(data.address.phone);
        $cache.registryForm.validate().form();
      }
    });
  }
  /**
   * @function
   * @description Loads address details to a given address and fills the
   *              "Post-Event-Shipping" address form
   * @param {String}
   *            addressID The ID of the address to which data will be loaded
   */
  function populateAfterAddressForm(addressID) {
    // load address details
    var url = app.urls.giftRegAdd + addressID;
    app.ajax.getJson({
      url: url,
      callback: function(data) {
        if (!data || !data.address) {
          window.alert(app.resources.REG_ADDR_ERROR);
          return false;
        }
        // fill the form
        $cache.addressAfterFields.filter("[name$='_addressid']").val(data.address.ID);
        $cache.addressAfterFields.filter("[name$='_firstname']").val(data.address.firstName);
        $cache.addressAfterFields.filter("[name$='_lastname']").val(data.address.lastName);
        $cache.addressAfterFields.filter("[name$='_address1']").val(data.address.address1);
        $cache.addressAfterFields.filter("[name$='_address2']").val(data.address.address2);
        $cache.addressAfterFields.filter("[name$='_city']").val(data.address.city);
        $cache.addressAfterFields.filter("[name$='_zip']").val(data.address.postalCode);
        $cache.addressAfterFields.filter("[name$='_state']").val(data.address.stateCode);
        $cache.addressAfterFields.filter("[name$='_country']").val(data.address.countryCode);
        $cache.addressAfterFields.filter("[name$='_phone']").val(data.address.phone);
        $cache.registryForm.validate().form();
      }
    });
  }
  /**
   * @function
   * @description copy pre-event address fields to post-event address fields
   */
  function copyBeforeAddress() {
    $cache.addressBeforeFields.each(function() {
      var fieldName = $(this).attr("name");
      var afterField = $cache.addressAfterFields.filter("[name='" + fieldName.replace("Before", "After") + "']");
      afterField.val($(this).val());
    });
  }
  /**
   * @function
   * @description Disables or enables the post-event address fields depending
   *              on a given boolean
   * @param {Boolean}
   *            disabled True to disable; False to enables
   */
  function setAfterAddressDisabled(disabled) {
    if (disabled) {
      $cache.addressAfterFields.attr("disabled", "disabled");
    } else {
      $cache.addressAfterFields.removeAttr("disabled");
    }
  }
  /**
   * @private
   * @function
   * @description Cache initialization of the gift registration
   */
  function initializeCache() {
    $cache = {
      registryForm: $("form[name$='_giftregistry']"),
      registryItemsTable: $("form[name$='_giftregistry_items']"),
      registryTable: $("#registry-results")
    };
    $cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
    $cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
    $cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
  }
  /**
   * @private
   * @function
   * @description DOM-Object initialization of the gift registration
   */
  function initializeDom() {
    $cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
    $cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));
    if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
      // fill the address after fields
      copyBeforeAddress();
      setAfterAddressDisabled(true);
    }
  }
  /**
   * @private
   * @function
   * @description Initializes events for the gift registration
   */
  function initializeEvents() {
    if ($(window).width() > 767) {
      app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
    }
    app.util.setDeleteConfirmation("table.item-list", String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_GIFTREGISTRY));
    $cache.copyAddress.on("click", function() {
      if (this.checked) {
        // fill the address after fields
        copyBeforeAddress();
      }
    });
    $cache.registryForm.on("change", "select[name$='_addressBeforeList']", function(e) {
      var addressID = $(this).val();
      if (addressID.length === 0) {
        return;
      }
      populateBeforeAddressForm(addressID);
      if ($cache.copyAddress[0].checked) {
        copyBeforeAddress();
      }
    }).on("change", "select[name$='_addressAfterList']", function(e) {
      var addressID = $(this).val();
      if (addressID.length === 0) {
        return;
      }
      populateAfterAddressForm(addressID);
    }).on("change", $cache.addressBeforeFields.filter(":not([name$='_country'])"), function(e) {
      if (!$cache.copyAddress[0].checked) {
        return;
      }
      copyBeforeAddress();
    });
    $("form").on("change", "select[name$='_country']", function(e) {
      app.util.updateStateOptions(this);
      if ($cache.copyAddress.length > 0 && $cache.copyAddress[0].checked && this.id.indexOf("_addressBefore") > 0) {
        copyBeforeAddress();
        $cache.addressAfterFields.filter("[name$='_country']").trigger("change");
      }
    });
    $cache.registryItemsTable.on("click", ".item-details a", function(e) {
      e.preventDefault();
      var productListID = $('input[name=productListID]').val();
      app.quickView.show({
        url: e.target.href,
        source: "giftregistry",
        productlistid: productListID
      });
    });
  }
  /** ***** app.registry public object ******* */
  app.registry = {
    init: function() {
      initializeCache();
      initializeDom();
      initializeEvents();
      app.product.initAddToCart();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.progress
 */
(function(app, $) {
  var loader;
  app.progress = {
    /**
     * @function
     * @description Shows an AJAX-loader on top of a given container
     * @param {Element}
     *            container The Element on top of which the AJAX-Loader will
     *            be shown
     */
    show: function(container) {
      var target = (!container || $(container).length === 0 || $(container).height() === 0) ? $("body") : $(container);
      loader = loader || $(".loader");
      if (loader.length === 0) {
        loader = $("<div/>").addClass("loader").append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));
      }
      return loader.appendTo(target).show();
    },
    /**
     * @function
     * @description Hides an AJAX-loader
     */
    hide: function() {
      if (loader) {
        loader.remove();
        loader = null;
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.components
 */
(function(app, dw, $) {
  /**
   * @function
   * @description capture recommendation of each product when it becomes visible in the carousel
   * @param TBD
   * @param {Element} li The visible product element in the carousel
   * @param index TBD
   * @param state TBD
   */
  function captureCarouselRecommendations(c, li, index, state) {
    if (!dw) {
      return;
    }
    $(li).find(".capture-product-id").each(function() {
      dw.ac.capture({
        id: $(this).text(),
        type: dw.ac.EV_PRD_RECOMMENDATION
      });
    });
  }
  /** ***** app.components public object ******* */
  app.components = {
    carouselSettings: {
      scroll: 1,
      itemFallbackDimension: '100%',
      itemVisibleInCallback: app.captureCarouselRecommendations
    },
    init: function() {
      // renders horizontal/vertical carousels for product slots
      /*app.util.setCarousel({
          sliderid: '#horizontal-carousel',
          sliderwrapper: '.last-visited',
      });*/
    }
  };
}(window.app = window.app || {}, window.dw, jQuery));
/**
 * @class app.cart
 */
(function(app, $) {
  var $cache = {},
    dlg;
  /**
   * @private
   * @function
   * @description Updates the cart with new data
   * @param {Object} postdata An Object representing the the new or uptodate data
   * @param {Object} A callback function to be called
   */
  function updateCart(postdata, callback) {
    var url = app.util.ajaxUrl(app.urls.addProduct);
    $.post(url, postdata, callback || app.cart.refresh);
  }
  /**
   * @private
   * @function
   * @description Cache initialization of the cart page
   */
  function initializeCache() {
    $cache = {
      cartTable: $(".tabling-data"),
      itemsForm: $(".cart-items-form"),
      addCoupon: $("#add-coupon"),
      couponCode: $("form input[name$='_couponCode']"),
      main: $("#main"),
      primary: $("#primary"),
      secondary: $("#secondary.cart"),
      cartForm: $('.cart-items-form')
    };
  }
  /**
   * @private
   * @function
   * @description hanlder for click event on checkout button
   * 
   */
  function goToCheckout(that) {
    var form = $(that).parents('form'),
      action = form.attr('action'),
      url = app.util.appendParamsToUrl(form.attr('action'), {
        format: 'ajax'
      });
    if ($(that).hasClass('user-loggedin-cart')) {
      return;
    }
    app.progress.show();
    $.post(url, {
      dwfrm_cart_checkoutCart: $(that).attr('name')
    }, function(data) {
      var temp = $('<div></div>');
      temp.html(data);
      if (temp.find('.account-login').length > 0) {
        if ($('.checkout-login-dialog').length === 0) {
          dlg = app.dialog.create({
            target: '#login-dailog',
            options: {
              height: 'auto',
              dialogClass: 'checkout-login-dialog',
              title: 'Login and checkout',
              open: function() {
                app.progress.hide();
                $('body').addClass('noscroll');
                if ($("body").width() > 639 && $("body").width() < 1023) {
                  $('#login-dailog').dialog("option", "width", 'auto');
                }
              },
              close: function() {
                $(this).dialog("close");
              }
            }
          });
        }
        $('.system-error').remove();
        var hostname = window.location.host,
          protocal = window.location.protocol + '//';
        dlg.dialog("open");
        $('#login-dailog').html(data);
        ga('send', 'pageview', protocal + hostname + '/Checkout:Options');
        app.validator.init();
      } else {
        form.submit();
      }
    });
  }
  /**
   * @private
   * @function
   * @description handle user login from cart
   * 
   */
  function loginFromCart(elem) {
    var form = $(elem),
      that = form.find('button[type="submit"]'),
      url = app.util.appendParamsToUrl(form.attr('action'), {
        format: 'ajax'
      }),
      data = form.serialize();
    data = data + "&" + $(that).attr('name') + '=' + $(that).attr('value');
    /* false = error 
     * if form validation fails, it returns
     */
    if (!globalValidationResult) {
      return;
    }
    $.post(url, data, function(data, statusText, xhr) {
      var temp = $('<div></div>');
      temp.html(data);
      if (temp.find('.account-login').length > 0) {
        $('#login-dailog').html(data);
        app.validator.init();
      } else if (temp.find('#PasswordResetForm').length > 0) {
        $('#login-dailog').html(data);
        app.validator.init();
      } else if (temp.find('.reset-password').length > 0) {
        $('#login-dailog').html(data);
      } else if (temp.find('.redirect-url').length > 0) {
        dlg.dialog('close');
        window.location.href = temp.find('.redirect-url').attr('href');
      } else {
        window.location.href = app.urls.cart;
      }
      delete temp;
    });
  }

  function updateQuantity(that) {
    if ($(that).hasClass('disabled')) return;
    /* To disable the another click while one click underway */
    $(that).addClass('disabled');
    var className = $(that).attr('class'),
      quantityInput = $(that).parent().find('input:text'),
      val = parseInt(quantityInput.val()),
      url, index, tempArr, context = {},
      orderSummary = $('.order-totals-table'),
      fieldName = quantityInput.attr("name"),
      pname = $(that).data('product-name'),
      minCart = $('.header-mini-cart'),
      orderLimit = $('.cart-wrapper').data('purchase-limit');
    if (className.indexOf('increase-quantity') >= 0) {
      app.analytics.init(app.$cache[59].event_cat, app.$cache[59].event_action, pname);
      quantity = val + 1;
    } else {
      app.analytics.init(app.$cache[60].event_cat, app.$cache[60].event_action, pname);
      quantity = val - 1;
    }
    tempArr = fieldName.split('_');
    index = tempArr[tempArr.length - 2];
    index = index.substr(1);
    var updateSec = $(that).parents('.product-details-template'),
      prodAvailability = $(that).closest('.tbody-data').find('.product-availability-list');
    url = $cache.cartForm.attr('action') + '&' + fieldName + '=' + quantity;
    $.ajax({
      type: 'GET',
      url: url,
      data: {
        dwfrm_cart_updateCart: 'dwfrm_cart_updateCart',
        format: 'ajax',
        index: index
      }
    }).done(function(response) {
      var temp = $('<div class="secondary-product-detail col-md-6 equal-width-five-sec"></div>'),
        content;
      temp.html(response);
      /* Check if system generates errors */
      if (temp.find('#TotalProductsExceedError').length === 0 && $('.system-error').length > 0) {
        $('.system-error').remove();
      }
      content = $(temp).find('.product-details-template');
      if (content.length > 0) {
        /* Fix for DQP1975 */
        if (content.attr('data-enableCheckout').indexOf('true') === 0) {
          $('#js-continue-checkout').removeAttr("disabled");
          $('.diesel-payrunner').removeClass('inactive');
        } else if (content.attr('data-enableCheckout').indexOf('false') === 0) {
          $('#js-continue-checkout').attr("disabled", "disabled");
          $('.diesel-payrunner').addClass('inactive');
        }
        if ($(temp).find('.mini-cart-details .mini-cart-bonuspro-item').length === 0) {
          $('#primary .bonusproduct-item').remove();
        }
        if (temp.find('#bpEligibleOrder').length > 0) {
          $('.diesel-sr-form').show();
          $('.diesel-sr-link').hide();
        } else {
          $('.diesel-sr-form').hide();
          $('.diesel-sr-link').show();
        }
        updateSec.html(content.html());
        orderSummary.html($(temp).find('.order-totals-table').html());
        //sr_$.renderDivs();---shoprunner code
        prodAvailability.html(temp.find('ul.product-availability-list').html());
        minCart.html(temp.find('.mini-cart-details').html());
        app.minicart.initializeCatche();
      }
      delete temp;
    }).fail(function() {}).always(function() {
      $(that).removeClass('disabled');
      var inputVal = parseInt($("input[name='" + fieldName + "']").val()),
        qInc = updateSec.find('.increase-quantity'),
        qDec = updateSec.find('.decrease-quantity');
      if (inputVal === 1) {
        qDec.addClass('disabled');
      } else if (inputVal === parseInt(orderLimit.lineItem)) {
        qInc.addClass('disabled');
      } else {
        qDec.removeClass('disabled');
        qInc.removeClass('disabled');
      }
    });
  }
  /**
   * @private
   * @function
   * @description Binds events to the cart page (edit item's details, bonus
   *              item's actions, coupon code entry )
   */
  function initializeEvents() {
    $cache.primary.on("click", ".tabling-data .edit-details a", function(e) {
      if ($(window).width() > 767) {
        e.preventDefault();
        app.quickView.show({
          url: e.target.href,
          source: "cart"
        });
      }
    }).on("click", ".bonus-item-actions a", function(e) {
      e.preventDefault();
      app.bonusProductsView.show(this.href);
    });
    // override enter key for coupon code entry
    $cache.couponCode.on("keydown", function(e) {
      if (e.which === 13 && $(this).val().length === 0) {
        return false;
      }
    });
    /* event bining with update cart button */
    $cache.secondary.on("click", "#js-update-cart", function(e) {
      e.preventDefault();
      $("#update-cart").trigger("click");
    });
    /* Continue shopping event binding */
    $cache.primary.on("click", "#js-continue-shoping", function(e) {
      $("#cart-continue-shoping").trigger("click");
    });
    dlg = app.dialog.create({
      target: '#login-dailog',
      options: {
        height: 'auto',
        dialogClass: 'checkout-login-dialog',
        title: 'Login and checkout',
        open: function() {
          app.progress.hide();
          $('body').addClass('noscroll');
        }
      }
    });
    $('body').on('click', '#password-reset', function(e) {
      if (dlg.dialog) {
        dlg.dialog('close');
      }
    });
    /* Event binding for checkout button*/
    if ($(window).width() > 767) {
      $cache.secondary.on('click', '#js-continue-checkout', function(e) {
        e.preventDefault();
        goToCheckout(this);
      });
    }
    /* Events on login dialog */
    $('body').on('submit', '#login-dailog #dwfrm_login, #login-dailog #PasswordResetForm', function(e) {
      e.preventDefault();
      loginFromCart(this);
    });
    /* events for increase or decrease product quantity */
    $cache.primary.on('click', '.decrease-quantity, .increase-quantity', function(e) {
      e.preventDefault();
      updateQuantity(this);
    });
  }
  /** ***** app.cart public object ******* */
  app.cart = {
    /**
     * @function
     * @description Adds new item to the cart
     * @param {Object} postdata An Object representing the the new or uptodate data
     * @param {Object} A callback function to be called
     */
    add: function(postdata, callback) {
      updateCart(postdata, callback);
    },
    /**
     * @function
     * @description Hook for removing item from the cart
     *
     */
    remove: function() {
      return;
    },
    /**
     * @function
     * @description Updates the cart with new data
     * @param {Object} postdata An Object representing the the new or uptodate data
     * @param {Object}  A callback function to be called
     */
    update: function(postdata, callback) {
      updateCart(postdata, callback);
    },
    /**
     * @function
     * @description Refreshes the cart without posting
     */
    refresh: function() {
      // refresh without posting
      app.page.refresh();
    },
    /**
     * @function
     * @description Refreshes the cart without posting
     */
    refreshPage: function() {
      // refresh without posting
      if ($('.pt_cart .cart-wrapper').length) {
        var t = setTimeout("window.location.assign(app.urls.cartShow);", 500);
      } else if ($('.wishlist-list').length) {
        var t = window.location.reload();
      } else {
        app.page.refresh();
      }
    },
    /**
     * @function
     * @description Refreshes the cart without posting
     */
    refreshCart: function() {
      // refresh without posting
      var t = setTimeout("window.location.assign(window.location.href);", 500);
    },
    /**
     * @function
     * @description Initializes the functionality on the cart
     */
    init: function() {
      // edit shopping cart line item
      initializeCache();
      initializeEvents();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.bonus
 */
(function(app, $) {
  var $cache = {},
    dlg;
  var errorMsgBlock = $('.pt_bonus .cart-header .error-form');

  function countAddedBonuProduct() {
    return $('.product-tile-content .product-checkbox input[type=checkbox]:checked').length;
  }

  function initializeEvents() {
    $('.sr-bonus-checkout').click(function() {
      sr_$.payrunner.Controller.initializePayRunner('cart', true);
    });
    // Disable bonus product if bonus product limit cross on page load
    if (countAddedBonuProduct() > app.bonusProductsCount) {
      errorMsgBlock.show();
    }
    $('.product-tile-content .product-checkbox input[type=checkbox]').click(function() {
      if ($(this).is(":checked")) {
        if (countAddedBonuProduct() <= app.bonusProductsCount) {
          $(this).closest('.product-tile-content').find('.product-add-to-cart button[name="dwfrm_bonus_Add"]').trigger('click');
        } else {
          $(this).prop('checked', false);
          $(this).closest('.product-tile-content').find('.product-add-to-cart button[name="dwfrm_bonus_Add"]').trigger('click');
        }
      } else {
        if (countAddedBonuProduct() < app.bonusProductsCount) {
          $('.product-tile-content .product-checkbox input[type=checkbox]:unchecked').removeAttr('disabled');
          errorMsgBlock.hide();
        }
        $(this).closest('.product-tile-content').find('.product-add-to-cart button[name="dwfrm_bonus_Remove"]').trigger('click');
      }
    });
    $('.product-add-to-cart button').on('click', function(e) {
      e.preventDefault();
      var form = $(this).closest("form");
      var data = form.serialize();
      var buttonName = $(this).attr('name');
      var url = '';
      if (buttonName == 'dwfrm_bonus_Add') {
        url = app.util.ajaxUrl(app.urls.addBonusProduct);
      } else if (buttonName == 'dwfrm_bonus_Remove') {
        url = app.util.ajaxUrl(app.urls.removeBonusProduct);
      }
      app.progress.show();
      $.post(url, data, function(response) {
        try {
          if ((typeof responshe == 'object') && (response.failure == true)) {
            if (typeof response.error !== 'undefined' && response.error == 'invalid-order-total') {
              errorMsgBlock.html('<p>' + response.message + '</p>');
              $('.bonus-header-msg').hide();
              $('.product-tile-content .product-checkbox input[type=checkbox]').prop('checked', false);
            } else if (typeof response.error !== 'undefined' && response.error == 'exceed-counter') {
              var errorMsg = 'Sorry, you have selected more than ' + app.bonusProductsCount + ' product(s). You are allowed only ' + app.bonusProductsCount + ' bonus product(s).';
              errorMsgBlock.html('<p>' + errorMsg + '</p>');
            }
            errorMsgBlock.show();
            app.util.scrollBrowser(0);
          } else {
            //response is html
            updateSummary();
            app.minicart.show(response);
            sr_refreshSRDOM();
          }
        } catch (e) {
          //response is html
          updateSummary();
          app.minicart.show(response);
          sr_refreshSRDOM();
        }
      }).always(function() {
        app.progress.hide();
      });
    });
    if ($('.minicart-checkout')[0]) {
      if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
        $('.minicart-checkout').tinyscrollbar();
      } else {
        $('.minicart-checkout').find('.scrollbar').css('display', 'none');
        $('.minicart-checkout').find('.viewport').css({
          'width': '100%',
          'height': 'auto',
          'max-height': 'none'
        });
        $('.minicart-checkout').find('.overview').css('position', 'relative');
      }
    }
    $(window).on("resize", function() {
      hideShowCartSummary();
    });
    hideShowCartSummary();
  }

  function hideShowCartSummary() {
    if ($(window).width() < 768) {
      $('#secondary').off('click', '.section-header').on('click', '.section-header', function() {
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else $(this).addClass('open');
        $('#secondary .checkout-mini-cart, #secondary .mini-summary-wrapper').slideToggle(400, function() {
          if ($('#secondary .checkout-mini-cart').is(':visible')) {
            //
            if ($('#secondary .minicart-checkout').find('.mini-cart-product').length > 2) {
              $('#secondary .minicart-checkout').tinyscrollbar();
            } else {
              $('#secondary .minicart-checkout').find('.scrollbar').css('display', 'none');
              $('#secondary .minicart-checkout').find('.viewport').css({
                'width': '100%',
                'height': 'auto',
                'max-height': 'none'
              });
              $('#secondary .minicart-checkout').find('.overview').css('position', 'relative');
            }
          }
        });
      });
    } else {
      $('#secondary').off('click', '.section-header');
      $('#secondary .checkout-mini-cart, #secondary .mini-summary-wrapper').show();
    }
  }
  /**
   * @function
   * @description updates the order summary based on a possibly recalculated
   *              basket after a shipping promotion has been applied
   */
  function updateSummary() {
    var url = app.urls.summaryRefreshURL;
    var summary = $("#secondary #right-nav-wrapper");
    // indicate progress
    // load the updated summary area
    summary.load(url, function() {
      // hide edit shipping method link
      summary.fadeIn("fast");
      summary.find('.checkout-mini-cart .minishipment .header a').hide();
      summary.find('.order-totals-table .order-shipping .label a').hide();
      if ($('.minicart-checkout')[0]) {
        if ($('.minicart-checkout').find('.mini-cart-product').length > 2) {
          $('.minicart-checkout').tinyscrollbar();
        } else {
          $('.minicart-checkout').find('.scrollbar').css('display', 'none');
          $('.minicart-checkout').find('.viewport').css({
            'width': '100%',
            'height': 'auto',
            'max-height': 'none'
          });
          $('.minicart-checkout').find('.overview').css('position', 'relative');
        }
      }
      app.tooltips.init();
      var shipDiscount = $('.approaching-discounts .order-shipping-discount');
      var $discountValue = $('#secondary #right-nav-wrapper .checkout-order-totals .order-shipping-discount.discount .value');
      if ($discountValue.length > 0) {
        shipDiscount.find('.discount-amount').html($discountValue.html());
        shipDiscount.css('display', 'block');
      } else {
        shipDiscount.css('display', 'none');
      }
      sr_refreshSRDOM();
    });
  }
  /** ***** app.bonus public object ******* */
  app.bonus = {
    /**
     * @function
     * @description Initializes the functionality on the cart
     */
    init: function() {
      // edit shopping cart line item
      initializeEvents();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.account
 */
(function(app, $) {
  var $cache = {};
  /**
   * @private
   * @function
   * @description Initializes the events on the address form (apply, cancel, delete)
   * @param {Element} form The form which will be initialized
   */
  function initializeAddressForm(form) {
    form = $("#edit-address-form");
    form.find("input[name='format']").remove();
    app.tooltips.init();
    // $("<input/>").attr({type:"hidden", name:"format",
    // value:"ajax"}).appendTo(form);
    form.on("click", ".apply-button", function(e) {
      e.preventDefault();
      var addressId = form.find("input[name$='_addressid']");
      addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));
      if (!form.valid()) {
        return false;
      }
      var url = app.util.appendParamsToUrl(form.attr('action'), {
        format: "ajax"
      });
      var applyName = form.find('.apply-button').attr('name');
      var options = {
        url: url,
        data: form.serialize() + "&" + applyName + '=x',
        type: "POST"
      };
      $.ajax(options).done(function(data) {
        if (typeof(data) !== 'string') {
          if (data.success) {
            app.dialog.close();
            app.page.refresh();
          } else {
            return false;
          }
        } else {
          $('#dialog-container').html(data);
          app.account.init();
          app.tooltips.init();
        }
      });
    }).on("click", ".cancel-button, .close-button", function(e) {
      e.preventDefault();
      app.dialog.close();
    }).on("click", ".delete-button", function(e) {
      e.preventDefault();
      if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
        var url = app.util.appendParamsToUrl(app.urls.deleteAddress, {
          AddressID: form.find("#addressid").val(),
          format: "ajax"
        });
        $.ajax({
          url: url,
          method: "POST",
          dataType: "json"
        }).done(function(data) {
          if (data.status.toLowerCase() === "ok") {
            app.dialog.close();
            app.page.refresh();
          } else if (data.message.length > 0) {
            return false;
          } else {
            app.dialog.close();
            app.page.refresh();
          }
        });
      }
    });
    $cache.countrySelect = form.find("select[id$='_country']");
    $cache.countrySelect.on("change", function() {
      app.util.updateStateOptions(this);
    });
    app.validator.init();
  }
  /**
   * @private
   * @function
   * @description Toggles the list of Orders
   */
  function toggleFullOrder() {
    $('.order-items').find('li.hidden:first').prev('li').append('<a class="toggle">View All</a>').children('.toggle').click(function() {
      $(this).parent().siblings('li.hidden').show();
      $(this).remove();
    });
  }
  /**
   * @private
   * @function
   * @description Binds the events on the address form (edit, create, delete)
   */
  function initAddressEvents() {
    var addresses = $("#addresses"),
      editAddress = $('#edit-address-form');
    if (editAddress.length > 0) {
      editAddress.on('click', 'button.delete', function(e) {
        if (!confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) return false;
      });
    }
    if (addresses.length === 0) {
      return;
    }
    addresses.on("click", "a.address-edit, a.address-create", function(e) {
      // e.preventDefault();
      var options = {
        open: initializeAddressForm
      };
    }).on("click", ".delete", function(e) {
      e.preventDefault();
      if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
        $.ajax({
          url: app.util.appendParamsToUrl($(this).attr("href"), {
            format: "ajax"
          }),
          dataType: "json"
        }).done(function(data) {
          if (data.status.toLowerCase() === "ok") {
            app.page.redirect(app.urls.addressesList);
          } else if (data.message.length > 0) {} else {
            app.page.refresh();
          }
        });
      }
    });
  }
  /**
   * @private
   * @function
   * @description Binds the events of the payment methods list (delete card)
   */
  function initPaymentEvents() {
    var paymentList = $(".payment-list");
    if (paymentList.length === 0) {
      return;
    }
    app.util.setDeleteConfirmation(paymentList, String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD));
    $("form[name='payment-remove']").on("submit", function(e) {
      e.preventDefault();
      // override form submission in order to prevent refresh issues
      var button = $(this).find("button.delete");
      $("<input/>").attr({
        type: "hidden",
        name: button.attr("name"),
        value: button.attr("value") || "delete card"
      }).appendTo($(this));
      var data = $(this).serialize();
      $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: data
      }).done(function(response) {
        app.page.redirect(app.urls.paymentsList);
      });
    });
  }
  /**
   *
   * @private
   * @function
   * @description accordion
   */
  function policyAccordion() {
    var allSliders = $('.pt_customer-service .primary-content .slide-content').hide();
    $('.pt_customer-service .primary-content .slide-container > h2').click(function(e) {
      var currentPanel = null,
        nextPanel = $(this).next();
      if ($(nextPanel).css('display') === 'block') currentPanel = 'active';
      allSliders.slideUp();
      if (currentPanel !== 'active') {
        $(this).next().slideDown(function() {
          var that = this;
          $('html,body').animate({
            scrollTop: $(that).offset().top - 50
          }, 'fast');
        });
      }
      return false;
    });
  }
  /**
   * @description setting up datepicker and privacy policy
   *
   */
  function initializeMyAccountEvents() {
    $('.privacy-policy-container').toggleCheckBoxes({
      className: 'click-here'
    });
    $(document).trigger("equalaccount");
    $('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: '0',
      yearRange: "1900:-13",
      defaultDate: "-13y",
      showButtonPanel: true
    });
    $('.ui-datepicker').on('click', 'a.ui-state-default', function() {
      var $el = $('.datepicker');
      if ($.trim($el.val()) !== '' && $el.hasClass('error')) $el.removeClass('error');
    });
    var currentDate;
    $('.datepicker').on('click', function() {
      currentDate = parseInt($.trim($('.ui-state-active').html()));
    });
    $('body').on('click', '.ui-priority-primary', function() {
      var days = $(this).parents('.ui-datepicker').find('.ui-state-default');
      $.each(days, function() {
        if (currentDate === parseInt($.trim($(this).html()))) {
          $(this).click();
        }
      });
    });
    policyAccordion();
  }

  function initChangeOrderStatus() {
    var urlLink;
    $('.getOrderId .form-row').on('click', function() {
      if ($('.getOrderId').find('.error-message')[0]) {
        $('.getOrderId').find('.error-message').css("display", "none");
      }
    })
    $('.set-status .changeButton').on('click', function() {
      if ($(this).attr('data-action') == 'customerpickup') {
        urlLink = app.util.appendParamToURL(app.urls.customerPickup, "orderNo", $(this).attr('data-orderNo'));
      } else if ($(this).attr('data-action') == 'customerdidnotshowup') {
        urlLink = app.util.appendParamToURL(app.urls.customerNotShowUp, "orderNo", $(this).attr('data-orderNo'));
      } else {
        //console.log($(this).attr('data-orderNo'));
        urlLink = app.util.appendParamToURL(app.urls.orderReceivedInStore, "orderNo", $(this).attr('data-orderNo'));
        //	console.log(urlLink);
      }
      $('.confirmDialog').dialog("open");
      $('.set-status .confirmDialog').dialog({
        width: "380px",
        dialogClass: "basic-dialog-theming sts-order-overlay",
        modal: true
      });
      $('.confirmDialog .confirmMsg').html("Do you really want to change the status from <b>" + $(this).attr('data-statusFrom') + "</b> to <b>" + $(this).attr('data-statusTo') + "</b>?");
    });
    $('.confirmDialog .confirmed').on('click', function() {
      window.location.href = urlLink;
    });
    $('.confirmDialog .cancelled').on('click', function() {
      $(' .confirmDialog').dialog("close");
    });
  }
  /**
   * @private
   * @function
   * @description Binds the events of the order, address and payment pages
   */
  function initializeEvents() {
    toggleFullOrder();
    initAddressEvents();
    initPaymentEvents();
    initializeMyAccountEvents();
    initChangeOrderStatus();
  }
  /** ***** app.account public object ******* */
  app.account = {
    /**
     * @function
     * @description Binds the events of the order, address and payment pages
     */
    init: function() {
      initializeEvents();
      app.giftcert.init();
      //set login banner
      if ($('.login-header-banner-slot').length > 0) {
        $('.login-header-banner').empty().html($('.login-header-banner-slot').html());
      }
      //highlight send us message link
      if ($(".pt_customer-service .contact-us #RegistrationForm").length > 0) $(".pt_customer-service .sendmessage").parent("li").addClass("selected");
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.wishlist
 */
(function(app, $) {
  var $cache = {};
  /**
   * @private
   * @function
   * @description Binds the send to friend and address changed events to the  wishlist page
   */
  function initializeEvents() {
    if ($(window).width() > 767) {
      app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
    }
    $cache.editAddress.on('change', function() {
      window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());
    });
    $cache.wishlistTable.on("click", ".item-details a.edit-items", function(e) {
      e.preventDefault();
      if (!app.device.is('mobile') && !app.device.is('kindle')) {
        app.quickView.show({
          url: e.target.href,
          source: "wishlist"
        });
      } else {
        window.location.href = $(this).attr('href');
      }
    });
    $("#wishlist-search h2").on('click', function() {
      $(this).siblings(".find-others-wishlist").toggle();
    });
    //disable form submit if add to cart button disable
    $('.wishlist-list .item-dashboard form[name="dwfrm_product_addtocart"]').on('submit', function(e) {
      if ($(this).find('button[type="submit"]').attr('disabled')) {
        return false;
      }
    });
    $('.wishlist-list .item-dashboard input[name="Quantity"]').on('keyup', function() {
      var qt = $(this).val();
      var re = /^[1-9]\d*$/;
      if (!re.test(qt)) {
        if (!isNaN(parseInt(qt))) {
          var posVal = Math.abs(parseInt(qt));
          $(this).val(posVal);
        }
      }
    });
  }
  /** ***** app.wishlist public object ******* */
  app.wishlist = {
    /**
     * @function
     * @description Binds events to the wishlist page
     */
    init: function() {
      $cache.editAddress = $('#editAddress');
      $cache.wishlistTable = $('.pt_wish-list .item-list');
      app.product.initAddToCart();
      initializeEvents();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.minicart
 */
(function(app, $) {
  // sub name space app.minicart.* provides functionality around the mini cart
  var $cache = {},
    initialized = false;
  var timer = {
    id: null,
    clear: function() {
      if (timer.id) {
        window.clearTimeout(timer.id);
        delete timer.id;
      }
    },
    start: function(duration) {
      timer.id = setTimeout(app.minicart.close, duration);
    }
  };
  /** ***** app.minicart public object ******* */
  app.minicart = {
    url: "", // during page loading, the Demandware URL is stored here
    initializeCatche: function() {
      $cache.minicartArrow = $(".mini-cart-arrow");
      // $cache.minicart = $(".header-mini-cart");//old-one
      $cache.minicart = $(".mini-cart-holder");
      $cache.mcContent = $cache.minicart.find(".mini-bag-content");
      $cache.mcClose = $cache.minicart.find(".mini-cart-close");
      $cache.mcProductList = $cache.minicart.find(".mini-cart-products");
      $cache.mcTotal = $cache.minicart.find(".mini-cart-total");
      $cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");
      $cache.mainheader = $('#header');
    },
    /**
     * @function
     * @description Cache initializations and event binding to the mimcart
     */
    init: function() {
      /*this.initializeCatche();
        	
            var collapsed = $cache.mcProductList.children().not(":first")
                .addClass("collapsed");

            // bind hover event to the cart total link at the top right corner

            var onMinicarContent = false;
            if (!scriptIsmobile()) {

                $cache.minicart.on("mouseenter",  function () {
                    if (!$cache.mcContent.is(":visible")) {
                        app.minicart.slide();
                        //$cache.minicartArrow.show();
                    }
                }).on("mouseenter", ".mini-bag-content", function (e) {
                    onMinicarContent = true;
                    //$cache.minicartArrow.show();
                    timer.clear();
                }).on("mouseleave", "..mini-bag-content", function (e) {
                    //$cache.minicartArrow.hide();
                    onMinicarContent = false;
                   // DieselUS.ui.responsiveHeader.reset($(this).attr('data-target'));
                    timer.clear();
                    timer.start(30);
                }).on("mouseleave",    $cache.minicart, function () {
                    setTimeout(function () {
                        if ($cache.mcContent.is(":visible") && !onMinicarContent) {
                            //$cache.minicartArrow.hide();
                            //app.minicart.close();
                           // DieselUS.ui.responsiveHeader.reset($(this).attr('data-target'));
                        }
                    }, 100);

                });
            } else {
            	if(!$cache.mainheader.hasClass('new-header') || $(window).width() < 700){
	                $cache.minicart.off('touchstart').on("touchstart", ".mini-cart-total", function (e) {
	                    if (!$cache.mcContent.is(":visible")) {
	                        e.preventDefault();
	                        app.minicart.slide();
	                        $cache.minicartArrow.show();
	                        DieselUS.ui.responsiveHeader.reset($('#mobile-mini-cart').attr('data-target'));
	                        //hide search icon
	                        if(!$('#header-search-content').is(":visible")){
	                        	$('#header-search-icon .header-search-arrow').hide();
	                        }
	                    }
	                    
	                    $cache.mainheader.find('.rgt-content').hide();
	                });
            	}
            }
            initialized = true;*/
    },
    /**
     * @function
     * @description Shows the given content in the mini cart
     * @param {String} A HTML string with the content which will be shown
     */
    show: function(html) {
      this.initializeCatche();
      $cache.minicart.empty().html(html).promise().done(function() {
        //your callback logic / code here
        app.util.scrollBrowser(0);
        setTimeout(function() {
          $('.minicart-tool-tip').show('slow', function() {
            setTimeout(function() {
              $('.minicart-tool-tip').hide();
            }, 3000);
          });
        }, 1000);
        //app.minicart.init();
        if ($('body').width() > 1024) {
          if (!$('.mini-bag-content').is(":visible")) {
            $('.top-nav-holder .mini-cart-holder').trigger('mouseenter');
          }
          setTimeout(function() {
            if ($('.mini-bag-content:hover').length == 0) {
              $('.top-nav-holder .mini-cart-holder').trigger('mouseleave');
            }
          }, 2000);
        } else if (app.device.is('tablet')) {
          if (!$('.mini-bag-content').is(":visible")) {
            $('.top-nav-holder .mini-cart-holder .bag-holder').trigger('click');
          }
        } else {
          var bagCount = $('.bag-count').find('a').length ? $('.bag-count a').html() : $('.bag-count').html();
          if (bagCount > 0) {
            $('.mini-cart-holder').find('.header-mini-cart').removeClass('empty-black-bag').addClass('empty-red-bag');
          } else {
            $('.mini-cart-holder').find('.header-mini-cart').addClass('empty-black-bag').removeClass('empty-red-bag');
          }
        }
      });
      //app.bonusProductsView.loadBonusOption();
    },
    /**
     * @function
     * @description Slides down and show the contents of the mini cart
     */
    slide: function() {
      timer.clear();
      // show the item
      $cache.mcContent.slideDown('slow');
      setTimeout(function() {
        var element = "";
        DieselUS.ui.scrollbar.init();
      }, 500);
      // after a time out automatically close it
      timer.start(6000);
    },
    /**
     * @function
     * @description Closes the mini cart with given delay
     * @param {Number} delay The delay in milliseconds
     */
    close: function(delay) {
      timer.clear();
      $cache.mcContent ? $cache.mcContent.slideUp() : "";
    },
    /**
     * @function
     * @description Hook which can be replaced by individual pages/page types (e.g. cart)
     */
    suppressSlideDown: function() {
      return false;
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.dialog
 */
(function(app, $) {
  // private
  var $cache = {};
  // end private
  /** ***** app.dialog public object ******* */
  app.dialog = {
    /**
     * @function
     * @description Appends a dialog to a given container (target)
     * @param {Object} params params.target can be an id selector or an jquery object
     */
    create: function(params) {
      // options.target can be an id selector or an jquery object
      var target = $(params.target || "#dialog-container");
      // if no element found, create one
      if (target.length === 0) {
        if (target.selector && target.selector.charAt(0) === "#") {
          id = target.selector.substr(1);
        }
        target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
      }
      // create the dialog
      $cache.container = target;
      $cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
      return $cache.container;
    },
    /**
     * @function
     * @description Opens a dialog using the given url (params.url)
     * @param {Object} params.url should contain the url
     */
    open: function(params) {
      if (!params.url || params.url.length === 0) {
        return;
      }
      $cache.container = app.dialog.create(params);
      params.url = app.util.appendParamsToUrl(params.url, {
        format: "ajax"
      });
      // finally load the dialog
      app.ajax.load({
        target: $cache.container,
        url: params.url,
        callback: function() {
          if ($cache.container.dialog("isOpen")) {
            return;
          }
          $cache.container.dialog("open");
        }
      });
      /* Blocking scroll when dialog is opened */
      $('body').addClass('noscroll');
    },
    /**
     * @function
     * @description Closes the dialog and triggers the "close" event for the dialog
     */
    close: function() {
      if (!$cache.container) {
        return;
      }
      $cache.container.dialog("close");
      /* removing style added while dialog is opened */
      $('body').removeClass('noscroll');
    },
    /**
     * @function
     * @description Triggers the "apply" event for the dialog
     */
    triggerApply: function() {
      $(this).trigger("dialogApplied");
    },
    /**
     * @function
     * @description Attaches the given callback function upon dialog "apply" event
     */
    onApply: function(callback) {
      if (callback) {
        $(this).bind("dialogApplied", callback);
      }
    },
    /**
     * @function
     * @description Triggers the "delete" event for the dialog
     */
    triggerDelete: function() {
      $(this).trigger("dialogDeleted");
    },
    /**
     * @function
     * @description Attaches the given callback function upon dialog "delete" event
     * @param {String} The callback function to be called
     */
    onDelete: function(callback) {
      if (callback) {
        $(this).bind("dialogDeleted", callback);
      }
    },
    /**
     * @function
     * @description Submits the dialog form with the given action
     * @param {String} The action which will be triggered upon form submit
     */
    submit: function(action) {
      var form = $cache.container.find("form:first");
      // set the action
      $("<input/>").attr({
        name: action,
        type: "hidden"
      }).appendTo(form);
      // serialize the form and get the post url
      var post = form.serialize();
      var url = form.attr("action");
      // post the data and replace current content with response content
      $.ajax({
        type: "POST",
        url: url,
        data: post,
        dataType: "html",
        success: function(data) {
          $cache.container.html(data);
        },
        failure: function(data) {
          window.alert(app.resources.SERVER_ERROR);
        }
      });
    },
    settings: {
      autoOpen: false,
      resizable: false,
      bgiframe: true,
      modal: true,
      height: 'auto',
      width: '800',
      buttons: {},
      title: '',
      position: 'center',
      overlay: {
        opacity: 0.5,
        background: "black"
      },
      /**
       * @function
       * @description The close event
       */
      close: function(event, ui) {
        $(this).dialog("destroy");
        /* removing style added while dialog is opened */
        $('body').removeClass('noscroll');
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.validator
 */
(function(app, $) {
  var naPhone = /^\(?([2-9][0-8][0-9])\)?[\-\. ]?([2-9][0-9]{2})[\-\. ]?([0-9]{4})(\s*x[0-9]+)?$/,
    regex = {
      phone: {
        us: naPhone,
        ca: naPhone
      },
      postal: {
        us: /^\d{5}(-\d{4})?$/,
        ca: /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
        gb: /^GIR?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])?[0-9][ABD-HJLNP-UW-Z]{2}$/
      },
      email: /^([a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/
    },
    settings = {
      // global form validator settings
      errorClass: 'error',
      errorElement: 'span',
      errorPlacement: function(error, element) {
        //alert(1)
        //to do condition check for validation
        var placeholderCheck = $(element).attr('placeholder');
        if (element.val() != "") {
          error.insertAfter(element);
        } else if (placeholderCheck == "" || typeof placeholderCheck == 'undefined') {
          error.insertAfter(element);
        } else {
          //element.attr("placeholder",error.text());
          $(element).addClass('invalidinput');
        }
      },
      onkeyup: false,
      onfocusout: function(element) {
        if (!this.checkable(element)) {
          this.element(element);
        }
      }
    };
  /**
   * @function
   * @description Validates a given phone number against the countries phone regex
   * @param {String} value The phone number which will be validated
   * @param {String} el The input field
   */
  function validatePhone(value, el) {
    var country = $(el).closest("form").find(".country");
    if (country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
      return true;
    }
    var rgx = regex.phone[country.val().toLowerCase()];
    var isOptional = this.optional(el);
    var isValid = rgx.test($.trim(value));
    return isOptional || isValid;
  }
  /**
   * @function
   * @description Validates a given email
   * @param {String} value The email which will be validated
   * @param {String} el The input field
   */
  function validateEmail(value, el) {
    var isOptional = this.optional(el);
    var isValid = regex.email.test($.trim(value));
    return isOptional || isValid;
  }
  /**
   * Add phone validation method to jQuery validation plugin. Text fields must
   * have 'phone' css class to be validated as phone
   */
  $.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);
  /**
   * Add email validation method to jQuery validation plugin. Text fields must
   * have 'email' css class to be validated as email
   */
  $.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);
  /**
   * Add gift cert amount validation method to jQuery validation plugin. Text
   * fields must have 'gift-cert-amont' css class to be validated
   */
  $.validator.addMethod("gift-cert-amount", function(value, el) {
    var isOptional = this.optional(el);
    var isValid = (!isNaN(value)) && (parseFloat(value) >= 5) && (parseFloat(value) <= 5000);
    return isOptional || isValid;
  }, app.resources.GIFT_CERT_AMOUNT_INVALID);
  /**
   * Add positive number validation method to jQuery validation plugin. Text
   * fields must have 'positivenumber' css class to be validated as
   * positivenumber
   */
  $.validator.addMethod("positivenumber", function(value, element) {
    if ($.trim(value).length === 0) {
      return true;
    }
    return (!isNaN(value) && Number(value) >= 0);
  }, "");
  // "" should be replaced with error message if needed
  $.validator.messages.required = function($1, ele, $3) {
    //console.log(ele);
    var requiredText = $(ele).parents('.form-row').attr('data-required-text');
    // console.log(requiredText);
    return requiredText || "";
  };
  /**
   * Add zip code validation method to jQuery validation plugin. Text fields
   * must have 'zip-code' css class to be validated as zip code should not be empty
   */
  $.validator.addMethod("postalCode", function(value, el) {
    //return ($.trim(value).length > 0);
    var isOptional = this.optional(el);
    var isValid = regex.postal['us'].test($.trim(value));
    return isValid;
  }, app.resources.INVALID_ZIPCODE);
  /**
   * Add DOB validation method to jQuery validation plugin. Text fields must
   * have 'zip-code' css class to be validated as dob should not be empty
   */
  $.validator.addMethod("account-dob", function(value, element) {
    return ($.trim(value).length > 0);
  }, "");
  $.validator.addMethod("account-zip", function(value, element) {
    return ($.trim(value).length > 0);
  }, "");
  /** ***** app.validator public object ******* */
  app.validator = {
    regex: regex,
    settings: settings,
    init: function() {
      $("form:not(.suppress)").each(function() {
        $(this).validate(app.validator.settings);
      });
    },
    initForm: function(f) {
      $(f).validate(app.validator.settings);
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.ajax
 */
(function(app, $) {
  var currentRequests = [];
  // request cache
  // sub namespace app.ajax.* contains application specific ajax components
  app.ajax = {
    /**
     * @function
     * @description Ajax request to get json response
     * @param {Boolean} async Asynchronous or not
     * @param {String} url URI for the request
     * @param {Object} data Name/Value pair data request
     * @param {Function} callback Callback function to be called
     */
    getJson: function(options) {
      options.url = app.util.toAbsoluteUrl(options.url);
      // return if no url exists or url matches a current request
      if (!options.url || currentRequests[options.url]) {
        return;
      }
      currentRequests[options.url] = true;
      // make the server call
      $.ajax({
          dataType: "json",
          url: options.url,
          async: (typeof options.async === "undefined" || options.async === null) ? true : options.async,
          data: options.data || {}
        })
        // success
        .done(function(response) {
          if (options.callback) {
            options.callback(response);
          }
        })
        // failed
        .fail(function(xhr, textStatus) {
          if (textStatus === "parsererror") {
            window.alert(app.resources.BAD_RESPONSE);
          }
          if (options.callback) {
            options.callback(null);
          }
        })
        // executed on success or fail
        .always(function() {
          // remove current request from hash
          if (currentRequests[options.url]) {
            delete currentRequests[options.url];
          }
        });
    },
    /**
     * @function
     * @description ajax request to load html response in a given container
     * @param {String} url URI for the request
     * @param {Object} data Name/Value pair data request
     * @param {Function} callback Callback function to be called
     * @param {Object} target Selector or element that will receive content
     */
    load: function(options) {
      options.url = app.util.toAbsoluteUrl(options.url);
      // return if no url exists or url matches a current request
      if (!options.url || currentRequests[options.url]) {
        return;
      }
      currentRequests[options.url] = true;
      // make the server call
      $.ajax({
        dataType: "html",
        url: app.util.appendParamToURL(options.url, "format", "ajax"),
        data: options.data
      }).done(function(response) {
        // success
        if (options.target) {
          if ($(options.target).is($('div#QuickViewDialog')) && !scriptIsmobile()) {
            $(options.target).empty().html('<div id="qv_scrolbar">' + '<div class="scrollbar"><div class="top-arrow"></div><div class="track"><div class="thumb"><div class="end"></div></div></div><div class="bottom-arrow"></div></div>' + '<div class="viewport">' + '<div class="overview">' + response + '</div>' + '</div>' + '</div>');
          } else {
            $(options.target).empty().html(response);
          }
        }
        if (options.callback) {
          options.callback(response);
        }
      }).fail(function(xhr, textStatus) {
        // failed
        if (textStatus === "parsererror") {
          window.alert(app.resources.BAD_RESPONSE);
        }
        options.callback(null, textStatus);
      }).always(function() {
        app.progress.hide();
        // remove current request from hash
        if (currentRequests[options.url]) {
          delete currentRequests[options.url];
        }
      });
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.searchsuggest
 */
(function(app, $) {
  var qlen = 0,
    listTotal = -1,
    listCurrent = -1,
    delay = 300,
    fieldDefault = null,
    suggestionsJson = null,
    $searchForm, $searchField, $searchContainer, $resultsContainer;
  /**
   * @function
   * @description Handles keyboard's arrow keys
   * @param keyCode Code of an arrow key to be handled
   */
  function handleArrowKeys(keyCode) {
    if (keyCode == 40 || keyCode == 38) {
      // loop through each result div applying the correct style
      if (keyCode == 38) { // keyUp
        if (listCurrent <= 0) {
          listCurrent = listTotal + 1;
        }
        listCurrent--;
        $resultsContainer.children().each(function(i) {
          if (i == listCurrent) {
            $searchField.val(suggestionsJson[i].suggestion);
            this.className = "selected";
          } else {
            this.className = "unselected";
          }
          listTotal = i++;
        });
      } else if (keyCode == 40) { // keyDown
        if (listCurrent >= listTotal) {
          listCurrent = -1;
        }
        listCurrent++;
        $resultsContainer.children().each(function(i) {
          if (i == listCurrent) {
            $searchField.val(suggestionsJson[i].suggestion);
            this.className = "selected";
          } else {
            this.className = "unselected";
          }
          listTotal = i++;
        });
      }
      return true;
    } else {
      // reset
      listCurrent = -1;
      return false;
    }
  }
  /** ***** app.searchsuggest public object ******* */
  app.searchsuggest = {
    /**
     * @function
     * @description Configures parameters and required object instances
     */
    init: function(container, defaultValue) {
      // initialize vars
      $searchContainer = $(container);
      $searchForm = $searchContainer.find("form[name='simpleSearch']");
      $searchField = $searchForm.find("input[name='q']");
      $searchSpan = $searchForm.find(".search-message .search-message-content");
      $searchSubmit = $searchForm.find("input[type='submit']");
      fieldDefault = defaultValue;
      var suggestionsContainer = $searchContainer.find('.search-input'),
        isNewSearch = $('#header').hasClass('new-header');
      // disable browser auto complete
      $searchField.attr("autocomplete", "off");
      //reset position of suggestion box on resize
      /*$(window).resize(function(){
          if ($resultsContainer) {
             	$resultsContainer.css({
          		 "top": $searchField[0].offsetHeight > 0 ? $searchField[0].offsetHeight : '23px',
                   "left": isNewSearch ? -1 + "px" : $searchContainer[0].offsetLeft,
                   "width": "100%"
          	});
          }
      });*/
      if (($searchField.attr('value') == $searchField.attr('placeholder')) || ($searchField.attr('value').length === 0)) {
        $searchSubmit.addClass('disable');
      } else {
        $searchSubmit.removeClass('disable');
      }
      // on focus listener (clear default value)
      /*$searchField.focus(function (event) {
            	event.preventDefault();
            	if (($searchField.attr('value') == $searchField.attr('placeholder')) || ($searchField.attr('value').length === 0)) {
            		$searchSubmit.addClass('disable');
                }else{
    				$searchSubmit.removeClass('disable');
    			}
                return;
            });*/
      // on blur listener
      /*$searchField.blur(function () {
          setTimeout(app.searchsuggest.clearResults, 200);
      });*/
      // on key up listener
      $searchField.keyup(function(e) {
        // get keyCode (window.event is for IE)
        var keyCode = e.keyCode || window.event.keyCode;
        // check and treat up and down arrows
        /*if (handleArrowKeys(keyCode)) {
            return;
        }*/
        // check for an ENTER or ESC
        if (keyCode === 13 || keyCode === 27) {
          app.searchsuggest.clearResults();
          return;
        }
        var lastVal = $searchField.val();
        if (lastVal == '') {
          $searchSpan.show();
        } else {
          $searchSpan.hide();
        }
        // if is text, call with delay
        setTimeout(function() {
          app.searchsuggest.suggest(lastVal);
        }, delay);
      });
      /**
       * on submit we do not submit the form, but change the window location
       * in order to avoid https to http warnings in the browser
       * only if it's not the default value and it's not empty
       */
      var that = this;
      $searchForm.submit(function(e) {
        e.preventDefault();
        that.searchSubmit(this, 'header-search-selected', fieldDefault, $searchField);
      });
      $errorSearchContainer = $('.error-page-search');
      if ($errorSearchContainer.length !== 0) {
        $errorSearchForm = $errorSearchContainer.find("form[name='errorSearch']");
        $errorSearchField = $errorSearchForm.find("input[name='q']");
        $errorSearchForm.submit(function(e) {
          e.preventDefault();
          that.searchSubmit(this, 'error-search-selected', '', $errorSearchField);
        });
        var searchOption = app.cookies.readCookie('searchOption');
        if (!(!searchOption)) $('#error-search-selected').html(searchOption);
      }
    },
    /**
     * @function
     * @description trigger when user hit search
     */
    searchSubmit: function(that, selectedid, fieldDefault, $searchField) {
      var searchTerm = $.trim($searchField.val());
      var isNewSearch = $('#header').hasClass('new-header');
      if (searchTerm === fieldDefault && !isNewSearch) {
        searchTerm = '';
      } else if ((searchTerm === 'Search' || searchTerm.length === 0) && isNewSearch) {
        return false;
      }
      var selectedOption = $('#' + selectedid).html(),
        searchKeyword = selectedOption == null ? searchTerm : searchTerm + '|' + selectedOption;
      // sending search term and selected category to analytics.
      app.analytics.init(app.$cache[0].event_cat, app.$cache[0].event_action, searchKeyword);
      var cgid = "";
      isNewSearch = $('#header').hasClass('new-header');
      if (!isNewSearch) {
        cgid = headerSearchFormValue[selectedOption];
      }
      var qURL = app.util.appendParamToURL($(that).attr("action"), "q", searchTerm);
      var selection = (selectedid == 'error-search-selected') ? $('#error-search-selected') : $('#header-search-selected');
      if (selection.text().trim() == 'Man') {
        qURL = app.util.appendParamToURL(qURL, "prefn1", 'ageRangeCode');
        qURL = app.util.appendParamToURL(qURL, "prefv1", 'ADULT');
        qURL = app.util.appendParamToURL(qURL, "prefn2", 'genderCode');
        qURL = app.util.appendParamToURL(qURL, "prefv2", 'M');
      } else if (selection.text().trim() == 'Woman') {
        qURL = app.util.appendParamToURL(qURL, "prefn1", 'ageRangeCode');
        qURL = app.util.appendParamToURL(qURL, "prefv1", 'ADULT');
        qURL = app.util.appendParamToURL(qURL, "prefn2", 'genderCode');
        qURL = app.util.appendParamToURL(qURL, "prefv2", 'F');
      } else if (selection.text().trim() == 'Boys') {
        qURL = app.util.appendParamToURL(qURL, "prefn1", 'ageRangeCode');
        qURL = app.util.appendParamToURL(qURL, "prefv1", 'YOUTH|INFANT');
        qURL = app.util.appendParamToURL(qURL, "prefn2", 'genderCode');
        qURL = app.util.appendParamToURL(qURL, "prefv2", 'M');
      } else if (selection.text().trim() == 'Girls') {
        qURL = app.util.appendParamToURL(qURL, "prefn1", 'ageRangeCode');
        qURL = app.util.appendParamToURL(qURL, "prefv1", 'YOUTH|INFANT');
        qURL = app.util.appendParamToURL(qURL, "prefn2", 'genderCode');
        qURL = app.util.appendParamToURL(qURL, "prefv2", 'F');
      }
      window.location = qURL;
    },
    /**
     * @function
     * @description trigger suggest action
     * @param lastValue
     */
    suggest: function(lastValue) {
      // get the field value
      var part = $searchField.val();
      if (part.length === 0) {
        $searchSubmit.addClass('disable');
      } else {
        $searchSubmit.removeClass('disable');
      }
      // if it's empty clear the resuts box and return
      if (part.length < 3) {
        app.searchsuggest.clearResults();
        var $trendingSearchContainer = $('.header-search-content #search .trending-search');
        $trendingSearchContainer.show();
        return;
      }
      // if part is not equal to the value from the initiated call,
      // or there were no results in the last call and the query length
      // is longer than the last query length, return
      // #TODO: improve this to look at the query value and length
      if ((lastValue !== part) || (listTotal === 0 && part.length > qlen)) {
        return;
      }
      qlen = part.length;
      // build the request url
      var qURL = app.util.appendParamToURL(app.urls.searchsuggest, "q", part);
      //get HTML updated.
      app.ajax.load({
        url: qURL,
        callback: function(html) {
          // get the total of results
          var $targetContainer = $('.header-search-content #search .search-suggestion');
          var $trendingSearchContainer = $('.header-search-content #search .trending-search');
          $trendingSearchContainer.hide();
          $targetContainer.empty();
          $targetContainer.html(html).show();
          var $searchSuggestioinUl = $('#search.search-header .search-suggestion-wrapper .trending-content ul');
          if (!$searchSuggestioinUl.hasClass('columnized')) {
            $searchSuggestioinUl.addClass('columnized');
            //console.log('columnined called');
            $searchSuggestioinUl.columnize({
              manualBreaks: true
            });
          }
          app.searchsuggest.checkLayout();
        }
      });
    },
    mobileLayout: function() {
      var $slideCount = $('.search-suggestion-wrapper .slides-section .slide');
      var $slider = $('.search-suggestion-wrapper .slides-section');
      //do nothing
    },
    tabletLayout: function() {
      var $slideCount = $('.search-suggestion-wrapper .slides-section .slide');
      var $slider = $('.search-suggestion-wrapper .slides-section');
      if ($slideCount.length > 4) {
        //console.log('slider length : '+$slideCount.length);
        $slideCount.css('margin-right', '0px');
        $slideCount.css('margin-left', '0px');
        $slider.bxSlider({
          slideWidth: 150,
          slideMargin: 15,
          minSlides: 4,
          maxSlides: 4,
          controls: true,
          infiniteLoop: true
        });
      } else {
        $slideCount.css('margin-right', '13px');
        $slideCount.css('margin-left', '13px');
      }
    },
    desktopLayout: function() {
      var $slideCount = $('.search-suggestion-wrapper .slides-section .slide');
      var $slider = $('.search-suggestion-wrapper .slides-section');
      if ($slideCount.length > 7) {
        //console.log('slider length : '+$slideCount.length);
        $slideCount.css('margin-right', '0px');
        $slideCount.css('margin-left', '0px');
        $slider.bxSlider({
          slideWidth: 120,
          slideMargin: 26,
          minSlides: 7,
          maxSlides: 7,
          controls: true,
          infiniteLoop: true
        });
      } else {
        $slideCount.css('margin-right', '13px');
        $slideCount.css('margin-left', '13px');
      }
    },
    checkLayout: function() {
      //console.log("In Check Layout");
      if ($('#wrapper').width() <= 767) {
        app.searchsuggest.mobileLayout();
      } else if ($('#wrapper').width() < 1024) {
        app.searchsuggest.tabletLayout();
      } else {
        app.searchsuggest.desktopLayout();
      }
    },
    sliderCall: function() {},
    /**
     * @function
     * @description
     */
    clearResults: function() {
      var $targetContainer = $('.header-search-content #search .search-suggestion');
      if (!$targetContainer) {
        return;
      }
      $targetContainer.empty().hide();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.searchplaceholder
 */
(function(app, $) {
  /**
   * @private
   * @function
   * @description Binds event to the place holder (.blur)
   */
  function initializeEvents() {
    $('#q').focus(function() {
      var input = $(this);
      if (input.val() === input.attr("placeholder")) {
        input.val("");
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() === "" || input.val() === input.attr("placeholder")) {
        input.val(input.attr("placeholder"));
      }
    }).blur();
  }
  /** ***** app.searchplaceholder public object ******* */
  app.searchplaceholder = {
    /**
     * @function
     * @description Binds event to the place holder (.blur)
     */
    init: function() {
      initializeEvents();
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.searchboxtoggle
 */
(function(app, $) {
  /** ***** app.searchboxtoggle public object ******* */
  app.searchboxtoggle = {
    /**
     * @function
     * @description animate search box header search icon
     */
    init: function(iconId, closeId, downArrId, container) {
      $(iconId).on('click', function(e) {
        e.preventDefault();
        showHideSearchBox();
      });
      $(closeId).on('click', function(e) {
        e.preventDefault();
        showHideSearchBox();
      });

      function showHideSearchBox() {
        var rgtContent = $('.rgt-content');
        if ($(container).css('display') == 'none') {
          var searchOption = app.cookies.readCookie('searchOption');
          if (!(!searchOption)) $(container).find('.selected-option div').html(searchOption);
          $(iconId).addClass('header-search-icon-hover');
          $(container).show();
          $(downArrId).show();
          $searchContainer = $(container);
          $searchForm = $searchContainer.find("form[name='simpleSearch']");
          $searchField = $searchForm.find("input[name='q']");
          if (rgtContent[0]) {
            rgtContent.show();
          }
          $searchField.focus();
        } else {
          $(iconId).removeClass('header-search-icon-hover');
          $(container).hide();
          $(downArrId).hide();
          if (rgtContent[0]) {
            rgtContent.hide();
          }
        }
        DieselUS.ui.responsiveHeader.reset($(iconId).attr('data-target'));
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.dynamicGrid
 */
(function(app, $) {
  app.dynamicGrid = {
    container: {},
    slot_products: [],
    dom_stack: {
      slots: [],
      group: {
        'one_column': [],
        'two_column': [],
        'two_by_two': []
      }
    },
    orders: {
      '2': [2, 4, 6, 8],
      '3': [0, 2, 4, 8],
      '4': [0, 2, 5, 6],
      '5': [0, 3, 9, 10],
      '6': [0, 4, 12, 16]
    },
    /**
     * @slots : slot object
     */
    checkSlotConditions: function(slots) {
      _this = this;
      slots.each(function(k) {
        if ($(this).find('div').length > 0) {
          class_name = $(this).attr('class').replace(/^\s+|\s+$/g, '').split(' ');
          last_class = class_name[class_name.length - 1];
          // Find products exist in slots
          $(this).children('ul').children('li').each(function(k) {
            var itemid = $(this).attr('data-itemid');
            if (typeof(itemid) !== 'undefined') {
              _this.slot_products.push(itemid);
            }
          });
          // categories slots based on size
          // slots having class 'two_column'
          if (last_class == 'two_column' && $(this).html().replace(/^\s+|\s+$/g, '') != "") {
            _this.dom_stack.group['two_column'].push(slots[k].outerHTML);
          }
          // slots having class 'two_by_two'
          if (last_class == 'two_by_two' && $(this).html().replace(/^\s+|\s+$/g, '') != "") {
            _this.dom_stack.group['two_by_two'].push(slots[k].outerHTML);
          }
        }
      });
    },
    /**
     * @container : main product grid container object
     * @slots : slots object
     * @class name : n column class_name
     */
    init: function(container, slots) {
      var _this = this;
      _this.container = container;
      // If slots are available check all slot conditions
      if (slots && slots.length > 1) {
        _this.checkSlotConditions(slots);
      }
      container.each(function(k) {
        if ($.inArray($(this).children('div.product-tile').attr('data-itemid'), _this.slot_products) !== -1) {
          container.splice(k, 1);
        }
      });
      _this.container = container;
    },
    /**
     * @n number of column
     */
    redraw: function(n) {
      var html = [],
        j = 0,
        row = 0,
        tc = 0,
        tbt = 0,
        s, i = 0;
      _order = _this.orders[n];
      for (var k = 0; k < _this.container.length; k++) {
        if (k == _order[j]) {
          var slot_type = row == 2 ? 'two_column' : 'two_by_two';
          if (slot_type === 'two_column') {
            s = tc;
            tc++;
          } else {
            s = tbt;
            tbt++;
          }
          if (slot_type && _this.dom_stack.group[slot_type]) {
            if (_this.dom_stack.group[slot_type][s]) {
              html[i] = _this.dom_stack.group[slot_type][s];
            }
            i++;
          }
          row++;
          j++;
        }
        html[i] = _this.container[k].outerHTML;
        i++;
      }
      $('.search-result-items .reorder').remove();
      $('.search-result-items').prepend(html.join(' '));
    }
  };
}(window.app = window.app || {}, jQuery));
// jquery extensions
(function($) {
  // params
  // toggleClass - required
  // triggerSelector - optional. the selector for the element that triggers
  // the event handler. defaults to the child elements of the list.
  // eventName - optional. defaults to 'click'
  $.fn.toggledList = function(options) {
    if (!options.toggleClass) {
      return this;
    }
    var list = this;

    function handleToggle(e) {
      e.preventDefault();
      var classTarget = options.triggerSelector ? $(this).parent() : $(this);
      classTarget.toggleClass(options.toggleClass);
      // execute callback if exists
      if (options.callback) {
        options.callback();
      }
    }
    return list.on(options.eventName || "click", options.triggerSelector || list.children(), handleToggle);
  };
  $.fn.syncHeight = function() {
    function sortHeight(a, b) {
      return $(a).height() - $(b).height();
    }
    var arr = $.makeArray(this);
    arr.sort(sortHeight);
    return this.height($(arr[arr.length - 1]).height());
  };
}(jQuery));
//Analytics
(function(app, $) {
  app.$cache = [{
    'event_cat': 'Header',
    'event_action': 'header_search_click'
  }, {
    'event_cat': 'Header',
    'event_action': 'brandsite_click'
  }, {
    'event_cat': 'Header',
    'event_action': 'storelocator_click'
  }, {
    'event_cat': 'Navigation Flyout',
    'event_action': 'header_category_nav_click'
  }, {
    'event_cat': 'Footer',
    'event_action': 'subscription_submit'
  }, {
    'event_cat': 'Footer',
    'event_action': 'footer_country_selected'
  }, {
    'event_cat': 'Homepage',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Category Landing',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Product Listing/Search results',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Product Listing/Search results',
    'event_action': 'quick_view_click'
  }, {
    'event_cat': 'Product Listing/Search results',
    'event_action': 'Refinement_selected'
  }, {
    'event_cat': 'Product Listing/Search results',
    'event_action': 'filter_expand'
  }, {
    'event_cat': 'Product Listing/Search results',
    'event_action': 'filter_collapse'
  }, {
    'event_cat': 'Product Detail',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Product Detail',
    'event_action': 'addtocart'
  }, {
    'event_cat': 'Product Detail',
    'event_action': 'addtowishlist'
  }, {
    'event_cat': 'Product Detail',
    'event_action': 'zoom'
  }, {
    'event_cat': 'product Quick view',
    'event_action': 'addtocart'
  }, {
    'event_cat': 'product Quick view',
    'event_action': 'addtowishlist'
  }, {
    'event_cat': 'product Quick view',
    'event_action': 'zoom'
  }, {
    'event_cat': 'Cart',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Cart',
    'event_action': 'update_cart_click'
  }, {
    'event_cat': 'Cart',
    'event_action': 'addtowishlist'
  }, {
    'event_cat': 'Cart',
    'event_action': 'cart_removals'
  }, {
    'event_cat': 'Cart',
    'event_action': 'cart_promocodes_applied'
  }, {
    'event_cat': 'Cart',
    'event_action': 'cart_promocodes_removed'
  }, {
    'event_cat': 'Mini Cart',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Checkout - Order Confirmation',
    'event_action': 'create_account'
  }, {
    'event_cat': 'Checkout - Order Confirmation',
    'event_action': 'return_to_shopping_click'
  }, {
    'event_cat': 'Checkout - Address Validation',
    'event_action': 'entered_address_click'
  }, {
    'event_cat': 'Checkout - Address Validation',
    'event_action': 'suggested_address_click'
  }, {
    'event_cat': 'My Account',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'My Account',
    'event_action': 'my_promo_click'
  }, {
    'event_cat': 'My Account - Promotions Page',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'My Account - Promotions Page',
    'event_action': 'my_promo_click'
  }, {
    'event_cat': 'Customer Service',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'WishList',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'WishList',
    'event_action': 'addtocart'
  }, {
    'event_cat': 'WishList',
    'event_action': 'cart_removals'
  }, {
    'event_cat': 'Shop By Look List',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'look Quick view',
    'event_action': 'addtocart'
  }, {
    'event_cat': 'look Quick view',
    'event_action': 'addtowishlist'
  }, {
    'event_cat': 'look Quick view',
    'event_action': 'zoom'
  }, {
    'event_cat': 'Shop By Look Detail',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Shop By Look Detail',
    'event_action': 'addtocart'
  }, {
    'event_cat': 'Shop By Look Detail',
    'event_action': 'addtowishlist'
  }, {
    'event_cat': 'Shop By Look Detail',
    'event_action': 'zoom'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'content_slot_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_homepage_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_man_homepage_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_woman_homepage_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_washstory_washstory_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_washstory_wash_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_fits_page_fits_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'DG_fits_page_styles_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'quick_view_click'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'Refinement_selected'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'filter_expand'
  }, {
    'event_cat': 'Denim Guide',
    'event_action': 'filter_collapse'
  }, {
    'event_cat': 'Cart',
    'event_action': 'update_cart_increment'
  }, {
    'event_cat': 'Cart',
    'event_action': 'update_cart_decrement'
  }];
  app.analytics = {
    init: function(event_cat, event_action, event_label) {
      ga('send', 'event', event_cat, event_action, event_label);
    }
  };
}(window.app = window.app || {}, jQuery));
// event tracking for header related links
$('.menu-utility a').on('click', function(e) {
  e.preventDefault();
  var headerMenuLink = $(this).text();
  if (headerMenuLink.trim() == 'Diesel.com') {
    app.analytics.init(app.$cache[1].event_cat, app.$cache[1].event_action, '');
    window.open($(this).attr('href'));
  } else if (headerMenuLink.trim() == 'Store Locator') {
    app.analytics.init(app.$cache[2].event_cat, app.$cache[2].event_action, '');
    window.open($(this).attr('href'));
  } else if ($(this).hasClass('open-dialog')) {
    return;
  } else {
    window.location.href = $(this).attr('href');
  }
});
$(document).on("click", ".brand-logo", function(e) {
  e.preventDefault();
  app.analytics.init(app.$cache[1].event_cat, app.$cache[1].event_action, '');
  window.location = this.href;
});
$('div#footer .country-flyout-options a, div#footer-burger .country-flyout-options a').on('click', function(e) {
  e.preventDefault();
  var countrySelected = $(this).text();
  app.analytics.init(app.$cache[5].event_cat, app.$cache[5].event_action, countrySelected);
  window.open($(this).attr('href'), '_self', null, null);
});
// event tracking for navigation flyout.
$('#navigation a').on('click', function(e) {
  e.preventDefault();
  if ($(this).attr('data-catId')) {
    var categoryID = $(this).attr('data-catId');
    app.analytics.init(app.$cache[3].event_cat, app.$cache[3].event_action, categoryID);
  }
  if ($(this).attr('href') != '') window.location.href = $(this).attr('href');
});

function eventTracking_addToCart(productName, pageName, isQuickView) {
  if (pageName == "ProductDetail") {
    if (isQuickView == "true") {
      app.analytics.init(app.$cache[17].event_cat, app.$cache[17].event_action, productName);
    } else {
      app.analytics.init(app.$cache[14].event_cat, app.$cache[14].event_action, productName);
    }
  } else if (pageName == "ShopByLook") {
    if (isQuickView == "true") {
      app.analytics.init(app.$cache[40].event_cat, app.$cache[40].event_action, productName);
    } else {
      app.analytics.init(app.$cache[44].event_cat, app.$cache[44].event_action, productName);
    }
  }
}
//event tracking for add to wishlist for PDP,PDP quick view,ShopByLook,Look Quick view
// Cart Add to wishlist Google analytics
$('.pt_cart .add-to-wishlist').on('click', function(e) {
  e.preventDefault();
  var productName = $(this).data('pname');
  if (productName != 'null') {
    app.analytics.init(app.$cache[22].event_cat, app.$cache[22].event_action, productName);
  }
  if ($('#isUserLogin').val() == 'true') {
    window.location.href = $(this).attr('href');
  }
});
// event tracking for zoom event on look quick view
$('.zoom-image.alone a.zoom ').on('click', function(e) {
  var parent = $(this).closest('.product-set-container'),
    pname = parent.find('input[name="pname"]');
  if (pname.length > 0) {
    var productName = pname.val();
    var zoomedImg = $(this).parents('li').find('img');
    var imageURL = $(zoomedImg).attr('src');
    app.analytics.init(app.$cache[46].event_cat, app.$cache[46].event_action, productName + '|' + imageURL);
  }
});
//Address Validation page
$('#shipToThisAddressOriginal').on('click', function() {
  app.analytics.init(app.$cache[29].event_cat, app.$cache[29].event_action, '');
});
$('#shipToThisAddressSuggested').on('click', function() {
  app.analytics.init(app.$cache[30].event_cat, app.$cache[30].event_action, '');
});
//Order confirmation page
$('#CreateAccount').on('click', function() {
  app.analytics.init(app.$cache[27].event_cat, app.$cache[27].event_action, '');
});
$('#ReturnShopping').on('click', function(e) {
  e.preventDefault();
  app.analytics.init(app.$cache[28].event_cat, app.$cache[28].event_action, '');
  window.location.href = $(this).attr('href');
});
//Account & account-promotion page
$('.promo-id a').on('click', function(e) {
  e.preventDefault();
  var pageName = $('.pageNamePromotion').attr('pageName');
  var index = $.inArray('my_promo_click ' + pageName, $.map(app.$cache, function(e) {
    return e.event_action + " " + e.event_cat;
  }));
  if ($(this).attr('data-promoid')) {
    var promoId = $(this).data('promoid');
    app.analytics.init(app.$cache[index].event_cat, app.$cache[index].event_action, promoId);
  }
  window.location.href = $(this).attr('href');
});
//WishList
$('.pt_wish-list').on('click', '.wish-list-add-to-cart', function() {
  if ($(this).attr('pname')) {
    var productName = $(this).attr('pname');
    app.analytics.init(app.$cache[37].event_cat, app.$cache[37].event_action, productName);
  }
});
$('.delete-item').on('click', function() {
  if ($(this).attr('pname')) {
    var productName = $(this).attr('pname');
    app.analytics.init(app.$cache[38].event_cat, app.$cache[38].event_action, productName);
  }
});
$('#primary button.remove-item').on('click', function() {
  var productName = $(this).data('pname');
  if (productName != 'null') {
    app.analytics.init(app.$cache[23].event_cat, app.$cache[23].event_action, productName);
    return true;
  }
});
// event tracking for zoom click on PDP
$('#pdpMain .pdpslide-control .zoom-image a').on('click', function(e) {
  if ($('#pname')) {
    var productName = $('#pname').val();
    app.analytics.init(app.$cache[16].event_cat, app.$cache[16].event_action, productName);
  }
});
// event tracking for refinement on search result
$('.refinement').on('click', 'a', function(e) {
  var baseRefinement = $(this).parents('.refinement').attr('class').trim();
  var baseRefinementArr = baseRefinement.split(' ');
  var pageName = $('.pageName:visible').attr('data-pagename');
  if (pageName) {
    if (pageName === 'Denim Guide') {
      app.analytics.init(app.$cache[56].event_cat, app.$cache[56].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
    } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
  } else app.analytics.init(app.$cache[10].event_cat, app.$cache[10].event_action, baseRefinementArr[baseRefinementArr.length - 1]);
});
// event tracking for promo code on cart page
$('#add-coupon').on('click', function(e) {
  var couponCode = $(this).parents('form').find("input[name$='_couponCode']");
  if (couponCode) {
    app.analytics.init(app.$cache[24].event_cat, app.$cache[24].event_action, couponCode.val());
  }
  return true;
});
// event tracking for removing coupon on cart page
$("button[id^='removeCouponCode']").on('click', function(e) {
  var buttonId = $(this).attr('id');
  if (buttonId) {
    var count = buttonId.split("-")[1];
    var couponCode = $(this).parents('form').find("li[id=coupon-code-" + count + "]").html();
    app.analytics.init(app.$cache[25].event_cat, app.$cache[25].event_action, couponCode);
  }
  return true;
});

function contentSlotLink(slotId, href) {
  if (slotId) {
    var pageName = $('.pageName:visible').attr('data-pagename');
    if (pageName) {
      if (pageName === 'Denim Guide') {
        slotId = slotId + '|' + href;
      }
      var indexToSet = $.map(app.$cache, function(e) {
        return e.event_cat + " " + e.event_action;
      }).indexOf(pageName + ' content_slot_click');
      if (indexToSet) {
        app.analytics.init(app.$cache[indexToSet].event_cat, app.$cache[indexToSet].event_action, slotId);
      }
    }
  }
}
// event tracking for content slots with templates
function contentPlpSlotLink() {
  $('body').on('click', 'a.ga-slot-link', function(e) {
    e.preventDefault();
    var slotId = $(this).attr('data-slotid');
    var href = $(this).attr('href');
    contentSlotLink(slotId, href);
    if ($(this).closest('.product-tile').length) {
      if ($($(this).closest('.product-tile')).hasClass('product-tile-quickview')) {
        window.location.href = $(this).attr('href');
      }
    } else {
      if (!$(this).attr('data-dlg-options')) {
        window.location.href = $(this).attr('href');
      }
    }
  });
}
// event tracking for content slots having static html with anchor tags
$('div .html-slot-container a').on('click', function(e) {
  e.preventDefault();
  var slotId = $('div .html-slot-container').attr('data-slotid');
  var href = $(this).attr('href');
  contentSlotLink(slotId, href);
  window.location.href = $(this).attr('href');
});
//event tracking for update cart
$('.ga-update-cart').on('click', function() {
  app.analytics.init(app.$cache[21].event_cat, app.$cache[21].event_action, '');
  return true;
});
// general extension functions
(function() {
  String.format = function() {
    var s = arguments[0];
    var i, len = arguments.length - 1;
    for (i = 0; i < len; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      s = s.replace(reg, arguments[i + 1]);
    }
    return s;
  };
})();
/**
 *
 * Privacy policy setup
 *
 */
(function($) {
  // jquery plugin registry
  $.fn.toggleCheckBoxes = function(options) {
    var settings = $.extend({}, options),
      checkboxes = $(this).find('input[type=checkbox]'),
      anchor = $(this).find('.' + settings.className),
      subscriptions = [],
      userType = $(this).data('user-type'),
      pub;
    // registration account page height setup code 
    $(window).smartresize(function() {
      $(document).trigger("equalaccount");
    });
    $(document).trigger("equalaccount");
    $(checkboxes).each(function() {
      if ($(this).data('checkbox') === 'main') pub = $(this);
      else {
        $(this).parent().addClass('hide');
        subscriptions.push($(this));
      }
    });
    setEvents($(anchor), subscriptions, pub);
    if (setUpPrivacyPolicy(subscriptions)) $(pub).attr('checked', 'checked');
    return this;
  };
  // Setting up the privacy policy presentation when page loads for the first
  // time
  var setUpPrivacyPolicy = function(subs) {
    var result = false;
    $.each(subs, function() {
      if ($(this).is(':checked')) result = true;
      else {
        return (result = false);
      }
    });
    return result;
  };
  // Adding event listener on the link for show-hide
  var setEvents = function(a, subs, pub) {
    $(a).on('click', function(e) {
      e.preventDefault();
      $.each(subs, function() {
        toggleSubcriptions(this);
      });
    });
    $(pub).on('click', function() {
      if ($(this).is(':checked')) {
        $.each(subs, function() {
          if (!$(this).is(':checked')) $(this).attr('checked', 'checked');
        });
      } else $.each(subs, function() {
        if ($(this).is(':checked')) $(this).removeAttr('checked');
      });
    });
    $.each(subs, function() {
      $(this).on('click', function() {
        if ($(this).is(':checked') && subsStatus(this, subs) && !$(pub).is(':checked')) $(pub).attr('checked', 'checked');
        else if ($(this).is(':checked') && !subsStatus(this, subs) && $(pub).is(':checked')) $(pub).removeAttr('checked');
        else if (!$(this).is(':checked') && $(pub).is(':checked')) $(pub).removeAttr('checked');
      });
    });
  };
  var subsStatus = function(el, subs) {
    var ischecked = 0,
      subs_count = subs.length;
    $(subs).not($(el)).each(function() {
      if ($(this).is(':checked')) ischecked++;
    });
    return ((ischecked === subs_count) ? true : false);
  };
  var toggleSubcriptions = function(el) {
    var parent = $(el).parent();
    if ($(parent).hasClass('hide')) {
      $(parent).removeClass('hide').addClass('show');
      $(document).trigger("equalaccount");
    } else {
      $(parent).removeClass('show').addClass('hide');
    }
  };
}(jQuery));
/* detects all touch devices including tablets */
function scriptIsmobile() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}
/**
 * @class app.device
 * @description Find different kind of devices and their orientation
 * @author jsin42
 */
(function($) {
  app.device = {
    /**
     * @param {String} accepted value is all the methods name other than 'is'
     * @returns {Boolean}
     */
    'is': function(name) {
      if (typeof this[name] === 'function') {
        return this[name]();
      } else if (this.navigator.indexOf(name.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    },
    'tablet': function() {
      return this.is('ipad') || this.is('kindle');
    },
    'ipad': function() {
      return /ipad/i.test(this.navigator);
    },
    'kindle': function() {
      return /kindle|silk|kftt|kfot|kfjwa|kfjwi|kfsowi|kfthwa|kfthwi|kfapwa|kfapwi/i.test(this.navigator);
    },
    'mobile': function() {
      return !this.tablet() && /mobile/i.test(this.navigator);
    },
    'handheld': function() {
      if (this.navigator.match(/android/i) || this.navigator.match(/webos/i) || this.navigator.match(/iphone/i) || this.navigator.match(/ipad/i) || this.navigator.match(/ipod/i) || this.navigator.match(/blackberry/i) || this.navigator.match(/windows phone/i) || 'ontouchstart' in document.documentElement) {
        return true;
      }
      return false;
    },
    /**
     * @description Returns orientation of the device
     * @returns {String} orientation portrait | landscape
     */
    'orientation': function() {
      if (typeof window.orientation === 'undefined') {
        return screen.height > screen.width ? 'portrait' : 'landscape';
      } else if (window.orientation === 0 || window.orientation === 180) {
        return 'portrait';
      } else if (window.orientation === -90 || window.orientation === 90) {
        return 'landscape';
      }
    },
    'landscape': function() {
      return this.orientation() === 'landscape';
    },
    'portrait': function() {
      return this.orientation() === 'portrait';
    },
    'navigator': window.navigator.userAgent.toLowerCase()
  };
}(jQuery));

function initRadioFocus() {
  // add focus to customised radio
  $('input[type="radio"]').off('focus').on('focus', function() {
    $($(this).next('label')).find('span:first').css('border', '0');
  }).off('blur').on('blur', function() {
    $($(this).next('label')).find('span:first').css('border', '0');
  });
}
/**
 *
 * jquery plugin for hide and show
 *
 */
(function($) {
  $.fn.display = function(method) {
    if (methods[method]) return methods[method].apply(this, []);
    else return $.error('No method with name ' + method + ' exist in plugin display');
  };
  var methods = {
    show: function() {
      return $(this).hasClass('hide') ? $(this).removeClass('hide').addClass('show') : $(this).addClass('show');
    },
    hide: function() {
      return $(this).hasClass('show') ? $(this).removeClass('show').addClass('hide') : $(this).addClass('hide');
    }
  };
}(jQuery));
/* trim function */
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};
/**
 * @class app.denimguide
 *
 */
(function(app, $) {
  var $cache = {};
  app.denimguide = {
    settings: {
      isAnimate: false,
      isActive: false,
      isTouchEnable: false,
      man: null,
      woman: null,
      denimCopy: null,
      manGuide: null,
      womanGuide: null,
      activeContent: null,
      passiveContent: null,
      windowWidth: $(window).width(),
      isFiltered: false
    },
    /**
     * @function
     * @description Initializes the tooltip-content and layout
     */
    init: function() {
      var _this = this;
      /* Caching the elements and then binding events */
      this._setVariables().setEvents();
      //	this.applyCustomScroll();
      this.applyCarousel();
      this.isMobile();
      this.getProducts();
      if (!this.settings.isTouchEnable) {
        this.hightlightImage();
      }
      if (window.innerWidth < 767) {
        $('#denim-guide-product-listing').addClass('is-mobile');
        this.navigateMobileHeader();
      }
      if ($(window).width() > 767) {
        $('#denim-guide-product-listing nav ul').css({
          'width': parseInt($('#denim-guide-product-listing nav ul').outerWidth(), 10) + 10 + 'px',
          'float': 'none'
        });
        $(window).resize(function() {
          _this.settings.windowWidth = $(window).width();
          _this.configureCarousel();
        });
      }
      this.prepareKindleUI();
      if ($('#denim-guide-product-listing .category-images ul').children('li').length === 0) {
        $('#denim-guide-product-listing .category-images').hide();
        $('#denim-guide-product-listing .main-category.selected').css('background-image', 'none');
      }
      if (scriptIsmobile() && $(window).width() >= 768 && $(window).width() <= 1024) {
        if ($('.desc-washes-backup').length === 0) {
          var $backup = $('<div class="hide desc-washes-backup"> </div>');
          $backup.html($('.desc-text').html());
          $('body').append($backup);
        }
        $(window).resize(function() {
          if (!_this.settings.isFiltered) {
            var washWinWidth = $(window).width();
            if (washWinWidth >= 768 && washWinWidth <= 805) {
              _this.applyTextOverflow();
            } else {
              $('.desc-text').html($('.desc-washes-backup').html());
            }
          }
        });
      }
      if (scriptIsmobile() && $(window).width() >= 768 && $(window).width() <= 801) {
        this.applyTextOverflow();
      }
    },
    /**
     *
     * @function
     * @description retrieve the product list to the category clikced on
     * 				PLP page.
     */
    getProducts: function() {
      var _this = this,
        mainContainer = $('#main');
      $('#wrapper .category-images ul li').off().on('click', 'a', function(e) {
        var self = this;
        var denimTypeDesc = mainContainer.find('.denim-type-desc');
        var $li = $(this).parent('li');
        if ($li.hasClass('active')) {
          return;
        }
        e.preventDefault();
        app.progress.show($('#denim-guide-product-listing'));
        $li.siblings().removeClass('active').end().addClass('active');
        /* Google analytics code block */
        var ga_index = $(this).data('ga-id').indexOf('fits') >= 0 ? 54 : 52,
          ga_label = $(this).find('span').html();
        _this.setGoogleAnalytics(ga_index, ga_label);
        $.get(app.util.appendParamToURL($(self).attr('href'), "format", "ajax"), function(data) {
          var div = $('<div> </div>');
          div.html(data);
          if (denimTypeDesc.length > 0) denimTypeDesc.addClass('product-listing').html(div.find('.denim-type-desc').html());
          else $('#denim-guide-product-listing').append(div.find('.denim-type-desc'));
          mainContainer.find('.pagination').html(div.find('.pagination').html());
          mainContainer.find('#search-result').html(div.find('#search-result').html());
          mainContainer.find('.breadcrumb').html(div.find('.breadcrumb').html());
        }).done(function() {
          _this.settings.isFiltered = true;
          app.denimguide.refreshDomAfterResponse();
        });
      });
    },
    /**
     *
     * @function
     * @decription rebound the events after ajax response is loaded
     *
     */
    refreshDomAfterResponse: function() {
      var _this = this;
      this.hightlightImage();
      this.getProducts();
      app.product.compare.init();
      app.product.tile.init();
      app.progress.hide();
      if (app.clientcache.LISTING_INFINITE_SCROLL) {
        jQuery(document).trigger('grid-update');
      }
      $('#secondary').show();
      $('.search-result-options .refinements-filter').hide();
      //JIRA : 2380
      // $('#primary').removeClass('full-width').addClass('default-column');
      $('.refinement h3.toggle.expanded').next('ul').hide();
      if ($('body').hasClass('cat-dieselblackgold') && $('#search-result').attr('data-layout') == 'denim') {
        //Denim DBG
      } else {
        $('.refinement h3.toggle.expanded').each(function(k, val) {
          if ($(this).parent().css('display') == 'block') {
            $(this).removeClass('expanded').next('ul').show();
            return false;
          }
        });
      }
      customizeSelectNow();
      setTimeout(function() {
        if ($('.breadcrumb-refined-by').next().length === 0 || !($($('.breadcrumb-refined-by').next()).is(':visible'))) {
          $('.breadcrumb-refined-by').hide();
        }
      }, 100);
      if (scriptIsmobile() && $(window).width() > 767 && $(window).width() < 1025) {
        if ($('.desc-data-storage').length === 0) {
          var $dataBackup = $('<div class="hide desc-data-storage"> </div>');
          $dataBackup.html($('.desc-text').html());
          $('body').append($dataBackup);
        }
        $(window).resize(function() {
          var currentWinWidth = $(window).width();
          if (currentWinWidth >= 768 && currentWinWidth <= 805) {
            _this.applyTextOverflow();
          } else {
            $('.desc-text').html($('.desc-data-storage').html());
          }
        });
      }
      if (scriptIsmobile() && $(window).width() >= 768 && $(window).width() <= 805) {
        this.applyTextOverflow();
      }
    },
    /**
     *
     * @function
     * @description adds a class 'mobile or no-mobile' to wrapper
     * 				based on device
     */
    isMobile: function() {
      var wrapper = $('#denim-guide');
      scriptIsmobile() ? wrapper.addClass('is-mobile') : wrapper.addClass('no-mobile');
      this.settings.isTouchEnable = scriptIsmobile();
    },
    /**
     *
     * @function
     * @description sets the custom carousel for overflow text in Denim guid plp
     *
     */
    applyCustomScroll: function() {
      if ($(window).width() < 1024 && $(window).width() > 767) {
        var $wrapper = $('.denim-type-desc .desc-text');
        var height = $('.denim-type-desc').height() - $('.additional-images').height();
        var content = $wrapper.html();
        if ($wrapper.height() > height) {
          $wrapper.css({
            'height': height
          });
          $wrapper.empty().html('<div id="denim-custom-scroll">' + '<div class="scrollbar"><div class="top-arrow"></div><div class="track"><div class="thumb"><div class="end"></div></div></div><div class="bottom-arrow"></div></div>' + '<div class="viewport">' + '<div class="overview">' + content + '</div>' + '</div>' + '</div>');
          $('#denim-custom-scroll').tinyscrollbar();
        }
      }
    },
    /**
     * @function
     * @description sets up the carousel to all the elements with class name .denim-carousel
     *
     */
    applyCarousel: function() {
      $('.denim-carousel-wrapper').each(function(key, val) {
        app.util.setCarousel({
          sliderid: $(val).find('.denim-carousel'),
          sliderwrapper: $(val)
            /*	callback : function(index){
						var slideContainer = $(val).find('.denim-carousel'),
							totalSlides = $(slideContainer).find('li'),
							currentSlide = totalSlides[index-1],
							browserAll = $(val).find('.browse-all');
						$(browserAll).attr('href', $(currentSlide).find('h3 a').attr('href'));
					}  */
        });
      });
      this.configureCarousel();
    },
    /**
     *
     * @function
     * @private
     * @description configure carousel
     *
     */
    configureCarousel: function() {
      var numberOfSlides = $('.dg-carousel li').length,
        slidesToDisplay = 0;
      var firstSlide = $('.dg-carousel li:first'),
        totalSlides = $('.dg-carousel li').length,
        wrapWidth = $('.category-images').outerWidth(),
        slideWidth;
      if (numberOfSlides === 0) {
        return;
      } else {
        if (this.settings.windowWidth > 1024 && numberOfSlides >= 10) {
          slidesToDisplay = 10;
        } else if ((this.settings.windowWidth === 1024 || this.settings.windowWidth > 1000) && numberOfSlides >= 8) {
          slidesToDisplay = 8;
        } else if (this.settings.windowWidth < 1024 && this.settings.windowWidth === 768 && numberOfSlides >= 6) {
          slidesToDisplay = 6;
        } else if (this.settings.windowWidth > 768 && this.settings.windowWidth < 805 && numberOfSlides >= 6) {
          slidesToDisplay = 6;
        }
        if (slidesToDisplay > 0) {
          app.util.setCarousel({
            sliderwrapper: '.category-images',
            sliderid: '.dg-carousel',
            multiple: slidesToDisplay,
            isFixed: true
          });
        } else {
          slideWidth = parseInt($(firstSlide).css('marginRight'), 10) + parseInt($(firstSlide).css('marginLeft'), 10) + parseInt($(firstSlide).width(), 10);
          if (slideWidth * totalSlides < wrapWidth) {
            $('.dg-carousel').width(slideWidth * totalSlides + 10 + 'px').css({
              'height': $('.dg-carousel li').outerHeight(),
              'position': 'relative',
              'margin': '0 auto'
            });
          }
        }
      }
    },
    /**
     * @private
     * @function
     * @description Searching all the DOM elements used in demin guide and caching them
     *
     */
    _setVariables: function() {
      this.settings.man = $('#man');
      this.settings.woman = $('#woman');
      this.settings.denimCopy = $('.denim-copy');
      this.settings.manGuide = $('#man-guide');
      this.settings.womanGuide = $('#woman-guide');
      this.isMobile();
      return this;
    },
    /**
     *
     * @function
     * @description Binding denim guide landing page events <br>
     * <p> Click on man and woman image will take user to respective wash stories and fits pages </p>
     * <p> User can switch man to woman and vice versa </p>
     *
     *
     */
    setEvents: function() {
      var _this = this,
        mainContainer = $('#main');
      /* Bind click event with images/overly box  */
      $('#container').on('click', 'a.entrypoint, .main-image', function(e) {
        _this.showWashAndFits(e);
      });
      /* Bind click event to man/woman navigation link. */
      $('.category-header').on('click', 'a', function(e) {
        _this.switchManOrWoman(e, this);
      });
      /* Bind click event with Servical guide link to restore the default state of demin guide landing page */
      $('.servival-guide').on('click', function(e) {
        _this.restoreDefault(e);
      });
      /* Apply text overflow ellipsis */
      // this.applyTextOverflow();
      /* binding event with fits main menu */
      $('#denim-guide').on('click', '.fits-main-header', _this.selectFits);
      /* bind click event for google analytics */
      $('#denim-guide').on('click', '.denim-carousel .primary-image ,.denim-carousel .overlay a, h3 a, a.browse-all', function(e) {
        _this._trackUserClick(this);
      });
      $('body').on('click', '#denim-guide-product-listing a.level1', function() {
        _this._trackWashStoryOrFitsClick(this);
      });
      /* display the denim guide section based on parent category man or woman */
      if ($('.usertype-woman').length > 0) {
        if (this.settings.isTouchEnable) {
          $('.usertype-woman #woman').find('.main-image').trigger('click');
        } else {
          $('.usertype-woman #woman').find('a.entrypoint').trigger('click');
        }
      } else if ($('.usertype-man').length > 0) {
        if (this.settings.isTouchEnable) {
          $('.usertype-man #man').find('.main-image').trigger('click');
        } else {
          $('.usertype-man #man').find('a.entrypoint').trigger('click');
        }
      }
      $('#wrapper .category-images ul li .overlay').on('click', function(e) {
        $(this).parent('li').find('a').trigger('click');
      });
    },
    /**
     * @function
     * @description Callback for the click event bound to man and woman images in the denim guide landing page. For desktop click event is bind with
     * anchor inside .overlay container.
     * @param {event} Window event object
     */
    showWashAndFits: function(event) {
      var $el = this.getTargetElement(event),
        parent,
        sibling,
        shift;
      parent = $el.prop('tagName').toLowerCase() == 'img' ? $el.parent() : $el.parent().parent();
      sibling = ((parent).attr('id') == 'man') ? this.settings.woman : this.settings.man;
      /* Google analytics */
      this.setGoogleAnalytics(48, (parent).attr('id'));
      if (!this.settings.isAnimate) {
        return;
      }
      event.preventDefault();
      /* Washes and fits screen current state is captured. isActive is set to true when screen is visible. */
      this.settings.isActive = true;
      /* Fetching the container information to be displayed */
      this.updateCurrentState(parent, sibling);
      parent.addClass('selected').removeClass('hidden');
      sibling.addClass('hidden').removeClass('selected');
      /* Hide the overlay box */
      $('div.overlay.is-main').hide();
      /* Hide denim copy circle */
      this.settings.denimCopy.display('hide');
      /* Based on user click event hide and show the respective content block */
      $(parent).find('div[class*="guide"]').display('show');
      $(sibling).find('.main-image').display('hide');
      if (window.innerWidth < 768) {
        this.updateOffsetMobile(parent, sibling);
      }
      this._updatePosition(parent, sibling);
      this.updateBreadcrumb($el);
    },
    /**
     *
     * @desciption update active and passive blocks
     */
    updateCurrentState: function(parent, sibling) {
      this.settings.activeContent = parent;
      this.settings.passiveContent = sibling;
    },
    /**
     * @function
     * @description Restore the default screen of landing page
     * 				<p>When user clicks on Denim Guide Servival header link
     * 				   denim guide landing page will be restored. </p>
     * @param {event} Window event object
     */
    restoreDefault: function(event) {
      if (!this.settings.isAnimate) {
        window.location.href = $(event.target).attr('href');
        return;
      }
      event.preventDefault();
      this.settings.isActive = false;
      this._updatePosition(this.settings.man, this.settings.woman);
      $('div.overlay.is-main').show();
      $('.denim-copy, .main-image').display('show');
      $(this.settings.manGuide).display('hide');
      this.settings.womanGuide.display('hide');
      if ($('#main .breadcrumb h1 a').length > 0) {
        $($('#main .breadcrumb h1 a')[0]).hide();
        $($(' #main .breadcrumb h1 span.divider')[0]).hide();
      } else {
        $($('#main .breadcrumb li')[1]).html('');
      }
    },
    /**
     *
     * @function
     * @description update denim guide breadcrumb
     */
    updateBreadcrumb: function(el) {
      var $breadcrumb = $($('#main .breadcrumb li')[1]),
        anchorTag,
        divider;
      if ($('#main .breadcrumb h1').length > 0) {
        anchorTag = $($('#main .breadcrumb h1 a')[0]);
        anchorTag.css('display', 'inline');
        $(' #main .breadcrumb h1 span.divider').css('display', 'inline');
      } else if ($breadcrumb.find('a').length > 0) {
        anchorTag = $breadcrumb.find('a');
        divider = $breadcrumb.find('span.divider');
      } else {
        anchorTag = $('<a></a>');
        divider = $('<span></span>').addClass('divider').html('&#47;');
        $breadcrumb.append(anchorTag).append(divider);
      }
      anchorTag.attr('href', $(el).data('href')).html($(el).data('breadcrumb-text'));
    },
    /**
     *
     * @function
     * @description This callback function will be called to switch between man or woman section
     * @param {e} Window event object
     * @param {el} DOM element
     */
    switchManOrWoman: function(e, el) {
      var className = $(el).attr('class').split('-'),
        $parent = $('#' + className[1]),
        $sibling = this._findNextElement($parent);
      /* Google analytics */
      this.setGoogleAnalytics(48, className[1]);
      if (!this.settings.isAnimate) {
        window.location.href = $(el).attr('href');
        return;
      }
      e.preventDefault();
      this.updateCurrentState($parent, $sibling);
      $parent.addClass('selected').removeClass('hidden');
      $sibling.addClass('hidden').removeClass('selected');
      this._showHideContent($parent, "show");
      this._showHideContent($sibling, "hide");
      if (window.innerWidth < 768) {
        this.updateOffsetMobile($parent, $sibling);
      }
      this._updatePosition($parent, $sibling);
      this.updateBreadcrumb(el);
    },
    /**
     * @function
     * @description Set Google Analytics
     *
     */
    setGoogleAnalytics: function(index, eventLabel) {
      app.analytics.init(app.$cache[index].event_cat, app.$cache[index].event_action, eventLabel);
    },
    /**
     * @private
     * @function
     * @description Helper method to update the man or woman visibility
     *
     */
    _updatePosition: function(args1, args2) {
      $(args1).css('z-index', '5');
      $(args2).css('z-index', '4');
    },
    /**
     * @private
     * @function
     * @description finds the sibling
     * @param {object}
     *
     */
    _findNextElement: function(el) {
      return (el.attr('id') == 'man') ? $('#woman') : $('#man');
    },
    /**
     * @function
     * @description Utility method to retrive the target element from current event
     *
     */
    getTargetElement: function(e) {
      return $(e.target);
    },
    /**
     * @private
     * @function
     * @description Utility method to show or hide the object based on 'action'
     *
     * @param {Object}
     * @param {String}
     */
    _showHideContent: function(el, action) {
      $(el).find('.main-image').display(action);
      $(el).find('div[class*="man"]').display(action);
    },
    /**
     *
     * @function
     * @description binds careousel prev and next navigation with the buttons visibable
     * 				in the pages.
     *
     */
    paginate: function() {
      $('.fits a.prev, .fits a.next').click(function(e) {
        e.preventDefault();
        var className = $(this).attr('class'),
          $fitsParent = $(this).parents('.fits-type');
        $fitsParent.find('.jcarousel-' + className).click();
      });
      $('.wash-story a.prev, .wash-story a.next').click(function(e) {
        e.preventDefault();
        var className = $(this).attr('class'),
          $washParent = $(this).parents('.wash-types');
        $washParent.find('.jcarousel-' + className).click();
      });
    },
    /**
     * @function
     * @descrition handles the main navigation in mobile device
     *
     */
    navigateMobileHeader: function() {
      var $listingContainer = $('#denim-guide-product-listing'),
        $categories = $('.category-level1 li.main-category'),
        $currentcat,
        $lastLevelCat;
      if ($listingContainer.hasClass('is-dg-plp') && scriptIsmobile()) {
        $currentcat = $('#' + $('.current-denim-guide-category').data('pid'));
        $currentcat.removeClass('selected');
        $lastLevelCat = $currentcat.find('li.last-level-category');
        if ($lastLevelCat.length > 0) {
          $lastLevelCat.addClass('selected');
        }
      }
      $('.category-level1').off().on('click', '.current-denim-guide-category', function(e) {
        if ($(this).hasClass('active open')) {
          $(this).removeClass('active open');
          $categories.hide();
          $currentcat.removeClass('selected');
          return;
        } else {
          $(this).addClass('active open');
        }
        $categories.show();
        $currentcat.addClass('selected').find('ul').slideDown();
      });
    },
    /**
     * @function
     * @description hides main images in mobile devices
     *
     */
    updateOffsetMobile: function(args1, args2) {
      $(args1).width('100%').find('.main-image').display('hide');
      $(args2).width('0');
    },
    /**
     *
     * @function
     * @description binds hover events to the carousel images in product listing pages
     *
     */
    hightlightImage: function() {
      $('.category-images ul li .overlay').hover(function() {
        /*var parent = $(this).parent('li');
            	parent.css({'height': parent.outerHeight(), 'position': 'relative'}); */
        $(this).addClass('mouseover');
      }, function() {
        /*	var parent = $(this).parent('li');
            	parent.removeAttr('style'); */
        $(this).removeClass('mouseover');
      });
    },
    /**
     *
     * @function
     * @description apply overlay on mouse over in carousel image
     *
     */
    showOverlay: function() {
      var div = $('<div></div>');
      div.addClass('overlay');
      $('#man .col-1 img').hover(function() {
        $(this).parent().append(div);
      }, function() {
        $(this).parent().remove(div);
      });
    },
    /**
     *
     * @function
     * @description provides css ellipsis look and feel.
     *
     */
    applyTextOverflow: function() {
      if ($('.desc-text p').length > 1) {
        var $firstP = $('h4 + p', '.desc-text').first(),
          $lastP = $('h4 + p', '.desc-text').last();
        if ($firstP.text().length >= 266) {
          if ($firstP.text().length >= 336) $firstP.text($firstP.text().substring(0, 336) + '...');
          $lastP.hide();
          $('h4:last', '.desc-text').hide();
        }
        if ($lastP.text().length >= 50) {
          $lastP.text($lastP.text().substring(0, 50) + '...');
        }
      } else {
        $('.desc-text p:first').each(function() {
          if ($(this).text().length > 480) $(this).text($(this).text().substring(0, 480) + '...');
        });
      }
    },
    /**
     *
     * @function
     * @description navigation for fits in denim guide landing page
     *
     */
    selectFits: function(e) {
      var _this = this;
      e.preventDefault();
      var $selectedCategory = $(this).parents('li');
      categoryID = $selectedCategory.attr('id').split('_')[1],
        $currentCarouselWrapper = $('#navitem_' + categoryID),
        $allCategories = $selectedCategory.siblings(),
        $allCatWrappers = $currentCarouselWrapper.siblings('.fits-type');
      $allCategories.not($selectedCategory).removeClass('active');
      $selectedCategory.addClass('active');
      $allCatWrappers.not($currentCarouselWrapper).removeClass('active');
      $currentCarouselWrapper.addClass('active');
    },
    /**
     * @function
     * @private
     * @description set the google analytics data
     *
     */
    _trackUserClick: function(elem) {
      var $el = $(elem),
        userType = $el.closest('#woman').length > 0 ? 'woman' : 'man',
        $actualel = $el.prop('tagName') == 'img' ? $el.closest('.col-1') : $el,
        label = $actualel.data('ga-text');
      if (userType === 'woman') {
        this.setGoogleAnalytics(50, label);
      } else {
        this.setGoogleAnalytics(49, label);
      }
    },
    /**
     * @function
     * @private
     * @description capture the click event for wash story and fits in PLP
     * @param {Object}
     */
    _trackWashStoryOrFitsClick: function(elem) {
      var $el = $(elem),
        parent = $el.parent('li'),
        label = $el.html();
      index = parent.attr('id').indexOf('fits') >= 0 ? 53 : 51;
      this.setGoogleAnalytics(index, label);
    },
    /*
     *
     *
     */
    prepareKindleUI: function() {
      var _this = this,
        kindleBrowserSilk = /\bSilk\b/,
        kindleModel = /\bKFTT\b/,
        isKindle = false;
      if (kindleBrowserSilk.test(navigator.userAgent) && kindleModel.test(navigator.userAgent)) {
        isKindle = true;
      } else {
        return;
      }
      if (isKindle) {
        if ($('.desc-washes-backup').length === 0) {
          var $backup = $('<div class="hide desc-washes-backup"> </div>');
          $backup.html($('.desc-text').html());
          $('body').append($backup);
        }
        if ($(window).width() >= 800) {
          _this.applyTextOverflow();
        }
        $(window).resize(function() {
          if ($('#denim-guide').length > 0) {
            if ($(window).width() > 600) {
              _this.settings.passiveContent.width('50%');
              _this.settings.activeContent.width('50%');
              _this.settings.activeContent.find('.main-image').display('show');
            } else {
              _this.settings.activeContent.width('100%').find('.main-image').display('hide');
              _this.settings.passiveContent.width('0');
            }
          } else if ($('#denim-guide-product-listing').length > 0) {
            if ($(window).width() < 600) {
              _this.navigateMobileHeader();
              $('ul.category-level1 li.main-category').hide();
              $('.current-denim-guide-category').removeClass('active open');
            } else {
              $('ul.category-level2').hide();
              $('ul.category-level1 li.main-category').show();
              _this.settings.windowWidth = $(window).width();
              _this.configureCarousel();
              return;
            }
          }
        });
      }
    },
    kindleTextOverflowFix: function() {
      var _this = this,
        kindleBrowserSilk = /\bSilk\b/,
        kindleModel = /\bKFTT\b/,
        isKindle = false;
      if (kindleBrowserSilk.test(navigator.userAgent) && kindleModel.test(navigator.userAgent)) {
        var currentWidth = $(window).width();
        if ($('.desc-data-storage').length === 0) {
          var $dataBackup = $('<div class="hide desc-data-storage"> </div>');
          $dataBackup.html($('.desc-text').html());
          $('body').append($dataBackup);
        }
      } else {
        return;
      }
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * @class app.dynamicGrid
 */
(function(app, $) {
  app.cookies = {
    /**
     * @createCookie : create cookie object
     */
    createCookie: function(name, value, days) {
      var expires;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    /**
     * @createOrUpdateCookie : create cookie object
     */
    createOrUpdateCookie: function(name, value, days) {
      var expires;
      var maxAge;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
        maxAge = ";max-age=" + (days * 24 * 60 * 60);
      } else expires = "";
      document.cookie = name + "=" + value + expires + maxAge + "; path=/";
    },
    /**
     * @readCookie : read cookie object
     */
    readCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    /**
     * @eraseCookie : erase cookie object
     */
    eraseCookie: function(name) {
      createCookie(name, "", -1);
    },
    /**
     * @init : init object
     */
    init: function() {}
  };
}(window.app = window.app || {}, jQuery));
/**
 * 
 * Custom broser history to manage window back or forward button click 
 * 
 */
(function(app, $) {
  app.history = {
    step: 0,
    getStep: function() {
      return step;
    },
    setStep: function(x) {
      this.step = x;
    },
    push: function(state, title, url) {
      this.step = state.step;
      window.history.pushState(state, title, url);
    }
  };
}(window.app = window.app || {}, jQuery));
/**
 * 
 * Submit Newsletter subscription form
 * 
 */
(function(app, $) {
  app.newsletterForm = {
    clearNotification: function() {
      var that = $(this);
      that.closest('.newsletter').find('.response-success').remove();
      that.closest('.newsletter').find('.response-error').remove();
    },
    submit: function() {
      var url = $(this).attr('action'),
        data = $(this).serialize(),
        formData = $(this).serializeArray();
      _this = this;
      if (window.location.href.indexOf('https') > -1) {
        url = url.replace('JoinNewsLetter', 'JoinNewsLetterHttps');
        url = url.replace('http', 'https');
      }
      var textInputs;
      if (navigator.appVersion.match(/MSIE [\d.]+/)) {
        textInputs = $('input[type="text"]', $(this));
        textInputs.each(function() {
          DieselUS.ui.placeHolderFooter.removeDefautValue(this);
        });
      }
      if ($(_this).validate().form()) {
        app.ajax.load({
          url: url,
          data: data,
          context: this,
          callback: function(response) {
            var container = $(_this).closest('#footer,#footer-burger').length ? $(_this).closest('#footer,#footer-burger') : $('#subscription-overlay'),
              data = {};
            data = JSON.parse(response);
            container.find('.footer-content.newsletter .response-success').remove();
            container.find('.footer-content.newsletter .response-error').remove();
            if (data && data.success) {
              container.find('.footer-content.newsletter').append("<span class='response-success'>" + app.resources.SUBSCRIPTION_SUCCESS + "</span");
              if ($('#subscription-overlay').length && $('#subscription-overlay').is(':visible')) {
                app.cookies.createCookie('isSubscribed', true, 20 * 365);
                setTimeout(function() {
                  $('#subscription-overlay').dialog('close');
                }, 3000);
              }
              var i = 0;
              while (formData[i]) {
                if (formData[i].name === "gender") rtaSpecial = "Gender=" + formData[i].value;
                if (formData[i].name === "email") rtaEmail = formData[i].value;
                i++;
              }
              rtaRetailer = "diesel";
              rtaTags = "keepit";
              callRTA();
            } else {
              container.find('.footer-content.newsletter').append("<span class='response-error error'>" + app.resources.SUBSCRIPTION_FAILED + "</span");
            }
          }
        });
        app.analytics.init(app.$cache[4].event_cat, app.$cache[4].event_action, '');
      } else {
        if (navigator.appVersion.match(/MSIE [\d.]+/)) {
          textInputs.each(function() {
            DieselUS.ui.placeHolderFooter.assignDefaultValue(this);
          });
        }
      }
    }
  };
}(window.app = window.app || {}, jQuery));
// initialize app
jQuery(document).ready(function() {
  app.init();
  contentPlpSlotLink();
  $('.group .carousel-wrapper .product').siblings('.jcarousel-prev').css({
    'background-position': '0 -529px'
  });
  $('.group .carousel-wrapper .product').siblings('.jcarousel-next').css({
    'background-position': 'right -529px'
  });
  //minicart functionality to be shown registration .js
  $(document).on("allcartbutton", function(e, data) {
    app.minicart.show(data);
  });
});