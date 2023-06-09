"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[92],{

/***/ 5092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ comment$1)
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
var comment$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    var noOptions = {};
    var nonWS = /[^\s\u00a0]/;
    var Pos = CodeMirror.Pos, cmp = CodeMirror.cmpPos;
    function firstNonWS(str) {
      var found = str.search(nonWS);
      return found == -1 ? 0 : found;
    }
    __name(firstNonWS, "firstNonWS");
    CodeMirror.commands.toggleComment = function(cm) {
      cm.toggleComment();
    };
    CodeMirror.defineExtension("toggleComment", function(options) {
      if (!options)
        options = noOptions;
      var cm = this;
      var minLine = Infinity, ranges = this.listSelections(), mode = null;
      for (var i = ranges.length - 1; i >= 0; i--) {
        var from = ranges[i].from(), to = ranges[i].to();
        if (from.line >= minLine)
          continue;
        if (to.line >= minLine)
          to = Pos(minLine, 0);
        minLine = from.line;
        if (mode == null) {
          if (cm.uncomment(from, to, options))
            mode = "un";
          else {
            cm.lineComment(from, to, options);
            mode = "line";
          }
        } else if (mode == "un") {
          cm.uncomment(from, to, options);
        } else {
          cm.lineComment(from, to, options);
        }
      }
    });
    function probablyInsideString(cm, pos, line) {
      return /\bstring\b/.test(cm.getTokenTypeAt(Pos(pos.line, 0))) && !/^[\'\"\`]/.test(line);
    }
    __name(probablyInsideString, "probablyInsideString");
    function getMode(cm, pos) {
      var mode = cm.getMode();
      return mode.useInnerComments === false || !mode.innerMode ? mode : cm.getModeAt(pos);
    }
    __name(getMode, "getMode");
    CodeMirror.defineExtension("lineComment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self = this, mode = getMode(self, from);
      var firstLine = self.getLine(from.line);
      if (firstLine == null || probablyInsideString(self, from, firstLine))
        return;
      var commentString = options.lineComment || mode.lineComment;
      if (!commentString) {
        if (options.blockCommentStart || mode.blockCommentStart) {
          options.fullLines = true;
          self.blockComment(from, to, options);
        }
        return;
      }
      var end = Math.min(to.ch != 0 || to.line == from.line ? to.line + 1 : to.line, self.lastLine() + 1);
      var pad = options.padding == null ? " " : options.padding;
      var blankLines = options.commentBlankLines || from.line == to.line;
      self.operation(function() {
        if (options.indent) {
          var baseString = null;
          for (var i = from.line; i < end; ++i) {
            var line = self.getLine(i);
            var whitespace = line.slice(0, firstNonWS(line));
            if (baseString == null || baseString.length > whitespace.length) {
              baseString = whitespace;
            }
          }
          for (var i = from.line; i < end; ++i) {
            var line = self.getLine(i), cut = baseString.length;
            if (!blankLines && !nonWS.test(line))
              continue;
            if (line.slice(0, cut) != baseString)
              cut = firstNonWS(line);
            self.replaceRange(baseString + commentString + pad, Pos(i, 0), Pos(i, cut));
          }
        } else {
          for (var i = from.line; i < end; ++i) {
            if (blankLines || nonWS.test(self.getLine(i)))
              self.replaceRange(commentString + pad, Pos(i, 0));
          }
        }
      });
    });
    CodeMirror.defineExtension("blockComment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self = this, mode = getMode(self, from);
      var startString = options.blockCommentStart || mode.blockCommentStart;
      var endString = options.blockCommentEnd || mode.blockCommentEnd;
      if (!startString || !endString) {
        if ((options.lineComment || mode.lineComment) && options.fullLines != false)
          self.lineComment(from, to, options);
        return;
      }
      if (/\bcomment\b/.test(self.getTokenTypeAt(Pos(from.line, 0))))
        return;
      var end = Math.min(to.line, self.lastLine());
      if (end != from.line && to.ch == 0 && nonWS.test(self.getLine(end)))
        --end;
      var pad = options.padding == null ? " " : options.padding;
      if (from.line > end)
        return;
      self.operation(function() {
        if (options.fullLines != false) {
          var lastLineHasText = nonWS.test(self.getLine(end));
          self.replaceRange(pad + endString, Pos(end));
          self.replaceRange(startString + pad, Pos(from.line, 0));
          var lead = options.blockCommentLead || mode.blockCommentLead;
          if (lead != null) {
            for (var i = from.line + 1; i <= end; ++i)
              if (i != end || lastLineHasText)
                self.replaceRange(lead + pad, Pos(i, 0));
          }
        } else {
          var atCursor = cmp(self.getCursor("to"), to) == 0, empty = !self.somethingSelected();
          self.replaceRange(endString, to);
          if (atCursor)
            self.setSelection(empty ? to : self.getCursor("from"), to);
          self.replaceRange(startString, from);
        }
      });
    });
    CodeMirror.defineExtension("uncomment", function(from, to, options) {
      if (!options)
        options = noOptions;
      var self = this, mode = getMode(self, from);
      var end = Math.min(to.ch != 0 || to.line == from.line ? to.line : to.line - 1, self.lastLine()), start = Math.min(from.line, end);
      var lineString = options.lineComment || mode.lineComment, lines = [];
      var pad = options.padding == null ? " " : options.padding, didSomething;
      lineComment: {
        if (!lineString)
          break lineComment;
        for (var i = start; i <= end; ++i) {
          var line = self.getLine(i);
          var found = line.indexOf(lineString);
          if (found > -1 && !/comment/.test(self.getTokenTypeAt(Pos(i, found + 1))))
            found = -1;
          if (found == -1 && nonWS.test(line))
            break lineComment;
          if (found > -1 && nonWS.test(line.slice(0, found)))
            break lineComment;
          lines.push(line);
        }
        self.operation(function() {
          for (var i2 = start; i2 <= end; ++i2) {
            var line2 = lines[i2 - start];
            var pos = line2.indexOf(lineString), endPos = pos + lineString.length;
            if (pos < 0)
              continue;
            if (line2.slice(endPos, endPos + pad.length) == pad)
              endPos += pad.length;
            didSomething = true;
            self.replaceRange("", Pos(i2, pos), Pos(i2, endPos));
          }
        });
        if (didSomething)
          return true;
      }
      var startString = options.blockCommentStart || mode.blockCommentStart;
      var endString = options.blockCommentEnd || mode.blockCommentEnd;
      if (!startString || !endString)
        return false;
      var lead = options.blockCommentLead || mode.blockCommentLead;
      var startLine = self.getLine(start), open = startLine.indexOf(startString);
      if (open == -1)
        return false;
      var endLine = end == start ? startLine : self.getLine(end);
      var close = endLine.indexOf(endString, end == start ? open + startString.length : 0);
      var insideStart = Pos(start, open + 1), insideEnd = Pos(end, close + 1);
      if (close == -1 || !/comment/.test(self.getTokenTypeAt(insideStart)) || !/comment/.test(self.getTokenTypeAt(insideEnd)) || self.getRange(insideStart, insideEnd, "\n").indexOf(endString) > -1)
        return false;
      var lastStart = startLine.lastIndexOf(startString, from.ch);
      var firstEnd = lastStart == -1 ? -1 : startLine.slice(0, from.ch).indexOf(endString, lastStart + startString.length);
      if (lastStart != -1 && firstEnd != -1 && firstEnd + endString.length != from.ch)
        return false;
      firstEnd = endLine.indexOf(endString, to.ch);
      var almostLastStart = endLine.slice(to.ch).lastIndexOf(startString, firstEnd - to.ch);
      lastStart = firstEnd == -1 || almostLastStart == -1 ? -1 : to.ch + almostLastStart;
      if (firstEnd != -1 && lastStart != -1 && lastStart != to.ch)
        return false;
      self.operation(function() {
        self.replaceRange("", Pos(end, close - (pad && endLine.slice(close - pad.length, close) == pad ? pad.length : 0)), Pos(end, close + endString.length));
        var openEnd = open + startString.length;
        if (pad && startLine.slice(openEnd, openEnd + pad.length) == pad)
          openEnd += pad.length;
        self.replaceRange("", Pos(start, open), Pos(start, openEnd));
        if (lead)
          for (var i2 = start + 1; i2 <= end; ++i2) {
            var line2 = self.getLine(i2), found2 = line2.indexOf(lead);
            if (found2 == -1 || nonWS.test(line2.slice(0, found2)))
              continue;
            var foundEnd = found2 + lead.length;
            if (pad && line2.slice(foundEnd, foundEnd + pad.length) == pad)
              foundEnd += pad.length;
            self.replaceRange("", Pos(i2, found2), Pos(i2, foundEnd));
          }
      });
      return true;
    });
  });
})();
var comment = comment$2.exports;
var comment$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": comment
}, [comment$2.exports]);



/***/ })

}]);
//# sourceMappingURL=92.graphiql.app.js.map