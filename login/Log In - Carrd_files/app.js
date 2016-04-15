require = function t(i, e, a) {
    function s(n, r) {
        if (!e[n]) {
            if (!i[n]) {
                var h = "function" == typeof require && require;
                if (!r && h)return h(n, !0);
                if (o)return o(n, !0);
                var c = new Error("Cannot find module '" + n + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var p = e[n] = {exports: {}};
            i[n][0].call(p.exports, function (t) {
                var e = i[n][1][t];
                return s(e ? e : t)
            }, p, p.exports, t, i, e, a)
        }
        return e[n].exports
    }

    for (var o = "function" == typeof require && require, n = 0; n < a.length; n++)s(a[n]);
    return s
}({
    1: [function (t, i, e) {
        window.app = function () {
            window.skel = t("skel"), window.$ = window.jQuery = t("jquery"), window.md5 = t("md5"), t("jquery.touch"), t("web");
            var i = (t("form"), t("tabs"), {
                touch: {dragStartEvents: "tapAndHold dragStart"},
                registry: {
                    get: function (t) {
                        return localStorage.getItem(t)
                    }, set: function (t, i) {
                        return localStorage.setItem(t, i)
                    }, unset: function (t) {
                        return localStorage.removeItem(t)
                    }
                },
                dialog: {
                    $wrapper: null, $title: null, $message: null, $actions: null, init: function () {
                        var t = this;
                        skel.vars.mobile && (i.touch.dragStartEvents = "tapAndHold"), this.$wrapper = $('<div id="dialog" class="modal" tabindex="-1"><section class="content"><h2 class="title"></h2><p class="message"></p><ul class="actions"></ul><span class="close do-close"></span></section></div>').on("mousedown", function (i) {
                            i.preventDefault(), i.stopPropagation(), t.inPreshow() || t.hide()
                        }).on("click mousedown", ".content", function (t) {
                            t.stopPropagation()
                        }).on("click", ".do-close", function (i) {
                            i.preventDefault(), i.stopPropagation(), t.hide()
                        }).on("keydown", function (i) {
                            switch (i.keyCode) {
                                case 13:
                                    if (t.inPreshow())return;
                                    t.$actions.find("li > span").first().trigger("click");
                                    break;
                                case 27:
                                    if (t.inPreshow())return;
                                    t.hide()
                            }
                        }), this.$title = this.$wrapper.find(".title"), this.$message = this.$wrapper.find(".message"), this.$actions = this.$wrapper.find(".actions")
                    }, show: function (t) {
                        var e, a = this, s = 0;
                        this.$wrapper.appendTo(i.$body);
                        var e = $.extend({
                            title: "Alert",
                            message: "Something happened apparently.",
                            actions: {
                                Okay: function () {
                                    this.hide()
                                }
                            }
                        }, t);
                        null === e.title ? this.$title.hide() : this.$title.show().html(e.title), this.$message.html(e.message), s = 0, $.each(e.actions, function (t, i) {
                            $('<li><span class="button' + (0 == s++ ? " special" : "") + '">' + t + "</span></li>").appendTo(a.$actions).on("click", ".button", function (t) {
                                t.preventDefault(), t.stopPropagation(), i.apply(a)
                            })
                        }), this.$wrapper.removeClass("preshow"), window.setTimeout(function () {
                            a.$wrapper.addClass("visible")
                        }, 100), window.setTimeout(function () {
                            a.$wrapper.focus()
                        }, 250)
                    }, hide: function () {
                        var t = this;
                        this.$wrapper.removeClass("visible"), window.setTimeout(function () {
                            t.$title.text(""), t.$message.text(""), t.$actions.children().remove()
                        }, 500)
                    }, preshow: function () {
                        var t = this;
                        this.$wrapper.appendTo(i.$body), this.$wrapper.addClass("preshow"), window.setTimeout(function () {
                            t.$wrapper.addClass("visible")
                        }, 100), window.setTimeout(function () {
                            t.$wrapper.focus()
                        }, 250)
                    }, inPreshow: function () {
                        return this.$wrapper.hasClass("preshow")
                    }
                },
                $window: null,
                $head: null,
                $body: null,
                URL_PLACEHOLDER: "http://domain.tld/path",
                toDataURL: function (t, i) {
                    var e;
                    e = new XMLHttpRequest, e.open("GET", t, !0), e.responseType = "blob", e.onload = function (t) {
                        var e;
                        e = new FileReader, e.onloadend = function () {
                            i(e.result)
                        }, e.readAsDataURL(this.response)
                    }, e.send()
                },
                markdownify: function (t) {
                    var i = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
                    return t = t.replace(/[&<>"']/g, function (t) {
                        return i[t]
                    }), t = t.replace(/\[(.+?)\]\(([^\[\]]+?)\)/g, '<span class="--a" data-href="$2">$1</span>'), t = t.replace(/\*\*([^\*]+?)\*\*/g, '<span class="--strong">$1</span>'), t = t.replace(/__([^_]+?)__/g, '<span class="--strong">$1</span>'), t = t.replace(/\*([^\*]+?)\*/g, '<span class="--em">$1</span>'), t = t.replace(/_([^_]+?)_/g, '<span class="--em">$1</span>')
                },
                hasMarkdown: function (t, i) {
                    switch (t) {
                        case"link":
                            return !!i.match(/\[(.+?)\]\(([^\[\]]+?)\)/g);
                        case"strong":
                            return !!i.match(/\*\*([^\*]+?)\*\*/g) || !!i.match(/__([^_]+?)__/g);
                        case"emphasis":
                            return !!i.match(/\*([^\*]+?)\*/g) || !!i.match(/_([^_]+?)_/g)
                    }
                    return !1
                },
                cleanHref: function () {
                    var t = window.location.href;
                    return -1 !== t.indexOf("?") && (t = t.split("?")[0]), t
                },
                cleanBaseHref: function () {
                    return window.location.protocol + "//" + window.location.hostname
                },
                init: function (t, e) {
                    $(function () {
                        i.$window = $(window), i.$head = $("head"), i.$body = $("body"), skel.breakpoints({
                            xlarge: "(max-width: 1680px)",
                            large: "(max-width: 1280px)",
                            medium: "(max-width: 980px)",
                            small: "(max-width: 736px)",
                            xsmall: "(max-width: 480px)",
                            xxsmall: "(max-width: 360px)",
                            "short": "(max-height: 768px)"
                        }), $.event.special.destroyed = {
                            remove: function (t) {
                                t.handler && t.handler()
                            }
                        }, skel.vars.touch && i.$body.addClass("is-touch"), skel.vars.IEVersion < 12 && (i.$body.addClass("is-ie"), skel.vars.IEVersion < 11 && i.$body.addClass("is-ie10")), i.$window.on("load", function () {
                            window.setTimeout(function () {
                                i.$body.removeClass("is-loading")
                            }, 100)
                        }), "admin" != i.$body.attr("id") && $("form").form(), i.dialog.init(), i.$body.on("click", "a.behavior-long-wait", function (t) {
                            var e = $(this), a = e.attr("href");
                            t.preventDefault(), t.stopPropagation(), i.dialog.preshow(), window.setTimeout(function () {
                                window.location.href = a
                            }, 750)
                        }), i.$body.on("click", "a.behavior-requires-confirmation", function (t) {
                            var e = $(this), a = e.attr("href"), s = e.text(), o = {};
                            t.preventDefault(), t.stopPropagation(), o[s] = function () {
                                window.location.href = a
                            }, o.Cancel = function () {
                                this.hide()
                            }, i.dialog.show({title: "Are you sure?", message: null, actions: o})
                        })
                    })
                }
            });
            return i
        }(), app.init()
    }, {
        form: "form",
        jquery: "jquery",
        "jquery.touch": "jquery.touch",
        md5: "md5",
        skel: "skel",
        tabs: "tabs",
        web: "web"
    }],
    2: [function (t, i, e) {
        function a(t) {
            var i, e, a, s, o, n, r, h, c, p = this;
            this.alpha = "1" == t.data("alpha") ? !0 : !1, t.removeData("alpha").removeAttr("data-alpha"), this.optional = "1" == t.data("optional") ? !0 : !1, this.optional && t.attr("placeholder", "(none)"), t.attr("type", "text").attr("data-manual", "1").data("manual", "1").attr("autocomplete", "off").attr("autocorrect", "off").attr("autocapitalize", "off").attr("spellcheck", "false").attr("maxlength", this.alpha ? 9 : 7).on("focus", function () {
                i.addClass("focus")
            }).on("blur", function () {
                i.removeClass("focus")
            }), n = {
                $input: null, $swatch: null, currentValue: "#FFFFFF", init: function (t) {
                    var i = this;
                    this.$input = t, p.optional && (this.currentValue = ""), this.$swatch = $('<div class="swatch" />').insertBefore(this.$input), this.$input.on("change input", function (t, e) {
                        if (!e) {
                            var a, s, l = i.$input.val();
                            if ("" == l && p.optional)o = !0, h.pos = 0, r.pos[0] = 100, r.pos[1] = 0, p.alpha && (c.pos = 100); else {
                                if (o = !1, a = p.hexaToRgba(l), !a)return;
                                n.currentValue = l.toUpperCase(), s = p.rgbaToHsva(a.r, a.g, a.b, a.a), h.pos = 100 * s.h, r.pos[0] = 100 * s.s, r.pos[1] = 100 * (1 - s.v), c.pos = p.alpha ? 100 * s.a : 0
                            }
                            p.alpha && c.sync(), h.sync(), r.sync(), i.sync()
                        }
                    }).on("blur", function () {
                        i.$input.val(n.currentValue)
                    })
                }, sync: function () {
                    if (o)return i.addClass("empty"), this.$swatch.css("background-color", ""), n.currentValue = "", this.$input.val("").trigger("change", !0), void r.redraw();
                    i.removeClass("empty"), h.changed() && r.redraw();
                    var t = {h: null, s: null, v: null, a: null};
                    t.h = h.pos / 100, t.s = r.pos[0] / 100, t.v = 1 - r.pos[1] / 100, t.a = p.alpha ? c.pos / 100 : 1;
                    var e = p.hsvaToRgba(t.h, t.s, t.v, t.a), a = p.rgbaToHexa(e.r, e.g, e.b, e.a), s = "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a / 255 + ")";
                    this.$swatch.css("background-color", s), n.currentValue = a, this.$input.val() != a && this.$input.val(a).trigger("change", !0)
                }
            }, i = $('<div class="form-color ' + (t.attr("class") ? t.attr("class") : "") + '"><div class="swatch"></div><div class="content"><div class="inner"><div class="hueSlider"><div class="cursor"></div><canvas></canvas></div><div class="picker"><div class="cursor"></div><canvas></canvas></div>' + function () {
                    return p.alpha ? '<div class="alphaSlider"><div class="cursor"></div><canvas></canvas></div>' : ""
                }() + "</div></div></div>").insertAfter(t), t.prependTo(i), i.find(".content").on("mousedown touchstart", function (t) {
                t.preventDefault(), t.stopPropagation()
            }), e = i.find(".picker"), r = {
                $cursor: null,
                $wrapper: null,
                $canvas: null,
                canvas: null,
                context: null,
                imageData: null,
                pos: [0, 0],
                sync: function () {
                    this.$cursor.css("left", this.pos[0] + "%").css("top", this.pos[1] + "%")
                },
                init: function (t) {
                    var i = this;
                    this.$wrapper = t, this.$canvas = this.$wrapper.find("canvas").css("position", "absolute").css("top", 0).css("left", 0).css("width", "100%").css("height", "100%").css("cursor", "crosshair"), this.canvas = this.$canvas[0], this.canvas.width = 100, this.canvas.height = 100, this.context = this.canvas.getContext("2d"), this.imageData = this.context.getImageData(0, 0, 100, 100), this.$cursor = this.$wrapper.find(".cursor"), this.$canvas.enableTouch({
                        trackDocument: !0,
                        trackDocumentNormalize: !0,
                        dragThreshold: 0,
                        dragDelay: 0,
                        preventDefault: {drag: !0}
                    }).on("tap dragStart drag", function (t, e) {
                        i.pos[0] = Math.round(e.ex / i.$canvas.width() * 100), i.pos[1] = Math.round(e.ey / i.$canvas.height() * 100), o = !1, i.sync(), n.sync()
                    }), this.redraw()
                },
                redraw: function () {
                    var t, i, e, a, s, o;
                    for (t = 0; 100 > t; t++)for (i = 0; 100 > i; i++)e = i, a = 99 - t, o = p.hsvaToRgba(h.pos / 100, i / 100, t / 100, 1), s = 4 * (e + 100 * a), this.imageData.data[s + 0] = o.r, this.imageData.data[s + 1] = o.g, this.imageData.data[s + 2] = o.b, this.imageData.data[s + 3] = 255;
                    this.context.putImageData(this.imageData, 0, 0), this.sync()
                }
            }, a = i.find(".hueSlider"), h = {
                $cursor: null,
                $wrapper: null,
                $canvas: null,
                canvas: null,
                context: null,
                imageData: null,
                pos: 0,
                lastPos: 0,
                changed: function () {
                    return this.pos != this.lastPos
                },
                sync: function () {
                    this.$cursor.css("top", this.pos + "%")
                },
                init: function (t) {
                    var i = this;
                    this.$wrapper = t, this.$canvas = this.$wrapper.find("canvas").css("position", "absolute").css("top", 0).css("left", 0).css("width", "100%").css("height", "100%").css("cursor", "crosshair").appendTo(this.$wrapper), this.canvas = this.$canvas[0], this.canvas.width = 1, this.canvas.height = 100, this.context = this.canvas.getContext("2d"), this.imageData = this.context.getImageData(0, 0, 1, 100), this.$cursor = this.$wrapper.find(".cursor"), this.$canvas.enableTouch({
                        trackDocument: !0,
                        trackDocumentNormalize: !0,
                        dragThreshold: 0,
                        dragDelay: 0,
                        preventDefault: {drag: !0}
                    }).on("tap dragStart drag", function (t, e) {
                        i.lastPos = i.pos, i.pos = Math.round(e.ey / i.$canvas.height() * 100), o = !1, i.sync(), n.sync()
                    }), this.redraw()
                },
                redraw: function () {
                    var t, i, e, a, s;
                    for (t = 0; 100 > t; t++)for (s = p.hsvaToRgba(t / 100, 1, 1, 1), e = t, i = 0; 1 > i; i++)a = 4 * (i + 1 * e), this.imageData.data[a + 0] = s.r, this.imageData.data[a + 1] = s.g, this.imageData.data[a + 2] = s.b, this.imageData.data[a + 3] = s.a;
                    this.context.putImageData(this.imageData, 0, 0), this.sync(), this.lastPos = this.pos
                }
            }, s = i.find(".alphaSlider"), c = {
                $cursor: null,
                $wrapper: null,
                $canvas: null,
                canvas: null,
                context: null,
                imageData: null,
                pos: 0,
                lastPos: 0,
                changed: function () {
                    return this.pos != this.lastPos
                },
                sync: function () {
                    this.$cursor.css("left", this.pos + "%")
                },
                init: function (t) {
                    var i = this;
                    this.$wrapper = t, this.$canvas = this.$wrapper.find("canvas").css("position", "absolute").css("top", 0).css("left", 0).css("width", "100%").css("height", "100%").css("cursor", "crosshair").appendTo(this.$wrapper), this.canvas = this.$canvas[0], this.canvas.width = 100, this.canvas.height = 1, this.context = this.canvas.getContext("2d"), this.imageData = this.context.getImageData(0, 0, 100, 1), this.$cursor = this.$wrapper.find(".cursor"), this.$canvas.enableTouch({
                        trackDocument: !0,
                        trackDocumentNormalize: !0,
                        dragThreshold: 0,
                        dragDelay: 0,
                        preventDefault: {drag: !0}
                    }).on("tap dragStart drag", function (t, e) {
                        i.lastPos = i.pos, i.pos = Math.round(e.ex / i.$canvas.width() * 100), o = !1, i.sync(), n.sync()
                    }), this.redraw()
                },
                redraw: function () {
                    var t, i, e, a;
                    for (t = 0; 100 > t; t++)for (e = t, i = 0; 1 > i; i++)a = 4 * (i + 1 * e), this.imageData.data[a + 0] = 255, this.imageData.data[a + 1] = 255, this.imageData.data[a + 2] = 255, this.imageData.data[a + 3] = e / 100 * 255;
                    this.context.putImageData(this.imageData, 0, 0), this.sync(), this.lastPos = this.pos
                }
            }, n.init(t), r.init(e), h.init(a), this.alpha && c.init(s), t.triggerHandler("change")
        }

        a.prototype.rgbaToHsva = function (t, i, e, a) {
            var s, o = Math.max(t, i, e), n = Math.min(t, i, e), r = o - n, h = 0 === o ? 0 : r / o, c = o / 255, a = a / 255;
            switch (o) {
                case n:
                    s = 0;
                    break;
                case t:
                    s = i - e + r * (e > i ? 6 : 0), s /= 6 * r;
                    break;
                case i:
                    s = e - t + 2 * r, s /= 6 * r;
                    break;
                case e:
                    s = t - i + 4 * r, s /= 6 * r
            }
            return {h: s, s: h, v: c, a: a}
        }, a.prototype.hexaToRgba = function (t) {
            var i, e, a, s = 255;
            if ("#" != t.charAt(0))return null;
            if (t = t.substr(1), 6 == t.length) {
                if (i = parseInt(t.substr(0, 2), 16), e = parseInt(t.substr(2, 2), 16), a = parseInt(t.substr(4, 2), 16), isNaN(i) || isNaN(e) || isNaN(a))return null
            } else {
                if (8 != t.length || !this.alpha)return null;
                if (i = parseInt(t.substr(0, 2), 16), e = parseInt(t.substr(2, 2), 16), a = parseInt(t.substr(4, 2), 16), s = parseInt(t.substr(6, 2), 16), isNaN(i) || isNaN(e) || isNaN(a) || isNaN(s))return null
            }
            return {r: i, g: e, b: a, a: s}
        }, a.prototype.rgbaToHexa = function (t, i, e, a) {
            var s, o, n, r;
            return s = t.toString(16), o = i.toString(16), n = e.toString(16), r = a.toString(16), 1 == s.length && (s = "0" + s), 1 == o.length && (o = "0" + o), 1 == n.length && (n = "0" + n), 1 == r.length && (r = "0" + r), this.alpha && "ff" != r || (r = ""), "#" + (s + o + n + r).toUpperCase()
        }, a.prototype.hsvaToRgba = function (t, i, e, a) {
            var s, o, n, r, h, c, p, l;
            switch (r = Math.floor(6 * t), h = 6 * t - r, c = e * (1 - i), p = e * (1 - h * i), l = e * (1 - (1 - h) * i), r % 6) {
                case 0:
                    s = e, o = l, n = c;
                    break;
                case 1:
                    s = p, o = e, n = c;
                    break;
                case 2:
                    s = c, o = e, n = l;
                    break;
                case 3:
                    s = c, o = p, n = e;
                    break;
                case 4:
                    s = l, o = c, n = e;
                    break;
                case 5:
                    s = e, o = c, n = p
            }
            return {r: Math.round(255 * s), g: Math.round(255 * o), b: Math.round(255 * n), a: Math.round(255 * a)}
        }, $.fn.formColor = function () {
            var t = $(this);
            if (0 == this.length)return t;
            if (this.length > 1) {
                for (var i = 0; i < this.length; i++)$(this[i]).formColor();
                return t
            }
            return this[0]._formColor = new a(t), t
        }, "undefined" != typeof i && (i.exports = a)
    }, {}],
    formGroup: [function (t, i, e) {
        function a(t) {
            var i, e = this;
            this.count = 1e3, this.states = [], this.isDragging = !1, this.id = t.attr("id"), t.removeAttr("id"), this.name = t.attr("name"), t.removeAttr("name"), this.title = t.data("title"), t.removeData("title").removeAttr("data-title"), i = t.data("value"), t.removeData("value").removeAttr("data-value"), this.min = t.data("min"), t.removeData("min").removeAttr("data-min"), this.max = t.data("max"), t.removeData("max").removeAttr("data-max"), this.collapse = "1" == t.data("collapse") ? !0 : !1, t.removeData("collapse").removeAttr("collapse"), this.collapseSingular = "1" == t.data("collapse-singular") ? !0 : !1, t.removeData("collapse-singular").removeAttr("collapse-singular"), t.data("clone-fields") ? (this.cloneFields = t.data("clone-fields").split(","), t.removeData("clone-fields").removeAttr("clone-fields")) : this.cloneFields = null, this.$template = $('<div class="item"><div class="header"><span class="title"></span><div class="do-delete"></div></div><div class="inner"></div></div>'), t.children().appendTo(this.$template.children(".inner")), this.$placeholder = $('<div class="placeholder" />'), this.$wrapper = t, this.$wrapper.attr("id", this.id).attr("name", this.name).on("blur", "input, select, textarea", function (t) {
                e.$wrapper.trigger("blur")
            }).on("change.title", '[name^="' + this.title + '_"]', function () {
                var t = $(this), i = t.parents(".item"), e = t.val();
                e ? "SELECT" == this.tagName && (e = t.find('option[value="' + e + '"]').text()) : e = "(untitled)", i.find(".header .title").text(e)
            }).on("click", ".item .footer .do-delete", function () {
                var t = $(this), i = t.parents(".item");
                e.remove(e.itemIndex(i))
            }), this.$items = $('<div class="items"><div class="divider" /></div>').appendTo(this.$wrapper), this.$footer = $('<div class="footer"><ul class="actions fit"><li><span class="button fit do-add">Add</span></li></ul></div>').appendTo(this.$wrapper), this.$footer.on("click", ".do-add", function (t) {
                t.preventDefault(), e.add()
            }).on("click", ".do-dump", function (t) {
                t.stopPropagation(), t.preventDefault(), alert(JSON.stringify(e.val(), null, 2))
            }), this.sync(), i && this.val(JSON.parse(i))
        }

        a.prototype.itemIndex = function (t) {
            return this.$wrapper.find(".item").index(t)
        }, a.prototype.dividerIndex = function (t) {
            return this.$wrapper.find(".divider").index(t)
        }, a.prototype.get = function (t) {
            return this.$item.eq(t)
        }, a.prototype.length = function () {
            return this.$items.children(".item").length
        }, a.prototype.toggle = function (t) {
            this.states[t] === !0 ? (this.get(t).removeClass("collapsed"), this.states[t] = !1, this.collapseSingular && this.collapseAll(t)) : (this.get(t).addClass("collapsed"), this.states[t] = !0)
        }, a.prototype.collapseAll = function (t) {
            var i = 0, e = this.length();
            for (i = 0; e > i; i++)("undefined" == typeof t || i != t) && (this.get(i).addClass("collapsed"), this.states[i] = !0)
        }, a.prototype.move = function (t, i) {
            if (!(t == i || 0 > i || i >= this.length())) {
                var e = this.get(t), a = e.next(".divider"), s = this.get(i);
                i > t ? (e.insertAfter(s), a.insertBefore(e)) : (e.insertBefore(s), a.insertAfter(e));
                var o = this.states[i];
                this.states[i] = this.states[t], this.states[t] = o, this.sync(), this.change()
            }
        }, a.prototype.moveUp = function (t) {
            this.move(t, t - 1)
        }, a.prototype.moveDown = function (t) {
            this.move(t, t + 1)
        }, a.prototype.remove = function (t) {
            this.removeBase(t), this.sync(), this.change()
        }, a.prototype.removeBase = function (t) {
            if (!(this.length() <= this.min)) {
                var i = this.get(t);
                i.next(".divider").remove(), i.remove(), this.states.splice(t, 1)
            }
        }, a.prototype.add = function () {
            var t;
            this.collapseSingular && this.collapseAll(), t = this.addBase(), t && (t.find('input[type="hexcolor"]').formColor(), this.sync(), this.change())
        }, a.prototype.addBase = function () {
            var t = this, i = this.$template.clone(!0), e = this.count++;
            if (!(this.max > 0 && this.length() >= this.max)) {
                if (i.data("id", e), i.find("input, textarea, select").each(function () {
                        var t = $(this), a = t.attr("id"), s = t.attr("name"), o = i.find('label[for="' + a + '"]');
                        t.attr("id", a + "_" + e).attr("name", s + "_" + e), o.length > 0 && o.attr("for", a + "_" + e)
                    }), this.cloneFields && this.length() > 0) {
                    var a, s, o, n, r;
                    a = this.$item.last();
                    for (r in this.cloneFields)n = this.cloneFields[r], s = a.find('[name^="' + n + '_"]').first(), o = i.find('[name^="' + n + '_"]').first(), o.val(s.val())
                }
                i.find(".do-delete").enableTouch().on("tap", function (e) {
                    e.preventDefault(), e.stopPropagation(), t.remove(t.itemIndex(i))
                }), i.find(".header").enableTouch({
                    dragThreshold: 0,
                    dragDelay: 0,
                    tapAndHoldDelay: 300,
                    trackDocument: !0
                }).on("click", function (t) {
                    t.preventDefault(), t.stopPropagation()
                }).on("tap", function (e) {
                    t.toggle(t.itemIndex(i)), i.trigger("click")
                }).on(app.touch.dragStartEvents, function (e, a) {
                    t.isDragging || (a.y -= t.scrollTop(), t.isDragging = !0, t.$wrapper.addClass("is-dragging"), i._ex = a.ex, i._ey = a.ey, i.addClass("is-dragging").css("left", a.x - a.ex + "px").css("top", a.y - a.ey + "px").css("width", i.parent().outerWidth() + "px"), t.$placeholder.insertAfter(i).css("width", i.parent().outerWidth() + "px").css("height", i.outerHeight() + "px"), t.$wrapper.find(".divider").removeClass("active"))
                }).on("drag", function (e, a) {
                    var s, o, n;
                    t.isDragging && (a.y -= t.scrollTop(), i.css("left", a.x - i._ex + "px").css("top", a.y - i._ey + "px"), s = t.$wrapper.find(".divider"), o = null, n = i.outerHeight(), s.each(function () {
                        var t = $(this), i = t[0].getBoundingClientRect();
                        return a.x >= i.left && a.x <= i.right && a.y >= i.top - 20 && a.y <= i.bottom + 20 ? (o = t, !1) : void 0
                    }), o ? (o.addClass("active"), s.not(o).removeClass("active")) : s.removeClass("active"))
                }).on("dragEnd mouseup touchend", function (e, a) {
                    var s, o, n;
                    t.isDragging && (t.isDragging = !1, t.$wrapper.removeClass("is-dragging"), delete i._ex, delete i._ey, i.removeClass("is-dragging").css("left", "").css("top", "").css("width", ""), t.$placeholder.detach(), s = t.$wrapper.find(".divider.active"), s.length > 0 && (o = t.itemIndex(i), n = t.dividerIndex(s), n > o && n--, t.move(o, n)), t.$wrapper.find(".divider").removeClass("active"))
                }), i.appendTo(this.$items);
                {
                    $('<div class="divider" />').insertAfter(i)
                }
                return i
            }
        }, a.prototype.val = function (t) {
            if (t) {
                var i, e, a, s, o, n = Math.max(t.length, this.min), r = this.length();
                if (0 == n)this.$item.remove(); else if (n > r) {
                    for (i = r; n > i; i++)this.addBase();
                    this.$item = this.$items.children(".item")
                } else if (r > n) {
                    for (i = r; i > n; i--)this.removeBase(i - 1);
                    this.$item = this.$items.children(".item")
                }
                if (n > 0) {
                    this.$items.find("input, textarea, select").val("");
                    for (i in t) {
                        o = this.get(i), s = o.data("id");
                        for (e in t[i])if ("object" == typeof t[i][e])for (a in t[i][e])o.find('[name="' + e + "." + a + "_" + s + '"]').val(t[i][e][a]); else o.find('[name="' + e + "_" + s + '"]').val(t[i][e]).trigger("change");
                        i in this.states ? this.states[i] === !1 ? o.removeClass("collapsed") : o.addClass("collapsed") : this.collapse ? o.addClass("collapsed") : o.removeClass("collapsed")
                    }
                }
                return this.sync(), this.$wrapper
            }
            var h = [];
            return this.$item.each(function () {
                var t = $(this), i = {};
                t.find("input, textarea, select").each(function () {
                    var t = $(this), e = t.attr("name").replace(/_[0-9]+$/, "").split("."), a = t.val();
                    2 == e.length ? (e[0] in i || (i[e[0]] = {}), i[e[0]][e[1]] = a) : i[e[0]] = a
                }), h.push(i)
            }), h
        }, a.prototype.change = function () {
            this.$wrapper.trigger("change")
        }, a.prototype.sync = function () {
            var t = this;
            this.$item = this.$items.children(".item"), 0 == this.length() ? this.$wrapper.addClass("empty") : (this.$wrapper.removeClass("empty"), this.$items.find('[name^="' + this.title + '_"]').trigger("change.title")), this.states = [], this.$item.each(function () {
                t.states.push($(this).hasClass("collapsed"))
            })
        }, a.prototype.scrollTop = function () {
            return $(window).scrollTop()
        }, $.fn.formGroup = function () {
            var t = $(this);
            if (0 == this.length)return t;
            if (this.length > 1) {
                for (var i = 0; i < this.length; i++)$(this[i]).formGroup();
                return t
            }
            return this[0]._formGroup = new a(t), t
        }, function () {
            var t = this.val = $.fn.val;
            $.fn.val = function (i) {
                return "_formGroup" in this ? this._formGroup.val(i) : this.length > 0 && "_formGroup" in this[0] ? this[0]._formGroup.val(i) : "undefined" == typeof i ? t.call(this) : t.call(this, i)
            }
        }(), i.exports = a
    }, {}],
    formImageCropper: [function (t, i, e) {
        function a(t) {
            var i, e = this;
            this.inputPrefix = "", this.image = {
                canvas: null,
                width: 0,
                height: 0,
                type: null,
                size: 0,
                orientation: null,
                animated: !1,
                cropAllowed: !1
            }, this.canvasWrapper = {width: 0, height: 0, zoom: 1}, this.crop = {
                controlSize: 60,
                initialMargin: 40,
                square: !1,
                minWidth: 150,
                minHeight: 150,
                topLeft: {x: null, y: null},
                bottomRight: {x: null, y: null},
                width: function () {
                    return this.bottomRight.x - this.topLeft.x
                },
                height: function () {
                    return this.bottomRight.y - this.topLeft.y
                }
            }, this.settings = {
                crop: !0,
                maxWH: 1024,
                maxSize: 2048,
                forceCanvas: !1,
                forceType: !1,
                forceSquare: !1,
                minWidth: 150,
                minHeight: 150
            }, this.$window = $(window).on("resize", function () {
                e.modalVisible() && e.rescale()
            }), this.$obj = t.addClass("form-image").on("destroyed", function () {
                e.$modal.remove()
            }), "undefined" != typeof(i = this.$obj.attr("data-crop")) && (this.settings.crop = "1" == i ? !0 : !1), "undefined" != typeof(i = this.$obj.attr("data-maxWH")) && (this.settings.maxWH = parseInt(i)), "undefined" != typeof(i = this.$obj.attr("data-maxSize")) && (this.settings.maxSize = parseInt(i)), "undefined" != typeof(i = this.$obj.attr("data-forceCanvas")) && (this.settings.forceCanvas = "1" == i ? !0 : !1), "undefined" != typeof(i = this.$obj.attr("data-forceType")) && (this.settings.forceType = i), "undefined" != typeof(i = this.$obj.attr("data-forceSquare")) && (this.settings.forceSquare = "1" == i ? !0 : !1), "undefined" != typeof(i = this.$obj.attr("data-minWidth")) && (this.crop.minWidth = this.settings.minWidth = parseInt(i)), "undefined" != typeof(i = this.$obj.attr("data-minHeight")) && (this.crop.minHeight = this.settings.minHeight = parseInt(i)), this.$input = this.$obj.find("input").css("position", "absolute").css("width", "0px").css("height", "0px").css("visibility", "hidden").css("z-index", "-1").css("overflow", "hidden").css("-moz-pointer-events", "none").css("-webkit-pointer-events", "none").css("-ms-pointer-events", "none").css("pointer-events", "none").on("refresh", function () {
                i = e.$input.val(), i ? (e.$thumbnail.css("background-image", "url(" + i + ")"), e.$obj.removeClass("new")) : e.$obj.addClass("new")
            }), this.$thumbnail = $('<div class="thumbnail"></div>').appendTo(this.$obj).css("background-size", "cover").css("background-position", "center").on("click", function (t) {
                t.preventDefault(), t.stopPropagation(), e.$input.prop("disabled") || e.$fileInput.trigger("click")
            }), this.$obj.on("click", ".do-upload", function (t) {
                t.preventDefault(), t.stopPropagation(), e.$input.prop("disabled") || e.$fileInput.trigger("click")
            }), this.$obj.on("click", ".do-clear", function (t) {
                t.preventDefault(), t.stopPropagation(), e.$input.prop("disabled") || (url = e.$image.attr("src"), url && url.match(/^blob:/) && url != e.$input.val() && e.revokeObjectURL(url), e.$image.attr("src", ""), e.$thumbnail.css("background-image", ""), e.$input.val("").removeData("image-data-url").trigger("change"), e.$obj.addClass("new"))
            }), this.$modal = $('<div class="modal form-image-modal" tabindex="-1"><div class="content"><div class="wrapper"><div class="canvas-wrapper"><canvas /><div class="crop"><div class="controls" data-control="move"><div class="control top-left" data-control="topLeft"></div><div class="control top-right" data-control="topRight"></div><div class="control bottom-right" data-control="bottomRight"></div><div class="control bottom-left" data-control="bottomLeft"></div></div></div></div></div><ul class="options"><li><span class="square' + (this.settings.forceSquare ? " active disabled" : "") + '"><span class="label">Square</span></span></li><li><span class="expand"><span class="label">Expand</span></span></li></ul><ul class="actions"><li><a href="#" class="button special do-save"><span class="label">Accept</span></a></li><li><a href="#" class="button do-cancel"><span class="label">Cancel</span></a></li></ul></div></div>').appendTo($("body")).css("-moz-user-select", "none").css("-webkit-user-select", "none").css("-ms-user-select", "none").css("user-select", "none").on("mousedown", function (t) {
                t.preventDefault(), t.stopPropagation(), e.hideModal()
            }).on("keydown", function (t) {
                switch (t.keyCode) {
                    case 13:
                        t.preventDefault(), t.stopPropagation(), e.hideModal(!0);
                        break;
                    case 27:
                        t.preventDefault(), t.stopPropagation(), e.hideModal()
                }
            }), this.$modalContent = this.$modal.children(".content").on("click mousedown", function (t) {
                t.stopPropagation()
            }).on("click", ".do-save", function (t) {
                t.preventDefault(), t.stopPropagation(), e.hideModal(!0)
            }).on("click", ".do-cancel", function (t) {
                t.preventDefault(), t.stopPropagation(), e.hideModal()
            }), this.$canvas = this.$modalContent.find("canvas").css("position", "absolute").css("top", 0).css("left", 0), this.image.canvas = this.$canvas[0], this.$canvasWrapper = this.$modalContent.find(".canvas-wrapper").css("position", "relative").css("overflow", "hidden").css("max-width", "100%"), this.$image = $("<img />").on("load", function () {
                e.completeLoad()
            }), this.$crop = this.$modalContent.find(".crop").css("position", "absolute").css("z-index", 1).css("left", 0).css("top", 0), this.$cropControls = this.$modalContent.find(".controls").css("position", "absolute").css("top", 0).css("left", 0).css("width", "100%").css("height", "100%"), i = -0.5 * this.crop.controlSize, this.$cropControls.find(".control").css("position", "absolute").css("width", this.crop.controlSize + "px").css("height", this.crop.controlSize + "px"), this.$cropControls.find(".top-left").css("top", i).css("left", i), this.$cropControls.find(".top-right").css("top", i).css("right", i), this.$cropControls.find(".bottom-right").css("bottom", i).css("right", i), this.$cropControls.find(".bottom-left").css("bottom", i).css("left", i), this.$fileInput = $('<input type="file" name="image" autocomplete="off" />').on("change", function () {
                e.load(e.$fileInput.prop("files")[0]), e.$fileInput.val("")
            }), this.$squareOption = this.$modalContent.find(".options .square").on("click", function () {
                var t = $(this);
                e.settings.forceSquare || (t.hasClass("active") ? (e.crop.square = !1, t.removeClass("active")) : (e.crop.square = !0, e.squarifyCrop(), t.addClass("active")), e.redrawCrop())
            }), this.$expandOption = this.$modalContent.find(".options .expand").on("click", function () {
                e.expandCrop(), e.redrawCrop()
            }), this.$canvasWrapper.enableTouch({
                trackDocument: !0,
                trackDocumentNormalize: !0,
                dragThreshold: 0,
                dragDelay: 0,
                tapAndHoldDelay: 300,
                preventDefault: {drag: !0}
            }).on("dragStart tapAndHold", function (t, i) {
                var a = "scrollY" in window ? window.scrollY : window.pageYOffset, s = $(document.elementFromPoint(i.x, i.y - a)), o = s.data("control");
                e.$crop.addClass("active"), o && (this._control = "cropControl_" + o, this._x = i.x, this._y = i.y)
            }).on("dragEnd", function (t, i) {
                "_control" in this && (delete this._x, delete this._y, delete this._control, e.$crop.removeClass("active"))
            }).on("drag", function (t, i) {
                if ("_control" in this) {
                    var a = i.x - this._x, s = i.y - this._y;
                    e[this._control](a, s), e.redrawCrop(), this._x = i.x, this._y = i.y
                }
            }), this.$input.triggerHandler("refresh")
        }

        a.prototype.createObjectURL = function (t) {
            var i;
            return i = "undefined" != typeof window.webkitURL ? window.webkitURL.createObjectURL(t) : "undefined" != typeof window.URL ? window.URL.createObjectURL(t) : null
        }, a.prototype.revokeObjectURL = function (t) {
            "undefined" != typeof window.webkitURL ? window.webkitURL.revokeObjectURL(t) : "undefined" != typeof window.URL && window.URL.revokeObjectURL(t)
        }, a.prototype.moveCrop = function (t, i) {
            (this.crop.topLeft.x + t < 0 || this.crop.bottomRight.x + t > this.image.width) && (t = 0), (this.crop.topLeft.y + i < 0 || this.crop.bottomRight.y + i > this.image.height) && (i = 0), this.crop.topLeft.x += t, this.crop.topLeft.y += i, this.crop.bottomRight.x += t, this.crop.bottomRight.y += i
        }, a.prototype.resizeCrop = function (t, i, e, a) {
            var s = this.crop.bottomRight.x - this.crop.topLeft.x, o = this.crop.bottomRight.y - this.crop.topLeft.y;
            if (t > 0 && s - t < this.crop.minWidth && (t = 0), 0 > e && s + e < this.crop.minWidth && (e = 0), i > 0 && o - i < this.crop.minHeight && (i = 0), 0 > a && o + a < this.crop.minHeight && (a = 0), this.crop.square) {
                if (0 > t && this.crop.topLeft.x + t < 0)return;
                if (e > 0 && this.crop.bottomRight.x + e > this.image.width)return;
                if (0 > i && this.crop.topLeft.y + i < 0)return;
                if (a > 0 && this.crop.bottomRight.y + a > this.image.height)return
            }
            this.crop.topLeft.x += t, this.crop.topLeft.y += i, this.crop.bottomRight.x += e, this.crop.bottomRight.y += a, this.crop.topLeft.x = Math.max(this.crop.topLeft.x, 0), this.crop.topLeft.y = Math.max(this.crop.topLeft.y, 0), this.crop.bottomRight.x = Math.min(this.crop.bottomRight.x, this.image.width), this.crop.bottomRight.y = Math.min(this.crop.bottomRight.y, this.image.height)
        }, a.prototype.squarifyCrop = function () {
            var t, i;
            t = Math.floor(this.crop.bottomRight.x - this.crop.topLeft.x), i = Math.floor(this.crop.bottomRight.y - this.crop.topLeft.y), t != i && (t > i ? (this.crop.topLeft.x = this.crop.topLeft.x + (t - i) / 2, this.crop.bottomRight.x = this.crop.topLeft.x + i) : (this.crop.topLeft.y = this.crop.topLeft.y + (i - t) / 2, this.crop.bottomRight.y = this.crop.topLeft.y + t))
        }, a.prototype.expandCrop = function () {
            this.crop.topLeft.x = 0, this.crop.topLeft.y = 0, this.crop.square ? this.image.height > this.image.width ? (this.crop.topLeft.y = (this.image.height - this.image.width) / 2, this.crop.bottomRight.x = this.image.width, this.crop.bottomRight.y = this.crop.topLeft.y + this.image.width) : (this.crop.topLeft.x = (this.image.width - this.image.height) / 2, this.crop.bottomRight.x = this.crop.topLeft.x + this.image.height, this.crop.bottomRight.y = this.image.height) : (this.crop.bottomRight.x = this.image.width, this.crop.bottomRight.y = this.image.height), this.crop.width() < this.crop.minWidth && (x = Math.ceil((this.crop.minWidth - this.crop.width()) / 2), this.crop.topLeft.x = Math.max(0, this.crop.topLeft.x - x), this.crop.bottomRight.x = Math.min(this.image.width, this.crop.bottomRight.x + x)), this.crop.height() < this.crop.minHeight && (x = Math.ceil((this.crop.minHeight - this.crop.height()) / 2), this.crop.topLeft.y = Math.max(0, this.crop.topLeft.y - x), this.crop.bottomRight.y = Math.min(this.image.height, this.crop.bottomRight.y + x))
        }, a.prototype.redrawCrop = function () {
            this.$crop.css("left", this.canvasWrapper.zoom * this.crop.topLeft.x).css("top", this.canvasWrapper.zoom * this.crop.topLeft.y).width(this.canvasWrapper.zoom * (this.crop.bottomRight.x - this.crop.topLeft.x)).height(this.canvasWrapper.zoom * (this.crop.bottomRight.y - this.crop.topLeft.y))
        }, a.prototype.sync = function (t) {
            var i, e, a;
            if ("undefined" == typeof t) {
                if (a = document.createElement("canvas"), i = a.getContext("2d"), a.width = this.crop.bottomRight.x - this.crop.topLeft.x, a.height = this.crop.bottomRight.y - this.crop.topLeft.y, i.drawImage(this.image.canvas, -1 * this.crop.topLeft.x, -1 * this.crop.topLeft.y), this.settings.forceType)e = this.settings.forceType; else switch (this.image.type) {
                    case"image/png":
                    case"image/gif":
                        e = "image/png";
                        break;
                    default:
                        e = "image/jpeg"
                }
                t = a.toDataURL(e, 75), delete a
            }
            i = this.image.canvas.getContext("2d"), i.clearRect(0, 0, this.image.canvas.width, this.image.canvas.height), this.$thumbnail.css("background-image", "url(" + t + ")"), this.$input.val("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==").data("image-data-url", t).trigger("change"), this.$obj.removeClass("new")
        }, a.prototype.showModal = function () {
            var t = this;
            this.$modal.addClass("visible"), window.setTimeout(function () {
                t.$modal.focus()
            }, 250)
        }, a.prototype.hideModal = function (t) {
            t && this.sync(), this.$modal.removeClass("visible")
        }, a.prototype.modalVisible = function () {
            return this.$modal.hasClass("visible") ? !0 : !1
        }, a.prototype.rescale = function () {
            var t = this.$window.width(), i = this.$window.height(), e = t - (this.$modalContent.outerWidth() - this.$modalContent.width()), a = i - (this.$modalContent.outerHeight() - this.$modalContent.height()), s = padHeight = t / 1440 * 100;
            480 > t ? s = 0 : 736 > t && (s = 20), 480 > i ? padHeight = 0 : 736 > i && (padHeight = 20), this.canvasWrapper.width = e - s, this.canvasWrapper.height = a - padHeight, this.image.width < this.canvasWrapper.width && this.image.height < this.canvasWrapper.height ? (this.canvasWrapper.zoom = 1,
                this.canvasWrapper.width = this.image.width, this.canvasWrapper.height = this.image.height) : (this.canvasWrapper.zoom = Math.min(this.canvasWrapper.height / this.image.height, this.canvasWrapper.width / this.image.width), this.canvasWrapper.width = this.canvasWrapper.zoom * this.image.width, this.canvasWrapper.height = this.canvasWrapper.zoom * this.image.height), this.$canvasWrapper.width(this.canvasWrapper.width).height(this.canvasWrapper.height), this.$canvas.width(this.canvasWrapper.zoom * this.image.width).height(this.canvasWrapper.zoom * this.image.height), this.redrawCrop()
        }, a.prototype.load = function (t) {
            var i = this;
            t && this.getImageProperties(t, function (e) {
                var a;
                switch (i.image.type = e.type, i.image.size = e.size, i.image.orientation = e.orientation, i.image.animated = e.animated, i.image.type) {
                    case"image/jpeg":
                    case"image/png":
                        i.image.cropAllowed = !0;
                        break;
                    case"image/gif":
                        if (i.image.animated && !i.settings.forceCanvas) {
                            if (i.image.cropAllowed = !1, Math.floor(i.image.size / 1024) > i.settings.maxSize)return void app.dialog.show({
                                title: "Animated GIF too large",
                                message: "Sorry, animated GIFs cannot exceed " + i.settings.maxSize / 1024 + "MB in file size."
                            })
                        } else i.image.cropAllowed = !0;
                        break;
                    default:
                        return void app.dialog.show({
                            title: "Invalid image type",
                            message: "Sorry, images must be in either JPEG, PNG, or GIF format."
                        })
                }
                a = i.createObjectURL(t), i.$image.css("width", "").css("height", "").attr("src", "").attr("src", a)
            })
        }, a.prototype.completeLoad = function () {
            var t, i, e, a, s, o, n, r, h = this, c = 0, p = !1;
            if (!this.image.cropAllowed && !this.settings.forceCanvas)return i = this.$image.attr("src"), void(i.match(/^data:/) ? this.sync(i) : app.toDataURL(i, function (t) {
                h.sync(t)
            }));
            switch (this.crop.topLeft.x = this.crop.topLeft.y = null, this.crop.bottomRight.x = this.crop.bottomRight.y = null, this.crop.square = !1, this.$squareOption.hasClass("disabled") || this.$squareOption.removeClass("active"), this.image.orientation) {
                case 1:
                default:
                    break;
                case 2:
                    p = !0;
                    break;
                case 3:
                    c = 180;
                    break;
                case 4:
                    p = !0, c = 180;
                    break;
                case 5:
                    p = !0, c = 270;
                    break;
                case 6:
                    c = 90;
                    break;
                case 7:
                    p = !0, c = 90;
                    break;
                case 8:
                    c = -90
            }
            return e = this.$image[0].width, a = this.$image[0].height, (e > this.settings.maxWH || a > this.settings.maxWH) && (o = this.settings.maxWH / e, n = this.settings.maxWH / a, r = Math.min(o, n), e = Math.floor(r * e), a = Math.floor(r * a)), t = this.image.canvas.getContext("2d"), c >= 360 ? c -= 360 : 0 > c && (c += 360), 0 == c || 180 == Math.abs(c) ? (this.image.canvas.width = e, this.image.canvas.height = a, t.translate(this.image.canvas.width / 2, this.image.canvas.height / 2), t.rotate(c * (Math.PI / 180)), t.translate(this.image.canvas.width / -2, this.image.canvas.height / -2)) : (this.image.canvas.width = a, this.image.canvas.height = e, t.translate(this.image.canvas.width / 2, this.image.canvas.height / 2), t.rotate(c * (Math.PI / 180)), t.translate(this.image.canvas.height / -2, this.image.canvas.width / -2)), p ? (t.scale(-1, 1), t.drawImage(this.$image[0], -e, 0, e, a)) : t.drawImage(this.$image[0], 0, 0, e, a), this.image.width = this.image.canvas.width, this.image.height = this.image.canvas.height, i = this.$image.attr("src"), i.match(/^blob:/) && i != this.$input.val() && this.revokeObjectURL(i), this.$image.attr("src", ""), this.settings.crop ? ((null === this.crop.topLeft.x || isNaN(this.crop.topLeft.x) || null === this.crop.topLeft.y || isNaN(this.crop.topLeft.y) || null === this.crop.bottomRight.x || isNaN(this.crop.bottomRight.x) || null === this.crop.bottomRight.y || isNaN(this.crop.bottomRight.y)) && (this.crop.topLeft.x = this.crop.initialMargin, this.crop.topLeft.y = this.crop.initialMargin, this.crop.square ? this.image.height > this.image.width ? (this.crop.topLeft.y = (this.image.height - this.image.width) / 2, this.crop.bottomRight.x = this.image.width - this.crop.initialMargin, this.crop.bottomRight.y = this.crop.topLeft.y + this.image.width - this.crop.initialMargin) : (this.crop.topLeft.x = (this.image.width - this.image.height) / 2, this.crop.bottomRight.x = this.crop.topLeft.x + this.image.height - this.crop.initialMargin, this.crop.bottomRight.y = this.image.height - this.crop.initialMargin) : (this.crop.bottomRight.x = this.image.width - this.crop.initialMargin, this.crop.bottomRight.y = this.image.height - this.crop.initialMargin), this.crop.width() < this.crop.minWidth && (s = Math.ceil((this.crop.minWidth - this.crop.width()) / 2), this.crop.topLeft.x = Math.max(0, this.crop.topLeft.x - s), this.crop.bottomRight.x = Math.min(this.image.width, this.crop.bottomRight.x + s)), this.crop.height() < this.crop.minHeight && (s = Math.ceil((this.crop.minHeight - this.crop.height()) / 2), this.crop.topLeft.y = Math.max(0, this.crop.topLeft.y - s), this.crop.bottomRight.y = Math.min(this.image.height, this.crop.bottomRight.y + s))), this.rescale(), this.modalVisible() || this.showModal(), this.image.orientation = null, void(h.settings.forceSquare && (h.crop.square = !0, h.squarifyCrop(), h.redrawCrop()))) : (this.crop.topLeft.x = 0, this.crop.topLeft.y = 0, this.crop.bottomRight.x = this.image.width, this.crop.bottomRight.y = this.image.height, this.sync(), void(this.image.orientation = null))
        }, a.prototype.cropControl_move = function (t, i) {
            this.moveCrop(t / this.canvasWrapper.zoom, i / this.canvasWrapper.zoom)
        }, a.prototype.cropControl_topLeft = function (t, i) {
            this.crop.square && (Math.abs(t) > Math.abs(i) ? i = t : t = i), this.resizeCrop(t / this.canvasWrapper.zoom, i / this.canvasWrapper.zoom, 0, 0)
        }, a.prototype.cropControl_topRight = function (t, i) {
            this.crop.square && (Math.abs(t) > Math.abs(i) ? i = -1 * t : t = -1 * i), this.resizeCrop(0, i / this.canvasWrapper.zoom, t / this.canvasWrapper.zoom, 0)
        }, a.prototype.cropControl_bottomRight = function (t, i) {
            this.crop.square && (Math.abs(t) > Math.abs(i) ? i = t : t = i), this.resizeCrop(0, 0, t / this.canvasWrapper.zoom, i / this.canvasWrapper.zoom)
        }, a.prototype.cropControl_bottomLeft = function (t, i) {
            this.crop.square && (Math.abs(t) > Math.abs(i) ? i = -1 * t : t = -1 * i), this.resizeCrop(t / this.canvasWrapper.zoom, 0, 0, i / this.canvasWrapper.zoom)
        }, a.prototype.getImageProperties_orientation = function (t) {
            var i, e, a, s, o, n, r;
            if (i = new DataView(t), 65496 != i.getUint16(0, !1))return null;
            for (e = Math.min(i.byteLength, 65536), a = 2; e > a;)if (s = i.getUint16(a, !1), a += 2, 65505 == s) {
                if (1165519206 != i.getUint32(a += 2, !1))return null;
                for (o = 18761 == i.getUint16(a += 6, !1), a += i.getUint32(a + 4, o), n = i.getUint16(a, o), a += 2, r = 0; n > r; r++)if (274 == i.getUint16(a + 12 * r, o))return i.getUint16(a + 12 * r + 8, o)
            } else {
                if (65280 != (65280 & s))break;
                a += i.getUint16(a, !1)
            }
            return null
        }, a.prototype.getImageProperties_animated = function (t) {
            var i, e, a, s, o, n, r;
            if (o = 0, i = new DataView(t), s = i.byteLength, 71 !== i.getUint8(0) || 73 !== i.getUint8(1) || 70 !== i.getUint8(2) || 56 !== i.getUint8(3))return !1;
            for (e = 0, a = s - 3; a > e && 2 > o; ++e)0 == i.getUint8(e) && 33 === i.getUint8(e + 1) && 249 === i.getUint8(e + 2) && (n = i.getUint8(e + 3), r = e + 4 + n, s > r + 1 && 0 === i.getUint8(r) && (44 === i.getUint8(r + 1) || i.getUint8(r + 1 === 33)) && o++);
            return o > 1
        }, a.prototype.getImageProperties = function (t, i) {
            var e = this, a = new FileReader;
            a.onload = function (a) {
                var s = {};
                s.type = t.type, s.size = t.size, s.orientation = e.getImageProperties_orientation(a.target.result), s.animated = e.getImageProperties_animated(a.target.result), i(s)
            }, a.readAsArrayBuffer(t)
        }, $.fn.formImageCropper = function () {
            var t = $(this);
            if (0 == this.length)return t;
            if (this.length > 1) {
                for (var i = 0; i < this.length; i++)$(this[i]).formImageCropper();
                return t
            }
            return this[0]._formImageCropper = new a(t), t
        }, "undefined" != typeof i && (i.exports = a)
    }, {}],
    form: [function (t, i, e) {
        function a(t, i) {
            var e = this;
            if (this.$obj = t, this.options = $.extend({
                    fields: {},
                    types: {},
                    verify: {},
                    preSubmitHandler: null,
                    submitHandler: function (t) {
                        e.submitHandler(t)
                    },
                    validation: t.is("[data-validation]") ? !0 : !1
                }, i), this.$alert = $('<div class="alert">what what</div>').prependTo(this.$obj).hide(), this.alertTimers = [], "ie" != skel.vars.browser && "edge" != skel.vars.browser && this.$obj.on("input", 'input[type="range"]', function () {
                    $(this).trigger("change")
                }), this.$obj.on("click", "label", function (t) {
                    var i = $(this).prev().attr("type");
                    "checkbox" != i && "radio" != i && t.preventDefault()
                }), ("ie" == skel.vars.browser || "edge" == skel.vars.browser) && this.$obj.attr("id")) {
                var e = this;
                $('input[form="' + this.$obj.attr("id") + '"]').on("click", function (t) {
                    t.preventDefault(), t.stopPropagation(), e.$obj.trigger("submit")
                })
            }
            this.initType_Group(), this.initType_Image(), this.initType_Color(), this.initModifiers(), this.initRequires(), this.initFields(), this.init()
        }

        t("./formColor.js"), t("./formGroup.js"), t("./formImageCropper.js");
        a.prototype.option = function (t, i) {
            return t in this.options ? ("undefined" != typeof i && (this.options[t] = i), this.options[t]) : null
        }, a.prototype.value = function (t, i) {
            var e = this.$obj.find("#" == t.charAt(0) ? 'input[id="' + t.substr(1) + '"],select[id="' + t.substr(1) + '"]' : 'input[name="' + t + '"],select[name="' + t + '"]');
            return 0 == e.length || e.prop("disabled") === !0 ? null : ("undefined" != typeof i && e.val(i), e.val())
        }, a.prototype.showAlert = function (t, i) {
            var e = this, a = 25 * i.length;
            this.clearAlert(), e.$alert.addClass(t).text(i), e.alertTimers.push(window.setTimeout(function () {
                e.$alert.show(), web.scrollTo(e.$alert), e.alertTimers.push(window.setTimeout(function () {
                    e.$alert.addClass("visible")
                }, 100)), e.alertTimers.push(window.setTimeout(function () {
                    e.$alert.removeClass("visible")
                }, 2e3 + a)), e.alertTimers.push(window.setTimeout(function () {
                    e.clearAlert()
                }, 2250 + a))
            }, 0))
        }, a.prototype.clearAlert = function () {
            for (var t in this.alertTimers)window.clearTimeout(this.alertTimers[t]);
            this.alertTimers = [], this.$alert.hide().text("").removeClass("visible").removeClass("error").removeClass("success")
        }, a.prototype.flag = function (t, i, e) {
            e ? t.attr("data-" + i, "1").data(i, "1") : t.removeAttr("data-" + i).removeData(i)
        }, a.prototype.is = function (t, i) {
            return t in this.options.types ? this.options.types[t](i) : web.is(t, i)
        }, a.prototype.isValid = function () {
            return 0 === this.$obj.find("[data-invalid]:enabled,[data-missing]:enabled,[data-unverified]:enabled").length
        }, a.prototype.submitHandler = function (t) {
            var i, e = this, a = this.$obj.data("action");
            a && "#" != a && (i = function () {
                $.ajax({
                    type: "POST",
                    url: a + (-1 == a.indexOf("?") ? "?" : "&") + "ajax=1",
                    data: e.$obj.serialize(),
                    dataType: "json",
                    success: function (i) {
                        switch (i.action) {
                            case"alert":
                                e.showAlert(i.type, i.message);
                                break;
                            case"redirect":
                                return void window.location.replace(i.url);
                            default:
                                e.showAlert("success", "Ok.")
                        }
                        if (e.$obj.find('input[name="' + i._key + '"]').val(i[i._key]), t(), i.reset) {
                            if (i.reset === !0)e.$obj.get(0).reset(); else if ($.isArray(i.reset))for (k in i.reset)e.$obj.find('input[name="' + i.reset[k] + '"],select[name="' + i.reset[k] + '"]').val("").removeProp("checked"); else e.$obj.find('input[name="' + i.reset + '"],select[name="' + i.reset + '"]').val("").removeProp("checked");
                            e.$obj.find("input, select, textarea").trigger("change")
                        }
                        i.focus && e.$obj.find('input[name="' + i.focus + '"]').focus(), i.callback && window[i.callback]()
                    }
                })
            }, window.setTimeout(function () {
                e.options.preSubmitHandler ? e.options.preSubmitHandler.apply(e, [i]) : i()
            }, 250))
        }, a.prototype.validate = function (t) {
            var i = t.data("type"), e = (1 == t.data("optional") ? !0 : !1) || t.prop("disabled") === !0, a = t.val();
            "checkbox" == t.attr("type") && (a = t.prop("checked") ? "on" : ""), i || (i = "any"), "" == a ? (this.flag(t, "invalid", !1), this.flag(t, "missing", !e)) : (this.flag(t, "missing", !1), this.flag(t, "invalid", !this.is(i, a))), this.isValid() ? this.enableSubmits() : this.disableSubmits()
        }, a.prototype.$submits = function () {
            return $('input[form="' + this.$obj.attr("id") + '"]').add(this.$obj.find('input[type="submit"]'))
        }, a.prototype.enableSubmits = function () {
            var t = this.$submits();
            t.prop("disabled", !1), t.removeClass("is-submitting")
        }, a.prototype.disableSubmits = function (t) {
            var i = this.$submits();
            i.prop("disabled", !0), t && i.addClass("is-submitting")
        }, a.prototype.initFields = function () {
            var t, i, e;
            for (t in this.options.fields)i = this.options.fields[t], e = this.$obj.find('[name="' + t + '"]'), "value" in i && e.val(i.value)
        }, a.prototype.initModifiers = function () {
            var t = this;
            this.$obj.find('input[type="range"][data-status]').each(function () {
                var t = $(this), i = $('<div class="status" />').insertAfter(t), e = t.data("status");
                t.on("change.status", function (a) {
                    var s = t.val();
                    switch (e) {
                        case"seconds":
                            s = parseFloat(s) / 1e3 + "s"
                    }
                    i.text(s)
                }).triggerHandler("change.status")
            }), this.$obj.find("textarea[data-autosize]").each(function () {
                var i = $(this), e = 1 == i.filter("[data-autosize-newline]").length;
                i.attr("rows", 1).css("overflow", "hidden").css("resize", "none").on("keydown", e ? function (i) {
                    13 == i.keyCode && (i.ctrlKey ? (i.preventDefault(), t.$submits().prop("disabled") || t.$obj.trigger("submit")) : i.stopPropagation())
                } : function (i) {
                    13 == i.keyCode && (i.preventDefault(), t.$submits().prop("disabled") || t.$obj.trigger("submit"))
                }).on("input keyup blur focus --refresh", function () {
                    i.css("height", "auto").css("height", i.prop("scrollHeight") - 4 + "px")
                }).on("keyup", function (t) {
                    9 == t.keyCode && i.select()
                }).triggerHandler("input")
            })
        }, a.prototype.initRequires = function () {
            var t = this;
            this.$obj.find("[data-requires]").each(function () {
                var i, e, a, s, o = $(this), n = o.data("requires").split("="), r = o.find("input,select,textarea");
                e = n[0], a = n[1], s = t.$obj.find('[name="' + e + '"]'), i = function () {
                    var t = "radio" == s.attr("type") ? s.filter(":checked").val() : s.val(), i = "!" == a.charAt(0) ? t != a.substring(1) : t == a;
                    i ? (r.prop("disabled", !1).trigger("change"), o.show()) : (r.prop("disabled", !0).trigger("change"), o.hide())
                }, s.on("change", i), window.setTimeout(function () {
                    i()
                }, 0)
            })
        }, a.prototype.initType_Color = function () {
            this.$obj.find('input[type="hexcolor"]').formColor()
        }, a.prototype.initType_Group = function () {
            this.$obj.find(".group").formGroup()
        }, a.prototype.initType_Image = function () {
            this.$obj.find(".image-cropper").formImageCropper()
        }, a.prototype.init = function () {
            var t = this;
            if (this.options.validation && this.$obj.on("change blur keyup", "input,select,textarea", function () {
                    t.validate($(this))
                }), !$.isEmptyObject(this.options.verify)) {
                this.$obj.on("--refresh", "input,select,textarea", function (i) {
                    var e = $(this), a = e.attr("name"), s = e.val();
                    a in t.options.verify && e.prop("disabled") !== !0 && ("" == s ? t.flag(e, "unverified", !0) : e.data("verify-originalValue", s))
                }).on("keydown", "input,select,textarea", function (i) {
                    var e = $(this), a = e.attr("name");
                    a in t.options.verify && e.prop("disabled") !== !0 && 13 == i.keyCode && (i.preventDefault(), i.stopPropagation(), e.blur())
                }).on("input", "input,select,textarea", function (i) {
                    var e = $(this), a = e.next(".message"), s = e.attr("name"), o = e.val();
                    s in t.options.verify && e.prop("disabled") !== !0 && (t.flag(e, "unverified", !0), t.flag(e, "verifailed", !1), a.text("").removeClass("positive").removeClass("negative").removeClass("visible"), "_form_verifyTimeout" in this && window.clearTimeout(this._form_verifyTimeout), this._form_verifyTimeout = window.setTimeout(function () {
                        if ("1" != e.data("invalid") && "" != o && (o = e.val(), "1" != e.data("invalid") && "" != o)) {
                            if (o == e.data("verify-originalValue"))return t.flag(e, "unverified", !1), void t.validate(e);
                            a.text("Checking ...").addClass("visible"), t.options.verify[s](o, function (i, s) {
                                t.flag(e, "unverified", !i), t.validate(e), i === !1 && t.flag(e, "verifailed", !0), e.is(":focus") || e.trigger("change"), a.addClass(i ? "positive" : "negative").text(s)
                            })
                        }
                    }, 500))
                });
                var i, e;
                for (i in this.options.verify)e = this.$obj.find('input[name="' + i + '"]'), 0 != e.length && ($('<div class="message"></div>').insertAfter(e), e.trigger("--refresh"))
            }
            this.$obj.attr("action") && this.$obj.data("action", this.$obj.attr("action")).removeAttr("action"), this.$obj.on("change", "input,select,textarea", function () {
                var i = $(this), e = i.attr("name");
                "name" in t.options.fields && "change" in t.options.fields[e] && t.options.fields[e].change(i.data("missing") || i.data("invalid") || i.data("unverified") ? "" : i.val())
            }), this.$obj.on("submit", function (i) {
                var e = t.$obj.find("input,select,textarea");
                t.options.validation && (e.each(function () {
                    t.validate($(this))
                }), t.isValid() || (i.stopPropagation(), i.preventDefault())), t.options.submitHandler && (i.stopPropagation(), i.preventDefault(), e.blur(), t.disableSubmits(!0), e.filter(":disabled").removeData("verify-originalValue"), t.clearAlert(), t.options.submitHandler(function () {
                    t.enableSubmits()
                }))
            }), this.options.validation && window.setTimeout(function () {
                t.$obj.find("input,select,textarea").each(function () {
                    t.validate($(this))
                })
            }, 0)
        }, $.fn.form = function (t) {
            var i = $(this);
            if (0 == this.length)return i;
            if (this.length > 1) {
                for (var e = 0; e < this.length; e++)$(this[e]).form(t);
                return i
            }
            return this[0]._form = new a(i, t), i
        }, i.exports = a
    }, {"./formColor.js": 2, "./formGroup.js": "formGroup", "./formImageCropper.js": "formImageCropper"}],
    tabs: [function (t, i, e) {
        function a(t) {
            var i = this, e = $('<ul class="tabs"></ul>').prependTo(t);
            this.tabs = [], this.$tabs = $(), this.$panes = $(), t.children("section[data-title]").each(function (t) {
                var a = {$tab: null, $pane: null, title: null};
                a.$pane = $(this), a.$pane.hide(), i.$panes = i.$panes.add(a.$pane), a.title = a.$pane.data("title"), a.$tab = $("<li>" + a.title + "</li>").appendTo(e), a.$tab.on("click", function () {
                    i["switch"](t)
                }), i.$tabs = i.$tabs.add(a.$tab), i.tabs.push(a)
            }), this["switch"](0)
        }

        a.prototype["switch"] = function (t) {
            var i = this.tabs[t];
            this.$tabs.removeClass("active"), this.$panes.hide(), i.$tab.addClass("active"), i.$pane.show()
        }, $.fn.tabs = function () {
            var t = $(this);
            if (0 == this.length)return t;
            if (this.length > 1) {
                for (var i = 0; i < this.length; i++)$(this[i]).tabs();
                return t
            }
            return this[0]._tabs = new a(t), t
        }, i.exports = a
    }, {}]
}, {}, [1]);