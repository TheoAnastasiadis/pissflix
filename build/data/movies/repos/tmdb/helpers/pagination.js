"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsEnd = exports.resultsStart = exports.resultsPage = void 0;
const function_1 = require("fp-ts/lib/function");
const O = __importStar(require("fp-ts/Option"));
const TMDB_RESULTS_LIMIT = 20; //this is hardcoded into the API
const TMDB_MAX_PAGES = 1000; // this is hardcoded into the API
const validatePage = (page) => (0, function_1.pipe)(page, O.fromPredicate((page) => page < TMDB_MAX_PAGES), O.getOrElse(() => TMDB_MAX_PAGES - 1));
const validateLimit = (limit) => (0, function_1.pipe)(limit, O.fromPredicate((l) => l <= TMDB_RESULTS_LIMIT), O.getOrElse(() => TMDB_RESULTS_LIMIT));
const resultsPage = (pagination) => (0, function_1.pipe)(O.Do, O.bind("page", () => O.of(validatePage(pagination.page))), O.bind("limit", () => O.of(validateLimit(pagination.limit))), O.map(({ page, limit }) => (page - 1) * limit), //first result we're looking for
O.map((prod) => Math.floor(prod / TMDB_RESULTS_LIMIT) + 1), O.map(validatePage), O.getOrElse(() => 0));
exports.resultsPage = resultsPage;
const resultsStart = (pagination) => (0, function_1.pipe)(O.Do, O.bind("page", () => O.of(validatePage(pagination.page))), O.bind("limit", () => O.of(validateLimit(pagination.limit))), O.map(({ page, limit }) => (page - 1) * limit), //first result in the page we're looking for
O.map((prod) => prod % TMDB_RESULTS_LIMIT), O.getOrElse(() => 0));
exports.resultsStart = resultsStart;
const resultsEnd = (pagination) => (0, function_1.pipe)(resultsStart(pagination), (startId) => Math.min(startId + pagination.limit + 1, TMDB_RESULTS_LIMIT));
exports.resultsEnd = resultsEnd;
