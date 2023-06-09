"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[863],{

/***/ 9863:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ javascript$1)
/* harmony export */ });
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

function _mergeNamespaces(n, m) {
  m.forEach(function(e) {
    e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
      if (k !== "default" && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  });
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
__name(_mergeNamespaces, "_mergeNamespaces");
var javascript$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    CodeMirror.defineMode("javascript", function(config, parserConfig) {
      var indentUnit = config.indentUnit;
      var statementIndent = parserConfig.statementIndent;
      var jsonldMode = parserConfig.jsonld;
      var jsonMode = parserConfig.json || jsonldMode;
      var trackScope = parserConfig.trackScope !== false;
      var isTS = parserConfig.typescript;
      var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
      var keywords = function() {
        function kw(type2) {
          return { type: type2, style: "keyword" };
        }
        __name(kw, "kw");
        var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
        var operator = kw("operator"), atom = { type: "atom", style: "atom" };
        return {
          "if": kw("if"),
          "while": A,
          "with": A,
          "else": B,
          "do": B,
          "try": B,
          "finally": B,
          "return": D,
          "break": D,
          "continue": D,
          "new": kw("new"),
          "delete": C,
          "void": C,
          "throw": C,
          "debugger": kw("debugger"),
          "var": kw("var"),
          "const": kw("var"),
          "let": kw("var"),
          "function": kw("function"),
          "catch": kw("catch"),
          "for": kw("for"),
          "switch": kw("switch"),
          "case": kw("case"),
          "default": kw("default"),
          "in": operator,
          "typeof": operator,
          "instanceof": operator,
          "true": atom,
          "false": atom,
          "null": atom,
          "undefined": atom,
          "NaN": atom,
          "Infinity": atom,
          "this": kw("this"),
          "class": kw("class"),
          "super": kw("atom"),
          "yield": C,
          "export": kw("export"),
          "import": kw("import"),
          "extends": C,
          "await": C
        };
      }();
      var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
      var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
      function readRegexp(stream) {
        var escaped = false, next, inSet = false;
        while ((next = stream.next()) != null) {
          if (!escaped) {
            if (next == "/" && !inSet)
              return;
            if (next == "[")
              inSet = true;
            else if (inSet && next == "]")
              inSet = false;
          }
          escaped = !escaped && next == "\\";
        }
      }
      __name(readRegexp, "readRegexp");
      var type, content;
      function ret(tp, style, cont2) {
        type = tp;
        content = cont2;
        return style;
      }
      __name(ret, "ret");
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
          return ret("number", "number");
        } else if (ch == "." && stream.match("..")) {
          return ret("spread", "meta");
        } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
          return ret(ch);
        } else if (ch == "=" && stream.eat(">")) {
          return ret("=>", "operator");
        } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
          return ret("number", "number");
        } else if (/\d/.test(ch)) {
          stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
          return ret("number", "number");
        } else if (ch == "/") {
          if (stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          } else if (stream.eat("/")) {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (expressionAllowed(stream, state, 1)) {
            readRegexp(stream);
            stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
            return ret("regexp", "string-2");
          } else {
            stream.eat("=");
            return ret("operator", "operator", stream.current());
          }
        } else if (ch == "`") {
          state.tokenize = tokenQuasi;
          return tokenQuasi(stream, state);
        } else if (ch == "#" && stream.peek() == "!") {
          stream.skipToEnd();
          return ret("meta", "meta");
        } else if (ch == "#" && stream.eatWhile(wordRE)) {
          return ret("variable", "property");
        } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (isOperatorChar.test(ch)) {
          if (ch != ">" || !state.lexical || state.lexical.type != ">") {
            if (stream.eat("=")) {
              if (ch == "!" || ch == "=")
                stream.eat("=");
            } else if (/[<>*+\-|&?]/.test(ch)) {
              stream.eat(ch);
              if (ch == ">")
                stream.eat(ch);
            }
          }
          if (ch == "?" && stream.eat("."))
            return ret(".");
          return ret("operator", "operator", stream.current());
        } else if (wordRE.test(ch)) {
          stream.eatWhile(wordRE);
          var word = stream.current();
          if (state.lastType != ".") {
            if (keywords.propertyIsEnumerable(word)) {
              var kw = keywords[word];
              return ret(kw.type, kw.style, word);
            }
            if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
              return ret("async", "keyword", word);
          }
          return ret("variable", "variable", word);
        }
      }
      __name(tokenBase, "tokenBase");
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next;
          if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
            state.tokenize = tokenBase;
            return ret("jsonld-keyword", "meta");
          }
          while ((next = stream.next()) != null) {
            if (next == quote && !escaped)
              break;
            escaped = !escaped && next == "\\";
          }
          if (!escaped)
            state.tokenize = tokenBase;
          return ret("string", "string");
        };
      }
      __name(tokenString, "tokenString");
      function tokenComment(stream, state) {
        var maybeEnd = false, ch;
        while (ch = stream.next()) {
          if (ch == "/" && maybeEnd) {
            state.tokenize = tokenBase;
            break;
          }
          maybeEnd = ch == "*";
        }
        return ret("comment", "comment");
      }
      __name(tokenComment, "tokenComment");
      function tokenQuasi(stream, state) {
        var escaped = false, next;
        while ((next = stream.next()) != null) {
          if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
            state.tokenize = tokenBase;
            break;
          }
          escaped = !escaped && next == "\\";
        }
        return ret("quasi", "string-2", stream.current());
      }
      __name(tokenQuasi, "tokenQuasi");
      var brackets = "([{}])";
      function findFatArrow(stream, state) {
        if (state.fatArrowAt)
          state.fatArrowAt = null;
        var arrow = stream.string.indexOf("=>", stream.start);
        if (arrow < 0)
          return;
        if (isTS) {
          var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
          if (m)
            arrow = m.index;
        }
        var depth = 0, sawSomething = false;
        for (var pos = arrow - 1; pos >= 0; --pos) {
          var ch = stream.string.charAt(pos);
          var bracket = brackets.indexOf(ch);
          if (bracket >= 0 && bracket < 3) {
            if (!depth) {
              ++pos;
              break;
            }
            if (--depth == 0) {
              if (ch == "(")
                sawSomething = true;
              break;
            }
          } else if (bracket >= 3 && bracket < 6) {
            ++depth;
          } else if (wordRE.test(ch)) {
            sawSomething = true;
          } else if (/["'\/`]/.test(ch)) {
            for (; ; --pos) {
              if (pos == 0)
                return;
              var next = stream.string.charAt(pos - 1);
              if (next == ch && stream.string.charAt(pos - 2) != "\\") {
                pos--;
                break;
              }
            }
          } else if (sawSomething && !depth) {
            ++pos;
            break;
          }
        }
        if (sawSomething && !depth)
          state.fatArrowAt = pos;
      }
      __name(findFatArrow, "findFatArrow");
      var atomicTypes = {
        "atom": true,
        "number": true,
        "variable": true,
        "string": true,
        "regexp": true,
        "this": true,
        "import": true,
        "jsonld-keyword": true
      };
      function JSLexical(indented, column, type2, align, prev, info) {
        this.indented = indented;
        this.column = column;
        this.type = type2;
        this.prev = prev;
        this.info = info;
        if (align != null)
          this.align = align;
      }
      __name(JSLexical, "JSLexical");
      function inScope(state, varname) {
        if (!trackScope)
          return false;
        for (var v = state.localVars; v; v = v.next)
          if (v.name == varname)
            return true;
        for (var cx2 = state.context; cx2; cx2 = cx2.prev) {
          for (var v = cx2.vars; v; v = v.next)
            if (v.name == varname)
              return true;
        }
      }
      __name(inScope, "inScope");
      function parseJS(state, style, type2, content2, stream) {
        var cc = state.cc;
        cx.state = state;
        cx.stream = stream;
        cx.marked = null, cx.cc = cc;
        cx.style = style;
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = true;
        while (true) {
          var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
          if (combinator(type2, content2)) {
            while (cc.length && cc[cc.length - 1].lex)
              cc.pop()();
            if (cx.marked)
              return cx.marked;
            if (type2 == "variable" && inScope(state, content2))
              return "variable-2";
            return style;
          }
        }
      }
      __name(parseJS, "parseJS");
      var cx = { state: null, column: null, marked: null, cc: null };
      function pass() {
        for (var i = arguments.length - 1; i >= 0; i--)
          cx.cc.push(arguments[i]);
      }
      __name(pass, "pass");
      function cont() {
        pass.apply(null, arguments);
        return true;
      }
      __name(cont, "cont");
      function inList(name, list) {
        for (var v = list; v; v = v.next)
          if (v.name == name)
            return true;
        return false;
      }
      __name(inList, "inList");
      function register(varname) {
        var state = cx.state;
        cx.marked = "def";
        if (!trackScope)
          return;
        if (state.context) {
          if (state.lexical.info == "var" && state.context && state.context.block) {
            var newContext = registerVarScoped(varname, state.context);
            if (newContext != null) {
              state.context = newContext;
              return;
            }
          } else if (!inList(varname, state.localVars)) {
            state.localVars = new Var(varname, state.localVars);
            return;
          }
        }
        if (parserConfig.globalVars && !inList(varname, state.globalVars))
          state.globalVars = new Var(varname, state.globalVars);
      }
      __name(register, "register");
      function registerVarScoped(varname, context) {
        if (!context) {
          return null;
        } else if (context.block) {
          var inner = registerVarScoped(varname, context.prev);
          if (!inner)
            return null;
          if (inner == context.prev)
            return context;
          return new Context(inner, context.vars, true);
        } else if (inList(varname, context.vars)) {
          return context;
        } else {
          return new Context(context.prev, new Var(varname, context.vars), false);
        }
      }
      __name(registerVarScoped, "registerVarScoped");
      function isModifier(name) {
        return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
      }
      __name(isModifier, "isModifier");
      function Context(prev, vars, block2) {
        this.prev = prev;
        this.vars = vars;
        this.block = block2;
      }
      __name(Context, "Context");
      function Var(name, next) {
        this.name = name;
        this.next = next;
      }
      __name(Var, "Var");
      var defaultVars = new Var("this", new Var("arguments", null));
      function pushcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
        cx.state.localVars = defaultVars;
      }
      __name(pushcontext, "pushcontext");
      function pushblockcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
        cx.state.localVars = null;
      }
      __name(pushblockcontext, "pushblockcontext");
      pushcontext.lex = pushblockcontext.lex = true;
      function popcontext() {
        cx.state.localVars = cx.state.context.vars;
        cx.state.context = cx.state.context.prev;
      }
      __name(popcontext, "popcontext");
      popcontext.lex = true;
      function pushlex(type2, info) {
        var result = /* @__PURE__ */ __name(function() {
          var state = cx.state, indent = state.indented;
          if (state.lexical.type == "stat")
            indent = state.lexical.indented;
          else
            for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
              indent = outer.indented;
          state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
        }, "result");
        result.lex = true;
        return result;
      }
      __name(pushlex, "pushlex");
      function poplex() {
        var state = cx.state;
        if (state.lexical.prev) {
          if (state.lexical.type == ")")
            state.indented = state.lexical.indented;
          state.lexical = state.lexical.prev;
        }
      }
      __name(poplex, "poplex");
      poplex.lex = true;
      function expect(wanted) {
        function exp(type2) {
          if (type2 == wanted)
            return cont();
          else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]")
            return pass();
          else
            return cont(exp);
        }
        __name(exp, "exp");
        return exp;
      }
      __name(expect, "expect");
      function statement(type2, value) {
        if (type2 == "var")
          return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
        if (type2 == "keyword a")
          return cont(pushlex("form"), parenExpr, statement, poplex);
        if (type2 == "keyword b")
          return cont(pushlex("form"), statement, poplex);
        if (type2 == "keyword d")
          return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
        if (type2 == "debugger")
          return cont(expect(";"));
        if (type2 == "{")
          return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
        if (type2 == ";")
          return cont();
        if (type2 == "if") {
          if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
            cx.state.cc.pop()();
          return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
        }
        if (type2 == "function")
          return cont(functiondef);
        if (type2 == "for")
          return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
        }
        if (type2 == "variable") {
          if (isTS && value == "declare") {
            cx.marked = "keyword";
            return cont(statement);
          } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
            cx.marked = "keyword";
            if (value == "enum")
              return cont(enumdef);
            else if (value == "type")
              return cont(typename, expect("operator"), typeexpr, expect(";"));
            else
              return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
          } else if (isTS && value == "namespace") {
            cx.marked = "keyword";
            return cont(pushlex("form"), expression, statement, poplex);
          } else if (isTS && value == "abstract") {
            cx.marked = "keyword";
            return cont(statement);
          } else {
            return cont(pushlex("stat"), maybelabel);
          }
        }
        if (type2 == "switch")
          return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext, block, poplex, poplex, popcontext);
        if (type2 == "case")
          return cont(expression, expect(":"));
        if (type2 == "default")
          return cont(expect(":"));
        if (type2 == "catch")
          return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
        if (type2 == "export")
          return cont(pushlex("stat"), afterExport, poplex);
        if (type2 == "import")
          return cont(pushlex("stat"), afterImport, poplex);
        if (type2 == "async")
          return cont(statement);
        if (value == "@")
          return cont(expression, statement);
        return pass(pushlex("stat"), expression, expect(";"), poplex);
      }
      __name(statement, "statement");
      function maybeCatchBinding(type2) {
        if (type2 == "(")
          return cont(funarg, expect(")"));
      }
      __name(maybeCatchBinding, "maybeCatchBinding");
      function expression(type2, value) {
        return expressionInner(type2, value, false);
      }
      __name(expression, "expression");
      function expressionNoComma(type2, value) {
        return expressionInner(type2, value, true);
      }
      __name(expressionNoComma, "expressionNoComma");
      function parenExpr(type2) {
        if (type2 != "(")
          return pass();
        return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
      }
      __name(parenExpr, "parenExpr");
      function expressionInner(type2, value, noComma) {
        if (cx.state.fatArrowAt == cx.stream.start) {
          var body = noComma ? arrowBodyNoComma : arrowBody;
          if (type2 == "(")
            return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
          else if (type2 == "variable")
            return pass(pushcontext, pattern, expect("=>"), body, popcontext);
        }
        var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
        if (atomicTypes.hasOwnProperty(type2))
          return cont(maybeop);
        if (type2 == "function")
          return cont(functiondef, maybeop);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form"), classExpression, poplex);
        }
        if (type2 == "keyword c" || type2 == "async")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "(")
          return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
        if (type2 == "operator" || type2 == "spread")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "[")
          return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
        if (type2 == "{")
          return contCommasep(objprop, "}", null, maybeop);
        if (type2 == "quasi")
          return pass(quasi, maybeop);
        if (type2 == "new")
          return cont(maybeTarget(noComma));
        return cont();
      }
      __name(expressionInner, "expressionInner");
      function maybeexpression(type2) {
        if (type2.match(/[;\}\)\],]/))
          return pass();
        return pass(expression);
      }
      __name(maybeexpression, "maybeexpression");
      function maybeoperatorComma(type2, value) {
        if (type2 == ",")
          return cont(maybeexpression);
        return maybeoperatorNoComma(type2, value, false);
      }
      __name(maybeoperatorComma, "maybeoperatorComma");
      function maybeoperatorNoComma(type2, value, noComma) {
        var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
        var expr = noComma == false ? expression : expressionNoComma;
        if (type2 == "=>")
          return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
        if (type2 == "operator") {
          if (/\+\+|--/.test(value) || isTS && value == "!")
            return cont(me);
          if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
          if (value == "?")
            return cont(expression, expect(":"), expr);
          return cont(expr);
        }
        if (type2 == "quasi") {
          return pass(quasi, me);
        }
        if (type2 == ";")
          return;
        if (type2 == "(")
          return contCommasep(expressionNoComma, ")", "call", me);
        if (type2 == ".")
          return cont(property, me);
        if (type2 == "[")
          return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
        if (isTS && value == "as") {
          cx.marked = "keyword";
          return cont(typeexpr, me);
        }
        if (type2 == "regexp") {
          cx.state.lastType = cx.marked = "operator";
          cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
          return cont(expr);
        }
      }
      __name(maybeoperatorNoComma, "maybeoperatorNoComma");
      function quasi(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasi);
        return cont(maybeexpression, continueQuasi);
      }
      __name(quasi, "quasi");
      function continueQuasi(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasi);
        }
      }
      __name(continueQuasi, "continueQuasi");
      function arrowBody(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expression);
      }
      __name(arrowBody, "arrowBody");
      function arrowBodyNoComma(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expressionNoComma);
      }
      __name(arrowBodyNoComma, "arrowBodyNoComma");
      function maybeTarget(noComma) {
        return function(type2) {
          if (type2 == ".")
            return cont(noComma ? targetNoComma : target);
          else if (type2 == "variable" && isTS)
            return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
          else
            return pass(noComma ? expressionNoComma : expression);
        };
      }
      __name(maybeTarget, "maybeTarget");
      function target(_, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorComma);
        }
      }
      __name(target, "target");
      function targetNoComma(_, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorNoComma);
        }
      }
      __name(targetNoComma, "targetNoComma");
      function maybelabel(type2) {
        if (type2 == ":")
          return cont(poplex, statement);
        return pass(maybeoperatorComma, expect(";"), poplex);
      }
      __name(maybelabel, "maybelabel");
      function property(type2) {
        if (type2 == "variable") {
          cx.marked = "property";
          return cont();
        }
      }
      __name(property, "property");
      function objprop(type2, value) {
        if (type2 == "async") {
          cx.marked = "property";
          return cont(objprop);
        } else if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          if (value == "get" || value == "set")
            return cont(getterSetter);
          var m;
          if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
            cx.state.fatArrowAt = cx.stream.pos + m[0].length;
          return cont(afterprop);
        } else if (type2 == "number" || type2 == "string") {
          cx.marked = jsonldMode ? "property" : cx.style + " property";
          return cont(afterprop);
        } else if (type2 == "jsonld-keyword") {
          return cont(afterprop);
        } else if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == "[") {
          return cont(expression, maybetype, expect("]"), afterprop);
        } else if (type2 == "spread") {
          return cont(expressionNoComma, afterprop);
        } else if (value == "*") {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == ":") {
          return pass(afterprop);
        }
      }
      __name(objprop, "objprop");
      function getterSetter(type2) {
        if (type2 != "variable")
          return pass(afterprop);
        cx.marked = "property";
        return cont(functiondef);
      }
      __name(getterSetter, "getterSetter");
      function afterprop(type2) {
        if (type2 == ":")
          return cont(expressionNoComma);
        if (type2 == "(")
          return pass(functiondef);
      }
      __name(afterprop, "afterprop");
      function commasep(what, end, sep) {
        function proceed(type2, value) {
          if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
            var lex = cx.state.lexical;
            if (lex.info == "call")
              lex.pos = (lex.pos || 0) + 1;
            return cont(function(type3, value2) {
              if (type3 == end || value2 == end)
                return pass();
              return pass(what);
            }, proceed);
          }
          if (type2 == end || value == end)
            return cont();
          if (sep && sep.indexOf(";") > -1)
            return pass(what);
          return cont(expect(end));
        }
        __name(proceed, "proceed");
        return function(type2, value) {
          if (type2 == end || value == end)
            return cont();
          return pass(what, proceed);
        };
      }
      __name(commasep, "commasep");
      function contCommasep(what, end, info) {
        for (var i = 3; i < arguments.length; i++)
          cx.cc.push(arguments[i]);
        return cont(pushlex(end, info), commasep(what, end), poplex);
      }
      __name(contCommasep, "contCommasep");
      function block(type2) {
        if (type2 == "}")
          return cont();
        return pass(statement, block);
      }
      __name(block, "block");
      function maybetype(type2, value) {
        if (isTS) {
          if (type2 == ":")
            return cont(typeexpr);
          if (value == "?")
            return cont(maybetype);
        }
      }
      __name(maybetype, "maybetype");
      function maybetypeOrIn(type2, value) {
        if (isTS && (type2 == ":" || value == "in"))
          return cont(typeexpr);
      }
      __name(maybetypeOrIn, "maybetypeOrIn");
      function mayberettype(type2) {
        if (isTS && type2 == ":") {
          if (cx.stream.match(/^\s*\w+\s+is\b/, false))
            return cont(expression, isKW, typeexpr);
          else
            return cont(typeexpr);
        }
      }
      __name(mayberettype, "mayberettype");
      function isKW(_, value) {
        if (value == "is") {
          cx.marked = "keyword";
          return cont();
        }
      }
      __name(isKW, "isKW");
      function typeexpr(type2, value) {
        if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
          cx.marked = "keyword";
          return cont(value == "typeof" ? expressionNoComma : typeexpr);
        }
        if (type2 == "variable" || value == "void") {
          cx.marked = "type";
          return cont(afterType);
        }
        if (value == "|" || value == "&")
          return cont(typeexpr);
        if (type2 == "string" || type2 == "number" || type2 == "atom")
          return cont(afterType);
        if (type2 == "[")
          return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
        if (type2 == "{")
          return cont(pushlex("}"), typeprops, poplex, afterType);
        if (type2 == "(")
          return cont(commasep(typearg, ")"), maybeReturnType, afterType);
        if (type2 == "<")
          return cont(commasep(typeexpr, ">"), typeexpr);
        if (type2 == "quasi") {
          return pass(quasiType, afterType);
        }
      }
      __name(typeexpr, "typeexpr");
      function maybeReturnType(type2) {
        if (type2 == "=>")
          return cont(typeexpr);
      }
      __name(maybeReturnType, "maybeReturnType");
      function typeprops(type2) {
        if (type2.match(/[\}\)\]]/))
          return cont();
        if (type2 == "," || type2 == ";")
          return cont(typeprops);
        return pass(typeprop, typeprops);
      }
      __name(typeprops, "typeprops");
      function typeprop(type2, value) {
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(typeprop);
        } else if (value == "?" || type2 == "number" || type2 == "string") {
          return cont(typeprop);
        } else if (type2 == ":") {
          return cont(typeexpr);
        } else if (type2 == "[") {
          return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
        } else if (type2 == "(") {
          return pass(functiondecl, typeprop);
        } else if (!type2.match(/[;\}\)\],]/)) {
          return cont();
        }
      }
      __name(typeprop, "typeprop");
      function quasiType(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasiType);
        return cont(typeexpr, continueQuasiType);
      }
      __name(quasiType, "quasiType");
      function continueQuasiType(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasiType);
        }
      }
      __name(continueQuasiType, "continueQuasiType");
      function typearg(type2, value) {
        if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?")
          return cont(typearg);
        if (type2 == ":")
          return cont(typeexpr);
        if (type2 == "spread")
          return cont(typearg);
        return pass(typeexpr);
      }
      __name(typearg, "typearg");
      function afterType(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
        if (value == "|" || type2 == "." || value == "&")
          return cont(typeexpr);
        if (type2 == "[")
          return cont(typeexpr, expect("]"), afterType);
        if (value == "extends" || value == "implements") {
          cx.marked = "keyword";
          return cont(typeexpr);
        }
        if (value == "?")
          return cont(typeexpr, expect(":"), typeexpr);
      }
      __name(afterType, "afterType");
      function maybeTypeArgs(_, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      }
      __name(maybeTypeArgs, "maybeTypeArgs");
      function typeparam() {
        return pass(typeexpr, maybeTypeDefault);
      }
      __name(typeparam, "typeparam");
      function maybeTypeDefault(_, value) {
        if (value == "=")
          return cont(typeexpr);
      }
      __name(maybeTypeDefault, "maybeTypeDefault");
      function vardef(_, value) {
        if (value == "enum") {
          cx.marked = "keyword";
          return cont(enumdef);
        }
        return pass(pattern, maybetype, maybeAssign, vardefCont);
      }
      __name(vardef, "vardef");
      function pattern(type2, value) {
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(pattern);
        }
        if (type2 == "variable") {
          register(value);
          return cont();
        }
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "[")
          return contCommasep(eltpattern, "]");
        if (type2 == "{")
          return contCommasep(proppattern, "}");
      }
      __name(pattern, "pattern");
      function proppattern(type2, value) {
        if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
          register(value);
          return cont(maybeAssign);
        }
        if (type2 == "variable")
          cx.marked = "property";
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "}")
          return pass();
        if (type2 == "[")
          return cont(expression, expect("]"), expect(":"), proppattern);
        return cont(expect(":"), pattern, maybeAssign);
      }
      __name(proppattern, "proppattern");
      function eltpattern() {
        return pass(pattern, maybeAssign);
      }
      __name(eltpattern, "eltpattern");
      function maybeAssign(_type, value) {
        if (value == "=")
          return cont(expressionNoComma);
      }
      __name(maybeAssign, "maybeAssign");
      function vardefCont(type2) {
        if (type2 == ",")
          return cont(vardef);
      }
      __name(vardefCont, "vardefCont");
      function maybeelse(type2, value) {
        if (type2 == "keyword b" && value == "else")
          return cont(pushlex("form", "else"), statement, poplex);
      }
      __name(maybeelse, "maybeelse");
      function forspec(type2, value) {
        if (value == "await")
          return cont(forspec);
        if (type2 == "(")
          return cont(pushlex(")"), forspec1, poplex);
      }
      __name(forspec, "forspec");
      function forspec1(type2) {
        if (type2 == "var")
          return cont(vardef, forspec2);
        if (type2 == "variable")
          return cont(forspec2);
        return pass(forspec2);
      }
      __name(forspec1, "forspec1");
      function forspec2(type2, value) {
        if (type2 == ")")
          return cont();
        if (type2 == ";")
          return cont(forspec2);
        if (value == "in" || value == "of") {
          cx.marked = "keyword";
          return cont(expression, forspec2);
        }
        return pass(expression, forspec2);
      }
      __name(forspec2, "forspec2");
      function functiondef(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondef);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondef);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
      }
      __name(functiondef, "functiondef");
      function functiondecl(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondecl);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondecl);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
      }
      __name(functiondecl, "functiondecl");
      function typename(type2, value) {
        if (type2 == "keyword" || type2 == "variable") {
          cx.marked = "type";
          return cont(typename);
        } else if (value == "<") {
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
        }
      }
      __name(typename, "typename");
      function funarg(type2, value) {
        if (value == "@")
          cont(expression, funarg);
        if (type2 == "spread")
          return cont(funarg);
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(funarg);
        }
        if (isTS && type2 == "this")
          return cont(maybetype, maybeAssign);
        return pass(pattern, maybetype, maybeAssign);
      }
      __name(funarg, "funarg");
      function classExpression(type2, value) {
        if (type2 == "variable")
          return className(type2, value);
        return classNameAfter(type2, value);
      }
      __name(classExpression, "classExpression");
      function className(type2, value) {
        if (type2 == "variable") {
          register(value);
          return cont(classNameAfter);
        }
      }
      __name(className, "className");
      function classNameAfter(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
        if (value == "extends" || value == "implements" || isTS && type2 == ",") {
          if (value == "implements")
            cx.marked = "keyword";
          return cont(isTS ? typeexpr : expression, classNameAfter);
        }
        if (type2 == "{")
          return cont(pushlex("}"), classBody, poplex);
      }
      __name(classNameAfter, "classNameAfter");
      function classBody(type2, value) {
        if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(classfield, classBody);
        }
        if (type2 == "number" || type2 == "string")
          return cont(classfield, classBody);
        if (type2 == "[")
          return cont(expression, maybetype, expect("]"), classfield, classBody);
        if (value == "*") {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (isTS && type2 == "(")
          return pass(functiondecl, classBody);
        if (type2 == ";" || type2 == ",")
          return cont(classBody);
        if (type2 == "}")
          return cont();
        if (value == "@")
          return cont(expression, classBody);
      }
      __name(classBody, "classBody");
      function classfield(type2, value) {
        if (value == "!")
          return cont(classfield);
        if (value == "?")
          return cont(classfield);
        if (type2 == ":")
          return cont(typeexpr, maybeAssign);
        if (value == "=")
          return cont(expressionNoComma);
        var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
        return pass(isInterface ? functiondecl : functiondef);
      }
      __name(classfield, "classfield");
      function afterExport(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(maybeFrom, expect(";"));
        }
        if (value == "default") {
          cx.marked = "keyword";
          return cont(expression, expect(";"));
        }
        if (type2 == "{")
          return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
        return pass(statement);
      }
      __name(afterExport, "afterExport");
      function exportField(type2, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(expect("variable"));
        }
        if (type2 == "variable")
          return pass(expressionNoComma, exportField);
      }
      __name(exportField, "exportField");
      function afterImport(type2) {
        if (type2 == "string")
          return cont();
        if (type2 == "(")
          return pass(expression);
        if (type2 == ".")
          return pass(maybeoperatorComma);
        return pass(importSpec, maybeMoreImports, maybeFrom);
      }
      __name(afterImport, "afterImport");
      function importSpec(type2, value) {
        if (type2 == "{")
          return contCommasep(importSpec, "}");
        if (type2 == "variable")
          register(value);
        if (value == "*")
          cx.marked = "keyword";
        return cont(maybeAs);
      }
      __name(importSpec, "importSpec");
      function maybeMoreImports(type2) {
        if (type2 == ",")
          return cont(importSpec, maybeMoreImports);
      }
      __name(maybeMoreImports, "maybeMoreImports");
      function maybeAs(_type, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(importSpec);
        }
      }
      __name(maybeAs, "maybeAs");
      function maybeFrom(_type, value) {
        if (value == "from") {
          cx.marked = "keyword";
          return cont(expression);
        }
      }
      __name(maybeFrom, "maybeFrom");
      function arrayLiteral(type2) {
        if (type2 == "]")
          return cont();
        return pass(commasep(expressionNoComma, "]"));
      }
      __name(arrayLiteral, "arrayLiteral");
      function enumdef() {
        return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
      }
      __name(enumdef, "enumdef");
      function enummember() {
        return pass(pattern, maybeAssign);
      }
      __name(enummember, "enummember");
      function isContinuedStatement(state, textAfter) {
        return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
      }
      __name(isContinuedStatement, "isContinuedStatement");
      function expressionAllowed(stream, state, backUp) {
        return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
      }
      __name(expressionAllowed, "expressionAllowed");
      return {
        startState: function(basecolumn) {
          var state = {
            tokenize: tokenBase,
            lastType: "sof",
            cc: [],
            lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
            localVars: parserConfig.localVars,
            context: parserConfig.localVars && new Context(null, null, false),
            indented: basecolumn || 0
          };
          if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
            state.globalVars = parserConfig.globalVars;
          return state;
        },
        token: function(stream, state) {
          if (stream.sol()) {
            if (!state.lexical.hasOwnProperty("align"))
              state.lexical.align = false;
            state.indented = stream.indentation();
            findFatArrow(stream, state);
          }
          if (state.tokenize != tokenComment && stream.eatSpace())
            return null;
          var style = state.tokenize(stream, state);
          if (type == "comment")
            return style;
          state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
          return parseJS(state, style, type, content, stream);
        },
        indent: function(state, textAfter) {
          if (state.tokenize == tokenComment || state.tokenize == tokenQuasi)
            return CodeMirror.Pass;
          if (state.tokenize != tokenBase)
            return 0;
          var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
          if (!/^\s*else\b/.test(textAfter))
            for (var i = state.cc.length - 1; i >= 0; --i) {
              var c = state.cc[i];
              if (c == poplex)
                lexical = lexical.prev;
              else if (c != maybeelse && c != popcontext)
                break;
            }
          while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
            lexical = lexical.prev;
          if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
            lexical = lexical.prev;
          var type2 = lexical.type, closing = firstChar == type2;
          if (type2 == "vardef")
            return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
          else if (type2 == "form" && firstChar == "{")
            return lexical.indented;
          else if (type2 == "form")
            return lexical.indented + indentUnit;
          else if (type2 == "stat")
            return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
          else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
            return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
          else if (lexical.align)
            return lexical.column + (closing ? 0 : 1);
          else
            return lexical.indented + (closing ? 0 : indentUnit);
        },
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: jsonMode ? null : "/*",
        blockCommentEnd: jsonMode ? null : "*/",
        blockCommentContinue: jsonMode ? null : " * ",
        lineComment: jsonMode ? null : "//",
        fold: "brace",
        closeBrackets: "()[]{}''\"\"``",
        helperType: jsonMode ? "json" : "javascript",
        jsonldMode,
        jsonMode,
        expressionAllowed,
        skipExpression: function(state) {
          parseJS(state, "atom", "atom", "true", new CodeMirror.StringStream("", 2, null));
        }
      };
    });
    CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);
    CodeMirror.defineMIME("text/javascript", "javascript");
    CodeMirror.defineMIME("text/ecmascript", "javascript");
    CodeMirror.defineMIME("application/javascript", "javascript");
    CodeMirror.defineMIME("application/x-javascript", "javascript");
    CodeMirror.defineMIME("application/ecmascript", "javascript");
    CodeMirror.defineMIME("application/json", { name: "javascript", json: true });
    CodeMirror.defineMIME("application/x-json", { name: "javascript", json: true });
    CodeMirror.defineMIME("application/manifest+json", { name: "javascript", json: true });
    CodeMirror.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
    CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
    CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
  });
})();
var javascript = javascript$2.exports;
var javascript$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": javascript
}, [javascript$2.exports]);



/***/ })

}]);
//# sourceMappingURL=863.graphiql.app.js.map