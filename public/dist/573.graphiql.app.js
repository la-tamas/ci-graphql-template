"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[573,105,744],{

/***/ 9744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ dialog$2),
/* harmony export */   "d": () => (/* binding */ dialog$1)
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
var dialog$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    function dialogDiv(cm, template, bottom) {
      var wrap = cm.getWrapperElement();
      var dialog2;
      dialog2 = wrap.appendChild(document.createElement("div"));
      if (bottom)
        dialog2.className = "CodeMirror-dialog CodeMirror-dialog-bottom";
      else
        dialog2.className = "CodeMirror-dialog CodeMirror-dialog-top";
      if (typeof template == "string") {
        dialog2.innerHTML = template;
      } else {
        dialog2.appendChild(template);
      }
      CodeMirror.addClass(wrap, "dialog-opened");
      return dialog2;
    }
    __name(dialogDiv, "dialogDiv");
    function closeNotification(cm, newVal) {
      if (cm.state.currentNotificationClose)
        cm.state.currentNotificationClose();
      cm.state.currentNotificationClose = newVal;
    }
    __name(closeNotification, "closeNotification");
    CodeMirror.defineExtension("openDialog", function(template, callback, options) {
      if (!options)
        options = {};
      closeNotification(this, null);
      var dialog2 = dialogDiv(this, template, options.bottom);
      var closed = false, me = this;
      function close(newVal) {
        if (typeof newVal == "string") {
          inp.value = newVal;
        } else {
          if (closed)
            return;
          closed = true;
          CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
          dialog2.parentNode.removeChild(dialog2);
          me.focus();
          if (options.onClose)
            options.onClose(dialog2);
        }
      }
      __name(close, "close");
      var inp = dialog2.getElementsByTagName("input")[0], button;
      if (inp) {
        inp.focus();
        if (options.value) {
          inp.value = options.value;
          if (options.selectValueOnOpen !== false) {
            inp.select();
          }
        }
        if (options.onInput)
          CodeMirror.on(inp, "input", function(e) {
            options.onInput(e, inp.value, close);
          });
        if (options.onKeyUp)
          CodeMirror.on(inp, "keyup", function(e) {
            options.onKeyUp(e, inp.value, close);
          });
        CodeMirror.on(inp, "keydown", function(e) {
          if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) {
            return;
          }
          if (e.keyCode == 27 || options.closeOnEnter !== false && e.keyCode == 13) {
            inp.blur();
            CodeMirror.e_stop(e);
            close();
          }
          if (e.keyCode == 13)
            callback(inp.value, e);
        });
        if (options.closeOnBlur !== false)
          CodeMirror.on(dialog2, "focusout", function(evt) {
            if (evt.relatedTarget !== null)
              close();
          });
      } else if (button = dialog2.getElementsByTagName("button")[0]) {
        CodeMirror.on(button, "click", function() {
          close();
          me.focus();
        });
        if (options.closeOnBlur !== false)
          CodeMirror.on(button, "blur", close);
        button.focus();
      }
      return close;
    });
    CodeMirror.defineExtension("openConfirm", function(template, callbacks, options) {
      closeNotification(this, null);
      var dialog2 = dialogDiv(this, template, options && options.bottom);
      var buttons = dialog2.getElementsByTagName("button");
      var closed = false, me = this, blurring = 1;
      function close() {
        if (closed)
          return;
        closed = true;
        CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
        dialog2.parentNode.removeChild(dialog2);
        me.focus();
      }
      __name(close, "close");
      buttons[0].focus();
      for (var i = 0; i < buttons.length; ++i) {
        var b = buttons[i];
        (function(callback) {
          CodeMirror.on(b, "click", function(e) {
            CodeMirror.e_preventDefault(e);
            close();
            if (callback)
              callback(me);
          });
        })(callbacks[i]);
        CodeMirror.on(b, "blur", function() {
          --blurring;
          setTimeout(function() {
            if (blurring <= 0)
              close();
          }, 200);
        });
        CodeMirror.on(b, "focus", function() {
          ++blurring;
        });
      }
    });
    CodeMirror.defineExtension("openNotification", function(template, options) {
      closeNotification(this, close);
      var dialog2 = dialogDiv(this, template, options && options.bottom);
      var closed = false, doneTimer;
      var duration = options && typeof options.duration !== "undefined" ? options.duration : 5e3;
      function close() {
        if (closed)
          return;
        closed = true;
        clearTimeout(doneTimer);
        CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
        dialog2.parentNode.removeChild(dialog2);
      }
      __name(close, "close");
      CodeMirror.on(dialog2, "click", function(e) {
        CodeMirror.e_preventDefault(e);
        close();
      });
      if (duration)
        doneTimer = setTimeout(close, duration);
      return close;
    });
  });
})();
var dialog = dialog$2.exports;
var dialog$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": dialog
}, [dialog$2.exports]);



