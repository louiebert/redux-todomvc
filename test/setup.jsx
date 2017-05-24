"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom = require("jsdom");
var chai = require("chai");
var chai_immutable_1 = require("chai-immutable");
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;
global['document'] = doc;
global['window'] = win;
Object.keys(window).forEach(function (key) {
    if (!(key in global)) {
        global[key] = window[key];
    }
});
chai.use(chai_immutable_1.default);
