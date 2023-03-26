"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[724],{

/***/ 7181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ getFieldReference),
/* harmony export */   "b": () => (/* binding */ getDirectiveReference),
/* harmony export */   "c": () => (/* binding */ getArgumentReference),
/* harmony export */   "d": () => (/* binding */ getEnumValueReference),
/* harmony export */   "e": () => (/* binding */ getTypeReference),
/* harmony export */   "g": () => (/* binding */ getTypeInfo)
/* harmony export */ });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4774);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3342);
/* harmony import */ var _forEachState_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1520);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });



function getTypeInfo(schema, tokenState) {
  const info = {
    schema,
    type: null,
    parentType: null,
    inputType: null,
    directiveDef: null,
    fieldDef: null,
    argDef: null,
    argDefs: null,
    objectFieldDefs: null
  };
  (0,_forEachState_es_js__WEBPACK_IMPORTED_MODULE_1__.f)(tokenState, (state) => {
    var _a, _b;
    switch (state.kind) {
      case "Query":
      case "ShortQuery":
        info.type = schema.getQueryType();
        break;
      case "Mutation":
        info.type = schema.getMutationType();
        break;
      case "Subscription":
        info.type = schema.getSubscriptionType();
        break;
      case "InlineFragment":
      case "FragmentDefinition":
        if (state.type) {
          info.type = schema.getType(state.type);
        }
        break;
      case "Field":
      case "AliasedField":
        info.fieldDef = info.type && state.name ? getFieldDef(schema, info.parentType, state.name) : null;
        info.type = (_a = info.fieldDef) === null || _a === void 0 ? void 0 : _a.type;
        break;
      case "SelectionSet":
        info.parentType = info.type ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .getNamedType */ .xC)(info.type) : null;
        break;
      case "Directive":
        info.directiveDef = state.name ? schema.getDirective(state.name) : null;
        break;
      case "Arguments":
        const parentDef = state.prevState ? state.prevState.kind === "Field" ? info.fieldDef : state.prevState.kind === "Directive" ? info.directiveDef : state.prevState.kind === "AliasedField" ? state.prevState.name && getFieldDef(schema, info.parentType, state.prevState.name) : null : null;
        info.argDefs = parentDef ? parentDef.args : null;
        break;
      case "Argument":
        info.argDef = null;
        if (info.argDefs) {
          for (let i = 0; i < info.argDefs.length; i++) {
            if (info.argDefs[i].name === state.name) {
              info.argDef = info.argDefs[i];
              break;
            }
          }
        }
        info.inputType = (_b = info.argDef) === null || _b === void 0 ? void 0 : _b.type;
        break;
      case "EnumValue":
        const enumType = info.inputType ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .getNamedType */ .xC)(info.inputType) : null;
        info.enumValue = enumType instanceof graphql__WEBPACK_IMPORTED_MODULE_2__/* .GraphQLEnumType */ .mR ? find(enumType.getValues(), (val) => val.value === state.name) : null;
        break;
      case "ListValue":
        const nullableType = info.inputType ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .getNullableType */ .tf)(info.inputType) : null;
        info.inputType = nullableType instanceof graphql__WEBPACK_IMPORTED_MODULE_2__/* .GraphQLList */ .p2 ? nullableType.ofType : null;
        break;
      case "ObjectValue":
        const objectType = info.inputType ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .getNamedType */ .xC)(info.inputType) : null;
        info.objectFieldDefs = objectType instanceof graphql__WEBPACK_IMPORTED_MODULE_2__/* .GraphQLInputObjectType */ .sR ? objectType.getFields() : null;
        break;
      case "ObjectField":
        const objectField = state.name && info.objectFieldDefs ? info.objectFieldDefs[state.name] : null;
        info.inputType = objectField === null || objectField === void 0 ? void 0 : objectField.type;
        break;
      case "NamedType":
        info.type = state.name ? schema.getType(state.name) : null;
        break;
    }
  });
  return info;
}
__name(getTypeInfo, "getTypeInfo");
function getFieldDef(schema, type, fieldName) {
  if (fieldName === _index_es_js__WEBPACK_IMPORTED_MODULE_0__.S.name && schema.getQueryType() === type) {
    return _index_es_js__WEBPACK_IMPORTED_MODULE_0__.S;
  }
  if (fieldName === _index_es_js__WEBPACK_IMPORTED_MODULE_0__.T.name && schema.getQueryType() === type) {
    return _index_es_js__WEBPACK_IMPORTED_MODULE_0__.T;
  }
  if (fieldName === _index_es_js__WEBPACK_IMPORTED_MODULE_0__.a.name && (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .isCompositeType */ .Gv)(type)) {
    return _index_es_js__WEBPACK_IMPORTED_MODULE_0__.a;
  }
  if (type && type.getFields) {
    return type.getFields()[fieldName];
  }
}
__name(getFieldDef, "getFieldDef");
function find(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
}
__name(find, "find");
function getFieldReference(typeInfo) {
  return {
    kind: "Field",
    schema: typeInfo.schema,
    field: typeInfo.fieldDef,
    type: isMetaField(typeInfo.fieldDef) ? null : typeInfo.parentType
  };
}
__name(getFieldReference, "getFieldReference");
function getDirectiveReference(typeInfo) {
  return {
    kind: "Directive",
    schema: typeInfo.schema,
    directive: typeInfo.directiveDef
  };
}
__name(getDirectiveReference, "getDirectiveReference");
function getArgumentReference(typeInfo) {
  return typeInfo.directiveDef ? {
    kind: "Argument",
    schema: typeInfo.schema,
    argument: typeInfo.argDef,
    directive: typeInfo.directiveDef
  } : {
    kind: "Argument",
    schema: typeInfo.schema,
    argument: typeInfo.argDef,
    field: typeInfo.fieldDef,
    type: isMetaField(typeInfo.fieldDef) ? null : typeInfo.parentType
  };
}
__name(getArgumentReference, "getArgumentReference");
function getEnumValueReference(typeInfo) {
  return {
    kind: "EnumValue",
    value: typeInfo.enumValue || void 0,
    type: typeInfo.inputType ? (0,graphql__WEBPACK_IMPORTED_MODULE_2__/* .getNamedType */ .xC)(typeInfo.inputType) : void 0
  };
}
__name(getEnumValueReference, "getEnumValueReference");
function getTypeReference(typeInfo, type) {
  return {
    kind: "Type",
    schema: typeInfo.schema,
    type: type || typeInfo.type
  };
}
__name(getTypeReference, "getTypeReference");
function isMetaField(fieldDef) {
  return fieldDef.name.slice(0, 2) === "__";
}
__name(isMetaField, "isMetaField");



