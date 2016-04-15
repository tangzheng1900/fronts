require = function e(t, n, r) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!s && u)return u(a, !0);
                if (o)return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = n[a] = {exports: {}};
            t[a][0].call(l.exports, function (e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[a].exports
    }

    for (var o = "function" == typeof require && require, a = 0; a < r.length; a++)i(r[a]);
    return i
}({
    "jquery.touch": [function (e, t, n) {
        !function (e) {
            function t(t, n) {
                var r = this;
                r.settings = {}, r.settings = e.extend(r.settings, o), r.settings = e.extend(r.settings, n), r.element = t, r.inTap = !1, r.inDrag = !1, r.tapStart = null, r.dragStart = null, r.timerTap = null, r.timerTapAndHold = null, r.tapScrollTop = null, r.mouseDown = !1, r.x = null, r.y = null, r.ex = null, r.ey = null, r.taps = 0, r.init()
            }

            function n(e, t, n) {
                var r, i, o, a, s;
                return r = e.element.offset(), i = e.element.width(), o = e.element.height(), a = Math.min(Math.max(t, r.left), r.left + i), s = Math.min(Math.max(n, r.top), r.top + o), {
                    x: a,
                    y: s
                }
            }

            var r = e(document), i = null, o = {
                useMouse: !0,
                trackDocument: !1,
                trackDocumentNormalize: !1,
                noClick: !1,
                dragThreshold: 10,
                dragDelay: 200,
                swipeThreshold: 30,
                tapDelay: 250,
                tapAndHoldDelay: 750,
                preventDefault: {drag: !1, swipe: !1, tap: !1}
            };
            t.prototype.init = function () {
                var e = this, t = !1, i = !1;
                e.settings.noClick && e.element.on("click", function (e) {
                    e.preventDefault()
                }), e.element.on("touchstart", function (n) {
                    t = !0, e.doStart(n, n.originalEvent.touches[0].pageX, n.originalEvent.touches[0].pageY), window.setTimeout(function () {
                        t = !1
                    }, 1e3)
                }).on("touchmove", function (t) {
                    var r = n(e, t.originalEvent.touches[0].pageX, t.originalEvent.touches[0].pageY);
                    e.doMove(t, r.x, r.y)
                }).on("touchend", function (t) {
                    i = !0;
                    var r = n(e, t.originalEvent.changedTouches[0].pageX, t.originalEvent.changedTouches[0].pageY);
                    e.doEnd(t, r.x, r.y), window.setTimeout(function () {
                        i = !1
                    }, 1e3)
                }), e.settings.useMouse && (e.mouseDown = !1, e.element.on("mousedown", function (n) {
                    return t ? !1 : (e.mouseDown = !0, void e.doStart(n, n.pageX, n.pageY))
                }).on("mousemove", function (t) {
                    e.mouseDown && e.doMove(t, t.pageX, t.pageY)
                }).on("mouseup", function (t) {
                    return i ? !1 : (r.triggerHandler("mouseup", t), e.doEnd(t, t.pageX, t.pageY), void(e.mouseDown = !1))
                })), e.settings.trackDocument || e.element.on("mouseleave", function (t) {
                    e.doEnd(t, t.pageX, t.pageY), e.mouseDown = !1
                })
            }, t.prototype.uses = function (t) {
                var n = e._data(this.element[0], "events");
                switch (t) {
                    case"swipe":
                        return n.hasOwnProperty(t) || n.hasOwnProperty("swipeUp") || n.hasOwnProperty("swipeDown") || n.hasOwnProperty("swipeLeft") || n.hasOwnProperty("swipeRight");
                    case"drag":
                        return n.hasOwnProperty(t) || n.hasOwnProperty("dragStart") || n.hasOwnProperty("dragEnd");
                    case"tapAndHold":
                    case"doubleTap":
                        return n.hasOwnProperty(t);
                    case"tap":
                        return n.hasOwnProperty(t) || n.hasOwnProperty("doubleTap") || n.hasOwnProperty("tapAndHold")
                }
                return !1
            }, t.prototype.scrolled = function () {
                return null !== this.tapScrollTop && this.tapScrollTop != r.scrollTop()
            }, t.prototype.cancel = function (e) {
                var t = this;
                t.taps = 0, t.inTap = !1, t.inDrag = !1, t.tapStart = null, t.dragStart = null, e && (t.mouseDown = !1)
            }, t.prototype.doStart = function (e, t, n) {
                var i = this, o = i.element.offset();
                e.stopPropagation(), (i.uses("drag") && i.settings.preventDefault.drag || i.uses("swipe") && i.settings.preventDefault.swipe || i.uses("tap") && i.settings.preventDefault.tap) && e.preventDefault(), i.uses("tapAndHold") && i.element.css("-webkit-touch-callout", "none").css("-webkit-user-select", "none"), i.x = t, i.y = n, i.ex = t - o.left, i.ey = n - o.top, i.tapStart = Date.now(), i.tapScrollTop = r.scrollTop(), window.clearTimeout(i.timerTap), i.timerTap = window.setTimeout(function () {
                    i.inTap && i.taps > 0 && (i.element.trigger(2 == i.taps ? "doubleTap" : "tap", {
                        taps: i.taps,
                        x: i.x,
                        y: i.y,
                        ex: i.ex,
                        ey: i.ey,
                        duration: Date.now() - i.tapStart,
                        event: e
                    }), i.cancel()), i.timerTap = null
                }, i.settings.tapDelay), i.uses("tapAndHold") && (window.clearTimeout(i.timerTapAndHold), i.timerTapAndHold = window.setTimeout(function () {
                    i.inTap && (i.element.trigger("tapAndHold", {
                        x: i.x,
                        y: i.y,
                        ex: i.ex,
                        ey: i.ey,
                        duration: Date.now() - i.tapStart,
                        event: e
                    }), i.cancel()), i.timerTapAndHold = null
                }, i.settings.tapAndHoldDelay)), i.inTap = !0
            }, t.prototype.doMove = function (e, t, n) {
                var r = this, o = r.element.offset(), a = (Math.abs(r.x - t) + Math.abs(r.y - n)) / 2;
                if (e.stopPropagation(), (r.uses("swipe") && r.settings.preventDefault.swipe || r.uses("drag") && r.settings.preventDefault.drag) && e.preventDefault(), r.inDrag && i == r)r.element.trigger("drag", {
                    x: t,
                    y: n,
                    ex: t - o.left,
                    ey: n - o.top,
                    event: e
                }); else if (a > r.settings.dragThreshold) {
                    if (Date.now() - r.tapStart < r.settings.dragDelay)return void r.cancel();
                    r.cancel(), r.inDrag = !0, r.dragStart = Date.now(), r.uses("drag") && e.preventDefault(), r.element.trigger("dragStart", {
                        x: t,
                        y: n,
                        ex: t - o.left,
                        ey: n - o.top,
                        event: e
                    }), i = r
                }
            }, t.prototype.doEnd = function (e, t, n) {
                var r, o, a, s = this, u = s.element.offset(), c = Math.abs(s.x - t), l = Math.abs(s.y - n);
                e.stopPropagation(), s.inTap ? (s.taps++, (!s.timerTap || 1 == s.taps && !s.uses("doubleTap") || 2 == s.taps && s.uses("doubleTap")) && (s.element.trigger(2 == s.taps ? "doubleTap" : "tap", {
                    taps: s.taps,
                    x: s.x,
                    y: s.y,
                    ex: s.ex,
                    ey: s.ey,
                    duration: Date.now() - s.tapStart,
                    event: e
                }), s.cancel())) : s.inDrag && (a = Date.now() - s.dragStart, r = Math.sqrt(Math.pow(Math.abs(s.x - t), 2) + Math.pow(Math.abs(s.y - n), 2)), o = r / a, s.element.trigger("dragEnd", {
                    start: {
                        x: s.x,
                        y: s.y,
                        ex: s.ex,
                        ey: s.ey
                    }, end: {x: t, y: n, ex: t - u.left, ey: n - u.top}, distance: r, duration: a, velocity: o, event: e
                }), i = null, (c > s.settings.swipeThreshold || l > s.settings.swipeThreshold) && (s.element.trigger("swipe", {
                    distance: r,
                    duration: a,
                    velocity: o,
                    event: e
                }), c > l ? (o = c / a, t < s.x ? s.element.trigger("swipeLeft", {
                    distance: c,
                    duration: a,
                    velocity: o,
                    event: e
                }) : s.element.trigger("swipeRight", {
                    distance: c,
                    duration: a,
                    velocity: o,
                    event: e
                })) : l > c && (o = l / a, n < s.y ? s.element.trigger("swipeUp", {
                    distance: l,
                    duration: a,
                    velocity: o,
                    event: e
                }) : s.element.trigger("swipeDown", {distance: l, duration: a, velocity: o, event: e}))), s.inDrag = !1)
            }, e.fn.enableTouch = function (n) {
                var r, i;
                if (0 == this.length)return e(this);
                if (this.length > 1) {
                    for (var o = 0; o < this.length; o++)e(this[o]).enableTouch();
                    return e(this)
                }
                return r = e(this), i = new t(r, n), r.get(0)._touch = i, r
            }, r.on("mousemove", function (e) {
                var t = i;
                if (t && t.settings.useMouse && t.mouseDown && t.settings.trackDocument) {
                    var r = e.pageX, o = e.pageY;
                    if (t.settings.trackDocumentNormalize) {
                        var a = n(t, r, o);
                        r = a.x, o = a.y
                    }
                    t.doMove(e, r, o)
                }
            }).on("mouseup", function (e, t) {
                var r = i;
                if (r && r.settings.useMouse && r.settings.trackDocument) {
                    if ("undefined" != typeof t && (e = t), !("pageX" in e))return;
                    var o = e.pageX, a = e.pageY;
                    if (r.settings.trackDocumentNormalize) {
                        var s = n(r, o, a);
                        o = s.x, a = s.y
                    }
                    r.doEnd(e, o, a), r.mouseDown = !1
                }
            })
        }(jQuery)
    }, {}], jquery: [function (e, t, n) {
        !function (e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function (e) {
                if (!e.document)throw new Error("jQuery requires a window with a document");
                return n(e)
            } : n(e)
        }("undefined" != typeof window ? window : this, function (e, t) {
            function n(e) {
                var t = "length" in e && e.length, n = K.type(e);
                return "function" === n || K.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }

            function r(e, t, n) {
                if (K.isFunction(t))return K.grep(e, function (e, r) {
                    return !!t.call(e, r, e) !== n
                });
                if (t.nodeType)return K.grep(e, function (e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (se.test(t))return K.filter(t, e, n);
                    t = K.filter(t, e)
                }
                return K.grep(e, function (e) {
                    return U.call(t, e) >= 0 !== n
                })
            }

            function i(e, t) {
                for (; (e = e[t]) && 1 !== e.nodeType;);
                return e
            }

            function o(e) {
                var t = he[e] = {};
                return K.each(e.match(de) || [], function (e, n) {
                    t[n] = !0
                }), t
            }

            function a() {
                J.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), K.ready()
            }

            function s() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function () {
                        return {}
                    }
                }), this.expando = K.expando + s.uid++
            }

            function u(e, t, n) {
                var r;
                if (void 0 === n && 1 === e.nodeType)if (r = "data-" + t.replace(be, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : xe.test(n) ? K.parseJSON(n) : n
                    } catch (i) {
                    }
                    ye.set(e, t, n)
                } else n = void 0;
                return n
            }

            function c() {
                return !0
            }

            function l() {
                return !1
            }

            function f() {
                try {
                    return J.activeElement
                } catch (e) {
                }
            }

            function p(e, t) {
                return K.nodeName(e, "table") && K.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function d(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function h(e) {
                var t = Pe.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function g(e, t) {
                for (var n = 0, r = e.length; r > n; n++)ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"))
            }

            function m(e, t) {
                var n, r, i, o, a, s, u, c;
                if (1 === t.nodeType) {
                    if (ve.hasData(e) && (o = ve.access(e), a = ve.set(t, o), c = o.events)) {
                        delete a.handle, a.events = {};
                        for (i in c)for (n = 0, r = c[i].length; r > n; n++)K.event.add(t, i, c[i][n])
                    }
                    ye.hasData(e) && (s = ye.access(e), u = K.extend({}, s), ye.set(t, u))
                }
            }

            function v(e, t) {
                var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && K.nodeName(e, t) ? K.merge([e], n) : n
            }

            function y(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && ke.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }

            function x(t, n) {
                var r, i = K(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : K.css(i[0], "display");
                return i.detach(), o
            }

            function b(e) {
                var t = J, n = Ie[e];
                return n || (n = x(e, t), "none" !== n && n || (Re = (Re || K("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Re[0].contentDocument, t.write(), t.close(), n = x(e, t), Re.detach()), Ie[e] = n), n
            }

            function w(e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || Be(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || K.contains(e.ownerDocument, e) || (a = K.style(e, t)), _e.test(a) && We.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
            }

            function T(e, t) {
                return {
                    get: function () {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }

            function C(e, t) {
                if (t in e)return t;
                for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Ze.length; i--;)if (t = Ze[i] + n, t in e)return t;
                return r
            }

            function k(e, t, n) {
                var r = Xe.exec(t);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
            }

            function D(e, t, n, r, i) {
                for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += K.css(e, n + Te[o], !0, i)), r ? ("content" === n && (a -= K.css(e, "padding" + Te[o], !0, i)), "margin" !== n && (a -= K.css(e, "border" + Te[o] + "Width", !0, i))) : (a += K.css(e, "padding" + Te[o], !0, i), "padding" !== n && (a += K.css(e, "border" + Te[o] + "Width", !0, i)));
                return a
            }

            function S(e, t, n) {
                var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Be(e), a = "border-box" === K.css(e, "boxSizing", !1, o);
                if (0 >= i || null == i) {
                    if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), _e.test(i))return i;
                    r = a && (G.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
                }
                return i + D(e, t, n || (a ? "border" : "content"), r, o) + "px"
            }

            function E(e, t) {
                for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = ve.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ce(r) && (o[a] = ve.access(r, "olddisplay", b(r.nodeName)))) : (i = Ce(r), "none" === n && i || ve.set(r, "olddisplay", i ? n : K.css(r, "display"))));
                for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
                return e
            }

            function N(e, t, n, r, i) {
                return new N.prototype.init(e, t, n, r, i)
            }

            function A() {
                return setTimeout(function () {
                    Ge = void 0
                }), Ge = K.now()
            }

            function j(e, t) {
                var n, r = 0, i = {height: e};
                for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = Te[r], i["margin" + n] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e), i
            }

            function M(e, t, n) {
                for (var r, i = (nt[t] || []).concat(nt["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
            }

            function H(e, t, n) {
                var r, i, o, a, s, u, c, l, f = this, p = {}, d = e.style, h = e.nodeType && Ce(e), g = ve.get(e, "fxshow");
                n.queue || (s = K._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
                    s.unqueued || u()
                }), s.unqueued++, f.always(function () {
                    f.always(function () {
                        s.unqueued--, K.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], c = K.css(e, "display"), l = "none" === c ? ve.get(e, "olddisplay") || b(e.nodeName) : c, "inline" === l && "none" === K.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function () {
                    d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
                }));
                for (r in t)if (i = t[r], Qe.exec(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                        if ("show" !== i || !g || void 0 === g[r])continue;
                        h = !0
                    }
                    p[r] = g && g[r] || K.style(e, r)
                } else c = void 0;
                if (K.isEmptyObject(p))"inline" === ("none" === c ? b(e.nodeName) : c) && (d.display = c); else {
                    g ? "hidden" in g && (h = g.hidden) : g = ve.access(e, "fxshow", {}), o && (g.hidden = !h), h ? K(e).show() : f.done(function () {
                        K(e).hide()
                    }), f.done(function () {
                        var t;
                        ve.remove(e, "fxshow");
                        for (t in p)K.style(e, t, p[t])
                    });
                    for (r in p)a = M(h ? g[r] : 0, r, f), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
                }
            }

            function L(e, t) {
                var n, r, i, o, a;
                for (n in e)if (r = K.camelCase(n), i = t[r], o = e[n], K.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = K.cssHooks[r], a && "expand" in a) {
                    o = a.expand(o), delete e[r];
                    for (n in o)n in e || (e[n] = o[n], t[n] = i)
                } else t[r] = i
            }

            function O(e, t, n) {
                var r, i, o = 0, a = tt.length, s = K.Deferred().always(function () {
                    delete u.elem
                }), u = function () {
                    if (i)return !1;
                    for (var t = Ge || A(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, o = 1 - r, a = 0, u = c.tweens.length; u > a; a++)c.tweens[a].run(o);
                    return s.notifyWith(e, [c, o, n]), 1 > o && u ? n : (s.resolveWith(e, [c]), !1)
                }, c = s.promise({
                    elem: e,
                    props: K.extend({}, t),
                    opts: K.extend(!0, {specialEasing: {}}, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Ge || A(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                        var r = K.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(r), r
                    },
                    stop: function (t) {
                        var n = 0, r = t ? c.tweens.length : 0;
                        if (i)return this;
                        for (i = !0; r > n; n++)c.tweens[n].run(1);
                        return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this
                    }
                }), l = c.props;
                for (L(l, c.opts.specialEasing); a > o; o++)if (r = tt[o].call(c, e, l, c.opts))return r;
                return K.map(l, M, c), K.isFunction(c.opts.start) && c.opts.start.call(e, c), K.fx.timer(K.extend(u, {
                    elem: e,
                    anim: c,
                    queue: c.opts.queue
                })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
            }

            function q(e) {
                return function (t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var r, i = 0, o = t.toLowerCase().match(de) || [];
                    if (K.isFunction(n))for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function P(e, t, n, r) {
                function i(s) {
                    var u;
                    return o[s] = !0, K.each(e[s] || [], function (e, s) {
                        var c = s(t, n, r);
                        return "string" != typeof c || a || o[c] ? a ? !(u = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
                    }), u
                }

                var o = {}, a = e === xt;
                return i(t.dataTypes[0]) || !o["*"] && i("*")
            }

            function $(e, t) {
                var n, r, i = K.ajaxSettings.flatOptions || {};
                for (n in t)void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                return r && K.extend(!0, e, r), e
            }

            function F(e, t, n) {
                for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)for (i in s)if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
                if (u[0] in n)o = u[0]; else {
                    for (i in n) {
                        if (!u[0] || e.converters[i + " " + u[0]]) {
                            o = i;
                            break
                        }
                        a || (a = i)
                    }
                    o = o || a
                }
                return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
            }

            function R(e, t, n, r) {
                var i, o, a, s, u, c = {}, l = e.dataTypes.slice();
                if (l[1])for (a in e.converters)c[a.toLowerCase()] = e.converters[a];
                for (o = l.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = l.shift())if ("*" === o)o = u; else if ("*" !== u && u !== o) {
                    if (a = c[u + " " + o] || c["* " + o], !a)for (i in c)if (s = i.split(" "), s[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                        a === !0 ? a = c[i] : c[i] !== !0 && (o = s[0], l.unshift(s[1]));
                        break
                    }
                    if (a !== !0)if (a && e["throws"])t = a(t); else try {
                        t = a(t)
                    } catch (f) {
                        return {state: "parsererror", error: a ? f : "No conversion from " + u + " to " + o}
                    }
                }
                return {state: "success", data: t}
            }

            function I(e, t, n, r) {
                var i;
                if (K.isArray(t))K.each(t, function (t, i) {
                    n || kt.test(e) ? r(e, i) : I(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
                }); else if (n || "object" !== K.type(t))r(e, t); else for (i in t)I(e + "[" + i + "]", t[i], n, r)
            }

            function W(e) {
                return K.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
            }

            var _ = [], B = _.slice, z = _.concat, X = _.push, U = _.indexOf, V = {}, Y = V.toString, Z = V.hasOwnProperty, G = {}, J = e.document, Q = "2.1.4", K = function (e, t) {
                return new K.fn.init(e, t)
            }, ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, te = /^-ms-/, ne = /-([\da-z])/gi, re = function (e, t) {
                return t.toUpperCase()
            };
            K.fn = K.prototype = {
                jquery: Q, constructor: K, selector: "", length: 0, toArray: function () {
                    return B.call(this)
                }, get: function (e) {
                    return null != e ? 0 > e ? this[e + this.length] : this[e] : B.call(this)
                }, pushStack: function (e) {
                    var t = K.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                }, each: function (e, t) {
                    return K.each(this, e, t)
                }, map: function (e) {
                    return this.pushStack(K.map(this, function (t, n) {
                        return e.call(t, n, t)
                    }))
                }, slice: function () {
                    return this.pushStack(B.apply(this, arguments))
                }, first: function () {
                    return this.eq(0)
                }, last: function () {
                    return this.eq(-1)
                }, eq: function (e) {
                    var t = this.length, n = +e + (0 > e ? t : 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                }, end: function () {
                    return this.prevObject || this.constructor(null)
                }, push: X, sort: _.sort, splice: _.splice
            }, K.extend = K.fn.extend = function () {
                var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || K.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)if (null != (e = arguments[s]))for (t in e)n = a[t], r = e[t], a !== r && (c && r && (K.isPlainObject(r) || (i = K.isArray(r))) ? (i ? (i = !1, o = n && K.isArray(n) ? n : []) : o = n && K.isPlainObject(n) ? n : {}, a[t] = K.extend(c, o, r)) : void 0 !== r && (a[t] = r));
                return a
            }, K.extend({
                expando: "jQuery" + (Q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                    throw new Error(e)
                }, noop: function () {
                }, isFunction: function (e) {
                    return "function" === K.type(e)
                }, isArray: Array.isArray, isWindow: function (e) {
                    return null != e && e === e.window
                }, isNumeric: function (e) {
                    return !K.isArray(e) && e - parseFloat(e) + 1 >= 0
                }, isPlainObject: function (e) {
                    return "object" !== K.type(e) || e.nodeType || K.isWindow(e) ? !1 : e.constructor && !Z.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
                }, isEmptyObject: function (e) {
                    var t;
                    for (t in e)return !1;
                    return !0
                }, type: function (e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? V[Y.call(e)] || "object" : typeof e
                }, globalEval: function (e) {
                    var t, n = eval;
                    e = K.trim(e), e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"), t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                }, camelCase: function (e) {
                    return e.replace(te, "ms-").replace(ne, re)
                }, nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                }, each: function (e, t, r) {
                    var i, o = 0, a = e.length, s = n(e);
                    if (r) {
                        if (s)for (; a > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
                    } else if (s)for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
                    return e
                }, trim: function (e) {
                    return null == e ? "" : (e + "").replace(ee, "")
                }, makeArray: function (e, t) {
                    var r = t || [];
                    return null != e && (n(Object(e)) ? K.merge(r, "string" == typeof e ? [e] : e) : X.call(r, e)), r
                }, inArray: function (e, t, n) {
                    return null == t ? -1 : U.call(t, e, n)
                }, merge: function (e, t) {
                    for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
                    return e.length = i, e
                }, grep: function (e, t, n) {
                    for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)r = !t(e[o], o), r !== s && i.push(e[o]);
                    return i
                }, map: function (e, t, r) {
                    var i, o = 0, a = e.length, s = n(e), u = [];
                    if (s)for (; a > o; o++)i = t(e[o], o, r), null != i && u.push(i); else for (o in e)i = t(e[o], o, r), null != i && u.push(i);
                    return z.apply([], u)
                }, guid: 1, proxy: function (e, t) {
                    var n, r, i;
                    return "string" == typeof t && (n = e[t], t = e, e = n), K.isFunction(e) ? (r = B.call(arguments, 2), i = function () {
                        return e.apply(t || this, r.concat(B.call(arguments)))
                    }, i.guid = e.guid = e.guid || K.guid++, i) : void 0
                }, now: Date.now, support: G
            }), K.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
                V["[object " + t + "]"] = t.toLowerCase()
            });
            var ie = function (e) {
                function t(e, t, n, r) {
                    var i, o, a, s, u, c, f, d, h, g;
                    if ((t ? t.ownerDocument || t : I) !== H && M(t), t = t || H, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s)return n;
                    if (!r && O) {
                        if (11 !== s && (i = ye.exec(e)))if (a = i[1]) {
                            if (9 === s) {
                                if (o = t.getElementById(a), !o || !o.parentNode)return n;
                                if (o.id === a)return n.push(o), n
                            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && F(t, o) && o.id === a)return n.push(o), n
                        } else {
                            if (i[2])return Q.apply(n, t.getElementsByTagName(e)), n;
                            if ((a = i[3]) && w.getElementsByClassName)return Q.apply(n, t.getElementsByClassName(a)), n
                        }
                        if (w.qsa && (!q || !q.test(e))) {
                            if (d = f = R, h = t, g = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                                for (c = D(e), (f = t.getAttribute("id")) ? d = f.replace(be, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = c.length; u--;)c[u] = d + p(c[u]);
                                h = xe.test(e) && l(t.parentNode) || t, g = c.join(",")
                            }
                            if (g)try {
                                return Q.apply(n, h.querySelectorAll(g)), n
                            } catch (m) {
                            } finally {
                                f || t.removeAttribute("id")
                            }
                        }
                    }
                    return E(e.replace(ue, "$1"), t, n, r)
                }

                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }

                    var t = [];
                    return e
                }

                function r(e) {
                    return e[R] = !0, e
                }

                function i(e) {
                    var t = H.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function o(e, t) {
                    for (var n = e.split("|"), r = e.length; r--;)T.attrHandle[n[r]] = t
                }

                function a(e, t) {
                    var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
                    if (r)return r;
                    if (n)for (; n = n.nextSibling;)if (n === t)return -1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function u(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function c(e) {
                    return r(function (t) {
                        return t = +t, r(function (n, r) {
                            for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function l(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }

                function f() {
                }

                function p(e) {
                    for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
                    return r
                }

                function d(e, t, n) {
                    var r = t.dir, i = n && "parentNode" === r, o = _++;
                    return t.first ? function (t, n, o) {
                        for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
                    } : function (t, n, a) {
                        var s, u, c = [W, o];
                        if (a) {
                            for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return !0
                        } else for (; t = t[r];)if (1 === t.nodeType || i) {
                            if (u = t[R] || (t[R] = {}), (s = u[r]) && s[0] === W && s[1] === o)return c[2] = s[2];
                            if (u[r] = c, c[2] = e(t, n, a))return !0
                        }
                    }
                }

                function h(e) {
                    return e.length > 1 ? function (t, n, r) {
                        for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
                        return !0
                    } : e[0]
                }

                function g(e, n, r) {
                    for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
                    return r
                }

                function m(e, t, n, r, i) {
                    for (var o, a = [], s = 0, u = e.length, c = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), c && t.push(s));
                    return a
                }

                function v(e, t, n, i, o, a) {
                    return i && !i[R] && (i = v(i)), o && !o[R] && (o = v(o, a)), r(function (r, a, s, u) {
                        var c, l, f, p = [], d = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : m(v, p, e, s, u), x = n ? o || (r ? e : h || i) ? [] : a : y;
                        if (n && n(y, x, s, u), i)for (c = m(x, d), i(c, [], s, u), l = c.length; l--;)(f = c[l]) && (x[d[l]] = !(y[d[l]] = f));
                        if (r) {
                            if (o || e) {
                                if (o) {
                                    for (c = [], l = x.length; l--;)(f = x[l]) && c.push(y[l] = f);
                                    o(null, x = [], c, u)
                                }
                                for (l = x.length; l--;)(f = x[l]) && (c = o ? ee(r, f) : p[l]) > -1 && (r[c] = !(a[c] = f))
                            }
                        } else x = m(x === a ? x.splice(h, x.length) : x), o ? o(null, a, x, u) : Q.apply(a, x)
                    })
                }

                function y(e) {
                    for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, u = d(function (e) {
                        return e === t
                    }, a, !0), c = d(function (e) {
                        return ee(t, e) > -1
                    }, a, !0), l = [function (e, n, r) {
                        var i = !o && (r || n !== N) || ((t = n).nodeType ? u(e, n, r) : c(e, n, r));
                        return t = null, i
                    }]; i > s; s++)if (n = T.relative[e[s].type])l = [d(h(l), n)]; else {
                        if (n = T.filter[e[s].type].apply(null, e[s].matches), n[R]) {
                            for (r = ++s; i > r && !T.relative[e[r].type]; r++);
                            return v(s > 1 && h(l), s > 1 && p(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(ue, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && p(e))
                        }
                        l.push(n)
                    }
                    return h(l)
                }

                function x(e, n) {
                    var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, c) {
                        var l, f, p, d = 0, h = "0", g = r && [], v = [], y = N, x = r || o && T.find.TAG("*", c), b = W += null == y ? 1 : Math.random() || .1, w = x.length;
                        for (c && (N = a !== H && a); h !== w && null != (l = x[h]); h++) {
                            if (o && l) {
                                for (f = 0; p = e[f++];)if (p(l, a, s)) {
                                    u.push(l);
                                    break
                                }
                                c && (W = b)
                            }
                            i && ((l = !p && l) && d--, r && g.push(l))
                        }
                        if (d += h, i && h !== d) {
                            for (f = 0; p = n[f++];)p(g, v, a, s);
                            if (r) {
                                if (d > 0)for (; h--;)g[h] || v[h] || (v[h] = G.call(u));
                                v = m(v)
                            }
                            Q.apply(u, v), c && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                        }
                        return c && (W = b, N = y), g
                    };
                    return i ? r(a) : a
                }

                var b, w, T, C, k, D, S, E, N, A, j, M, H, L, O, q, P, $, F, R = "sizzle" + 1 * new Date, I = e.document, W = 0, _ = 0, B = n(), z = n(), X = n(), U = function (e, t) {
                    return e === t && (j = !0), 0
                }, V = 1 << 31, Y = {}.hasOwnProperty, Z = [], G = Z.pop, J = Z.push, Q = Z.push, K = Z.slice, ee = function (e, t) {
                    for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                    return -1
                }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = re.replace("w", "w#"), oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)", se = new RegExp(ne + "+", "g"), ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), ce = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), pe = new RegExp(ae), de = new RegExp("^" + ie + "$"), he = {
                    ID: new RegExp("^#(" + re + ")"),
                    CLASS: new RegExp("^\\.(" + re + ")"),
                    TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + ae),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                }, ge = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xe = /[+~]/, be = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), Te = function (e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                }, Ce = function () {
                    M()
                };
                try {
                    Q.apply(Z = K.call(I.childNodes), I.childNodes), Z[I.childNodes.length].nodeType
                } catch (ke) {
                    Q = {
                        apply: Z.length ? function (e, t) {
                            J.apply(e, K.call(t))
                        } : function (e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];);
                            e.length = n - 1
                        }
                    }
                }
                w = t.support = {}, k = t.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, M = t.setDocument = function (e) {
                    var t, n, r = e ? e.ownerDocument || e : I;
                    return r !== H && 9 === r.nodeType && r.documentElement ? (H = r, L = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), O = !k(r), w.attributes = i(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), w.getElementsByTagName = i(function (e) {
                        return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = ve.test(r.getElementsByClassName), w.getById = i(function (e) {
                        return L.appendChild(e).id = R, !r.getElementsByName || !r.getElementsByName(R).length
                    }), w.getById ? (T.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && O) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    }, T.filter.ID = function (e) {
                        var t = e.replace(we, Te);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete T.find.ID, T.filter.ID = function (e) {
                        var t = e.replace(we, Te);
                        return function (e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    } : function (e, t) {
                        var n, r = [], i = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[i++];)1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
                            return O ? t.getElementsByClassName(e) : void 0
                        }, P = [], q = [], (w.qsa = ve.test(r.querySelectorAll)) && (i(function (e) {
                        L.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || q.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + R + "-]").length || q.push("~="), e.querySelectorAll(":checked").length || q.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || q.push(".#.+[+~]")
                    }), i(function (e) {
                        var t = r.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
                    })), (w.matchesSelector = ve.test($ = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function (e) {
                        w.disconnectedMatch = $.call(e, "div"), $.call(e, "[s!='']:x"), P.push("!=", ae)
                    }), q = q.length && new RegExp(q.join("|")), P = P.length && new RegExp(P.join("|")), t = ve.test(L.compareDocumentPosition), F = t || ve.test(L.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function (e, t) {
                        if (t)for (; t = t.parentNode;)if (t === e)return !0;
                        return !1
                    }, U = t ? function (e, t) {
                        if (e === t)return j = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === I && F(I, e) ? -1 : t === r || t.ownerDocument === I && F(I, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
                    } : function (e, t) {
                        if (e === t)return j = !0, 0;
                        var n, i = 0, o = e.parentNode, s = t.parentNode, u = [e], c = [t];
                        if (!o || !s)return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                        if (o === s)return a(e, t);
                        for (n = e; n = n.parentNode;)u.unshift(n);
                        for (n = t; n = n.parentNode;)c.unshift(n);
                        for (; u[i] === c[i];)i++;
                        return i ? a(u[i], c[i]) : u[i] === I ? -1 : c[i] === I ? 1 : 0
                    }, r) : H
                }, t.matches = function (e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function (e, n) {
                    if ((e.ownerDocument || e) !== H && M(e), n = n.replace(fe, "='$1']"), !(!w.matchesSelector || !O || P && P.test(n) || q && q.test(n)))try {
                        var r = $.call(e, n);
                        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
                    } catch (i) {
                    }
                    return t(n, H, null, [e]).length > 0
                }, t.contains = function (e, t) {
                    return (e.ownerDocument || e) !== H && M(e), F(e, t)
                }, t.attr = function (e, t) {
                    (e.ownerDocument || e) !== H && M(e);
                    var n = T.attrHandle[t.toLowerCase()], r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
                    return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }, t.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function (e) {
                    var t, n = [], r = 0, i = 0;
                    if (j = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(U), j) {
                        for (; t = e[i++];)t === e[i] && (r = n.push(i));
                        for (; r--;)e.splice(n[r], 1)
                    }
                    return A = null, e
                }, C = t.getText = function (e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent)return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)n += C(e)
                        } else if (3 === i || 4 === i)return e.nodeValue
                    } else for (; t = e[r++];)n += C(t);
                    return n
                }, T = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: he,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: !0},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: !0},
                        "~": {dir: "previousSibling"}
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(we, Te), e[3] = (e[3] || e[4] || e[5] || "").replace(we, Te), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        }, CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        }, PSEUDO: function (e) {
                            var t, n = !e[6] && e[2];
                            return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = D(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(we, Te).toLowerCase();
                            return "*" === e ? function () {
                                return !0
                            } : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        }, CLASS: function (e) {
                            var t = B[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function (e) {
                                    return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");

                                })
                        }, ATTR: function (e, n, r) {
                            return function (i) {
                                var o = t.attr(i, e);
                                return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                            }
                        }, CHILD: function (e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                            return 1 === r && 0 === i ? function (e) {
                                return !!e.parentNode
                            } : function (t, n, u) {
                                var c, l, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (f = t; f = f[g];)if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                        for (l = m[R] || (m[R] = {}), c = l[e] || [], d = c[0] === W && c[1], p = c[0] === W && c[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)if (1 === f.nodeType && ++p && f === t) {
                                            l[e] = [W, d, p];
                                            break
                                        }
                                    } else if (y && (c = (t[R] || (t[R] = {}))[e]) && c[0] === W)p = c[1]; else for (; (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[R] || (f[R] = {}))[e] = [W, p]), f !== t)););
                                    return p -= i, p === r || p % r === 0 && p / r >= 0
                                }
                            }
                        }, PSEUDO: function (e, n) {
                            var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return o[R] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                                for (var r, i = o(e, n), a = i.length; a--;)r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                            }) : function (e) {
                                return o(e, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function (e) {
                            var t = [], n = [], i = S(e.replace(ue, "$1"));
                            return i[R] ? r(function (e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function (e, r, o) {
                                return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                            }
                        }), has: r(function (e) {
                            return function (n) {
                                return t(e, n).length > 0
                            }
                        }), contains: r(function (e) {
                            return e = e.replace(we, Te), function (t) {
                                return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                            }
                        }), lang: r(function (e) {
                            return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, Te).toLowerCase(), function (t) {
                                var n;
                                do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                        }), target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        }, root: function (e) {
                            return e === L
                        }, focus: function (e) {
                            return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        }, enabled: function (e) {
                            return e.disabled === !1
                        }, disabled: function (e) {
                            return e.disabled === !0
                        }, checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        }, selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        }, empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                            return !0
                        }, parent: function (e) {
                            return !T.pseudos.empty(e)
                        }, header: function (e) {
                            return me.test(e.nodeName)
                        }, input: function (e) {
                            return ge.test(e.nodeName)
                        }, button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        }, text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        }, first: c(function () {
                            return [0]
                        }), last: c(function (e, t) {
                            return [t - 1]
                        }), eq: c(function (e, t, n) {
                            return [0 > n ? n + t : n]
                        }), even: c(function (e, t) {
                            for (var n = 0; t > n; n += 2)e.push(n);
                            return e
                        }), odd: c(function (e, t) {
                            for (var n = 1; t > n; n += 2)e.push(n);
                            return e
                        }), lt: c(function (e, t, n) {
                            for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                            return e
                        }), gt: c(function (e, t, n) {
                            for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                            return e
                        })
                    }
                }, T.pseudos.nth = T.pseudos.eq;
                for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[b] = s(b);
                for (b in{submit: !0, reset: !0})T.pseudos[b] = u(b);
                return f.prototype = T.filters = T.pseudos, T.setFilters = new f, D = t.tokenize = function (e, n) {
                    var r, i, o, a, s, u, c, l = z[e + " "];
                    if (l)return n ? 0 : l.slice(0);
                    for (s = e, u = [], c = T.preFilter; s;) {
                        (!r || (i = ce.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = le.exec(s)) && (r = i.shift(), o.push({
                            value: r,
                            type: i[0].replace(ue, " ")
                        }), s = s.slice(r.length));
                        for (a in T.filter)!(i = he[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: a,
                            matches: i
                        }), s = s.slice(r.length));
                        if (!r)break
                    }
                    return n ? s.length : s ? t.error(e) : z(e, u).slice(0)
                }, S = t.compile = function (e, t) {
                    var n, r = [], i = [], o = X[e + " "];
                    if (!o) {
                        for (t || (t = D(e)), n = t.length; n--;)o = y(t[n]), o[R] ? r.push(o) : i.push(o);
                        o = X(e, x(i, r)), o.selector = e
                    }
                    return o
                }, E = t.select = function (e, t, n, r) {
                    var i, o, a, s, u, c = "function" == typeof e && e, f = !r && D(e = c.selector || e);
                    if (n = n || [], 1 === f.length) {
                        if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && O && T.relative[o[1].type]) {
                            if (t = (T.find.ID(a.matches[0].replace(we, Te), t) || [])[0], !t)return n;
                            c && (t = t.parentNode), e = e.slice(o.shift().value.length)
                        }
                        for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);)if ((u = T.find[s]) && (r = u(a.matches[0].replace(we, Te), xe.test(o[0].type) && l(t.parentNode) || t))) {
                            if (o.splice(i, 1), e = r.length && p(o), !e)return Q.apply(n, r), n;
                            break
                        }
                    }
                    return (c || S(e, f))(r, t, !O, n, xe.test(e) && l(t.parentNode) || t), n
                }, w.sortStable = R.split("").sort(U).join("") === R, w.detectDuplicates = !!j, M(), w.sortDetached = i(function (e) {
                    return 1 & e.compareDocumentPosition(H.createElement("div"))
                }), i(function (e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function (e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), w.attributes && i(function (e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || o("value", function (e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }), i(function (e) {
                    return null == e.getAttribute("disabled")
                }) || o(te, function (e, t, n) {
                    var r;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), t
            }(e);
            K.find = ie, K.expr = ie.selectors, K.expr[":"] = K.expr.pseudos, K.unique = ie.uniqueSort, K.text = ie.getText, K.isXMLDoc = ie.isXML, K.contains = ie.contains;
            var oe = K.expr.match.needsContext, ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, se = /^.[^:#\[\.,]*$/;
            K.filter = function (e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? K.find.matchesSelector(r, e) ? [r] : [] : K.find.matches(e, K.grep(t, function (e) {
                    return 1 === e.nodeType
                }))
            }, K.fn.extend({
                find: function (e) {
                    var t, n = this.length, r = [], i = this;
                    if ("string" != typeof e)return this.pushStack(K(e).filter(function () {
                        for (t = 0; n > t; t++)if (K.contains(i[t], this))return !0
                    }));
                    for (t = 0; n > t; t++)K.find(e, i[t], r);
                    return r = this.pushStack(n > 1 ? K.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
                }, filter: function (e) {
                    return this.pushStack(r(this, e || [], !1))
                }, not: function (e) {
                    return this.pushStack(r(this, e || [], !0))
                }, is: function (e) {
                    return !!r(this, "string" == typeof e && oe.test(e) ? K(e) : e || [], !1).length
                }
            });
            var ue, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, le = K.fn.init = function (e, t) {
                var n, r;
                if (!e)return this;
                if ("string" == typeof e) {
                    if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ce.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof K ? t[0] : t, K.merge(this, K.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : J, !0)), ae.test(n[1]) && K.isPlainObject(t))for (n in t)K.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    return r = J.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = J, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : K.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(K) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), K.makeArray(e, this))
            };
            le.prototype = K.fn, ue = K(J);
            var fe = /^(?:parents|prev(?:Until|All))/, pe = {children: !0, contents: !0, next: !0, prev: !0};
            K.extend({
                dir: function (e, t, n) {
                    for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
                        if (i && K(e).is(n))break;
                        r.push(e)
                    }
                    return r
                }, sibling: function (e, t) {
                    for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                    return n
                }
            }), K.fn.extend({
                has: function (e) {
                    var t = K(e, this), n = t.length;
                    return this.filter(function () {
                        for (var e = 0; n > e; e++)if (K.contains(this, t[e]))return !0
                    })
                }, closest: function (e, t) {
                    for (var n, r = 0, i = this.length, o = [], a = oe.test(e) || "string" != typeof e ? K(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && K.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
                    return this.pushStack(o.length > 1 ? K.unique(o) : o)
                }, index: function (e) {
                    return e ? "string" == typeof e ? U.call(K(e), this[0]) : U.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                }, add: function (e, t) {
                    return this.pushStack(K.unique(K.merge(this.get(), K(e, t))))
                }, addBack: function (e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), K.each({
                parent: function (e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                }, parents: function (e) {
                    return K.dir(e, "parentNode")
                }, parentsUntil: function (e, t, n) {
                    return K.dir(e, "parentNode", n)
                }, next: function (e) {
                    return i(e, "nextSibling")
                }, prev: function (e) {
                    return i(e, "previousSibling")
                }, nextAll: function (e) {
                    return K.dir(e, "nextSibling")
                }, prevAll: function (e) {
                    return K.dir(e, "previousSibling")
                }, nextUntil: function (e, t, n) {
                    return K.dir(e, "nextSibling", n)
                }, prevUntil: function (e, t, n) {
                    return K.dir(e, "previousSibling", n)
                }, siblings: function (e) {
                    return K.sibling((e.parentNode || {}).firstChild, e)
                }, children: function (e) {
                    return K.sibling(e.firstChild)
                }, contents: function (e) {
                    return e.contentDocument || K.merge([], e.childNodes)
                }
            }, function (e, t) {
                K.fn[e] = function (n, r) {
                    var i = K.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = K.filter(r, i)), this.length > 1 && (pe[e] || K.unique(i), fe.test(e) && i.reverse()), this.pushStack(i)
                }
            });
            var de = /\S+/g, he = {};
            K.Callbacks = function (e) {
                e = "string" == typeof e ? he[e] || o(e) : K.extend({}, e);
                var t, n, r, i, a, s, u = [], c = !e.once && [], l = function (o) {
                    for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && a > s; s++)if (u[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                    r = !1, u && (c ? c.length && l(c.shift()) : t ? u = [] : f.disable())
                }, f = {
                    add: function () {
                        if (u) {
                            var n = u.length;
                            !function o(t) {
                                K.each(t, function (t, n) {
                                    var r = K.type(n);
                                    "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                                })
                            }(arguments), r ? a = u.length : t && (i = n, l(t))
                        }
                        return this
                    }, remove: function () {
                        return u && K.each(arguments, function (e, t) {
                            for (var n; (n = K.inArray(t, u, n)) > -1;)u.splice(n, 1), r && (a >= n && a--, s >= n && s--)
                        }), this
                    }, has: function (e) {
                        return e ? K.inArray(e, u) > -1 : !(!u || !u.length)
                    }, empty: function () {
                        return u = [], a = 0, this
                    }, disable: function () {
                        return u = c = t = void 0, this
                    }, disabled: function () {
                        return !u
                    }, lock: function () {
                        return c = void 0, t || f.disable(), this
                    }, locked: function () {
                        return !c
                    }, fireWith: function (e, t) {
                        return !u || n && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? c.push(t) : l(t)), this
                    }, fire: function () {
                        return f.fireWith(this, arguments), this
                    }, fired: function () {
                        return !!n
                    }
                };
                return f
            }, K.extend({
                Deferred: function (e) {
                    var t = [["resolve", "done", K.Callbacks("once memory"), "resolved"], ["reject", "fail", K.Callbacks("once memory"), "rejected"], ["notify", "progress", K.Callbacks("memory")]], n = "pending", r = {
                        state: function () {
                            return n
                        }, always: function () {
                            return i.done(arguments).fail(arguments), this
                        }, then: function () {
                            var e = arguments;
                            return K.Deferred(function (n) {
                                K.each(t, function (t, o) {
                                    var a = K.isFunction(e[t]) && e[t];
                                    i[o[1]](function () {
                                        var e = a && a.apply(this, arguments);
                                        e && K.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        }, promise: function (e) {
                            return null != e ? K.extend(e, r) : r
                        }
                    }, i = {};
                    return r.pipe = r.then, K.each(t, function (e, o) {
                        var a = o[2], s = o[3];
                        r[o[1]] = a.add, s && a.add(function () {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                            return i[o[0] + "With"](this === i ? r : this, arguments), this
                        }, i[o[0] + "With"] = a.fireWith
                    }), r.promise(i), e && e.call(i, i), i
                }, when: function (e) {
                    var t, n, r, i = 0, o = B.call(arguments), a = o.length, s = 1 !== a || e && K.isFunction(e.promise) ? a : 0, u = 1 === s ? e : K.Deferred(), c = function (e, n, r) {
                        return function (i) {
                            n[e] = this, r[e] = arguments.length > 1 ? B.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                        }
                    };
                    if (a > 1)for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++)o[i] && K.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(u.reject).progress(c(i, n, t)) : --s;
                    return s || u.resolveWith(r, o), u.promise()
                }
            });
            var ge;
            K.fn.ready = function (e) {
                return K.ready.promise().done(e), this
            }, K.extend({
                isReady: !1, readyWait: 1, holdReady: function (e) {
                    e ? K.readyWait++ : K.ready(!0)
                }, ready: function (e) {
                    (e === !0 ? --K.readyWait : K.isReady) || (K.isReady = !0, e !== !0 && --K.readyWait > 0 || (ge.resolveWith(J, [K]), K.fn.triggerHandler && (K(J).triggerHandler("ready"), K(J).off("ready"))))
                }
            }), K.ready.promise = function (t) {
                return ge || (ge = K.Deferred(), "complete" === J.readyState ? setTimeout(K.ready) : (J.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), ge.promise(t)
            }, K.ready.promise();
            var me = K.access = function (e, t, n, r, i, o, a) {
                var s = 0, u = e.length, c = null == n;
                if ("object" === K.type(n)) {
                    i = !0;
                    for (s in n)K.access(e, t, s, n[s], !0, o, a)
                } else if (void 0 !== r && (i = !0, K.isFunction(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function (e, t, n) {
                        return c.call(K(e), n)
                    })), t))for (; u > s; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : c ? t.call(e) : u ? t(e[0], n) : o
            };
            K.acceptData = function (e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            }, s.uid = 1, s.accepts = K.acceptData, s.prototype = {
                key: function (e) {
                    if (!s.accepts(e))return 0;
                    var t = {}, n = e[this.expando];
                    if (!n) {
                        n = s.uid++;
                        try {
                            t[this.expando] = {value: n}, Object.defineProperties(e, t)
                        } catch (r) {
                            t[this.expando] = n, K.extend(e, t)
                        }
                    }
                    return this.cache[n] || (this.cache[n] = {}), n
                }, set: function (e, t, n) {
                    var r, i = this.key(e), o = this.cache[i];
                    if ("string" == typeof t)o[t] = n; else if (K.isEmptyObject(o))K.extend(this.cache[i], t); else for (r in t)o[r] = t[r];
                    return o
                }, get: function (e, t) {
                    var n = this.cache[this.key(e)];
                    return void 0 === t ? n : n[t]
                }, access: function (e, t, n) {
                    var r;
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, K.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
                }, remove: function (e, t) {
                    var n, r, i, o = this.key(e), a = this.cache[o];
                    if (void 0 === t)this.cache[o] = {}; else {
                        K.isArray(t) ? r = t.concat(t.map(K.camelCase)) : (i = K.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(de) || [])), n = r.length;
                        for (; n--;)delete a[r[n]]
                    }
                }, hasData: function (e) {
                    return !K.isEmptyObject(this.cache[e[this.expando]] || {})
                }, discard: function (e) {
                    e[this.expando] && delete this.cache[e[this.expando]]
                }
            };
            var ve = new s, ye = new s, xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, be = /([A-Z])/g;
            K.extend({
                hasData: function (e) {
                    return ye.hasData(e) || ve.hasData(e)
                }, data: function (e, t, n) {
                    return ye.access(e, t, n)
                }, removeData: function (e, t) {
                    ye.remove(e, t)
                }, _data: function (e, t, n) {
                    return ve.access(e, t, n)
                }, _removeData: function (e, t) {
                    ve.remove(e, t)
                }
            }), K.fn.extend({
                data: function (e, t) {
                    var n, r, i, o = this[0], a = o && o.attributes;
                    if (void 0 === e) {
                        if (this.length && (i = ye.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                            for (n = a.length; n--;)a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = K.camelCase(r.slice(5)), u(o, r, i[r])));
                            ve.set(o, "hasDataAttrs", !0)
                        }
                        return i
                    }
                    return "object" == typeof e ? this.each(function () {
                        ye.set(this, e)
                    }) : me(this, function (t) {
                        var n, r = K.camelCase(e);
                        if (o && void 0 === t) {
                            if (n = ye.get(o, e), void 0 !== n)return n;
                            if (n = ye.get(o, r), void 0 !== n)return n;
                            if (n = u(o, r, void 0), void 0 !== n)return n
                        } else this.each(function () {
                            var n = ye.get(this, r);
                            ye.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && ye.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                }, removeData: function (e) {
                    return this.each(function () {
                        ye.remove(this, e)
                    })
                }
            }), K.extend({
                queue: function (e, t, n) {
                    var r;
                    return e ? (t = (t || "fx") + "queue", r = ve.get(e, t), n && (!r || K.isArray(n) ? r = ve.access(e, t, K.makeArray(n)) : r.push(n)), r || []) : void 0
                }, dequeue: function (e, t) {
                    t = t || "fx";
                    var n = K.queue(e, t), r = n.length, i = n.shift(), o = K._queueHooks(e, t), a = function () {
                        K.dequeue(e, t)
                    };
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
                }, _queueHooks: function (e, t) {
                    var n = t + "queueHooks";
                    return ve.get(e, n) || ve.access(e, n, {
                            empty: K.Callbacks("once memory").add(function () {
                                ve.remove(e, [t + "queue", n])
                            })
                        })
                }
            }), K.fn.extend({
                queue: function (e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? K.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                        var n = K.queue(this, e, t);
                        K._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && K.dequeue(this, e)
                    })
                }, dequeue: function (e) {
                    return this.each(function () {
                        K.dequeue(this, e)
                    })
                }, clearQueue: function (e) {
                    return this.queue(e || "fx", [])
                }, promise: function (e, t) {
                    var n, r = 1, i = K.Deferred(), o = this, a = this.length, s = function () {
                        --r || i.resolveWith(o, [o])
                    };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = ve.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                    return s(), i.promise(t)
                }
            });
            var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Te = ["Top", "Right", "Bottom", "Left"], Ce = function (e, t) {
                return e = t || e, "none" === K.css(e, "display") || !K.contains(e.ownerDocument, e)
            }, ke = /^(?:checkbox|radio)$/i;
            !function () {
                var e = J.createDocumentFragment(), t = e.appendChild(J.createElement("div")), n = J.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), G.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", G.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var De = "undefined";
            G.focusinBubbles = "onfocusin" in e;
            var Se = /^key/, Ee = /^(?:mouse|pointer|contextmenu)|click/, Ne = /^(?:focusinfocus|focusoutblur)$/, Ae = /^([^.]*)(?:\.(.+)|)$/;
            K.event = {
                global: {},
                add: function (e, t, n, r, i) {
                    var o, a, s, u, c, l, f, p, d, h, g, m = ve.get(e);
                    if (m)for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = K.guid++), (u = m.events) || (u = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
                        return typeof K !== De && K.event.triggered !== t.type ? K.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(de) || [""], c = t.length; c--;)s = Ae.exec(t[c]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d && (f = K.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = K.event.special[d] || {}, l = K.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && K.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, l) : p.push(l), K.event.global[d] = !0)
                },
                remove: function (e, t, n, r, i) {
                    var o, a, s, u, c, l, f, p, d, h, g, m = ve.hasData(e) && ve.get(e);
                    if (m && (u = m.events)) {
                        for (t = (t || "").match(de) || [""], c = t.length; c--;)if (s = Ae.exec(t[c]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                            for (f = K.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;)l = p[o], !i && g !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(o, 1), l.selector && p.delegateCount--, f.remove && f.remove.call(e, l));
                            a && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || K.removeEvent(e, d, m.handle), delete u[d])
                        } else for (d in u)K.event.remove(e, d + t[c], n, r, !0);
                        K.isEmptyObject(u) && (delete m.handle, ve.remove(e, "events"))
                    }
                },
                trigger: function (t, n, r, i) {
                    var o, a, s, u, c, l, f, p = [r || J], d = Z.call(t, "type") ? t.type : t, h = Z.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (a = s = r = r || J, 3 !== r.nodeType && 8 !== r.nodeType && !Ne.test(d + K.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), c = d.indexOf(":") < 0 && "on" + d, t = t[K.expando] ? t : new K.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : K.makeArray(n, [t]), f = K.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                        if (!i && !f.noBubble && !K.isWindow(r)) {
                            for (u = f.delegateType || d, Ne.test(u + d) || (a = a.parentNode); a; a = a.parentNode)p.push(a), s = a;
                            s === (r.ownerDocument || J) && p.push(s.defaultView || s.parentWindow || e)
                        }
                        for (o = 0; (a = p[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? u : f.bindType || d, l = (ve.get(a, "events") || {})[t.type] && ve.get(a, "handle"), l && l.apply(a, n), l = c && a[c], l && l.apply && K.acceptData(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
                        return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !K.acceptData(r) || c && K.isFunction(r[d]) && !K.isWindow(r) && (s = r[c], s && (r[c] = null), K.event.triggered = d, r[d](), K.event.triggered = void 0, s && (r[c] = s)), t.result
                    }
                },
                dispatch: function (e) {
                    e = K.event.fix(e);
                    var t, n, r, i, o, a = [], s = B.call(arguments), u = (ve.get(this, "events") || {})[e.type] || [], c = K.event.special[e.type] || {};
                    if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                        for (a = K.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((K.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function (e, t) {
                    var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
                    if (s && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
                        for (r = [], n = 0; s > n; n++)o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? K(i, this).index(u) >= 0 : K.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && a.push({elem: u, handlers: r})
                    }
                    return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (e, t) {
                        var n, r, i, o = t.button;
                        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || J, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                    }
                },
                fix: function (e) {
                    if (e[K.expando])return e;
                    var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
                    for (a || (this.fixHooks[i] = a = Ee.test(i) ? this.mouseHooks : Se.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new K.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
                    return e.target || (e.target = J), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
                },
                special: {
                    load: {noBubble: !0}, focus: {
                        trigger: function () {
                            return this !== f() && this.focus ? (this.focus(), !1) : void 0
                        }, delegateType: "focusin"
                    }, blur: {
                        trigger: function () {
                            return this === f() && this.blur ? (this.blur(), !1) : void 0
                        }, delegateType: "focusout"
                    }, click: {
                        trigger: function () {
                            return "checkbox" === this.type && this.click && K.nodeName(this, "input") ? (this.click(), !1) : void 0
                        }, _default: function (e) {
                            return K.nodeName(e.target, "a")
                        }
                    }, beforeunload: {
                        postDispatch: function (e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function (e, t, n, r) {
                    var i = K.extend(new K.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
                    r ? K.event.trigger(i, null, t) : K.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
                }
            }, K.removeEvent = function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            }, K.Event = function (e, t) {
                return this instanceof K.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? c : l) : this.type = e, t && K.extend(this, t), this.timeStamp = e && e.timeStamp || K.now(), void(this[K.expando] = !0)) : new K.Event(e, t)
            }, K.Event.prototype = {
                isDefaultPrevented: l,
                isPropagationStopped: l,
                isImmediatePropagationStopped: l,
                preventDefault: function () {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = c, e && e.preventDefault && e.preventDefault()
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    this.isPropagationStopped = c, e && e.stopPropagation && e.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = c, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, K.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (e, t) {
                K.event.special[e] = {
                    delegateType: t, bindType: t, handle: function (e) {
                        var n, r = this, i = e.relatedTarget, o = e.handleObj;
                        return (!i || i !== r && !K.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), G.focusinBubbles || K.each({focus: "focusin", blur: "focusout"}, function (e, t) {
                var n = function (e) {
                    K.event.simulate(t, e.target, K.event.fix(e), !0)
                };
                K.event.special[t] = {
                    setup: function () {
                        var r = this.ownerDocument || this, i = ve.access(r, t);
                        i || r.addEventListener(e, n, !0), ve.access(r, t, (i || 0) + 1)
                    }, teardown: function () {
                        var r = this.ownerDocument || this, i = ve.access(r, t) - 1;
                        i ? ve.access(r, t, i) : (r.removeEventListener(e, n, !0), ve.remove(r, t))
                    }
                }
            }), K.fn.extend({
                on: function (e, t, n, r, i) {
                    var o, a;
                    if ("object" == typeof e) {
                        "string" != typeof t && (n = n || t, t = void 0);
                        for (a in e)this.on(a, t, n, e[a], i);
                        return this
                    }
                    if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = l; else if (!r)return this;
                    return 1 === i && (o = r, r = function (e) {
                        return K().off(e), o.apply(this, arguments)
                    }, r.guid = o.guid || (o.guid = K.guid++)), this.each(function () {
                        K.event.add(this, e, r, n, t)
                    })
                }, one: function (e, t, n, r) {
                    return this.on(e, t, n, r, 1)
                }, off: function (e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj)return r = e.handleObj, K(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (i in e)this.off(i, t, e[i]);
                        return this
                    }
                    return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = l), this.each(function () {
                        K.event.remove(this, e, n, t)
                    })
                }, trigger: function (e, t) {
                    return this.each(function () {
                        K.event.trigger(e, t, this)
                    })
                }, triggerHandler: function (e, t) {
                    var n = this[0];
                    return n ? K.event.trigger(e, t, n, !0) : void 0
                }
            });
            var je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Me = /<([\w:]+)/, He = /<|&#?\w+;/, Le = /<(?:script|style|link)/i, Oe = /checked\s*(?:[^=]|=\s*.checked.)/i, qe = /^$|\/(?:java|ecma)script/i, Pe = /^true\/(.*)/, $e = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Fe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            Fe.optgroup = Fe.option, Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead, Fe.th = Fe.td, K.extend({
                clone: function (e, t, n) {
                    var r, i, o, a, s = e.cloneNode(!0), u = K.contains(e.ownerDocument, e);
                    if (!(G.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || K.isXMLDoc(e)))for (a = v(s), o = v(e), r = 0, i = o.length; i > r; r++)y(o[r], a[r]);
                    if (t)if (n)for (o = o || v(e), a = a || v(s), r = 0, i = o.length; i > r; r++)m(o[r], a[r]); else m(e, s);
                    return a = v(s, "script"), a.length > 0 && g(a, !u && v(e, "script")), s
                }, buildFragment: function (e, t, n, r) {
                    for (var i, o, a, s, u, c, l = t.createDocumentFragment(), f = [], p = 0, d = e.length; d > p; p++)if (i = e[p], i || 0 === i)if ("object" === K.type(i))K.merge(f, i.nodeType ? [i] : i); else if (He.test(i)) {
                        for (o = o || l.appendChild(t.createElement("div")), a = (Me.exec(i) || ["", ""])[1].toLowerCase(), s = Fe[a] || Fe._default, o.innerHTML = s[1] + i.replace(je, "<$1></$2>") + s[2], c = s[0]; c--;)o = o.lastChild;
                        K.merge(f, o.childNodes), o = l.firstChild, o.textContent = ""
                    } else f.push(t.createTextNode(i));
                    for (l.textContent = "", p = 0; i = f[p++];)if ((!r || -1 === K.inArray(i, r)) && (u = K.contains(i.ownerDocument, i), o = v(l.appendChild(i), "script"), u && g(o), n))for (c = 0; i = o[c++];)qe.test(i.type || "") && n.push(i);
                    return l
                }, cleanData: function (e) {
                    for (var t, n, r, i, o = K.event.special, a = 0; void 0 !== (n = e[a]); a++) {
                        if (K.acceptData(n) && (i = n[ve.expando], i && (t = ve.cache[i]))) {
                            if (t.events)for (r in t.events)o[r] ? K.event.remove(n, r) : K.removeEvent(n, r, t.handle);
                            ve.cache[i] && delete ve.cache[i]
                        }
                        delete ye.cache[n[ye.expando]]
                    }
                }
            }), K.fn.extend({
                text: function (e) {
                    return me(this, function (e) {
                        return void 0 === e ? K.text(this) : this.empty().each(function () {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                }, append: function () {
                    return this.domManip(arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = p(this, e);
                            t.appendChild(e)
                        }
                    })
                }, prepend: function () {
                    return this.domManip(arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = p(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                }, before: function () {
                    return this.domManip(arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                }, after: function () {
                    return this.domManip(arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                }, remove: function (e, t) {
                    for (var n, r = e ? K.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || K.cleanData(v(n)), n.parentNode && (t && K.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
                    return this
                }, empty: function () {
                    for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (K.cleanData(v(e, !1)), e.textContent = "");
                    return this
                }, clone: function (e, t) {
                    return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                        return K.clone(this, e, t)
                    })
                }, html: function (e) {
                    return me(this, function (e) {
                        var t = this[0] || {}, n = 0, r = this.length;
                        if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                        if ("string" == typeof e && !Le.test(e) && !Fe[(Me.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(je, "<$1></$2>");
                            try {
                                for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (K.cleanData(v(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (i) {
                            }
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                }, replaceWith: function () {
                    var e = arguments[0];
                    return this.domManip(arguments, function (t) {
                        e = this.parentNode, K.cleanData(v(this)), e && e.replaceChild(t, this)
                    }), e && (e.length || e.nodeType) ? this : this.remove()
                }, detach: function (e) {
                    return this.remove(e, !0)
                }, domManip: function (e, t) {
                    e = z.apply([], e);
                    var n, r, i, o, a, s, u = 0, c = this.length, l = this, f = c - 1, p = e[0], g = K.isFunction(p);
                    if (g || c > 1 && "string" == typeof p && !G.checkClone && Oe.test(p))return this.each(function (n) {
                        var r = l.eq(n);
                        g && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
                    });
                    if (c && (n = K.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                        for (i = K.map(v(n, "script"), d), o = i.length; c > u; u++)a = n, u !== f && (a = K.clone(a, !0, !0), o && K.merge(i, v(a, "script"))), t.call(this[u], a, u);
                        if (o)for (s = i[i.length - 1].ownerDocument, K.map(i, h), u = 0; o > u; u++)a = i[u], qe.test(a.type || "") && !ve.access(a, "globalEval") && K.contains(s, a) && (a.src ? K._evalUrl && K._evalUrl(a.src) : K.globalEval(a.textContent.replace($e, "")))
                    }
                    return this
                }
            }), K.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (e, t) {
                K.fn[e] = function (e) {
                    for (var n, r = [], i = K(e), o = i.length - 1, a = 0; o >= a; a++)n = a === o ? this : this.clone(!0), K(i[a])[t](n), X.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var Re, Ie = {}, We = /^margin/, _e = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"), Be = function (t) {
                return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
            };
            !function () {
                function t() {
                    a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
                    var t = e.getComputedStyle(a, null);
                    n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o)
                }

                var n, r, i = J.documentElement, o = J.createElement("div"), a = J.createElement("div");
                a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", G.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && K.extend(G, {
                    pixelPosition: function () {
                        return t(), n
                    }, boxSizingReliable: function () {
                        return null == r && t(), r
                    }, reliableMarginRight: function () {
                        var t, n = a.appendChild(J.createElement("div"));
                        return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                            n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), a.removeChild(n), t
                    }
                }))
            }(), K.swap = function (e, t, n, r) {
                var i, o, a = {};
                for (o in t)a[o] = e.style[o], e.style[o] = t[o];
                i = n.apply(e, r || []);
                for (o in t)e.style[o] = a[o];
                return i
            };
            var ze = /^(none|table(?!-c[ea]).+)/, Xe = new RegExp("^(" + we + ")(.*)$", "i"), Ue = new RegExp("^([+-])=(" + we + ")", "i"), Ve = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, Ye = {letterSpacing: "0", fontWeight: "400"}, Ze = ["Webkit", "O", "Moz", "ms"];
            K.extend({
                cssHooks: {
                    opacity: {
                        get: function (e, t) {
                            if (t) {
                                var n = w(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {"float": "cssFloat"},
                style: function (e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, o, a, s = K.camelCase(t), u = e.style;
                        return t = K.cssProps[s] || (K.cssProps[s] = C(u, s)), a = K.cssHooks[t] || K.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = Ue.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(K.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || K.cssNumber[s] || (n += "px"), G.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n)), void 0)
                    }
                },
                css: function (e, t, n, r) {
                    var i, o, a, s = K.camelCase(t);
                    return t = K.cssProps[s] || (K.cssProps[s] = C(e.style, s)), a = K.cssHooks[t] || K.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Ye && (i = Ye[t]), "" === n || n ? (o = parseFloat(i), n === !0 || K.isNumeric(o) ? o || 0 : i) : i
                }
            }), K.each(["height", "width"], function (e, t) {
                K.cssHooks[t] = {
                    get: function (e, n, r) {
                        return n ? ze.test(K.css(e, "display")) && 0 === e.offsetWidth ? K.swap(e, Ve, function () {
                            return S(e, t, r)
                        }) : S(e, t, r) : void 0
                    }, set: function (e, n, r) {
                        var i = r && Be(e);
                        return k(e, n, r ? D(e, t, r, "border-box" === K.css(e, "boxSizing", !1, i), i) : 0)
                    }
                }
            }), K.cssHooks.marginRight = T(G.reliableMarginRight, function (e, t) {
                return t ? K.swap(e, {display: "inline-block"}, w, [e, "marginRight"]) : void 0
            }), K.each({margin: "", padding: "", border: "Width"}, function (e, t) {
                K.cssHooks[e + t] = {
                    expand: function (n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + Te[r] + t] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                }, We.test(e) || (K.cssHooks[e + t].set = k)
            }), K.fn.extend({
                css: function (e, t) {
                    return me(this, function (e, t, n) {
                        var r, i, o = {}, a = 0;
                        if (K.isArray(t)) {
                            for (r = Be(e), i = t.length; i > a; a++)o[t[a]] = K.css(e, t[a], !1, r);
                            return o
                        }
                        return void 0 !== n ? K.style(e, t, n) : K.css(e, t)
                    }, e, t, arguments.length > 1)
                }, show: function () {
                    return E(this, !0)
                }, hide: function () {
                    return E(this)
                }, toggle: function (e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                        Ce(this) ? K(this).show() : K(this).hide()
                    })
                }
            }), K.Tween = N, N.prototype = {
                constructor: N, init: function (e, t, n, r, i, o) {
                    this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (K.cssNumber[n] ? "" : "px")
                }, cur: function () {
                    var e = N.propHooks[this.prop];
                    return e && e.get ? e.get(this) : N.propHooks._default.get(this)
                }, run: function (e) {
                    var t, n = N.propHooks[this.prop];
                    return this.pos = t = this.options.duration ? K.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : N.propHooks._default.set(this), this
                }
            }, N.prototype.init.prototype = N.prototype, N.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = K.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                    }, set: function (e) {
                        K.fx.step[e.prop] ? K.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[K.cssProps[e.prop]] || K.cssHooks[e.prop]) ? K.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                    }
                }
            }, N.propHooks.scrollTop = N.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, K.easing = {
                linear: function (e) {
                    return e
                }, swing: function (e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                }
            }, K.fx = N.prototype.init, K.fx.step = {};
            var Ge, Je, Qe = /^(?:toggle|show|hide)$/, Ke = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"), et = /queueHooks$/, tt = [H], nt = {
                "*": [function (e, t) {
                    var n = this.createTween(e, t), r = n.cur(), i = Ke.exec(t), o = i && i[3] || (K.cssNumber[e] ? "" : "px"), a = (K.cssNumber[e] || "px" !== o && +r) && Ke.exec(K.css(n.elem, e)), s = 1, u = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], i = i || [], a = +r || 1;
                        do s = s || ".5", a /= s, K.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u)
                    }
                    return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
                }]
            };
            K.Animation = K.extend(O, {
                tweener: function (e, t) {
                    K.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var n, r = 0, i = e.length; i > r; r++)n = e[r], nt[n] = nt[n] || [], nt[n].unshift(t)
                }, prefilter: function (e, t) {
                    t ? tt.unshift(e) : tt.push(e)
                }
            }), K.speed = function (e, t, n) {
                var r = e && "object" == typeof e ? K.extend({}, e) : {
                    complete: n || !n && t || K.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !K.isFunction(t) && t
                };
                return r.duration = K.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                    K.isFunction(r.old) && r.old.call(this), r.queue && K.dequeue(this, r.queue)
                }, r
            }, K.fn.extend({
                fadeTo: function (e, t, n, r) {
                    return this.filter(Ce).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
                }, animate: function (e, t, n, r) {
                    var i = K.isEmptyObject(e), o = K.speed(t, n, r), a = function () {
                        var t = O(this, K.extend({}, e), o);
                        (i || ve.get(this, "finish")) && t.stop(!0)
                    };
                    return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                }, stop: function (e, t, n) {
                    var r = function (e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                        var t = !0, i = null != e && e + "queueHooks", o = K.timers, a = ve.get(this);
                        if (i)a[i] && a[i].stop && r(a[i]); else for (i in a)a[i] && a[i].stop && et.test(i) && r(a[i]);
                        for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                        (t || !n) && K.dequeue(this, e)
                    })
                }, finish: function (e) {
                    return e !== !1 && (e = e || "fx"), this.each(function () {
                        var t, n = ve.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = K.timers, a = r ? r.length : 0;
                        for (n.finish = !0, K.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), K.each(["toggle", "show", "hide"], function (e, t) {
                var n = K.fn[t];
                K.fn[t] = function (e, r, i) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(j(t, !0), e, r, i)
                }
            }), K.each({
                slideDown: j("show"),
                slideUp: j("hide"),
                slideToggle: j("toggle"),
                fadeIn: {opacity: "show"},
                fadeOut: {opacity: "hide"},
                fadeToggle: {opacity: "toggle"}
            }, function (e, t) {
                K.fn[e] = function (e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }), K.timers = [], K.fx.tick = function () {
                var e, t = 0, n = K.timers;
                for (Ge = K.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || K.fx.stop(), Ge = void 0
            }, K.fx.timer = function (e) {
                K.timers.push(e), e() ? K.fx.start() : K.timers.pop()
            }, K.fx.interval = 13, K.fx.start = function () {
                Je || (Je = setInterval(K.fx.tick, K.fx.interval))
            }, K.fx.stop = function () {
                clearInterval(Je), Je = null
            }, K.fx.speeds = {slow: 600, fast: 200, _default: 400}, K.fn.delay = function (e, t) {
                return e = K.fx ? K.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                    var r = setTimeout(t, e);
                    n.stop = function () {
                        clearTimeout(r)
                    }
                })
            }, function () {
                var e = J.createElement("input"), t = J.createElement("select"), n = t.appendChild(J.createElement("option"));
                e.type = "checkbox", G.checkOn = "" !== e.value, G.optSelected = n.selected, t.disabled = !0, G.optDisabled = !n.disabled, e = J.createElement("input"), e.value = "t", e.type = "radio", G.radioValue = "t" === e.value
            }();
            var rt, it, ot = K.expr.attrHandle;
            K.fn.extend({
                attr: function (e, t) {
                    return me(this, K.attr, e, t, arguments.length > 1)
                }, removeAttr: function (e) {
                    return this.each(function () {
                        K.removeAttr(this, e)
                    })
                }
            }), K.extend({
                attr: function (e, t, n) {
                    var r, i, o = e.nodeType;
                    if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === De ? K.prop(e, t, n) : (1 === o && K.isXMLDoc(e) || (t = t.toLowerCase(), r = K.attrHooks[t] || (K.expr.match.bool.test(t) ? it : rt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = K.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void K.removeAttr(e, t))
                }, removeAttr: function (e, t) {
                    var n, r, i = 0, o = t && t.match(de);
                    if (o && 1 === e.nodeType)for (; n = o[i++];)r = K.propFix[n] || n, K.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
                }, attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!G.radioValue && "radio" === t && K.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                }
            }), it = {
                set: function (e, t, n) {
                    return t === !1 ? K.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            }, K.each(K.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = ot[t] || K.find.attr;
                ot[t] = function (e, t, r) {
                    var i, o;
                    return r || (o = ot[t], ot[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, ot[t] = o), i
                }
            });
            var at = /^(?:input|select|textarea|button)$/i;
            K.fn.extend({
                prop: function (e, t) {
                    return me(this, K.prop, e, t, arguments.length > 1)
                }, removeProp: function (e) {
                    return this.each(function () {
                        delete this[K.propFix[e] || e]
                    })
                }
            }), K.extend({
                propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
                    var r, i, o, a = e.nodeType;
                    if (e && 3 !== a && 8 !== a && 2 !== a)return o = 1 !== a || !K.isXMLDoc(e), o && (t = K.propFix[t] || t, i = K.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                }, propHooks: {
                    tabIndex: {
                        get: function (e) {
                            return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex : -1
                        }
                    }
                }
            }), G.optSelected || (K.propHooks.selected = {
                get: function (e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                }
            }), K.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                K.propFix[this.toLowerCase()] = this
            });
            var st = /[\t\r\n\f]/g;
            K.fn.extend({
                addClass: function (e) {
                    var t, n, r, i, o, a, s = "string" == typeof e && e, u = 0, c = this.length;
                    if (K.isFunction(e))return this.each(function (t) {
                        K(this).addClass(e.call(this, t, this.className))
                    });
                    if (s)for (t = (e || "").match(de) || []; c > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")) {
                        for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a = K.trim(r), n.className !== a && (n.className = a)
                    }
                    return this
                }, removeClass: function (e) {
                    var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e, u = 0, c = this.length;
                    if (K.isFunction(e))return this.each(function (t) {
                        K(this).removeClass(e.call(this, t, this.className))
                    });
                    if (s)for (t = (e || "").match(de) || []; c > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")) {
                        for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
                        a = e ? K.trim(r) : "", n.className !== a && (n.className = a)
                    }
                    return this
                }, toggleClass: function (e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(K.isFunction(e) ? function (n) {
                        K(this).toggleClass(e.call(this, n, this.className, t), t)
                    } : function () {
                        if ("string" === n)for (var t, r = 0, i = K(this), o = e.match(de) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === De || "boolean" === n) && (this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "")
                    })
                }, hasClass: function (e) {
                    for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0)return !0;
                    return !1
                }
            });
            var ut = /\r/g;
            K.fn.extend({
                val: function (e) {
                    var t, n, r, i = this[0];
                    {
                        if (arguments.length)return r = K.isFunction(e), this.each(function (n) {
                            var i;
                            1 === this.nodeType && (i = r ? e.call(this, n, K(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : K.isArray(i) && (i = K.map(i, function (e) {
                                return null == e ? "" : e + ""
                            })), t = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                        });
                        if (i)return t = K.valHooks[i.type] || K.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ut, "") : null == n ? "" : n)
                    }
                }
            }), K.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = K.find.attr(e, "value");
                            return null != t ? t : K.trim(K.text(e))
                        }
                    }, select: {
                        get: function (e) {
                            for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)if (n = r[u], !(!n.selected && u !== i || (G.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && K.nodeName(n.parentNode, "optgroup"))) {
                                if (t = K(n).val(), o)return t;
                                a.push(t)
                            }
                            return a
                        }, set: function (e, t) {
                            for (var n, r, i = e.options, o = K.makeArray(t), a = i.length; a--;)r = i[a], (r.selected = K.inArray(r.value, o) >= 0) && (n = !0);
                            return n || (e.selectedIndex = -1), o
                        }
                    }
                }
            }), K.each(["radio", "checkbox"], function () {
                K.valHooks[this] = {
                    set: function (e, t) {
                        return K.isArray(t) ? e.checked = K.inArray(K(e).val(), t) >= 0 : void 0
                    }
                }, G.checkOn || (K.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                K.fn[t] = function (e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), K.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }, bind: function (e, t, n) {
                    return this.on(e, null, t, n)
                }, unbind: function (e, t) {
                    return this.off(e, null, t)
                }, delegate: function (e, t, n, r) {
                    return this.on(t, e, n, r)
                }, undelegate: function (e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            });
            var ct = K.now(), lt = /\?/;
            K.parseJSON = function (e) {
                return JSON.parse(e + "")
            }, K.parseXML = function (e) {
                var t, n;
                if (!e || "string" != typeof e)return null;
                try {
                    n = new DOMParser, t = n.parseFromString(e, "text/xml")
                } catch (r) {
                    t = void 0
                }
                return (!t || t.getElementsByTagName("parsererror").length) && K.error("Invalid XML: " + e), t
            };
            var ft = /#.*$/, pt = /([?&])_=[^&]*/, dt = /^(.*?):[ \t]*([^\r\n]*)$/gm, ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, gt = /^(?:GET|HEAD)$/, mt = /^\/\//, vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, yt = {}, xt = {}, bt = "*/".concat("*"), wt = e.location.href, Tt = vt.exec(wt.toLowerCase()) || [];
            K.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: wt,
                    type: "GET",
                    isLocal: ht.test(Tt[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": bt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {xml: /xml/, html: /html/, json: /json/},
                    responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                    converters: {"* text": String, "text html": !0, "text json": K.parseJSON, "text xml": K.parseXML},
                    flatOptions: {url: !0, context: !0}
                },
                ajaxSetup: function (e, t) {
                    return t ? $($(e, K.ajaxSettings), t) : $(K.ajaxSettings, e)
                },
                ajaxPrefilter: q(yt),
                ajaxTransport: q(xt),
                ajax: function (e, t) {
                    function n(e, t, n, a) {
                        var u, l, v, y, b, T = t;
                        2 !== x && (x = 2, s && clearTimeout(s), r = void 0, o = a || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = F(f, w, n)), y = R(f, y, w, u), u ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (K.lastModified[i] = b), b = w.getResponseHeader("etag"), b && (K.etag[i] = b)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, l = y.data, v = y.error, u = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", u ? h.resolveWith(p, [l, T, w]) : h.rejectWith(p, [w, T, v]), w.statusCode(m), m = void 0, c && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? l : v]), g.fireWith(p, [w, T]), c && (d.trigger("ajaxComplete", [w, f]), --K.active || K.event.trigger("ajaxStop")))
                    }

                    "object" == typeof e && (t = e, e = void 0), t = t || {};
                    var r, i, o, a, s, u, c, l, f = K.ajaxSetup({}, t), p = f.context || f, d = f.context && (p.nodeType || p.jquery) ? K(p) : K.event, h = K.Deferred(), g = K.Callbacks("once memory"), m = f.statusCode || {}, v = {}, y = {}, x = 0, b = "canceled", w = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === x) {
                                if (!a)for (a = {}; t = dt.exec(o);)a[t[1].toLowerCase()] = t[2];
                                t = a[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function () {
                            return 2 === x ? o : null
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return x || (e = y[n] = y[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function (e) {
                            return x || (f.mimeType = e), this
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)if (2 > x)for (t in e)m[t] = [m[t], e[t]]; else w.always(e[w.status]);
                            return this
                        },
                        abort: function (e) {
                            var t = e || b;
                            return r && r.abort(t), n(0, t), this
                        }
                    };
                    if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || wt) + "").replace(ft, "").replace(mt, Tt[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = K.trim(f.dataType || "*").toLowerCase().match(de) || [""], null == f.crossDomain && (u = vt.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === Tt[1] && u[2] === Tt[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (Tt[3] || ("http:" === Tt[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = K.param(f.data, f.traditional)), P(yt, f, t, w), 2 === x)return w;
                    c = K.event && f.global, c && 0 === K.active++ && K.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !gt.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (lt.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = pt.test(i) ? i.replace(pt, "$1_=" + ct++) : i + (lt.test(i) ? "&" : "?") + "_=" + ct++)), f.ifModified && (K.lastModified[i] && w.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && w.setRequestHeader("If-None-Match", K.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + bt + "; q=0.01" : "") : f.accepts["*"]);
                    for (l in f.headers)w.setRequestHeader(l, f.headers[l]);
                    if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === x))return w.abort();
                    b = "abort";
                    for (l in{success: 1, error: 1, complete: 1})w[l](f[l]);
                    if (r = P(xt, f, t, w)) {
                        w.readyState = 1, c && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function () {
                            w.abort("timeout")
                        }, f.timeout));
                        try {
                            x = 1, r.send(v, n)
                        } catch (T) {
                            if (!(2 > x))throw T;
                            n(-1, T)
                        }
                    } else n(-1, "No Transport");
                    return w
                },
                getJSON: function (e, t, n) {
                    return K.get(e, t, n, "json")
                },
                getScript: function (e, t) {
                    return K.get(e, void 0, t, "script")
                }
            }), K.each(["get", "post"], function (e, t) {
                K[t] = function (e, n, r, i) {
                    return K.isFunction(n) && (i = i || r, r = n, n = void 0), K.ajax({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    })
                }
            }), K._evalUrl = function (e) {
                return K.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
            }, K.fn.extend({
                wrapAll: function (e) {
                    var t;
                    return K.isFunction(e) ? this.each(function (t) {
                        K(this).wrapAll(e.call(this, t))
                    }) : (this[0] && (t = K(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                        return e
                    }).append(this)), this)
                }, wrapInner: function (e) {
                    return this.each(K.isFunction(e) ? function (t) {
                        K(this).wrapInner(e.call(this, t))
                    } : function () {
                        var t = K(this), n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                }, wrap: function (e) {
                    var t = K.isFunction(e);
                    return this.each(function (n) {
                        K(this).wrapAll(t ? e.call(this, n) : e)
                    })
                }, unwrap: function () {
                    return this.parent().each(function () {
                        K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), K.expr.filters.hidden = function (e) {
                return e.offsetWidth <= 0 && e.offsetHeight <= 0
            }, K.expr.filters.visible = function (e) {
                return !K.expr.filters.hidden(e)
            };
            var Ct = /%20/g, kt = /\[\]$/, Dt = /\r?\n/g, St = /^(?:submit|button|image|reset|file)$/i, Et = /^(?:input|select|textarea|keygen)/i;
            K.param = function (e, t) {
                var n, r = [], i = function (e, t) {
                    t = K.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                if (void 0 === t && (t = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(e) || e.jquery && !K.isPlainObject(e))K.each(e, function () {
                    i(this.name, this.value)
                }); else for (n in e)I(n, e[n], t, i);
                return r.join("&").replace(Ct, "+")
            }, K.fn.extend({
                serialize: function () {
                    return K.param(this.serializeArray())
                }, serializeArray: function () {
                    return this.map(function () {
                        var e = K.prop(this, "elements");
                        return e ? K.makeArray(e) : this
                    }).filter(function () {
                        var e = this.type;
                        return this.name && !K(this).is(":disabled") && Et.test(this.nodeName) && !St.test(e) && (this.checked || !ke.test(e))
                    }).map(function (e, t) {
                        var n = K(this).val();
                        return null == n ? null : K.isArray(n) ? K.map(n, function (e) {
                            return {name: t.name, value: e.replace(Dt, "\r\n")}
                        }) : {name: t.name, value: n.replace(Dt, "\r\n")}
                    }).get()
                }
            }), K.ajaxSettings.xhr = function () {
                try {
                    return new XMLHttpRequest
                } catch (e) {
                }
            };
            var Nt = 0, At = {}, jt = {0: 200, 1223: 204}, Mt = K.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload", function () {
                for (var e in At)At[e]()
            }), G.cors = !!Mt && "withCredentials" in Mt, G.ajax = Mt = !!Mt, K.ajaxTransport(function (e) {
                var t;
                return G.cors || Mt && !e.crossDomain ? {
                    send: function (n, r) {
                        var i, o = e.xhr(), a = ++Nt;
                        if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
                        e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (i in n)o.setRequestHeader(i, n[i]);
                        t = function (e) {
                            return function () {
                                t && (delete At[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(jt[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {text: o.responseText} : void 0, o.getAllResponseHeaders()))
                            }
                        }, o.onload = t(), o.onerror = t("error"), t = At[a] = t("abort");
                        try {
                            o.send(e.hasContent && e.data || null)
                        } catch (s) {
                            if (t)throw s
                        }
                    }, abort: function () {
                        t && t()
                    }
                } : void 0
            }), K.ajaxSetup({
                accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                contents: {script: /(?:java|ecma)script/},
                converters: {
                    "text script": function (e) {
                        return K.globalEval(e), e
                    }
                }
            }), K.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), K.ajaxTransport("script", function (e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function (r, i) {
                            t = K("<script>").prop({
                                async: !0,
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function (e) {
                                t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                            }), J.head.appendChild(t[0])
                        }, abort: function () {
                            n && n()
                        }
                    }
                }
            });
            var Ht = [], Lt = /(=)\?(?=&|$)|\?\?/;
            K.ajaxSetup({
                jsonp: "callback", jsonpCallback: function () {
                    var e = Ht.pop() || K.expando + "_" + ct++;
                    return this[e] = !0, e
                }
            }), K.ajaxPrefilter("json jsonp", function (t, n, r) {
                var i, o, a, s = t.jsonp !== !1 && (Lt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Lt.test(t.data) && "data");
                return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = K.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Lt, "$1" + i) : t.jsonp !== !1 && (t.url += (lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
                    return a || K.error(i + " was not called"), a[0]
                }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
                    a = arguments
                }, r.always(function () {
                    e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Ht.push(i)), a && K.isFunction(o) && o(a[0]), a = o = void 0
                }), "script") : void 0
            }), K.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e)return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || J;
                var r = ae.exec(e), i = !n && [];
                return r ? [t.createElement(r[1])] : (r = K.buildFragment([e], t, i), i && i.length && K(i).remove(), K.merge([], r.childNodes))
            };
            var Ot = K.fn.load;
            K.fn.load = function (e, t, n) {
                if ("string" != typeof e && Ot)return Ot.apply(this, arguments);
                var r, i, o, a = this, s = e.indexOf(" ");
                return s >= 0 && (r = K.trim(e.slice(s)), e = e.slice(0, s)), K.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && K.ajax({
                    url: e,
                    type: i,
                    dataType: "html",
                    data: t
                }).done(function (e) {
                    o = arguments, a.html(r ? K("<div>").append(K.parseHTML(e)).find(r) : e)
                }).complete(n && function (e, t) {
                        a.each(n, o || [e.responseText, t, e])
                    }), this
            }, K.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                K.fn[t] = function (e) {
                    return this.on(t, e)
                }
            }), K.expr.filters.animated = function (e) {
                return K.grep(K.timers, function (t) {
                    return e === t.elem
                }).length
            };
            var qt = e.document.documentElement;
            K.offset = {
                setOffset: function (e, t, n) {
                    var r, i, o, a, s, u, c, l = K.css(e, "position"), f = K(e), p = {};
                    "static" === l && (e.style.position = "relative"), s = f.offset(), o = K.css(e, "top"), u = K.css(e, "left"), c = ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1, c ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), K.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
                }
            }, K.fn.extend({
                offset: function (e) {
                    if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                        K.offset.setOffset(this, e, t)
                    });
                    var t, n, r = this[0], i = {top: 0, left: 0}, o = r && r.ownerDocument;
                    if (o)return t = o.documentElement, K.contains(t, r) ? (typeof r.getBoundingClientRect !== De && (i = r.getBoundingClientRect()), n = W(o), {
                        top: i.top + n.pageYOffset - t.clientTop,
                        left: i.left + n.pageXOffset - t.clientLeft
                    }) : i
                }, position: function () {
                    if (this[0]) {
                        var e, t, n = this[0], r = {top: 0, left: 0};
                        return "fixed" === K.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), K.nodeName(e[0], "html") || (r = e.offset()), r.top += K.css(e[0], "borderTopWidth", !0), r.left += K.css(e[0], "borderLeftWidth", !0)), {
                            top: t.top - r.top - K.css(n, "marginTop", !0),
                            left: t.left - r.left - K.css(n, "marginLeft", !0)
                        }
                    }
                }, offsetParent: function () {
                    return this.map(function () {
                        for (var e = this.offsetParent || qt; e && !K.nodeName(e, "html") && "static" === K.css(e, "position");)e = e.offsetParent;
                        return e || qt
                    })
                }
            }), K.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
                var r = "pageYOffset" === n;
                K.fn[t] = function (i) {
                    return me(this, function (t, i, o) {
                        var a = W(t);
                        return void 0 === o ? a ? a[n] : t[i] : void(a ? a.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o)
                    }, t, i, arguments.length, null)
                }
            }), K.each(["top", "left"], function (e, t) {
                K.cssHooks[t] = T(G.pixelPosition, function (e, n) {
                    return n ? (n = w(e, t), _e.test(n) ? K(e).position()[t] + "px" : n) : void 0
                })
            }), K.each({Height: "height", Width: "width"}, function (e, t) {
                K.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
                    K.fn[r] = function (r, i) {
                        var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
                        return me(this, function (t, n, r) {
                            var i;
                            return K.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? K.css(t, n, a) : K.style(t, n, r, a)
                        }, t, o ? r : void 0, o, null)
                    }
                })
            }), K.fn.size = function () {
                return this.length
            }, K.fn.andSelf = K.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
                return K
            });
            var Pt = e.jQuery, $t = e.$;
            return K.noConflict = function (t) {
                return e.$ === K && (e.$ = $t), t && e.jQuery === K && (e.jQuery = Pt), K
            }, typeof t === De && (e.jQuery = e.$ = K), K
        })
    }, {}], md5: [function (e, t, n) {
        "use strict";
        function r(e, t) {
            var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
            return r << 16 | 65535 & n
        }

        function i(e, t) {
            return e << t | e >>> 32 - t
        }

        function o(e, t, n, o, a, s) {
            return r(i(r(r(t, e), r(o, s)), a), n)
        }

        function a(e, t, n, r, i, a, s) {
            return o(t & n | ~t & r, e, t, i, a, s)
        }

        function s(e, t, n, r, i, a, s) {
            return o(t & r | n & ~r, e, t, i, a, s)
        }

        function u(e, t, n, r, i, a, s) {
            return o(t ^ n ^ r, e, t, i, a, s)
        }

        function c(e, t, n, r, i, a, s) {
            return o(n ^ (t | ~r), e, t, i, a, s)
        }

        function l(e, t) {
            e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
            var n, i, o, l, f, p = 1732584193, d = -271733879, h = -1732584194, g = 271733878;
            for (n = 0; n < e.length; n += 16)i = p, o = d, l = h, f = g, p = a(p, d, h, g, e[n], 7, -680876936), g = a(g, p, d, h, e[n + 1], 12, -389564586), h = a(h, g, p, d, e[n + 2], 17, 606105819), d = a(d, h, g, p, e[n + 3], 22, -1044525330), p = a(p, d, h, g, e[n + 4], 7, -176418897), g = a(g, p, d, h, e[n + 5], 12, 1200080426), h = a(h, g, p, d, e[n + 6], 17, -1473231341), d = a(d, h, g, p, e[n + 7], 22, -45705983), p = a(p, d, h, g, e[n + 8], 7, 1770035416), g = a(g, p, d, h, e[n + 9], 12, -1958414417), h = a(h, g, p, d, e[n + 10], 17, -42063), d = a(d, h, g, p, e[n + 11], 22, -1990404162), p = a(p, d, h, g, e[n + 12], 7, 1804603682), g = a(g, p, d, h, e[n + 13], 12, -40341101), h = a(h, g, p, d, e[n + 14], 17, -1502002290), d = a(d, h, g, p, e[n + 15], 22, 1236535329), p = s(p, d, h, g, e[n + 1], 5, -165796510), g = s(g, p, d, h, e[n + 6], 9, -1069501632), h = s(h, g, p, d, e[n + 11], 14, 643717713), d = s(d, h, g, p, e[n], 20, -373897302), p = s(p, d, h, g, e[n + 5], 5, -701558691), g = s(g, p, d, h, e[n + 10], 9, 38016083), h = s(h, g, p, d, e[n + 15], 14, -660478335), d = s(d, h, g, p, e[n + 4], 20, -405537848), p = s(p, d, h, g, e[n + 9], 5, 568446438), g = s(g, p, d, h, e[n + 14], 9, -1019803690), h = s(h, g, p, d, e[n + 3], 14, -187363961), d = s(d, h, g, p, e[n + 8], 20, 1163531501), p = s(p, d, h, g, e[n + 13], 5, -1444681467), g = s(g, p, d, h, e[n + 2], 9, -51403784), h = s(h, g, p, d, e[n + 7], 14, 1735328473), d = s(d, h, g, p, e[n + 12], 20, -1926607734), p = u(p, d, h, g, e[n + 5], 4, -378558), g = u(g, p, d, h, e[n + 8], 11, -2022574463), h = u(h, g, p, d, e[n + 11], 16, 1839030562), d = u(d, h, g, p, e[n + 14], 23, -35309556), p = u(p, d, h, g, e[n + 1], 4, -1530992060), g = u(g, p, d, h, e[n + 4], 11, 1272893353), h = u(h, g, p, d, e[n + 7], 16, -155497632), d = u(d, h, g, p, e[n + 10], 23, -1094730640), p = u(p, d, h, g, e[n + 13], 4, 681279174), g = u(g, p, d, h, e[n], 11, -358537222), h = u(h, g, p, d, e[n + 3], 16, -722521979), d = u(d, h, g, p, e[n + 6], 23, 76029189), p = u(p, d, h, g, e[n + 9], 4, -640364487), g = u(g, p, d, h, e[n + 12], 11, -421815835), h = u(h, g, p, d, e[n + 15], 16, 530742520), d = u(d, h, g, p, e[n + 2], 23, -995338651), p = c(p, d, h, g, e[n], 6, -198630844), g = c(g, p, d, h, e[n + 7], 10, 1126891415), h = c(h, g, p, d, e[n + 14], 15, -1416354905), d = c(d, h, g, p, e[n + 5], 21, -57434055), p = c(p, d, h, g, e[n + 12], 6, 1700485571), g = c(g, p, d, h, e[n + 3], 10, -1894986606), h = c(h, g, p, d, e[n + 10], 15, -1051523), d = c(d, h, g, p, e[n + 1], 21, -2054922799), p = c(p, d, h, g, e[n + 8], 6, 1873313359), g = c(g, p, d, h, e[n + 15], 10, -30611744), h = c(h, g, p, d, e[n + 6], 15, -1560198380), d = c(d, h, g, p, e[n + 13], 21, 1309151649), p = c(p, d, h, g, e[n + 4], 6, -145523070), g = c(g, p, d, h, e[n + 11], 10, -1120210379), h = c(h, g, p, d, e[n + 2], 15, 718787259), d = c(d, h, g, p, e[n + 9], 21, -343485551), p = r(p, i), d = r(d, o), h = r(h, l), g = r(g, f);
            return [p, d, h, g]
        }

        function f(e) {
            var t, n = "";
            for (t = 0; t < 32 * e.length; t += 8)n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
            return n
        }

        function p(e) {
            var t, n = [];
            for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1)n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8)n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n
        }

        function d(e) {
            return f(l(p(e), 8 * e.length))
        }

        function h(e, t) {
            var n, r, i = p(e), o = [], a = [];
            for (o[15] = a[15] = void 0, i.length > 16 && (i = l(i, 8 * e.length)), n = 0; 16 > n; n += 1)o[n] = 909522486 ^ i[n], a[n] = 1549556828 ^ i[n];
            return r = l(o.concat(p(t)), 512 + 8 * t.length), f(l(a.concat(r), 640))
        }

        function g(e) {
            var t, n, r = "0123456789abcdef", i = "";
            for (n = 0; n < e.length; n += 1)t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
            return i
        }

        function m(e) {
            return unescape(encodeURIComponent(e))
        }

        function v(e) {
            return d(m(e))
        }

        function y(e) {
            return g(v(e))
        }

        function x(e, t) {
            return h(m(e), m(t))
        }

        function b(e, t) {
            return g(x(e, t))
        }

        function w(e, t, n) {
            return t ? n ? x(t, e) : b(t, e) : n ? v(e) : y(e)
        }

        t.exports = w
    }, {}], skel: [function (e, t, n) {
        var r = function () {
            "use strict";
            var e = {
                breakpointIds: null,
                events: {},
                isInit: !1,
                obj: {attachments: {}, breakpoints: {}, head: null, states: {}},
                sd: "/",
                state: null,
                stateHandlers: {},
                stateId: "",
                vars: {},
                DOMReady: null,
                indexOf: null,
                isArray: null,
                iterate: null,
                matchesMedia: null,
                extend: function (t, n) {
                    e.iterate(n, function (r) {
                        e.isArray(n[r]) ? (e.isArray(t[r]) || (t[r] = []), e.extend(t[r], n[r])) : "object" == typeof n[r] ? ("object" != typeof t[r] && (t[r] = {}), e.extend(t[r], n[r])) : t[r] = n[r]
                    })
                },
                newStyle: function (e) {
                    var t = document.createElement("style");
                    return t.type = "text/css", t.innerHTML = e, t
                },
                _canUse: null,
                canUse: function (t) {
                    e._canUse || (e._canUse = document.createElement("div"));
                    var n = e._canUse.style, r = t.charAt(0).toUpperCase() + t.slice(1);
                    return t in n || "Moz" + r in n || "Webkit" + r in n || "O" + r in n || "ms" + r in n
                },
                on: function (t, n) {
                    var r = t.split(/[\s]+/);
                    return e.iterate(r, function (t) {
                        var i = r[t];
                        if (e.isInit) {
                            if ("init" == i)return void n();
                            if ("change" == i)n(); else {
                                var o = i.charAt(0);
                                if ("+" == o || "!" == o) {
                                    var a = i.substring(1);
                                    if (a in e.obj.breakpoints)if ("+" == o && e.obj.breakpoints[a].active)n(); else if ("!" == o && !e.obj.breakpoints[a].active)return void n()
                                }
                            }
                        }
                        e.events[i] || (e.events[i] = []), e.events[i].push(n)
                    }), e
                },
                trigger: function (t) {
                    return e.events[t] && 0 != e.events[t].length ? (e.iterate(e.events[t], function (n) {
                        e.events[t][n]()
                    }), e) : void 0
                },
                breakpoint: function (t) {
                    return e.obj.breakpoints[t]
                },
                breakpoints: function (t) {
                    function n(e, t) {
                        this.name = this.id = e, this.media = t, this.active = !1, this.wasActive = !1
                    }

                    return n.prototype.matches = function () {
                        return e.matchesMedia(this.media)
                    }, n.prototype.sync = function () {
                        this.wasActive = this.active, this.active = this.matches()
                    }, e.iterate(t, function (r) {
                        e.obj.breakpoints[r] = new n(r, t[r])
                    }), window.setTimeout(function () {
                        e.poll()
                    }, 0), e
                },
                addStateHandler: function (t, n) {
                    e.stateHandlers[t] = n
                },
                callStateHandler: function (t) {
                    var n = e.stateHandlers[t]();
                    e.iterate(n, function (t) {
                        e.state.attachments.push(n[t]);

                    })
                },
                changeState: function (t) {
                    e.iterate(e.obj.breakpoints, function (t) {
                        e.obj.breakpoints[t].sync()
                    }), e.vars.lastStateId = e.stateId, e.stateId = t, e.breakpointIds = e.stateId === e.sd ? [] : e.stateId.substring(1).split(e.sd), e.obj.states[e.stateId] ? e.state = e.obj.states[e.stateId] : (e.obj.states[e.stateId] = {attachments: []}, e.state = e.obj.states[e.stateId], e.iterate(e.stateHandlers, e.callStateHandler)), e.detachAll(e.state.attachments), e.attachAll(e.state.attachments), e.vars.stateId = e.stateId, e.vars.state = e.state, e.trigger("change"), e.iterate(e.obj.breakpoints, function (t) {
                        e.obj.breakpoints[t].active ? e.obj.breakpoints[t].wasActive || e.trigger("+" + t) : e.obj.breakpoints[t].wasActive && e.trigger("-" + t)
                    })
                },
                generateStateConfig: function (t, n) {
                    var r = {};
                    return e.extend(r, t), e.iterate(e.breakpointIds, function (t) {
                        e.extend(r, n[e.breakpointIds[t]])
                    }), r
                },
                getStateId: function () {
                    var t = "";
                    return e.iterate(e.obj.breakpoints, function (n) {
                        var r = e.obj.breakpoints[n];
                        r.matches() && (t += e.sd + r.id)
                    }), t
                },
                poll: function () {
                    var t = "";
                    t = e.getStateId(), "" === t && (t = e.sd), t !== e.stateId && e.changeState(t)
                },
                _attach: null,
                attach: function (t) {
                    var n = e.obj.head, r = t.element;
                    return r.parentNode && r.parentNode.tagName ? !1 : (e._attach || (e._attach = n.firstChild), n.insertBefore(r, e._attach.nextSibling), t.permanent && (e._attach = r), !0)
                },
                attachAll: function (t) {
                    var n = [];
                    e.iterate(t, function (e) {
                        n[t[e].priority] || (n[t[e].priority] = []), n[t[e].priority].push(t[e])
                    }), n.reverse(), e.iterate(n, function (t) {
                        e.iterate(n[t], function (r) {
                            e.attach(n[t][r])
                        })
                    })
                },
                detach: function (e) {
                    var t = e.element;
                    return e.permanent || !t.parentNode || t.parentNode && !t.parentNode.tagName ? !1 : (t.parentNode.removeChild(t), !0)
                },
                detachAll: function (t) {
                    var n = {};
                    e.iterate(t, function (e) {
                        n[t[e].id] = !0
                    }), e.iterate(e.obj.attachments, function (t) {
                        t in n || e.detach(e.obj.attachments[t])
                    })
                },
                attachment: function (t) {
                    return t in e.obj.attachments ? e.obj.attachments[t] : null
                },
                newAttachment: function (t, n, r, i) {
                    return e.obj.attachments[t] = {id: t, element: n, priority: r, permanent: i}
                },
                init: function () {
                    e.initMethods(), e.initVars(), e.initEvents(), e.obj.head = document.getElementsByTagName("head")[0], e.isInit = !0, e.trigger("init")
                },
                initEvents: function () {
                    e.on("resize", function () {
                        e.poll()
                    }), e.on("orientationChange", function () {
                        e.poll()
                    }), e.DOMReady(function () {
                        e.trigger("ready")
                    }), window.onload && e.on("load", window.onload), window.onload = function () {
                        e.trigger("load")
                    }, window.onresize && e.on("resize", window.onresize), window.onresize = function () {
                        e.trigger("resize")
                    }, window.onorientationchange && e.on("orientationChange", window.onorientationchange), window.onorientationchange = function () {
                        e.trigger("orientationChange")
                    }
                },
                initMethods: function () {
                    document.addEventListener ? !function (t, n) {
                        e.DOMReady = n()
                    }("domready", function () {
                        function e(e) {
                            for (o = 1; e = n.shift();)e()
                        }

                        var t, n = [], r = document, i = "DOMContentLoaded", o = /^loaded|^c/.test(r.readyState);
                        return r.addEventListener(i, t = function () {
                            r.removeEventListener(i, t), e()
                        }), function (e) {
                            o ? e() : n.push(e)
                        }
                    }) : !function (t, n) {
                        e.DOMReady = n()
                    }("domready", function (e) {
                        function t(e) {
                            for (d = 1; e = r.shift();)e()
                        }

                        var n, r = [], i = !1, o = document, a = o.documentElement, s = a.doScroll, u = "DOMContentLoaded", c = "addEventListener", l = "onreadystatechange", f = "readyState", p = s ? /^loaded|^c/ : /^loaded|c/, d = p.test(o[f]);
                        return o[c] && o[c](u, n = function () {
                            o.removeEventListener(u, n, i), t()
                        }, i), s && o.attachEvent(l, n = function () {
                            /^c/.test(o[f]) && (o.detachEvent(l, n), t())
                        }), e = s ? function (t) {
                            self != top ? d ? t() : r.push(t) : function () {
                                try {
                                    a.doScroll("left")
                                } catch (n) {
                                    return setTimeout(function () {
                                        e(t)
                                    }, 50)
                                }
                                t()
                            }()
                        } : function (e) {
                            d ? e() : r.push(e)
                        }
                    }), e.indexOf = Array.prototype.indexOf ? function (e, t) {
                        return e.indexOf(t)
                    } : function (e, t) {
                        if ("string" == typeof e)return e.indexOf(t);
                        var n, r, i = t ? t : 0;
                        if (!this)throw new TypeError;
                        if (r = this.length, 0 === r || i >= r)return -1;
                        for (0 > i && (i = r - Math.abs(i)), n = i; r > n; n++)if (this[n] === e)return n;
                        return -1
                    }, e.isArray = Array.isArray ? function (e) {
                        return Array.isArray(e)
                    } : function (e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }, e.iterate = Object.keys ? function (e, t) {
                        if (!e)return [];
                        var n, r = Object.keys(e);
                        for (n = 0; r[n] && t(r[n], e[r[n]]) !== !1; n++);
                    } : function (e, t) {
                        if (!e)return [];
                        var n;
                        for (n in e)if (Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]) === !1)break
                    }, e.matchesMedia = window.matchMedia ? function (e) {
                        return "" == e ? !0 : window.matchMedia(e).matches
                    } : window.styleMedia || window.media ? function (e) {
                        if ("" == e)return !0;
                        var t = window.styleMedia || window.media;
                        return t.matchMedium(e || "all")
                    } : window.getComputedStyle ? function (e) {
                        if ("" == e)return !0;
                        var t = document.createElement("style"), n = document.getElementsByTagName("script")[0], r = null;
                        t.type = "text/css", t.id = "matchmediajs-test", n.parentNode.insertBefore(t, n), r = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle;
                        var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                        return t.styleSheet ? t.styleSheet.cssText = i : t.textContent = i, "1px" === r.width
                    } : function (e) {
                        if ("" == e)return !0;
                        var t, n, r, i, o = {"min-width": null, "max-width": null}, a = !1;
                        for (r = e.split(/\s+and\s+/), t = 0; t < r.length; t++)n = r[t], "(" == n.charAt(0) && (n = n.substring(1, n.length - 1), i = n.split(/:\s+/), 2 == i.length && (o[i[0].replace(/^\s+|\s+$/g, "")] = parseInt(i[1]), a = !0));
                        if (!a)return !1;
                        var s = document.documentElement.clientWidth, u = document.documentElement.clientHeight;
                        return null !== o["min-width"] && s < o["min-width"] || null !== o["max-width"] && s > o["max-width"] || null !== o["min-height"] && u < o["min-height"] || null !== o["max-height"] && u > o["max-height"] ? !1 : !0
                    }, navigator.userAgent.match(/MSIE ([0-9]+)/) && RegExp.$1 < 9 && (e.newStyle = function (e) {
                        var t = document.createElement("span");
                        return t.innerHTML = '&nbsp;<style type="text/css">' + e + "</style>", t
                    })
                },
                initVars: function () {
                    var t, n, r, i = navigator.userAgent;
                    t = "other", n = 0, r = [["firefox", /Firefox\/([0-9\.]+)/], ["bb", /BlackBerry.+Version\/([0-9\.]+)/], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/], ["opera", /OPR\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)/], ["edge", /Edge\/([0-9\.]+)/], ["safari", /Version\/([0-9\.]+).+Safari/], ["chrome", /Chrome\/([0-9\.]+)/], ["ie", /MSIE ([0-9]+)/], ["ie", /Trident\/.+rv:([0-9]+)/]], e.iterate(r, function (e, r) {
                        return i.match(r[1]) ? (t = r[0], n = parseFloat(RegExp.$1), !1) : void 0
                    }), e.vars.browser = t, e.vars.browserVersion = n, t = "other", n = 0, r = [["ios", /([0-9_]+) like Mac OS X/, function (e) {
                        return e.replace("_", ".").replace("_", "")
                    }], ["ios", /CPU like Mac OS X/, function (e) {
                        return 0
                    }], ["wp", /Windows Phone ([0-9\.]+)/, null], ["android", /Android ([0-9\.]+)/, null], ["mac", /Macintosh.+Mac OS X ([0-9_]+)/, function (e) {
                        return e.replace("_", ".").replace("_", "")
                    }], ["windows", /Windows NT ([0-9\.]+)/, null], ["bb", /BlackBerry.+Version\/([0-9\.]+)/, null], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/, null]], e.iterate(r, function (e, r) {
                        return i.match(r[1]) ? (t = r[0], n = parseFloat(r[2] ? r[2](RegExp.$1) : RegExp.$1), !1) : void 0
                    }), e.vars.os = t, e.vars.osVersion = n, e.vars.IEVersion = "ie" == e.vars.browser ? e.vars.browserVersion : 99, e.vars.touch = "wp" == e.vars.os ? navigator.msMaxTouchPoints > 0 : !!("ontouchstart" in window), e.vars.mobile = "wp" == e.vars.os || "android" == e.vars.os || "ios" == e.vars.os || "bb" == e.vars.os
                }
            };
            return e.init(), e
        }();
        !function (e, r) {
            "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? t.exports = r() : e.skel = r()
        }(this, function () {
            return r
        })
    }, {}], web: [function (e, t, n) {
        var r = function () {
            String.prototype.capitalize = function () {
                return this.charAt(0).toUpperCase() + this.slice(1)
            };
            var e = {
                types: {
                    none: null,
                    any: "^[ -~\\tÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\n\\r]*$",
                    text: "^[a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð0-9\\_\\-\\\\\"\\'\\ \\?\\!\\.\\,\\:\\;\\(\\)\\/\\#\\&\\@\\$\\%\\*\\+\\=\\n\\r]+$",
                    utf8text: "^[^\\<\\>]+$",
                    alnum: "^[a-zA-Z0-9]+$",
                    alpha: "^[a-zA-Z]+$",
                    digits: "^[0-9]+$",
                    bool: null,
                    domain: "^[a-z0-9][a-z0-9\\-\\.]*\\.[a-z]+$",
                    email: "^([a-zA-Z0-9\\_\\-\\.\\+]+)@([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]+)$",
                    "float": "^-?([0-9]+)(\\.([0-9]+)){0,1}$",
                    id: "^[a-z0-9\\-]+$",
                    "int": "^-?([0-9]+)$",
                    ip: "^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$",
                    name: "^([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\-\\']+(?:\\.)?(?: [a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\-\\']+(?:\\.)?)*)$",
                    password: "^[ -~]+$",
                    request: "^([/!#$&-;=?-[]_a-z~]|%[0-9a-fA-F]{2})+$",
                    tel: "^[0-9\\-\\+\\(\\)\\s]+$",
                    title: "^[a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð0-9\\_\\-\\\\\"\\'\\ \\?\\!\\.\\,\\:\\;\\(\\)\\/\\#\\&\\@\\$\\%\\*\\+\\=]+$",
                    uri: "^[a-z0-9\\-\\.]+:[a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\&\\-\\_\\+\\=\\;\\,\\.\\?\\/\\:]+$",
                    url: "^https?:\\/\\/[a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\&\\-\\_\\+\\=\\;\\,\\.\\?\\/\\:]+$",
                    username: "^[a-zA-Z0-9\\_]+$",
                    word: "^[a-zA-Z0-9\\_\\-]+$",
                    htmlacolor: "(^#[a-fA-F0-9]{6}$|^#[a-fA-F0-9]{8}$)",
                    htmlcolor: "^#[a-fA-F0-9]{6}$",
                    rgbacolor: "rgba\\([0-9]+,\\s*[0-9]+,\\s*[0-9]+,\\s*[0-9\\.]+\\)",
                    rgbcolor: "rgb\\([0-9]+,\\s*[0-9]+,\\s*[0-9]+\\)"
                },
                typeNames: {
                    none: !1,
                    any: !1,
                    text: !1,
                    utf8text: !1,
                    alnum: "alphanumeric string",
                    alpha: "alphabetic string",
                    digits: "string of digits",
                    bool: "boolean",
                    email: "email address",
                    "float": "decimal value",
                    id: !1,
                    "int": "integer",
                    ip: "IP address",
                    name: !1,
                    tel: "telephone number",
                    title: !1,
                    url: "URL",
                    username: !1,
                    word: !1,
                    htmlacolor: "HTML color",
                    htmlcolor: "HTML color",
                    rgbacolor: "RGB color",
                    rgbcolor: "RGB color"
                },
                cookie: function (e, t, n, r) {
                    if ("" === t)return r || (r = "/"), document.cookie = e + "=; expires=Thu, 1 Jan 1970 12:00:00 UTC; path=" + r, null;
                    if (t) {
                        var i, o;
                        return n || (n = 0), i = new Date, i.setTime(i.getTime() + n), o = i.toGMTString(), r || (r = "/"), document.cookie = e + "=" + t + "; expires=" + o + "; path=" + r, t
                    }
                    var a, u = document.cookie.split(";");
                    for (s in u)if (a = u[s].split("="), a[0].trim() == e)return unescape(a[1]);
                    return null
                },
                is: function (t, n) {
                    return n ? "function" == typeof t ? t(n) : e.types[t] ? !!n.match(new RegExp(e.types[t])) : !0 : !0
                },
                typeName: function (t) {
                    return e.typeNames[t] ? e.typeNames[t] : !1
                },
                fieldValue: function (e, t, n) {
                    var r, i;
                    return r = e.find("#" == t[0] ? t : '[name="' + t + '"]'), "checkbox" == r.attr("type") ? (n && r.prop("checked", n).trigger("change"), r.prop("checked")) : "radio" == r.attr("type") ? (n && r.filter('[value="' + n + '"]').prop("checked", !0).trigger("change"), i = r.filter(":checked").val(), ("undefined" == typeof i || null === i) && (i = ""), i) : ((n || "" === n) && r.val(n).trigger("change"), i = r.val(), ("undefined" == typeof i || null === i) && (i = ""), i)
                },
                scrollTo: function (e, t) {
                    var n, r, i = $(window), o = $("body,html");
                    return n = Math.max(0, e.offset().top - (i.height() - e.outerHeight()) / 2), r = Math.abs(n - i.scrollTop()), 50 > r ? (o.scrollTop(n), t && t()) : o.stop().animate({scrollTop: n}, 750, "swing", t), !0
                },
                date: {
                    offsetValue: 0,
                    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    offset: function (t) {
                        return "undefined" != typeof t && (e.date.offsetValue = parseInt(t)), e.date.offsetValue
                    },
                    timestamp: function () {
                        return parseInt(Date.now() / 1e3) - e.date.offset()
                    },
                    absolute: function (t, n) {
                        t || (t = e.date.timestamp()), n || (n = 1);
                        var r, i, o, a, s, u, c, l, f, p = new Date, d = "";
                        switch (p.setTime(1e3 * t), r = e.date.months[p.getMonth()], i = p.getDate(), o = p.getFullYear(), a = p.getHours(), s = p.getMinutes(), u = p.getSeconds(), c = e.date.days[p.getDay()], a > 12 ? (l = a - 12, f = "pm") : (l = a, f = "am"), n) {
                            case 1:
                                d = r + " " + i + ", " + o;
                                break;
                            case 2:
                                d = r + " " + i + ", " + o + " " + l + ":" + s + f;
                                break;
                            case 3:
                                d = c + ", " + r + " " + i + ", " + o + " " + a + ":" + s + ":" + u
                        }
                        return d
                    },
                    relative: function (t, n, r) {
                        t || (t = e.date.timestamp()), n || (n = 1), r || (r = 129600);
                        var i, o, a, s, u, c = e.date.timestamp(), l = "", f = !1;
                        if (t > c ? (i = t - c, f = !0) : (i = c - t, l = " ago"), r !== !1 && i > r)return e.date.absolute(t, n);
                        if (60 > i)switch (n) {
                            case 1:
                                if (30 > i)return "just now";
                                if (60 > i)return "about a minute" + l;
                            case 2:
                                return i + " second" + (1 != i ? "s" : "") + l;
                            case 3:
                            default:
                                return i + " secs" + l
                        }
                        if (3600 > i)switch (a = Math.floor(i / 60), i -= 60 * a, seconds = i, n) {
                            case 1:
                                if (a > 45)return "about an hour" + l;
                            case 2:
                                return a + " minute" + (1 != a ? "s" : "") + l;
                            case 3:
                            default:
                                return a + " mins " + seconds + " secs" + l
                        }
                        if (86400 > i) {
                            if (o = Math.floor(i / 3600), i -= 3600 * o, 0 === i)return o + " hrs" + l;
                            switch (a = Math.floor(i / 60), n) {
                                case 2:
                                    return o + " hour" + (1 != o ? "s" : "") + l;
                                case 1:
                                case 3:
                                default:
                                    return o + " hrs " + a + " mins" + l
                            }
                        }
                        if (604800 > i)switch (s = Math.floor(i / 86400), i -= 86400 * s, o = Math.floor(i / 3600), n) {
                            case 1:
                                if (1 == s && 6 > o)return f ? "tomorrow" : "yesterday";
                            case 2:
                                return o > 12 && s++, s + " day" + (1 != s ? "s" : "") + l;
                            case 3:
                            default:
                                return s + " days " + o + " hrs" + l
                        }
                        switch (u = Math.floor(i / 604800), i -= 604800 * u, s = Math.floor(i / 86400), i -= 86400 * s, o = Math.floor(i / 3600), n) {
                            case 1:
                                if (1 == u && 2 > s)return "about a week" + l;
                                if (4 == u)return "about a month" + l;
                            case 2:
                                return s > 4 && u++, u >= 4 ? (months = Math.floor(u / 4), months >= 12 ? (years = Math.floor(months / 12), years + " year" + (1 != years ? "s" : "") + l) : months + " month" + (1 != months ? "s" : "") + l) : u + " week" + (1 != u ? "s" : "") + l;
                            case 3:
                            default:
                                return u + " wks " + s + " days" + l
                        }
                        return ""
                    }
                }
            };
            return e
        }();
        !function (e, r) {
            "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? t.exports = r() : e.web = r()
        }(this, function () {
            return r
        }), window.web = r
    }, {}]
}, {}, []);