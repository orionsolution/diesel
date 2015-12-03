(function(b) {
  var a = [];
  b.fn.inViewport = function(c, d) {
    return this.each(function() {
      var e = {
        element: this,
        inFunction: c,
        outFunction: d
      };
      a.push(e);
      doCheck = function() {
        var j = b(window).scrollTop(),
          n = j + b(window).height(),
          f = b(window).scrollLeft(),
          g = f + b(window).width();
        for (var k = 0; k < a.length; k++) {
          var l = a[k].element,
            q = b(l),
            p = q.offset().top,
            h = q.offset().left,
            o = h + q.outerWidth(),
            m = p + q.outerHeight();
          if (p < n && h < g && m > j && o > f) {
            if (q.attr("data-vpStatus") != "in") {
              q.attr("data-vpStatus", "in");
              if (typeof(a[k].inFunction) == "function") {
                a[k].inFunction.call(l)
              }
            }
          } else {
            if (q.attr("data-vpStatus") != "out") {
              q.attr("data-vpStatus", "out");
              if (typeof(a[k].outFunction) == "function") {
                a[k].outFunction.call(l)
              }
            }
          }
        }
      };
      b(window).scroll(doCheck).resize(doCheck);
      doCheck()
    })
  }
})(jQuery);