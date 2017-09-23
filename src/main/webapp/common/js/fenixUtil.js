/*
* @Author: yang
* @Date:   2017-09-14 08:34:24
* @Last Modified by:   yang
* @Last Modified time: 2017-09-20 10:43:07
*/
/*严格模式*/
"use strict"

/*1、生成命名空间-FENIX*/
var FENIX = {
    namespace: function(ns) {
        var parts = ns.split("."),
            object = this,
            i, len;

        for (i = 0, len = parts.length; i < len; i++) {

            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }

        return object;
    }
};

/**
 * 封装的一些原生js操作DOM
 */
/*2、获取HTTP连接对象*/
FENIX.getHTTPObject = function getHTTPObject() {
    var request = false;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest(); //IE7+,Firefox,Chrome,Opera,Safari...
    } else if (window.ActiveXObject) {
        request = new ActiveXObject('Microsoft.XMLHTTP'); //IE6,IE5
    }

    return request;
};

/*3、通过id查找元素的方法*/
FENIX.getById = function getById(id) {
    if (!document.getElementById || !document.getElementById(id)) {
        return false;
    }

    return document.getElementById(id);
};

/*4、封装绑定页面加载函数,在需要绑定一个事件时只需运行一次这个函数*/
FENIX.addLoadEvent = function addLoadEvent(func) {
    var oldonload = window.onload;

    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
};

/*5、给DOM元素追加类*/
FENIX.addClass = function addClass(element, value) {
    var reg = new RegExp("\\b" + value + "\\b"),
        newClassName = "";

    if (!element.className) {
        element.className = value;
    } else if (!reg.test(element.className)) {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
};

/*6、给DOM元素删除类*/
FENIX.removeClass = function removeClass(element, value) {
    var reg = new RegExp("\\b" + value + "\\b", "g"),
        newClassName = "";

    if (reg.test(element.className)) {

        //简化版本，实际还应当对空格进行适当的删除，此处应用场景可以不做处理
        newClassName = element.className.replace(reg, "");
        element.className = newClassName;
    }
};

/*7、通过类名查找DOM对象（单个类名）*/
FENIX.getElementsByClassName = function getElementsByClassName(classname, node) {
    var node = node || document;

    if (node.getElementsByClassName) {
        //如果浏览器支持getElementsByClassName方法，则使用浏览器提供的方法
        return node.getElementsByClassName(classname);
    } else {
        var results = [],
            reg = new RegExp("\\b" + classname + "\\b"),
            elems = null;

        if (!document.getElementsByTagName) return false;
        elems = node.getElementsByTagName("*");

        for (var i = 0; i < elems.length; i++) {
            if (reg.test(elems[i].className)) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
};

/*8、封装添加事件句柄的函数*/
FENIX.addHandler = function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
};

/*9、阻止默认事件比如a链接跳转*/
FENIX.preventDefault = function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault(); // 标准技术
    } else if (event.returnValue) {
        event.returnValue = false; // IE
    } else {
        return false; // 用于处理使用对象属性注册的处理程序
    }
}


/**
 * 改进代码风格后的工具类
 * 不再局限原生js
 * 也使用jQuery实现一些工具
 * ——2017.09.14
 */
FENIX.namespace("UTIL"); // 工具类的命名空间

// 数组去重
FENIX.UTIL.unique = function unique(arr) {
    var result = [],
        obj = {},
        len = arr.length,
        i, key;

    for (i = len; i--; /*空语句*/ ) {
        key = arr[i];

        // 如果key第一次出现，则存入result
        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }

    // 由于前面使用了逆序循环，所以此次做反转操作
    result.reverse();
    return result;
};

// 获取范围内的随机数（整数）
FENIX.UTIL.random = function random(min, max) {
    return ~~(0.5 + Math.random() * (max - min) + min);
}
