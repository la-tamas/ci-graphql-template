"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[896],{

/***/ 6896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3935);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });





_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.defineMode("graphql-results", (config) => {
  const parser = (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.o)({
    eatWhitespace: (stream) => stream.eatSpace(),
    lexRules: LexRules,
    parseRules: ParseRules,
    editorConfig: { tabSize: config.tabSize }
  });
  return {
    config,
    startState: parser.startState,
    token: parser.token,
    indent,
    electricInput: /^\s*[}\]]/,
    fold: "brace",
    closeBrackets: {
      pairs: '[]{}""',
      explode: "[]{}"
    }
  };
});
function indent(state, textAfter) {
  var _a, _b;
  const { levels, indentLevel } = state;
  const level = !levels || levels.length === 0 ? indentLevel : levels[levels.length - 1] - (((_a = this.electricInput) === null || _a === void 0 ? void 0 : _a.test(textAfter)) ? 1 : 0);
  return (level || 0) * (((_b = this.config) === null || _b === void 0 ? void 0 : _b.indentUnit) || 0);
}
__name(indent, "indent");
const LexRules = {
  Punctuation: /^\[|]|\{|\}|:|,/,
  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
  String: /^"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/,
  Keyword: /^true|false|null/
};
const ParseRules = {
  Document: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("{"), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.l)("Entry", (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)(",")), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("}")],
  Entry: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("String", "def"), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)(":"), "Value"],
  Value(token) {
    switch (token.kind) {
      case "Number":
        return "NumberValue";
      case "String":
        return "StringValue";
      case "Punctuation":
        switch (token.value) {
          case "[":
            return "ListValue";
          case "{":
            return "ObjectValue";
        }
        return null;
      case "Keyword":
        switch (token.value) {
          case "true":
          case "false":
            return "BooleanValue";
          case "null":
            return "NullValue";
        }
        return null;
    }
  },
  NumberValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("Number", "number")],
  StringValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("String", "string")],
  BooleanValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("Keyword", "builtin")],
  NullValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("Keyword", "keyword")],
  ListValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("["), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.l)("Value", (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)(",")), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("]")],
  ObjectValue: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("{"), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.l)("ObjectField", (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)(",")), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)("}")],
  ObjectField: [(0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.t)("String", "property"), (0,_index_es_js__WEBPACK_IMPORTED_MODULE_1__.p)(":"), "Value"]
};


/***/ })

}]);
//# sourceMappingURL=896.graphiql.app.js.map