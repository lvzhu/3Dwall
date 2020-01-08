/* snabbt.js Version: 0.6.4 Build date: 2015-12-27 (c) 2015 Daniel Lundin @license MIT */ ! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ?
            self : this, n.snabbt = t()
    }
}(function () {
    return function t(n, e, i) {
        function r(a, s) {
            if (!e[a]) {
                if (!n[a]) {
                    var u = "function" == typeof require && require;
                    if (!s && u) return u(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var f = e[a] = {
                    exports: {}
                };
                n[a][0].call(f.exports, function (t) {
                    var e = n[a][1][t];
                    return r(e ? e : t)
                }, f, f.exports, t, n, e, i)
            }
            return e[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
        return r
    }({
        1: [function () {
            ! function () {
                if (!Array.prototype.find) {
                    var t = function (t) {
                        var n = Object(this),
                            e = n.length < 0 ? 0 : n.length >>> 0;
                        if (0 === e) return void 0;
                        if ("function" != typeof t || "[object Function]" !== Object.prototype.toString
                            .call(t)) throw new TypeError(
                            "Array#find: predicate must be a function");
                        for (var i, r = arguments[1], o = 0; e > o; o++)
                            if (i = n[o], t.call(r, i, o, n)) return i;
                        return void 0
                    };
                    if (Object.defineProperty) try {
                        Object.defineProperty(Array.prototype, "find", {
                            value: t,
                            configurable: !0,
                            enumerable: !1,
                            writable: !0
                        })
                    } catch (n) {}
                    Array.prototype.find || (Array.prototype.find = t)
                }
            }(this)
        }, {}],
        2: [function (t, n) {
            "use strict";

            function e(t, n, e, i) {
                var s = r.optionOrDefault(e.duration, 500),
                    u = r.optionOrDefault(e.delay, 0),
                    c = o.createEaser(r.optionOrDefault(e.easing, "linear"), e),
                    f = 0 === s ? n.clone() : t.clone();
                f.transformOrigin = e.transformOrigin, f.perspective = e.perspective;
                var p = -1,
                    l = 0,
                    h = !1,
                    d = u / s,
                    m = e.manual,
                    v = 0,
                    g = void 0,
                    A = void 0;
                return A = e.valueFeeder ? a.createValueFeederTweener(e.valueFeeder, t, n, f) : a.createStateTweener(
                    t, n, f), {
                    options: e,
                    endState: function () {
                        return n
                    },
                    finish: function (t) {
                        m = !1;
                        var n = s * v;
                        p = l - n, g = t, c.resetFrom(v)
                    },
                    rollback: function (t) {
                        m = !1, A.setReverse();
                        var n = s * (1 - v);
                        p = l - n, g = t, c.resetFrom(v)
                    },
                    tick: function (t) {
                        if (m) return l = t, this.updateCurrentTransform();
                        if (-1 === p && (p = t), t - p >= u) {
                            !h && e.start && e.start(), h = !0, l = t - u;
                            var n = Math.min(Math.max(0, l - p), s);
                            c.tick(0 === s ? 1 : n / s), this.updateCurrentTransform(), e.update &&
                                e.update(n / s), this.completed() && g && g()
                        }
                    },
                    getCurrentState: function () {
                        return f
                    },
                    setValue: function (t) {
                        h = !0, v = Math.min(Math.max(t, 1e-4), .9999 + d)
                    },
                    updateCurrentTransform: function () {
                        var t = c.getValue();
                        if (m) {
                            var n = Math.max(1e-5, v - d);
                            c.isSpring ? t = n : (c.tick(n, !0), t = c.getValue())
                        }
                        A.tween(t)
                    },
                    completed: function () {
                        return 0 === p ? !1 : c.completed()
                    },
                    updateElement: function (t, n) {
                        if (h || n) {
                            var o = A.asMatrix(),
                                a = A.getProperties();
                            r.updateElementTransform(t, o, i, a.perspective, e.staticTransform),
                                r.updateElementProperties(t, a)
                        }
                    }
                }
            }

            function i(t) {
                var n = t.movement;
                t.initialVelocity = .1, t.equilibriumPosition = 0;
                var e = o.createSpringEasing(t),
                    i = n.position,
                    a = n.rotation,
                    u = n.rotationPost,
                    c = n.scale,
                    f = n.skew,
                    p = s.createState({
                        position: i ? [0, 0, 0] : void 0,
                        rotation: a ? [0, 0, 0] : void 0,
                        rotationPost: u ? [0, 0, 0] : void 0,
                        scale: c ? [1, 1] : void 0,
                        skew: f ? [0, 0] : void 0
                    });
                return {
                    options: function () {
                        return t
                    },
                    tick: function () {
                        e.equilibrium || (e.tick(), this.updateMovement())
                    },
                    updateMovement: function () {
                        var t = e.getValue();
                        i && (p.position[0] = n.position[0] * t, p.position[1] = n.position[1] *
                            t, p.position[2] = n.position[2] * t), a && (p.rotation[0] = n.rotation[
                                0] * t, p.rotation[1] = n.rotation[1] * t, p.rotation[2] =
                            n.rotation[2] * t), u && (p.rotationPost[0] = n.rotationPost[0] *
                            t, p.rotationPost[1] = n.rotationPost[1] * t, p.rotationPost[2] =
                            n.rotationPost[2] * t), c && (p.scale[0] = 1 + n.scale[0] * t,
                            p.scale[1] = 1 + n.scale[1] * t), f && (p.skew[0] = n.skew[0] *
                            t, p.skew[1] = n.skew[1] * t)
                    },
                    updateElement: function (t) {
                        r.updateElementTransform(t, p.asMatrix()), r.updateElementProperties(t,
                            p.getProperties())
                    },
                    getCurrentState: function () {
                        return p
                    },
                    completed: function () {
                        return e.completed()
                    }
                }
            }
            var r = t("./utils.js"),
                o = t("./easing.js"),
                a = t("./tweeners"),
                s = t("./state.js");
            n.exports = {
                createAnimation: e,
                createAttentionAnimation: i
            }
        }, {
            "./easing.js": 3,
            "./state.js": 8,
            "./tweeners": 9,
            "./utils.js": 10
        }],
        3: [function (t, n) {
            "use strict";

            function e(t) {
                return t
            }

            function i(t) {
                return (Math.cos(t * Math.PI + Math.PI) + 1) / 2
            }

            function r(t) {
                return t * t
            }

            function o(t) {
                return -Math.pow(t - 1, 2) + 1
            }

            function a(t, n) {
                if ("spring" === t) return u(n);
                var e = t;
                s.isFunction(t) || (e = c[t]);
                var i, r = e,
                    o = 0;
                return {
                    tick: function (t) {
                        o = r(t), i = t
                    },
                    resetFrom: function () {
                        i = 0
                    },
                    getValue: function () {
                        return o
                    },
                    completed: function () {
                        return i >= 1 ? i : !1
                    }
                }
            }
            var s = t("./utils.js"),
                u = function (t) {
                    var n = s.optionOrDefault(t.startPosition, 0),
                        e = s.optionOrDefault(t.equilibriumPosition, 1),
                        i = s.optionOrDefault(t.initialVelocity, 0),
                        r = s.optionOrDefault(t.springConstant, .8),
                        o = s.optionOrDefault(t.springDeceleration, .9),
                        a = s.optionOrDefault(t.springMass, 10),
                        u = !1;
                    return {
                        isSpring: !0,
                        tick: function (t, s) {
                            if (0 !== t && !s && !u) {
                                var c = -(n - e) * r,
                                    f = c / a;
                                i += f, n += i, i *= o, Math.abs(n - e) < .001 && Math.abs(i) <
                                    .001 && (u = !0)
                            }
                        },
                        resetFrom: function (t) {
                            n = t, i = 0
                        },
                        getValue: function () {
                            return u ? e : n
                        },
                        completed: function () {
                            return u
                        }
                    }
                },
                c = {
                    linear: e,
                    ease: i,
                    easeIn: r,
                    easeOut: o
                };
            n.exports = {
                createEaser: a,
                createSpringEasing: u
            }
        }, {
            "./utils.js": 10
        }],
        4: [function (t, n) {
            "use strict";
            var e = t("./state.js").stateFromOptions,
                i = t("./animation.js"),
                r = t("./state.js").createState,
                o = t("./utils.js"),
                a = {
                    runningAnimations: [],
                    completedAnimations: [],
                    transformProperty: "transform",
                    rAFScheduled: !1,
                    init: function () {
                        if (void 0 === typeof window) {
                            var t = window.getComputedStyle(document.documentElement, ""),
                                n = (Array.prototype.slice.call(t).join("").match(
                                    /-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1];
                            "webkit" === n && (this.transformProperty = "webkitTransform")
                        }
                    },
                    scheduleNextFrame: function () {
                        var t = this;
                        this.rAFScheduled || (this.rAFScheduled = !0, window.requestAnimationFrame(
                            function (n) {
                                t.rAFScheduled = !1, t.stepAnimations(n)
                            }))
                    },
                    stepAnimations: function (t) {
                        var n = this;
                        this.runningAnimations.forEach(function (e) {
                                var i = e[0],
                                    r = e[1];
                                n.stepAnimation(i, r, t)
                            }), this.archiveCompletedAnimations(), this.runningAnimations.length >
                            0 && this.scheduleNextFrame()
                    },
                    stepAnimation: function (t, n, e) {
                        n.tick(e), n.updateElement(t)
                    },
                    archiveCompletedAnimations: function () {
                        var t = this.runningAnimations.filter(function (t) {
                                return !t[1].completed()
                            }),
                            n = this.runningAnimations.filter(function (t) {
                                return t[1].completed()
                            }),
                            e = this.createQueuedAnimations(n),
                            i = n.filter(function (t) {
                                return !e.find(function (n) {
                                    return n[0] !== t[0]
                                })
                            });
                        a.runningAnimations = t, this.completedAnimations = this.completedAnimations
                            .filter(function (t) {
                                return !i.find(function (n) {
                                    return n[0] === t[0]
                                })
                            }), Array.prototype.push.apply(this.completedAnimations, i), Array.prototype
                            .push.apply(this.runningAnimations, e), n.forEach(function (t) {
                                var n = t[1].options.complete;
                                n && n()
                            }), this.clearOphanedEndStates()
                    },
                    createQueuedAnimations: function (t) {
                        var n = this,
                            e = t.filter(function (t) {
                                var n = t[2];
                                return n.index < n.queue.length
                            }).map(function (t) {
                                var e = t[0],
                                    i = t[2],
                                    r = i.queue[i.index];
                                return i.index++, [t[0], n.createAnimation(e, r, t[1].endState()),
                                    i]
                            });
                        return e
                    },
                    createChainer: function () {
                        var t = {
                            index: 0,
                            queue: [],
                            snabbt: function (n) {
                                return this.queue.push(n), t
                            }
                        };
                        return t
                    },
                    createAnimation: function (t, n, r) {
                        var o = r || this.findCurrentState(t),
                            a = e(n, o, !0),
                            s = e(n, o, !1);
                        this.runningAnimations = this.runningAnimations.filter(function (n) {
                            return t !== n[0]
                        });
                        var u = i.createAnimation(a, s, n, this.transformProperty);
                        return u
                    },
                    createAttentionAnimation: function (t, n) {
                        var o = e(n, r({}, !1));
                        n.movement = o;
                        var a = i.createAttentionAnimation(n);
                        return a
                    },
                    stopAnimation: function (t) {
                        var n = this.runningAnimations.filter(function (n) {
                            return n[0] === t
                        });
                        this.runningAnimations = this.runningAnimations.filter(function (n) {
                            return n[0] !== t
                        }), Array.prototype.push.apply(this.completedAnimations, n)
                    },
                    initializeAnimation: function (t, n, e) {
                        var i = void 0;
                        if ("attention" === n) i = this.createAttentionAnimation(t, e);
                        else {
                            if ("stop" === n) return this.stopAnimation(t);
                            i = this.createAnimation(t, n)
                        }
                        var r = this.createChainer();
                        return i.updateElement(t, !0), this.runningAnimations.push([t, i, r]),
                            this.scheduleNextFrame(), n.manual ? i : r
                    },
                    findCurrentState: function (t) {
                        var n = this.runningAnimations.find(function (n) {
                            return t === n[0]
                        });
                        return n ? n[1].getCurrentState() : (n = this.completedAnimations.find(
                            function (n) {
                                return t === n[0]
                            }), n ? n[1].getCurrentState() : void 0)
                    },
                    clearOphanedEndStates: function () {
                        this.completedAnimations = this.completedAnimations.filter(function (t) {
                            return o.findUltimateAncestor(t[0]).body
                        })
                    }
                };
            n.exports = a
        }, {
            "./animation.js": 2,
            "./state.js": 8,
            "./utils.js": 10
        }],
        5: [function (t, n) {
            "use strict";

            function e(t, n, e) {
                if (!t.length) return "string" == typeof n ? i.initializeAnimation(t, n, r(e, 0, 1)) :
                    i.initializeAnimation(t, r(n, 0, 1), e);
                for (var a = [], s = {
                        snabbt: function (t) {
                            var n = a.length;
                            return a.forEach(function (e, i) {
                                e.snabbt(r(t, i, n))
                            }), s
                        },
                        setValue: function (t) {
                            return a.forEach(function (n) {
                                n.setValue(t)
                            }), s
                        },
                        finish: function (t) {
                            return a.forEach(function (n, e) {
                                return o.isFunction(t) ? n.finish(function () {
                                    t(e, a.length)
                                }) : void n.finish()
                            }), s
                        },
                        rollback: function (t) {
                            return a.forEach(function (n, e) {
                                return o.isFunction(t) ? n.rollback(function () {
                                    t(e, a.length)
                                }) : void n.rollback()
                            }), s
                        }
                    }, u = 0, c = t.length; c > u; ++u) a.push("string" == typeof n ? i.initializeAnimation(
                    t[u], n, r(e, u, c)) : i.initializeAnimation(t[u], r(n, u, c), e));
                return s
            }
            t("array.prototype.find");
            var i = t("./engine.js"),
                r = t("./properties.js").preprocessOptions,
                o = t("./utils.js"),
                a = t("./matrix.js"),
                s = t("./utils.js").updateElementTransform;
            n.exports = function (t, n, i) {
                    return e(t, n, i)
                }, n.exports.createMatrix = a, n.exports.setElementTransform = s, n.exports.sequence =
                function (t) {
                    var n = -1,
                        i = function r() {
                            if (++n, !(n > t.length - 1)) {
                                var i = t[n][0],
                                    o = t[n][1],
                                    a = o.allDone;
                                o.allDone = a ? function () {
                                    a(), r()
                                } : r, e(i, o)
                            }
                        };
                    i()
                }, "undefined" != typeof window && window.jQuery && ! function (t) {
                    t.fn.snabbt = function (t, n) {
                        return e(this.get(), t, n)
                    }
                }(window.jQuery), i.init()
        }, {
            "./engine.js": 4,
            "./matrix.js": 6,
            "./properties.js": 7,
            "./utils.js": 10,
            "array.prototype.find": 1
        }],
        6: [function (t, n) {
            "use strict";

            function e(t, n, e) {
                return e[0] = t[0] * n[0] + t[1] * n[4] + t[2] * n[8] + t[3] * n[12], e[1] = t[0] *
                    n[1] + t[1] * n[5] + t[2] * n[9] + t[3] * n[13], e[2] = t[0] * n[2] + t[1] * n[
                        6] + t[2] * n[10] + t[3] * n[14], e[3] = t[0] * n[3] + t[1] * n[7] + t[2] *
                    n[11] + t[3] * n[15], e[4] = t[4] * n[0] + t[5] * n[4] + t[6] * n[8] + t[7] * n[
                        12], e[5] = t[4] * n[1] + t[5] * n[5] + t[6] * n[9] + t[7] * n[13], e[6] =
                    t[4] * n[2] + t[5] * n[6] + t[6] * n[10] + t[7] * n[14], e[7] = t[4] * n[3] + t[
                        5] * n[7] + t[6] * n[11] + t[7] * n[15], e[8] = t[8] * n[0] + t[9] * n[4] +
                    t[10] * n[8] + t[11] * n[12], e[9] = t[8] * n[1] + t[9] * n[5] + t[10] * n[9] +
                    t[11] * n[13], e[10] = t[8] * n[2] + t[9] * n[6] + t[10] * n[10] + t[11] * n[14],
                    e[11] = t[8] * n[3] + t[9] * n[7] + t[10] * n[11] + t[11] * n[15], e[12] = t[12] *
                    n[0] + t[13] * n[4] + t[14] * n[8] + t[15] * n[12], e[13] = t[12] * n[1] + t[13] *
                    n[5] + t[14] * n[9] + t[15] * n[13], e[14] = t[12] * n[2] + t[13] * n[6] + t[14] *
                    n[10] + t[15] * n[14], e[15] = t[12] * n[3] + t[13] * n[7] + t[14] * n[11] + t[
                        15] * n[15], e
            }

            function i(t, n, e, i) {
                t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] =
                    0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = n, t[13] = e, t[14] = i, t[15] = 1
            }

            function r(t, n) {
                t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = Math.cos(n), t[6] = -Math.sin(
                        n), t[7] = 0, t[8] = 0, t[9] = Math.sin(n), t[10] = Math.cos(n), t[11] = 0,
                    t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            }

            function o(t, n) {
                t[0] = Math.cos(n), t[1] = -Math.sin(n), t[2] = 0, t[3] = 0, t[4] = Math.sin(n), t[
                        5] = Math.cos(n), t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] =
                    0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            }

            function a(t, n, e) {
                t[0] = 1, t[1] = Math.tan(n), t[2] = 0, t[3] = 0, t[4] = Math.tan(e), t[5] = 1, t[6] =
                    0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[
                        14] = 0, t[15] = 1
            }

            function s(t, n, e) {
                t[0] = n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] =
                    0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            }

            function u(t) {
                t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] =
                    0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            }

            function c(t, n) {
                n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n[6] =
                    t[6], n[7] = t[7], n[8] = t[8], n[9] = t[9], n[10] = t[10], n[11] = t[11], n[12] =
                    t[12], n[13] = t[13], n[14] = t[14], n[15] = t[15]
            }

            function f() {
                var t = new Float32Array(16),
                    n = new Float32Array(16),
                    f = new Float32Array(16);
                return u(t), {
                    data: t,
                    asCSS: function () {
                        for (var n = "matrix3d(", e = 0; 15 > e; ++e) n += Math.abs(t[e]) <
                            1e-4 ? "0," : t[e].toFixed(10) + ",";
                        return n += Math.abs(t[15]) < 1e-4 ? "0)" : t[15].toFixed(10) + ")"
                    },
                    clear: function () {
                        u(t)
                    },
                    translate: function (r, o, a) {
                        return c(t, n), i(f, r, o, a), e(n, f, t), this
                    },
                    rotateX: function (i) {
                        return c(t, n), r(f, i), e(n, f, t), this
                    },
                    rotateY: function (i) {
                        return c(t, n), p(f, i), e(n, f, t), this
                    },
                    rotateZ: function (i) {
                        return c(t, n), o(f, i), e(n, f, t), this
                    },
                    scale: function (i, r) {
                        return c(t, n), s(f, i, r), e(n, f, t), this
                    },
                    skew: function (i, r) {
                        return c(t, n), a(f, i, r), e(n, f, t), this
                    }
                }
            }
            var p = function (t, n) {
                t[0] = Math.cos(n), t[1] = 0, t[2] = Math.sin(n), t[3] = 0, t[4] = 0, t[5] = 1,
                    t[6] = 0, t[7] = 0, t[8] = -Math.sin(n), t[9] = 0, t[10] = Math.cos(n), t[
                        11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            };
            n.exports = f
        }, {}],
        7: [function (t, n) {
            "use strict";

            function e(t) {
                return "from" + t.charAt(0).toUpperCase() + t.slice(1)
            }

            function i(t, n, i) {
                if (!t) return t;
                var o = r.cloneObject(t),
                    a = r.isFunction(t.allDone),
                    s = r.isFunction(t.complete);
                (s || a) && (o.complete = function () {
                    s && t.complete.call(this, n, i), a && n === i - 1 && t.allDone()
                }), r.isFunction(t.valueFeeder) && (o.valueFeeder = function (e, r) {
                    return t.valueFeeder(e, r, n, i)
                }), r.isFunction(t.easing) && (o.easing = function (e) {
                    return t.easing(e, n, i)
                }), r.isFunction(t.start) && (o.start = function () {
                    return t.start(n, i)
                }), r.isFunction(t.update) && (o.update = function (e) {
                    return t.update(e, n, i)
                });
                var c = Object.keys(u).concat(["perspective", "transformOrigin", "duration",
                    "delay"]);
                return c.forEach(function (a) {
                    var s = e(a);
                    r.isFunction(t[a]) && (o[a] = t[a](n, i)), r.isFunction(t[s]) && (o[s] =
                        t[s](n, i))
                }), o
            }
            var r = t("./utils.js"),
                o = 1,
                a = 2,
                s = 3,
                u = {
                    position: [s, [0, 0, 0]],
                    rotation: [s, [0, 0, 0]],
                    rotationPost: [s, [0, 0, 0]],
                    skew: [a, [0, 0]],
                    scale: [a, [1, 1]],
                    scalePost: [a, [1, 1]],
                    opacity: [o],
                    width: [o],
                    height: [o]
                };
            n.exports = {
                tweenableProperties: u,
                fromPrefixed: e,
                preprocessOptions: i,
                types: {
                    SCALAR: o,
                    ARRAY_2: a,
                    ARRAY_3: s
                }
            }
        }, {
            "./utils.js": 10
        }],
        8: [function (t, n) {
            "use strict";

            function e(t, n) {
                var i = r(),
                    a = {
                        opacity: void 0,
                        width: void 0,
                        height: void 0,
                        perspective: void 0
                    },
                    c = {
                        clone: function () {
                            var t = this,
                                n = {};
                            return Object.keys(o).forEach(function (e) {
                                var i = o[e][0];
                                t[e] && (n[e] = i === s.SCALAR ? t[e] : t[e].slice(0))
                            }), e(n)
                        },
                        asMatrix: function () {
                            var t = i;
                            return t.clear(), this.transformOrigin && t.translate(-this.transformOrigin[
                                    0], -this.transformOrigin[1], -this.transformOrigin[2]),
                                this.scale && t.scale(this.scale[0], this.scale[1]), this.skew &&
                                t.skew(this.skew[0], this.skew[1]), this.rotation && (t.rotateX(
                                    this.rotation[0]), t.rotateY(this.rotation[1]), t.rotateZ(
                                    this.rotation[2])), this.position && t.translate(this.position[
                                    0], this.position[1], this.position[2]), this.rotationPost &&
                                (t.rotateX(this.rotationPost[0]), t.rotateY(this.rotationPost[1]),
                                    t.rotateZ(this.rotationPost[2])), this.scalePost && t.scale(
                                    this.scalePost[0], this.scalePost[1]), this.transformOrigin &&
                                t.translate(this.transformOrigin[0], this.transformOrigin[1],
                                    this.transformOrigin[2]), t
                        },
                        getProperties: function () {
                            return a.opacity = this.opacity, a.width = this.width + "px", a.height =
                                this.height + "px", a.perspective = this.perspective, a
                        }
                    };
                return Object.keys(o).forEach(function (e) {
                    c[e] = n ? u.optionOrDefault(t[e], o[e][1]) : t[e]
                }), c
            }

            function i(t, n, i) {
                var r = n && n.clone() || e({}, !0),
                    s = i ? a : function (t) {
                        return t
                    };
                return Object.keys(o).forEach(function (n) {
                    r[n] = u.optionOrDefault(t[s(n)], r[n]), r[n] && r[n].slice && (r[n] =
                        r[n].slice())
                }), r
            }
            var r = t("./matrix.js"),
                o = t("./properties.js").tweenableProperties,
                a = t("./properties.js").fromPrefixed,
                s = t("./properties.js").types,
                u = t("./utils.js");
            n.exports = {
                createState: e,
                stateFromOptions: i
            }
        }, {
            "./matrix.js": 6,
            "./properties.js": 7,
            "./utils.js": 10
        }],
        9: [function (t, n) {
            "use strict";

            function e(t, n, e) {
                function i(t, n, e, i, r) {
                    var o = n[i][0] - t[i][0],
                        a = n[i][1] - t[i][1],
                        s = n[i][2] - t[i][2];
                    e[i][0] = t[i][0] + r * o, e[i][1] = t[i][1] + r * a, e[i][2] = t[i][2] + r * s
                }

                function r(t, n, e, i, r) {
                    var o = n[i][0] - t[i][0],
                        a = n[i][1] - t[i][1];
                    e[i][0] = t[i][0] + r * o, e[i][1] = t[i][1] + r * a
                }

                function s(t, n, e, i, r) {
                    var o = n[i] - t[i];
                    e[i] = t[i] + r * o
                }
                var u = t,
                    c = n,
                    f = e,
                    p = [];
                return Object.keys(o).forEach(function (t) {
                    void 0 !== n[t] && p.push(t)
                }), {
                    tween: function (t) {
                        p.forEach(function (n) {
                            var e = o[n][0];
                            e === a.ARRAY_3 ? i(u, c, f, n, t) : e === a.ARRAY_2 ?
                                r(u, c, f, n, t) : s(u, c, f, n, t)
                        })
                    },
                    asMatrix: function () {
                        return f.asMatrix()
                    },
                    getProperties: function () {
                        return f.getProperties()
                    },
                    result: function () {
                        return f
                    },
                    setReverse: function () {
                        var t = u;
                        u = c, c = t
                    }
                }
            }

            function i(t, n, e, i) {
                var o = t(0, r()),
                    a = n,
                    s = e,
                    u = i,
                    c = !1;
                return {
                    tween: function (n) {
                        c && (n = 1 - n), o.clear(), o = t(n, o);
                        var e = s.width - a.width,
                            i = s.height - a.height,
                            r = s.opacity - a.opacity;
                        void 0 !== s.width && (u.width = a.width + n * e), void 0 !== s.height &&
                            (u.height = a.height + n * i), void 0 !== s.opacity && (u.opacity =
                                a.opacity + n * r)
                    },
                    asMatrix: function () {
                        return o
                    },
                    getProperties: function () {
                        return u.getProperties()
                    },
                    setReverse: function () {
                        c = !0
                    }
                }
            }
            var r = t("./matrix.js"),
                o = t("./properties").tweenableProperties,
                a = t("./properties").types;
            n.exports = {
                createStateTweener: e,
                createValueFeederTweener: i
            }
        }, {
            "./matrix.js": 6,
            "./properties": 7
        }],
        10: [function (t, n) {
            "use strict";

            function e(t) {
                return "function" == typeof t
            }

            function i(t, n) {
                return void 0 === t ? n : t
            }

            function r(t, n, e, i, r) {
                var o = i ? "perspective(" + i + "px) " : "",
                    a = n.asCSS(),
                    s = r ? r : "";
                e ? t.style[e] = s + o + a : t.style.transform = s + o + a
            }

            function o(t) {
                if (!t) return t;
                var n = {};
                for (var e in t) n[e] = t[e];
                return n
            }

            function a(t) {
                for (var n = t; n.parentNode;) n = n.parentNode;
                return n
            }
            var s = function (t, n) {
                for (var e in n) "perspective" !== e && (t.style[e] = n[e])
            };
            n.exports = {
                optionOrDefault: i,
                updateElementTransform: r,
                updateElementProperties: s,
                isFunction: e,
                cloneObject: o,
                findUltimateAncestor: a
            }
        }, {}]
    }, {}, [5])(5)
});