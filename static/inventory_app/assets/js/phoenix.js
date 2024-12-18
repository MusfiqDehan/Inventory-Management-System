(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('bootstrap')) :
        typeof define === 'function' && define.amd ? define(['bootstrap'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.phoenix = factory(global.bootstrap));
})(this, (function (bootstrap) {
    'use strict';

    const docReady = e => {
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : setTimeout(e, 1);
    };
    const toggleColor = (e, t) => {
        const o = getItemFromStore("phoenixTheme");
        return "light" === ("auto" === o ? getSystemTheme() : o) ? e : t
    };
    const resize = e => window.addEventListener("resize", e);
    const isIterableArray = e => Array.isArray(e) && !!e.length;
    const camelize = e => {
        const t = e.replace(/[-_\s.]+(.)?/g, ((e, t) => t ? t.toUpperCase() : ""));
        return `${t.substr(0, 1).toLowerCase()}${t.substr(1)}`
    };
    const getData = (e, t) => {
        try {
            return JSON.parse(e.dataset[camelize(t)])
        } catch (o) {
            return e.dataset[camelize(t)]
        }
    };
    const hexToRgb = e => {
        let t;
        t = 0 === e.indexOf("#") ? e.substring(1) : e;
        const o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, ((e, t, o, r) => t + t + o + o + r + r)));
        return o ? [parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16)] : null
    };
    const rgbaColor = (e = "#fff", t = .5) => `rgba(${hexToRgb(e)}, ${t})`;
    const getColor = (e, t = document.documentElement) => getComputedStyle(t).getPropertyValue(`--phoenix-${e}`).trim();
    const hasClass = (e, t) => e.classList.value.includes(t);
    const addClass = (e, t) => {
        e.classList.add(t);
    };
    const getOffset = e => {
        const t = e.getBoundingClientRect(),
            o = window.pageXOffset || document.documentElement.scrollLeft,
            r = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: t.top + r,
            left: t.left + o
        }
    };
    const isScrolledIntoView = e => {
        let t = e.offsetTop,
            o = e.offsetLeft;
        const r = e.offsetWidth,
            s = e.offsetHeight;
        for (; e.offsetParent;) t += (e = e.offsetParent).offsetTop, o += e.offsetLeft;
        return {
            all: t >= window.pageYOffset && o >= window.pageXOffset && t + s <= window.pageYOffset + window.innerHeight && o + r <= window.pageXOffset + window.innerWidth,
            partial: t < window.pageYOffset + window.innerHeight && o < window.pageXOffset + window.innerWidth && t + s > window.pageYOffset && o + r > window.pageXOffset
        }
    };
    const breakpoints = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1540
    };
    const getBreakpoint = e => {
        const t = e && e.classList.value;
        let o;
        return t && (o = breakpoints[t.split(" ").filter((e => e.includes("navbar-expand-"))).pop().split("-").pop()]), o
    };
    const setCookie = (e, t, o) => {
        const r = new Date;
        r.setTime(r.getTime() + o), document.cookie = `${e}=${t};expires=${r.toUTCString()}`;
    };
    const getCookie = e => {
        const t = document.cookie.match(`(^|;) ?${e}=([^;]*)(;|$)`);
        return t ? t[2] : t
    };
    const settings = {
        tinymce: {
            theme: "oxide"
        },
        chart: {
            borderColor: "rgba(255, 255, 255, 0.8)"
        }
    };
    const newChart = (e, t) => {
        const o = e.getContext("2d");
        return new window.Chart(o, t)
    };
    const getItemFromStore = (e, t, o = localStorage) => {
        try {
            return JSON.parse(o.getItem(e)) || t
        } catch {
            return o.getItem(e) || t
        }
    };
    const setItemToStore = (e, t, o = localStorage) => o.setItem(e, t);
    const getStoreSpace = (e = localStorage) => parseFloat((escape(encodeURIComponent(JSON.stringify(e))).length / 1048576).toFixed(2));
    const getDates = (e, t, o = 864e5) => {
        const r = (t - e) / o;
        return Array.from({
            length: r + 1
        }, ((t, r) => new Date(e.valueOf() + o * r)))
    };
    const getPastDates = e => {
        let t;
        switch (e) {
            case "week":
                t = 7;
                break;
            case "month":
                t = 30;
                break;
            case "year":
                t = 365;
                break;
            default:
                t = e;
        }
        const o = new Date,
            r = o,
            s = new Date((new Date).setDate(o.getDate() - (t - 1)));
        return getDates(s, r)
    };
    const getRandomNumber = (e, t) => Math.floor(Math.random() * (t - e) + e);
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var utils = {
        docReady: docReady,
        toggleColor: toggleColor,
        resize: resize,
        isIterableArray: isIterableArray,
        camelize: camelize,
        getData: getData,
        hasClass: hasClass,
        addClass: addClass,
        hexToRgb: hexToRgb,
        rgbaColor: rgbaColor,
        getColor: getColor,
        breakpoints: breakpoints,
        getOffset: getOffset,
        isScrolledIntoView: isScrolledIntoView,
        getBreakpoint: getBreakpoint,
        setCookie: setCookie,
        getCookie: getCookie,
        newChart: newChart,
        settings: settings,
        getItemFromStore: getItemFromStore,
        setItemToStore: setItemToStore,
        getStoreSpace: getStoreSpace,
        getDates: getDates,
        getPastDates: getPastDates,
        getRandomNumber: getRandomNumber,
        getSystemTheme: getSystemTheme
    };

    const docComponentInit = () => {
        const e = document.querySelectorAll("[data-component-card]");
        const o = document.getElementById("icon-copied-toast");
        const t = new bootstrap.Toast(o);

        e.forEach((e) => {
            const c = e.querySelector(".copy-code-btn");
            const n = e.querySelector(".code-to-copy");
            const d = e.querySelector(".preview-btn");
            const r = e.querySelector(".code-collapse");
            const a = bootstrap.Collapse.getOrCreateInstance(r, { toggle: false });

            if (d) {
                d.addEventListener("click", () => {
                    a.toggle();
                });
            }

            if (c) {
                c.addEventListener("click", () => {
                    const e = document.createElement("textarea");
                    e.value = n.innerHTML;
                    document.body.appendChild(e);
                    e.select();
                    document.execCommand("copy");
                    document.body.removeChild(e);
                    o.querySelector(".toast-body").innerHTML = "<code class='text-body-quaternary'>Code has been copied to clipboard.</code>";
                    t.show();
                });
            }
        });
    };


    const orders = [{
        id: 1,
        dropdownId: "order-dropdown-1",
        orderId: "#2181",
        mailLink: "mailto:carry@example.com",
        customer: "Carry Anna",
        date: "10/03/2023",
        address: "Carry Anna, 2392 Main Avenue, Penasauka, New Jersey 02149",
        deliveryType: "Cash on Delivery",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$99"
    }, {
        id: 2,
        dropdownId: "order-dropdown-2",
        orderId: "#2182",
        mailLink: "mailto:milind@example.com",
        customer: "Milind Mikuja",
        date: "10/03/2023",
        address: "Milind Mikuja, 1 Hollywood Blvd,Beverly Hills, California 90210",
        deliveryType: "Cash on Delivery",
        status: "Processing",
        badge: {
            type: "primary",
            icon: "fas fa-redo"
        },
        amount: "$120"
    }, {
        id: 3,
        dropdownId: "order-dropdown-3",
        orderId: "#2183",
        mailLink: "mailto:stanly@example.com",
        customer: "Stanly Drinkwater",
        date: "30/04/2023",
        address: "Stanly Drinkwater, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Local Delivery",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$70"
    }, {
        id: 4,
        dropdownId: "order-dropdown-4",
        orderId: "#2184",
        mailLink: "mailto:bucky@example.com",
        customer: "Bucky Robert",
        date: "30/04/2023",
        address: "Bucky Robert, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Free Shipping",
        status: "Pending",
        badge: {
            type: "warning",
            icon: "fas fa-stream"
        },
        amount: "$92"
    }, {
        id: 5,
        dropdownId: "order-dropdown-5",
        orderId: "#2185",
        mailLink: "mailto:josef@example.com",
        customer: "Josef Stravinsky",
        date: "30/04/2023",
        address: "Josef Stravinsky, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Via Free Road",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$120"
    }, {
        id: 6,
        dropdownId: "order-dropdown-6",
        orderId: "#2186",
        mailLink: "mailto:igor@example.com",
        customer: "Igor Borvibson",
        date: "30/04/2023",
        address: "Igor Borvibson, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Free Shipping",
        status: "Processing",
        badge: {
            type: "primary",
            icon: "fas fa-redo"
        },
        amount: "$145"
    }, {
        id: 7,
        dropdownId: "order-dropdown-7",
        orderId: "#2187",
        mailLink: "mailto:katerina@example.com",
        customer: "Katerina Karenin",
        date: "30/04/2023",
        address: "Katerina Karenin, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Flat Rate",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$55"
    }, {
        id: 8,
        dropdownId: "order-dropdown-8",
        orderId: "#2188",
        mailLink: "mailto:roy@example.com",
        customer: "Roy Anderson",
        date: "29/04/2023",
        address: "Roy Anderson, 1 Infinite Loop, Cupertino, California 90210",
        deliveryType: "Local Delivery",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$90"
    }, {
        id: 9,
        dropdownId: "order-dropdown-9",
        orderId: "#2189",
        mailLink: "mailto:Stephenson@example.com",
        customer: "Thomas Stephenson",
        date: "29/04/2023",
        address: "Thomas Stephenson, 116 Ballifeary Road, Bamff",
        deliveryType: "Flat Rate",
        status: "Processing",
        badge: {
            type: "primary",
            icon: "fas fa-redo"
        },
        amount: "$52"
    }, {
        id: 10,
        dropdownId: "order-dropdown-10",
        orderId: "#2190",
        mailLink: "mailto:eviewsing@example.com",
        customer: "Evie Singh",
        date: "29/04/2023",
        address: "Evie Singh, 54 Castledore Road, Tunstead",
        deliveryType: "Flat Rate",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$90"
    }, {
        id: 11,
        dropdownId: "order-dropdown-11",
        orderId: "#2191",
        mailLink: "mailto:peter@example.com",
        customer: "David Peters",
        date: "29/04/2023",
        address: "David Peters, Rhyd Y Groes, Rhosgoch, LL66 0AT",
        deliveryType: "Local Delivery",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$69"
    }, {
        id: 12,
        dropdownId: "order-dropdown-12",
        orderId: "#2192",
        mailLink: "mailto:jennifer@example.com",
        customer: "Jennifer Johnson",
        date: "28/04/2023",
        address: "Jennifer Johnson, Rhyd Y Groes, Rhosgoch, LL66 0AT",
        deliveryType: "Flat Rate",
        status: "Processing",
        badge: {
            type: "primary",
            icon: "fas fa-redo"
        },
        amount: "$112"
    }, {
        id: 13,
        dropdownId: "order-dropdown-13",
        orderId: "#2193",
        mailLink: "mailto:okuneva@example.com",
        customer: "Demarcus Okuneva",
        date: "28/04/2023",
        address: "Demarcus Okuneva, 90555 Upton Drive Jeffreyview, UT 08771",
        deliveryType: "Flat Rate",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$99"
    }, {
        id: 14,
        dropdownId: "order-dropdown-14",
        orderId: "#2194",
        mailLink: "mailto:simeon@example.com",
        customer: "Simeon Harber",
        date: "27/04/2023",
        address: "Simeon Harber, 702 Kunde Plain Apt. 634 East Bridgetview, HI 13134-1862",
        deliveryType: "Free Shipping",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$129"
    }, {
        id: 15,
        dropdownId: "order-dropdown-15",
        orderId: "#2195",
        mailLink: "mailto:lavon@example.com",
        customer: "Lavon Haley",
        date: "27/04/2023",
        address: "Lavon Haley, 30998 Adonis Locks McGlynnside, ID 27241",
        deliveryType: "Free Shipping",
        status: "Pending",
        badge: {
            type: "warning",
            icon: "fas fa-stream"
        },
        amount: "$70"
    }, {
        id: 16,
        dropdownId: "order-dropdown-16",
        orderId: "#2196",
        mailLink: "mailto:ashley@example.com",
        customer: "Ashley Kirlin",
        date: "26/04/2023",
        address: "Ashley Kirlin, 43304 Prosacco Shore South Dejuanfurt, MO 18623-0505",
        deliveryType: "Local Delivery",
        status: "Processing",
        badge: {
            type: "primary",
            icon: "fas fa-redo"
        },
        amount: "$39"
    }, {
        id: 17,
        dropdownId: "order-dropdown-17",
        orderId: "#2197",
        mailLink: "mailto:johnnie@example.com",
        customer: "Johnnie Considine",
        date: "26/04/2023",
        address: "Johnnie Considine, 6008 Hermann Points Suite 294 Hansenville, TN 14210",
        deliveryType: "Flat Rate",
        status: "Pending",
        badge: {
            type: "warning",
            icon: "fas fa-stream"
        },
        amount: "$70"
    }, {
        id: 18,
        dropdownId: "order-dropdown-18",
        orderId: "#2198",
        mailLink: "mailto:trace@example.com",
        customer: "Trace Farrell",
        date: "26/04/2023",
        address: "Trace Farrell, 431 Steuber Mews Apt. 252 Germanland, AK 25882",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$70"
    }, {
        id: 19,
        dropdownId: "order-dropdown-19",
        orderId: "#2199",
        mailLink: "mailto:nienow@example.com",
        customer: "Estell Nienow",
        date: "26/04/2023",
        address: "Estell Nienow, 4167 Laverna Manor Marysemouth, NV 74590",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$59"
    }, {
        id: 20,
        dropdownId: "order-dropdown-20",
        orderId: "#2200",
        mailLink: "mailto:howe@example.com",
        customer: "Daisha Howe",
        date: "25/04/2023",
        address: "Daisha Howe, 829 Lavonne Valley Apt. 074 Stehrfort, RI 77914-0379",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$39"
    }, {
        id: 21,
        dropdownId: "order-dropdown-21",
        orderId: "#2201",
        mailLink: "mailto:haley@example.com",
        customer: "Miles Haley",
        date: "24/04/2023",
        address: "Miles Haley, 53150 Thad Squares Apt. 263 Archibaldfort, MO 00837",
        deliveryType: "Flat Rate",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$55"
    }, {
        id: 22,
        dropdownId: "order-dropdown-22",
        orderId: "#2202",
        mailLink: "mailto:watsica@example.com",
        customer: "Brenda Watsica",
        date: "24/04/2023",
        address: "Brenda Watsica, 9198 O'Kon Harbors Morarborough, IA 75409-7383",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$89"
    }, {
        id: 23,
        dropdownId: "order-dropdown-23",
        orderId: "#2203",
        mailLink: "mailto:ellie@example.com",
        customer: "Ellie O'Reilly",
        date: "24/04/2023",
        address: "Ellie O'Reilly, 1478 Kaitlin Haven Apt. 061 Lake Muhammadmouth, SC 35848",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$47"
    }, {
        id: 24,
        dropdownId: "order-dropdown-24",
        orderId: "#2204",
        mailLink: "mailto:garry@example.com",
        customer: "Garry Brainstrow",
        date: "23/04/2023",
        address: "Garry Brainstrow, 13572 Kurt Mews South Merritt, IA 52491",
        deliveryType: "Free Shipping",
        status: "Completed",
        badge: {
            type: "success",
            icon: "fas fa-check"
        },
        amount: "$139"
    }, {
        id: 25,
        dropdownId: "order-dropdown-25",
        orderId: "#2205",
        mailLink: "mailto:estell@example.com",
        customer: "Estell Pollich",
        date: "23/04/2023",
        address: "Estell Pollich, 13572 Kurt Mews South Merritt, IA 52491",
        deliveryType: "Free Shipping",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$49"
    }, {
        id: 26,
        dropdownId: "order-dropdown-26",
        orderId: "#2206",
        mailLink: "mailto:ara@example.com",
        customer: "Ara Mueller",
        date: "23/04/2023",
        address: "Ara Mueller, 91979 Kohler Place Waelchiborough, CT 41291",
        deliveryType: "Flat Rate",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$19"
    }, {
        id: 27,
        dropdownId: "order-dropdown-27",
        orderId: "#2207",
        mailLink: "mailto:blick@example.com",
        customer: "Lucienne Blick",
        date: "23/04/2023",
        address: "Lucienne Blick, 6757 Giuseppe Meadows Geraldinemouth, MO 48819-4970",
        deliveryType: "Flat Rate",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$59"
    }, {
        id: 28,
        dropdownId: "order-dropdown-28",
        orderId: "#2208",
        mailLink: "mailto:haag@example.com",
        customer: "Laverne Haag",
        date: "22/04/2023",
        address: "Laverne Haag, 2327 Kaylee Mill East Citlalli, AZ 89582-3143",
        deliveryType: "Flat Rate",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$49"
    }, {
        id: 29,
        dropdownId: "order-dropdown-29",
        orderId: "#2209",
        mailLink: "mailto:bednar@example.com",
        customer: "Brandon Bednar",
        date: "22/04/2023",
        address: "Brandon Bednar, 25156 Isaac Crossing Apt. 810 Lonborough, CO 83774-5999",
        deliveryType: "Flat Rate",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$39"
    }, {
        id: 30,
        dropdownId: "order-dropdown-30",
        orderId: "#2210",
        mailLink: "mailto:dimitri@example.com",
        customer: "Dimitri Boehm",
        date: "23/04/2023",
        address: "Dimitri Boehm, 71603 Wolff Plains Apt. 885 Johnstonton, MI 01581",
        deliveryType: "Flat Rate",
        status: "On Hold",
        badge: {
            type: "secondary",
            icon: "fas fa-ban"
        },
        amount: "$111"
    }],
        advanceAjaxTableInit = () => {
            const e = (e, a) => {
                e.disabled = a, e.classList[a ? "add" : "remove"]("disabled");
            },
                a = document.getElementById("advanceAjaxTable");
            if (a) {
                const d = {
                    page: 10,
                    pagination: {
                        item: "<li><button class='page' type='button'></button></li>"
                    },
                    item: e => {
                        const {
                            orderId: a,
                            id: d,
                            customer: o,
                            date: r,
                            address: n,
                            deliveryType: t,
                            status: i,
                            badge: s,
                            amount: l
                        } = e;
                        return `\n          <tr class="btn-reveal-trigger">\n            <td class="order py-2  ps-3 align-middle white-space-nowrap">\n              <a class="fw-semibold" href="https://prium.github.io/phoenix/v1.12.0/apps/e-commerce/admin/order-details.html">\n                ${a}\n              </a>\n            </td>\n            <td class="py-2 align-middle fw-bold">\n              <a class="fw-semibold text-body" href="#!">\n                ${o}\n              </a>\n            </td>\n            <td class="py-2 align-middle">\n              ${r}\n            </td>\n            <td class="py-2 align-middle white-space-nowrap">\n              ${n}\n            </td>\n            <td class="py-2 align-middle white-space-nowrap">\n              <p class="mb-0">${t}</p>\n            </td>\n            <td class="py-2 align-middle text-center fs-8 white-space-nowrap">\n              <span class="badge fs-10 badge-phoenix badge-phoenix-${s.type}">\n                ${i}\n                <span class="ms-1 ${s.icon}" data-fa-transform="shrink-2"></span>\n              </span>\n            </td>\n            <td class="py-2 align-middle text-end fs-8 fw-medium">\n              ${l}\n            </td>\n            <td class="py-2 align-middle white-space-nowrap text-end">\n              <div class="dropstart position-static d-inline-block">\n                <button class="btn btn-link text-body btn-sm dropdown-toggle btn-reveal" type='button' id="order-dropdown-${d}" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">\n                  <span class="fas fa-ellipsis-h fs-9"></span>\n                </button>\n                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="order-dropdown-${d}">\n                  <a href="#!" class="dropdown-item">View</a>\n                  <a href="#!" class="dropdown-item">Edit</a>\n                  <div class"dropdown-divider"></div>\n                  <a href="#!" class="dropdown-item text-warning">Archive</a>\n                </div>\n              </div>\n            </td>\n          </tr>\n        `
                    }
                },
                    o = a.querySelector('[data-list-pagination="next"]'),
                    r = a.querySelector('[data-list-pagination="prev"]'),
                    n = a.querySelector('[data-list-view="*"]'),
                    t = a.querySelector('[data-list-view="less"]'),
                    i = a.querySelector("[data-list-info]"),
                    s = document.querySelector("[data-list-filter]"),
                    l = new window.List(a, d, orders);
                l.on("updated", (e => {
                    const o = a.querySelector(".fallback") || document.getElementById(d.fallback);
                    o && (0 === e.matchingItems.length ? o.classList.remove("d-none") : o.classList.add("d-none"));
                }));
                const p = l.items.length,
                    c = l.page,
                    m = l.listContainer.querySelector(".btn-close");
                let u = Math.ceil(p / c),
                    y = l.visibleItems.length,
                    f = 1;
                m && m.addEventListener("search.close", (() => l.fuzzySearch("")));
                const w = () => {
                    i && (i.innerHTML = `${l.i} to ${y} of ${p}`), r && e(r, 1 === f), o && e(o, f === u), f > 1 && f < u && (e(o, !1), e(r, !1));
                };
                w(), o && o.addEventListener("click", (e => {
                    e.preventDefault(), f += 1;
                    const a = l.i + c;
                    a <= l.size() && l.show(a, c), y += l.visibleItems.length, w();
                })), r && r.addEventListener("click", (e => {
                    e.preventDefault(), f -= 1, y -= l.visibleItems.length;
                    const a = l.i - c;
                    a > 0 && l.show(a, c), w();
                }));
                const g = () => {
                    t.classList.toggle("d-none"), n.classList.toggle("d-none");
                };
                if (n && n.addEventListener("click", (() => {
                    l.show(1, p), u = 1, f = 1, y = p, w(), g();
                })), t && t.addEventListener("click", (() => {
                    l.show(1, c), u = Math.ceil(p / c), f = 1, y = l.visibleItems.length, w(), g();
                })), d.pagination && a.querySelector(".pagination").addEventListener("click", (e => {
                    "page" === e.target.classList[0] && (f = Number(e.target.innerText), w());
                })), d.filter) {
                    const {
                        key: e
                    } = d.filter;
                    s.addEventListener("change", (a => {
                        l.filter((d => "" === a.target.value || d.values()[e].toLowerCase().includes(a.target.value.toLowerCase())));
                    }));
                }
            }
        };

    const anchorJSInit = () => {
        new window.AnchorJS({
            icon: "#"
        }).add("[data-anchor]");
    };

    const bigPictureInit = () => {
        const {
            getData: e
        } = window.phoenix.utils;
        if (window.BigPicture) {
            document.querySelectorAll("[data-bigpicture]").forEach((i => {
                const t = e(i, "bigpicture"),
                    c = {
                        el: i,
                        noLoader: !0,
                        allowfullscreen: !0
                    },
                    n = window._.merge(c, t);
                i.addEventListener("click", (() => {
                    window.BigPicture(n);
                }));
            }));
        }
    };

    class DomNode {
        constructor(s) {
            this.node = s;
        }
        addClass(s) {
            this.isValidNode() && this.node.classList.add(s);
        }
        removeClass(s) {
            this.isValidNode() && this.node.classList.remove(s);
        }
        toggleClass(s) {
            this.isValidNode() && this.node.classList.toggle(s);
        }
        hasClass(s) {
            this.isValidNode() && this.node.classList.contains(s);
        }
        data(s) {
            if (this.isValidNode()) try {
                return JSON.parse(this.node.dataset[this.camelize(s)])
            } catch (t) {
                return this.node.dataset[this.camelize(s)]
            }
            return null
        }
        attr(s) {
            return this.isValidNode() && this.node[s]
        }
        setAttribute(s, t) {
            this.isValidNode() && this.node.setAttribute(s, t);
        }
        removeAttribute(s) {
            this.isValidNode() && this.node.removeAttribute(s);
        }
        setProp(s, t) {
            this.isValidNode() && (this.node[s] = t);
        }
        on(s, t) {
            this.isValidNode() && this.node.addEventListener(s, t);
        }
        isValidNode() {
            return !!this.node
        }
        camelize(s) {
            const t = s.replace(/[-_\s.]+(.)?/g, ((s, t) => t ? t.toUpperCase() : ""));
            return `${t.substr(0, 1).toLowerCase()}${t.substr(1)}`
        }
    }

    const elementMap = new Map;
    class BulkSelect {
        constructor(e, t) {
            this.element = e, this.option = {
                displayNoneClassName: "d-none",
                ...t
            }, elementMap.set(this.element, this);
        }
        static getInstance(e) {
            return elementMap.has(e) ? elementMap.get(e) : null
        }
        init() {
            this.attachNodes(), this.clickBulkCheckbox(), this.clickRowCheckbox();
        }
        getSelectedRows() {
            return Array.from(this.bulkSelectRows).filter((e => e.checked)).map((e => getData(e, "bulk-select-row")))
        }
        attachNodes() {
            const {
                body: e,
                actions: t,
                replacedElement: s
            } = getData(this.element, "bulk-select");
            this.actions = new DomNode(document.getElementById(t)), this.replacedElement = new DomNode(document.getElementById(s)), this.bulkSelectRows = document.getElementById(e).querySelectorAll("[data-bulk-select-row]");
        }
        attachRowNodes(e) {
            this.bulkSelectRows = e;
        }
        clickBulkCheckbox() {
            this.element.addEventListener("click", (() => {
                if ("indeterminate" === this.element.indeterminate) return this.actions.addClass(this.option.displayNoneClassName), this.replacedElement.removeClass(this.option.displayNoneClassName), this.removeBulkCheck(), void this.bulkSelectRows.forEach((e => {
                    const t = new DomNode(e);
                    t.checked = !1, t.setAttribute("checked", !1);
                }));
                this.toggleDisplay(), this.bulkSelectRows.forEach((e => {
                    e.checked = this.element.checked;
                }));
            }));
        }
        clickRowCheckbox() {
            this.bulkSelectRows.forEach((e => {
                new DomNode(e).on("click", (() => {
                    "indeterminate" !== this.element.indeterminate && (this.element.indeterminate = !0, this.element.setAttribute("indeterminate", "indeterminate"), this.element.checked = !0, this.element.setAttribute("checked", !0), this.actions.removeClass(this.option.displayNoneClassName), this.replacedElement.addClass(this.option.displayNoneClassName)), [...this.bulkSelectRows].every((e => e.checked)) && (this.element.indeterminate = !1, this.element.setAttribute("indeterminate", !1)), [...this.bulkSelectRows].every((e => !e.checked)) && (this.removeBulkCheck(), this.toggleDisplay());
                }));
            }));
        }
        removeBulkCheck() {
            this.element.indeterminate = !1, this.element.removeAttribute("indeterminate"), this.element.checked = !1, this.element.setAttribute("checked", !1);
        }
        toggleDisplay() {
            this.actions.toggleClass(this.option.displayNoneClassName), this.replacedElement.toggleClass(this.option.displayNoneClassName);
        }
    }
    const bulkSelectInit = () => {
        const e = document.querySelectorAll("[data-bulk-select]");
        e.length && e.forEach((e => {
            new BulkSelect(e).init();
        }));
    };

    const {
        merge: merge$2
    } = window._;
    const echartSetOption = (e, t, o, r) => {
        const {
            breakpoints: a,
            resize: n
        } = window.phoenix.utils, s = t => {
            Object.keys(t).forEach((o => {
                window.innerWidth > a[o] && e.setOption(t[o]);
            }));
        }, i = document.body;
        e.setOption(merge$2(o(), t));
        const c = document.querySelector(".navbar-vertical-toggle");
        c && c.addEventListener("navbar.vertical.toggle", (() => {
            e.resize(), r && s(r);
        })), n((() => {
            e.resize(), r && s(r);
        })), r && s(r), i.addEventListener("clickControl", (({
            detail: {
                control: r
            }
        }) => {
            "phoenixTheme" === r && e.setOption(window._.merge(o(), t));
        }));
    };
    const echartTabs = document.querySelectorAll("[data-tab-has-echarts]");

    echartTabs && echartTabs.forEach((e) => {
        e.addEventListener("shown.bs.tab", (e) => {
            const target = e.target;
            const { hash: o } = target;
            const r = o || target.dataset.bsTarget;
            const a = document.getElementById(r.substring(1));

            if (a) {
                const echart = window.echarts.init(a);
                echart.resize();
            }
        });
    });


    const basicEchartsInit = () => {
        const {
            getColor: t,
            getData: o,
            getDates: e
        } = window.phoenix.utils;
        document.querySelectorAll("[data-echarts]").forEach((r => {
            const a = o(r, "echarts"),
                i = window.echarts.init(r);
            echartSetOption(i, a, (() => ({
                color: t("primary"),
                tooltip: {
                    trigger: "item",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0
                },
                xAxis: {
                    type: "category",
                    data: e(new Date("5/1/2022"), new Date("5/7/2022"), 864e5),
                    show: !0,
                    boundaryGap: !1,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLabel: {
                        formatter: t => window.dayjs(t).format("DD MMM"),
                        interval: 6,
                        showMinLabel: !0,
                        showMaxLabel: !0,
                        color: t("secondary-color")
                    }
                },
                yAxis: {
                    show: !1,
                    type: "value",
                    boundaryGap: !1
                },
                series: [{
                    type: "bar",
                    symbol: "none"
                }],
                grid: {
                    left: 22,
                    right: 22,
                    top: 0,
                    bottom: 20
                }
            })));
        }));
    };

    const reportsDetailsChartInit = () => {
        const {
            getColor: t,
            getData: o,
            toggleColor: e
        } = window.phoenix.utils, i = document.querySelector(".echart-reports-details"), r = (t, o = "MMM DD") => {
            let e = "";
            return t.forEach((t => {
                e += `<div class='ms-1'>\n          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${t.color}"></span>\n            ${t.seriesName} : ${"object" == typeof t.value ? t.value[1] : t.value}\n          </h6>\n        </div>`;
            })), `<div>\n              <p class='mb-2 text-body-tertiary'>\n                ${window.dayjs(t[0].axisValue).isValid() ? window.dayjs(t[0].axisValue).format("DD MMM, YYYY") : t[0].axisValue}\n              </p>\n              ${e}\n            </div>`
        }, a = [64, 40, 45, 62, 82];
        if (i) {
            const l = o(i, "echarts"),
                n = window.echarts.init(i);
            echartSetOption(n, l, (() => ({
                color: [t("primary-lighter"), t("info-light")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: "none"
                    },
                    formatter: r
                },
                xAxis: {
                    type: "category",
                    data: ["Analysis", "Statement", "Action", "Offering", "Interlocution"],
                    axisLabel: {
                        color: t("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 600,
                        fontSize: 12.8,
                        rotate: 30,
                        formatter: t => `${t.slice(0, 5)}...`
                    },
                    axisLine: {
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisTick: !1
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: t("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700,
                        fontSize: 12.8,
                        margin: 24,
                        formatter: t => `${t}%`
                    }
                },
                series: [{
                    name: "Revenue",
                    type: "bar",
                    barWidth: "32px",
                    barGap: "48%",
                    showBackground: !0,
                    backgroundStyle: {
                        color: e(t("primary-bg-subtle"), t("body-highlight-bg"))
                    },
                    label: {
                        show: !1
                    },
                    itemStyle: {
                        color: e(t("primary-light"), t("primary"))
                    },
                    data: a
                }],
                grid: {
                    right: "0",
                    left: "0",
                    bottom: 0,
                    top: 10,
                    containLabel: !0
                },
                animation: !1
            })));
        }
    };

    const chatInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, t = ".chat-sidebar", a = ".chat-textarea", c = "[data-chat-thread]", r = "[data-chat-thread-tab]", o = "[data-chat-thread-tab-content]", s = document.querySelector(t), l = document.querySelector(a), n = document.querySelectorAll(c), d = document.querySelector(r), i = document.querySelector(o);
        if (d) {
            const t = d.querySelectorAll("[data-bs-toggle='tab']"),
                a = new window.List(i, {
                    valueNames: ["read", "unreadItem"]
                }),
                c = document.querySelector(".chat .card-body");
            c.scrollTop = c.scrollHeight, t.forEach((t => t.addEventListener("shown.bs.tab", (() => {
                const c = e(t, "chat-thread-list");
                a.filter((e => "all" === c || e.elm.classList.contains(c)));
            }))));
        }
        n.forEach((e => {
            e.addEventListener("click", (() => {
                if (s.classList.remove("show"), e.classList.contains("unread")) {
                    e.classList.remove("unread");
                    const t = e.querySelector(".unread-badge");
                    t && t.remove();
                }
            }));
        })), l && l.setAttribute("placeholder", "Type your message...");
    };

    const choicesInit = () => {
        if (window.Choices) {
            document.querySelectorAll("[data-choices]").forEach((element) => {
                const options = window.phoenix.utils.getData(element, "options");
                const choices = new window.Choices(element, {
                    itemSelectText: "",
                    addItems: true,
                    ...options
                });

                document.querySelectorAll(".needs-validation").forEach((form) => {
                    const validateChoices = () => {
                        form.querySelectorAll(".choices").forEach((choicesElement) => {
                            const singleList = choicesElement.querySelector(".choices__list--single");
                            const multipleList = choicesElement.querySelector(".choices__list--multiple");

                            if (form.querySelector("[required]")) {
                                if (singleList) {
                                    const selectedItem = singleList.querySelector(".choices__item--selectable");
                                    if (selectedItem && selectedItem.getAttribute("data-value")) {
                                        form.classList.remove("invalid");
                                        form.classList.add("valid");
                                    } else {
                                        form.classList.remove("valid");
                                        form.classList.add("invalid");
                                    }
                                }

                                if (multipleList) {
                                    const options = choicesElement.getElementsByTagName("option");
                                    if (options.length) {
                                        form.classList.remove("invalid");
                                        form.classList.add("valid");
                                    } else {
                                        form.classList.remove("valid");
                                        form.classList.add("invalid");
                                    }
                                }
                            }
                        });
                    };

                    form.addEventListener("submit", validateChoices);
                    element.addEventListener("change", validateChoices); // Assuming 'element' refers to the Choices instance
                });
            });
        }
    };


    const copyLink = () => {
        const {
            getData: t
        } = window.phoenix.utils;
        document.querySelectorAll("[data-copy]").forEach((e => {
            const o = new window.bootstrap.Tooltip(e);
            e.addEventListener("mouseover", (() => o.show())), e.addEventListener("mouseleave", (() => o.hide())), e.addEventListener("click", (() => {
                e.setAttribute("data-bs-original-title", "Copied"), o.show();
                const i = t(e, "copy"),
                    a = document.querySelector(i);
                a.select(), navigator.clipboard.writeText(a.value), e.setAttribute("data-bs-original-title", "click to copy");
            }));
        }));
    };

    const countupInit = () => {
        const {
            getData: o
        } = window.phoenix.utils;
        if (window.countUp) {
            document.querySelectorAll("[data-countup]").forEach((t => {
                const {
                    endValue: n,
                    ...u
                } = o(t, "countup"), e = new window.countUp.CountUp(t, n, {
                    duration: 4,
                    ...u
                });
                e.error ? console.error(e.error) : e.start();
            }));
        }
    };

    const createBoardInit = () => {
        const { getData: e } = window.phoenix.utils;

        const t = "[data-create-board]";
        const r = "[data-wizard-step]";
        const a = "[data-wizard-form]";
        const o = "[data-kanban-step]";
        const n = "[data-board-prev-btn]";
        const c = "[data-custom-color-radio]";
        const d = "submit";
        const l = "show.bs.tab";
        const s = "click";
        const u = "change";

        const i = document.querySelector(t);

        if (i) {
            const m = i.querySelectorAll(r);
            const w = Array.from(m).map((e) => window.bootstrap.Tab.getOrCreateInstance(e));

            const prevButton = document.querySelector(n);
            if (prevButton) {
                prevButton.addEventListener(s, () => {
                    w[w.length - 2].show();
                });
            }

            m.length &&
                m.forEach((t) => {
                    t.addEventListener(l, () => {
                        const r = e(t, "wizard-step");
                        const a = document.querySelector(o);
                        if (a) {
                            a.textContent = r;
                        }
                    });
                });

            const forms = i.querySelectorAll(a);
            forms.forEach((e, r) => {
                e.addEventListener(d, (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());

                    if (r + 1 === forms.length) {
                        window.location.reload();
                    }

                    return null;
                });
            });

            const colorInput = document.querySelector("#customColorInput");
            if (colorInput) {
                colorInput.addEventListener(u, (e) => {
                    const value = e.target.value;
                    const colorRadio = document.querySelector(c);
                    colorRadio.setAttribute("checked", "checked");
                    colorRadio.value = value;
                });
            }
        }
    };


    const detectorInit = () => {
        const {
            addClass: e
        } = window.phoenix.utils, {
            is: o
        } = window, i = document.querySelector("html");
        o.opera() && e(i, "opera"), o.mobile() && e(i, "mobile"), o.firefox() && e(i, "firefox"), o.safari() && e(i, "safari"), o.ios() && e(i, "ios"), o.iphone() && e(i, "iphone"), o.ipad() && e(i, "ipad"), o.ie() && e(i, "ie"), o.edge() && e(i, "edge"), o.chrome() && e(i, "chrome"), o.mac() && e(i, "osx"), o.windows() && e(i, "windows"), navigator.userAgent.match("CriOS") && e(i, "chrome");
    };

    const dropdownOnHover = () => {
        const dropdown = document.querySelector("[data-dropdown-on-hover]");

        if (dropdown) {
            dropdown.addEventListener("mouseover", (e) => {
                if (e.target && e.target.classList.contains("dropdown-toggle") && !e.target.parentNode.className.includes("dropdown-inside") && window.innerWidth > 992) {
                    const bootstrapDropdown = new window.bootstrap.Dropdown(e.target);
                    bootstrapDropdown._element.classList.add("show");
                    bootstrapDropdown._menu.classList.add("show");
                    bootstrapDropdown._menu.setAttribute("data-bs-popper", "none");

                    e.target.parentNode.addEventListener("mouseleave", () => {
                        if (window.innerWidth > 992) {
                            bootstrapDropdown.hide();
                        }
                    });
                }
            });
        }
    };


    const {
        merge: merge$1
    } = window._;
    window.Dropzone && (window.Dropzone.autoDiscover = !1);
    const dropzoneInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, o = "[data-dropzone]", r = ".dz-preview", t = ".dz-preview .dz-preview-cover", i = "dz-file-processing", l = "dz-file-complete", n = "dz-processing", s = "options", a = "addedfile", c = "removedfile", d = "complete", u = document.querySelectorAll(o);
        u.length && u.forEach((o => {
            let u = e(o, s);
            u = u || {};
            const m = u.data ? u.data : {},
                p = merge$1({
                    url: "/assets/php/",
                    addRemoveLinks: !1,
                    previewsContainer: o.querySelector(r),
                    previewTemplate: o.querySelector(r).innerHTML,
                    thumbnailWidth: null,
                    thumbnailHeight: null,
                    maxFilesize: 2,
                    autoProcessQueue: !1,
                    filesizeBase: 1e3,
                    init: function () {
                        const e = this;
                        m.length && m.forEach((o => {
                            const r = {
                                name: o.name,
                                size: o.size
                            };
                            e.options.addedfile.call(e, r), e.options.thumbnail.call(e, r, `${o.url}/${o.name}`);
                        })), e.on(a, (function () {
                            "maxFiles" in u && (1 === u.maxFiles && o.querySelectorAll(t).length > 1 && o.querySelector(t).remove(), 1 === u.maxFiles && this.files.length > 1 && this.removeFile(this.files[0]));
                        }));
                    },
                    error(e, o) {
                        if (e.previewElement) {
                            e.previewElement.classList.add("dz-error"), "string" != typeof o && o.error && (o = o.error);
                            for (let r of e.previewElement.querySelectorAll("[data-dz-errormessage]")) r.textContent = o;
                        }
                    }
                }, u);
            o.querySelector(r).innerHTML = "";
            const w = new window.Dropzone(o, p);
            w.on(a, (() => {
                o.querySelector(t) && o.querySelector(t).classList.remove(l), o.classList.add(i);
            })), w.on(c, (() => {
                o.querySelector(t) && o.querySelector(t).classList.remove(n), o.classList.add(l);
            })), w.on(d, (() => {
                o.querySelector(t) && o.querySelector(t).classList.remove(n), o.classList.add(l);
            }));
        }));
    };

    const featherIconsInit = () => {
        window.feather && window.feather.replace({
            width: "16px",
            height: "16px"
        });
    };

    const flatpickrInit = () => {
        const {
            getData: e
        } = window.phoenix.utils;
        document.querySelectorAll(".datetimepicker").forEach((t => {
            const o = e(t, "options");
            window.flatpickr(t, {
                nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg>',
                prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg>',
                locale: {
                    firstDayOfWeek: 0,
                    shorthand: ["S", "M", "T", "W", "T", "F", "S"]
                },
                monthSelectorType: "static",
                onDayCreate: (e, t, o, s) => {
                    5 !== s.dateObj.getDay() && 6 !== s.dateObj.getDay() || (s.className += " weekend-days");
                },
                ...o
            });
        }));
    };

    const formValidationInit = () => {
        document.querySelectorAll(".needs-validation").forEach((t => {
            t.addEventListener("submit", (a => {
                t.checkValidity() || (a.preventDefault(), a.stopPropagation()), t.classList.add("was-validated");
            }), !1);
        }));
    };



    const fullCalendarInit = () => {
        const {
            getData: e
        } = window.phoenix.utils;
        document.querySelectorAll("[data-calendar]").forEach((t => {
            const r = e(t, "calendar");
            renderCalendar(t, r);
        }));
    };

    const glightboxInit = () => {
        window.GLightbox && window.GLightbox({
            selector: "[data-gallery]"
        });
    };

    function initMap() {
        const {
            getData: e
        } = window.phoenix.utils, t = document.body, l = document.querySelectorAll("[data-googlemap]");
        if (l.length && window.google) {
            const i = (e, t) => {
                const l = document.createElement("button");
                return l.classList.add(t), l.innerHTML = "zoomIn" === t ? '<span class="fas fa-plus text-body-emphasis"></span>' : '<span class="fas fa-minus text-body-emphasis"></span>', l.addEventListener("click", (() => {
                    const l = e.getZoom();
                    "zoomIn" === t && e.setZoom(l + 1), "zoomOut" === t && e.setZoom(l - 1);
                })), l
            },
                s = {
                    SnazzyCustomLight: [{
                        featureType: "administrative",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [{
                            color: "#525b75"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative.country",
                        elementType: "geometry.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#ffffff"
                        }]
                    }, {
                        featureType: "administrative.province",
                        elementType: "geometry.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#E3E6ED"
                        }]
                    }, {
                        featureType: "landscape.natural",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "all",
                        stylers: [{
                            color: "#eff2f6"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#eff2f6"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#9fa6bc"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#eff2f6"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#9fa6bc"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "labels.text",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.station.airport",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.station.airport",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#F5F7FA"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }],
                    SnazzyCustomDark: [{
                        featureType: "administrative",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [{
                            color: "#8a94ad"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative.country",
                        elementType: "geometry.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }]
                    }, {
                        featureType: "administrative.province",
                        elementType: "geometry.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#222834"
                        }]
                    }, {
                        featureType: "landscape.natural",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "all",
                        stylers: [{
                            color: "#141824"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#141824"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#525b75"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#141824"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#67718A"
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "labels.text",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.station.airport",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit.station.airport",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#0f111a"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }]
                };
            l.forEach((l => {
                const o = e(l, "latlng").split(","),
                    r = l.innerHTML,
                    a = e(l, "zoom"),
                    y = l,
                    n = e(l, "phoenixTheme");
                if ("streetview" === e(l, "phoenixTheme")) {
                    const t = e(l, "pov"),
                        i = {
                            position: {
                                lat: Number(o[0]),
                                lng: Number(o[1])
                            },
                            pov: t,
                            zoom: a,
                            gestureHandling: "none",
                            scrollwheel: !1
                        };
                    return new window.google.maps.StreetViewPanorama(y, i)
                }
                const p = {
                    zoom: a,
                    minZoom: 1.2,
                    clickableIcons: !1,
                    zoomControl: !1,
                    zoomControlOptions: {
                        position: window.google.maps.ControlPosition.LEFT
                    },
                    scrollwheel: e(l, "scrollwheel"),
                    disableDefaultUI: !0,
                    center: new window.google.maps.LatLng(o[0], o[1]),
                    styles: "dark" === window.config.config.phoenixTheme ? s.SnazzyCustomDark : s[n || "SnazzyCustomLight"]
                },
                    f = new window.google.maps.Map(y, p),
                    m = new window.google.maps.InfoWindow({
                        content: r
                    }),
                    T = document.createElement("div");
                T.classList.add("google-map-control-btn");
                const b = i(f, "zoomIn"),
                    u = i(f, "zoomOut");
                T.appendChild(b), T.appendChild(u), f.controls[window.google.maps.ControlPosition.LEFT].push(T);
                const c = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(o[0], o[1]),
                    map: f
                });
                c.addListener("click", (() => {
                    m.open(f, c);
                })), t && t.addEventListener("clickControl", (({
                    detail: {
                        control: e,
                        value: t
                    }
                }) => {
                    "phoenixTheme" === e && f.set("styles", "dark" === t ? s.SnazzyCustomDark : s.SnazzyCustomLight);
                }));
            }));
        }
    }

    const iconCopiedInit = () => {
        const e = document.getElementById("icon-list"),
            t = document.getElementById("icon-copied-toast"),
            o = new window.bootstrap.Toast(t);
        e && e.addEventListener("click", (e => {
            const n = e.target;
            "INPUT" === n.tagName && (n.select(), n.setSelectionRange(0, 99999), document.execCommand("copy"), t.querySelector(".toast-body").innerHTML = `<span class="fw-black">Copied:</span>  <code>${n.value}</code>`, o.show());
        }));
    };

    const isotopeInit = () => {
        const { getData: e } = window.phoenix.utils;
        const t = ".isotope-item";
        const o = "[data-sl-isotope]";
        const i = "[data-filter]";
        const a = "[data-filter-nav]";
        const l = "sl-isotope";
        const r = "active";

        if (window.Isotope) {
            const s = document.querySelectorAll(o);
            s.length && s.forEach((o) => {
                window.imagesLoaded(o, () => {
                    o.querySelectorAll(t).forEach((e) => {
                        e.style.visibility = "visible";
                    });

                    const s = e(o, l);
                    const n = {
                        itemSelector: t,
                        layoutMode: "packery",
                    };
                    const c = window._.merge(n, s);
                    const d = new window.Isotope(o, c);

                    const filterNav = document.querySelector(a); // Removed optional chaining
                    if (filterNav) {
                        filterNav.addEventListener("click", (function (e) {
                            const t = e.target.dataset.filter;
                            d.arrange({ filter: t });
                            document.querySelectorAll(i).forEach((e) => {
                                e.classList.remove(r);
                            });
                            e.target.classList.add(r);
                        }));
                    }

                    return d;
                });
            });
        }
    };


    const togglePaginationButtonDisable = (e, t) => {
        e.disabled = t, e.classList[t ? "add" : "remove"]("disabled");
    },
        listInit = () => {
            const {
                getData: e
            } = window.phoenix.utils;
            if (window.List) {
                const t = document.querySelectorAll("[data-list]");
                t.length && t.forEach((t => {
                    const a = t.querySelector("[data-bulk-select]");
                    let n = e(t, "list");
                    n.pagination && (n = {
                        ...n,
                        pagination: {
                            item: "<li><button class='page' type='button'></button></li>",
                            ...n.pagination
                        }
                    });
                    const i = t.querySelector('[data-list-pagination="next"]'),
                        s = t.querySelector('[data-list-pagination="prev"]'),
                        l = t.querySelector('[data-list-view="*"]'),
                        o = t.querySelector('[data-list-view="less"]'),
                        c = t.querySelector("[data-list-info]"),
                        r = t.querySelector("[data-list-filter]"),
                        g = new List(t, n);
                    let d = g.items.length;
                    const h = g.page,
                        u = g.listContainer.querySelector(".btn-close");
                    let m = Math.ceil(g.size() / g.page),
                        p = 1,
                        b = (p - 1) * Number(g.page) + g.visibleItems.length,
                        y = !1;
                    u && u.addEventListener("search.close", (() => {
                        g.fuzzySearch("");
                    }));
                    const v = () => {
                        c && (c.innerHTML = `${g.i} to ${b} <span class='text-body-tertiary'> Items of </span>${d}`), s && togglePaginationButtonDisable(s, 1 === p || 0 === p), i && togglePaginationButtonDisable(i, p === m || 0 === p), p > 1 && p < m && (togglePaginationButtonDisable(i, !1), togglePaginationButtonDisable(s, !1));
                    };
                    v(), i && i.addEventListener("click", (e => {
                        e.preventDefault(), p += 1;
                        const t = g.i + h;
                        t <= g.size() && g.show(t, h);
                    })), s && s.addEventListener("click", (e => {
                        e.preventDefault(), p -= 1;
                        const t = g.i - h;
                        t > 0 && g.show(t, h);
                    }));
                    const f = () => {
                        o.classList.toggle("d-none"), l.classList.toggle("d-none");
                    };
                    if (l && l.addEventListener("click", (() => {
                        g.show(1, d), p = 1, f();
                    })), o && o.addEventListener("click", (() => {
                        g.show(1, h), p = 1, f();
                    })), n.pagination && t.querySelector(".pagination").addEventListener("click", (e => {
                        if ("page" === e.target.classList[0]) {
                            const t = Number(e.target.getAttribute("data-i"));
                            t && (g.show(h * (t - 1) + 1, g.page), p = t);
                        }
                    })), n.filter) {
                        const {
                            key: e
                        } = n.filter;
                        r.addEventListener("change", (t => {
                            g.filter((a => "" === t.target.value || (m = Math.ceil(g.matchingItems.length / g.page), p = 1, v(), a.values()[e].toLowerCase().includes(t.target.value.toLowerCase()))));
                        }));
                    }
                    if (a) {
                        window.phoenix.BulkSelect.getInstance(a).attachRowNodes(g.items.map((e => e.elm.querySelector("[data-bulk-select-row]")))), a.addEventListener("change", (() => {
                            g && (a.checked ? g.items.forEach((e => {
                                e.elm.querySelector("[data-bulk-select-row]").checked = !0;
                            })) : g.items.forEach((e => {
                                e.elm.querySelector("[data-bulk-select-row]").checked = !1;
                            })));
                        }));
                    }
                    g.on("searchStart", (() => {
                        y = !0;
                    })), g.on("searchComplete", (() => {
                        y = !1;
                    })), g.on("updated", (e => {
                        m = g.matchingItems.length ? Math.ceil(g.matchingItems.length / g.page) : Math.ceil(g.size() / g.page), b = (p - 1) * Number(g.page) + g.visibleItems.length, v(), y && (p = 0 === g.matchingItems.length ? 0 : 1, d = g.matchingItems.length, b = (0 === p ? 1 : p - 1) * Number(g.page) + g.visibleItems.length, v(), c && (c.innerHTML = `${0 === g.matchingItems.length ? 0 : g.i} to ${0 === g.matchingItems.length ? 0 : b} <span class='text-body-tertiary'> Items of </span>${g.matchingItems.length}`));
                        const a = t.querySelector(".fallback") || document.getElementById(n.fallback);
                        a && (0 === e.matchingItems.length ? a.classList.remove("d-none") : a.classList.add("d-none"));
                    }));
                }));
            }
        };

    const lottieInit = () => {
        const {
            getData: o
        } = window.phoenix.utils, t = document.querySelectorAll(".lottie");
        t.length && t.forEach((t => {
            const n = o(t, "options");
            window.bodymovin.loadAnimation({
                container: t,
                path: "../img/animated-icons/warning-light.json",
                renderer: "svg",
                loop: !0,
                autoplay: !0,
                name: "Hello World",
                ...n
            });
        }));
    };

    const modalInit = () => {
        const o = document.querySelectorAll("[data-phoenix-modal]");
        o && o.forEach((o => {
            o.addEventListener("shown.bs.modal", (() => {
                o.querySelectorAll("[autofocus=autofocus]").forEach((o => {
                    o.focus();
                }));
            }));
        }));
    };

    const navbarComboInit = () => {
        const {
            getBreakpoint: e,
            getData: n,
            addClass: r,
            hasClass: t,
            resize: o
        } = window.phoenix.utils, a = ".navbar-vertical", c = '[data-navbar-top="combo"]', i = ".collapse", l = "[data-move-container]", s = ".navbar-nav", d = ".navbar-vertical-divider", v = "flex-column", u = document.querySelector(a), m = document.querySelector(c), b = o => {
            const a = e(u),
                c = e(m);
            if (o < c) {
                const e = m.querySelector(i),
                    t = e.innerHTML;
                if (t) {
                    const o = n(m, "move-target"),
                        i = document.querySelector(o);
                    if (e.innerHTML = "", i.insertAdjacentHTML("afterend", `\n            <div data-move-container class='move-container'>\n              <div class='navbar-vertical-divider'>\n                <hr class='navbar-vertical-hr' />\n              </div>\n              ${t}\n            </div>\n          `), a < c) {
                        const e = document.querySelector(l).querySelector(s);
                        r(e, v);
                    }
                }
            } else {
                const e = document.querySelector(l);
                if (e) {
                    const n = e.querySelector(s);
                    t(n, v) && n.classList.remove(v), e.querySelector(d).remove(), m.querySelector(i).innerHTML = e.innerHTML, e.remove();
                }
            }
        };
        b(window.innerWidth), o((() => b(window.innerWidth)));
    };

    const navbarShadowOnScrollInit = () => {
        const a = document.querySelector("[data-navbar-shadow-on-scroll]");
        a && (window.onscroll = () => {
            window.scrollY > 300 ? a.classList.add("navbar-shadow") : a.classList.remove("navbar-shadow");
        });
    };

    const navbarInit = () => {
        const n = document.querySelector("[data-navbar-soft-on-scroll]");
        if (n) {
            const t = window.innerHeight,
                e = () => {
                    let e = window.pageYOffset / t * 2;
                    e >= 1 && (e = 1), n.style.backgroundColor = `rgba(255, 255, 255, ${e})`;
                };
            e(), document.addEventListener("scroll", (() => e()));
        }
    };

    const handleNavbarVerticalCollapsed = () => {
        const { getItemFromStore: e, setItemToStore: t, resize: a } = window.phoenix.utils;
        const o = "body";
        const n = ".navbar-vertical";
        const l = ".navbar-vertical-toggle";
        const r = ".navbar-vertical .navbar-collapse";
        const c = ".navbar-vertical .nav-link.active";
        const s = "click";
        const i = "navbar.vertical.toggle";
        const d = "navbar-vertical-collapsed";
        const v = document.querySelector(l);
        const m = document.querySelector(r);
        const u = document.querySelector(c);

        if (v && v.addEventListener(s, (a) => {
            const o = e("phoenixIsNavbarVerticalCollapsed", !1);
            v.blur();
            document.documentElement.classList.toggle(d);
            t("phoenixIsNavbarVerticalCollapsed", !o);

            const n = new CustomEvent(i);
            // Dispatch the event on the current target (the toggle button)
            a.currentTarget.dispatchEvent(n);
        })) {
            const t = e("phoenixIsNavbarVerticalCollapsed", !1);
            u && !t && u.scrollIntoView({ behavior: "smooth" });
        }

        const b = () => {
            const e = document.querySelector(o).offsetHeight;
            const t = document.querySelector(n)?.offsetHeight;
            document.documentElement.classList.contains(d) && e < t ? document.documentElement.style.minHeight = `${t}px` : document.documentElement.removeAttribute("style");
        };

        b();
        a((() => {
            b();
        }));
        v && v.addEventListener("navbar.vertical.toggle", (() => {
            b();
        }));
    };


    const phoenixOffcanvasInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, o = document.querySelectorAll("[data-phoenix-toggle='offcanvas']"), t = document.querySelector("[data-phoenix-backdrop]"), a = document.querySelector("[data-phoenix-scroll]"), c = document.querySelector(".faq"), n = document.querySelector(".faq-sidebar"), s = e => {
            e.classList.remove("show"), document.body.style.removeProperty("overflow");
        };
        o && o.forEach((o => {
            const c = e(o, "phoenix-target"),
                n = document.querySelector(c),
                d = n.querySelectorAll("[data-phoenix-dismiss='offcanvas']");
            o.addEventListener("click", (() => {
                n.classList.add("show"), a || (document.body.style.overflow = "hidden");
            })), d && d.forEach((e => {
                e.addEventListener("click", (() => {
                    s(n);
                }));
            })), t && t.addEventListener("click", (() => {
                s(n);
            }));
        })), c && n.classList.contains("show") && (c.classList.add = "newFaq");
    };

    const picmoInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, t = document.querySelectorAll("[data-picmo]");
        t && Array.from(t).forEach((t => {
            const o = e(t, "picmo"),
                n = window.picmoPopup.createPopup({}, {
                    referenceElement: t,
                    triggerElement: t,
                    position: "bottom-start",
                    showCloseButton: !1
                });
            t.addEventListener("click", (() => {
                n.toggle();
            }));
            const i = document.querySelector(o.inputTarget);
            n.addEventListener("emoji:select", (e => {
                i && (i.innerHTML += e.emoji);
            }));
        }));
    };

    const popoverInit = () => {
        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).map((o => new bootstrap.Popover(o)));
    };

    const getThumnailDirection = () => window.innerWidth < 768 || window.innerWidth >= 992 && window.innerWidth < 1200 ? "horizontal" : "vertical";

    const productDetailsInit = () => {
        const { getData: e, resize: t } = window.phoenix.utils;
        const i = document.querySelector("[data-product-details]");

        if (i) {
            const r = i.querySelector("[data-product-color]"); // Removed optional chaining
            const n = i.querySelector("[data-product-quantity]"); // Removed optional chaining
            const a = i.querySelector("[data-product-color-variants]"); // Removed optional chaining

            const c = (r) => {
                const n = i.querySelector("[data-products-swiper]");
                const a = e(n, "swiper");
                const c = e(n, "thumb-target");
                const s = document.getElementById(c);

                let o = "";
                r.forEach((e) => {
                    o += `\n  <div class='swiper-slide '>\n    <img class='w-100' src=${e} alt="">\n  </div>\n`;
                });
                n.innerHTML = `<div class='swiper-wrapper'>${o}</div>`;

                let d = "";
                r.forEach((e) => {
                    d += `\n  <div class='swiper-slide '>\n    <div class="product-thumb-container p-2 p-sm-3 p-xl-2">\n      <img src=${e} alt="">\n    </div>\n  </div>\n`;
                });
                s.innerHTML = `<div class='swiper-wrapper'>${d}</div>`;

                const l = new window.Swiper(s, {
                    slidesPerView: 5,
                    spaceBetween: 16,
                    direction: getThumnailDirection(),
                    breakpoints: {
                        768: {
                            spaceBetween: 100
                        },
                        992: {
                            spaceBetween: 16
                        }
                    }
                });

                const p = n.querySelector(".swiper-nav");
                t(() => {
                    l.changeDirection(getThumnailDirection());
                });

                new Swiper(n, {
                    ...a,
                    navigation: {
                        nextEl: p?.querySelector(".swiper-button-next"), // Optional chaining for potential absence of ".swiper-nav"
                        prevEl: p?.querySelector(".swiper-button-prev") // Optional chaining for potential absence of ".swiper-nav"
                    },
                    thumbs: {
                        swiper: l
                    }
                });
            };

            const s = a.querySelectorAll("[data-variant]");
            s.forEach((t) => {
                if (t.classList.contains("active")) {
                    c(e(t, "products-images"));
                    r.innerHTML = e(t, "variant");
                }
                const i = e(t, "products-images");
                t.addEventListener("click", () => {
                    c(i);
                    s.forEach((e) => e.classList.remove("active"));
                    t.classList.add("active");
                    r.innerHTML = e(t, "variant");
                });
            });

            n.addEventListener("change", (e) => {
                if (e.target.value === "") {
                    e.target.value = 0;
                }
            });
        }
    };


    const quantityInit = () => {
        const {
            getData: t
        } = window.phoenix.utils, e = "[data-quantity] [data-type]", a = "[data-quantity]", n = '[data-quantity] input[type="number"]', u = "click", i = "min", r = "type";
        document.querySelectorAll(e).forEach((e => {
            e.addEventListener(u, (e => {
                const u = e.currentTarget,
                    l = t(u, r),
                    c = u.closest(a).querySelector(n),
                    o = c.getAttribute(i);
                let y = parseInt(c.value, 10);
                "plus" === l ? y += 1 : y = y > o ? y -= 1 : y, c.value = y;
            }));
        }));
    };

    const randomColorInit = () => {
        const {
            getData: o
        } = window.phoenix.utils, t = document.querySelectorAll("[data-random-color]"), r = ["#85A9FF", "#60C6FF", "#90D67F", "#F48270", "#3874FF", "#0097EB", "#25B003", "#EC1F00", "#E5780B", "#004DFF", "#0080C7", "#23890B", "#CC1B00", "#D6700A", "#222834", "#3E465B", "#6E7891", "#9FA6BC"];
        t.forEach((t => {
            const e = o(t, "random-color");
            let n;
            n = Array.isArray(e) ? [...r, ...e] : [...r], t.addEventListener("click", (o => {
                const t = n[Math.floor(Math.random() * (n.length - 1))];
                o.target.value = t;
                const r = o.target.nextElementSibling;
                r.style.background = `${t}`, r.style.borderColor = `${t}`, r.style.color = "white";
            }));
        }));
    };

    const ratingInit = () => {
        const {
            getData: t,
            getItemFromStore: e
        } = window.phoenix.utils;
        document.querySelectorAll("[data-rater]").forEach((r => {
            const a = {
                reverse: e("phoenixIsRTL"),
                starSize: 32,
                step: .5,
                element: r,
                rateCallback(t, e) {
                    this.setRating(t), e();
                },
                ...t(r, "rater")
            };
            return window.raterJs(a)
        }));
    };

    const responsiveNavItemsInit = () => {
        const {
            resize: e
        } = window.phoenix.utils, t = "[data-nav-item]", l = "[data-navbar]", o = "[data-more-item]", i = "[data-category-list]", n = "[data-category-btn]", s = document.querySelector(l), a = () => {
            const e = s.clientWidth,
                l = s.querySelector(o),
                i = l.clientWidth,
                a = e - i,
                r = s.querySelectorAll(t),
                c = s.querySelector(n).clientWidth;
            let d = 0;
            l.style.display = "none", r.forEach((e => {
                const t = e.clientWidth;
                if (d += t, d + c + i > a && !e.classList.contains("dropdown")) {
                    l.style.display = "block", e.style.display = "none";
                    const t = e.firstChild.cloneNode(!0);
                    s.querySelector(".category-list").appendChild(t);
                }
            }));
            s.querySelectorAll(".dropdown-menu .nav-link").forEach((e => {
                e.classList.remove("nav-link"), e.classList.add("dropdown-item");
            }));
        };
        if (s) {
            window.addEventListener("load", (() => {
                a();
            })), e((() => {
                const e = s.querySelectorAll(t),
                    l = s.querySelectorAll(i);
                e.forEach((e => e.removeAttribute("style"))), l.forEach((e => e.innerHTML = "")), a();
            }));
            const l = s.querySelectorAll(".nav-link");
            s.addEventListener("click", (function (e) {
                for (let e = 0; e < l.length; e++) l[e].classList.remove("active");
                e.target.closest("li") && e.target.closest("li").classList.add("active");
            }));
        }
    };

    const searchInit = () => {
        const e = '[data-bs-dismiss="search"]',
            t = '[data-bs-toggle="dropdown"]',
            s = ".dropdown-menu",
            r = ".search-box",
            c = ".search-input",
            o = '[data-bs-toggle="search"]',
            a = "show",
            n = "aria-expanded",
            d = "click",
            l = "focus",
            u = "show.bs.dropdown",
            i = "search.close",
            h = e => {
                const t = e.querySelector(o),
                    r = e.querySelector(s);
                t && r && (t.setAttribute(n, "false"), t.classList.remove(a), r.classList.remove(a));
            },
            v = document.querySelectorAll(r),
            E = () => {
                v.forEach(h);
            };
        v.forEach((t => {
            const r = t.querySelector(c),
                u = t.querySelector(e),
                v = t.querySelector(s);
            r && r.addEventListener(l, (() => {
                E();
                const e = t.querySelector(o);
                e && v && (e.setAttribute(n, "true"), e.classList.add(a), v.classList.add(a));
            })), document.addEventListener(d, (({
                target: e
            }) => {
                !t.contains(e) && h(t);
            })), u && u.addEventListener(d, (e => {
                h(t), r.value = "";
                const s = new CustomEvent(i);
                e.currentTarget.dispatchEvent(s);
            }));
        })), document.querySelectorAll(t).forEach((e => {
            e.addEventListener(u, (() => {
                E();
            }));
        }));
    };

    const simplebarInit = () => {
        Array.from(document.querySelectorAll(".scrollbar-overlay")).forEach((r => new window.SimpleBar(r)));
    };

    const sortableInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, o = document.querySelectorAll("[data-sortable]"), t = {
            animation: 150,
            group: {
                name: "shared"
            },
            delay: 100,
            delayOnTouchOnly: !0,
            forceFallback: !0,
            onStart() {
                document.body.classList.add("sortable-dragging");
            },
            onEnd() {
                document.body.classList.remove("sortable-dragging");
            }
        };
        o.forEach((o => {
            const a = e(o, "sortable"),
                n = window._.merge(t, a);
            return window.Sortable.create(o, n)
        }));
    };

    const supportChatInit = () => {
        const t = document.querySelector(".support-chat");
        const o = document.querySelectorAll(".btn-support-chat");
        const c = document.querySelector(".support-chat-container");
        const { phoenixSupportChat: s } = window.config.config;

        // Ensure both s and c exist before adding "show" class
        if (s && c) {
            c.classList.add("show");
        }

        o?.forEach((s) => { // Optional chaining for potential absence of buttons
            s.addEventListener("click", () => {
                t.classList.toggle("show-chat");
                o[o.length - 1].classList.toggle("btn-chat-close");
                c.classList.add("show");
            });
        });
    };


    const swiperInit = () => {
        const { getData: e } = window.phoenix.utils;
        const t = document.querySelectorAll(".swiper-theme-container");

        t && t.forEach((t) => {
            const r = t.querySelector("[data-swiper]");
            const i = e(r, "swiper");
            const n = i.thumb;

            let s;
            if (n) {
                const e = r.querySelectorAll("img");
                let t = "";
                e.forEach((e) => {
                    t += `\n  <div class='swiper-slide'>\n    <img class='img-fluid rounded mt-2' src=${e.src} alt=''/>\n  </div>\n`;
                });

                const i = document.createElement("div");
                i.setAttribute("class", "swiper thumb");
                i.innerHTML = `<div class='swiper-wrapper'>${t}</div>`;

                if (n.parent) {
                    document.querySelector(n.parent).parentNode.appendChild(i);
                } else {
                    r.parentNode.appendChild(i);
                }

                s = new window.Swiper(i, n);
            }

            const o = t.querySelector(".swiper-nav");
            new window.Swiper(r, {
                ...i,
                navigation: {
                    nextEl: o?.querySelector(".swiper-button-next"),
                    prevEl: o?.querySelector(".swiper-button-prev")
                },
                thumbs: {
                    swiper: s
                }
            });
        });
    };


    const {
        config: config
    } = window.config, initialDomSetup = e => {
        const {
            getData: t,
            getItemFromStore: a,
            getSystemTheme: o
        } = window.phoenix.utils;
        e && e.querySelectorAll("[data-theme-control]").forEach((e => {
            const n = t(e, "theme-control"),
                r = a(n);
            "phoenixNavbarTopShape" === n && "dual-nav" === a("phoenixNavbarPosition") && e.setAttribute("disabled", !0);
            const i = a("phoenixNavbarPosition");
            if ("phoenixNavbarVerticalStyle" === n && ("horizontal" === i || "dual-nav" === i) && e.setAttribute("disabled", !0), "checkbox" === e.type) "phoenixTheme" === n ? ("auto" === r ? "dark" === o() : "dark" === r) && e.setAttribute("checked", !0) : r && e.setAttribute("checked", !0);
            else if ("radio" === e.type && "phoenixNavbarVerticalStyle" === n) "darker" === r && "darker" === e.value && e.setAttribute("checked", !0), "default" === r && "default" === e.value && e.setAttribute("checked", !0);
            else if ("radio" === e.type && "phoenixNavbarTopShape" === n) "slim" === r && "slim" === e.value && e.setAttribute("checked", !0), "default" === r && "default" === e.value && e.setAttribute("checked", !0);
            else if ("radio" === e.type && "phoenixNavbarTopStyle" === n) "darker" === r && "darker" === e.value && e.setAttribute("checked", !0), "default" === r && "default" === e.value && e.setAttribute("checked", !0);
            else if ("radio" === e.type && "phoenixTheme" === n) {
                r === e.value && e.setAttribute("checked", !0);
            } else if ("radio" === e.type && "phoenixNavbarPosition" === n) {
                r === e.value && e.setAttribute("checked", !0);
            } else {
                r === e.value && e.classList.add("active");
            }
        }));
    }, changeTheme = e => {
        const {
            getData: t,
            getItemFromStore: a,
            getSystemTheme: o
        } = window.phoenix.utils;
        e.querySelectorAll('[data-theme-control = "phoenixTheme"]').forEach((e => {
            const n = t(e, "theme-control"),
                r = a(n);
            "checkbox" === e.type ? "auto" === r ? "dark" === o() ? e.checked = !0 : e.checked = !1 : e.checked = "dark" === r : "radio" === e.type ? r === e.value ? e.checked = !0 : e.checked = !1 : r === e.value ? e.classList.add("active") : e.classList.remove("active");
        }));
    }, handleThemeDropdownIcon = e => {
        document.querySelectorAll("[data-theme-dropdown-toggle-icon]").forEach((t => {
            t.classList.toggle("d-none", e !== t.getAttribute("data-theme-dropdown-toggle-icon"));
        }));
    };
    handleThemeDropdownIcon(localStorage.getItem("phoenixTheme"));
    const themeControl = () => {
        const { getData: e, getItemFromStore: t, getSystemTheme: a } = window.phoenix.utils;

        const o = (t) => {
            const a = e(t, "page-url");
            a ? window.location.replace(a) : window.location.reload();
        };

        const n = new DomNode(document.body);
        const r = document.querySelector(".navbar-vertical");
        const i = document.querySelector(".navbar-top");
        const c = document.querySelector(".support-chat-container");

        initialDomSetup(n.node);

        n.on("click", (e) => {
            const d = new DomNode(e.target);
            if (d.data("theme-control")) {
                const l = d.data("theme-control");
                let h = e.target["checkbox" === e.target.type ? "checked" : "value"];

                switch (l) {
                    case "phoenixTheme":
                        h = "boolean" == typeof h ? (h ? "dark" : "light") : "auto";
                        config.hasOwnProperty(l) && window.config.set({ [l]: h });
                        window.history.replaceState(null, null, window.location.pathname);
                        document.documentElement.setAttribute("data-bs-theme", h);
                        const t = new CustomEvent("clickControl", {
                            detail: { control: l, value: h }
                        });
                        e.currentTarget.dispatchEvent(t);
                        changeTheme(n.node);
                        break;
                    case "phoenixNavbarVerticalStyle":
                        r.setAttribute("data-navbar-appearance", "default");
                        h !== "default" && r.setAttribute("data-navbar-appearance", "darker");
                        break;
                    case "phoenixNavbarTopStyle":
                        i.setAttribute("data-navbar-appearance", "default");
                        h !== "default" && i.setAttribute("data-navbar-appearance", "darker");
                        break;
                    case "phoenixNavbarTopShape":
                        t("phoenixNavbarPosition") === "dual-nav" ? el.setAttribute("disabled", true) : o(d.node);
                        break;
                    case "phoenixNavbarPosition":
                        o(d.node);
                        break;
                    case "phoenixIsRTL":
                        window.config.set({ phoenixIsRTL: d.node.checked });
                        window.location.reload();
                        break;
                    case "phoenixSupportChat":
                        c?.classList.remove("show"); // Optional chaining for potential absence of element
                        h && c?.classList.add("show"); // Optional chaining for potential absence of element
                        break;
                    case "reset":
                        window.config.reset();
                        window.location.reload();
                        break;
                    default:
                        window.location.reload();
                }
            }
        });

        n.on("clickControl", (({ detail: { control: e, value: t } }) => {
            "phoenixTheme" === e && handleThemeDropdownIcon(t);
        }));
    };


    const {
        merge: merge
    } = window._, tinymceInit = () => {
        const {
            getColor: e,
            getData: t,
            getItemFromStore: n
        } = window.phoenix.utils, o = document.querySelectorAll("[data-tinymce]");
        if (window.tinymce) {
            o.forEach((o => {
                const i = t(o, "tinymce"),
                    r = merge({
                        selector: ".tinymce",
                        height: "50vh",
                        skin: "oxide",
                        menubar: !1,
                        content_style: `\n        .mce-content-body { \n          color: ${e("emphasis-color")};\n          background-color: ${e("tinymce-bg")};\n        }\n        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {\n          color: ${e("quaternary-color")};\n          font-weight: 400;\n          font-size: 12.8px;\n        }\n        `,
                        statusbar: !1,
                        plugins: "link,image,lists,table,media",
                        theme_advanced_toolbar_align: "center",
                        directionality: n("phoenixIsRTL") ? "rtl" : "ltr",
                        toolbar: [{
                            name: "history",
                            items: ["undo", "redo"]
                        }, {
                            name: "formatting",
                            items: ["bold", "italic", "underline", "strikethrough"]
                        }, {
                            name: "alignment",
                            items: ["alignleft", "aligncenter", "alignright", "alignjustify"]
                        }, {
                            name: "list",
                            items: ["numlist", "bullist"]
                        }, {
                            name: "link",
                            items: ["link"]
                        }],
                        setup: e => {
                            e.on("focus", (() => {
                                document.querySelector(".tox-sidebar-wrap").classList.add("editor-focused");
                            })), e.on("blur", (() => {
                                document.querySelector(".tox-sidebar-wrap").classList.remove("editor-focused");
                            }));
                        }
                    }, i);
                window.tinymce.init(r);
            }));
            const i = document.body;
            i && i.addEventListener("clickControl", (({
                detail: {
                    control: t
                }
            }) => {
                "phoenixTheme" === t && o.forEach((t => {
                    window.tinymce.get(t.id).dom.addStyle(`.mce-content-body{\n                  color: ${e("emphasis-color")} !important;\n                  background-color: ${e("tinymce-bg")} !important;\n                }`);
                }));
            }));
        }
    };

    const toastInit = () => {
        [].slice.call(document.querySelectorAll(".toast")).map((t => new bootstrap.Toast(t)));
        const t = document.getElementById("liveToastBtn");
        if (t) {
            const e = new bootstrap.Toast(document.getElementById("liveToast"));
            t.addEventListener("click", (() => {
                e && e.show();
            }));
        }
    };

    const todoOffcanvasInit = () => {
        const {
            getData: o
        } = window.phoenix.utils, t = document.querySelectorAll("[data-event-propagation-prevent]");
        t && t.forEach((o => {
            o.addEventListener("click", (o => {
                o.stopPropagation();
            }));
        }));
        const e = document.querySelector(".todo-list");
        if (e) {
            e.querySelectorAll("[data-todo-offcanvas-toogle]").forEach((t => {
                const a = o(t, "todo-offcanvas-target"),
                    n = e.querySelector(`#${a}`),
                    c = new window.bootstrap.Offcanvas(n, {
                        backdrop: !0
                    });
                t.addEventListener("click", (() => {
                    c.show();
                }));
            }));
        }
    };

    const tooltipInit = () => {
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((t => new bootstrap.Tooltip(t, {
            trigger: "hover"
        })));
    };

    const wizardInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, t = "[data-theme-wizard]", a = "[data-wizard-step]", d = "[data-wizard-form]", s = "[data-wizard-password]", r = "[data-wizard-confirm-password]", l = "[data-wizard-next-btn]", o = "[data-wizard-prev-btn]", n = "[data-wizard-footer]", i = "submit", c = "show.bs.tab", u = "shown.bs.tab", w = "click";
        document.querySelectorAll(t).forEach((t => {
            const b = t.querySelectorAll(a),
                h = t.querySelectorAll(d),
                m = t.querySelector(s),
                v = t.querySelector(r),
                f = t.querySelector(l),
                p = t.querySelector(o),
                L = t.querySelector(n),
                y = new Event(i, {
                    bubbles: !0,
                    cancelable: !0
                }),
                z = t.hasAttribute("data-wizard-modal-disabled"),
                g = Array.from(b).map((e => window.bootstrap.Tab.getOrCreateInstance(e)));
            let E = 0,
                q = null;
            h.forEach((e => {
                e.addEventListener(i, (t => (t.preventDefault(), e.classList.contains("needs-validation") && (m && v && (m.value !== v.value ? v.setCustomValidity("Invalid field.") : v.setCustomValidity("")), !e.checkValidity()) ? (q.preventDefault(), !1) : (E += 1, null))));
            })), f.addEventListener(w, (() => {
                E + 1 < g.length && g[E + 1].show();
            })), p && p.addEventListener(w, (() => {
                E -= 1, g[E].show();
            })), b.length && b.forEach(((t, a) => {
                t.addEventListener(c, (a => {
                    const d = e(t, "wizard-step");
                    q = a, d > E && h[E].dispatchEvent(y);
                })), t.addEventListener(u, (() => {
                    E = a, E !== b.length - 1 || z || b.forEach((e => {
                        e.setAttribute("data-bs-toggle", "modal"), e.setAttribute("data-bs-target", "#error-modal");
                    }));
                    for (let e = 0; e < E; e += 1) b[e].classList.add("done"), e > 0 && b[e - 1].classList.add("complete");
                    for (let e = E; e < b.length; e += 1) b[e].classList.remove("done"), e > 0 && b[e - 1].classList.remove("complete");
                    E > b.length - 2 ? L.classList.add("d-none") : L.classList.remove("d-none"), p && (E > 0 && E !== b.length - 1 ? p.classList.remove("d-none") : p.classList.add("d-none"));
                }));
            }));
        }));
    };

    const faqTabInit = () => {
        const t = document.querySelectorAll("[data-vertical-category-tab]");
        const a = document.querySelector("[data-vertical-category-offcanvas]");
        const e = document.querySelectorAll("[data-category-filter]");
        const c = document.querySelectorAll(".faq-subcategory-tab .nav-item");

        if (a) {
            const e = window.bootstrap?.Offcanvas?.getOrCreateInstance(a); // Use optional chaining for potential absence of Offcanvas
            t.forEach((t) => {
                t.addEventListener("click", () => {
                    e?.hide(); // Optional chaining for potential absence of Offcanvas method
                });
            });
        }

        e?.forEach((t) => {
            if (t.classList.contains("active")) {
                c.forEach((a) => {
                    a.classList.contains(t.getAttribute("data-category-filter")) || "all" === t.getAttribute("data-category-filter") || a.classList.add("d-none");
                });
            }
            t.addEventListener("click", () => {
                c.forEach((a) => {
                    "all" === t.getAttribute("data-category-filter") ? a.classList.remove("d-none") : a.classList.contains(t.getAttribute("data-category-filter")) || a.classList.add("d-none");
                });
            });
        });
    };


    const kanbanInit = () => {
        const t = document.querySelector("[data-kanban-container]");
        if (t) {
            t.addEventListener("click", (t) => {
                if (t.target.hasAttribute("data-kanban-collapse")) {
                    t.target.closest(".kanban-column").classList.toggle("collapsed");
                }
            });

            t.querySelectorAll("[data-sortable]").forEach((t) => {
                window.Sortable.get(t).option("onStart", (t) => {
                    document.body.classList.add("sortable-dragging");
                    window.Sortable.ghost.querySelector(".dropdown-menu").classList.remove("show");

                    const e = t.item.querySelector("[data-bs-toggle='dropdown']");
                    window.bootstrap.Dropdown?.getInstance(e)?.hide(); // Optional chaining for potential absence of methods
                });
            });
        }
    };


    const towFAVerificarionInit = () => {
        const t = document.querySelector("[data-2FA-varification]"),
            e = document.querySelectorAll("[data-2FA-varification] input[type=number]");
        if (t) {
            window.addEventListener("load", (() => e[0].focus())), t.addEventListener("keypress", (t => {
                t.target.matches("input[type=number]") && (/\D/.test(t.key) || t.target.value) && t.preventDefault();
            }));
            const a = [...e];
            t.addEventListener("input", (t => {
                if (t.target.matches("input[type=number]")) {
                    const e = a.indexOf(t.target),
                        i = a[e + 1];
                    i && "" !== t.target.value && i.hasAttribute("disabled") && (i.removeAttribute("disabled"), i.focus());
                }
            })), t.addEventListener("keydown", (t => {
                if (t.target.matches("input[type=number]") && 8 === t.keyCode) {
                    const e = a.indexOf(t.target),
                        i = a[e - 1];
                    i && (i.focus(), t.target.value = "", t.target.setAttribute("disabled", !0));
                }
            })), t.addEventListener("submit", (() => a.map((t => t.value)).join("")));
        }
    };

    const mapboxInit = () => {
        const {
            getData: e
        } = window.phoenix.utils, o = document.querySelectorAll(".mapbox-container"), t = document.querySelectorAll("[data-tab-map-container]");
        o && o.forEach((o => {
            window.mapboxgl.accessToken = "pk.eyJ1IjoidGhlbWV3YWdvbiIsImEiOiJjbGhmNW5ybzkxcmoxM2RvN2RmbW1nZW90In0.hGIvQ890TYkZ948MVrsMIQ";
            const n = o.querySelector("[data-mapbox]");
            if (n) {
                const o = e(n, "mapbox"),
                    r = document.querySelector(".zoomIn"),
                    a = document.querySelector(".zoomOut"),
                    l = document.querySelector(".fullScreen"),
                    c = {
                        default: "mapbox://styles/mapbox/light-v11",
                        light: "mapbox://styles/themewagon/clj57pads001701qo25756jtw",
                        dark: "mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew"
                    },
                    m = new window.mapboxgl.Map({
                        ...o,
                        container: "mapbox",
                        style: c[window.config.config.phoenixTheme]
                    });
                o.center && new window.mapboxgl.Marker({
                    color: getColor("primary")
                }).setLngLat(o.center).addTo(m), r && a && (r.addEventListener("click", (() => m.zoomIn())), a.addEventListener("click", (() => m.zoomOut()))), l && l.addEventListener("click", (() => m.getContainer().requestFullscreen())), t.forEach((e => {
                    e.addEventListener("shown.bs.tab", (() => {
                        m.resize();
                    }));
                }));
            }
        }));
    },
        themeController$1 = document.body;
    themeController$1 && themeController$1.addEventListener("clickControl", (() => {
        mapboxInit();
    }));

    const flightMapInit = () => {
        if (document.querySelector("#flightMap")) {
            window.mapboxgl.accessToken = "pk.eyJ1IjoidGhlbWV3YWdvbiIsImEiOiJjbGhmNW5ybzkxcmoxM2RvN2RmbW1nZW90In0.hGIvQ890TYkZ948MVrsMIQ";
            const e = document.querySelector(".zoomIn"),
                t = document.querySelector(".zoomOut"),
                o = document.querySelector(".fullScreen"),
                r = {
                    default: "mapbox://styles/mapbox/light-v11",
                    light: "mapbox://styles/themewagon/clj57pads001701qo25756jtw",
                    dark: "mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew"
                },
                n = new window.mapboxgl.Map({
                    container: "flightMap",
                    style: r[window.config.config.phoenixTheme],
                    center: [-73.102712, 7.102257],
                    zoom: 5,
                    pitch: 40,
                    attributionControl: !1
                });
            e.addEventListener("click", (() => n.zoomIn())), t.addEventListener("click", (() => n.zoomOut())), o.addEventListener("click", (() => n.getContainer().requestFullscreen()));
            const a = [-61.100583, 5.044713],
                i = [-74.2139449434892, 8.136553550752552],
                l = [-84.913785, 10.325774],
                s = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: [a, i]
                        }
                    }]
                },
                c = {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: [i, l]
                        }
                    }]
                };
            let d = 1;
            ({
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: a
                    }
                }, {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: i
                    }
                }, {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: l
                    }
                }]
            }).features.forEach((e => {
                const t = document.createElement("div");
                t.className = `marker-${d}`, new window.mapboxgl.Marker(t).setLngLat(e.geometry.coordinates).addTo(n), d += 1;
            }));
            const u = window.turf.length(s.features[0]),
                p = window.turf.length(s.features[0]),
                m = [],
                g = [],
                y = 500;
            for (let e = 0; e < u; e += u / y) {
                const t = window.turf.along(s.features[0], e);
                m.push(t.geometry.coordinates);
            }
            for (let e = 0; e < p; e += p / y) {
                const t = window.turf.along(c.features[0], e);
                g.push(t.geometry.coordinates);
            }
            s.features[0].geometry.coordinates = m, c.features[0].geometry.coordinates = g, n.on("load", (() => {
                n.addSource("route", {
                    type: "geojson",
                    data: s.features[0]
                }), n.addSource("route2", {
                    type: "geojson",
                    data: c.features[0]
                }), n.addLayer({
                    id: "route",
                    source: "route",
                    type: "line",
                    paint: {
                        "line-width": 2,
                        "line-color": "dark" === getItemFromStore("phoenixTheme") ? getColor("primary") : getColor("primary-light")
                    }
                }), n.addLayer({
                    id: "route2",
                    source: "route2",
                    type: "line",
                    paint: {
                        "line-width": 1,
                        "line-color": getColor("warning")
                    }
                });
            }));
        }
    },
        themeController = document.body;
    themeController && themeController.addEventListener("clickControl", (() => {
        flightMapInit();
    }));

    const typedTextInit = () => {
        const e = document.querySelectorAll(".typed-text");
        e.length && window.Typed && e.forEach((e => new window.Typed(e, {
            strings: getData(e, "typedText"),
            typeSpeed: 70,
            backSpeed: 70,
            loop: !0,
            backDelay: 1e3
        })));
    };

    const priceTierFormInit = () => {
        const e = document.querySelectorAll("[data-form-price-tier]");
        e && e.forEach((e => {
            const t = e.querySelector("[data-price-toggle]"),
                r = e.querySelectorAll("[data-pricing]"),
                a = e.querySelector("[data-pricing-collapse]"),
                c = new window.bootstrap.Collapse(a, {
                    toggle: !1
                });
            t.addEventListener("change", (t => {
                r[0].checked = !0, t.target.checked ? e.classList.add("active") : (e.classList.remove("active"), c.hide());
            })), r.forEach((e => {
                e.addEventListener("change", (e => {
                    "paid" === e.target.value ? c.show() : c.hide();
                }));
            }));
        }));
    };

    const nouisliderInit = () => {
        const {
            getData: i
        } = window.phoenix.utils;
        if (window.noUiSlider) {
            document.querySelectorAll("[data-nouislider]").forEach((e => {
                const n = i(e, "nouislider"),
                    o = window._.merge({
                        start: [10],
                        connect: [!0, !1],
                        step: 1,
                        range: {
                            min: [0],
                            max: [100]
                        },
                        tooltips: !0
                    }, n);
                window.noUiSlider.create(e, {
                    ...o
                });
            }));
        }
    };

    const collapseAllInit = () => {
        const e = document.querySelector("[data-collapse-all]"),
            l = document.querySelector("[data-btn-collapse-all]");
        if (e) {
            e.querySelectorAll(".collapse").forEach((e => {
                const t = window.bootstrap.Collapse.getOrCreateInstance(e, {
                    toggle: !1
                });
                l.addEventListener("click", (() => {
                    t.hide();
                }));
            }));
        }
    };

    const leaftletPoints = [{
        lat: 53.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 52.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 51.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 53.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 54.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 55.958332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 53.908332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 53.008332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 53.158332,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 53.000032,
        long: -1.080278,
        name: "Diana Meyer",
        street: "Slude Strand 27",
        location: "1130 Kobenhavn"
    }, {
        lat: 52.292001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 52.392001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 51.492001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 51.192001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 52.292001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 54.392001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 51.292001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 52.102001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 52.202001,
        long: -2.22,
        name: "Anke Schroder",
        street: "Industrivej 54",
        location: "4140 Borup"
    }, {
        lat: 51.063202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.363202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.463202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.563202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.763202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.863202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.963202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.000202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.000202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.163202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 52.263202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 53.463202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 55.163202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.263202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.463202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.563202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.663202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.763202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.863202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 56.963202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 57.973202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 57.163202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.163202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.263202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.363202,
        long: -1.308,
        name: "Tobias Vogel",
        street: "Mollebakken 33",
        location: "3650 Olstykke"
    }, {
        lat: 51.409,
        long: -2.647,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.68,
        long: -1.49,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 50.259998,
        long: -5.051,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 54.906101,
        long: -1.38113,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.383331,
        long: -1.466667,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.483002,
        long: -2.2931,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.509865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.109865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.209865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.309865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.409865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.609865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.709865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.809865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 51.909865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.109865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.209865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.309865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.409865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.509865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.609865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.709865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.809865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.909865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.519865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.529865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.539865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.549865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 52.549865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.109865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.209865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.319865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.329865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.409865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.559865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.619865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.629865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.639865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.649865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.669865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.669865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.719865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.739865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.749865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.759865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.769865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.769865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.819865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.829865,
        long: -.118092,
        name: "Richard Hendricks",
        street: "37 Seafield Place",
        location: "London"
    }, {
        lat: 53.483959,
        long: -2.244644,
        name: "Ethel B. Brooks",
        street: "2576 Sun Valley Road"
    }, {
        lat: 40.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 39.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 38.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 37.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 40.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 41.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 42.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 43.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 44.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 45.737,
        long: -73.923,
        name: "Marshall D. Lewis",
        street: "1489 Michigan Avenue",
        location: "Michigan"
    }, {
        lat: 46.7128,
        long: 74.006,
        name: "Elizabeth C. Lyons",
        street: "4553 Kenwood Place",
        location: "Fort Lauderdale"
    }, {
        lat: 40.7128,
        long: 74.1181,
        name: "Elizabeth C. Lyons",
        street: "4553 Kenwood Place",
        location: "Fort Lauderdale"
    }, {
        lat: 14.235,
        long: 51.9253,
        name: "Ralph D. Wylie",
        street: "3186 Levy Court",
        location: "North Reading"
    }, {
        lat: 15.235,
        long: 51.9253,
        name: "Ralph D. Wylie",
        street: "3186 Levy Court",
        location: "North Reading"
    }, {
        lat: 16.235,
        long: 51.9253,
        name: "Ralph D. Wylie",
        street: "3186 Levy Court",
        location: "North Reading"
    }, {
        lat: 14.235,
        long: 51.9253,
        name: "Ralph D. Wylie",
        street: "3186 Levy Court",
        location: "North Reading"
    }, {
        lat: 15.8267,
        long: 47.9218,
        name: "Hope A. Atkins",
        street: "3715 Hillcrest Drive",
        location: "Seattle"
    }, {
        lat: 15.9267,
        long: 47.9218,
        name: "Hope A. Atkins",
        street: "3715 Hillcrest Drive",
        location: "Seattle"
    }, {
        lat: 23.4425,
        long: 58.4438,
        name: "Samuel R. Bailey",
        street: "2883 Raoul Wallenberg Place",
        location: "Cheshire"
    }, {
        lat: 23.5425,
        long: 58.3438,
        name: "Samuel R. Bailey",
        street: "2883 Raoul Wallenberg Place",
        location: "Cheshire"
    }, {
        lat: -37.8927369333,
        long: 175.4087452333,
        name: "Samuel R. Bailey",
        street: "3228 Glory Road",
        location: "Nashville"
    }, {
        lat: -38.9064188833,
        long: 175.4441556833,
        name: "Samuel R. Bailey",
        street: "3228 Glory Road",
        location: "Nashville"
    }, {
        lat: -12.409874,
        long: -65.596832,
        name: "Ann J. Perdue",
        street: "921 Ella Street",
        location: "Dublin"
    }, {
        lat: -22.090887,
        long: -57.411827,
        name: "Jorge C. Woods",
        street: "4800 North Bend River Road",
        location: "Allen"
    }, {
        lat: -19.019585,
        long: -65.261963,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: -16.500093,
        long: -68.214684,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: -17.413977,
        long: -66.165321,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: -16.489689,
        long: -68.119293,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 54.766323,
        long: 3.08603729,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 54.866323,
        long: 3.08603729,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 49.537685,
        long: 3.08603729,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 54.715424,
        long: .509207,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 44.891666,
        long: 10.136665,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: 48.078335,
        long: 14.535004,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: -26.358055,
        long: 27.398056,
        name: "Russ E. Panek",
        street: "4068 Hartland Avenue",
        location: "Appleton"
    }, {
        lat: -29.1,
        long: 26.2167,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -29.883333,
        long: 31.049999,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -26.266111,
        long: 27.865833,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -29.087217,
        long: 26.154898,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -33.958252,
        long: 25.619022,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -33.977074,
        long: 22.457581,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: -26.563404,
        long: 27.844164,
        name: "Wilbur J. Dry",
        street: "2043 Jadewood Drive",
        location: "Northbrook"
    }, {
        lat: 51.21389,
        long: -102.462776,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 52.321945,
        long: -106.584167,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 50.288055,
        long: -107.793892,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 52.7575,
        long: -108.28611,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 50.393333,
        long: -105.551941,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 50.930557,
        long: -102.807777,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 52.856388,
        long: -104.610001,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 52.289722,
        long: -106.666664,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 52.201942,
        long: -105.123055,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 53.278046,
        long: -110.00547,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 49.13673,
        long: -102.990959,
        name: "Joseph B. Poole",
        street: "3364 Lunetta Street",
        location: "Wichita Falls"
    }, {
        lat: 45.484531,
        long: -73.597023,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.266666,
        long: -71.900002,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.349998,
        long: -72.51667,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 47.333332,
        long: -79.433334,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.400002,
        long: -74.033333,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.683334,
        long: -73.433334,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 48.099998,
        long: -77.783333,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.5,
        long: -72.316666,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 46.349998,
        long: -72.550003,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 48.119999,
        long: -69.18,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.599998,
        long: -75.25,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 46.099998,
        long: -71.300003,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 45.700001,
        long: -73.633331,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 47.68,
        long: -68.879997,
        name: "Claudette D. Nowakowski",
        street: "3742 Farland Avenue",
        location: "San Antonio"
    }, {
        lat: 46.716667,
        long: -79.099998,
        name: "299"
    }, {
        lat: 45.016666,
        long: -72.099998,
        name: "299"
    }];

    const {
        L: L
    } = window, leafletInit = () => {
        const e = document.getElementById("map");
        if (L && e) {
            const e = () => "dark" === window.config.config.phoenixTheme ? ["invert:98%", "grayscale:69%", "bright:89%", "contrast:111%", "hue:205deg", "saturate:1000%"] : ["bright:101%", "contrast:101%", "hue:23deg", "saturate:225%"],
                t = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                a = L.tileLayer.colorFilter(t, {
                    attribution: null,
                    transparent: !0,
                    filter: e()
                }),
                o = L.map("map", {
                    center: L.latLng(25.659195, 30.182691),
                    zoom: .6,
                    layers: [a],
                    minZoom: 1.4
                }),
                n = L.markerClusterGroup({
                    chunkedLoading: !1,
                    spiderfyOnMaxZoom: !1
                });
            leaftletPoints.map((e => {
                const {
                    name: t,
                    location: a,
                    street: o
                } = e, r = L.icon({
                    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAFgAAABYAEg2RPaAAADpElEQVRYCZ1XS1LbQBBtybIdiMEJKSpUqihgEW/xDdARyAnirOIl3MBH8NK7mBvkBpFv4Gy9IRSpFIQiRPyNfqkeZkY9HwmFt7Lm06+7p/vN2MmyDIrQ6QebALAHAD4AbFuWfQeAAACGs5H/w5jlsJJw4wMA+GhMFuMA99jIDJJOP+ihZwDQFmNuowWO1wS3viDXpdEdZPEc0odruj0EgN5s5H8tJOEEX8R3rbkMtcU34NTqhe5nSQTJ7Tkk80s6/Gk28scGiULguFBffgdufdEwWoQ0uoXo8hdAlooVH0REjISfwZSlyHGh0V5n6aHAtKTxXI5g6nQnMH0P4bEgwtR18Yw8Pj8QZ4ARUAI0Hl+fQZZGisGEBVwHr7XKzox57DXZ/ij8Cdwe2u057z9/wygOxRl4S2vSUHx1oucaMQGAHTrgtdag9mK5aN+Wx/uAAQ9Zenp/SRce4TpaNbQK4+sTcGqeTB/aIXv3XN5oj2VKqii++U0JunpZ8urxee4hvjqVc2hHpBDXuKKT9XMgVYJ1/1fPGSeaikzgmWWkMIi9bVf8UhotXxzORn5gWFchI8QyttlzjS0qpsaIGY2MMsujV/AUSdcY0dDpB6/EiOPYzclR1CI5mOez3ekHvrFLxa7cR5pTscfrXjk0Vhm5V2PqLUWnH3R5GbPGpMVD7E1ckXesKBQ7AS/vmQ1c0+kHuxpBj98lTCm8pbc5QRJRdZ6qHb/wGryXq3Lxszv+5gySuwvxueXySwYvHEjuQ9ofTGKYlrmK1EsCHMd5SoD7mZ1HHFCBHLNbMEshvrugqWLn01hpVVJhFgVGkDvK7hR6n2B+d9C7xsqWsbkqHv4cCsWezEb+o2SR+SFweUBxfA5wH7kShjKt2vWL57Px3GhIFEezkb8pxvUWHYhotAfCk2AtkEcxoOttrxUWDR5svb1emSQKj0WXK1HYIgFREbiBqmoZcB2RkbE+byMZiosorVgAZF1ID7yQhEs38wa7nUqNDezdlavC2HbBGSQkGgZ8uJVBmzeiKCRRpEa9ilWghORVeGB7BxeSKF5xqbFBkxBrFKUk/JHA7ppENQaCnCjthK+3opCEYyANztXmZN858cDYWSUSHk3A311GAZDvo6deNKUk1EsqnJoQlkYBNlmxQZeaMgmxoUokICoHDce351RCCiuKoirJWEgNOYvQplM2VCLhUqF7jf94rW9kHVUjQeheV4riv0i4ZOzzz/2y/+0KAOAfr4EE4HpCFhwAAAAASUVORK5CYII="
                }), A = L.marker([e.lat, e.long], {
                    icon: r
                }), i = `\n        <h6 class="mb-1">${t}</h6>\n        <p class="m-0 text-body-quaternary">${o}, ${a}</p>\n      `, s = L.popup({
                    minWidth: 180
                }).setContent(i);
                return A.bindPopup(s), n.addLayer(A), !0
            })), o.addLayer(n);
            document.body.addEventListener("clickControl", (({
                detail: {
                    control: e,
                    value: t
                }
            }) => {
                "phoenixTheme" === e && a.updateFilter("dark" === t ? ["invert:98%", "grayscale:69%", "bright:89%", "contrast:111%", "hue:205deg", "saturate:1000%"] : ["bright:101%", "contrast:101%", "hue:23deg", "saturate:225%"]);
            }));
        }
    };

    window.initMap = initMap, docReady(detectorInit), docReady(simplebarInit), docReady(toastInit), docReady(tooltipInit), docReady(featherIconsInit), docReady(basicEchartsInit), docReady(bulkSelectInit), docReady(listInit), docReady(anchorJSInit), docReady(popoverInit), docReady(formValidationInit), docReady(docComponentInit), docReady(swiperInit), docReady(productDetailsInit), docReady(ratingInit), docReady(quantityInit), docReady(dropzoneInit), docReady(choicesInit), docReady(tinymceInit), docReady(responsiveNavItemsInit), docReady(flatpickrInit), docReady(iconCopiedInit), docReady(isotopeInit), docReady(bigPictureInit), docReady(countupInit), docReady(phoenixOffcanvasInit), docReady(todoOffcanvasInit), docReady(wizardInit), docReady(reportsDetailsChartInit), docReady(glightboxInit), docReady(themeControl), docReady(searchInit), docReady(handleNavbarVerticalCollapsed), docReady(navbarInit), docReady(navbarComboInit), docReady(fullCalendarInit), docReady(picmoInit), docReady(chatInit), docReady(modalInit), docReady(lottieInit), docReady(navbarShadowOnScrollInit), docReady(dropdownOnHover), docReady(supportChatInit), docReady(sortableInit), docReady(copyLink), docReady(randomColorInit), docReady(faqTabInit), docReady(createBoardInit), docReady(advanceAjaxTableInit), docReady(kanbanInit), docReady(towFAVerificarionInit), docReady(mapboxInit), docReady(flightMapInit), docReady(typedTextInit), docReady(priceTierFormInit), docReady(nouisliderInit), docReady(collapseAllInit), docReady(leafletInit), docReady((() => {
        const t = document.querySelector("[data-selected-rows]"),
            o = document.getElementById("selectedRows");
        if (t) {
            const e = document.getElementById("bulk-select-example"),
                i = window.phoenix.BulkSelect.getInstance(e);
            t.addEventListener("click", (() => {
                o.innerHTML = JSON.stringify(i.getSelectedRows(), void 0, 2);
            }));
        }
    }));
    var phoenix = {
        utils: utils,
        BulkSelect: BulkSelect
    };

    return phoenix;

}));
//# sourceMappingURL=phoenix.js.map