"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[995],{

/***/ 1520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ forEachState)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function forEachState(stack, fn) {
  const reverseStateStack = [];
  let state = stack;
  while (state === null || state === void 0 ? void 0 : state.kind) {
    reverseStateStack.push(state);
    state = state.prevState;
  }
  for (let i = reverseStateStack.length - 1; i >= 0; i--) {
    fn(reverseStateStack[i]);
  }
}
__name(forEachState, "forEachState");



/***/ }),

/***/ 5995:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4774);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3801);
/* harmony import */ var _forEachState_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1520);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3935);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });






function hintList(cursor, token, list) {
  const hints = filterAndSortList(list, normalizeText(token.string));
  if (!hints) {
    return;
  }
  const tokenStart = token.type !== null && /"|\w/.test(token.string[0]) ? token.start : token.end;
  return {
    list: hints,
    from: { line: cursor.line, ch: tokenStart },
    to: { line: cursor.line, ch: token.end }
  };
}
__name(hintList, "hintList");
function filterAndSortList(list, text) {
  if (!text) {
    return filterNonEmpty(list, (entry) => !entry.isDeprecated);
  }
  const byProximity = list.map((entry) => ({
    proximity: getProximity(normalizeText(entry.text), text),
    entry
  }));
  const conciseMatches = filterNonEmpty(filterNonEmpty(byProximity, (pair) => pair.proximity <= 2), (pair) => !pair.entry.isDeprecated);
  const sortedMatches = conciseMatches.sort((a, b) => (a.entry.isDeprecated ? 1 : 0) - (b.entry.isDeprecated ? 1 : 0) || a.proximity - b.proximity || a.entry.text.length - b.entry.text.length);
  return sortedMatches.map((pair) => pair.entry);
}
__name(filterAndSortList, "filterAndSortList");
function filterNonEmpty(array, predicate) {
  const filtered = array.filter(predicate);
  return filtered.length === 0 ? array : filtered;
}
__name(filterNonEmpty, "filterNonEmpty");
function normalizeText(text) {
  return text.toLowerCase().replace(/\W/g, "");
}
__name(normalizeText, "normalizeText");
function getProximity(suggestion, text) {
  let proximity = lexicalDistance(text, suggestion);
  if (suggestion.length > text.length) {
    proximity -= suggestion.length - text.length - 1;
    proximity += suggestion.indexOf(text) === 0 ? 0 : 0.5;
  }
  return proximity;
}
__name(getProximity, "getProximity");
function lexicalDistance(a, b) {
  let i;
  let j;
  const d = [];
  const aLength = a.length;
  const bLength = b.length;
  for (i = 0; i <= aLength; i++) {
    d[i] = [i];
  }
  for (j = 1; j <= bLength; j++) {
    d[0][j] = j;
  }
  for (i = 1; i <= aLength; i++) {
    for (j = 1; j <= bLength; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }
  return d[aLength][bLength];
}
__name(lexicalDistance, "lexicalDistance");
_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.registerHelper("hint", "graphql-variables", (editor, options) => {
  const cur = editor.getCursor();
  const token = editor.getTokenAt(cur);
  const results = getVariablesHint(cur, token, options);
  if ((results === null || results === void 0 ? void 0 : results.list) && results.list.length > 0) {
    results.from = _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.Pos(results.from.line, results.from.ch);
    results.to = _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.Pos(results.to.line, results.to.ch);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.signal(editor, "hasCompletion", editor, results, token);
  }
  return results;
});
function getVariablesHint(cur, token, options) {
  const state = token.state.kind === "Invalid" ? token.state.prevState : token.state;
  const { kind, step } = state;
  if (kind === "Document" && step === 0) {
    return hintList(cur, token, [{ text: "{" }]);
  }
  const { variableToType } = options;
  if (!variableToType) {
    return;
  }
  const typeInfo = getTypeInfo(variableToType, token.state);
  if (kind === "Document" || kind === "Variable" && step === 0) {
    const variableNames = Object.keys(variableToType);
    return hintList(cur, token, variableNames.map((name) => ({
      text: `"${name}": `,
      type: variableToType[name]
    })));
  }
  if ((kind === "ObjectValue" || kind === "ObjectField" && step === 0) && typeInfo.fields) {
    const inputFields = Object.keys(typeInfo.fields).map((fieldName) => typeInfo.fields[fieldName]);
    return hintList(cur, token, inputFields.map((field) => ({
      text: `"${field.name}": `,
      type: field.type,
      description: field.description
    })));
  }
  if (kind === "StringValue" || kind === "NumberValue" || kind === "BooleanValue" || kind === "NullValue" || kind === "ListValue" && step === 1 || kind === "ObjectField" && step === 2 || kind === "Variable" && step === 2) {
    const namedInputType = typeInfo.type ? (0,graphql__WEBPACK_IMPORTED_MODULE_5__/* .getNamedType */ .xC)(typeInfo.type) : void 0;
    if (namedInputType instanceof graphql__WEBPACK_IMPORTED_MODULE_5__/* .GraphQLInputObjectType */ .sR) {
      return hintList(cur, token, [{ text: "{" }]);
    }
    if (namedInputType instanceof graphql__WEBPACK_IMPORTED_MODULE_5__/* .GraphQLEnumType */ .mR) {
      const values = namedInputType.getValues();
      return hintList(cur, token, values.map((value) => ({
        text: `"${value.name}"`,
        type: namedInputType,
        description: value.description
      })));
    }
    if (namedInputType === graphql__WEBPACK_IMPORTED_MODULE_6__/* .GraphQLBoolean */ .EZ) {
      return hintList(cur, token, [
        { text: "true", type: graphql__WEBPACK_IMPORTED_MODULE_6__/* .GraphQLBoolean */ .EZ, description: "Not false." },
        { text: "false", type: graphql__WEBPACK_IMPORTED_MODULE_6__/* .GraphQLBoolean */ .EZ, description: "Not true." }
      ]);
    }
  }
}
__name(getVariablesHint, "getVariablesHint");
function getTypeInfo(variableToType, tokenState) {
  const info = {
    type: null,
    fields: null
  };
  (0,_forEachState_es_js__WEBPACK_IMPORTED_MODULE_1__.f)(tokenState, (state) => {
    if (state.kind === "Variable") {
      info.type = variableToType[state.name];
    } else if (state.kind === "ListValue") {
      const nullableType = info.type ? (0,graphql__WEBPACK_IMPORTED_MODULE_5__/* .getNullableType */ .tf)(info.type) : void 0;
      info.type = nullableType instanceof graphql__WEBPACK_IMPORTED_MODULE_5__/* .GraphQLList */ .p2 ? nullableType.ofType : null;
    } else if (state.kind === "ObjectValue") {
      const objectType = info.type ? (0,graphql__WEBPACK_IMPORTED_MODULE_5__/* .getNamedType */ .xC)(info.type) : void 0;
      info.fields = objectType instanceof graphql__WEBPACK_IMPORTED_MODULE_5__/* .GraphQLInputObjectType */ .sR ? objectType.getFields() : null;
    } else if (state.kind === "ObjectField") {
      const objectField = state.name && info.fields ? info.fields[state.name] : null;
      info.type = objectField === null || objectField === void 0 ? void 0 : objectField.type;
    }
  });
  return info;
}
__name(getTypeInfo, "getTypeInfo");


/***/ })

}]);
//# sourceMappingURL=995.graphiql.app.js.map