/***/ }),

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

/***/ 724:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7181);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3935);
/* harmony import */ var _forEachState_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1520);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });







_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.defineOption("jump", false, (cm, options, old) => {
  if (old && old !== _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.Init) {
    const oldOnMouseOver = cm.state.jump.onMouseOver;
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseover", oldOnMouseOver);
    const oldOnMouseOut = cm.state.jump.onMouseOut;
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseout", oldOnMouseOut);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(document, "keydown", cm.state.jump.onKeyDown);
    delete cm.state.jump;
  }
  if (options) {
    const state = cm.state.jump = {
      options,
      onMouseOver: onMouseOver.bind(null, cm),
      onMouseOut: onMouseOut.bind(null, cm),
      onKeyDown: onKeyDown.bind(null, cm)
    };
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(cm.getWrapperElement(), "mouseout", state.onMouseOut);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(document, "keydown", state.onKeyDown);
  }
});
function onMouseOver(cm, event) {
  const target = event.target || event.srcElement;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  if ((target === null || target === void 0 ? void 0 : target.nodeName) !== "SPAN") {
    return;
  }
  const box = target.getBoundingClientRect();
  const cursor = {
    left: (box.left + box.right) / 2,
    top: (box.top + box.bottom) / 2
  };
  cm.state.jump.cursor = cursor;
  if (cm.state.jump.isHoldingModifier) {
    enableJumpMode(cm);
  }
}
__name(onMouseOver, "onMouseOver");
function onMouseOut(cm) {
  if (!cm.state.jump.isHoldingModifier && cm.state.jump.cursor) {
    cm.state.jump.cursor = null;
    return;
  }
  if (cm.state.jump.isHoldingModifier && cm.state.jump.marker) {
    disableJumpMode(cm);
  }
}
__name(onMouseOut, "onMouseOut");
function onKeyDown(cm, event) {
  if (cm.state.jump.isHoldingModifier || !isJumpModifier(event.key)) {
    return;
  }
  cm.state.jump.isHoldingModifier = true;
  if (cm.state.jump.cursor) {
    enableJumpMode(cm);
  }
  const onKeyUp = /* @__PURE__ */ __name((upEvent) => {
    if (upEvent.code !== event.code) {
      return;
    }
    cm.state.jump.isHoldingModifier = false;
    if (cm.state.jump.marker) {
      disableJumpMode(cm);
    }
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(document, "keyup", onKeyUp);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(document, "click", onClick);
    cm.off("mousedown", onMouseDown);
  }, "onKeyUp");
  const onClick = /* @__PURE__ */ __name((clickEvent) => {
    const { destination, options } = cm.state.jump;
    if (destination) {
      options.onClick(destination, clickEvent);
    }
  }, "onClick");
  const onMouseDown = /* @__PURE__ */ __name((_, downEvent) => {
    if (cm.state.jump.destination) {
      downEvent.codemirrorIgnore = true;
    }
  }, "onMouseDown");
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(document, "keyup", onKeyUp);
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(document, "click", onClick);
  cm.on("mousedown", onMouseDown);
}
__name(onKeyDown, "onKeyDown");
const isMac = typeof navigator !== "undefined" && navigator && navigator.appVersion.includes("Mac");
function isJumpModifier(key) {
  return key === (isMac ? "Meta" : "Control");
}
__name(isJumpModifier, "isJumpModifier");
function enableJumpMode(cm) {
  if (cm.state.jump.marker) {
    return;
  }
  const { cursor, options } = cm.state.jump;
  const pos = cm.coordsChar(cursor);
  const token = cm.getTokenAt(pos, true);
  const getDestination = options.getDestination || cm.getHelper(pos, "jump");
  if (getDestination) {
    const destination = getDestination(token, options, cm);
    if (destination) {
      const marker = cm.markText({ line: pos.line, ch: token.start }, { line: pos.line, ch: token.end }, { className: "CodeMirror-jump-token" });
      cm.state.jump.marker = marker;
      cm.state.jump.destination = destination;
    }
  }
}
__name(enableJumpMode, "enableJumpMode");
function disableJumpMode(cm) {
  const { marker } = cm.state.jump;
  cm.state.jump.marker = null;
  cm.state.jump.destination = null;
  marker.clear();
}
__name(disableJumpMode, "disableJumpMode");
_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.registerHelper("jump", "graphql", (token, options) => {
  if (!options.schema || !options.onClick || !token.state) {
    return;
  }
  const { state } = token;
  const { kind, step } = state;
  const typeInfo = (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.g)(options.schema, state);
  if (kind === "Field" && step === 0 && typeInfo.fieldDef || kind === "AliasedField" && step === 2 && typeInfo.fieldDef) {
    return (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.a)(typeInfo);
  }
  if (kind === "Directive" && step === 1 && typeInfo.directiveDef) {
    return (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.b)(typeInfo);
  }
  if (kind === "Argument" && step === 0 && typeInfo.argDef) {
    return (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.c)(typeInfo);
  }
  if (kind === "EnumValue" && typeInfo.enumValue) {
    return (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.d)(typeInfo);
  }
  if (kind === "NamedType" && typeInfo.type) {
    return (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.e)(typeInfo);
  }
});


/***/ })

}]);
//# sourceMappingURL=724.graphiql.app.js.map