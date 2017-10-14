var Tomify =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.object = undefined;

var _object = __webpack_require__(1);

Object.defineProperty(exports, "object", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_object).default;
  }
});

var _package = __webpack_require__(2);

Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _package.version;
  }
});

__webpack_require__(3);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  build: function build(key, value) {
    var object = {};
    object[key] = value;
    return object;
  },
  encode: function encode(object) {
    var keys = Object.keys(object);
    var path = "";
    keys.forEach(function (key) {
      path += encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
      if (key !== keys.last) {
        path += "&";
      }
    });
    return path;
  },
  isEmpty: function isEmpty(object) {
    return Object.keys(object).length === 0;
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"tomify-js","version":"0.0.0","description":"Provides support for paradigms commonly used in Tomify Applications","main":"lib/tomify.js","module":"src/tomify.js","scripts":{"build":"webpack --progress","dev":"webpack-dev-server --progress","test":"echo \"Error: no test specified\" && exit 1"},"repository":"tomprats/tomify-js","keywords":["tomify"],"author":"Tom Prats <tom@tomify.me> (http://tomify.me)","license":"MIT","bugs":{"url":"https://github.com/tomprats/tomify-js/issues"},"homepage":"https://github.com/tomprats/tomify-js#readme","devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.0","eslint":"^4.8.0","eslint-config-airbnb":"^16.0.0","eslint-loader":"^1.9.0","eslint-plugin-import":"^2.7.0","eslint-plugin-jsx-a11y":"^6.0.2","eslint-plugin-react":"^7.4.0","webpack":"^3.6.0","webpack-dev-server":"^2.9.1"}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperties(Array.prototype, {
  compact: {
    get: function get() {
      return this.filter(function (x) {
        return x;
      });
    }
  },
  first: {
    get: function get() {
      return this[0];
    }
  },
  last: {
    get: function get() {
      return this[this.length - 1];
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


String.prototype.assign = function assign(options) {
  return this.replace(/::.*::/, function (replace) {
    return options[replace.slice(2, -2)] || "";
  });
};

String.prototype.words = function words() {
  return this.replace(/(?!^)([A-Z])/g, "_$1").lowercase.split(/[\W_-]/).compact;
};

String.prototype.date = function date() {
  return new Date(this).toLocaleDateString();
};

String.prototype.transform = function transform(method) {
  var string = this.replace(/![._-]([A-Z])/, "_$1").lowercase;
  string = string.splitAndJoin("-", method);
  string = string.splitAndJoin("_", method);
  string = string.splitAndJoin(".", method);
  return string;
};

String.prototype.splitAnd = function splitAnd(separator, method) {
  return this.split(separator).map(function (word) {
    return method(word);
  });
};

String.prototype.splitAndJoin = function splitAndJoin(separator, method) {
  return this.splitAnd(separator, method).join(separator);
};

// TODO: Check for npm packages with similar methods
Object.defineProperties(String.prototype, {
  camelize: {
    get: function get() {
      return this.transform(function (word) {
        return word[0].toLowerCase() + word.slice(1);
      });
    }
  },
  capitalize: {
    get: function get() {
      return this.transform(function (word) {
        return word[0].toUpperCase() + word.slice(1);
      });
    }
  },
  dasherize: {
    get: function get() {
      return this.words().join("-");
    }
  },
  lowercase: {
    get: function get() {
      return this.toLowerCase();
    }
  },
  pluralize: {
    get: function get() {
      return this + "s";
    }
  }, // TODO: Replace with pluralize npm package
  titleize: {
    get: function get() {
      return this.words().map(function (word) {
        return word !== "id" && word.capitalize;
      }).compact.join(" ");
    }
  },
  underscore: {
    get: function get() {
      return this.words().join("_");
    }
  },
  uppercase: {
    get: function get() {
      return this.toUpperCase();
    }
  }
});

/***/ })
/******/ ]);