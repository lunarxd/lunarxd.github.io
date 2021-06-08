(window.webpackJsonp = window.webpackJsonp || []).push([
    [31], {
        411: function(t, e, n) {
            "use strict";
            var r = n(164),
                o = {
                    props: {
                        cssClass: {
                            type: String,
                            default: ""
                        },
                        buttonText: {
                            type: String,
                            default: "Discord"
                        },
                        redirect: {
                            type: String,
                            default: "dashboard"
                        }
                    },
                    data: function() {
                        return {
                            discordIcon: r.a,
                            isProcessing: !1,
                            redirecting: !1
                        }
                    },
                    methods: {
                        discordLogin: function() {
                            this.isProcessing = !0;
                            var t = window.open("/api/auth/discord", "_blank", "height=800,width=1000,top=0,left=0"),
                                e = this,
                                n = setInterval((function() {
                                    t.closed && (e.isProcessing = !1, clearInterval(n))
                                }), 500);
                            window.addEventListener("message", function(t) {
                                "authentication" === t.data.type && (t.data.success || this.$store.commit("setErrors", {
                                    message: t.data.message
                                }), t.data.user && t.data.user.discordProfile && (this.$store.commit("setUser", t.data.user), this.$store.commit("setAuthenticated", !0), this.redirectAfterSuccess()))
                            }.bind(this))
                        },
                        redirectAfterSuccess: function() {
                            this.$route.query.redirect ? this.$router.push(this.localePath(this.$route.query.redirect)) : (this.redirecting = !0, window.location.reload())
                        }
                    }
                },
                d = n(9),
                component = Object(d.a)(o, (function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("div", [t.redirecting ? t._e() : n("div", [n("button", {
                        staticClass: "inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-pink-500 border border-transparent rounded-md hover:bg-pink-400 focus:outline-none focus:border-pink-600 focus:shadow-outline-indigo active:bg-pink-600",
                        class: t.isProcessing ? "cursor-not-allowed" : "",
                        attrs: {
                            type: "button",
                            "cursor-not-allowed": "",
                            "aria-label": "Sign in with Discord"
                        },
                        on: {
                            click: function(e) {
                                return e.stopPropagation(), e.preventDefault(), t.discordLogin(e)
                            }
                        }
                    }, [t.isProcessing ? n("svg", {
                        staticClass: "w-5 h-5 mr-3 -ml-1 text-white animate-spin",
                        attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24"
                        }
                    }, [n("circle", {
                        staticClass: "opacity-25",
                        attrs: {
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                        }
                    }), t._v(" "), n("path", {
                        staticClass: "opacity-75",
                        attrs: {
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        }
                    })]) : t._e(), t._v(" "), t.isProcessing ? t._e() : n("fa-icon", {
                        staticClass: "-ml-0.5 mr-2 h-4 w-4",
                        attrs: {
                            icon: t.discordIcon
                        }
                    }), t._v(" "), t.isProcessing ? n("span", [t._v("Waiting for Discord")]) : n("span", [t._v(t._s(t.buttonText))])], 1)])])
                }), [], !1, null, null, null);
            e.a = component.exports
        },
        468: function(t, e, n) {
            "use strict";
            n.r(e);
            n(51), n(25), n(22), n(39), n(26), n(27), n(11), n(40);
            var r = n(15),
                o = n(60);

            function d(object, t) {
                var e = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(object);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(object, t).enumerable
                    }))), e.push.apply(e, n)
                }
                return e
            }
            var l = {
                    components: {
                        DiscordLogin: n(411).a
                    },
                    middleware: "redirectIfNotAuth",
                    asyncData: function(t) {
                        var e = t.$axios;
                        t._store;
                        return e.get("/api/ticket/mine/count").then((function(t) {
                            return {
                                ticketCount: t.data
                            }
                        })).catch((function() {
                            return {
                                ticketCount: 0
                            }
                        }))
                    },
                    data: function() {
                        return {
                            ticketCount: 0,
                            didDownloadLoader: !1,
                            isDownloading: !1
                        }
                    },
                    computed: function(t) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = null != arguments[i] ? arguments[i] : {};
                            i % 2 ? d(Object(source), !0).forEach((function(e) {
                                Object(r.a)(t, e, source[e])
                            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : d(Object(source)).forEach((function(e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
                            }))
                        }
                        return t
                    }({}, Object(o.b)(["getUser", "isAuthenticated"])),
                    methods: {
                        downloadLoader: function() {
                            var t = this;
                            this.isDownloading || (this.isDownloading = !0, this.$axios({
                                url: "/api/users/loader",
                                method: "GET",
                                responseType: "blob"
                            }).then((function(e) {
                                var n = window.URL.createObjectURL(new Blob([e.data])),
                                    link = document.createElement("a");
                                link.href = n, link.setAttribute("download", "".concat(Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10), ".exe")), document.body.appendChild(link), link.click(), t.didDownloadLoader = !0, t.isDownloading = !1
                            })))
                        }
                    }
                },
                c = n(9),
                component = Object(c.a)(l, (function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("div", {
                        staticClass: "flex flex-col flex-wrap"
                    }, [t.getUser.username ? n("div", {
                        staticClass: "px-4 py-5 my-2 mb-10 bg-white border-b border-gray-200 shadow-lg sm:rounded-lg sm:px-6 animation-fade-up"
                    }, [n("div", {
                        staticClass: "flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-no-wrap"
                    }, [n("div", {
                        staticClass: "mt-4 ml-4"
                    }, [n("div", {
                        staticClass: "flex items-center"
                    }, [n("div", {
                        staticClass: "flex-shrink-0"
                    }, [n("img", {
                        staticClass: "w-12 h-12 rounded-full",
                        attrs: {
                            src: t.getUser.avatarUrl || "https://api.hello-avatar.com/adorables/" + (t.getUser.email || Math.random()) + ".png",
                            alt: ""
                        }
                    })]), t._v(" "), n("div", {
                        staticClass: "ml-4"
                    }, [n("h3", {
                        staticClass: "text-lg font-medium leading-6 text-gray-900"
                    }, [t._v("\n              " + t._s(t.getUser.username) + "\n            ")]), t._v(" "), n("div", {
                        staticClass: "text-sm font-medium leading-none text-gray-400"
                    }, [t._v("\n              Signup date:\n              " + t._s(t.$dateFns.format(t.getUser.createdAt, "yyyy-MM-dd HH:mm:ss")) + "\n            ")]), t._v(" "), t.getUser.isLocked ? n("div", {
                        staticClass: "text-sm font-medium leading-none text-gray-400"
                    }, [t._v("\n              Account locked,\n              "), n("nuxt-link", {
                        attrs: {
                            to: t.localePath("tickets")
                        }
                    }, [t._v("open a ticket")])], 1) : t._e()])])]), t._v(" "), n("div", {
                        staticClass: "flex flex-shrink-0 mt-4 ml-4"
                    }, [n("span", {
                        staticClass: "inline-flex ml-3 rounded-md shadow-sm"
                    }, [n("nuxt-link", {
                        staticClass: "relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800",
                        attrs: {
                            to: t.localePath("tickets")
                        }
                    }, [n("svg", {
                        staticClass: "w-5 h-5 mr-2 -ml-1 text-gray-400",
                        attrs: {
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                        }
                    }, [n("path", {
                        attrs: {
                            d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        }
                    }), t._v(" "), n("path", {
                        attrs: {
                            d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        }
                    })]), t._v(" "), n("span", [t._v(" " + t._s(t.ticketCount) + " Open Tickets ")])])], 1), t._v(" "), n("span", {
                        staticClass: "inline-flex ml-3 rounded-md shadow-sm"
                    }, [t.getUser.discordId && !t.didDownloadLoader ? n("div", {
                        staticClass: "flex items-center"
                    }, [n("button", {
                        staticClass: "relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 bg-gray-800 border border-gray-300 rounded-md text-gray-50 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800",
                        class: t.isDownloading ? "cursor-not-allowed" : "",
                        on: {
                            click: t.downloadLoader
                        }
                    }, [t.isDownloading ? n("svg", {
                        staticClass: "w-5 h-5 mr-3 -ml-1 text-white animate-spin",
                        attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24"
                        }
                    }, [n("circle", {
                        staticClass: "opacity-25",
                        attrs: {
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                        }
                    }), t._v(" "), n("path", {
                        staticClass: "opacity-75",
                        attrs: {
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        }
                    })]) : t._e(), t._v("\n              Download Loader\n            ")])]) : t._e()]), t._v(" "), n("span", {
                        staticClass: "inline-flex ml-3 rounded-md shadow-sm"
                    }, [t.getUser.discordId ? t._e() : n("div", {
                        staticClass: "flex items-center"
                    }, [n("discord-login", {
                        attrs: {
                            "button-class": "relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800",
                            "button-text": "Sync your discord",
                            redirect: this.$route.current
                        }
                    })], 1)])])])]) : t._e(), t._v(" "), n("div", {
                        staticClass: "flex flex-col justify-between mb-2 pb-15 md:flex-row animation-fade-up-15"
                    }, t._l(t.getUser.subscriptions, (function(sub) {
                        return n("div", {
                            key: sub.id,
                            staticClass: "flex flex-col content-around w-full p-6 mb-10 ml-5 mr-5 transition duration-150 bg-white border-b border-gray-200 shadow-lg m-h-full md:w-1/3 xl:w-1/4 sm:rounded-lg hover:grow hover:shadow-lg"
                        }, [n("div", [n("img", {
                            staticClass: "transition duration-150 hover:grow hover:shadow-lg sm:rounded-lg",
                            attrs: {
                                src: sub.product.imageUrl ? sub.product.imageUrl : "https://dummyimage.com/400x400"
                            }
                        }), t._v(" "), n("div", {
                            staticClass: "flex items-center justify-between pt-3"
                        }, [n("p", {
                            staticClass: "text-2xl font-extrabold text-pink-500 select-none hover:text-pink-400"
                        }, [t._v("\n            " + t._s(sub.product.name) + "\n          ")])]), t._v(" "), n("p", {
                            staticClass: "pt-1 text-sm text-gray-600"
                        }, [t._v("\n          Start\n          " + t._s(t.$dateFns.format(sub.createdAt, "yyyy-MM-dd HH:mm:ss")) + "\n        ")]), t._v(" "), n("p", {
                            staticClass: "pt-1 text-gray-600"
                        }, [sub.isExpired ? n("span", {
                            staticClass: "text-sm"
                        }, [t._v("\n            Ended\n            " + t._s(t.$dateFns.formatDistance(new Date(sub.endDate), Date.now(), {
                            addSuffix: !0
                        })) + "\n          ")]) : n("span", {
                            staticClass: "text-sm"
                        }, [t._v("End:\n            " + t._s(t.$dateFns.format(sub.endDate, "yyyy-MM-dd HH:mm:ss")) + " (" + t._s(t.$dateFns.formatDistance(new Date(sub.endDate), Date.now(), {
                            addSuffix: !0
                        })) + ")")])]), t._v(" "), n("p", {
                            staticClass: "flex-grow pt-1 text-gray-600"
                        }, [sub.isExpired ? n("span", [t._v("Expired ")]) : n("span", [t._v("\n            Status: " + t._s(sub.isPaused ? "Paused" : "Active") + "\n          ")])]), t._v(" "), n("button", {
                            staticClass: "inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-pink-500 border border-transparent rounded-md hover:bg-pink-400 focus:outline-none focus:border-pink-600 focus:shadow-outline-indigo active:bg-pink-600"
                        }, [n("nuxt-link", {
                            staticClass: "text-white",
                            attrs: {
                                to: "/store/" + sub.product.slug
                            }
                        }, [t._v("Extend time")])], 1)])])
                    })), 0), t._v(" "), n("div", {
                        staticClass: "my-2 mt-5 bg-white border-b border-gray-200 shadow-lg sm:rounded-lg animation-fade-up-25"
                    }, [n("div", {
                        staticClass: "px-4 py-5 sm:p-6"
                    }, [n("h3", {
                        staticClass: "text-lg font-medium leading-6 text-gray-900"
                    }, [t._v("\n        Fiending for sex?\n      ")]), t._v(" "), t.getUser.subscriptions && 0 === t.getUser.subscriptions.length ? n("div", {
                        staticClass: "max-w-xl mt-2 text-sm leading-5 text-gray-500"
                    }, [n("p", [t._v("\n          Seems like you don't have any active subscriptions. (Refresh if subs\n          not showing up that should)\n        ")])]) : t._e(), t._v(" "), n("div", {
                        staticClass: "mt-5"
                    }, [n("span", {
                        staticClass: "inline-flex rounded-md shadow-sm"
                    }, [n("nuxt-link", {
                        staticClass: "inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-pink-500 border border-transparent rounded-md hover:bg-pink-400 focus:outline-none focus:border-pink-600 focus:shadow-outline-indigo active:bg-pink-600",
                        attrs: {
                            to: t.localePath("store")
                        }
                    }, [t._v("\n            Go to the store\n          ")])], 1)])])])])
                }), [], !1, null, null, null);
            e.default = component.exports
        }
    }
]);