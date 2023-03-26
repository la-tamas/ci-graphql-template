"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[471,574],{

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

/***/ 1574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3935);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });





_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.defineOption("info", false, (cm, options, old) => {
  if (old && old !== _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.Init) {
    const oldOnMouseOver = cm.state.info.onMouseOver;
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseover", oldOnMouseOver);
    clearTimeout(cm.state.info.hoverTimeout);
    delete cm.state.info;
  }
  if (options) {
    const state = cm.state.info = createState(options);
    state.onMouseOver = onMouseOver.bind(null, cm);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
  }
});
function createState(options) {
  return {
    options: options instanceof Function ? { render: options } : options === true ? {} : options
  };
}
__name(createState, "createState");
function getHoverTime(cm) {
  const { options } = cm.state.info;
  return (options === null || options === void 0 ? void 0 : options.hoverTime) || 500;
}
__name(getHoverTime, "getHoverTime");
function onMouseOver(cm, e) {
  const state = cm.state.info;
  const target = e.target || e.srcElement;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  if (target.nodeName !== "SPAN" || state.hoverTimeout !== void 0) {
    return;
  }
  const box = target.getBoundingClientRect();
  const onMouseMove = /* @__PURE__ */ __name(function() {
    clearTimeout(state.hoverTimeout);
    state.hoverTimeout = setTimeout(onHover, hoverTime);
  }, "onMouseMove");
  const onMouseOut = /* @__PURE__ */ __name(function() {
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(document, "mousemove", onMouseMove);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseout", onMouseOut);
    clearTimeout(state.hoverTimeout);
    state.hoverTimeout = void 0;
  }, "onMouseOut");
  const onHover = /* @__PURE__ */ __name(function() {
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(document, "mousemove", onMouseMove);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseout", onMouseOut);
    state.hoverTimeout = void 0;
    onMouseHover(cm, box);
  }, "onHover");
  const hoverTime = getHoverTime(cm);
  state.hoverTimeout = setTimeout(onHover, hoverTime);
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(document, "mousemove", onMouseMove);
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(cm.getWrapperElement(), "mouseout", onMouseOut);
}
__name(onMouseOver, "onMouseOver");
function onMouseHover(cm, box) {
  const pos = cm.coordsChar({
    left: (box.left + box.right) / 2,
    top: (box.top + box.bottom) / 2
  });
  const state = cm.state.info;
  const { options } = state;
  const render = options.render || cm.getHelper(pos, "info");
  if (render) {
    const token = cm.getTokenAt(pos, true);
    if (token) {
      const info = render(token, options, cm, pos);
      if (info) {
        showPopup(cm, box, info);
      }
    }
  }
}
__name(onMouseHover, "onMouseHover");
function showPopup(cm, box, info) {
  const popup = document.createElement("div");
  popup.className = "CodeMirror-info";
  popup.appendChild(info);
  document.body.appendChild(popup);
  const popupBox = popup.getBoundingClientRect();
  const popupStyle = window.getComputedStyle(popup);
  const popupWidth = popupBox.right - popupBox.left + parseFloat(popupStyle.marginLeft) + parseFloat(popupStyle.marginRight);
  const popupHeight = popupBox.bottom - popupBox.top + parseFloat(popupStyle.marginTop) + parseFloat(popupStyle.marginBottom);
  let topPos = box.bottom;
  if (popupHeight > window.innerHeight - box.bottom - 15 && box.top > window.innerHeight - box.bottom) {
    topPos = box.top - popupHeight;
  }
  if (topPos < 0) {
    topPos = box.bottom;
  }
  let leftPos = Math.max(0, window.innerWidth - popupWidth - 15);
  if (leftPos > box.left) {
    leftPos = box.left;
  }
  popup.style.opacity = "1";
  popup.style.top = topPos + "px";
  popup.style.left = leftPos + "px";
  let popupTimeout;
  const onMouseOverPopup = /* @__PURE__ */ __name(function() {
    clearTimeout(popupTimeout);
  }, "onMouseOverPopup");
  const onMouseOut = /* @__PURE__ */ __name(function() {
    clearTimeout(popupTimeout);
    popupTimeout = setTimeout(hidePopup, 200);
  }, "onMouseOut");
  const hidePopup = /* @__PURE__ */ __name(function() {
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(popup, "mouseover", onMouseOverPopup);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(popup, "mouseout", onMouseOut);
    _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.off(cm.getWrapperElement(), "mouseout", onMouseOut);
    if (popup.style.opacity) {
      popup.style.opacity = "0";
      setTimeout(() => {
        if (popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 600);
    } else if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }, "hidePopup");
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(popup, "mouseover", onMouseOverPopup);
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(popup, "mouseout", onMouseOut);
  _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.on(cm.getWrapperElement(), "mouseout", onMouseOut);
}
__name(showPopup, "showPopup");


/***/ }),

