(function(a) {
  a.carousel = function(c, b) {
    var d = this;
    d.settings = {
      wrapper: a(c),
      slider: b.slider,
      slides: b.slider.children("li"),
      totalSlides: a(b.slider.children("li")).length,
      firstEle: a(a(b.slider).find("li")[0]),
      firstImg: a(a(b.slider).find("li img")[0]).length ? a(a(b.slider).find("li img")[0]) : a(a(a(b.slider).find("li")[0]).children()[0]),
      isCircular: b.circular ? true : false,
      isNav: b.nav,
      silderWidth: 0,
      multiple: typeof b.multiple === "function" ? b.multiple() : b.multiple,
      disableNext: false,
      currSlide: 0,
      displayNum: 0,
      goTo: b.goTo,
      width: b.width,
      lock: false,
      isTwoCircular: false,
      desktopLock: false,
      isZoom: b.isZoom,
      deltaMove: 0,
      fixed: b.isFixed,
      touchCounter: 0,
      height: b.height,
      auto: b.auto,
      timer: 0,
      callback: b.callback,
      transitionDelay: app.carouselDelay ? app.carouselDelay : 3000,
      hidden: "",
      visibilityChange: "",
      transitionComplete: false,
      resize: b.resize || false,
      multipleUpdate: typeof b.multiple === "function" ? b.multiple : false
    };
    d.setHeight = function() {
      if (d.settings.height) {
        d.settings.slider.css("height", d.settings.height)
      } else {
        if (d.settings.firstImg.is("img")) {
          d.settings.slider.css("height", a(d.settings.firstEle).outerHeight());
          a(d.settings.firstImg).load(function() {
            d.settings.slider.css("height", a(d.settings.firstEle).outerHeight())
          })
        } else {
          d.settings.slider.css("height", a(d.settings.firstEle).outerHeight())
        }
      }
      if (window.DeviceOrientationEvent) {
        a(window).on("orientationchange", function() {
          if (d.settings.multipleUpdate) {
            d.settings.multiple = d.settings.multipleUpdate()
          }
          if (d.settings.height) {
            d.settings.slider.css("height", d.settings.height)
          } else {
            d.settings.slider.css("height", a(d.settings.firstEle).outerHeight())
          }
          d.checkMultiSlide();
          if (d.settings.resize && d.settings.multiple) {
            d.resize()
          }
          d.settings.desktopLock = false
        })
      }
    };
    d.setDefaults = function() {
      d.settings.slider.css("position", "relative");
      a(d.settings.slides).css("-webkit-backface-visibility", "hidden");
      if (d.settings.isZoom) {
        a(d.settings.slides[0]).addClass("zoom-selected")
      }
      d.settings.wrapper.addClass("carousel-wrapper");
      if (!d.settings.wrapper.find(".jcarousel-prev").length) {
        d.settings.wrapper.append('<div class="jcarousel-prev jcarousel-prev-horizontal" ></div><div class="jcarousel-next jcarousel-next-horizontal"></div>')
      }
      if (!d.settings.isCircular && !d.settings.goTo) {
        a(d.settings.wrapper.find(".jcarousel-prev")).addClass("jcarousel-prev-disabled")
      }
      if (d.settings.wrapper.find(".slide-number")[0]) {
        d.settings.wrapper.find(".slide-number .total").html(d.settings.totalSlides);
        d.updateRemaining(d.settings.displayNum + 1)
      }
      if (d.settings.slides.length === 1) {
        a(d.settings.wrapper.find(".jcarousel-next")).addClass("jcarousel-next-disabled")
      }
      if (typeof document.hidden !== "undefined") {
        d.settings.hidden = "hidden";
        d.settings.visibilityChange = "visibilitychange"
      } else {
        if (typeof document.mozHidden !== "undefined") {
          d.settings.hidden = "mozHidden";
          d.settings.visibilityChange = "mozvisibilitychange"
        } else {
          if (typeof document.msHidden !== "undefined") {
            d.settings.hidden = "msHidden";
            d.settings.visibilityChange = "msvisibilitychange"
          } else {
            if (typeof document.webkitHidden !== "undefined") {
              d.settings.hidden = "webkitHidden";
              d.settings.visibilityChange = "webkitvisibilitychange"
            }
          }
        }
      }
      if (typeof document.addEventListener === "undefined" || typeof d.settings.hidden === "undefined") {} else {
        document.addEventListener(d.settings.visibilityChange, d.handleVisibilityChange, false)
      }
    };
    d.handleVisibilityChange = function() {
      if (document[d.settings.hidden]) {
        if (d.settings.timer) {
          clearInterval(d.settings.timer)
        }
        d.settings.timer = null
      } else {
        if (d.settings.timer) {
          clearInterval(d.settings.timer)
        }
        d.settings.timer = null;
        d.setTimer()
      }
    };
    d.checkMultiSlide = function() {
      if (d.settings.multiple) {
        var g = a(d.settings.slides[d.settings.totalSlides - 1]).css("left");
        var f = (g.indexOf("px") > -1 ? g.substr(0, g.length - 2) : g);
        var e = parseInt(f) + a(d.settings.slides[d.settings.totalSlides - 1]).width();
        if (e - 10 <= (d.settings.width ? d.settings.width : a(d.settings.wrapper).width())) {
          d.settings.disableNext = true;
          a(d.settings.wrapper.find(".jcarousel-next")).addClass("jcarousel-next-disabled")
        } else {
          d.settings.disableNext = false;
          a(d.settings.wrapper.find(".jcarousel-next")).removeClass("jcarousel-next-disabled")
        }
      }
    };
    d.setPosition = function() {
      var e = d.settings.slider.find(">li.selected").index();
      if (e) {
        var f = d.settings.wrapper.css("width").substr(0, d.settings.wrapper.css("width").indexOf("px"));
        var h = a(d.settings.slides[0]).css("width").substr(0, a(d.settings.slides[0]).css("width").indexOf("px"));
        var g = d.settings.multiple ? (d.settings.multiple - 1) : (Math.floor(parseInt(f) / parseInt(h)) - 1);
        if (e - g > 0) {
          d.settings.goTo = e - g
        }
      }
      if (d.settings.isCircular && d.settings.totalSlides == 2) {
        d.settings.slider.append(a(d.settings.slides[0]).clone().addClass("cloned"));
        d.settings.slider.append(a(d.settings.slides[1]).clone().addClass("cloned"));
        d.settings.totalSlides = d.settings.slider.children("li").length;
        d.settings.slides = d.settings.slider.children("li");
        d.settings.isTwoCircular = true
      }
      if (d.settings.goTo > d.settings.totalSlides) {
        d.settings.goTo = 0
      }
      d.settings.slides.each(function(j, m) {
        var l = a(m).outerWidth() * 100 / d.settings.wrapper.outerWidth();
        if (d.settings.fixed) {
          l = (d.settings.width ? d.settings.width : d.settings.wrapper.outerWidth()) / d.settings.multiple
        } else {
          l = a(m).outerWidth() * 100 / d.settings.wrapper.outerWidth()
        }
        if (!a(m).is(":visible") && !d.settings.fixed) {
          l = 100
        }
        var k = (d.settings.silderWidth > 0) ? d.settings.silderWidth : (d.settings.multiple ? (d.settings.fixed ? (d.settings.width ? d.settings.width : d.settings.wrapper.outerWidth()) / d.settings.multiple : 100 / d.settings.multiple + "%") : "100%");
        a(m).css({
          position: "absolute",
          width: k,
          left: (j == d.settings.totalSlides - 1 && d.settings.isCircular) ? ((-1) * (l)) + (d.settings.fixed ? "px" : "%") : (l * (j - d.settings.goTo)) + (d.settings.fixed ? "px" : "%")
        })
      });
      d.settings.currSlide = d.settings.goTo
    };
    d.addNavEvents = function() {
      d.settings.wrapper.find(".jcarousel-prev").off("click touchstart").on("click touchstart", function(h) {
        h.preventDefault();
        d.prev()
      });
      d.settings.wrapper.find(".jcarousel-next").off("click touchstart").on("click touchstart", function(h) {
        h.preventDefault();
        d.next()
      });
      if (d.settings.isNav && !d.settings.multiple && !d.settings.wrapper.find(".jcarousel-control").length) {
        var g = "<div class='jcarousel-control'>";
        var f = 100 / (d.settings.isTwoCircular ? 2 : d.settings.totalSlides);
        for (var e = 0; e < (d.settings.isTwoCircular ? 2 : d.settings.totalSlides); e++) {
          g = g + "<a style='width:" + f + "%' class='link-" + e + "'>" + e + "</a>"
        }
        g = g + "</div>";
        d.settings.wrapper.append(g);
        d.updateNav()
      }
      d.settings.wrapper.off("mouseenter").on("mouseenter", function() {
        if (d.settings.timer) {
          clearInterval(d.settings.timer)
        }
        d.settings.timer = null
      });
      d.settings.wrapper.off("mouseleave").on("mouseleave", function() {
        if (d.settings.timer) {
          clearInterval(d.settings.timer)
        }
        d.settings.timer = null;
        d.setTimer()
      })
    };
    d.setTimer = function() {
      if (d.settings.auto) {
        d.settings.timer = setInterval(d.next, d.settings.transitionDelay)
      }
    };
    d.resize = function() {
      var e = 0,
        h = a(d.settings.slides[d.settings.currSlide]),
        f = a("body").width() / d.settings.multiple,
        g = h.index();
      a(d.settings.slides).width(f);
      for (i = 0; i < d.settings.totalSlides; i += 1) {
        if (i <= g) {
          e = "-" + (g - i) * f
        } else {
          e = f * (i - g)
        }
        a(d.settings.slides).eq(i).css("left", e + "px")
      }
    };
    d.init = function() {
      d.setPosition();
      d.setHeight();
      d.setDefaults();
      d.addNavEvents();
      d.addTouch();
      setTimeout(function() {
        d.setTimer()
      }, d.settings.transitionDelay);
      d.checkMultiSlide();
      if (d.settings.slider.children("li:not(.cloned)").length === 2) {
        d.settings.wrapper.find(".slide-number .total").html(d.settings.slider.children("li:not(.cloned)").length)
      }
    };
    d.updateRemaining = function(e) {
      if (d.settings.slider.children("li:not(.cloned)").length === 2 && e > 2) {
        e = e - 2
      }
      d.settings.wrapper.find(".slide-number .remaining").html(e)
    };
    d.updateNav = function() {
      var e = d.settings.displayNum;
      if (d.settings.isTwoCircular) {
        e = d.settings.displayNum % 2 == 0 ? 1 : 0;
        a(d.settings.wrapper.find(".jcarousel-control a")).removeClass("active");
        a(d.settings.wrapper.find(".jcarousel-control a")[e]).addClass("active")
      } else {
        e = d.settings.displayNum;
        a(d.settings.wrapper.find(".jcarousel-control a")).removeClass("active");
        a(d.settings.wrapper.find(".jcarousel-control a")[e == 0 ? 0 : (e - 1)]).addClass("active")
      }
    };
    d.clearTouchLock = function() {
      setTimeout(function() {
        d.settings.lock = false;
        d.settings.desktopLock = false
      }, 500)
    };
    d.addTouch = function() {
      var g = 0,
        h = 0,
        f = 0,
        e = 0,
        j = this;
      d.settings.slider.on("touchstart", function(l) {
        var k = l.originalEvent.touches[0] || l.originalEvent.changedTouches[0];
        g = k.pageX;
        f = k.pageY
      });
      d.settings.slider.on("touchmove", function(o) {
        if (!d.settings.lock) {
          d.settings.desktopLock = true;
          var n = o.originalEvent.touches[0] || o.originalEvent.changedTouches[0];
          var l = n.pageX;
          var k = n.pageY;
          var q = l - g;
          var m = k - f;
          if (Math.abs(q) > Math.abs(m)) {
            o.preventDefault()
          }
          a(d.settings.slides).css("-webkit-transition", "");
          h = e + (g - l);
          var p = "translate3d(" + (-1 * h) + "px,0px,0px)";
          a(d.settings.slides).css("-webkit-transform", p)
        }
      });
      d.settings.slider.on("touchend", function(p) {
        if (!d.settings.lock) {
          a(d.settings.slides).css("-webkit-transition", "-webkit-transform 400ms");
          var o = p.originalEvent.touches[0] || p.originalEvent.changedTouches[0];
          var m = o.pageX;
          e = h;
          var r = 30;
          if (m < g) {
            var n = g - m;
            var k = (d.settings.wrapper.outerWidth() / 4);
            if (n > k) {
              if (!d.settings.disableNext && !d.settings.lock && (d.settings.currSlide < d.settings.totalSlides - 1 || d.settings.isCircular)) {
                var q = "translate3d(" + (-1 * (100)) + "%,0px,0px)";
                a(d.settings.slides).css("-webkit-transform", q);
                e = 0;
                d.settings.lock = true;
                d.touchNextCircular()
              } else {
                d.settings.lock = true;
                e = 0;
                a(d.settings.slides).css("-webkit-transform", "translate3d(0px,0px,0px)");
                a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                  d.settings.lock = false;
                  d.settings.desktopLock = false;
                  d.settings.transitionComplete = true
                });
                d.clearTouchLock()
              }
            } else {
              d.settings.lock = true;
              e = 0;
              var q = "translate(0%)";
              a(d.settings.slides).css("-webkit-transform", q);
              a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                d.settings.lock = false;
                d.settings.desktopLock = false;
                d.settings.transitionComplete = true
              });
              d.clearTouchLock()
            }
          } else {
            if (m > g) {
              var n = m - g;
              var k = (d.settings.wrapper.outerWidth() / 4);
              a(d.settings.slides).css("-webkit-transition", "-webkit-transform 400ms");
              if (n > k) {
                if (!d.settings.lock && (d.settings.currSlide > 0 || d.settings.isCircular)) {
                  e = 0;
                  d.settings.lock = true;
                  var l = 100;
                  var q = "translate3d(" + (l) + "%,0px,0px)";
                  a(d.settings.slides).css("-webkit-transform", q);
                  d.touchPrevCircular()
                } else {
                  d.settings.lock = true;
                  e = 0;
                  a(d.settings.slides).css("-webkit-transform", "translate3d(0px,0px,0px)");
                  a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                    d.settings.lock = false;
                    d.settings.desktopLock = false
                  })
                }
              } else {
                d.settings.lock = true;
                e = 0;
                var q = "translate(0%)";
                a(d.settings.slides).css("-webkit-transform", q);
                a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                  d.settings.lock = false;
                  d.settings.desktopLock = false;
                  d.settings.transitionComplete = true
                });
                d.clearTouchLock()
              }
            }
          }
        }
      })
    };
    d.touchPrevCircular = function() {
      a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
        a(d.settings.slides).css("-webkit-transition", "");
        if (d.settings.isCircular) {
          if ((d.settings.currSlide + (d.settings.totalSlides - 1)) <= 0) {
            d.settings.currSlide = 0
          } else {
            d.settings.currSlide--
          }
          var e = d.settings.slides[d.settings.currSlide + (d.settings.totalSlides - 1)];
          a(e).css("left", (-2 * 100) + "%");
          d.settings.displayNum = d.settings.currSlide === 0 ? 1 : (d.settings.totalSlides - Math.abs(d.settings.currSlide)) + 1
        } else {
          a(d.settings.wrapper.find(".jcarousel-next")).removeClass("jcarousel-next-disabled");
          d.settings.currSlide--;
          d.settings.displayNum = d.settings.currSlide + 1;
          if (d.settings.displayNum < 2) {
            a(d.settings.wrapper.find(".jcarousel-prev")).addClass("jcarousel-prev-disabled")
          }
        }
        d.settings.slides.each(function(g, j) {
          a(j).css("-webkit-transform", "");
          var h = a(j).outerWidth() * 100 / d.settings.wrapper.outerWidth();
          var f = 0;
          if (d.settings.fixed) {
            f = a(j).outerWidth() + a(j).position().left
          } else {
            f = ((a(j).outerWidth() + (a(j).position().left)) / a(j).outerWidth()) * h + "%"
          }
          a(j).css("-webkit-transform", "");
          a(j).css({
            left: f
          })
        });
        d.settings.callback(d.settings.displayNum);
        d.updateNav();
        d.updateRemaining(d.settings.displayNum);
        if (d.settings.isZoom) {
          a(d.settings.slides).removeClass("zoom-selected");
          a(d.settings.slides[d.settings.displayNum - 1]).addClass("zoom-selected")
        }
        d.settings.lock = false;
        d.settings.desktopLock = false;
        d.checkMultiSlide();
        d.settings.transitionComplete = true
      });
      d.clearTouchLock()
    };
    d.touchNextCircular = function() {
      a(d.settings.slides[0]).off("webkitTransitionEnd").on("webkitTransitionEnd", function() {
        a(d.settings.slides).css("-webkit-transition", "");
        d.settings.slides.each(function(g, j) {
          a(j).css("-webkit-transform", "");
          var h = (a(j).outerWidth()) * 100 / d.settings.wrapper.outerWidth();
          var f = 0;
          if (d.settings.fixed) {
            f = a(j).position().left - a(j).outerWidth()
          } else {
            f = (((a(j).position().left) - a(j).outerWidth()) / a(j).outerWidth()) * h + "%"
          }
          a(j).css({
            left: f
          })
        });
        if (d.settings.isCircular) {
          a(d.settings.slides).css("-webkit-transition", "");
          var e = d.settings.slides[d.settings.currSlide + (d.settings.totalSlides - 1)];
          a(e).css("-webkit-transform", "");
          a(e).css("left", ((d.settings.totalSlides - 2) * 100) + "%");
          if ((d.settings.currSlide + (d.settings.totalSlides - 1)) >= (d.settings.totalSlides - 1)) {
            d.settings.currSlide = -1 * (d.settings.totalSlides - 1)
          } else {
            d.settings.currSlide++
          }
          d.settings.displayNum = d.settings.currSlide === 0 ? 1 : (d.settings.totalSlides - Math.abs(d.settings.currSlide)) + 1
        } else {
          a(d.settings.wrapper.find(".jcarousel-prev")).removeClass("jcarousel-prev-disabled");
          d.settings.currSlide++;
          d.settings.displayNum = d.settings.currSlide + 1;
          if (d.settings.displayNum > d.settings.totalSlides - 1) {
            a(d.settings.wrapper.find(".jcarousel-next")).addClass("jcarousel-next-disabled")
          }
        }
        d.settings.callback(d.settings.displayNum);
        d.updateNav();
        d.updateRemaining(d.settings.displayNum);
        if (d.settings.isZoom) {
          a(d.settings.slides).removeClass("zoom-selected");
          a(d.settings.slides[d.settings.displayNum - 1]).addClass("zoom-selected")
        }
        d.settings.lock = false;
        d.settings.desktopLock = false;
        d.checkMultiSlide();
        transitionComplete = true
      });
      d.clearTouchLock()
    };
    d.next = function() {
      if (!d.settings.disableNext && !d.settings.desktopLock && (d.settings.currSlide < d.settings.totalSlides - 1 || d.settings.isCircular)) {
        d.settings.desktopLock = true;
        d.settings.slides.css("-webkit-transform", "");
        d.settings.slides.each(function(f, h) {
          var g = (a(h).outerWidth()) * 100 / d.settings.wrapper.outerWidth();
          var e = 0;
          if (d.settings.fixed) {
            e = a(h).position().left - a(h).outerWidth()
          } else {
            e = (parseInt(a(h).position().left - a(h).outerWidth()) / a(h).outerWidth()) * g + "%"
          }
          if (d.settings.totalSlides - 1 == f) {
            a(h).animate({
              left: e
            }, 400, d.nextCircular)
          } else {
            a(h).animate({
              left: e
            }, 400)
          }
        })
      }
    };
    d.nextCircular = function() {
      if (d.settings.isCircular) {
        a(d.settings.slides).css("-webkit-transition", "");
        var e = d.settings.slides[d.settings.currSlide + (d.settings.totalSlides - 1)];
        a(e).css("-webkit-transform", "");
        a(e).css("left", ((d.settings.totalSlides - 2) * 100) + "%");
        if ((d.settings.currSlide + (d.settings.totalSlides - 1)) >= (d.settings.totalSlides - 1)) {
          d.settings.currSlide = -1 * (d.settings.totalSlides - 1)
        } else {
          d.settings.currSlide++
        }
        d.settings.displayNum = d.settings.currSlide === 0 ? 1 : (d.settings.totalSlides - Math.abs(d.settings.currSlide)) + 1
      } else {
        a(d.settings.wrapper.find(".jcarousel-prev")).removeClass("jcarousel-prev-disabled");
        d.settings.currSlide++;
        d.settings.displayNum = d.settings.currSlide + 1;
        if (d.settings.displayNum > d.settings.totalSlides - 1) {
          a(d.settings.wrapper.find(".jcarousel-next")).addClass("jcarousel-next-disabled")
        }
      }
      d.settings.callback(d.settings.displayNum);
      d.updateNav();
      d.updateRemaining(d.settings.displayNum);
      if (d.settings.isZoom) {
        a(d.settings.slides).removeClass("zoom-selected");
        a(d.settings.slides[d.settings.displayNum - 1]).addClass("zoom-selected")
      }
      d.settings.desktopLock = false;
      d.checkMultiSlide()
    };
    d.prev = function() {
      if (!d.settings.desktopLock && (d.settings.currSlide > 0 || d.settings.isCircular)) {
        d.settings.desktopLock = true;
        if (d.settings.isCircular) {
          if ((d.settings.currSlide + (d.settings.totalSlides - 1)) <= 0) {
            d.settings.currSlide = 0
          } else {
            d.settings.currSlide--
          }
          d.settings.displayNum = d.settings.currSlide === 0 ? 1 : (d.settings.totalSlides - Math.abs(d.settings.currSlide)) + 1;
          var e = d.settings.slides[d.settings.currSlide + (d.settings.totalSlides - 1)];
          a(e).css("left", (-2 * 100) + "%")
        } else {
          a(d.settings.wrapper.find(".jcarousel-next")).removeClass("jcarousel-next-disabled");
          d.settings.currSlide--;
          d.settings.displayNum = d.settings.currSlide + 1;
          if (d.settings.displayNum < 2) {
            a(d.settings.wrapper.find(".jcarousel-prev")).addClass("jcarousel-prev-disabled")
          }
        }
        d.settings.callback(d.settings.displayNum);
        d.updateNav();
        d.settings.slides.each(function(g, j) {
          var h = parseInt(a(j).outerWidth() * 100 / d.settings.wrapper.outerWidth());
          var f = 0;
          if (d.settings.fixed) {
            f = a(j).outerWidth() + a(j).position().left
          } else {
            f = (parseInt(a(j).outerWidth() + a(j).position().left) / a(j).outerWidth()) * h + "%"
          }
          a(j).css("-webkit-transform", "");
          if (d.settings.totalSlides - 1 == g) {
            a(j).animate({
              left: f
            }, 400, d.prevCircular)
          } else {
            a(j).animate({
              left: f
            }, 400)
          }
        })
      }
    };
    d.prevCircular = function() {
      d.updateRemaining(d.settings.displayNum);
      if (d.settings.isZoom) {
        a(d.settings.slides).removeClass("zoom-selected");
        a(d.settings.slides[d.settings.displayNum - 1]).addClass("zoom-selected")
      }
      d.settings.desktopLock = false;
      d.checkMultiSlide()
    };
    if (a(b.slider.children("li")).length) {
      d.init()
    }
  };
  a.fn.carousel = function(b) {
    return this.each(function() {
      var c = new a.carousel(this, b);
      a(this).data("carousel", c)
    })
  }
})(jQuery);