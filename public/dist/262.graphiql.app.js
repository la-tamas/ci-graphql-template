"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[262],{

/***/ 45:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ Position),
/* harmony export */   "R": () => (/* binding */ Range)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class Range {
  constructor(start, end) {
    this.containsPosition = (position) => {
      if (this.start.line === position.line) {
        return this.start.character <= position.character;
      }
      if (this.end.line === position.line) {
        return this.end.character >= position.character;
      }
      return this.start.line <= position.line && this.end.line >= position.line;
    };
    this.start = start;
    this.end = end;
  }
  setStart(line, character) {
    this.start = new Position(line, character);
  }
  setEnd(line, character) {
    this.end = new Position(line, character);
  }
}
__name(Range, "Range");
class Position {
  constructor(line, character) {
    this.lessThanOrEqualTo = (position) => this.line < position.line || this.line === position.line && this.character <= position.character;
    this.line = line;
    this.character = character;
  }
  setLine(line) {
    this.line = line;
  }
  setCharacter(character) {
    this.character = character;
  }
}
__name(Position, "Position");



/***/ }),

/***/ 4262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@graphiql/react/dist/codemirror.es.js
var codemirror_es = __webpack_require__(7480);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
var LoneSchemaDefinitionRule = __webpack_require__(2877);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
var UniqueOperationTypesRule = __webpack_require__(7990);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
var UniqueTypeNamesRule = __webpack_require__(9538);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
var UniqueEnumValueNamesRule = __webpack_require__(3201);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
var UniqueFieldDefinitionNamesRule = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
var UniqueDirectiveNamesRule = __webpack_require__(3274);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
var KnownTypeNamesRule = __webpack_require__(5580);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
var KnownDirectivesRule = __webpack_require__(4873);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
var UniqueDirectivesPerLocationRule = __webpack_require__(6300);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
var PossibleTypeExtensionsRule = __webpack_require__(4800);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
var UniqueArgumentNamesRule = __webpack_require__(2266);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
var UniqueInputFieldNamesRule = __webpack_require__(2767);
// EXTERNAL MODULE: ./node_modules/graphql/validation/specifiedRules.mjs + 20 modules
var specifiedRules = __webpack_require__(7856);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
var NoUnusedFragmentsRule = __webpack_require__(1294);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
var ExecutableDefinitionsRule = __webpack_require__(8081);
// EXTERNAL MODULE: ./node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
var KnownFragmentNamesRule = __webpack_require__(5311);
// EXTERNAL MODULE: ./node_modules/graphql/validation/validate.mjs + 1 modules
var validate = __webpack_require__(6544);
// EXTERNAL MODULE: ./node_modules/graphql/language/kinds.mjs
var kinds = __webpack_require__(7359);
// EXTERNAL MODULE: ./node_modules/graphql/language/printer.mjs + 1 modules
var printer = __webpack_require__(3486);
// EXTERNAL MODULE: ./node_modules/graphql/language/parser.mjs + 4 modules
var parser = __webpack_require__(9658);
// EXTERNAL MODULE: ./node_modules/graphql/error/GraphQLError.mjs + 2 modules
var GraphQLError = __webpack_require__(6375);
// EXTERNAL MODULE: ./node_modules/graphql/jsutils/invariant.mjs
var invariant = __webpack_require__(9551);
// EXTERNAL MODULE: ./node_modules/graphql/type/definition.mjs + 3 modules
var definition = __webpack_require__(4774);
;// CONCATENATED MODULE: ./node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs




/**
 * No deprecated
 *
 * A GraphQL document is only valid if all selected fields and all used enum values have not been
 * deprecated.
 *
 * Note: This rule is optional and is not part of the Validation section of the GraphQL
 * Specification. The main purpose of this rule is detection of deprecated usages and not
 * necessarily to forbid their use when querying a service.
 */
