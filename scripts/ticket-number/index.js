#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var git = require("./git");
var log_1 = require("./log");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, gitRoot, branch, ignored, ticket, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, log_1.log)("start");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, config_1.loadConfig)()];
            case 2:
                config = _a.sent();
                gitRoot = git.getRoot(config.gitRoot);
                branch = git.getBranchName(gitRoot);
                ignored = new RegExp(config.ignoredBranchesPattern || "^$", "i");
                if (ignored.test(branch)) {
                    (0, log_1.log)("The branch is ignored by the configuration rule");
                    return [2 /*return*/];
                }
                ticket = git.getJiraTicket(branch, config);
                if (ticket === null) {
                    if (config.ignoreBranchesMissingTickets) {
                        (0, log_1.log)("The branch does not contain a JIRA ticket and is ignored by the configuration rule");
                    }
                    else {
                        (0, log_1.error)("The JIRA ticket ID not found");
                    }
                    return [2 /*return*/];
                }
                (0, log_1.log)("The JIRA ticket ID is: ".concat(ticket));
                git.writeJiraTicket(ticket, config);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (typeof err_1 === "string") {
                    (0, log_1.error)(err_1);
                }
                else {
                    (0, log_1.error)(String(err_1));
                }
                return [3 /*break*/, 4];
            case 4:
                (0, log_1.log)("done");
                return [2 /*return*/];
        }
    });
}); })();