/***/ }),

/***/ 2573:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ search$1)
/* harmony export */ });
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _searchcursor_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6105);
/* harmony import */ var _dialog_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9744);
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
var search$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports, _searchcursor_es_js__WEBPACK_IMPORTED_MODULE_1__.a.exports, _dialog_es_js__WEBPACK_IMPORTED_MODULE_2__.a.exports);
  })(function(CodeMirror) {
    CodeMirror.defineOption("search", { bottom: false });
    function searchOverlay(query, caseInsensitive) {
      if (typeof query == "string")
        query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" : "g");
      else if (!query.global)
        query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");
      return { token: function(stream) {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        if (match && match.index == stream.pos) {
          stream.pos += match[0].length || 1;
          return "searching";
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      } };
    }
    __name(searchOverlay, "searchOverlay");
    function SearchState() {
      this.posFrom = this.posTo = this.lastQuery = this.query = null;
      this.overlay = null;
    }
    __name(SearchState, "SearchState");
    function getSearchState(cm) {
      return cm.state.search || (cm.state.search = new SearchState());
    }
    __name(getSearchState, "getSearchState");
    function queryCaseInsensitive(query) {
      return typeof query == "string" && query == query.toLowerCase();
    }
    __name(queryCaseInsensitive, "queryCaseInsensitive");
    function getSearchCursor(cm, query, pos) {
      return cm.getSearchCursor(query, pos, { caseFold: queryCaseInsensitive(query), multiline: true });
    }
    __name(getSearchCursor, "getSearchCursor");
    function persistentDialog(cm, text, deflt, onEnter, onKeyDown) {
      cm.openDialog(text, onEnter, {
        value: deflt,
        selectValueOnOpen: true,
        closeOnEnter: false,
        onClose: function() {
          clearSearch(cm);
        },
        onKeyDown,
        bottom: cm.options.search.bottom
      });
    }
    __name(persistentDialog, "persistentDialog");
    function dialog2(cm, text, shortText, deflt, f) {
      if (cm.openDialog)
        cm.openDialog(text, f, { value: deflt, selectValueOnOpen: true, bottom: cm.options.search.bottom });
      else
        f(prompt(shortText, deflt));
    }
    __name(dialog2, "dialog");
    function confirmDialog(cm, text, shortText, fs) {
      if (cm.openConfirm)
        cm.openConfirm(text, fs);
      else if (confirm(shortText))
        fs[0]();
    }
    __name(confirmDialog, "confirmDialog");
    function parseString(string) {
      return string.replace(/\\([nrt\\])/g, function(match, ch) {
        if (ch == "n")
          return "\n";
        if (ch == "r")
          return "\r";
        if (ch == "t")
          return "	";
        if (ch == "\\")
          return "\\";
        return match;
      });
    }
    __name(parseString, "parseString");
    function parseQuery(query) {
      var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
      if (isRE) {
        try {
          query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i");
        } catch (e) {
        }
      } else {
        query = parseString(query);
      }
      if (typeof query == "string" ? query == "" : query.test(""))
        query = /x^/;
      return query;
    }
    __name(parseQuery, "parseQuery");
    function startSearch(cm, state, query) {
      state.queryText = query;
      state.query = parseQuery(query);
      cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
      state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
      cm.addOverlay(state.overlay);
      if (cm.showMatchesOnScrollbar) {
        if (state.annotate) {
          state.annotate.clear();
          state.annotate = null;
        }
        state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
      }
    }
    __name(startSearch, "startSearch");
    function doSearch(cm, rev, persistent, immediate) {
      var state = getSearchState(cm);
      if (state.query)
        return findNext(cm, rev);
      var q = cm.getSelection() || state.lastQuery;
      if (q instanceof RegExp && q.source == "x^")
        q = null;
      if (persistent && cm.openDialog) {
        var hiding = null;
        var searchNext = /* @__PURE__ */ __name(function(query, event) {
          CodeMirror.e_stop(event);
          if (!query)
            return;
          if (query != state.queryText) {
            startSearch(cm, state, query);
            state.posFrom = state.posTo = cm.getCursor();
          }
          if (hiding)
            hiding.style.opacity = 1;
          findNext(cm, event.shiftKey, function(_, to) {
            var dialog3;
            if (to.line < 3 && document.querySelector && (dialog3 = cm.display.wrapper.querySelector(".CodeMirror-dialog")) && dialog3.getBoundingClientRect().bottom - 4 > cm.cursorCoords(to, "window").top)
              (hiding = dialog3).style.opacity = 0.4;
          });
        }, "searchNext");
        persistentDialog(cm, getQueryDialog(cm), q, searchNext, function(event, query) {
          var keyName = CodeMirror.keyName(event);
          var extra = cm.getOption("extraKeys"), cmd = extra && extra[keyName] || CodeMirror.keyMap[cm.getOption("keyMap")][keyName];
          if (cmd == "findNext" || cmd == "findPrev" || cmd == "findPersistentNext" || cmd == "findPersistentPrev") {
            CodeMirror.e_stop(event);
            startSearch(cm, getSearchState(cm), query);
            cm.execCommand(cmd);
          } else if (cmd == "find" || cmd == "findPersistent") {
            CodeMirror.e_stop(event);
            searchNext(query, event);
          }
        });
        if (immediate && q) {
          startSearch(cm, state, q);
          findNext(cm, rev);
        }
      } else {
        dialog2(cm, getQueryDialog(cm), "Search for:", q, function(query) {
          if (query && !state.query)
            cm.operation(function() {
              startSearch(cm, state, query);
              state.posFrom = state.posTo = cm.getCursor();
              findNext(cm, rev);
            });
        });
      }
    }
    __name(doSearch, "doSearch");
    function findNext(cm, rev, callback) {
      cm.operation(function() {
        var state = getSearchState(cm);
        var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
        if (!cursor.find(rev)) {
          cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
          if (!cursor.find(rev))
            return;
        }
        cm.setSelection(cursor.from(), cursor.to());
        cm.scrollIntoView({ from: cursor.from(), to: cursor.to() }, 20);
        state.posFrom = cursor.from();
        state.posTo = cursor.to();
        if (callback)
          callback(cursor.from(), cursor.to());
      });
    }
    __name(findNext, "findNext");
    function clearSearch(cm) {
      cm.operation(function() {
        var state = getSearchState(cm);
        state.lastQuery = state.query;
        if (!state.query)
          return;
        state.query = state.queryText = null;
        cm.removeOverlay(state.overlay);
        if (state.annotate) {
          state.annotate.clear();
          state.annotate = null;
        }
      });
    }
    __name(clearSearch, "clearSearch");
    function el(tag, attrs) {
      var element = tag ? document.createElement(tag) : document.createDocumentFragment();
      for (var key in attrs) {
        element[key] = attrs[key];
      }
      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        element.appendChild(typeof child == "string" ? document.createTextNode(child) : child);
      }
      return element;
    }
    __name(el, "el");
    function getQueryDialog(cm) {
      return el("", null, el("span", { className: "CodeMirror-search-label" }, cm.phrase("Search:")), " ", el("input", { type: "text", "style": "width: 10em", className: "CodeMirror-search-field" }), " ", el("span", { style: "color: #888", className: "CodeMirror-search-hint" }, cm.phrase("(Use /re/ syntax for regexp search)")));
    }
    __name(getQueryDialog, "getQueryDialog");
    function getReplaceQueryDialog(cm) {
      return el("", null, " ", el("input", { type: "text", "style": "width: 10em", className: "CodeMirror-search-field" }), " ", el("span", { style: "color: #888", className: "CodeMirror-search-hint" }, cm.phrase("(Use /re/ syntax for regexp search)")));
    }
    __name(getReplaceQueryDialog, "getReplaceQueryDialog");
    function getReplacementQueryDialog(cm) {
      return el("", null, el("span", { className: "CodeMirror-search-label" }, cm.phrase("With:")), " ", el("input", { type: "text", "style": "width: 10em", className: "CodeMirror-search-field" }));
    }
    __name(getReplacementQueryDialog, "getReplacementQueryDialog");
    function getDoReplaceConfirm(cm) {
      return el("", null, el("span", { className: "CodeMirror-search-label" }, cm.phrase("Replace?")), " ", el("button", {}, cm.phrase("Yes")), " ", el("button", {}, cm.phrase("No")), " ", el("button", {}, cm.phrase("All")), " ", el("button", {}, cm.phrase("Stop")));
    }
    __name(getDoReplaceConfirm, "getDoReplaceConfirm");
    function replaceAll(cm, query, text) {
      cm.operation(function() {
        for (var cursor = getSearchCursor(cm, query); cursor.findNext(); ) {
          if (typeof query != "string") {
            var match = cm.getRange(cursor.from(), cursor.to()).match(query);
            cursor.replace(text.replace(/\$(\d)/g, function(_, i) {
              return match[i];
            }));
          } else
            cursor.replace(text);
        }
      });
    }
    __name(replaceAll, "replaceAll");
    function replace(cm, all) {
      if (cm.getOption("readOnly"))
        return;
      var query = cm.getSelection() || getSearchState(cm).lastQuery;
      var dialogText = all ? cm.phrase("Replace all:") : cm.phrase("Replace:");
      var fragment = el("", null, el("span", { className: "CodeMirror-search-label" }, dialogText), getReplaceQueryDialog(cm));
      dialog2(cm, fragment, dialogText, query, function(query2) {
        if (!query2)
          return;
        query2 = parseQuery(query2);
        dialog2(cm, getReplacementQueryDialog(cm), cm.phrase("Replace with:"), "", function(text) {
          text = parseString(text);
          if (all) {
            replaceAll(cm, query2, text);
          } else {
            clearSearch(cm);
            var cursor = getSearchCursor(cm, query2, cm.getCursor("from"));
            var advance = /* @__PURE__ */ __name(function() {
              var start = cursor.from(), match;
              if (!(match = cursor.findNext())) {
                cursor = getSearchCursor(cm, query2);
                if (!(match = cursor.findNext()) || start && cursor.from().line == start.line && cursor.from().ch == start.ch)
                  return;
              }
              cm.setSelection(cursor.from(), cursor.to());
              cm.scrollIntoView({ from: cursor.from(), to: cursor.to() });
              confirmDialog(cm, getDoReplaceConfirm(cm), cm.phrase("Replace?"), [
                function() {
                  doReplace(match);
                },
                advance,
                function() {
                  replaceAll(cm, query2, text);
                }
              ]);
            }, "advance");
            var doReplace = /* @__PURE__ */ __name(function(match) {
              cursor.replace(typeof query2 == "string" ? text : text.replace(/\$(\d)/g, function(_, i) {
                return match[i];
              }));
              advance();
            }, "doReplace");
            advance();
          }
        });
      });
    }
    __name(replace, "replace");
    CodeMirror.commands.find = function(cm) {
      clearSearch(cm);
      doSearch(cm);
    };
    CodeMirror.commands.findPersistent = function(cm) {
      clearSearch(cm);
      doSearch(cm, false, true);
    };
    CodeMirror.commands.findPersistentNext = function(cm) {
      doSearch(cm, false, true, true);
    };
    CodeMirror.commands.findPersistentPrev = function(cm) {
      doSearch(cm, true, true, true);
    };
    CodeMirror.commands.findNext = doSearch;
    CodeMirror.commands.findPrev = function(cm) {
      doSearch(cm, true);
    };
    CodeMirror.commands.clearSearch = clearSearch;
    CodeMirror.commands.replace = replace;
    CodeMirror.commands.replaceAll = function(cm) {
      replace(cm, true);
    };
  });
})();
var search = search$2.exports;
var search$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": search
}, [search$2.exports]);



