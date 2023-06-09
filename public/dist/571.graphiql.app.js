"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[571,980,105],{

/***/ 4980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ matchbrackets$2),
/* harmony export */   "m": () => (/* binding */ matchbrackets$1)
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
var matchbrackets$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    var ie_lt8 = /MSIE \d/.test(navigator.userAgent) && (document.documentMode == null || document.documentMode < 8);
    var Pos = CodeMirror.Pos;
    var matching = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<", "<": ">>", ">": "<<" };
    function bracketRegex(config) {
      return config && config.bracketRegex || /[(){}[\]]/;
    }
    __name(bracketRegex, "bracketRegex");
    function findMatchingBracket(cm, where, config) {
      var line = cm.getLineHandle(where.line), pos = where.ch - 1;
      var afterCursor = config && config.afterCursor;
      if (afterCursor == null)
        afterCursor = /(^| )cm-fat-cursor($| )/.test(cm.getWrapperElement().className);
      var re = bracketRegex(config);
      var match = !afterCursor && pos >= 0 && re.test(line.text.charAt(pos)) && matching[line.text.charAt(pos)] || re.test(line.text.charAt(pos + 1)) && matching[line.text.charAt(++pos)];
      if (!match)
        return null;
      var dir = match.charAt(1) == ">" ? 1 : -1;
      if (config && config.strict && dir > 0 != (pos == where.ch))
        return null;
      var style = cm.getTokenTypeAt(Pos(where.line, pos + 1));
      var found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style, config);
      if (found == null)
        return null;
      return {
        from: Pos(where.line, pos),
        to: found && found.pos,
        match: found && found.ch == match.charAt(0),
        forward: dir > 0
      };
    }
    __name(findMatchingBracket, "findMatchingBracket");
    function scanForBracket(cm, where, dir, style, config) {
      var maxScanLen = config && config.maxScanLineLength || 1e4;
      var maxScanLines = config && config.maxScanLines || 1e3;
      var stack = [];
      var re = bracketRegex(config);
      var lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1) : Math.max(cm.firstLine() - 1, where.line - maxScanLines);
      for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
        var line = cm.getLine(lineNo);
        if (!line)
          continue;
        var pos = dir > 0 ? 0 : line.length - 1, end = dir > 0 ? line.length : -1;
        if (line.length > maxScanLen)
          continue;
        if (lineNo == where.line)
          pos = where.ch - (dir < 0 ? 1 : 0);
        for (; pos != end; pos += dir) {
          var ch = line.charAt(pos);
          if (re.test(ch) && (style === void 0 || (cm.getTokenTypeAt(Pos(lineNo, pos + 1)) || "") == (style || ""))) {
            var match = matching[ch];
            if (match && match.charAt(1) == ">" == dir > 0)
              stack.push(ch);
            else if (!stack.length)
              return { pos: Pos(lineNo, pos), ch };
            else
              stack.pop();
          }
        }
      }
      return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null;
    }
    __name(scanForBracket, "scanForBracket");
    function matchBrackets(cm, autoclear, config) {
      var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1e3, highlightNonMatching = config && config.highlightNonMatching;
      var marks = [], ranges = cm.listSelections();
      for (var i = 0; i < ranges.length; i++) {
        var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, config);
        if (match && (match.match || highlightNonMatching !== false) && cm.getLine(match.from.line).length <= maxHighlightLen) {
          var style = match.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
          marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), { className: style }));
          if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen)
            marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), { className: style }));
        }
      }
      if (marks.length) {
        if (ie_lt8 && cm.state.focused)
          cm.focus();
        var clear = /* @__PURE__ */ __name(function() {
          cm.operation(function() {
            for (var i2 = 0; i2 < marks.length; i2++)
              marks[i2].clear();
          });
        }, "clear");
        if (autoclear)
          setTimeout(clear, 800);
        else
          return clear;
      }
    }
    __name(matchBrackets, "matchBrackets");
    function doMatchBrackets(cm) {
      cm.operation(function() {
        if (cm.state.matchBrackets.currentlyHighlighted) {
          cm.state.matchBrackets.currentlyHighlighted();
          cm.state.matchBrackets.currentlyHighlighted = null;
        }
        cm.state.matchBrackets.currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets);
      });
    }
    __name(doMatchBrackets, "doMatchBrackets");
    function clearHighlighted(cm) {
      if (cm.state.matchBrackets && cm.state.matchBrackets.currentlyHighlighted) {
        cm.state.matchBrackets.currentlyHighlighted();
        cm.state.matchBrackets.currentlyHighlighted = null;
      }
    }
    __name(clearHighlighted, "clearHighlighted");
    CodeMirror.defineOption("matchBrackets", false, function(cm, val, old) {
      if (old && old != CodeMirror.Init) {
        cm.off("cursorActivity", doMatchBrackets);
        cm.off("focus", doMatchBrackets);
        cm.off("blur", clearHighlighted);
        clearHighlighted(cm);
      }
      if (val) {
        cm.state.matchBrackets = typeof val == "object" ? val : {};
        cm.on("cursorActivity", doMatchBrackets);
        cm.on("focus", doMatchBrackets);
        cm.on("blur", clearHighlighted);
      }
    });
    CodeMirror.defineExtension("matchBrackets", function() {
      matchBrackets(this, true);
    });
    CodeMirror.defineExtension("findMatchingBracket", function(pos, config, oldConfig) {
      if (oldConfig || typeof config == "boolean") {
        if (!oldConfig) {
          config = config ? { strict: true } : null;
        } else {
          oldConfig.strict = config;
          config = oldConfig;
        }
      }
      return findMatchingBracket(this, pos, config);
    });
    CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config) {
      return scanForBracket(this, pos, dir, style, config);
    });
  });
})();
var matchbrackets = matchbrackets$2.exports;
var matchbrackets$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": matchbrackets
}, [matchbrackets$2.exports]);



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



