/* JavaScript Module Pattern main scripting file *
 * @version 1.0
 * Modules are an integral piece of any robust application's architecture and typically 
   help in keeping the units of code for a project both cleanly separated and organized.
 */
var DieselUS = {};
DieselUS.ui = {
  /**
   * Created custom scrollbar mini cart and mini summary
   */
  scrollbar: {
    element: ".mini-cart-scroll",
    init: function() {
      if ($('.mobile-only').is(':visible')) {
        this.element = $('.mobile-only .mini-cart-scroll');
      } else if ($('.desktop-only').is(':visible')) {
        this.element = $('.desktop-only .mini-cart-scroll');
      }
      if ($(this.element).find('.mini-cart-product').length > 2) {
        $(this.element).tinyscrollbar();
      } else {
        $(this.element).find('.scrollbar').css('display', 'none');
        $(this.element).find('.viewport').css({
          'width': '100%',
          'height': 'auto'
        });
        $(this.element).find('.overview').css('position', 'relative');
      }
    }
  },
  /**
   * Created for toggle Pop up
   */
  toogelHeaderBanner: {
    element: "#header-banner-title",
    init: function() {
      var $promoContent = $('.top_header_promo_box');
      $('#header-banner-title').on('click', function(e) {
        e.preventDefault();
        if ($promoContent.css('display') === 'none') {
          DieselUS.ui.togglePopup.resetPopup();
          $promoContent.show();
        } else {
          $promoContent.hide();
        }
      });
      $promoContent.find('.header-popup-close').on('click', function(e) {
        e.preventDefault();
        $promoContent.hide();
      });
    }
  },
  /**
   * Created toggle Pop up social media
   */
  togglePopup: {
    element: "div#pdpMain",
    init: function() {
      this.socialMedia('.social-media-link', '.share-media-bottom');
      this.socialMedia('.social-media-link-mobile', '.share-media-bottom');
      this.socialMedia('.social-media-link-sbl', '.share-media-bottom');
      this.socialMedia('#social-media-top', '.share-media-top');
      $('.social-media-dialog .popup-close').on('click', function() {
        $(this).closest('.social-media-dialog').addClass('hide');
        $(this).closest('.social-media-dialog').prev().find(".social-media-link").removeClass("share-close");
        $(".show-only-media-dialog").removeClass("show-only-media-dialog");
      });
    },
    socialMedia: function(link, wrapper) {
      $(document).off('click', link);
      $(document).on('click', link, function(e) {
        e.preventDefault();
        var ele = wrapper;
        $('.social-media-dialog').not($(ele)).addClass('hide');
        if (wrapper == '.share-media-bottom') {
          if (link == '.social-media-link-mobile') {
            $(".product-detail").addClass("show-only-media-dialog");
          } else if (link == '.social-media-link-sbl') {
            ele = $($(this).parents('.product-set-content')).find(wrapper);
          } else {
            ele = $($(this).closest('.product-add-to-cart')).find(wrapper);
            $(".product-detail").removeClass("show-only-media-dialog");
          }
        }
        if ($(ele).hasClass('hide')) {
          $(ele).removeClass('hide');
          $(this).addClass("share-close");
        } else {
          $(ele).addClass('hide');
          $(this).removeClass("share-close");
        }
        return false;
      });
    },
    resetPopup: function() {
      $('.header-popup-close').each(function(k) {
        if ($(this).show()) {
          $(this).trigger('click');
        }
      });
    }
  },
  /**
   * Swatch color hide arrow and default selected color
   */
  swatchColorSelected: {
    element: "div.pdp-main",
    init: function() {
      this.colorSwatchArrow();
      this.selectedDefaultColor();
      if ($(".mobile-strip-product .color-btn.btn-active-close").length === 1) {
        $(".mobile-strip-product .color-btn.btn-active-close").trigger('click');
      }
    },
    /**
     * Selected Default swatch Color
     */
    selectedDefaultColor: function() {
      if ($('ul.color-slides li').length === 1) {
        $("ul.color-slides li").trigger('click');
      }
    },
    /**
     * Selected Default swatch Color
     */
    colorSwatchArrow: function() {
      if ($(this.element).parents('#QuickViewDialog').length > 0) {
        $('.swatch-wrapper').each(function(key, val) {
          if ($(val).find('ul.color-slides li').length > 3) {
            $($(val).find('a.sprite-icon')).removeClass('hide');
          }
        });
      } else {
        if ($('body').width() <= 810 || app.device.is('ipad')) {
          $('.swatch-wrapper').each(function(key, val) {
            if ($(val).find('ul.color-slides li').length > 3) {
              $($(val).find('a.sprite-icon')).removeClass('hide');
            }
          });
        } else if ($('body').width() >= 1000) {
          $('.swatch-wrapper').each(function(key, val) {
            if ($(val).find('ul.color-slides li').length > 4) {
              $($(val).find('a.sprite-icon')).removeClass('hide');
            }
          });
        }
      }
    }
  },
  /**
   * Count length of SBL main Item selected
   */
  selectedSblItem: {
    element: "div.pdp-main",
    init: function() {
      this.arrowSelectedSblItem();
    },
    arrowSelectedSblItem: function() {
      var wrapper = $('.shop-by-look-slider-wrapper'),
        wrapperWidth = wrapper.width(),
        findList = $(wrapper.find('.jcarousel-prev, .jcarousel-next'));
      switch (wrapperWidth) {
        case 1280:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 15) {
            findList.addClass('hide');
          }
          break;
        case 1024:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 12) {
            findList.addClass('hide');
          }
          break;
        case 802:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 10) {
            findList.addClass('hide');
          }
          break;
        case 768:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 9) {
            findList.addClass('hide');
          }
          break;
        case 568:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 7) {
            findList.addClass('hide');
          }
          break;
        case 534:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 6) {
            findList.addClass('hide');
          }
          break;
        case 320:
          if (wrapper.find('ul.shop-by-look-slider li').length <= 4) {
            findList.addClass('hide');
          }
          break;
        default:
          if (wrapperWidth >= 800 && $('body').width() <= 802) {
            if (wrapper.find('ul.shop-by-look-slider li').length <= 10) {
              findList.addClass('hide');
            }
          } else if (wrapperWidth >= 530 && $('body').width() <= 540) {
            if (wrapper.find('ul.shop-by-look-slider li').length <= 6) {
              findList.addClass('hide');
            }
          }
      }
    }
  },
  /**
   * Hide Arrow on more of this and complete by arrow
   */
  hideCarouselArrow: {
    element: "div.recommendations",
    init: function() {
      this.removeArroows();
      var _this = this;
      $(window).resize(function() {
        _this.removeArroows();
      });
    },
    removeArroows: function() {
      var sliderContainer = $('.more-this-wrapper, .recommendations-wrapper'),
        sliderLength = 'ul.more-this-slider>li, ul.reco-slider>li',
        sliderNextArrow = '.jcarousel-next',
        sliderPrevArrow = '.jcarousel-prev';
      sliderContainer.each(function(key, val) {
        if ($(val).find(sliderNextArrow).hasClass('jcarousel-next-disabled') && $(val).find(sliderPrevArrow).hasClass('jcarousel-prev-disabled')) {
          $($(val).find(sliderNextArrow)).addClass('hide');
          $($(val).find(sliderPrevArrow)).addClass('hide');
        } else {
          $($(val).find(sliderNextArrow)).removeClass('hide');
          $($(val).find(sliderPrevArrow)).removeClass('hide');
        }
      });
    }
  },
  /**
   * Created two div container in equal height
   */
  equalHeight: {
    element: "div#pdpMain",
    init: function(newElement) {
      var _this = this;
      if (newElement) {
        this.element = newElement;
      }
      if ($('body').width() > 767) {
        this.enableEqualHeight();
      } else {
        this.dissableEqualHeight();
      }
      $(window).resize(function() {
        if (newElement) {
          _this.element = newElement;
        }
        if ($('body').width() > 767) {
          _this.enableEqualHeight();
        } else {
          _this.dissableEqualHeight();
        }
      });
      if (window.DeviceOrientationEvent) {
        window.addEventListener('orientationchange', function(eventData) {
          if (newElement) {
            _this.element = newElement;
          }
          if ($('body').width() > 767) {
            _this.enableEqualHeight();
          } else {
            _this.dissableEqualHeight();
          }
        });
      }
    },
    equalHeightLogic: function() {
      setTimeout(function() {
        $(".product-col-1").each(function(key, val) {
          $($(".product-col-2")[key]).removeAttr('style');
          $($(".product-col-1")[key]).removeAttr('style');
          var leftHeight = $($(".product-col-1")[key]).outerHeight(),
            rightHeight = $($(".product-col-2")[key]).outerHeight();
          if (leftHeight > rightHeight) {
            $($(".product-col-2")[key]).height(leftHeight);
          } else {
            $($(".product-col-1")[key]).height(rightHeight);
          }
        });
      }, 500);
    },
    enableEqualHeight: function() {
      var _this = this;
      $(".product-col-1").each(function(key, val) {
        $($(val).find('.primary-image')[0]).load(function() {
          _this.equalHeightLogic();
        });
      });
      $(window).resize(function() {
        $(".product-col-2").removeAttr('style');
        $(".product-col-1").removeAttr('style');
        if ($(window).width() > 767) {
          _this.equalHeightLogic();
        }
      });
      $('.product-slider li').find('img').attr("src", $('.product-slider li').find('img').attr("src"));
    },
    dissableEqualHeight: function() {
      $('.product-col-1').css('height', 'auto');
      $('.product-col-2').css('height', 'auto');
    }
  },
  /**
   * On mobile making prCreated two div container in equal height
   */
  alineTop: {
    element: "div.pdp-main-wrapper",
    init: function() {
      var _this = this;
      if ($('body').width() < 768) {
        this.viewImage();
      }
      $(window).resize(function() {
        if ($(window).width() < 768) {
          _this.viewImage();
        }
      });
      if (window.DeviceOrientationEvent) {
        window.addEventListener('orientationchange', function(eventData) {
          if ($('body').width() < 768) {
            _this.viewImage();
          }
        });
      }
    },
    viewImage: function() {
      if (!$('.product-set-container').length) {
        var height = parseInt($('.product-content-header').outerHeight()) + "px";
        $('.product-overflow-image').css('height', $($('.product-col-1 .primary-image')[0]).outerHeight());
        setTimeout(function() {
          $('.product-col-1').css({
            'height': $($('.product-col-1 .primary-image')[0]).outerHeight(),
            top: height
          });
        }, 100);
        $($('.product-col-1 .primary-image')[0]).load(function() {
          $('.product-overflow-image').css('height', $($('.product-col-1 .primary-image')[0]).outerHeight());
          $('.product-col-1').css({
            'height': $($('.product-col-1 .primary-image')[0]).outerHeight(),
            top: height
          });
        });
      }
    }
  },
  /**
   * More of this tab is hidden if more of this empty
   */
  emptyContainer: {
    element: "div.recommendations div.more-this",
    init: function() {
      $(".more-this-wrapper").each(function(key, val) {
        if ($(val).children().length === 0) {
          var hideEle = $($(val).parents('li.tablist')).find('.morethis-tab');
          $(hideEle).addClass('hide');
        } else {
          if (!$($(val).prev('.tablist')).is(':visible') && $($(val).prev('.tablist')).length) {
            setTimeout(function() {
              $($(val).parent('li.tablist').find('a')[0]).click();
            }, 100);
          }
        }
      });
      if ($('li.tablist:visible').length == 1) {
        $('li.tablist').removeClass('second');
        $('li.tablist').removeClass('sprite-icon');
        $('a.morethis-tab').removeClass('morethis-selected').addClass('morethis-selected');
        $('.more-this-wrapper').removeClass('show').addClass('show');
      }
      if ($('.more-this-wrapper').children().length === 0) {
        $('#tabbingSlider').addClass('hide');
      }
    }
  },
  emptyrightcolum: {
    element: "div.cart-secondary.last-child",
    init: function() {
      var hideEle = $("div.cart-secondary.last-child");
      if (hideEle.children().length === 0) {
        hideEle.addClass('hide');
      }
    }
  },
  /**
   * Created tabbing in product detail page
   */
  tabbing: {
    element: "div.product-discription-tab div.product-discription",
    init: function() {
      var _this = this;
      if ($('body').width() > 767) {
        this.tabSlider('a.tab', 'ul.discription-list', 'selected'); // product discription tab
        this.tabSlider('a.morethis-tab', '.more-this-wrapper', 'morethis-selected'); // More of Thi
      } else {
        this.accordianTabs();
      }
      $(window).resize(function() {
        if ($('body').width() > 767) {
          _this.tabSlider('a.tab', 'ul.discription-list', 'selected'); // product discription tab
          _this.tabSlider('a.morethis-tab', '.more-this-wrapper', 'morethis-selected'); // More of Thi
        } else {
          _this.accordianTabs();
        }
      });
      if (window.DeviceOrientationEvent) {
        window.addEventListener('orientationchange', function(eventData) {
          if ($('body').width() > 767) {
            _this.tabSlider('a.tab', 'ul.discription-list', 'selected'); // product discription tab
            _this.tabSlider('a.morethis-tab', '.more-this-wrapper', 'morethis-selected'); // More of Thi
          } else {
            _this.accordianTabs();
          }
        });
      }
    },
    tabSlider: function(tab, wrapper, selected) {
      if ($('#tabbing').hasClass('mobile')) {
        $('ul.detail-discription li ul').removeAttr("style");
        $('ul.detail-discription li a').removeClass("selected");
        $($('ul.detail-discription li ul')[0]).addClass('show');
        $($('ul.detail-discription li ul')[0]).removeAttr('style');
        $($('ul.detail-discription li a')[0]).addClass('selected');
      }
      $('#tabbing').removeClass('mobile');
      $(tab).off('click').on('click', function(e) {
        e.preventDefault();
        var curElement = $(this);
        $(tab).removeClass(selected);
        curElement.addClass(selected);
        $(wrapper).removeClass('show');
        curElement.parent("li").find(wrapper).addClass('show');
        curElement.parent("li").find(wrapper).removeClass('hide');
      });
    },
    /**
     * Converted tab into accordian
     */
    accordianTabs: function() {
      if (!$('#tabbing').hasClass('mobile')) {
        $('ul.detail-discription li ul').removeClass('show');
        $('ul.detail-discription li a').removeClass('selected');
      }
      $('#tabbing').addClass('mobile');
      $('a.tab').off('click').on('click', function(e) {
        e.preventDefault();
        $('ul.discription-list').not($(this).siblings()).slideUp('slow');
        $(this).toggleClass('selected').siblings().slideToggle("slow");
        $('a.tab').not($(this)).removeClass('selected');
      });
    }
  },
  /**
   * product detail trigger on mobile
   */
  productDetailClick: {
    element: "div.product-view-detail",
    init: function() {
      if (!$('.product-set-container')[0] && scriptIsmobile()) {
        $("a.link-text").off('click').on('click', function() {
          $($('.detail-discription li a')[0]).click();
        });
      }
    }
  },
  /**
   * Checking empty tab in product detail page
   */
  pdpEmptyStyleWash: {
    element: ".detail-discription li",
    init: function() {
      $(this.element).each(function(key, val) {
        if (!$($(val).find('.detail-content .pdp-sprite-icon')).length) {
          $(val).remove();
        }
      });
      setTimeout(function() {
        if (!$('#tabbing li').length) {
          $('#tabbing').addClass('hide');
          $(".product-view-detail").hide();
        }
        if ($('body').width() > 767) {
          $(".detail-discription li:first a:first").trigger('click');
        }
      }, 100);
    }
  },
  /**
   * For navigation fly out
   */
  navigationFlyout: {
    element: "#navigation",
    init: function() {
      //this.colorChange('s-dieselblackgold', 'dieselblackgold-bg1', 'dieselblackgold-bg2', 'dieselblackgold-arr2');
      this.colorChange('s-catflytemp3', 's-55dsl-bg1', 's-55dsl-bg2', 's-55dsl-arr2');
      this.colorChange('s-catflytemp4', 'kids-bg1', 'kids-bg2', 'kids-arr2');
      this.setNavCarousel();
      this.setFeatureClickable();
      var that = this;
      $(window).resize(function() {
        that.setNavCarousel();
      });
      var salesubCatSec = $('.s-sale .sub-category-list').length;
      switch (salesubCatSec) {
        case 1:
          $('.s-sale .sub-category-list:eq(0)').addClass('first').removeClass('last').removeClass('third');
          break;
        case 2:
          $('.s-sale .sub-category-list:eq(0)').addClass('first');
          $('.s-sale .sub-category-list:eq(1)').addClass('third').removeClass('last');
          break;
        case 3:
          $('.s-sale .sub-category-list:eq(0)').addClass('first');
          $('.s-sale .sub-category-list:eq(2)').addClass('third').removeClass('last');
          break;
      }
    },
    setNavCarousel: function() {
      var wrapperWidth = $('#wrapper').width();
      $('.top-banner-custom .top-cat-custom').css('width', wrapperWidth / 2 + 'px');
      $('.custom.top-banner-custom .banner-container li').css('width', ((wrapperWidth / 100) * 50) + 'px');
      var $dataHolder = $('.top-banner-custom .banner-content'),
        paddLeft = parseInt($dataHolder.css('padding-left')),
        paddRight = parseInt($dataHolder.css('padding-right'));
      dataHolderWidth = (wrapperWidth / 2) - $('.top-banner-custom ul li img').width() - paddLeft - paddRight;
      $('.top-banner-custom .banner-content').css('width', dataHolderWidth + 'px');
      //app.util.setCarousel({sliderid: '#top-man-slider-dieselblackgold',sliderwrapper: '#top-man-custom-dieselblackgold',slide: '.banner-first #top-man-slider-dieselblackgold li',nav:true,height: 140,minli: 2});
      //app.util.setCarousel({sliderid: '#top-woman-slider-dieselblackgold',sliderwrapper: '#top-woman-custom-dieselblackgold',slide: '#top-woman-slider-dieselblackgold li',nav:true,height: 140,minli: 2});
      $('#navigation').find('.horizantal-custom').each(function() {
        var sliderWrapper = $(this).attr('id');
        var slider = $(this).find('.horizantal-slider').attr('id');
        if ($(this).hasClass("diesel-denim-carousel")) {
          app.util.setCarousel({
            sliderid: '#' + slider,
            sliderwrapper: '#' + sliderWrapper,
            slide: '#' + slider + ' li',
            scroll: 5,
            minli: 4,
            isFixed: true,
            multiple: 2,
            height: 90
          });
        } else {
          app.util.setCarousel({
            sliderid: '#' + slider,
            sliderwrapper: '#' + sliderWrapper,
            slide: '#' + slider + ' li',
            scroll: 5,
            minli: 4,
            isFixed: true,
            multiple: 3,
            height: 90
          });
        }
      });
      $('#navigation').find('.navigation-slider-wrapper').each(function() {
        var sliderWrapper = $(this).attr('id');
        var slider = $(this).find('.navigation-slider').attr('id');
        app.util.setCarousel({
          sliderid: '#' + slider,
          sliderwrapper: '#' + sliderWrapper,
          slide: '#' + slider + ' li',
          nav: true,
          height: 140,
          minli: 2
        });
      });
      var lifestyleminli = 0,
        lifestylescrl = 3;
      if ($(window).width() < 1270 || $('body').hasClass("layout1024")) {
        lifestylescrl = 3;
        lifestyleminli = 4;
      } else {
        lifestylescrl = 4;
        lifestyleminli = 5;
      }
      app.util.setCarousel({
        sliderid: '#slider-lifestyle',
        sliderwrapper: '#custom-lifestyle',
        slide: '#slider-lifestyle li',
        scroll: lifestylescrl,
        minli: lifestyleminli,
        isFixed: true,
        multiple: lifestylescrl,
        height: 210
      });
    },
    colorChange: function(cat, class1, class2, arr2) {
      that = this;
      var $ele3 = $("." + cat + ' .top-banner-custom .banner-first');
      var $ele4 = $("." + cat + ' .top-banner-custom  .banner-last');
      var $ele5 = $("a.level-1 div." + cat);
      $(".level-2." + cat).on('mousemove', function(e) {
        var winWidth = $(window).width() / 2;
        if (e.pageX < winWidth) {
          that.toggleColor($ele3, $ele4, $ele5, class1, class2, arr2, 0);
        } else {
          that.toggleColor($ele4, $ele3, $ele5, class1, class2, arr2, 1);
        }
      });
    },
    toggleColor: function($ele3, $ele4, $ele5, class1, class2, arr2, arrSt) {
      $ele3.removeClass(class2).addClass(class1);
      $ele4.removeClass(class1).addClass(class2);
      if (arrSt == 1) {
        $ele5.addClass(arr2);
      } else {
        $ele5.removeClass(arr2);
      }
    },
    setFeatureClickable: function() {
      setTimeout(function() {
        var container = ['s-catflytemp2', 's-catflytemp3', 's-catflytemp4'],
          conlen = container.length,
          banner = ['banner-first', 'banner-last'],
          banlen = banner.length;
        for (var i = 0; i < conlen; i++) {
          for (var j = 0; j < banlen; j++) {
            $('.' + container[i] + ' .top-banner-custom .' + banner[j] + ' li').each(function(key, val) {
              var mainCat = $(val).find('.category-title a'),
                subCat = $(val).find('a.sub-category'),
                target = '';
              if (subCat.html() !== null && !subCat.hasClass("unclickable")) {
                target = subCat.attr('href');
              } else if (mainCat && !mainCat.hasClass("unclickable")) {
                target = mainCat.attr('href');
              }
              if (target !== '') {
                $(val).css('cursor', 'pointer');
                $(val).on('click', function() {
                  window.location = target;
                });
              }
            });
          }
        }
      }, 1000);
    }
  },
  /**
   * Search Menu
   */
  searchMenu: {
    element: "div.header-search",
    init: function() {
      this.setToggle('searchMenu', 'search-options', 'header-search-selected');
      this.setToggle('error-searchMenu', 'error-search-options', 'error-search-selected');
    },
    setToggle: function(triggerid, optionid, selectedid) {
      $('#' + triggerid).parent().on('click', function(e) {
        e.preventDefault();
        if ($('#' + optionid).css('display') == 'none') {
          $('#' + optionid).slideDown('fast');
        } else {
          $('#' + optionid).slideUp('fast');
        }
      });
      $('#' + optionid + ' li').on('click', function(e) {
        e.preventDefault();
        app.cookies.createCookie('searchOption', $(this).find('a').html(), 0);
        $('#' + selectedid).html($(this).find('a').html());
        $('#' + optionid).hide();
      });
    },
    reset: function() {
      $('#search-options').hide();
      var searchOption = app.cookies.readCookie('searchOption');
      if (!searchOption) $('#header-search-selected').html('Man');
    }
  },
  /**
   * Using this function for ellipsis content
   */
  ellipsisContent: {
    element: "div.product-discription",
    variations: [0, 400, 120, 60],
    init: function() {
      var _this = this;
      if ($('body').width() > 767) {
        var tabs = $('.detail-discription .discription-list');
        $(tabs).each(function() {
          _this.ellipsisParagraph(this);
        });
      }
      $(window).resize(function() {
        if ($('body').width() > 767) {
          var tabs = $('.detail-discription .discription-list');
          $(tabs).each(function() {
            _this.ellipsisParagraph(this);
          });
        }
      });
      if (window.DeviceOrientationEvent) {
        window.addEventListener('orientationchange', function(eventData) {
          if ($('body').width() > 767) {
            var tabs = $('.detail-discription .discription-list');
            $(tabs).each(function() {
              _this.ellipsisParagraph(this);
            });
          }
        });
      }
    },
    // Using switch case Checking Paragraph length
    ellipsisParagraph: function(tab) {
      var pCount = $(tab).find('p').length,
        strText = $(tab).find('span.para-content');
      switch (pCount) {
        case 1:
          this.ellipsisParaContent(1, strText);
          break;
        case 2:
          this.ellipsisParaContent(2, strText);
          break;
        case 3:
          this.ellipsisParaContent(3, strText);
          break;
        default:
      }
    },
    // Using Paragraph word and adding Read More
    ellipsisParaContent: function(pCount, strText) {
      var _this = this,
        filterText = 'REASON TO WEAR',
        /*  Hard coded string to fix current issue*/
        isDenimStyle = strText.text().toLowerCase().indexOf(filterText.toLowerCase()) > 0;
      console.log(strText.text());
      strText.each(function(key, val) {
        var filter,
          tag;
        if ($(val).text().replace(/\s{2,}/g, ' ').length > _this.variations[pCount]) {
          $(val).text($(val).text().replace(/\s{2,}/g, ' ').substr(0, _this.variations[pCount]) + "...");
          $(val).parent().find('span.read-more').addClass('show-inline');
          $(val).parent().find('span.read-more').removeClass('hide');
          if (isDenimStyle) {
            filter = $(val).text().split(filterText);
            tag = '<br/>' + filter[0];
            tag = filter.length == 2 ? tag + '<br/><br/>' + filterText + filter[1] : tag;
            $(val).html(tag);
          }
        }
      });
    }
  },
  /**
   * Using this function for denimguide product description
   */
  ellipsisContentDG: {
    element: "#denim-guide .denim-carousel",
    variations: [0, 112, 120, 60],
    init: function() {
      var _this = this;
      var tabs = $('.denim-carousel .description');
      $(tabs).each(function() {
        _this.ellipsisParagraph(this);
      });
      $(window).resize(function() {
        var tabs = $('.denim-carousel .description');
        $(tabs).each(function() {
          _this.ellipsisParagraph(this);
        });
      });
      if (window.DeviceOrientationEvent) {
        window.addEventListener('orientationchange', function(eventData) {
          var tabs = $('.denim-carousel .description');
          $(tabs).each(function() {
            _this.ellipsisParagraph(this);
          });
        });
      }
    },
    // Using switch case Checking Paragraph length
    ellipsisParagraph: function(tab) {
      var pCount = $(tab).find('p.paragraph').length,
        strText = $(tab).find('span.para');
      switch (pCount) {
        case 1:
          this.ellipsisParaContent(1, strText);
          break;
        case 2:
          this.ellipsisParaContent(2, strText);
          break;
        case 3:
          this.ellipsisParaContent(3, strText);
          break;
        default:
      }
    },
    // Using Paragraph word and adding Read More
    ellipsisParaContent: function(pCount, strText) {
      var _this = this,
        filterText = 'REASON TO WEAR',
        /*  Hard coded string to fix current issue*/
        isDenimStyle = strText.text().toLowerCase().indexOf(filterText.toLowerCase()) > 0;
      console.log(strText.text());
      strText.each(function(key, val) {
        var filter,
          tag;
        if ($(val).text().replace(/\s{2,}/g, ' ').length > _this.variations[pCount]) {
          $(val).text($(val).text().replace(/\s{2,}/g, ' ').substr(0, _this.variations[pCount]) + "...");
          $(val).parent().find('span.dg-read-more').addClass('show-inline');
          $(val).parent().find('span.dg-read-more').removeClass('hide');
          if (isDenimStyle) {
            filter = $(val).text().split(filterText);
            tag = '<br/>' + filter[0];
            tag = filter.length == 2 ? tag + '<br/><br/>' + filterText + filter[1] : tag;
            $(val).html(tag);
          }
        }
      });
    }
  },
  /**
   * Created two div in equal height for login
   */
  loginboxEqualHeight: {
    element: "div.account-login",
    init: function() {
      if ($('body').width() > 768) {
        this.enableEqualHeight();
      } else {
        this.dissableEqualHeight();
      }
    },
    enableEqualHeight: function() {
      var leftHeight = $(".account-login .col-1").outerHeight(),
        rightHeight = $(".account-login .col-2").outerHeight();
      if (leftHeight > rightHeight) {
        $(".account-login .col-2").height(leftHeight);
      } else {
        $(".account-login .col-1").height(rightHeight);
      }
    },
    dissableEqualHeight: function() {
      $('.account-login .col-1').css('height', 'auto');
      $('.account-login .col-2').css('height', 'auto');
    }
  },
  /**
   * Responsive Header
   */
  responsiveHeader: {
    element: "#wrapper",
    init: function(e) {
      $('#mobile-nav-myaccount').on('click', function(e) {
        e.preventDefault();
        DieselUS.ui.responsiveHeader.reset($(this).attr('data-target'));
        $('.myaccount-mobile-child').slideToggle('slow');
        $('.header-account-arrow').slideToggle('slow');
        $('.diesel-mobile-account').toggleClass('selected');
        $('#header-search-icon').removeClass('icon-selected');
      });
    },
    reset: function(_selected) {
      if (_selected && _selected !== 'undefined') {
        $('.mobile-top-nav > div').each(function(e) {
          if ($(this).attr('data-target') != 'undefined' && $(this).attr('data-target') !== _selected) {
            $(this).children('span.sprite-icon').hide();
            $($(this).attr('data-target')).hide();
          } else {
            $('#header-search-icon').toggleClass('icon-selected');
          }
        });
      }
    }
  },
  /**
   * Header Bottom Banner
   */
  headerBotBanner: {
    element: ".header-bottom-promo",
    init: function() {
      var elem = $(this.element),
        popup = $(elem).find('.header-banner-popup');
      popup.find('.promo-item').each(function() {
        if ($(this).children().length === 0) {
          if ($(this).is(':last-child')) {
            $(this).prev().addClass('last');
          }
          $(this).remove();
        }
      });
      $('.header-bottom-promo .navs td').on('hover', function() {
        $('.header-bottom-promo .navs td.selected').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.header-bottom-promo .navs td').on('mouseleave', function() {
        $(this).removeClass('selected');
        if ($(this).hasClass('two-contents')) {
          $(this).siblings(':visible').addClass('selected');
        } else {
          $('#header-bottom-promo-2').addClass('selected');
        }
      });
      $('.header-bottom-promo .navs td').on('click', function(e) {
        e.preventDefault();
        /*    var showHTML = $(this).find('ul').html();
            $('#header-bottom-banner-content').html(showHTML); */
        DieselUS.ui.togglePopup.resetPopup();
        popup.show();
      });
      $('#header-bot-popup-close').on('click', function(e) {
        e.preventDefault();
        $('#header-bot-banner-popup').hide();
      });
      var emptyLiCount = 0;
      for (i = 1; i <= 3; i++) {
        if ($('#header-bottom-promo-' + i).find('ul').size() === 0) {
          emptyLiCount++;
          if ($('#header-bottom-promo-' + i).hasClass('selected')) $('#header-bottom-promo-' + i).next().addClass('selected');
          $('#header-bottom-promo-' + i).hide();
        }
      }
      if (emptyLiCount == 2) {
        $('.header-bottom-promo .navs td.slots').addClass('single-contents');
      } else if (emptyLiCount == 1) {
        $('.header-bottom-promo .navs td.slots').addClass('two-contents');
      }
    }
  },
  /**
   * Footer place holder
   */
  placeHolderFooter: {
    element: "div#footer,div#footer-burger",
    initData: {
      placeholderEmail: 'EMAIL ADDRESS',
      placeholderZip: 'ZIP CODE'
    },
    init: function() {
      if (navigator.appVersion.match(/MSIE [\d.]+/)) {
        var that = this;
        $('.news-lett-email').val(this.initData.placeholderEmail);
        $('.news-lett-zip').val(this.initData.placeholderZip);
        $('.news-lett-email').addClass('custome-placeholder');
        $('.news-lett-zip').addClass('custome-placeholder');
        $('.news-lett-email, .news-lett-zip').blur(function() {
          that.assignDefaultValue(this);
        });
        $('.news-lett-email, .news-lett-zip').focus(function() {
          that.removeDefautValue(this);
        });
      }
    },
    assignDefaultValue: function(that) {
      if ($(that).val() === '') {
        $(that).val(this.getDefaultValue(that));
        $(that).addClass('custome-placeholder');
      } else {
        return false;
      }
    },
    removeDefautValue: function(that) {
      if ($(that).val() == this.getDefaultValue(that)) {
        $(that).val('');
        $(that).removeClass('custome-placeholder');
      } else {
        return false;
      }
    },
    getDefaultValue: function(type) {
      return (($(type).prop('name') == 'email') ? this.initData.placeholderEmail : this.initData.placeholderZip);
    }
  },
  /**
   * Single click on submit button
   */
  singleClick: {
    element: "div.mini-summary-wrapper div.orders-submit-wrapper",
    init: function() {
      if ($('body').width() < 810) {
        $('.orders-submit-wrapper .submit-order').on('submit', function() {
          $($(this).find('button.btn-full-width')).attr('disabled', 'disabled');
        });
      }
    }
  },
  /**
   * Floating nav
   * 
  floatingNav: {
      element: "div.floating-nav",
      init: function () {
          var _this = this;
          var navTop = this.element.offset().top;
          var isHeaderSticked = false;
           $(window).scroll(function(e) {
              if ($(window).scrollTop()  > navTop ) {
                  if(!isHeaderSticked) {
                      _this.element.addClass('floating');
                      _this.element.css('width',$('#wrapper').width());
                      isHeaderSticked = true;
                  }
              }else{
                  if(isHeaderSticked) {
                      _this.element.removeClass('floating');
                      _this.element.removeAttr('style');
                      isHeaderSticked = false;
                  }
              }
          });
      }
  }, 
    
  */
  /**
   * Validate wishlist page if the value is 0 or nagetive number
   */
  disableUpdate: {
    element: "div.item-list div.wishlist-row",
    init: function() {
      this.checkQuantity('.update-item', '.option-quantity-desired .input-text');
    },
    checkQuantity: function(updateLink, quantityDesired) {
      $(updateLink).each(function() {
        var _parent = $(this).parent().parent();
        $(this).on('click', function(e) {
          var qty = $(_parent).find(quantityDesired);
          if (qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) <= 0) {
            qty.val("1");
          }
        });
      });
    }
  },
  /**
   * leftNavCheck : check cookies and other conditions
   */
  leftNavCheck: {
    element: '#search-result',
    init: function() {
      var searchfilter = app.cookies.readCookie('searchfilter');
      var datalayout = $('#search-result').attr('data-layout');
      var refinementscount = $('#secondary .refinement').length;
      var pdCount = parseInt($('#TotalProductCountOnLoad').val());
      if (datalayout !== 'denim' && refinementscount) {
        if (searchfilter && searchfilter == 'hide') {
          $('#secondary').hide();
          $('.search-result-options .refinements-filter').show();
          $('#primary').removeClass('default-column');
          $('#primary').addClass('full-width');
        } else if (searchfilter && searchfilter == 'show') {
          $('#secondary').show();
          $('.search-result-options .refinements-filter').hide();
          $('#primary').removeClass('full-width');
          $('#primary').addClass('default-column');
        }
      }
      if (!refinementscount || pdCount === 1 || $('.refinements .refinement ul li').length === 0) {
        $('.search-result-options .refinements-filter').hide();
        $('#primary').removeClass('default-column');
        $('#primary').addClass('full-width');
      }
      if (pdCount === 1 || $('.refinements .refinement ul li').length === 0) {
        $('#secondary .refinements-filter').hide();
        $('.refinements .refinement').hide();
        $('.refinements .denim-guid-wrapper').hide();
      }
      $('.refinement h3.toggle.expanded').next('ul').hide();
      if ($('body').hasClass('cat-dieselblackgold') && $('#search-result').attr('data-layout') == 'denim') {
        //Denim DBG
      } else {
        $('.refinement h3.toggle').each(function(k, val) {
          if ($(this).parent().css('display') === 'block') {
            $(this).removeClass('expanded').next('ul').show();
            return false;
          }
        });
      }
    }
  },
  /**
   * Validate wishlist page if the value is 0 or nagetive number
   */
  shopbylookShareMedia: {
    element: "div.pdp-share-link",
    init: function() {
      if ($('body').width() < 767) {
        $(".share").on('click', function(e) {
          e.preventDefault();
          $(this).parents('.product-set-container').css('z-index', 11);
          $(this).parents('.product-set-container').siblings('.product-set-container').removeAttr('style');
        });
        $(".popup-close").on('click', function(e) {
          e.preventDefault();
          $(this).parents('.product-set-container').removeAttr('style');
        });
      }
    }
  },
  /**
   * Diesel Black Gold hover effects
   */
  hoverDgbNavigation: {
    element: "body",
    init: function() {
      $("div.level-2 .sub-category-list").bind('mouseenter', function() {
        $(this).removeClass("inactive").addClass("active");
        $(this).prev().removeClass("active").addClass("inactive");
        $(this).next().removeClass("active").addClass("inactive");
      });
      // this.hoverEffect();
      //        	$('.s-catflytemp2 .features').each(function(key,val){
      //        		 if(!$(val).find('li').length){
      //        			 $(val).closest('li').hide();
      //        		 }
      //        	});
    },
    //        hoverEffect: function () {
    //            var _this               = this;
    //                mainFirstNav       = $('.s-catflytemp2 .sub-category-list.first, .s-catflytemp2 .banner-first'),
    //                dbGoldArrow        = $('a.level-1 div.s-catflytemp2'),
    //                manMainNav         = $('.s-catflytemp2 .sub-category-list.first'),
    //                featureFirstNav    = $('.s-catflytemp2 .banner-first'),
    //                mainLastNav        = $('.s-catflytemp2 .sub-category-list.last, .s-catflytemp2 .banner-last'),
    //                womanMainNav       = $('.s-catflytemp2 .sub-category-list.last'),
    //                featureLastNav     = $('.s-catflytemp2 .banner-last'),
    //                dbGoldNavigation   = $('a.level-1 span.s-catflytemp2,a.level-1 div.s-catflytemp2'),
    //                dgbPromotion       = $('.s-catflytemp2 .dgb-custombanner');
    //
    //            
    //            dbGoldNavigation.on('mouseenter touchstart',function(e){
    //                _this.addActiveToFirst();
    //            });
    //            
    //            dgbPromotion.on('mouseenter touchstart',function(e){
    //                _this.addActiveToFirst();
    //            });
    //            
    //            mainFirstNav.on('mouseenter toushstart',function(e){
    //                _this.addActiveToFirst();
    //            });
    //            
    //            mainLastNav.on('mouseenter touchstart',function(e){
    //                dbGoldArrow.removeClass('selected-dgb-arr'); 
    //                manMainNav.removeClass('active');
    //                manMainNav.addClass('inactive');
    //                featureFirstNav.removeClass('f-active');
    //                featureFirstNav.addClass('f-inactive');
    //                
    //                dbGoldArrow.removeClass('selected-dgb-arr'); 
    //                womanMainNav.addClass('active');
    //                womanMainNav.removeClass('inactive');
    //                featureLastNav.removeClass('f-inactive');
    //                featureLastNav.addClass('f-active');
    //            });
    //        },
    //        addActiveToFirst : function(){
    //            dbGoldArrow.removeClass('selected-dgb-arr'); 
    //            womanMainNav.removeClass('active');
    //            womanMainNav.addClass('inactive');
    //            featureLastNav.removeClass('f-active');
    //            featureLastNav.addClass('f-inactive');
    //            
    //            dbGoldArrow.addClass('selected-dgb-arr'); 
    //            manMainNav.removeClass('inactive');
    //            manMainNav.addClass('active');
    //            featureFirstNav.removeClass('f-inactive');
    //            featureFirstNav.addClass('f-active');
    //        },
  },
  myAccountLeftNavHightlight: {
    element: '.my-account-left-nav',
    init: function() {
      var url = decodeURI(window.location.href);
      $.each(this.element.find('a'), function() {
        if ($(this).attr('href') === url) {
          $(this).closest('li').addClass('selected');
        }
      });
      if (url.indexOf("paymentinstruments-add") > 0) $(".payment-settings").addClass("selected");
      if (url.indexOf("address-add") > 0) $(".manage-address").addClass("selected");
      if (url.toLowerCase().indexOf("wishlist") > 0 && url.indexOf("search") < 0) $(".wishlist").addClass("selected");
    }
  },
  /**
   * Apply Coupon on cart, shipping and billing page
   */
  applyCouponCode: {
    element: "div.cart-secondary.cart-coupon-code",
    init: function() {
      this.applyCoupon();
      this.removeCoupon();
    },
    applyCoupon: function() {
      var _that = this;
      $(document).on('click', '.cart-coupon #add-coupon', function(e) {
        e.preventDefault();
        var $main = $('#main');
        var form = $(this).parents('form');
        var formAction = form.attr('action');
        var error = form.find(".error.coupon-error");
        var url = app.util.appendParamsToUrl(formAction, {
          format: 'ajax',
          dwfrm_cart_addCoupon: 'dwfrm_cart_addCoupon'
        });
        error.empty();
        if (!$.trim(form.find('input.coupon-code').val())) {
          error.remove();
          form.find('.coupon-code').val('');
          $("<span> </span>").addClass("error coupon-error").html(app.resources.COUPON_CODE_MISSING).appendTo(form);
          return false;
        }
        app.progress.show($('body'));
        $.ajax({
          type: 'get',
          url: url,
          dataType: 'html',
          data: form.serialize()
        }).done(function(response) {
          try {
            response = JSON.parse(response);
            if (response.success) {
              _that.updateCart();
            } else {
              var msg;
              if ($.trim(form.find('input[name="dwfrm_cart_couponCode"]').val()) === '') {
                msg = app.resources.COUPON_CODE_MISSING;
              } else {
                msg = response.message;
              }
              if (error.length === 0) {
                $("<span> </span>").addClass("error coupon-error").html(msg).appendTo(form);
              }
              error.html(msg);
              return;
            }
          } catch (e) {
            location.reload();
          }
        }).always(function() {
          app.progress.hide();
        });
      });
    },
    removeCoupon: function() {
      var _that = this;
      $('.pt_cart').off().on('click', 'button[id^="removeCouponCode"]', function(e) {
        e.preventDefault();
        var $main = $('#main');
        var form = $(this).parents('form');
        var parentElem = $(this).parent();
        var formAction = form.attr('action');
        parentElem.append('<input type="hidden"' + 'name="' + $(this).attr('name') + '" value="' + $(this).val() + '" />');
        var url = app.util.appendParamsToUrl(formAction, {
          format: 'ajax'
        });
        app.progress.show($('body'));
        _that.updateCart(url, form.serialize());
      });
    },
    updateCart: function(url, val) {
      var primary = $('.pt_cart #primary'),
        secondary = $('#secondary .order-totals-table'),
        coupleBlock = $('#secondary .cart-coupon-code');
      minCart = $('.header-mini-cart'),
        isCheckoutButtonDisable = false;
      $.ajax({
        type: 'get',
        url: url || app.util.appendParamsToUrl(window.location.href, {
          format: 'ajax'
        }),
        data: val || {},
        dataType: 'html',
        format: 'ajax'
      }).done(function(response) {
        var temp = $('<div></div>');
        temp.html(response);
        primary.html(temp.find('#primary').html());
        secondary.html(temp.find('.order-totals-table').html());
        coupleBlock.html(temp.find('.cart-coupon-code').html());
        var cartSecondary = temp.find('.cart-secondary');
        if (temp.find('#secondary').data('bonuseligibleorder') == true) {
          $('.diesel-sr-form').show();
          $('.diesel-sr-link').hide();
        } else {
          $('.diesel-sr-form').hide();
          $('.diesel-sr-link').show();
        }
        //if($('.continue-checkout-button').prop("disabled") === true){
        //	isCheckoutButtonDisable = true;
        //	}
        //secondary.html(temp.find('#secondary').html());
        //var checkoutButton = $('.continue-checkout-button');
        //isCheckoutButtonDisable === true ? checkoutButton.prop("disabled",true) : checkoutButton.prop("disabled",false);
        //delete temp;
        $.ajax({
          type: 'get',
          url: app.util.ajaxUrl(app.urls.showMiniCart)
        }).done(function(data) {
          minCart.html(data);
          app.minicart.initializeCatche();
          app.tooltips.init();
        });
      }).always(function() {
        app.progress.hide();
        sr_refreshSRDOM();
      });
    }
  },
  disableCouponCodeForm: {
    element: "#apply-coupon",
    init: function() {
      this.disableFormSubmitOnEnter();
    },
    disableFormSubmitOnEnter: function() {
      $('#secondary').on('keypress', 'input[id="dwfrm_cart_couponCode"]', function(e) {
        if (e.keyCode === 13) {
          return false;
        }
      });
    }
  },
  hideConfrimEmail: {
    element: ".login-create-account",
    init: function() {
      var email = $('.thank-you-register input'),
        confirmEmail = $('.hidden-confirm-email input:hidden');
      confirmEmail.val(email.val());
      email.on('blur', function() {
        confirmEmail.val($(this).val());
      });
    }
  },
  /**
   * grid-layout for pdp custom dropdown
   * 
   */
  gridsForPDPCustomDropDown: {
    element: '#pdpMain',
    init: function() {
      var customDD = $('.customSelectBox');
      customDD.each(function() {
        var parent = $(this).parents('.attribute');
        while (parent.next()[0]) {
          parent.addClass('grid_2_2 col-1');
          parent.next().addClass('grid_2_2 col-2 clearfix');
          parent = $(parent).next();
        }
      });
    }
  },
  /**
   * CnC back button - hashchange event handler
   */
  customBackForCnC: {
    element: '.pt_checkout2',
    step: 0,
    init: function() {
      var that = this;
      window.onpopstate = function(event) {
        that.step = (event.state === null) ? 0 : event.state.step;
      };
      $(window).hashchange(function() {
        var hash = window.location.hash;
        switch (hash) {
          case "":
            (function() {
              if (app.history.step > that.step) that.goTo('#edit-shipping-info');
              else {
                app.history.step++;
                that.forward();
              }
            }());
            break;
          case "#step1":
            (function() {
              if (app.history.step > that.step) that.goTo('#edit-billing-info');
              else {
                app.history.step++;
                that.forward();
              }
            }());
            break;
          case "#step1|step2":
            app.history.step++;
            that.forward();
            break;
          default:
            break;
        }
      });
    },
    goTo: function(dest) {
      $(dest).trigger('click');
      app.history.step--;
    },
    forward: function() {
      $('.accordion-inner').each(function() {
        if ($(this).is(':visible')) {
          $('html, body').animate({
            scrollTop: $(this).parents('.accordion-group').offset().top
          });
        }
      });
    }
  },
  /**
   * PLP Fadein and fadeout animation  
   */
  //	gridItemFadeinEffects : {
  //		element: '.plp-redesign .tiles-container',
  //		interval: null,
  //		options:{
  //			delay: 750
  //		},
  //		
  //		init: function() {
  //			var _this = this;
  //		
  //		/* return if look search page is rendered */
  //			
  //		if($('.plp-redesign')[0] && $('.product-tile.default-products').length === 0){
  //	    	return;
  //	    }	
  //
  //		$('#main')
  //			.on('mouseenter', '.grid-tile .product-tile-content', function(e) {
  //				var target = $(e.target),
  //					contentTile = $(this).parent('.product-tile-content');
  //				
  //				_this.toggleProductTile(this, true);
  //				
  //
  //				if(!scriptIsmobile()){
  //					_this.callback($(this));
  //					
  //					/* if target is product-info return without animation */
  //					//if(target.hasClass('product-info') || target.parents('.product-info')[0]) return;
  //	
  //					_this.tileEffects($(this));
  //				}
  //				
  //			})
  //			.on('mouseleave', '.grid-tile .product-tile-content' ,function(e) {
  //				var that = this,
  //					qu = $(this).data('queue'),
  //					len = qu ? qu.mo.length : 0;
  //
  //				_this.toggleProductTile(this, false);
  //				if(!scriptIsmobile()){
  //					if(_this.interval !== null){
  //						clearInterval(_this.interval);
  //						for(var i=0; i < len ; i++)
  //							qu.mo[i].stop();
  //						_this.resetCurrentTile(that);
  //					}
  //				}
  //				
  //			});
  //
  //		},
  //		
  //		tileEffects: function(container){
  //			var current = $('ul.swatch-itemslider li:visible', container),
  //    			next = current.next().length ? current.next() : $('ul.swatch-itemslider li:eq(0)', container),
  //    			_this = this;
  //    		
  //    	    	
  //	    	/* if alternate image is not available - return without animating images */
  //	    	if(next.hasClass('alternate-image') && next.find('img').attr('src').indexOf('noimagegrid') > 0)	return;
  //			
  //        	this.interval =  setInterval(function(){_this.callback(container);}, this.options.delay * 2);
  //		},
  //		
  //		callback: function(container) {
  //        	var current = $('ul.swatch-itemslider li:visible', container),
  //        		next = current.next().length ? current.next() : $('ul.swatch-itemslider li:eq(0)', container),
  //        		qu = $(container).data('queue');
  //        	
  //        	/* if alternate image is not available - return without animating images */
  //        	if(next.hasClass('alternate-image') && next.find('img').attr('src').indexOf('noimagegrid') > 0)	return;
  //        	
  //        	/* Adding currently animated elements into animation queue */
  //        	
  //        	if(qu){
  //	        	qu.mo.push(current);
  //	        	qu.mo.push(next);
  //        	}
  //        	
  //        	next.fadeIn({
  //        		duration: this.options.delay,
  //        		complete: function(){}
  //        	});
  //        	current.fadeOut({
  //        		duration: this.options.delay,
  //        		complete: function(){}
  //        	});
  //			
  //        },
  //        
  //        toggleProductTile: function(elem, show){
  //        	var gridtile;
  //			gridtile = $(elem).closest(".grid-tile");
  //          
  //            if(show){
  //            	gridtile.css('overflow', 'visible');
  //            	gridtile.find(".product-tile").addClass("product-tile-quickview");
  //            }else{
  //            	gridtile.css('overflow', 'hidden');
  //            	gridtile.find(".product-tile").removeClass("product-tile-quickview");
  //            }
  //        },
  //        resetCurrentTile: function(tile){
  //        	$('ul.swatch-itemslider li:last', tile).css({'display': 'list-item', 'opacity': 1});
  //        //	$('ul.swatch-itemslider li', tile).not(':last').css({'display': 'list-item', 'opacity': 1});
  //        	
  //    		
  //        }
  //	},
  /**
   * Created main image Stick on shop by look
   */
  stickySblImage: {
    element: "div.pdp-main-wrapper.shop-by-look",
    init: function() {
      if ($('body').width() >= 768) {
        var _this = this;
        this.stickySblMainImage();
        $(window).scroll(function() {
          _this.stickySblMainImage();
        });
      }
    },
    stickySblMainImage: function() {
      var topPosition = $('.back-to-all').length != 0 ? $('.back-to-all').offset().top + 15 : 15,
        scrollTop = $(window).scrollTop();
      if (scrollTop > topPosition) {
        $('.selected-look').addClass('fixed-pos');
        $('#footer,#footer-burger').addClass('footer-sticky');
      } else {
        $('.selected-look').removeClass('fixed-pos');
        $('#footer,#footer-burger').removeClass('footer-sticky');
      }
    }
  },
  /* You May Like Carousel */
  /*youMayLikeCarousel: {
		element: "div.youmayalsolike",
		init: function () {
			var _this = this;
			
		$(_this.element).find('.you-may-like-wrapper').each(function (key, val) {
                app.util
                    .setCarousel({
                        sliderid: '.you-may-like-slider',
                        sliderwrapper: '.you-may-like-wrapper',
                        slide: '.you-may-like-wrapper .you-may-like-slider .you-may-like-slides ',
                        auto: false,
                        circular: false,
                        multiple: _this.visibleSlides,
                        isFixed: true,
                        height: 423,
                        nav: false,
                        resize: true
                    });
            });
		},
		visibleSlides: function () {
			var recoMultiple = 5;
			if ($('body').width() > 767 && $('body').width() < 1023) {
                recoMultiple = 3;
            } else if ($('body').width() > 1023 && $('body').width() < 1200) {
                recoMultiple = 4;
            } else if ($('body').width() > 319 && $('body').width() < 500) {
               recoMultiple=1;
            }else if ($('body').width() > 500 && $('body').width() < 768) {
               recoMultiple = 2;
            } else if ($('body').width() >= 1200) {
               recoMultiple = 5;
            }
			return recoMultiple;
		}
	},*/
  joggJeansLanding: {
    element: "#joggjeans",
    init: function() {
      var _this = this;
      var slot1 = $(_this.element).find('#jj-main-container .slot1');
      var slot2 = $(_this.element).find('#jj-main-container .slot2');
      if ($(window).width() >= 768) {
        $("#jj-main-container .slot1 .html-slot-container img").one('load', function() {
          slot2.height(slot1.height());
        }).each(function() {
          if (this.complete) $(this).load();
        });
      }
      $(window).resize(function() {
        if ($(window).width() >= 768) {
          slot2.height(slot1.height());
        }
      });
    }
  },
  /*
   * Open signin overlay 
   */
  // new login class change for the older layout
  loginOverlay: {
    element: '.menu-utility-user, .mobile-menu-wrap',
    init: function() {
      var _this = this;
      if ($('#wrapper').width() <= 640) {
        $(".user-account").off("click").on("click", function(e) {
          e.preventDefault();
        });
      }
      if (!$(".menu-utility-mobile li.myacc").hasClass("loggedin")) {
        $(this.element).on('click touchstart', '.user-login, .mobile-menu-wrap .user-account', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var url = app.util.appendParamsToUrl($(this).attr('href'), {
              "target": "iframe"
            }),
            data = {
              'url': url,
              'width': 440,
              'element': '#sigin-overlay',
              'currentNode': $(e.currentTarget),
              'iFrame': true
            };
          _this.getLoginOverlayData(data);
        });
      }
      if ($('.cart-items-form').length && $('#isUserLogin').val() == 'false') {
        $('.cart-items-form').on('click', '.add-to-wishlist', function(e) {
          if ($('#isUserLogin').val() == 'false' && !navigator.userAgent.match(/iPhone/i)) {
            var url = app.util.appendParamsToUrl($(this).attr('href'), {
                "format": "ajax",
                "target": "popup"
              }),
              data = {
                'url': url,
                'width': $('body').width() == 768 ? 768 : 880,
                'element': '#wishlist-sigin-overlay',
                'currentNode': $(e.currentTarget),
                'iFrame': false
              };
            _this.getLoginOverlayData(data);
            e.preventDefault();
          } else if (navigator.userAgent.match(/iPhone/i) || (/\bSilk\b/.test(navigator.userAgent) && /\bKFTT\b/.test(navigator.userAgent) && $('body').width() < 800)) {
            window.location.href = $(this).attr('href');
          }
        });
      }
      if ($('#isUserLogin').val() == 'false') {
        // implementation for PDP wishlist
      }
    },
    /*
     * Get the login form for signin and wishlist
     * @Param {Object}
     */
    getLoginOverlayData: function(data) {
      var _this = this;
      if (data.iFrame) {
        data.res = $('#login_frame').length ? $('#login_frame') : $('<iframe >', {
          'id': 'login_frame',
          'scrolling': 'no'
        });
        this.openLoginOverlay(data);
        $("#login_frame").load(function() {
          var $iframeContent = $('#login_frame').contents().find("html");
          if ($('#wrapper').width() <= 767) {
            $iframeContent.find(".mobile-login").show();
          }
        });
        $('#login_frame').attr('src', data.url);
        console.log("Hello");
      } else {
        $.ajax({
          'url': data.url,
          'context': _this,
          'type': 'POST',
          'success': function(res) {
            data.res = res;
            data.dlg = this.openLoginOverlay(data);
            if ($(data.res).find('form').length) {
              data.form = $(data.element).find('form');
              if (!data.iFrame) {
                this.loginFormSubmit(data);
              }
            }
            app.validator.init(); // re-init valiation
            $(data.element).off('click').on('click', '#password-reset', function(e) {
              if (data.dlg.dialog) {
                data.dlg.dialog('close');
              }
            });
          }
        });
        this.openLoginOverlay(data);
      }
    },
    /*
     * Submit the login form in Dialog
     * @Param {Object}
     */
    loginFormSubmit: function(data) {
      var _this = this;
      if (data.form.attr('id') == 'dwfrm_login') {
        $(data.element + ' #' + data.form.attr('id')).off('submit').on('submit', function(e) {
          var url = app.util.appendParamsToUrl($(this).attr('action'), {
              'format': 'ajax',
              'target': 'popup'
            }),
            formData = $(this).serialize();
          if (!$(this).validate().form()) {
            return false;
          }
          e.preventDefault();
          // Add button name & value to the post data
          formData += '&' + $(this).find('button').attr('name') + '=' + $(this).find('button').val();
          $.ajax({
            'url': url,
            'type': 'POST',
            'context': this,
            'data': formData,
            'success': function(res) {
              var redirectUrl;
              // If error found in response
              if ($(res).find('.error-form').length) {
                $(data.element).html(res);
                _this.loginFormSubmit(data);
              } else {
                if (data.element == '#sigin-overlay') {
                  redirectUrl = $(this).attr('action');
                  redirectUrl = redirectUrl.substr(0, redirectUrl.indexOf('?'));
                  window.location.href = redirectUrl;
                } else {
                  if ($('.pdp-share-link').find('.wl-action').length) {
                    openProductTootip($('.pdp-share-link').find('.wl-action'), "successfully added to wishlist", {
                      top: '0px',
                      left: '0px'
                    }, "17%");
                  } else {
                    data.currentNode.parent('li').html($(res).find('.in-wishlist'));
                    $('.item-user-actions').find('.wish-list-txt').addClass('in-wishlist-wrapper');
                  }
                  _this.refreshLoginStatus();
                  data.dlg.dialog('close');
                }
              }
            }
          });
        });
      }
    },
    /*
     * Open Quick View Dialog
     * @Param {Object}
     * @Return {Object}
     */
    openLoginOverlay: function(data) {
      var _this = this,
        dlgClass = data.wrapperClass || '',
        dlg = app.dialog.create({
          target: data.element,
          options: {
            'height': 'auto',
            'width': data.width,
            'dialogClass': 'quickview ' + dlgClass + "signin-new"
          }
        });
      $(data.element).html(data.res);
      dlg.dialog('open');
      return dlg;
    },
    /**
     * Refresh user login status on storefront
     * 
     */
    //changes for login on click for wishlist
    refreshLoginStatus: function() {
      $.get(app.urls.getUserStatus, function(response) {
        var userStatus = $('.menu-utility-user li.myacc');
        userStatus.html($(response));
        $('.myacc', userStatus).hover(function() {
          $('div', this).show();
        }, function() {
          $('div', this).hide();
        });
      });
      $.get(app.urls.getUserWishlistStatus, function(response) {
        var userStatus = $('.rgt-content');
        if ($('.elements.wishlist-header').length) {
          $('.elements.wishlist-header').remove();
        }
        userStatus.prepend($(response));
      });
    }
  },
  /*
   * Show promotional form on click of link
   */
  cartCouponToggle: {
    element: '.cart-wrapper', //'.cart-wrapper' | replace undefined with the given node to enable
    init: function() {
      $('#secondary').on('click', '.promotional-code', function(e) {
        e.preventDefault();
        if ($('form.cart-coupon').not('visible')) {
          $('form.cart-coupon').show();
          $(this).hide();
        }
      });
    }
  },
  /*
   * Homepage overlay for subscription
   */
  /*
   * om focus hide placeholder
   */
  showhidePlaceholder: {
    wrapperClass: $('input,textarea'),
    toggle: function() {
      $('input,textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
      });
      $('input,textarea').blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
      });
    },
    toggleColor: function() {
      $('input,textarea').focusout(function() {
        if ($('input,textarea').hasClass('error')) {
          $(this).addClass('Invalidinput');
        } else {
          $(this).removeClass('Invalidinput');
        }
      });
    }
  },
  homepageSubscriptionOverlay: {
    element: '.pt_storefront', // .pt_storefront | replace undefined with the given node to enable
    init: function() {
      var isSub = app.cookies.readCookie('isSubscribed');
      if (!isSub && app.newsletterSignUp) {
        $.ajax({
          'url': app.urls.newsletterSubscription,
          'type': 'POST',
          'context': this,
          'success': function(res) {
            app.dialog.create({
              'target': '#subscription-overlay',
              'options': {
                'height': 'auto',
                'dialogClass': 'quickview subscription-container',
                create: function() {
                  if ($("body").width() > 639 && $("body").width() < 1023) {
                    $('#subscription-overlay').dialog("option", "width", 600);
                  } else if ($("body").width() > 1023) {
                    $('#subscription-overlay').dialog("option", "width", 650);
                  } else {
                    $('#subscription-overlay').dialog("option", "width", 300);
                  }
                },
                open: function() {
                  $('.ui-widget-overlay').on('click', function() {
                    $('#subscription-overlay').dialog('close');
                  });
                },
                close: function() {
                  if (!app.cookies.readCookie('isSubscribed')) {
                    app.cookies.createOrUpdateCookie('isSubscribed', 1, 15);
                  }
                }
              }
            });
            $('#subscription-overlay').html(res);
            $('#subscription-overlay').dialog('open');
            $('.subscription-overlay-close').on('click', function(e) {
              $('#subscription-overlay').dialog('close');
            });
            //DieselUS.ui.showhidePlaceholder.toggle();
            //DieselUS.ui.showhidePlaceholder.toggleColor();
            app.validator.init(); // re-init valiation
            this.subcribeForm();
          }
        });
      }
    },
    subcribeForm: function() {
      $('#subscription-overlay form').on('submit', function(e) {
        e.preventDefault();
        app.newsletterForm.submit.call(this);
      });
    }
  },
  /*
   * Multiple links on homepage carousel. DUP-324
   */
  setupCarouselLinks: {
    element: '.multilink-slider',
    init: function() {
      var slides = $(this.element).find('li'),
        i = 0,
        currentSlide,
        dataObj,
        style,
        count = 0,
        pos = 0,
        imgD = {},
        distance;
      for (i; i < slides.length; i += 1) {
        currentSlide = $(slides[i]).find('.content');
        currentSlide.css('position', 'relative');
        dataObj = currentSlide.find('img').data();
        imgD.height = currentSlide.find('img').height();
        imgD.width = currentSlide.find('img').width();
        count = 0, index = 1, distance = 0;
        for (var j in dataObj) {
          if (j !== 'slotid') {
            $('<a>', {
              'href': dataObj['url' + index],
              'data-slotid': currentSlide.find('img').data('slotid'),
              'class': 'ga-slot-link'
            }).appendTo(currentSlide);
            count += 1;
            index += 1;
          }
        }
        for (var k = 0; k < count; k += 1) {
          if (currentSlide.find('img').hasClass('vertical')) {
            style = 'width:' + (100 / count) + '%;height: 100%;top:0;left:' + pos + '%;background-image: url("about:blank");';
            if (k === 0) {
              distance = pos = 100 / count;
            } else {
              pos = distance + pos;
            }
          } else {
            style = 'height:' + (100 / count) + '%;width: 100%;left:0;top:' + pos + '%;background-image: url("about:blank");';
            if (k === 0) {
              distance = pos = 100 / count;
            } else {
              pos = distance + pos;
            }
          }
          currentSlide.find('a').eq(k).attr('style', style);
        }
        pos = 0;
      }
      this.responsiveHeight();
    },
    responsiveHeight: function() {
      $(window).resize(function(e) {
        $('.main-slider').find('ul').height($('.main-slider').find('li').first().height());
      });
    }
  },
  promotionBlock: {
    element: ".promotionBlock",
    init: function() {
      //setting for the slider in promotions/recommendations block
      var settings = {},
        settingsDesktop = {
          infiniteLoop: true,
          minSlides: 2,
          maxSlides: 3,
          pager: true,
          controls: true,
          slideWidth: 257,
          slideMargin: 50,
          onSliderLoad: function() {
            $(".content li").css("visibility", "visible");
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            $slideElement.parent().find("video").each(function() {
              $(this).get(0).pause()
            });
          }
        },
        settingMobile = {
          infiniteLoop: true,
          minSlides: 2,
          maxSlides: 2,
          controls: false,
          slideWidth: 250,
          slideMargin: 10,
          onSliderLoad: function() {
            $(".content li").css("visibility", "visible");
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            $slideElement.parent().find("video").each(function() {
              $(this).get(0).pause()
            });
          }
        },
        sliders = new Array();
      //checking layout on resize 
      var checkLayout = function() {
          if ($('#wrapper').width() < 1024 || app.device.is('ipad')) {
            settings = settingMobile;
          } else {
            settings = settingsDesktop;
          }
        },
        activateSlider = function(elem) {
          //initialization of recommendation sliders
          $('.promotionBlock .sliderContent ul').each(function(i, ul) {
            if ($(ul).find("li").length <= 0) return false;
            var parent = $(this).parents(".promotionBlock"),
              wrapperContent = $(parent).find(".wrapper").html($(this).clone());
            if ($(ul).find("li").length > settings.maxSlides) {
              settings.pager = true;
            } else {
              settings.pager = false;
            }
            if ($(this).parents('.promotionBlock').hasClass('featuredIn') && app.device.mobile()) {
              settings.minSlides = 1;
              settings.maxSlides = 1;
            } else {
              settings.minSlides = 2;
              settings.maxSlides = 2;
            }
            sliders[i] = $(ul).bxSlider(settings);
          });
        },
        reloadSlider = function() {
          //re-initialization/reloading the sliders with new settings of recommendation 
          $.each(sliders, function(i, slider) {
            if ($(slider).parents(".promotionBlock").find('.options').length > 0) {
              if ($(slider).find("li").length <= 0) return false;
              if (slider.find("li").length > settings.maxSlides) {
                settings.pager = true;
              } else {
                settings.pager = false;
              }
              slider.reloadSlider(settings);
            }
          });
        }
        //EVENTS
      var tabClickFunc = function(parentBlock, text) {
        //tabbing funcitonality on recommendations blocks
        var childrenLi = $(parentBlock).find('.wrapper li');
        $(parentBlock).find('.sliderContent li').remove();
        childrenLi.each(function(i, v) {
          var thisLiMatches = $(this).attr("class");
          if (thisLiMatches.indexOf(text) > -1) {
            $(parentBlock).find('.sliderContent ul').append($(this).clone());
          }
        });
        reloadSlider();
      };
      //Tabbing functionality
      $('.promotionBlock .options a').bind('click', function(e) {
        e.preventDefault();
        var that = this;
        var parentBlock = $(that).parents(".promotionBlock"),
          text = $.trim($(that).attr("data-map")).toLowerCase();
        parentBlock.find(".options a").removeClass("active");
        $(that).addClass("active");
        $(parentBlock).find(".bx-wrapper").fadeOut(function() {
          tabClickFunc(parentBlock, text);
        }).delay('1000').fadeIn();
      });
      $('.promotionBlock select').change(function(e) {
        var parentBlock = $(this).parents(".promotionBlock"),
          selectedOption = $(parentBlock).find('select option:selected'),
          selectedOptionMap = $.trim($(selectedOption).attr("data-map")).toLowerCase();
        tabClickFunc(parentBlock, selectedOptionMap);
      });
      $(window).smartresize(function() {
        //resetting sliders on window resize
        if ($(".videoLoaded").length == 0) {
          checkLayout();
        }
      });
      $(window).on('orientationchange', function() {
        if ($(".videoLoaded").length == 0) {
          reloadSlider();
        }
      });
      $(".video").mouseenter(function() {
        $("body").addClass("videoLoaded");
      }).mouseleave(function() {
        $("body").removeClass("videoLoaded");
      });
      //init of sliders
      checkLayout();
      activateSlider();
      $(window).load(function() {
        var heightLi = $(".promotionBlock li .display").height();
        $(".promotionBlock li .display.video").css({
          height: heightLi
        });
        $('.promotionBlock').each(function(i, v) {
          var that = $(this)
            //setTimeout(function(){
          that.find('.options a:first').trigger("click");
          //},800);
        });
      })
    }
  }
};
DieselUS.init = function() {
  $.each(DieselUS.ui, function(n, v) {
    if ($(v.element).length > 0 && typeof v.init === "function") {
      DieselUS.ui[n].element = $(v.element);
      v.init();
    }
  });
};
$(document).ready(function() {
  //print button on PDP page in non ecommerce site
  $(document).on('click', '#btn-print', function() {
    var product = $('h2.product-name').text();
    var productHeadingGrp = $('.product-content-header')[0].outerHTML;
    var productDetails = $('.detail-discription-1')[0].outerHTML;
    var productImage = $('.product-slides-list1 > li img:first')[0].outerHTML;
    var bodyHtml = '<body class="pdp-print-sec"> <div class="pdp-print-left-sec">' + productHeadingGrp + productDetails + '</div>' + '<div class="pdp-print-right-sec">' + productImage + '</div></body>';
    var style = '<style type="text/css">.pdp-print-sec {width: 100%; font-family:  Arial, sans-serif; }' + '.pdp-print-sec .pdp-print-left-sec {width: 40%;float: left; }' + '.pdp-print-sec .pdp-print-right-sec { width: 60%; float: left; position: relative !important; }' + '.pdp-print-sec .pdp-print-right-sec img {width: 100% !important; }' + '.pdp-print-sec .jspContainer {height: auto !important; width: 100% !important; }' + '.pdp-print-sec .jspVerticalBar {display: none; }' + '.pdp-print-sec .jspPane {position: inherit !important; width: 100% !important;}' + '.pdp-print-sec .product-content-header h5 { font-size: 11px; text-transform: uppercase; margin: 0; color: #191919; padding-top: 10px; font-family:  Arial, sans-serif; letter-spacing: 1px;}' + '.pdp-print-sec .product-content-header h6 { font-size: 10px; margin: 0; font-weight: normal; color: #808080; padding-top: 10px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;}' + '.pdp-print-sec .product-content-header .product-price { padding-top: 20px; }' + '.pdp-print-sec .product-content-header h4.promo01 { font-size: 14px;  letter-spacing: 1px; color: #808080; padding-top: 15px; }' + '.pdp-print-sec .detail-discription-1 {padding: 0px; width: 100%; }' + '.detail-discription-1 {width: 100%; padding: 0; margin: 0; border-top: 1px solid #bababa; }' + '.detail-discription-1 li {  display: list-item; list-style: none; border-bottom: 1px solid #bababa;}' + '.detail-discription-1 li h4 { font-size: 14px; position: relative; padding: 0px 0 0px 1px; cursor: pointer; color: #808080;}' + '.discription-list {margin: 0px; padding: 0px; width: 100% !important; }' + '.discription-list-inner { padding: 0px; margin: 0; list-style: none;}' + '.discription-list p { margin: 0; padding: 0px 0 15px 0; font-size: 12px;line-height: 20px; }' + '.discription-list-inner li { border-bottom: none; }' + '.discription-list strong { padding-top: 11px; display: block; font-size: 13px; line-height: 20px; }' + 'primary-image { width: 100%; }' + '.pdp-print-sec .product-content-header h2 { font-size: 20px; color: #191919; padding-top: 30px; letter-spacing: 1px; }</style>'
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>DIESEL ' + product + '</title>');
    printWindow.document.write(style + '</head>');
    printWindow.document.write(bodyHtml);
    printWindow.document.write('</html>');
    printWindow.document.close();
    $(printWindow).on("load", function() {
      printWindow.print();
    });
    return false;
  })
  $('.video-icons').on('click', function() {
    var parentvideo = $(this).parent();
    var video = $(parentvideo).find('video');
    //video.load(); // required if src changed after page load
    //$videoTag.play();
    if (video.get(0).paused == true) {
      // Play the video
      video.get(0).play();
      $(this).addClass('video-icons-pause').removeClass('video-icons-play');
    } else {
      // Pause the video
      video.get(0).pause();
      $(this).addClass('video-icons-play').removeClass('video-icons-pause');
    }
    $(video).bind("ended", function() {
      // alert('Video ended!');
    });
  });
  var hoverTrigger = false,
    slider = '';
  var productCount = $('.carousal-wrapper').find('.product-slider').length;
  if ($('body').width() <= 639) {
    $('.carousal-wrapper').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      controls: false,
      slideWidth: 300,
      slideMargin: 10,
      pager: true
    });
    $('.dbg-wrapper').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      controls: false,
      pager: true,
      infiniteLoop: false,
      pagerType: 'full'
    });
    $('.three-asset-body-wrapper').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      controls: false,
      infiniteLoop: false,
      pager: true,
      pagerType: 'full'
    });
    $('.three-slot-wrapper').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      controls: false,
      infiniteLoop: false,
      pager: true,
      pagerType: 'full'
    });
  } else {
    if (productCount > 2) {
      if ($('body').width() > 639 && $('body').width() < 1024) {
        $('.carousal-wrapper').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          controls: false,
          slideWidth: 550,
          slideMargin: 10
        });
      } else {
        $('.carousal-wrapper').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          controls: true,
          slideWidth: 550,
          slideMargin: 10,
          preloadImages: 'visible'
        });
      }
    }
  }
  /*
     
  */
  DieselUS.init();
});