/*!
 * backgroundVideo v0.2.0
 * https://github.com/linnett/backgroundVideo
 * Use HTML5 video to create an effect like the CSS property, 'background-size: cover'. Includes parallax option.
 *
 * Copyright 2014 Sam Linnett
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 *
 */
;
(function(e, c, a, g) {
  var d = "backgroundVideo",
    f = {
      $videoWrap: e("#video-wrap"),
      $outerWrap: e(c),
      $window: e(c),
      minimumVideoWidth: 400,
      preventContextMenu: false,
      parallax: true,
      parallaxOptions: {
        effect: 1.5
      },
      pauseVideoOnViewLoss: false
    };

  function b(i, h) {
    var j = this;
    this.element = i;
    this.options = e.extend({}, f, h);
    this._defaults = f;
    this._name = d;
    this.options.$video = e(i);
    this.detectBrowser();
    this.shimRequestAnimationFrame();
    this.options.has3d = this.detect3d();
    this.options.$videoWrap.css({
      position: "relative",
      overflow: "hidden",
      "z-index": "10"
    });
    this.options.$video.css({
      position: "absolute",
      "z-index": "1"
    });
    this.options.$video.on("canplay canplaythrough", k);
    if (this.options.$video[0].readyState > 3) {
      k()
    }

    function k() {
      j.options.originalVideoW = j.options.$video[0].videoWidth;
      j.options.originalVideoH = j.options.$video[0].videoHeight;
      if (j.initialised) {
        return
      }
      j.init()
    }
  }
  b.prototype = {
    init: function() {
      var h = this;
      this.initialised = true;
      this.lastPosition = -1;
      this.ticking = false;
      this.options.$window.resize(function() {
        h.positionObject()
      });
      if (this.options.parallax) {
        this.options.$window.on("scroll", function() {
          h.update()
        })
      }
      if (this.options.pauseVideoOnViewLoss) {
        this.playPauseVideo()
      }
      if (this.options.preventContextMenu) {
        this.options.$video.on("contextmenu", function() {
          return false
        })
      }
      this.options.$window.trigger("resize")
    },
    requestTick: function() {
      var h = this;
      if (!this.ticking) {
        c.requestAnimationFrame(h.positionObject.bind(h));
        this.ticking = true
      }
    },
    update: function() {
      var h = this;
      this.lastPosition = c.pageYOffset;
      this.requestTick()
    },
    detect3d: function() {
      var j = a.createElement("p"),
        h, k, i = {
          WebkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          MSTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform"
        };
      a.body.insertBefore(j, a.body.lastChild);
      for (h in i) {
        if (j.style[h] !== g) {
          j.style[h] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
          k = c.getComputedStyle(j).getPropertyValue(i[h])
        }
      }
      j.parentNode.removeChild(j);
      if (k !== g) {
        return k !== "none"
      } else {
        return false
      }
    },
    detectBrowser: function() {
      var h = navigator.userAgent.toLowerCase();
      if (h.indexOf("chrome") > -1 || h.indexOf("safari") > -1) {
        this.options.browser = "webkit";
        this.options.browserPrexix = "-webkit-"
      } else {
        if (h.indexOf("firefox") > -1) {
          this.options.browser = "firefox";
          this.options.browserPrexix = "-moz-"
        } else {
          if (h.indexOf("MSIE") !== -1 || h.indexOf("Trident/") > 0) {
            this.options.browser = "ie";
            this.options.browserPrexix = "-ms-"
          } else {
            if (h.indexOf("Opera") > -1) {
              this.options.browser = "opera";
              this.options.browserPrexix = "-o-"
            }
          }
        }
      }
    },
    scaleObject: function() {
      var i = this,
        j, k, h;
      this.options.$videoWrap.width(this.options.$window.width());
      this.options.$videoWrap.height(this.options.$outerWrap.height());
      j = this.options.$window.width() / this.options.originalVideoW;
      k = this.options.$window.height() / this.options.originalVideoH;
      h = j > k ? j : k;
      if (h * this.options.originalVideoW < this.options.minimumVideoWidth) {
        h = this.options.minimumVideoWidth / this.options.originalVideoW
      }
      this.options.$video.width(h * this.options.originalVideoW);
      this.options.$video.height(h * this.options.originalVideoH);
      return {
        xPos: -(parseInt(this.options.$video.width() - this.options.$window.width()) / 2),
        yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2
      }
    },
    positionObject: function() {
      var j = this,
        l = c.pageYOffset,
        h = this.scaleObject(this.options.$video, j.options.$videoWrap),
        k = h.xPos,
        i = h.yPos;
      if (this.options.parallax) {
        if (l >= 0) {
          i = this.calculateYPos(i, l)
        } else {
          i = this.calculateYPos(i, 0)
        }
      } else {
        i = -i
      }
      if (j.options.has3d) {
        this.options.$video.css(j.options.browserPrexix + "transform3d", "translate3d(-" + k + "px, " + i + "px, 0)");
        this.options.$video.css("transform", "translate3d(" + k + "px, " + i + "px, 0)")
      } else {
        this.options.$video.css(j.options.browserPrexix + "transform", "translate(-" + k + "px, " + i + "px)");
        this.options.$video.css("transform", "translate(" + k + "px, " + i + "px)")
      }
      this.ticking = false
    },
    calculateYPos: function(j, k) {
      var i, h;
      i = parseInt(this.options.$videoWrap.offset().top);
      h = i - k;
      j = -((h / this.options.parallaxOptions.effect) + j);
      return j
    },
    disableParallax: function() {
      this.options.$window.unbind(".backgroundVideoParallax")
    },
    playPauseVideo: function() {
      var h = this;
      this.options.$window.on("scroll.backgroundVideoPlayPause", function() {
        if (h.options.$window.scrollTop() < h.options.$videoWrap.height()) {
          h.options.$video.get(0).play()
        } else {
          h.options.$video.get(0).pause()
        }
      })
    },
    shimRequestAnimationFrame: function() {
      var i = 0;
      var j = ["ms", "moz", "webkit", "o"];
      for (var h = 0; h < j.length && !c.requestAnimationFrame; ++h) {
        c.requestAnimationFrame = c[j[h] + "RequestAnimationFrame"];
        c.cancelAnimationFrame = c[j[h] + "CancelAnimationFrame"] || c[j[h] + "CancelRequestAnimationFrame"]
      }
      if (!c.requestAnimationFrame) {
        c.requestAnimationFrame = function(o, l) {
          var k = new Date().getTime();
          var m = Math.max(0, 16 - (k - i));
          var n = c.setTimeout(function() {
            o(k + m)
          }, m);
          i = k + m;
          return n
        }
      }
      if (!c.cancelAnimationFrame) {
        c.cancelAnimationFrame = function(k) {
          clearTimeout(k)
        }
      }
    }
  };
  e.fn[d] = function(h) {
    return this.each(function() {
      if (!e.data(this, "plugin_" + d)) {
        e.data(this, "plugin_" + d, new b(this, h))
      }
    })
  }
})(jQuery, window, document);