/***/ }),

/***/ 3571:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ sublime$1)
/* harmony export */ });
/* harmony import */ var _codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7480);
/* harmony import */ var _searchcursor_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6105);
/* harmony import */ var _matchbrackets_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4980);
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
var sublime$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports, _searchcursor_es_js__WEBPACK_IMPORTED_MODULE_1__.a.exports, _matchbrackets_es_js__WEBPACK_IMPORTED_MODULE_2__.a.exports);
  })(function(CodeMirror) {
    var cmds = CodeMirror.commands;
    var Pos = CodeMirror.Pos;
    function findPosSubword(doc, start, dir) {
      if (dir < 0 && start.ch == 0)
        return doc.clipPos(Pos(start.line - 1));
      var line = doc.getLine(start.line);
      if (dir > 0 && start.ch >= line.length)
        return doc.clipPos(Pos(start.line + 1, 0));
      var state = "start", type, startPos = start.ch;
      for (var pos = startPos, e = dir < 0 ? 0 : line.length, i = 0; pos != e; pos += dir, i++) {
        var next = line.charAt(dir < 0 ? pos - 1 : pos);
        var cat = next != "_" && CodeMirror.isWordChar(next) ? "w" : "o";
        if (cat == "w" && next.toUpperCase() == next)
          cat = "W";
        if (state == "start") {
          if (cat != "o") {
            state = "in";
            type = cat;
          } else
            startPos = pos + dir;
        } else if (state == "in") {
          if (type != cat) {
            if (type == "w" && cat == "W" && dir < 0)
              pos--;
            if (type == "W" && cat == "w" && dir > 0) {
              if (pos == startPos + 1) {
                type = "w";
                continue;
              } else
                pos--;
            }
            break;
          }
        }
      }
      return Pos(start.line, pos);
    }
    __name(findPosSubword, "findPosSubword");
    function moveSubword(cm, dir) {
      cm.extendSelectionsBy(function(range) {
        if (cm.display.shift || cm.doc.extend || range.empty())
          return findPosSubword(cm.doc, range.head, dir);
        else
          return dir < 0 ? range.from() : range.to();
      });
    }
    __name(moveSubword, "moveSubword");
    cmds.goSubwordLeft = function(cm) {
      moveSubword(cm, -1);
    };
    cmds.goSubwordRight = function(cm) {
      moveSubword(cm, 1);
    };
    cmds.scrollLineUp = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, "local");
        if (cm.getCursor().line >= visibleBottomLine)
          cm.execCommand("goLineUp");
      }
      cm.scrollTo(null, info.top - cm.defaultTextHeight());
    };
    cmds.scrollLineDown = function(cm) {
      var info = cm.getScrollInfo();
      if (!cm.somethingSelected()) {
        var visibleTopLine = cm.lineAtHeight(info.top, "local") + 1;
        if (cm.getCursor().line <= visibleTopLine)
          cm.execCommand("goLineDown");
      }
      cm.scrollTo(null, info.top + cm.defaultTextHeight());
    };
    cmds.splitSelectionByLine = function(cm) {
      var ranges = cm.listSelections(), lineRanges = [];
      for (var i = 0; i < ranges.length; i++) {
        var from = ranges[i].from(), to = ranges[i].to();
        for (var line = from.line; line <= to.line; ++line)
          if (!(to.line > from.line && line == to.line && to.ch == 0))
            lineRanges.push({
              anchor: line == from.line ? from : Pos(line, 0),
              head: line == to.line ? to : Pos(line)
            });
      }
      cm.setSelections(lineRanges, 0);
    };
    cmds.singleSelectionTop = function(cm) {
      var range = cm.listSelections()[0];
      cm.setSelection(range.anchor, range.head, { scroll: false });
    };
    cmds.selectLine = function(cm) {
      var ranges = cm.listSelections(), extended = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        extended.push({
          anchor: Pos(range.from().line, 0),
          head: Pos(range.to().line + 1, 0)
        });
      }
      cm.setSelections(extended);
    };
    function insertLine(cm, above) {
      if (cm.isReadOnly())
        return CodeMirror.Pass;
      cm.operation(function() {
        var len = cm.listSelections().length, newSelection = [], last = -1;
        for (var i = 0; i < len; i++) {
          var head = cm.listSelections()[i].head;
          if (head.line <= last)
            continue;
          var at = Pos(head.line + (above ? 0 : 1), 0);
          cm.replaceRange("\n", at, null, "+insertLine");
          cm.indentLine(at.line, null, true);
          newSelection.push({ head: at, anchor: at });
          last = head.line + 1;
        }
        cm.setSelections(newSelection);
      });
      cm.execCommand("indentAuto");
    }
    __name(insertLine, "insertLine");
    cmds.insertLineAfter = function(cm) {
      return insertLine(cm, false);
    };
    cmds.insertLineBefore = function(cm) {
      return insertLine(cm, true);
    };
    function wordAt(cm, pos) {
      var start = pos.ch, end = start, line = cm.getLine(pos.line);
      while (start && CodeMirror.isWordChar(line.charAt(start - 1)))
        --start;
      while (end < line.length && CodeMirror.isWordChar(line.charAt(end)))
        ++end;
      return { from: Pos(pos.line, start), to: Pos(pos.line, end), word: line.slice(start, end) };
    }
    __name(wordAt, "wordAt");
    cmds.selectNextOccurrence = function(cm) {
      var from = cm.getCursor("from"), to = cm.getCursor("to");
      var fullWord = cm.state.sublimeFindFullWord == cm.doc.sel;
      if (CodeMirror.cmpPos(from, to) == 0) {
        var word = wordAt(cm, from);
        if (!word.word)
          return;
        cm.setSelection(word.from, word.to);
        fullWord = true;
      } else {
        var text = cm.getRange(from, to);
        var query = fullWord ? new RegExp("\\b" + text + "\\b") : text;
        var cur = cm.getSearchCursor(query, to);
        var found = cur.findNext();
        if (!found) {
          cur = cm.getSearchCursor(query, Pos(cm.firstLine(), 0));
          found = cur.findNext();
        }
        if (!found || isSelectedRange(cm.listSelections(), cur.from(), cur.to()))
          return;
        cm.addSelection(cur.from(), cur.to());
      }
      if (fullWord)
        cm.state.sublimeFindFullWord = cm.doc.sel;
    };
    cmds.skipAndSelectNextOccurrence = function(cm) {
      var prevAnchor = cm.getCursor("anchor"), prevHead = cm.getCursor("head");
      cmds.selectNextOccurrence(cm);
      if (CodeMirror.cmpPos(prevAnchor, prevHead) != 0) {
        cm.doc.setSelections(cm.doc.listSelections().filter(function(sel) {
          return sel.anchor != prevAnchor || sel.head != prevHead;
        }));
      }
    };
    function addCursorToSelection(cm, dir) {
      var ranges = cm.listSelections(), newRanges = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        var newAnchor = cm.findPosV(range.anchor, dir, "line", range.anchor.goalColumn);
        var newHead = cm.findPosV(range.head, dir, "line", range.head.goalColumn);
        newAnchor.goalColumn = range.anchor.goalColumn != null ? range.anchor.goalColumn : cm.cursorCoords(range.anchor, "div").left;
        newHead.goalColumn = range.head.goalColumn != null ? range.head.goalColumn : cm.cursorCoords(range.head, "div").left;
        var newRange = { anchor: newAnchor, head: newHead };
        newRanges.push(range);
        newRanges.push(newRange);
      }
      cm.setSelections(newRanges);
    }
    __name(addCursorToSelection, "addCursorToSelection");
    cmds.addCursorToPrevLine = function(cm) {
      addCursorToSelection(cm, -1);
    };
    cmds.addCursorToNextLine = function(cm) {
      addCursorToSelection(cm, 1);
    };
    function isSelectedRange(ranges, from, to) {
      for (var i = 0; i < ranges.length; i++)
        if (CodeMirror.cmpPos(ranges[i].from(), from) == 0 && CodeMirror.cmpPos(ranges[i].to(), to) == 0)
          return true;
      return false;
    }
    __name(isSelectedRange, "isSelectedRange");
    var mirror = "(){}[]";
    function selectBetweenBrackets(cm) {
      var ranges = cm.listSelections(), newRanges = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i], pos = range.head, opening = cm.scanForBracket(pos, -1);
        if (!opening)
          return false;
        for (; ; ) {
          var closing = cm.scanForBracket(pos, 1);
          if (!closing)
            return false;
          if (closing.ch == mirror.charAt(mirror.indexOf(opening.ch) + 1)) {
            var startPos = Pos(opening.pos.line, opening.pos.ch + 1);
            if (CodeMirror.cmpPos(startPos, range.from()) == 0 && CodeMirror.cmpPos(closing.pos, range.to()) == 0) {
              opening = cm.scanForBracket(opening.pos, -1);
              if (!opening)
                return false;
            } else {
              newRanges.push({ anchor: startPos, head: closing.pos });
              break;
            }
          }
          pos = Pos(closing.pos.line, closing.pos.ch + 1);
        }
      }
      cm.setSelections(newRanges);
      return true;
    }
    __name(selectBetweenBrackets, "selectBetweenBrackets");
    cmds.selectScope = function(cm) {
      selectBetweenBrackets(cm) || cm.execCommand("selectAll");
    };
    cmds.selectBetweenBrackets = function(cm) {
      if (!selectBetweenBrackets(cm))
        return CodeMirror.Pass;
    };
    function puncType(type) {
      return !type ? null : /\bpunctuation\b/.test(type) ? type : void 0;
    }
    __name(puncType, "puncType");
    cmds.goToBracket = function(cm) {
      cm.extendSelectionsBy(function(range) {
        var next = cm.scanForBracket(range.head, 1, puncType(cm.getTokenTypeAt(range.head)));
        if (next && CodeMirror.cmpPos(next.pos, range.head) != 0)
          return next.pos;
        var prev = cm.scanForBracket(range.head, -1, puncType(cm.getTokenTypeAt(Pos(range.head.line, range.head.ch + 1))));
        return prev && Pos(prev.pos.line, prev.pos.ch + 1) || range.head;
      });
    };
    cmds.swapLineUp = function(cm) {
      if (cm.isReadOnly())
        return CodeMirror.Pass;
      var ranges = cm.listSelections(), linesToMove = [], at = cm.firstLine() - 1, newSels = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i], from = range.from().line - 1, to = range.to().line;
        newSels.push({
          anchor: Pos(range.anchor.line - 1, range.anchor.ch),
          head: Pos(range.head.line - 1, range.head.ch)
        });
        if (range.to().ch == 0 && !range.empty())
          --to;
        if (from > at)
          linesToMove.push(from, to);
        else if (linesToMove.length)
          linesToMove[linesToMove.length - 1] = to;
        at = to;
      }
      cm.operation(function() {
        for (var i2 = 0; i2 < linesToMove.length; i2 += 2) {
          var from2 = linesToMove[i2], to2 = linesToMove[i2 + 1];
          var line = cm.getLine(from2);
          cm.replaceRange("", Pos(from2, 0), Pos(from2 + 1, 0), "+swapLine");
          if (to2 > cm.lastLine())
            cm.replaceRange("\n" + line, Pos(cm.lastLine()), null, "+swapLine");
          else
            cm.replaceRange(line + "\n", Pos(to2, 0), null, "+swapLine");
        }
        cm.setSelections(newSels);
        cm.scrollIntoView();
      });
    };
    cmds.swapLineDown = function(cm) {
      if (cm.isReadOnly())
        return CodeMirror.Pass;
      var ranges = cm.listSelections(), linesToMove = [], at = cm.lastLine() + 1;
      for (var i = ranges.length - 1; i >= 0; i--) {
        var range = ranges[i], from = range.to().line + 1, to = range.from().line;
        if (range.to().ch == 0 && !range.empty())
          from--;
        if (from < at)
          linesToMove.push(from, to);
        else if (linesToMove.length)
          linesToMove[linesToMove.length - 1] = to;
        at = to;
      }
      cm.operation(function() {
        for (var i2 = linesToMove.length - 2; i2 >= 0; i2 -= 2) {
          var from2 = linesToMove[i2], to2 = linesToMove[i2 + 1];
          var line = cm.getLine(from2);
          if (from2 == cm.lastLine())
            cm.replaceRange("", Pos(from2 - 1), Pos(from2), "+swapLine");
          else
            cm.replaceRange("", Pos(from2, 0), Pos(from2 + 1, 0), "+swapLine");
          cm.replaceRange(line + "\n", Pos(to2, 0), null, "+swapLine");
        }
        cm.scrollIntoView();
      });
    };
    cmds.toggleCommentIndented = function(cm) {
      cm.toggleComment({ indent: true });
    };
    cmds.joinLines = function(cm) {
      var ranges = cm.listSelections(), joined = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i], from = range.from();
        var start = from.line, end = range.to().line;
        while (i < ranges.length - 1 && ranges[i + 1].from().line == end)
          end = ranges[++i].to().line;
        joined.push({ start, end, anchor: !range.empty() && from });
      }
      cm.operation(function() {
        var offset = 0, ranges2 = [];
        for (var i2 = 0; i2 < joined.length; i2++) {
          var obj = joined[i2];
          var anchor = obj.anchor && Pos(obj.anchor.line - offset, obj.anchor.ch), head;
          for (var line = obj.start; line <= obj.end; line++) {
            var actual = line - offset;
            if (line == obj.end)
              head = Pos(actual, cm.getLine(actual).length + 1);
            if (actual < cm.lastLine()) {
              cm.replaceRange(" ", Pos(actual), Pos(actual + 1, /^\s*/.exec(cm.getLine(actual + 1))[0].length));
              ++offset;
            }
          }
          ranges2.push({ anchor: anchor || head, head });
        }
        cm.setSelections(ranges2, 0);
      });
    };
    cmds.duplicateLine = function(cm) {
      cm.operation(function() {
        var rangeCount = cm.listSelections().length;
        for (var i = 0; i < rangeCount; i++) {
          var range = cm.listSelections()[i];
          if (range.empty())
            cm.replaceRange(cm.getLine(range.head.line) + "\n", Pos(range.head.line, 0));
          else
            cm.replaceRange(cm.getRange(range.from(), range.to()), range.from());
        }
        cm.scrollIntoView();
      });
    };
    function sortLines(cm, caseSensitive, direction) {
      if (cm.isReadOnly())
        return CodeMirror.Pass;
      var ranges = cm.listSelections(), toSort = [], selected;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (range.empty())
          continue;
        var from = range.from().line, to = range.to().line;
        while (i < ranges.length - 1 && ranges[i + 1].from().line == to)
          to = ranges[++i].to().line;
        if (!ranges[i].to().ch)
          to--;
        toSort.push(from, to);
      }
      if (toSort.length)
        selected = true;
      else
        toSort.push(cm.firstLine(), cm.lastLine());
      cm.operation(function() {
        var ranges2 = [];
        for (var i2 = 0; i2 < toSort.length; i2 += 2) {
          var from2 = toSort[i2], to2 = toSort[i2 + 1];
          var start = Pos(from2, 0), end = Pos(to2);
          var lines = cm.getRange(start, end, false);
          if (caseSensitive)
            lines.sort(function(a, b) {
              return a < b ? -direction : a == b ? 0 : direction;
            });
          else
            lines.sort(function(a, b) {
              var au = a.toUpperCase(), bu = b.toUpperCase();
              if (au != bu) {
                a = au;
                b = bu;
              }
              return a < b ? -direction : a == b ? 0 : direction;
            });
          cm.replaceRange(lines, start, end);
          if (selected)
            ranges2.push({ anchor: start, head: Pos(to2 + 1, 0) });
        }
        if (selected)
          cm.setSelections(ranges2, 0);
      });
    }
    __name(sortLines, "sortLines");
    cmds.sortLines = function(cm) {
      sortLines(cm, true, 1);
    };
    cmds.reverseSortLines = function(cm) {
      sortLines(cm, true, -1);
    };
    cmds.sortLinesInsensitive = function(cm) {
      sortLines(cm, false, 1);
    };
    cmds.reverseSortLinesInsensitive = function(cm) {
      sortLines(cm, false, -1);
    };
    cmds.nextBookmark = function(cm) {
      var marks = cm.state.sublimeBookmarks;
      if (marks)
        while (marks.length) {
          var current = marks.shift();
          var found = current.find();
          if (found) {
            marks.push(current);
            return cm.setSelection(found.from, found.to);
          }
        }
    };
    cmds.prevBookmark = function(cm) {
      var marks = cm.state.sublimeBookmarks;
      if (marks)
        while (marks.length) {
          marks.unshift(marks.pop());
          var found = marks[marks.length - 1].find();
          if (!found)
            marks.pop();
          else
            return cm.setSelection(found.from, found.to);
        }
    };
    cmds.toggleBookmark = function(cm) {
      var ranges = cm.listSelections();
      var marks = cm.state.sublimeBookmarks || (cm.state.sublimeBookmarks = []);
      for (var i = 0; i < ranges.length; i++) {
        var from = ranges[i].from(), to = ranges[i].to();
        var found = ranges[i].empty() ? cm.findMarksAt(from) : cm.findMarks(from, to);
        for (var j = 0; j < found.length; j++) {
          if (found[j].sublimeBookmark) {
            found[j].clear();
            for (var k = 0; k < marks.length; k++)
              if (marks[k] == found[j])
                marks.splice(k--, 1);
            break;
          }
        }
        if (j == found.length)
          marks.push(cm.markText(from, to, { sublimeBookmark: true, clearWhenEmpty: false }));
      }
    };
    cmds.clearBookmarks = function(cm) {
      var marks = cm.state.sublimeBookmarks;
      if (marks)
        for (var i = 0; i < marks.length; i++)
          marks[i].clear();
      marks.length = 0;
    };
    cmds.selectBookmarks = function(cm) {
      var marks = cm.state.sublimeBookmarks, ranges = [];
      if (marks)
        for (var i = 0; i < marks.length; i++) {
          var found = marks[i].find();
          if (!found)
            marks.splice(i--, 0);
          else
            ranges.push({ anchor: found.from, head: found.to });
        }
      if (ranges.length)
        cm.setSelections(ranges, 0);
    };
    function modifyWordOrSelection(cm, mod) {
      cm.operation(function() {
        var ranges = cm.listSelections(), indices = [], replacements = [];
        for (var i = 0; i < ranges.length; i++) {
          var range = ranges[i];
          if (range.empty()) {
            indices.push(i);
            replacements.push("");
          } else
            replacements.push(mod(cm.getRange(range.from(), range.to())));
        }
        cm.replaceSelections(replacements, "around", "case");
        for (var i = indices.length - 1, at; i >= 0; i--) {
          var range = ranges[indices[i]];
          if (at && CodeMirror.cmpPos(range.head, at) > 0)
            continue;
          var word = wordAt(cm, range.head);
          at = word.from;
          cm.replaceRange(mod(word.word), word.from, word.to);
        }
      });
    }
    __name(modifyWordOrSelection, "modifyWordOrSelection");
    cmds.smartBackspace = function(cm) {
      if (cm.somethingSelected())
        return CodeMirror.Pass;
      cm.operation(function() {
        var cursors = cm.listSelections();
        var indentUnit = cm.getOption("indentUnit");
        for (var i = cursors.length - 1; i >= 0; i--) {
          var cursor = cursors[i].head;
          var toStartOfLine = cm.getRange({ line: cursor.line, ch: 0 }, cursor);
          var column = CodeMirror.countColumn(toStartOfLine, null, cm.getOption("tabSize"));
          var deletePos = cm.findPosH(cursor, -1, "char", false);
          if (toStartOfLine && !/\S/.test(toStartOfLine) && column % indentUnit == 0) {
            var prevIndent = new Pos(cursor.line, CodeMirror.findColumn(toStartOfLine, column - indentUnit, indentUnit));
            if (prevIndent.ch != cursor.ch)
              deletePos = prevIndent;
          }
          cm.replaceRange("", deletePos, cursor, "+delete");
        }
      });
    };
    cmds.delLineRight = function(cm) {
      cm.operation(function() {
        var ranges = cm.listSelections();
        for (var i = ranges.length - 1; i >= 0; i--)
          cm.replaceRange("", ranges[i].anchor, Pos(ranges[i].to().line), "+delete");
        cm.scrollIntoView();
      });
    };
    cmds.upcaseAtCursor = function(cm) {
      modifyWordOrSelection(cm, function(str) {
        return str.toUpperCase();
      });
    };
    cmds.downcaseAtCursor = function(cm) {
      modifyWordOrSelection(cm, function(str) {
        return str.toLowerCase();
      });
    };
    cmds.setSublimeMark = function(cm) {
      if (cm.state.sublimeMark)
        cm.state.sublimeMark.clear();
      cm.state.sublimeMark = cm.setBookmark(cm.getCursor());
    };
    cmds.selectToSublimeMark = function(cm) {
      var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
      if (found)
        cm.setSelection(cm.getCursor(), found);
    };
    cmds.deleteToSublimeMark = function(cm) {
      var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
      if (found) {
        var from = cm.getCursor(), to = found;
        if (CodeMirror.cmpPos(from, to) > 0) {
          var tmp = to;
          to = from;
          from = tmp;
        }
        cm.state.sublimeKilled = cm.getRange(from, to);
        cm.replaceRange("", from, to);
      }
    };
    cmds.swapWithSublimeMark = function(cm) {
      var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
      if (found) {
        cm.state.sublimeMark.clear();
        cm.state.sublimeMark = cm.setBookmark(cm.getCursor());
        cm.setCursor(found);
      }
    };
    cmds.sublimeYank = function(cm) {
      if (cm.state.sublimeKilled != null)
        cm.replaceSelection(cm.state.sublimeKilled, null, "paste");
    };
    cmds.showInCenter = function(cm) {
      var pos = cm.cursorCoords(null, "local");
      cm.scrollTo(null, (pos.top + pos.bottom) / 2 - cm.getScrollInfo().clientHeight / 2);
    };
    function getTarget(cm) {
      var from = cm.getCursor("from"), to = cm.getCursor("to");
      if (CodeMirror.cmpPos(from, to) == 0) {
        var word = wordAt(cm, from);
        if (!word.word)
          return;
        from = word.from;
        to = word.to;
      }
      return { from, to, query: cm.getRange(from, to), word };
    }
    __name(getTarget, "getTarget");
    function findAndGoTo(cm, forward) {
      var target = getTarget(cm);
      if (!target)
        return;
      var query = target.query;
      var cur = cm.getSearchCursor(query, forward ? target.to : target.from);
      if (forward ? cur.findNext() : cur.findPrevious()) {
        cm.setSelection(cur.from(), cur.to());
      } else {
        cur = cm.getSearchCursor(query, forward ? Pos(cm.firstLine(), 0) : cm.clipPos(Pos(cm.lastLine())));
        if (forward ? cur.findNext() : cur.findPrevious())
          cm.setSelection(cur.from(), cur.to());
        else if (target.word)
          cm.setSelection(target.from, target.to);
      }
    }
    __name(findAndGoTo, "findAndGoTo");
    cmds.findUnder = function(cm) {
      findAndGoTo(cm, true);
    };
    cmds.findUnderPrevious = function(cm) {
      findAndGoTo(cm, false);
    };
    cmds.findAllUnder = function(cm) {
      var target = getTarget(cm);
      if (!target)
        return;
      var cur = cm.getSearchCursor(target.query);
      var matches = [];
      var primaryIndex = -1;
      while (cur.findNext()) {
        matches.push({ anchor: cur.from(), head: cur.to() });
        if (cur.from().line <= target.from.line && cur.from().ch <= target.from.ch)
          primaryIndex++;
      }
      cm.setSelections(matches, primaryIndex);
    };
    var keyMap = CodeMirror.keyMap;
    keyMap.macSublime = {
      "Cmd-Left": "goLineStartSmart",
      "Shift-Tab": "indentLess",
      "Shift-Ctrl-K": "deleteLine",
      "Alt-Q": "wrapLines",
      "Ctrl-Left": "goSubwordLeft",
      "Ctrl-Right": "goSubwordRight",
      "Ctrl-Alt-Up": "scrollLineUp",
      "Ctrl-Alt-Down": "scrollLineDown",
      "Cmd-L": "selectLine",
      "Shift-Cmd-L": "splitSelectionByLine",
      "Esc": "singleSelectionTop",
      "Cmd-Enter": "insertLineAfter",
      "Shift-Cmd-Enter": "insertLineBefore",
      "Cmd-D": "selectNextOccurrence",
      "Shift-Cmd-Space": "selectScope",
      "Shift-Cmd-M": "selectBetweenBrackets",
      "Cmd-M": "goToBracket",
      "Cmd-Ctrl-Up": "swapLineUp",
      "Cmd-Ctrl-Down": "swapLineDown",
      "Cmd-/": "toggleCommentIndented",
      "Cmd-J": "joinLines",
      "Shift-Cmd-D": "duplicateLine",
      "F5": "sortLines",
      "Shift-F5": "reverseSortLines",
      "Cmd-F5": "sortLinesInsensitive",
      "Shift-Cmd-F5": "reverseSortLinesInsensitive",
      "F2": "nextBookmark",
      "Shift-F2": "prevBookmark",
      "Cmd-F2": "toggleBookmark",
      "Shift-Cmd-F2": "clearBookmarks",
      "Alt-F2": "selectBookmarks",
      "Backspace": "smartBackspace",
      "Cmd-K Cmd-D": "skipAndSelectNextOccurrence",
      "Cmd-K Cmd-K": "delLineRight",
      "Cmd-K Cmd-U": "upcaseAtCursor",
      "Cmd-K Cmd-L": "downcaseAtCursor",
      "Cmd-K Cmd-Space": "setSublimeMark",
      "Cmd-K Cmd-A": "selectToSublimeMark",
      "Cmd-K Cmd-W": "deleteToSublimeMark",
      "Cmd-K Cmd-X": "swapWithSublimeMark",
      "Cmd-K Cmd-Y": "sublimeYank",
      "Cmd-K Cmd-C": "showInCenter",
      "Cmd-K Cmd-G": "clearBookmarks",
      "Cmd-K Cmd-Backspace": "delLineLeft",
      "Cmd-K Cmd-1": "foldAll",
      "Cmd-K Cmd-0": "unfoldAll",
      "Cmd-K Cmd-J": "unfoldAll",
      "Ctrl-Shift-Up": "addCursorToPrevLine",
      "Ctrl-Shift-Down": "addCursorToNextLine",
      "Cmd-F3": "findUnder",
      "Shift-Cmd-F3": "findUnderPrevious",
      "Alt-F3": "findAllUnder",
      "Shift-Cmd-[": "fold",
      "Shift-Cmd-]": "unfold",
      "Cmd-I": "findIncremental",
      "Shift-Cmd-I": "findIncrementalReverse",
      "Cmd-H": "replace",
      "F3": "findNext",
      "Shift-F3": "findPrev",
      "fallthrough": "macDefault"
    };
    CodeMirror.normalizeKeyMap(keyMap.macSublime);
    keyMap.pcSublime = {
      "Shift-Tab": "indentLess",
      "Shift-Ctrl-K": "deleteLine",
      "Alt-Q": "wrapLines",
      "Ctrl-T": "transposeChars",
      "Alt-Left": "goSubwordLeft",
      "Alt-Right": "goSubwordRight",
      "Ctrl-Up": "scrollLineUp",
      "Ctrl-Down": "scrollLineDown",
      "Ctrl-L": "selectLine",
      "Shift-Ctrl-L": "splitSelectionByLine",
      "Esc": "singleSelectionTop",
      "Ctrl-Enter": "insertLineAfter",
      "Shift-Ctrl-Enter": "insertLineBefore",
      "Ctrl-D": "selectNextOccurrence",
      "Shift-Ctrl-Space": "selectScope",
      "Shift-Ctrl-M": "selectBetweenBrackets",
      "Ctrl-M": "goToBracket",
      "Shift-Ctrl-Up": "swapLineUp",
      "Shift-Ctrl-Down": "swapLineDown",
      "Ctrl-/": "toggleCommentIndented",
      "Ctrl-J": "joinLines",
      "Shift-Ctrl-D": "duplicateLine",
      "F9": "sortLines",
      "Shift-F9": "reverseSortLines",
      "Ctrl-F9": "sortLinesInsensitive",
      "Shift-Ctrl-F9": "reverseSortLinesInsensitive",
      "F2": "nextBookmark",
      "Shift-F2": "prevBookmark",
      "Ctrl-F2": "toggleBookmark",
      "Shift-Ctrl-F2": "clearBookmarks",
      "Alt-F2": "selectBookmarks",
      "Backspace": "smartBackspace",
      "Ctrl-K Ctrl-D": "skipAndSelectNextOccurrence",
      "Ctrl-K Ctrl-K": "delLineRight",
      "Ctrl-K Ctrl-U": "upcaseAtCursor",
      "Ctrl-K Ctrl-L": "downcaseAtCursor",
      "Ctrl-K Ctrl-Space": "setSublimeMark",
      "Ctrl-K Ctrl-A": "selectToSublimeMark",
      "Ctrl-K Ctrl-W": "deleteToSublimeMark",
      "Ctrl-K Ctrl-X": "swapWithSublimeMark",
      "Ctrl-K Ctrl-Y": "sublimeYank",
      "Ctrl-K Ctrl-C": "showInCenter",
      "Ctrl-K Ctrl-G": "clearBookmarks",
      "Ctrl-K Ctrl-Backspace": "delLineLeft",
      "Ctrl-K Ctrl-1": "foldAll",
      "Ctrl-K Ctrl-0": "unfoldAll",
      "Ctrl-K Ctrl-J": "unfoldAll",
      "Ctrl-Alt-Up": "addCursorToPrevLine",
      "Ctrl-Alt-Down": "addCursorToNextLine",
      "Ctrl-F3": "findUnder",
      "Shift-Ctrl-F3": "findUnderPrevious",
      "Alt-F3": "findAllUnder",
      "Shift-Ctrl-[": "fold",
      "Shift-Ctrl-]": "unfold",
      "Ctrl-I": "findIncremental",
      "Shift-Ctrl-I": "findIncrementalReverse",
      "Ctrl-H": "replace",
      "F3": "findNext",
      "Shift-F3": "findPrev",
      "fallthrough": "pcDefault"
    };
    CodeMirror.normalizeKeyMap(keyMap.pcSublime);
    var mac = keyMap.default == keyMap.macDefault;
    keyMap.sublime = mac ? keyMap.macSublime : keyMap.pcSublime;
  });
})();
var sublime = sublime$2.exports;
var sublime$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": sublime
}, [sublime$2.exports]);



/***/ })

}]);
//# sourceMappingURL=571.graphiql.app.js.map