function NoDeprecatedCustomRule(context) {
  return {
    Field(node) {
      const fieldDef = context.getFieldDef();
      const deprecationReason =
        fieldDef === null || fieldDef === void 0
          ? void 0
          : fieldDef.deprecationReason;

      if (fieldDef && deprecationReason != null) {
        const parentType = context.getParentType();
        parentType != null || (0,invariant/* invariant */.k)(false);
        context.reportError(
          new GraphQLError/* GraphQLError */.__(
            `The field ${parentType.name}.${fieldDef.name} is deprecated. ${deprecationReason}`,
            {
              nodes: node,
            },
          ),
        );
      }
    },

    Argument(node) {
      const argDef = context.getArgument();
      const deprecationReason =
        argDef === null || argDef === void 0
          ? void 0
          : argDef.deprecationReason;

      if (argDef && deprecationReason != null) {
        const directiveDef = context.getDirective();

        if (directiveDef != null) {
          context.reportError(
            new GraphQLError/* GraphQLError */.__(
              `Directive "@${directiveDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node,
              },
            ),
          );
        } else {
          const parentType = context.getParentType();
          const fieldDef = context.getFieldDef();
          (parentType != null && fieldDef != null) || (0,invariant/* invariant */.k)(false);
          context.reportError(
            new GraphQLError/* GraphQLError */.__(
              `Field "${parentType.name}.${fieldDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node,
              },
            ),
          );
        }
      }
    },

    ObjectField(node) {
      const inputObjectDef = (0,definition/* getNamedType */.xC)(context.getParentInputType());

      if ((0,definition/* isInputObjectType */.hL)(inputObjectDef)) {
        const inputFieldDef = inputObjectDef.getFields()[node.name.value];
        const deprecationReason =
          inputFieldDef === null || inputFieldDef === void 0
            ? void 0
            : inputFieldDef.deprecationReason;

        if (deprecationReason != null) {
          context.reportError(
            new GraphQLError/* GraphQLError */.__(
              `The input field ${inputObjectDef.name}.${inputFieldDef.name} is deprecated. ${deprecationReason}`,
              {
                nodes: node,
              },
            ),
          );
        }
      }
    },

    EnumValue(node) {
      const enumValueDef = context.getEnumValue();
      const deprecationReason =
        enumValueDef === null || enumValueDef === void 0
          ? void 0
          : enumValueDef.deprecationReason;

      if (enumValueDef && deprecationReason != null) {
        const enumTypeDef = (0,definition/* getNamedType */.xC)(context.getInputType());
        enumTypeDef != null || (0,invariant/* invariant */.k)(false);
        context.reportError(
          new GraphQLError/* GraphQLError */.__(
            `The enum value "${enumTypeDef.name}.${enumValueDef.name}" is deprecated. ${deprecationReason}`,
            {
              nodes: node,
            },
          ),
        );
      }
    },
  };
}

// EXTERNAL MODULE: ./node_modules/@graphiql/react/dist/index.es.js + 2 modules
var index_es = __webpack_require__(3342);
// EXTERNAL MODULE: ./node_modules/@graphiql/react/dist/Range.es.js
var Range_es = __webpack_require__(45);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
;// CONCATENATED MODULE: ./node_modules/@graphiql/react/dist/lint.es.js
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });






