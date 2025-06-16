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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitRevParse = gitRevParse;
exports.getRoot = getRoot;
exports.getBranchName = getBranchName;
exports.getJiraTicket = getJiraTicket;
exports.writeJiraTicket = writeJiraTicket;
var path_1 = require("path");
var log_1 = require("./log");
var gitVerboseStatusSeparator = "------------------------ >8 ------------------------";
function getMsgFilePath(gitRoot, index) {
    if (index === void 0) { index = 0; }
    (0, log_1.debug)("getMsgFilePath");
    if (gitRoot.length > 0) {
        // At first looking into this path, then if it's empty trying other ways
        if (!(0, path_1.isAbsolute)(gitRoot)) {
            var cwd = process.cwd();
            (0, log_1.log)("Resolving .git path from ".concat(cwd));
            gitRoot = (0, path_1.resolve)(cwd, gitRoot);
        }
        if (!gitRoot.includes(".git")) {
            gitRoot = (0, path_1.join)(gitRoot, ".git");
        }
        return (0, path_1.join)(gitRoot, "COMMIT_EDITMSG");
    }
    // It is Husky 5
    if (process.env.HUSKY_GIT_PARAMS === undefined) {
        var messageFilePath = process.argv.find(function (arg) { return arg.includes(".git"); });
        if (messageFilePath) {
            return messageFilePath;
        }
        else {
            throw new Error("You are using Husky 5. Please add $1 to jira-pre-commit-msg's parameters.");
        }
    }
    // Husky 2-4 stashes git hook parameters $* into a HUSKY_GIT_PARAMS env var.
    var gitParams = process.env.HUSKY_GIT_PARAMS || "";
    // Throw a friendly error if the git params environment variable can't be found – the user may be missing Husky.
    if (!gitParams) {
        throw new Error("The process.env.HUSKY_GIT_PARAMS isn't set. Is supported Husky version installed?");
    }
    // Unfortunately, this will break if there are escaped spaces within a single argument;
    // I don't believe there's a workaround for this without modifying Husky itself
    return gitParams.split(" ")[index];
}
function escapeReplacement(str) {
    return str.replace(/[$]/, "$$$$"); // In replacement to escape $ needs $$
}
function replaceMessageByPattern(jiraTicket, message, pattern, replaceAll) {
    var jiraTicketRegExp = new RegExp("\\$J", replaceAll ? "g" : "");
    var messageRegExp = new RegExp("\\$M", replaceAll ? "g" : "");
    var result = pattern
        .replace(jiraTicketRegExp, escapeReplacement(jiraTicket))
        .replace(messageRegExp, escapeReplacement(message));
    (0, log_1.debug)("Replacing message: ".concat(result));
    return result;
}
function getMessageInfo(message, config) {
    (0, log_1.debug)("Original commit message: ".concat(message));
    var messageSections = message.split(gitVerboseStatusSeparator)[0];
    var lines = messageSections
        .trim()
        .split("\n")
        .map(function (line) { return line.trimLeft(); })
        .filter(function (line) { return !line.startsWith(config.commentChar); });
    var cleanMessage = lines.join("\n").trim();
    (0, log_1.debug)("Clean commit message (".concat(cleanMessage.length, "): ").concat(cleanMessage));
    return {
        cleanMessage: cleanMessage,
        originalMessage: message,
        hasAnyText: message.length !== 0,
        hasUserText: cleanMessage.length !== 0,
        hasVerboseText: message.includes(gitVerboseStatusSeparator),
    };
}
function findFirstLineToInsert(lines, config) {
    var firstNotEmptyLine = -1;
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];
        // ignore everything after commentChar or the scissors comment, which present when doing a --verbose commit,
        // or `git config commit.status true`
        if (line === gitVerboseStatusSeparator) {
            break;
        }
        if (line.startsWith(config.commentChar)) {
            continue;
        }
        if (firstNotEmptyLine === -1) {
            firstNotEmptyLine = i;
            break;
        }
    }
    return firstNotEmptyLine;
}
function insertJiraTicketIntoMessage(messageInfo, jiraTicket, config) {
    var _a;
    var message = messageInfo.originalMessage;
    var lines = message.split("\n").map(function (line) { return line.trimLeft(); });
    if (!messageInfo.hasUserText) {
        (0, log_1.debug)("User didn't write the message. Allow empty commit is ".concat(String(config.allowEmptyCommitMessage)));
        var preparedMessage = replaceMessageByPattern(jiraTicket, "", config.messagePattern, config.allowReplaceAllOccurrences);
        if (messageInfo.hasAnyText) {
            var insertedMessage = config.allowEmptyCommitMessage
                ? preparedMessage
                : "# ".concat(preparedMessage, "\n") +
                    "# JIRA prepare commit msg > " +
                    "Please uncomment the line above if you want to insert JIRA ticket into commit message";
            lines.unshift(insertedMessage);
        }
        else {
            if (config.allowEmptyCommitMessage) {
                lines.unshift(preparedMessage);
            }
            else {
                (0, log_1.debug)("Commit message is empty. Skipping...");
            }
        }
    }
    else {
        var firstLineToInsert = findFirstLineToInsert(lines, config);
        (0, log_1.debug)("First line to insert is: ".concat(firstLineToInsert > -1 ? lines[firstLineToInsert] : "", " (").concat(firstLineToInsert, ")"));
        if (firstLineToInsert !== -1) {
            var line = lines[firstLineToInsert];
            if (config.isConventionalCommit) {
                (0, log_1.debug)("Finding conventional commit in: ".concat(line));
                var conventionalCommitRegExp = new RegExp(config.conventionalCommitPattern, "g");
                conventionalCommitRegExp.lastIndex = -1;
                var _b = (_a = conventionalCommitRegExp.exec(line)) !== null && _a !== void 0 ? _a : [], match = _b[0], type = _b[1], scope = _b[2], msg = _b[3];
                if (match) {
                    (0, log_1.debug)("Conventional commit message: ".concat(match));
                    if (!msg.includes(jiraTicket)) {
                        var replacedMessage = replaceMessageByPattern(jiraTicket, msg, config.messagePattern, config.allowReplaceAllOccurrences);
                        lines[firstLineToInsert] = "".concat(type).concat(scope || "", ": ").concat(replacedMessage);
                    }
                }
            }
            else if (!line.includes(jiraTicket)) {
                lines[firstLineToInsert] = replaceMessageByPattern(jiraTicket, line || "", config.messagePattern, config.allowReplaceAllOccurrences);
            }
        }
        // Add jira ticket into the message in case of missing
        if (lines.every(function (line) { return !line.includes(jiraTicket); })) {
            lines[0] = replaceMessageByPattern(jiraTicket, lines[0] || "", config.messagePattern, config.allowReplaceAllOccurrences);
        }
    }
    return lines.join("\n");
}
function gitRevParse(cwd, gitRoot) {
    var _a;
    if (cwd === void 0) { cwd = process.cwd(); }
    if (gitRoot === void 0) { gitRoot = ""; }
    var args = [];
    // If git root is specified, checking existing work tree
    if (gitRoot !== "" && gitRoot !== ".") {
        (0, log_1.log)("Git root is specified as ".concat(gitRoot));
        args.push("--git-dir", gitRoot);
    }
    args.push("rev-parse", "--show-prefix", "--git-common-dir");
    // https://github.com/typicode/husky/issues/580
    // https://github.com/typicode/husky/issues/587
    var proc = Bun.spawnSync(__spreadArray(["git"], args, true), {
        cwd: cwd,
        stdout: "pipe",
        stderr: "pipe",
    });
    if (!proc.success) {
        throw new Error(((_a = proc.stderr) === null || _a === void 0 ? void 0 : _a.toString()) || "Unknown error");
    }
    var _b = proc.stdout
        .toString()
        .split("\n")
        .map(function (s) { return s.trim(); })
        // Normalize for Windows
        .map(function (s) { return s.replace(/\\\\/, "/"); }), prefix = _b[0], gitCommonDir = _b[1];
    return { prefix: prefix, gitCommonDir: gitCommonDir };
}
function getRoot(gitRoot) {
    (0, log_1.debug)("getRoot");
    var cwd = process.cwd();
    var gitCommonDir = gitRevParse(cwd, gitRoot).gitCommonDir;
    // Git rev-parse returns unknown options as is.
    // If we get --absolute-git-dir in the output,
    // it probably means that an old version of Git has been used.
    // There seem to be a bug with --git-common-dir that was fixed in 2.13.0.
    // See issues above.
    if (gitCommonDir === "--git-common-dir") {
        throw new Error("Husky requires Git >= 2.13.0, please upgrade Git");
    }
    return (0, path_1.resolve)(cwd, gitCommonDir);
}
function getBranchName(gitRoot) {
    var _a;
    (0, log_1.debug)("gitBranchName");
    var cwd = process.cwd();
    var args = [];
    // If git root is specified, checking existing work tree
    if (gitRoot !== "" && gitRoot !== ".") {
        args.push("--git-dir", gitRoot);
    }
    args.push("symbolic-ref", "--short", "HEAD");
    var proc = Bun.spawnSync(__spreadArray(["git"], args, true), {
        cwd: cwd,
        stdout: "pipe",
        stderr: "pipe",
    });
    if (!proc.success) {
        throw new Error(((_a = proc.stderr) === null || _a === void 0 ? void 0 : _a.toString()) || "Unknown error");
    }
    return proc.stdout.toString().trim();
}
function getJiraTicket(branchName, config) {
    (0, log_1.debug)("getJiraTicket");
    var jiraIdPattern = new RegExp(config.jiraTicketPattern, "i");
    var matched = jiraIdPattern.exec(branchName);
    var jiraTicket = matched && matched[0];
    return jiraTicket !== null && jiraTicket !== void 0 ? jiraTicket : null;
}
function writeJiraTicket(jiraTicket, config) {
    return __awaiter(this, void 0, void 0, function () {
        var messageFilePath, message, ex_1, messageInfo, messageWithJiraTicket, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, log_1.debug)("writeJiraTicket");
                    messageFilePath = getMsgFilePath(config.gitRoot);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Bun.file(messageFilePath).text()];
                case 2:
                    message = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    console.error(ex_1);
                    throw new Error("Unable to read the file \"".concat(messageFilePath, "\"."));
                case 4:
                    messageInfo = getMessageInfo(message, config);
                    messageWithJiraTicket = insertJiraTicketIntoMessage(messageInfo, jiraTicket, config);
                    (0, log_1.debug)(messageWithJiraTicket);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, Bun.write(messageFilePath, messageWithJiraTicket)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    ex_2 = _a.sent();
                    console.error(ex_2);
                    throw new Error("Unable to write the file \"".concat(messageFilePath, "\"."));
                case 8: return [2 /*return*/];
            }
        });
    });
}