/***/ 7471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4774);
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7181);
/* harmony import */ var _info_addon_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1574);
/* harmony import */ var _index_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3935);
/* harmony import */ var _forEachState_es_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1520);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });








_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.C.registerHelper("info", "graphql", (token, options) => {
  if (!options.schema || !token.state) {
    return;
  }
  const { kind, step } = token.state;
  const typeInfo = (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.g)(options.schema, token.state);
  if (kind === "Field" && step === 0 && typeInfo.fieldDef || kind === "AliasedField" && step === 2 && typeInfo.fieldDef) {
    const header = document.createElement("div");
    header.className = "CodeMirror-info-header";
    renderField(header, typeInfo, options);
    const into = document.createElement("div");
    into.appendChild(header);
    renderDescription(into, options, typeInfo.fieldDef);
    return into;
  }
  if (kind === "Directive" && step === 1 && typeInfo.directiveDef) {
    const header = document.createElement("div");
    header.className = "CodeMirror-info-header";
    renderDirective(header, typeInfo, options);
    const into = document.createElement("div");
    into.appendChild(header);
    renderDescription(into, options, typeInfo.directiveDef);
    return into;
  }
  if (kind === "Argument" && step === 0 && typeInfo.argDef) {
    const header = document.createElement("div");
    header.className = "CodeMirror-info-header";
    renderArg(header, typeInfo, options);
    const into = document.createElement("div");
    into.appendChild(header);
    renderDescription(into, options, typeInfo.argDef);
    return into;
  }
  if (kind === "EnumValue" && typeInfo.enumValue && typeInfo.enumValue.description) {
    const header = document.createElement("div");
    header.className = "CodeMirror-info-header";
    renderEnumValue(header, typeInfo, options);
    const into = document.createElement("div");
    into.appendChild(header);
    renderDescription(into, options, typeInfo.enumValue);
    return into;
  }
  if (kind === "NamedType" && typeInfo.type && typeInfo.type.description) {
    const header = document.createElement("div");
    header.className = "CodeMirror-info-header";
    renderType(header, typeInfo, options, typeInfo.type);
    const into = document.createElement("div");
    into.appendChild(header);
    renderDescription(into, options, typeInfo.type);
    return into;
  }
});
function renderField(into, typeInfo, options) {
  renderQualifiedField(into, typeInfo, options);
  renderTypeAnnotation(into, typeInfo, options, typeInfo.type);
}
__name(renderField, "renderField");
function renderQualifiedField(into, typeInfo, options) {
  var _a;
  const fieldName = ((_a = typeInfo.fieldDef) === null || _a === void 0 ? void 0 : _a.name) || "";
  text(into, fieldName, "field-name", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.a)(typeInfo));
}
__name(renderQualifiedField, "renderQualifiedField");
function renderDirective(into, typeInfo, options) {
  var _a;
  const name = "@" + (((_a = typeInfo.directiveDef) === null || _a === void 0 ? void 0 : _a.name) || "");
  text(into, name, "directive-name", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.b)(typeInfo));
}
__name(renderDirective, "renderDirective");
function renderArg(into, typeInfo, options) {
  var _a;
  const name = ((_a = typeInfo.argDef) === null || _a === void 0 ? void 0 : _a.name) || "";
  text(into, name, "arg-name", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.c)(typeInfo));
  renderTypeAnnotation(into, typeInfo, options, typeInfo.inputType);
}
__name(renderArg, "renderArg");
function renderEnumValue(into, typeInfo, options) {
  var _a;
  const name = ((_a = typeInfo.enumValue) === null || _a === void 0 ? void 0 : _a.name) || "";
  renderType(into, typeInfo, options, typeInfo.inputType);
  text(into, ".");
  text(into, name, "enum-value", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.d)(typeInfo));
}
__name(renderEnumValue, "renderEnumValue");
function renderTypeAnnotation(into, typeInfo, options, t) {
  const typeSpan = document.createElement("span");
  typeSpan.className = "type-name-pill";
  if (t instanceof graphql__WEBPACK_IMPORTED_MODULE_7__/* .GraphQLNonNull */ .bM) {
    renderType(typeSpan, typeInfo, options, t.ofType);
    text(typeSpan, "!");
  } else if (t instanceof graphql__WEBPACK_IMPORTED_MODULE_7__/* .GraphQLList */ .p2) {
    text(typeSpan, "[");
    renderType(typeSpan, typeInfo, options, t.ofType);
    text(typeSpan, "]");
  } else {
    text(typeSpan, (t === null || t === void 0 ? void 0 : t.name) || "", "type-name", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.e)(typeInfo, t));
  }
  into.appendChild(typeSpan);
}
__name(renderTypeAnnotation, "renderTypeAnnotation");
function renderType(into, typeInfo, options, t) {
  if (t instanceof graphql__WEBPACK_IMPORTED_MODULE_7__/* .GraphQLNonNull */ .bM) {
    renderType(into, typeInfo, options, t.ofType);
    text(into, "!");
  } else if (t instanceof graphql__WEBPACK_IMPORTED_MODULE_7__/* .GraphQLList */ .p2) {
    text(into, "[");
    renderType(into, typeInfo, options, t.ofType);
    text(into, "]");
  } else {
    text(into, (t === null || t === void 0 ? void 0 : t.name) || "", "type-name", options, (0,_SchemaReference_es_js__WEBPACK_IMPORTED_MODULE_1__.e)(typeInfo, t));
  }
}
__name(renderType, "renderType");
function renderDescription(into, options, def) {
  const { description } = def;
  if (description) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "info-description";
    if (options.renderDescription) {
      descriptionDiv.innerHTML = options.renderDescription(description);
    } else {
      descriptionDiv.appendChild(document.createTextNode(description));
    }
    into.appendChild(descriptionDiv);
  }
  renderDeprecation(into, options, def);
}
__name(renderDescription, "renderDescription");
function renderDeprecation(into, options, def) {
  const reason = def.deprecationReason;
  if (reason) {
    const deprecationDiv = document.createElement("div");
    deprecationDiv.className = "info-deprecation";
    into.appendChild(deprecationDiv);
    const label = document.createElement("span");
    label.className = "info-deprecation-label";
    label.appendChild(document.createTextNode("Deprecated"));
    deprecationDiv.appendChild(label);
    const reasonDiv = document.createElement("div");
    reasonDiv.className = "info-deprecation-reason";
    if (options.renderDescription) {
      reasonDiv.innerHTML = options.renderDescription(reason);
    } else {
      reasonDiv.appendChild(document.createTextNode(reason));
    }
    deprecationDiv.appendChild(reasonDiv);
  }
}
__name(renderDeprecation, "renderDeprecation");
function text(into, content, className = "", options = { onClick: null }, ref = null) {
  if (className) {
    const { onClick } = options;
    let node;
    if (onClick) {
      node = document.createElement("a");
      node.href = "javascript:void 0";
      node.addEventListener("click", (e) => {
        onClick(ref, e);
      });
    } else {
      node = document.createElement("span");
    }
    node.className = className;
    node.appendChild(document.createTextNode(content));
    into.appendChild(node);
  } else {
    into.appendChild(document.createTextNode(content));
  }
}
__name(text, "text");


/***/ })

}]);
//# sourceMappingURL=471.graphiql.app.js.map