const specifiedSDLRules = [
  LoneSchemaDefinitionRule/* LoneSchemaDefinitionRule */.t,
  UniqueOperationTypesRule/* UniqueOperationTypesRule */.q,
  UniqueTypeNamesRule/* UniqueTypeNamesRule */.P,
  UniqueEnumValueNamesRule/* UniqueEnumValueNamesRule */.L,
  UniqueFieldDefinitionNamesRule/* UniqueFieldDefinitionNamesRule */.y,
  UniqueDirectiveNamesRule/* UniqueDirectiveNamesRule */.o,
  KnownTypeNamesRule/* KnownTypeNamesRule */.I,
  KnownDirectivesRule/* KnownDirectivesRule */.J,
  UniqueDirectivesPerLocationRule/* UniqueDirectivesPerLocationRule */.k,
  PossibleTypeExtensionsRule/* PossibleTypeExtensionsRule */.g,
  UniqueArgumentNamesRule/* UniqueArgumentNamesRule */.L,
  UniqueInputFieldNamesRule/* UniqueInputFieldNamesRule */.P
];
function validateWithCustomRules(schema, ast, customRules, isRelayCompatMode, isSchemaDocument) {
  const rules = specifiedRules/* specifiedRules.filter */.i.filter((rule) => {
    if (rule === NoUnusedFragmentsRule/* NoUnusedFragmentsRule */.J || rule === ExecutableDefinitionsRule/* ExecutableDefinitionsRule */.i) {
      return false;
    }
    if (isRelayCompatMode && rule === KnownFragmentNamesRule/* KnownFragmentNamesRule */.a) {
      return false;
    }
    return true;
  });
  if (customRules) {
    Array.prototype.push.apply(rules, customRules);
  }
  if (isSchemaDocument) {
    Array.prototype.push.apply(rules, specifiedSDLRules);
  }
  const errors = (0,validate/* validate */.Gu)(schema, ast, rules);
  return errors.filter((error) => {
    if (error.message.includes("Unknown directive") && error.nodes) {
      const node = error.nodes[0];
      if (node && node.kind === kinds/* Kind.DIRECTIVE */.h.DIRECTIVE) {
        const name = node.name.value;
        if (name === "arguments" || name === "argumentDefinitions") {
          return false;
        }
      }
    }
    return true;
  });
}
__name(validateWithCustomRules, "validateWithCustomRules");
const SEVERITY$1 = {
  Error: "Error",
  Warning: "Warning",
  Information: "Information",
  Hint: "Hint"
};
const DIAGNOSTIC_SEVERITY = {
  [SEVERITY$1.Error]: 1,
  [SEVERITY$1.Warning]: 2,
  [SEVERITY$1.Information]: 3,
  [SEVERITY$1.Hint]: 4
};
const lint_es_invariant = /* @__PURE__ */ __name((condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
}, "invariant");
function getDiagnostics(query, schema = null, customRules, isRelayCompatMode, externalFragments) {
  var _a, _b;
  let ast = null;
  let fragments = "";
  if (externalFragments) {
    fragments = typeof externalFragments === "string" ? externalFragments : externalFragments.reduce((acc, node) => acc + (0,printer/* print */.S)(node) + "\n\n", "");
  }
  const enhancedQuery = fragments ? `${query}

${fragments}` : query;
  try {
    ast = (0,parser/* parse */.Qc)(enhancedQuery);
  } catch (error) {
    if (error instanceof GraphQLError/* GraphQLError */.__) {
      const range = getRange((_b = (_a = error.locations) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { line: 0, column: 0 }, enhancedQuery);
      return [
        {
          severity: DIAGNOSTIC_SEVERITY.Error,
          message: error.message,
          source: "GraphQL: Syntax",
          range
        }
      ];
    }
    throw error;
  }
  return validateQuery(ast, schema, customRules, isRelayCompatMode);
}
__name(getDiagnostics, "getDiagnostics");
function validateQuery(ast, schema = null, customRules, isRelayCompatMode) {
  if (!schema) {
    return [];
  }
  const validationErrorAnnotations = validateWithCustomRules(schema, ast, customRules, isRelayCompatMode).flatMap((error) => annotations(error, DIAGNOSTIC_SEVERITY.Error, "Validation"));
  const deprecationWarningAnnotations = (0,validate/* validate */.Gu)(schema, ast, [
    NoDeprecatedCustomRule
  ]).flatMap((error) => annotations(error, DIAGNOSTIC_SEVERITY.Warning, "Deprecation"));
  return validationErrorAnnotations.concat(deprecationWarningAnnotations);
}
__name(validateQuery, "validateQuery");
function annotations(error, severity, type) {
  if (!error.nodes) {
    return [];
  }
  const highlightedNodes = [];
  error.nodes.forEach((node, i) => {
    const highlightNode = node.kind !== "Variable" && "name" in node && node.name !== void 0 ? node.name : "variable" in node && node.variable !== void 0 ? node.variable : node;
    if (highlightNode) {
      lint_es_invariant(error.locations, "GraphQL validation error requires locations.");
      const loc = error.locations[i];
      const highlightLoc = getLocation(highlightNode);
      const end = loc.column + (highlightLoc.end - highlightLoc.start);
      highlightedNodes.push({
        source: `GraphQL: ${type}`,
        message: error.message,
        severity,
        range: new Range_es.R(new Range_es.P(loc.line - 1, loc.column - 1), new Range_es.P(loc.line - 1, end))
      });
    }
  });
  return highlightedNodes;
}
__name(annotations, "annotations");
function getRange(location, queryText) {
  const parser = (0,index_es.o)();
  const state = parser.startState();
  const lines = queryText.split("\n");
  lint_es_invariant(lines.length >= location.line, "Query text must have more lines than where the error happened");
  let stream = null;
  for (let i = 0; i < location.line; i++) {
    stream = new index_es.C(lines[i]);
    while (!stream.eol()) {
      const style = parser.token(stream, state);
      if (style === "invalidchar") {
        break;
      }
    }
  }
  lint_es_invariant(stream, "Expected Parser stream to be available.");
  const line = location.line - 1;
  const start = stream.getStartOfToken();
  const end = stream.getCurrentPosition();
  return new Range_es.R(new Range_es.P(line, start), new Range_es.P(line, end));
}
__name(getRange, "getRange");
function getLocation(node) {
  const typeCastedNode = node;
  const location = typeCastedNode.loc;
  lint_es_invariant(location, "Expected ASTNode to have a location.");
  return location;
}
__name(getLocation, "getLocation");
const SEVERITY = ["error", "warning", "information", "hint"];
const TYPE = {
  "GraphQL: Validation": "validation",
  "GraphQL: Deprecation": "deprecation",
  "GraphQL: Syntax": "syntax"
};
codemirror_es.C.registerHelper("lint", "graphql", (text, options) => {
  const { schema, validationRules, externalFragments } = options;
  const rawResults = getDiagnostics(text, schema, validationRules, void 0, externalFragments);
  const results = rawResults.map((error) => ({
    message: error.message,
    severity: error.severity ? SEVERITY[error.severity - 1] : SEVERITY[0],
    type: error.source ? TYPE[error.source] : void 0,
    from: codemirror_es.C.Pos(error.range.start.line, error.range.start.character),
    to: codemirror_es.C.Pos(error.range.end.line, error.range.end.character)
  }));
  return results;
});


/***/ })

}]);
//# sourceMappingURL=262.graphiql.app.js.map