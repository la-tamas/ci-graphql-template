"use strict";
(self["webpackChunkfe_images"] = self["webpackChunkfe_images"] || []).push([[481],{

/***/ 7481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ lint$1)
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
var lint$2 = { exports: {} };
(function(module, exports) {
  (function(mod) {
    mod(_codemirror_es_js__WEBPACK_IMPORTED_MODULE_0__.a.exports);
  })(function(CodeMirror) {
    var GUTTER_ID = "CodeMirror-lint-markers";
    var LINT_LINE_ID = "CodeMirror-lint-line-";
    function showTooltip(cm, e, content) {
      var tt = document.createElement("div");
      tt.className = "CodeMirror-lint-tooltip cm-s-" + cm.options.theme;
      tt.appendChild(content.cloneNode(true));
      if (cm.state.lint.options.selfContain)
        cm.getWrapperElement().appendChild(tt);
      else
        document.body.appendChild(tt);
      function position(e2) {
        if (!tt.parentNode)
          return CodeMirror.off(document, "mousemove", position);
        tt.style.top = Math.max(0, e2.clientY - tt.offsetHeight - 5) + "px";
        tt.style.left = e2.clientX + 5 + "px";
      }
      __name(position, "position");
      CodeMirror.on(document, "mousemove", position);
      position(e);
      if (tt.style.opacity != null)
        tt.style.opacity = 1;
      return tt;
    }
    __name(showTooltip, "showTooltip");
    function rm(elt) {
      if (elt.parentNode)
        elt.parentNode.removeChild(elt);
    }
    __name(rm, "rm");
    function hideTooltip(tt) {
      if (!tt.parentNode)
        return;
      if (tt.style.opacity == null)
        rm(tt);
      tt.style.opacity = 0;
      setTimeout(function() {
        rm(tt);
      }, 600);
    }
    __name(hideTooltip, "hideTooltip");
    function showTooltipFor(cm, e, content, node) {
      var tooltip = showTooltip(cm, e, content);
      function hide() {
        CodeMirror.off(node, "mouseout", hide);
        if (tooltip) {
          hideTooltip(tooltip);
          tooltip = null;
        }
      }
      __name(hide, "hide");
      var poll = setInterval(function() {
        if (tooltip)
          for (var n = node; ; n = n.parentNode) {
            if (n && n.nodeType == 11)
              n = n.host;
            if (n == document.body)
              return;
            if (!n) {
              hide();
              break;
            }
          }
        if (!tooltip)
          return clearInterval(poll);
      }, 400);
      CodeMirror.on(node, "mouseout", hide);
    }
    __name(showTooltipFor, "showTooltipFor");
    function LintState(cm, conf, hasGutter) {
      this.marked = [];
      if (conf instanceof Function)
        conf = { getAnnotations: conf };
      if (!conf || conf === true)
        conf = {};
      this.options = {};
      this.linterOptions = conf.options || {};
      for (var prop in defaults)
        this.options[prop] = defaults[prop];
      for (var prop in conf) {
        if (defaults.hasOwnProperty(prop)) {
          if (conf[prop] != null)
            this.options[prop] = conf[prop];
        } else if (!conf.options) {
          this.linterOptions[prop] = conf[prop];
        }
      }
      this.timeout = null;
      this.hasGutter = hasGutter;
      this.onMouseOver = function(e) {
        onMouseOver(cm, e);
      };
      this.waitingFor = 0;
    }
    __name(LintState, "LintState");
    var defaults = {
      highlightLines: false,
      tooltips: true,
      delay: 500,
      lintOnChange: true,
      getAnnotations: null,
      async: false,
      selfContain: null,
      formatAnnotation: null,
      onUpdateLinting: null
    };
    function clearMarks(cm) {
      var state = cm.state.lint;
      if (state.hasGutter)
        cm.clearGutter(GUTTER_ID);
      if (state.options.highlightLines)
        clearErrorLines(cm);
      for (var i = 0; i < state.marked.length; ++i)
        state.marked[i].clear();
      state.marked.length = 0;
    }
    __name(clearMarks, "clearMarks");
    function clearErrorLines(cm) {
      cm.eachLine(function(line) {
        var has = line.wrapClass && /\bCodeMirror-lint-line-\w+\b/.exec(line.wrapClass);
        if (has)
          cm.removeLineClass(line, "wrap", has[0]);
      });
    }
    __name(clearErrorLines, "clearErrorLines");
    function makeMarker(cm, labels, severity, multiple, tooltips) {
      var marker = document.createElement("div"), inner = marker;
      marker.className = "CodeMirror-lint-marker CodeMirror-lint-marker-" + severity;
      if (multiple) {
        inner = marker.appendChild(document.createElement("div"));
        inner.className = "CodeMirror-lint-marker CodeMirror-lint-marker-multiple";
      }
      if (tooltips != false)
        CodeMirror.on(inner, "mouseover", function(e) {
          showTooltipFor(cm, e, labels, inner);
        });
      return marker;
    }
    __name(makeMarker, "makeMarker");
    function getMaxSeverity(a, b) {
      if (a == "error")
        return a;
      else
        return b;
    }
    __name(getMaxSeverity, "getMaxSeverity");
    function groupByLine(annotations) {
      var lines = [];
      for (var i = 0; i < annotations.length; ++i) {
        var ann = annotations[i], line = ann.from.line;
        (lines[line] || (lines[line] = [])).push(ann);
      }
      return lines;
    }
    __name(groupByLine, "groupByLine");
    function annotationTooltip(ann) {
      var severity = ann.severity;
      if (!severity)
        severity = "error";
      var tip = document.createElement("div");
      tip.className = "CodeMirror-lint-message CodeMirror-lint-message-" + severity;
      if (typeof ann.messageHTML != "undefined") {
        tip.innerHTML = ann.messageHTML;
      } else {
        tip.appendChild(document.createTextNode(ann.message));
      }
      return tip;
    }
    __name(annotationTooltip, "annotationTooltip");
    function lintAsync(cm, getAnnotations) {
      var state = cm.state.lint;
      var id = ++state.waitingFor;
      function abort() {
        id = -1;
        cm.off("change", abort);
      }
      __name(abort, "abort");
      cm.on("change", abort);
      getAnnotations(cm.getValue(), function(annotations, arg2) {
        cm.off("change", abort);
        if (state.waitingFor != id)
          return;
        if (arg2 && annotations instanceof CodeMirror)
          annotations = arg2;
        cm.operation(function() {
          updateLinting(cm, annotations);
        });
      }, state.linterOptions, cm);
    }
    __name(lintAsync, "lintAsync");
    function startLinting(cm) {
      var state = cm.state.lint;
      if (!state)
        return;
      var options = state.options;
      var getAnnotations = options.getAnnotations || cm.getHelper(CodeMirror.Pos(0, 0), "lint");
      if (!getAnnotations)
        return;
      if (options.async || getAnnotations.async) {
        lintAsync(cm, getAnnotations);
      } else {
        var annotations = getAnnotations(cm.getValue(), state.linterOptions, cm);
        if (!annotations)
          return;
        if (annotations.then)
          annotations.then(function(issues) {
            cm.operation(function() {
              updateLinting(cm, issues);
            });
          });
        else
          cm.operation(function() {
            updateLinting(cm, annotations);
          });
      }
    }
    __name(startLinting, "startLinting");
    function updateLinting(cm, annotationsNotSorted) {
      var state = cm.state.lint;
      if (!state)
        return;
      var options = state.options;
      clearMarks(cm);
      var annotations = groupByLine(annotationsNotSorted);
      for (var line = 0; line < annotations.length; ++line) {
        var anns = annotations[line];
        if (!anns)
          continue;
        var message = [];
        anns = anns.filter(function(item) {
          return message.indexOf(item.message) > -1 ? false : message.push(item.message);
        });
        var maxSeverity = null;
        var tipLabel = state.hasGutter && document.createDocumentFragment();
        for (var i = 0; i < anns.length; ++i) {
          var ann = anns[i];
          var severity = ann.severity;
          if (!severity)
            severity = "error";
          maxSeverity = getMaxSeverity(maxSeverity, severity);
          if (options.formatAnnotation)
            ann = options.formatAnnotation(ann);
          if (state.hasGutter)
            tipLabel.appendChild(annotationTooltip(ann));
          if (ann.to)
            state.marked.push(cm.markText(ann.from, ann.to, {
              className: "CodeMirror-lint-mark CodeMirror-lint-mark-" + severity,
              __annotation: ann
            }));
        }
        if (state.hasGutter)
          cm.setGutterMarker(line, GUTTER_ID, makeMarker(cm, tipLabel, maxSeverity, annotations[line].length > 1, options.tooltips));
        if (options.highlightLines)
          cm.addLineClass(line, "wrap", LINT_LINE_ID + maxSeverity);
      }
      if (options.onUpdateLinting)
        options.onUpdateLinting(annotationsNotSorted, annotations, cm);
    }
    __name(updateLinting, "updateLinting");
    function onChange(cm) {
      var state = cm.state.lint;
      if (!state)
        return;
      clearTimeout(state.timeout);
      state.timeout = setTimeout(function() {
        startLinting(cm);
      }, state.options.delay);
    }
    __name(onChange, "onChange");
    function popupTooltips(cm, annotations, e) {
      var target = e.target || e.srcElement;
      var tooltip = document.createDocumentFragment();
      for (var i = 0; i < annotations.length; i++) {
        var ann = annotations[i];
        tooltip.appendChild(annotationTooltip(ann));
      }
      showTooltipFor(cm, e, tooltip, target);
    }
    __name(popupTooltips, "popupTooltips");
    function onMouseOver(cm, e) {
      var target = e.target || e.srcElement;
      if (!/\bCodeMirror-lint-mark-/.test(target.className))
        return;
      var box = target.getBoundingClientRect(), x = (box.left + box.right) / 2, y = (box.top + box.bottom) / 2;
      var spans = cm.findMarksAt(cm.coordsChar({ left: x, top: y }, "client"));
      var annotations = [];
      for (var i = 0; i < spans.length; ++i) {
        var ann = spans[i].__annotation;
        if (ann)
          annotations.push(ann);
      }
      if (annotations.length)
        popupTooltips(cm, annotations, e);
    }
    __name(onMouseOver, "onMouseOver");
    CodeMirror.defineOption("lint", false, function(cm, val, old) {
      if (old && old != CodeMirror.Init) {
        clearMarks(cm);
        if (cm.state.lint.options.lintOnChange !== false)
          cm.off("change", onChange);
        CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.lint.onMouseOver);
        clearTimeout(cm.state.lint.timeout);
        delete cm.state.lint;
      }
      if (val) {
        var gutters = cm.getOption("gutters"), hasLintGutter = false;
        for (var i = 0; i < gutters.length; ++i)
          if (gutters[i] == GUTTER_ID)
            hasLintGutter = true;
        var state = cm.state.lint = new LintState(cm, val, hasLintGutter);
        if (state.options.lintOnChange)
          cm.on("change", onChange);
        if (state.options.tooltips != false && state.options.tooltips != "gutter")
          CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
        startLinting(cm);
      }
    });
    CodeMirror.defineExtension("performLint", function() {
      startLinting(this);
    });
  });
})();
var lint = lint$2.exports;
var lint$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": lint
}, [lint$2.exports]);



/***/ })

}]);
//# sourceMappingURL=481.graphiql.app.js.map