var __BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now(),__DEV__=false,process=this.process||{},__METRO_GLOBAL_PREFIX__='';process.env=process.env||{};process.env.NODE_ENV=process.env.NODE_ENV||"production";
(function (global) {
  "use strict";

  global.__r = metroRequire;
  global[__METRO_GLOBAL_PREFIX__ + "__d"] = define;
  global.__c = clear;
  global.__registerSegment = registerSegment;
  var modules = clear();
  var EMPTY = {};
  var _ref = {},
      hasOwnProperty = _ref.hasOwnProperty;

  function clear() {
    modules = Object.create(null);
    return modules;
  }

  function define(factory, moduleId, dependencyMap) {
    if (modules[moduleId] != null) {
      return;
    }

    var mod = {
      dependencyMap: dependencyMap,
      factory: factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
    modules[moduleId] = mod;
  }

  function metroRequire(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    var module = modules[moduleIdReallyIsNumber];
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }

  function metroImportDefault(moduleId) {
    var moduleIdReallyIsNumber = moduleId;

    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedDefault !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedDefault;
    }

    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;
    return modules[moduleIdReallyIsNumber].importedDefault = importedDefault;
  }

  metroRequire.importDefault = metroImportDefault;

  function metroImportAll(moduleId) {
    var moduleIdReallyIsNumber = moduleId;

    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedAll !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedAll;
    }

    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedAll;

    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};

      if (exports) {
        for (var key in exports) {
          if (hasOwnProperty.call(exports, key)) {
            importedAll[key] = exports[key];
          }
        }
      }

      importedAll.default = exports;
    }

    return modules[moduleIdReallyIsNumber].importedAll = importedAll;
  }

  metroRequire.importAll = metroImportAll;
  var inGuard = false;

  function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      var returnValue;

      try {
        returnValue = loadModuleImplementation(moduleId, module);
      } catch (e) {
        global.ErrorUtils.reportFatalError(e);
      }

      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module);
    }
  }

  var ID_MASK_SHIFT = 16;
  var LOCAL_ID_MASK = 65535;

  function unpackModuleId(moduleId) {
    var segmentId = moduleId >>> ID_MASK_SHIFT;
    var localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId: segmentId,
      localId: localId
    };
  }

  metroRequire.unpackModuleId = unpackModuleId;

  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }

  metroRequire.packModuleId = packModuleId;
  var moduleDefinersBySegmentID = [];
  var definingSegmentByModuleID = new Map();

  function registerSegment(segmentId, moduleDefiner, moduleIds) {
    moduleDefinersBySegmentID[segmentId] = moduleDefiner;

    if (moduleIds) {
      moduleIds.forEach(function (moduleId) {
        if (!modules[moduleId] && !definingSegmentByModuleID.has(moduleId)) {
          definingSegmentByModuleID.set(moduleId, segmentId);
        }
      });
    }
  }

  function loadModuleImplementation(moduleId, module) {
    if (!module && moduleDefinersBySegmentID.length > 0) {
      var _definingSegmentByMod;

      var segmentId = (_definingSegmentByMod = definingSegmentByModuleID.get(moduleId)) !== null && _definingSegmentByMod !== undefined ? _definingSegmentByMod : 0;
      var definer = moduleDefinersBySegmentID[segmentId];

      if (definer != null) {
        definer(moduleId);
        module = modules[moduleId];
        definingSegmentByModuleID.delete(moduleId);
      }
    }

    var nativeRequire = global.nativeRequire;

    if (!module && nativeRequire) {
      var _unpackModuleId = unpackModuleId(moduleId),
          _segmentId = _unpackModuleId.segmentId,
          localId = _unpackModuleId.localId;

      nativeRequire(localId, _segmentId);
      module = modules[moduleId];
    }

    if (!module) {
      throw unknownModuleError(moduleId);
    }

    if (module.hasError) {
      throw moduleThrewError(moduleId, module.error);
    }

    module.isInitialized = true;
    var _module = module,
        factory = _module.factory,
        dependencyMap = _module.dependencyMap;

    try {
      var moduleObject = module.publicModule;
      moduleObject.id = moduleId;
      factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);
      {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      return moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {}
  }

  function unknownModuleError(id) {
    var message = 'Requiring unknown module "' + id + '".';
    return Error(message);
  }

  function moduleThrewError(id, error) {
    var displayName = id;
    return Error('Requiring module "' + displayName + '", which threw an exception: ' + error);
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  var inspect = function () {
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor
      };
      return formatValue(ctx, obj, opts.depth);
    }

    function stylizeNoColor(str, styleType) {
      return str;
    }

    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }

    function formatValue(ctx, value, recurseTimes) {
      ctx.formatValueCalls++;

      if (ctx.formatValueCalls > 200) {
        return "[TOO BIG formatValueCalls " + ctx.formatValueCalls + " exceeded limit of 200]";
      }

      var primitive = formatPrimitive(ctx, value);

      if (primitive) {
        return primitive;
      }

      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }

      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }

        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }

        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }

        if (isError(value)) {
          return formatError(value);
        }
      }

      var base = '',
          array = false,
          braces = ['{', '}'];

      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }

      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }

      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }

      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }

      if (isError(value)) {
        base = ' ' + formatError(value);
      }

      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }

      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }

      ctx.seen.push(value);
      var output;

      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }

      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }

    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, 'string');
      }

      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
      if (isNull(value)) return ctx.stylize('null', 'null');
    }

    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }

    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];

      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }

      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }

    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };

      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }

      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }

      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }

          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }

      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }

        name = JSON.stringify('' + key);

        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    }

    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function (prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);

      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }

      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    function isArray(ar) {
      return Array.isArray(ar);
    }

    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }

    function isNull(arg) {
      return arg === null;
    }

    function isNumber(arg) {
      return typeof arg === 'number';
    }

    function isString(arg) {
      return typeof arg === 'string';
    }

    function isUndefined(arg) {
      return arg === undefined;
    }

    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }

    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }

    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }

    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }

    function isFunction(arg) {
      return typeof arg === 'function';
    }

    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }

    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    return inspect;
  }();

  var OBJECT_COLUMN_NAME = '(index)';
  var LOG_LEVELS = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  var INSPECTOR_LEVELS = [];
  INSPECTOR_LEVELS[LOG_LEVELS.trace] = 'debug';
  INSPECTOR_LEVELS[LOG_LEVELS.info] = 'log';
  INSPECTOR_LEVELS[LOG_LEVELS.warn] = 'warning';
  INSPECTOR_LEVELS[LOG_LEVELS.error] = 'error';
  var INSPECTOR_FRAMES_TO_SKIP = 1;

  function getNativeLogFunction(level) {
    return function () {
      var str;

      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function (arg) {
          return inspect(arg, {
            depth: 10
          });
        }).join(', ');
      }

      var firstArg = arguments[0];
      var logLevel = level;

      if (typeof firstArg === 'string' && firstArg.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        logLevel = LOG_LEVELS.warn;
      }

      if (global.__inspectorLog) {
        global.__inspectorLog(INSPECTOR_LEVELS[logLevel], str, [].slice.call(arguments), INSPECTOR_FRAMES_TO_SKIP);
      }

      if (groupStack.length) {
        str = groupFormat('', str);
      }

      global.nativeLoggingHook(str, logLevel);
    };
  }

  function repeat(element, n) {
    return Array.apply(null, Array(n)).map(function () {
      return element;
    });
  }

  function consoleTablePolyfill(rows) {
    if (!Array.isArray(rows)) {
      var data = rows;
      rows = [];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var row = data[key];
          row[OBJECT_COLUMN_NAME] = key;
          rows.push(row);
        }
      }
    }

    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }

    var columns = Object.keys(rows[0]).sort();
    var stringRows = [];
    var columnWidths = [];
    columns.forEach(function (k, i) {
      columnWidths[i] = k.length;

      for (var j = 0; j < rows.length; j++) {
        var cellStr = (rows[j][k] || '?').toString();
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });

    function joinRow(row, space) {
      var cells = row.map(function (cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return cells.join(space + '|' + space);
    }

    var separators = columnWidths.map(function (columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators, '-');
    var header = joinRow(columns);
    var table = [header, separatorRow];

    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }

    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }

  var GROUP_PAD = "\u2502";
  var GROUP_OPEN = "\u2510";
  var GROUP_CLOSE = "\u2518";
  var groupStack = [];

  function groupFormat(prefix, msg) {
    return groupStack.join('') + prefix + ' ' + (msg || '');
  }

  function consoleGroupPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_OPEN, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }

  function consoleGroupCollapsedPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }

  function consoleGroupEndPolyfill() {
    groupStack.pop();
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE), LOG_LEVELS.info);
  }

  function consoleAssertPolyfill(expression, label) {
    if (!expression) {
      global.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
  }

  if (global.nativeLoggingHook) {
    var originalConsole = global.console;
    global.console = {
      error: getNativeLogFunction(LOG_LEVELS.error),
      info: getNativeLogFunction(LOG_LEVELS.info),
      log: getNativeLogFunction(LOG_LEVELS.info),
      warn: getNativeLogFunction(LOG_LEVELS.warn),
      trace: getNativeLogFunction(LOG_LEVELS.trace),
      debug: getNativeLogFunction(LOG_LEVELS.trace),
      table: consoleTablePolyfill,
      group: consoleGroupPolyfill,
      groupEnd: consoleGroupEndPolyfill,
      groupCollapsed: consoleGroupCollapsedPolyfill,
      assert: consoleAssertPolyfill
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  } else if (!global.console) {
    function stub() {}

    var log = global.print || stub;
    global.console = {
      debug: log,
      error: log,
      info: log,
      log: log,
      trace: log,
      warn: log,
      assert: function assert(expression, label) {
        if (!expression) {
          log('Assertion failed: ' + label);
        }
      },
      clear: stub,
      dir: stub,
      dirxml: stub,
      group: stub,
      groupCollapsed: stub,
      groupEnd: stub,
      profile: stub,
      profileEnd: stub,
      table: stub
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  var _inGuard = 0;

  var _globalHandler = function onError(e, isFatal) {
    throw e;
  };

  var ErrorUtils = {
    setGlobalHandler: function setGlobalHandler(fun) {
      _globalHandler = fun;
    },
    getGlobalHandler: function getGlobalHandler() {
      return _globalHandler;
    },
    reportError: function reportError(error) {
      _globalHandler && _globalHandler(error, false);
    },
    reportFatalError: function reportFatalError(error) {
      _globalHandler && _globalHandler(error, true);
    },
    applyWithGuard: function applyWithGuard(fun, context, args, unused_onError, unused_name) {
      try {
        _inGuard++;
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        _inGuard--;
      }

      return null;
    },
    applyWithGuardIfNeeded: function applyWithGuardIfNeeded(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }

      return null;
    },
    inGuard: function inGuard() {
      return !!_inGuard;
    },
    guard: function guard(fun, name, context) {
      var _ref;

      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }

      var guardName = (_ref = name != null ? name : fun.name) != null ? _ref : '<generated guard>';

      function guarded() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return ErrorUtils.applyWithGuard(fun, context != null ? context : this, args, null, guardName);
      }

      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  (function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    if (typeof Object.entries !== 'function') {
      Object.entries = function (object) {
        if (object == null) {
          throw new TypeError('Object.entries called on non-object');
        }

        var entries = [];

        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            entries.push([key, object[key]]);
          }
        }

        return entries;
      };
    }

    if (typeof Object.values !== 'function') {
      Object.values = function (object) {
        if (object == null) {
          throw new TypeError('Object.values called on non-object');
        }

        var values = [];

        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            values.push(object[key]);
          }
        }

        return values;
      };
    }
  })();
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  var _App = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));

  _reactNative.AppRegistry.registerComponent(_$$_REQUIRE(_dependencyMap[3]).name, function () {
    return _App.default;
  });
},"index.js",["node_modules/react-native/index.js","node_modules/@babel/runtime/helpers/interopRequireDefault.js","src/App.tsx","app.json"]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  var _Home = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));

  var _About = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));

  var _Test = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));

  var _Animation = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));

  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var Stack = (0, _$$_REQUIRE(_dependencyMap[7]).createStackNavigator)();

  var App = function App() {
    var isDarkMode = (0, _reactNative.useColorScheme)() === 'dark';
    (0, _react.useEffect)(function () {}, []);
    return _react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, _react.default.createElement(_reactNative.StatusBar, {
      hidden: false,
      barStyle: isDarkMode ? 'light-content' : 'dark-content',
      backgroundColor: "red"
    }), _react.default.createElement(_$$_REQUIRE(_dependencyMap[8]).NavigationContainer, null, _react.default.createElement(Stack.Navigator, {
      initialRouteName: "Home"
    }, _react.default.createElement(Stack.Screen, {
      name: "Home",
      component: _Home.default,
      options: {
        title: 'home test'
      }
    }), _react.default.createElement(Stack.Screen, {
      name: "About",
      component: _About.default
    }), _react.default.createElement(Stack.Screen, {
      name: "Test",
      component: _Test.default
    }), _react.default.createElement(Stack.Screen, {
      name: "Animation",
      component: _Animation.default
    }))));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {
      height: _reactNative.Dimensions.get('window').height
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400'
    },
    highlight: {
      fontWeight: '700'
    }
  });

  var _default = App;
  exports.default = _default;
},"src/App.tsx",["node_modules/react/index.js","node_modules/react-native/index.js","node_modules/@babel/runtime/helpers/interopRequireDefault.js","src/pages/Home.tsx","src/pages/About.tsx","src/pages/Test.tsx","src/pages/Animation.tsx","node_modules/@react-navigation/stack/src/index.tsx","node_modules/@react-navigation/native/src/index.tsx"]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var Home = function Home(_ref) {
    var navigation = _ref.navigation;
    (0, _react.useEffect)(function () {}, []);
    return _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_reactNative.Button, {
      title: "About Page",
      onPress: function onPress() {
        return navigation.navigate('About');
      }
    }), _react.default.createElement(_reactNative.Button, {
      title: "Test Page",
      onPress: function onPress() {
        return navigation.navigate('Test');
      }
    }), _react.default.createElement(_reactNative.Button, {
      title: "Animation Page",
      onPress: function onPress() {
        return navigation.navigate('Animation');
      }
    }));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    }
  });

  var _default = Home;
  exports.default = _default;
},"src/pages/Home.tsx",["node_modules/react/index.js","node_modules/react-native/index.js"]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var Home = function Home() {
    (0, _react.useEffect)(function () {}, []);
    return _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.Text, null, "About Page"));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {},
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400'
    },
    highlight: {
      fontWeight: '700'
    }
  });

  var _default = Home;
  exports.default = _default;
},"src/pages/About.tsx",["node_modules/react/index.js","node_modules/react-native/index.js"]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var Home = function Home() {
    (0, _react.useEffect)(function () {}, []);
    return _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.Text, null, "Test Page"));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {},
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400'
    },
    highlight: {
      fontWeight: '700'
    }
  });

  var _default = Home;
  exports.default = _default;
},"src/pages/Test.tsx",["node_modules/react/index.js","node_modules/react-native/index.js"]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

  function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  var Home = function Home() {
    (0, _react.useEffect)(function () {}, []);
    return _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_reactNative.Text, null, "Animation"));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    }
  });

  var _default = Home;
  exports.default = _default;
},"src/pages/Animation.tsx",["node_modules/react/index.js","node_modules/react-native/index.js"]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {
  "name": "ReactNativeApp",
  "displayName": "ReactNativeApp"
};
},"app.json",[]);
__r("node_modules/react-native/Libraries/Core/InitializeCore.js");
__r("index.js");
//# sourceMappingURL=index.ios.bundle.js.map