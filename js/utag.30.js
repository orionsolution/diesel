//tealium universal tag - utag.30 ut4.0.201510011453, Copyright 2015 Tealium.com Inc. All Rights Reserved.
try {
  (function(id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;
    if (utag === undefined) {
      utag = {};
    }
    if (utag.ut === undefined) {
      utag.ut = {};
    }
    if (utag.ut.loader === undefined) {
      u.loader = function(o) {
        var a, b, c, l;
        a = document;
        if (o.type === "iframe") {
          b = a.createElement("iframe");
          b.setAttribute("height", "1");
          b.setAttribute("width", "1");
          b.setAttribute("style", "display:none");
          b.setAttribute("src", o.src);
        } else if (o.type === "img") {
          utag.DB("Attach img: " + o.src);
          b = new Image();
          b.src = o.src;
          return;
        } else {
          b = a.createElement("script");
          b.language = "javascript";
          b.type = "text/javascript";
          b.async = 1;
          b.charset = "utf-8";
          b.src = o.src;
        }
        if (o.id) {
          b.id = o.id;
        }
        if (typeof o.cb === "function") {
          if (b.addEventListener) {
            b.addEventListener("load", function() {
              o.cb();
            }, false);
          } else {
            b.onreadystatechange = function() {
              if (this.readyState === "complete" || this.readyState === "loaded") {
                this.onreadystatechange = null;
                o.cb();
              }
            };
          }
        }
        l = o.loc || "head";
        c = a.getElementsByTagName(l)[0];
        if (c) {
          utag.DB("Attach to " + l + ": " + o.src);
          if (l === "script") {
            c.parentNode.insertBefore(b, c);
          } else {
            c.appendChild(b);
          }
        }
      };
    } else {
      u.loader = utag.ut.loader;
    }
    u.ev = {
      "view": 1
    };
    u.map = {
      "order_total": "revenue"
    };
    u.extend = [];
    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        var c, d, e, f, g;
        u.data = {
          "qsp_delim": "&",
          "kvp_delim": "=",
          "base_url": "//ad.atdmt.com/m/a.js",
          "mid": "11052200971219",
          "cache": Math.random(),
          "revenue": "",
          "qty": 0,
          "coupon_rule": "",
          "order_id": "",
          "order_subtotal": "",
          "order_shipping": "",
          "order_tax": "",
          "order_coupon_code": "",
          "order_type": "",
          "product_quantity": []
        };
        c = [];
        g = [];
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("custom.") === 0) {
                u.data[e[f]] = b[d];
                c.push(e[f].substr(7) + u.data.kvp_delim + b[d]);
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }
        u.data.order_id = u.data.order_id || b._corder || "";
        u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
        u.data.order_shipping = u.data.order_shipping || b._cship || "";
        u.data.order_currency = b._ccurrency || "";
        u.data.order_tax = u.data.order_tax || b._ctax || "";
        u.data.order_coupon_code = u.data.order_coupon_code || b._cpromo || "";
        u.data.order_type = u.data.order_type || b._ctype || "";
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
          u.data.product_quantity = b._cquan.slice(0);
        }
        if (b._cprod !== undefined) {
          u.data.order_prodid = b._cprod.join(",");
        }
        if (b._cprodname !== undefined) {
          u.data.order_prodname = b._cprodname.join(",");
        }
        g.push("m" + u.data.kvp_delim + u.data.mid);
        g.push("cache" + u.data.kvp_delim + u.data.cache);
        u.data.base_url += ";" + g.join(";") + "?";
        if (u.data.order_id) {
          if (u.data.qty === 0) {
            for (f = 0; f < u.data.product_quantity.length; f++) {
              u.data.qty += parseInt(u.data.product_quantity[f]);
            }
          }
          c.push("qty" + u.data.kvp_delim + u.data.qty);
          c.push("order_id" + u.data.kvp_delim + u.data.order_id);
          c.push("revenue" + u.data.kvp_delim + u.data.revenue);
          c.push("product_id" + u.data.kvp_delim + u.data.order_prodid);
          c.push("currency" + u.data.kvp_delim + u.data.order_currency);
          c.push("product_name" + u.data.kvp_delim + u.data.order_prodname);
          c.push("subtotal" + u.data.kvp_delim + u.data.order_subtotal);
          c.push("order_tax" + u.data.kvp_delim + u.data.order_tax);
          c.push("order_shipping" + u.data.kvp_delim + u.data.order_shipping);
          c.push("order_type" + u.data.kvp_delim + u.data.order_type);
          c.push("coupon_code" + u.data.kvp_delim + u.data.order_coupon_code);
          c.push("coupon_rule" + u.data.kvp_delim + u.data.coupon_rule);
        }
        u.loader({
          "type": "script",
          "src": u.data.base_url + c.join(u.data.qsp_delim),
          "loc": "script",
          "id": "utag_30"
        });
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("30", "diesel.main"));
} catch (error) {
  utag.DB(error);
}