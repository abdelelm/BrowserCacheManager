(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/storageManager.js":
/*!*******************************************!*\
  !*** ./lib/storageManager.js + 1 modules ***!
  \*******************************************/
/*! exports provided: StorageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./lib/storageWrappers.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cacheStorageAsyncWrap =
/*#__PURE__*/
function () {
  function cacheStorageAsyncWrap(options) {
    _classCallCheck(this, cacheStorageAsyncWrap);

    this.type = options.type || "text";
    this.options = options;
    this.length = 0;
    this.name = options.cacheName || "BrowserCacheManager";
    if (!caches) throw new Error("Cache not available");
  }

  _createClass(cacheStorageAsyncWrap, [{
    key: "init",
    value: function init() {
      var _this = this;

      caches.open(this.name).then(function (cache) {
        _this.cache = cache;
      });
    }
  }, {
    key: "clearThisCache",
    value: function clearThisCache() {
      if (!this.cache) return Promise.resolve();
      return this.clear(this.name);
    }
  }, {
    key: "getItemName",
    value: function getItemName(name) {
      if (typeof name !== "string") return name;
      return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this2 = this;

      if (!this.cache) return Promise.resolve([]);
      return this.cache.keys().then(function (keylist) {
        var promises = keylist.map(function (key) {
          return _this2.getItem(key).then(function (val) {
            return {
              key: key.url,
              value: val
            };
          });
        });
        return Promise.all(promises).then(function (result) {
          var final = {};
          result.forEach(function (node) {
            if (node.key) final[node.key] = node.value;
          });
          return final;
        });
      });
    }
  }, {
    key: "clear",
    value: function clear(name) {
      var _this3 = this;

      return caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
          if (!name || cacheName === name) return caches.delete(cacheName);else return Promise.resolve();
        })).then(function (x) {
          _this3.init();

          return x;
        });
      });
    }
  }, {
    key: "getItem",
    value: function getItem(name) {
      if (!this.cache) return Promise.resolve();
      return this.cache.match(this.getItemName(name));
    }
  }, {
    key: "key",
    value: function key(k) {
      if (!this.cache) return Promise.resolve();
      return this.cache.keys().then(function (reqs) {
        return reqs[k];
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      if (!this.cache) return Promise.resolve();
      return this.cache.delete(this.getItemName(name));
    }
  }, {
    key: "setItem",
    value: function setItem(name, value) {
      if (!this.cache) return Promise.resolve();
      return this.cache.put(this.getItemName(name), new Response(value));
    }
  }]);

  return cacheStorageAsyncWrap;
}();
var localStorageAsyncWrap =
/*#__PURE__*/
function () {
  function localStorageAsyncWrap(options) {
    _classCallCheck(this, localStorageAsyncWrap);

    this.storage = localStorage;
    this.options = options;
    if (!this.storage) throw new Error("SessionStorage not available");
  }

  _createClass(localStorageAsyncWrap, [{
    key: "init",
    value: function init() {}
  }, {
    key: "getItemName",
    value: function getItemName(name) {
      return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this4 = this;

      return new Promise(function (res) {
        return res(Object.assign({}, _this4.storage));
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this5 = this;

      return new Promise(function (res) {
        res(_this5.storage.clear());
      });
    }
  }, {
    key: "getItem",
    value: function getItem(name) {
      var _this6 = this;

      return new Promise(function (res) {
        res(_this6.storage.getItem(_this6.getItemName(name)));
      });
    }
  }, {
    key: "key",
    value: function key(k) {
      var _this7 = this;

      return new Promise(function (res) {
        res(_this7.storage.key(k));
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      var _this8 = this;

      return new Promise(function (res) {
        res(_this8.storage.removeItem(_this8.getItemName(name)));
      });
    }
  }, {
    key: "setItem",
    value: function setItem(name, value) {
      var _this9 = this;

      return new Promise(function (res) {
        res(_this9.storage.setItem(_this9.getItemName(name), value));
      });
    }
  }, {
    key: "length",
    get: function get() {
      return this.storage.length;
    }
  }]);

  return localStorageAsyncWrap;
}();
var sessionStorageAsyncWrap =
/*#__PURE__*/
function () {
  function sessionStorageAsyncWrap(options) {
    _classCallCheck(this, sessionStorageAsyncWrap);

    this.storage = sessionStorage;
    this.options = options;
    if (!this.storage) throw new Error("SessionStorage not available");
  }

  _createClass(sessionStorageAsyncWrap, [{
    key: "init",
    value: function init() {}
  }, {
    key: "getItemName",
    value: function getItemName(name) {
      return (this.options.prefix || "") + name + (this.options.postfix || "");
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this10 = this;

      return new Promise(function (res) {
        return res(Object.assign({}, _this10.storage));
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this11 = this;

      return new Promise(function (res) {
        res(_this11.storage.clear());
      });
    }
  }, {
    key: "getItem",
    value: function getItem(name) {
      var _this12 = this;

      return new Promise(function (res) {
        res(_this12.storage.getItem(_this12.getItemName(name)));
      });
    }
  }, {
    key: "key",
    value: function key(k) {
      var _this13 = this;

      return new Promise(function (res) {
        res(_this13.storage.key(k));
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      var _this14 = this;

      return new Promise(function (res) {
        res(_this14.storage.removeItem(_this14.getItemName(name)));
      });
    }
  }, {
    key: "setItem",
    value: function setItem(name, value) {
      var _this15 = this;

      return new Promise(function (res) {
        res(_this15.storage.setItem(_this15.getItemName(name), value));
      });
    }
  }, {
    key: "length",
    get: function get() {
      var _this16 = this;

      return new Promise(function (res) {
        return res(_this16.storage.length);
      });
    }
  }]);

  return sessionStorageAsyncWrap;
}();
// CONCATENATED MODULE: ./lib/storageManager.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageManager", function() { return storageManager_StorageManager; });
function storageManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function storageManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function storageManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) storageManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) storageManager_defineProperties(Constructor, staticProps); return Constructor; }


var implementedStorages = ["session", "local", "cache"];

var multipleStorageResponse = function multipleStorageResponse(result) {
  var final = {};
  implementedStorages.forEach(function (st, i) {
    final[st] = result[i];
  });
  return final;
};

var storageManager_StorageManager =
/*#__PURE__*/
function () {
  storageManager_createClass(StorageManager, [{
    key: "warn",
    value: function warn() {
      try {
        for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
          msg[_key] = arguments[_key];
        }

        console.warn.apply(console, msg);
      } catch (e) {}
    }
  }, {
    key: "setSupportedStorage",
    value: function setSupportedStorage(options) {
      this.supportedStorage = {};

      try {
        this.supportedStorage.local = new localStorageAsyncWrap(options);
        this.supportedStorage.local.init();
      } catch (e) {}

      try {
        this.supportedStorage.session = new sessionStorageAsyncWrap(options);
        this.supportedStorage.session.init();
      } catch (e) {}

      try {
        this.supportedStorage.cache = new cacheStorageAsyncWrap(options);
        this.supportedStorage.cache.init();
      } catch (e) {}

      return this.supportedStorage;
    }
  }]);

  function StorageManager(options) {
    var _this = this;

    storageManager_classCallCheck(this, StorageManager);

    if (!options) options = ["cache", "session", "local"];
    if (typeof options === "string" || Array.isArray(options)) options = {
      type: options
    };
    if (typeof options.type === "string") options.type = [options.type];
    if (!Array.isArray(options.type)) throw Error("Invalid options.type value ( array or string )");
    this.options = options;
    this.setSupportedStorage(options);
    this.options.type = this.options.type.map(function (type) {
      return _this.supportedStorage[type];
    }).filter(function (storage) {
      return !!storage;
    });
    if (this.options.type.length == 0) this.warn("No supported storage for this browser");
    this.storage = this.options.type[0];

    var _loop = function _loop() {
      var st = _this.supportedStorage[i];

      _this[i + "Storage"] = function () {
        var clone = Object.assign(Object.create(Object.getPrototypeOf(_this)), _this, {
          storage: st
        });
        return clone;
      };
    };

    for (var i in this.supportedStorage) {
      _loop();
    }
  }

  storageManager_createClass(StorageManager, [{
    key: "parseResponse",
    value: function parseResponse(resp, type) {
      return new Promise(function (res) {
        if (!resp) return res(resp);
        var parsedResp;

        try {
          switch (!type || !type.toLowerCase ? "default" : type.toLowerCase()) {
            case "json":
              parsedResp = typeof resp.json === "function" ? resp.json.bind(resp) : Promise.resolve(JSON.parse(resp));
              break;

            case "raw":
              parsedResp = Promise.resolve(resp);
              break;

            case "blob":
              parsedResp = typeof resp.blob === "function" ? resp.blob.bind(resp) : Promise.resolve(new Blob(resp));
              break;

            case "formData":
              parsedResp = typeof resp.formData === "function" ? resp.formData.bind(resp) : Promise.resolve(new FormData(resp));
              break;

            default:
              parsedResp = typeof resp.text === "function" ? resp.text.bind(resp) : Promise.resolve(resp);
              break;
          }
        } catch (e) {
          console.error(e);
          parsedResp = Promise.resolve(resp);
        }

        if (typeof parsedResp === "function") parsedResp().then(res).catch(function (x) {
          return res(x);
        });else parsedResp.then(res).catch(function () {
          return res(resp);
        });
      });
    }
  }, {
    key: "getItem",
    value: function getItem(name, type) {
      var _this2 = this;

      if (!this.storage) return Promise.resolve(null);
      return this.storage.getItem(name).then(function (resp) {
        return _this2.parseResponse(resp, type || _this2.options.responseType);
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(name) {
      if (!this.storage) return Promise.resolve(false);
      return this.storage.removeItem(name);
    }
  }, {
    key: "setItem",
    value: function setItem(name, value) {
      if (!this.storage) return Promise.resolve(false);
      return this.storage.setItem(name, value);
    }
  }, {
    key: "key",
    value: function key(k) {
      if (!this.storage) return Promise.resolve();
      return this.storage.key(k);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.storage) return Promise.resolve();
      return this.storage.clear();
    }
  }, {
    key: "getItems",
    value: function getItems(type) {
      var _this3 = this;

      if (!this.storage) return Promise.resolve({});
      return this.storage.getItems().then(function (resp) {
        if (!resp) return Promise.resolve({});
        var promises = Object.keys(resp).map(function (k) {
          return _this3.parseResponse(resp[k], type || _this3.options.responseType);
        });
        return Promise.all(promises).then(function (parsedRes) {
          Object.keys(resp).forEach(function (pr, i) {
            resp[pr] = parsedRes[i];
          });
          return resp;
        });
      });
    }
  }, {
    key: "length",
    value: function length() {
      return this.storage.length;
    }
  }, {
    key: "allStorages",
    value: function allStorages() {
      var _this4 = this;

      return {
        clear: function clear() {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].clear();else return Promise.resolve(null);
          });
          return Promise.all(promises).then(multipleStorageResponse);
        },
        getItem: function getItem(n, type) {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].getItem(n).then(function (resp) {
              return _this4.parseResponse(resp, type || _this4.options.responseType);
            });else return Promise.resolve(null);
          });
          return Promise.all(promises).then(multipleStorageResponse);
        },
        getItems: function getItems(type) {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].getItems().then(function (resp) {
              if (!resp) return Promise.resolve({});
              var promises = Object.keys(resp).map(function (k) {
                return _this4.parseResponse(resp[k], type || _this4.options.responseType);
              });
              return Promise.all(promises).then(function (parsedRes) {
                Object.keys(resp).forEach(function (pr, i) {
                  resp[pr] = parsedRes[i];
                });
                return resp;
              });
            });else return Promise.resolve({});
          });
          return Promise.all(promises).then(multipleStorageResponse);
        },
        removeItem: function removeItem(n) {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].removeItem(n);else return Promise.resolve(null);
          });
          return Promise.all(promises).then(multipleStorageResponse);
        },
        setItem: function setItem(n, v) {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].setItem(n, v);else return Promise.resolve(null);
          });
          return Promise.all(promises).then(multipleStorageResponse);
        },
        key: function key(k) {
          var promises = implementedStorages.map(function (x) {
            if (_this4.supportedStorage[x]) return _this4.supportedStorage[x].key(k);else return Promise.resolve(null);
          });
          return Promise.all(promises).then(function (result) {
            var final = {};
            implementedStorages.forEach(function (st, i) {
              final[st] = result[i];
            });
            return final;
          });
        }
      };
    }
  }]);

  return StorageManager;
}();

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./lib/storageManager.js ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\aelmansouri\Desktop\project\NPM_PACKAGE\Browser\BrowserCacheManager/lib/storageManager.js */"./lib/storageManager.js");


/***/ })

/******/ });
});