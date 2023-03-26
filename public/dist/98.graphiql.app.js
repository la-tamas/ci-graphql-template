"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[98],{

/***/ 2098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3935);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });





function indent(state, textAfter) {
  var _a, _b;
  const { levels, indentLevel } = state;
  const level = !levels || levels.length === 0 ? indentLevel : levels[levels.length - 1] - (((_a = this.electricInput) === null || _a === void 0 ? void 0 : _a.test(textAfter)) ? 1 : 0);
  return (level || 0) * (((_b = this.config) === null || _b === void 0 ? void 0 : _b.indentUnit) || 0);
}
__name(indent, "indent");
const graphqlModeFactory = /* @__PURE__ */ __name((config) => {
  const parser = (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.o)({
    eatWhitespace: (stream) => stream.eatWhile(_index_es_js__WEBPACK_IMPORTED_MODULE_1__.i),
    lexRules: _index_es_js__WEBPACK_IMPORTED_MODULE_1__.L,
    parseRules: _index_es_js__WEBPACK_IMPORTED_MODULE_1__.P,
    editorConfig: { tabSize: config.tabSize }
  });
  return {
    config,
    startState: parser.startState,
    token: parser.token,
    indent,
    electricInput: /^\s*[})\]]/,
    fold: "brace",
    lineComment: "#",
    closeBrackets: {
      pairs: '()[]{}""',
      explode: "()[]{}"
    }
  };
}, "graphqlModeFactory");
_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.defineMode("graphql", graphqlModeFactory);


/***/ })

}]);
//# sourceMappingURL=98.graphiql.app.js.map