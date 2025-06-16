"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = debug;
exports.log = log;
exports.error = error;
var verbose = process.argv.find(function (arg) { return arg === "--verbose"; });
var quietLog = process.argv.find(function (arg) { return arg === "--quiet"; });
function debug(message) {
    if (!verbose) {
        return;
    }
    console.log("Prepare commit msg > DEBUG: ".concat(message));
}
function log(message) {
    if (quietLog) {
        return;
    }
    console.log("Prepare commit msg > ".concat(message));
}
function error(err) {
    console.error("Prepare commit msg > ".concat(err));
}