/***/ }),

/***/ 6105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ searchcursor$2),
/* harmony export */   "s": () => (/* binding */ searchcursor$1)
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
var searchcursor$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function regexpFlags(regexp) {
      var flags = regexp.flags;
      return flags != null ? flags : (regexp.ignoreCase ? "i" : "") + (regexp.global ? "g" : "") + (regexp.multiline ? "m" : "");
    }
    __name(regexpFlags, "regexpFlags");
    function ensureFlags(regexp, flags) {
      var current = regexpFlags(regexp), target = current;
      for (var i = 0; i < flags.length; i++)
        if (target.indexOf(flags.charAt(i)) == -1)
          target += flags.charAt(i);
      return current == target ? regexp : new RegExp(regexp.source, target);
    }
    __name(ensureFlags, "ensureFlags");
    function maybeMultiline(regexp) {
      return /\\s|\\n|\n|\\W|\\D|\[\^/.test(regexp.source);
    }
    __name(maybeMultiline, "maybeMultiline");
    function searchRegexpForward(doc, regexp, start) {
      regexp = ensureFlags(regexp, "g");
      for (var line = start.line, ch = start.ch, last = doc.lastLine(); line <= last; line++, ch = 0) {
        regexp.lastIndex = ch;
        var string = doc.getLine(line), match = regexp.exec(string);
        if (match)
          return {
            from: Pos(line, match.index),
            to: Pos(line, match.index + match[0].length),
            match
          };
      }
    }
    __name(searchRegexpForward, "searchRegexpForward");
    function searchRegexpForwardMultiline(doc, regexp, start) {
      if (!maybeMultiline(regexp))
        return searchRegexpForward(doc, regexp, start);
      regexp = ensureFlags(regexp, "gm");
      var string, chunk = 1;
      for (var line = start.line, last = doc.lastLine(); line <= last; ) {
        for (var i = 0; i < chunk; i++) {
          if (line > last)
            break;
          var curLine = doc.getLine(line++);
          string = string == null ? curLine : string + "\n" + curLine;
        }
        chunk = chunk * 2;
        regexp.lastIndex = start.ch;
        var match = regexp.exec(string);
        if (match) {
          var before = string.slice(0, match.index).split("\n"), inside = match[0].split("\n");
          var startLine = start.line + before.length - 1, startCh = before[before.length - 1].length;
          return {
            from: Pos(startLine, startCh),
            to: Pos(startLine + inside.length - 1, inside.length == 1 ? startCh + inside[0].length : inside[inside.length - 1].length),
            match
          };
        }
      }
    }
    __name(searchRegexpForwardMultiline, "searchRegexpForwardMultiline");
    function lastMatchIn(string, regexp, endMargin) {
      var match, from = 0;
      while (from <= string.length) {
        regexp.lastIndex = from;
        var newMatch = regexp.exec(string);
        if (!newMatch)
          break;
        var end = newMatch.index + newMatch[0].length;
        if (end > string.length - endMargin)
          break;
        if (!match || end > match.index + match[0].length)
          match = newMatch;
        from = newMatch.index + 1;
      }
      return match;
    }
    __name(lastMatchIn, "lastMatchIn");
    function searchRegexpBackward(doc, regexp, start) {
      regexp = ensureFlags(regexp, "g");
      for (var line = start.line, ch = start.ch, first = doc.firstLine(); line >= first; line--, ch = -1) {
        var string = doc.getLine(line);
        var match = lastMatchIn(string, regexp, ch < 0 ? 0 : string.length - ch);
        if (match)
          return {
            from: Pos(line, match.index),
            to: Pos(line, match.index + match[0].length),
            match
          };
      }
    }
    __name(searchRegexpBackward, "searchRegexpBackward");
    function searchRegexpBackwardMultiline(doc, regexp, start) {
      if (!maybeMultiline(regexp))
        return searchRegexpBackward(doc, regexp, start);
      regexp = ensureFlags(regexp, "gm");
      var string, chunkSize = 1, endMargin = doc.getLine(start.line).length - start.ch;
      for (var line = start.line, first = doc.firstLine(); line >= first; ) {
        for (var i = 0; i < chunkSize && line >= first; i++) {
          var curLine = doc.getLine(line--);
          string = string == null ? curLine : curLine + "\n" + string;
        }
        chunkSize *= 2;
        var match = lastMatchIn(string, regexp, endMargin);
        if (match) {
          var before = string.slice(0, match.index).split("\n"), inside = match[0].split("\n");
          var startLine = line + before.length, startCh = before[before.length - 1].length;
          return {
            from: Pos(startLine, startCh),
            to: Pos(startLine + inside.length - 1, inside.length == 1 ? startCh + inside[0].length : inside[inside.length - 1].length),
            match
          };
        }
      }
    }
    __name(searchRegexpBackwardMultiline, "searchRegexpBackwardMultiline");
    var doFold, noFold;
    if (String.prototype.normalize) {
      doFold = /* @__PURE__ */ __name(function(str) {
        return str.normalize("NFD").toLowerCase();
      }, "doFold");
      noFold = /* @__PURE__ */ __name(function(str) {
        return str.normalize("NFD");
      }, "noFold");
    } else {
      doFold = /* @__PURE__ */ __name(function(str) {
        return str.toLowerCase();
      }, "doFold");
      noFold = /* @__PURE__ */ __name(function(str) {
        return str;
      }, "noFold");
    }
    function adjustPos(orig, folded, pos, foldFunc) {
      if (orig.length == folded.length)
        return pos;
      for (var min = 0, max = pos + Math.max(0, orig.length - folded.length); ; ) {
        if (min == max)
          return min;
        var mid = min + max >> 1;
        var len = foldFunc(orig.slice(0, mid)).length;
        if (len == pos)
          return mid;
        else if (len > pos)
          max = mid;
        else
          min = mid + 1;
      }
    }
    __name(adjustPos, "adjustPos");
    function searchStringForward(doc, query, start, caseFold) {
      if (!query.length)
        return null;
      var fold = caseFold ? doFold : noFold;
      var lines = fold(query).split(/\r|\n\r?/);
      search:
        for (var line = start.line, ch = start.ch, last = doc.lastLine() + 1 - lines.length; line <= last; line++, ch = 0) {
          var orig = doc.getLine(line).slice(ch), string = fold(orig);
          if (lines.length == 1) {
            var found = string.indexOf(lines[0]);
            if (found == -1)
              continue search;
            var start = adjustPos(orig, string, found, fold) + ch;
            return {
              from: Pos(line, adjustPos(orig, string, found, fold) + ch),
              to: Pos(line, adjustPos(orig, string, found + lines[0].length, fold) + ch)
            };
          } else {
            var cutFrom = string.length - lines[0].length;
            if (string.slice(cutFrom) != lines[0])
              continue search;
            for (var i = 1; i < lines.length - 1; i++)
              if (fold(doc.getLine(line + i)) != lines[i])
                continue search;
            var end = doc.getLine(line + lines.length - 1), endString = fold(end), lastLine = lines[lines.length - 1];
            if (endString.slice(0, lastLine.length) != lastLine)
              continue search;
            return {
              from: Pos(line, adjustPos(orig, string, cutFrom, fold) + ch),
              to: Pos(line + lines.length - 1, adjustPos(end, endString, lastLine.length, fold))
            };
          }
        }
    }
    __name(searchStringForward, "searchStringForward");
    function searchStringBackward(doc, query, start, caseFold) {
      if (!query.length)
        return null;
      var fold = caseFold ? doFold : noFold;
      var lines = fold(query).split(/\r|\n\r?/);
      search:
        for (var line = start.line, ch = start.ch, first = doc.firstLine() - 1 + lines.length; line >= first; line--, ch = -1) {
          var orig = doc.getLine(line);
          if (ch > -1)
            orig = orig.slice(0, ch);
          var string = fold(orig);
          if (lines.length == 1) {
            var found = string.lastIndexOf(lines[0]);
            if (found == -1)
              continue search;
            return {
              from: Pos(line, adjustPos(orig, string, found, fold)),
              to: Pos(line, adjustPos(orig, string, found + lines[0].length, fold))
            };
          } else {
            var lastLine = lines[lines.length - 1];
            if (string.slice(0, lastLine.length) != lastLine)
              continue search;
            for (var i = 1, start = line - lines.length + 1; i < lines.length - 1; i++)
              if (fold(doc.getLine(start + i)) != lines[i])
                continue search;
            var top = doc.getLine(line + 1 - lines.length), topString = fold(top);
            if (topString.slice(topString.length - lines[0].length) != lines[0])
              continue search;
            return {
              from: Pos(line + 1 - lines.length, adjustPos(top, topString, top.length - lines[0].length, fold)),
              to: Pos(line, adjustPos(orig, string, lastLine.length, fold))
            };
          }
        }
    }
    __name(searchStringBackward, "searchStringBackward");
    function SearchCursor(doc, query, pos, options) {
      this.atOccurrence = false;
      this.afterEmptyMatch = false;
      this.doc = doc;
      pos = pos ? doc.clipPos(pos) : Pos(0, 0);
      this.pos = { from: pos, to: pos };
      var caseFold;
      if (typeof options == "object") {
        caseFold = options.caseFold;
      } else {
        caseFold = options;
        options = null;
      }
      if (typeof query == "string") {
        if (caseFold == null)
          caseFold = false;
        this.matches = function(reverse, pos2) {
          return (reverse ? searchStringBackward : searchStringForward)(doc, query, pos2, caseFold);
        };
      } else {
        query = ensureFlags(query, "gm");
        if (!options || options.multiline !== false)
          this.matches = function(reverse, pos2) {
            return (reverse ? searchRegexpBackwardMultiline : searchRegexpForwardMultiline)(doc, query, pos2);
          };
        else
          this.matches = function(reverse, pos2) {
            return (reverse ? searchRegexpBackward : searchRegexpForward)(doc, query, pos2);
          };
      }
    }
    __name(SearchCursor, "SearchCursor");
    SearchCursor.prototype = {
      findNext: function() {
        return this.find(false);
      },
      findPrevious: function() {
        return this.find(true);
      },
      find: function(reverse) {
        var head = this.doc.clipPos(reverse ? this.pos.from : this.pos.to);
        if (this.afterEmptyMatch && this.atOccurrence) {
          head = Pos(head.line, head.ch);
          if (reverse) {
            head.ch--;
            if (head.ch < 0) {
              head.line--;
              head.ch = (this.doc.getLine(head.line) || "").length;
            }
          } else {
            head.ch++;
            if (head.ch > (this.doc.getLine(head.line) || "").length) {
              head.ch = 0;
              head.line++;
            }
          }
          if (CodeMirror.cmpPos(head, this.doc.clipPos(head)) != 0) {
            return this.atOccurrence = false;
          }
        }
        var result = this.matches(reverse, head);
        this.afterEmptyMatch = result && CodeMirror.cmpPos(result.from, result.to) == 0;
        if (result) {
          this.pos = result;
          this.atOccurrence = true;
          return this.pos.match || true;
        } else {
          var end = Pos(reverse ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
          this.pos = { from: end, to: end };
          return this.atOccurrence = false;
        }
      },
      from: function() {
        if (this.atOccurrence)
          return this.pos.from;
      },
      to: function() {
        if (this.atOccurrence)
          return this.pos.to;
      },
      replace: function(newText, origin) {
        if (!this.atOccurrence)
          return;
        var lines = CodeMirror.splitLines(newText);
        this.doc.replaceRange(lines, this.pos.from, this.pos.to, origin);
        this.pos.to = Pos(this.pos.from.line + lines.length - 1, lines[lines.length - 1].length + (lines.length == 1 ? this.pos.from.ch : 0));
      }
    };
    CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
      return new SearchCursor(this.doc, query, pos, caseFold);
    });
    CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
      return new SearchCursor(this, query, pos, caseFold);
    });
    CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
      var ranges = [];
      var cur = this.getSearchCursor(query, this.getCursor("from"), caseFold);
      while (cur.findNext()) {
        if (CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0)
          break;
        ranges.push({ anchor: cur.from(), head: cur.to() });
      }
      if (ranges.length)
        this.setSelections(ranges, 0);
    });
  });
})();
var searchcursor = searchcursor$2.exports;
var searchcursor$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": searchcursor
}, [searchcursor$2.exports]);



/***/ })

}]);
//# sourceMappingURL=573.graphiql.app.js.map