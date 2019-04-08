"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMutableEnum = createMutableEnum;
exports.createEnum = createEnum;
exports["default"] = exports.DataNumber = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _util = _interopRequireDefault(require("util"));

/**
 * DataNumber is a wrapper/delegate that can be represented as a finite number
 * when used as a primitive but as a fully fledged data object when used in
 * a non-primitive context.
 *
 * This allows enum users to access the data without invoking the long form. An
 * example of how this might work is as follows. It also allows the enum value
 * to be used as its numeric index. It can even be used as an index to an array
 * ```
 * let E = createEnum(
 *   ['A', 'First letter', { val: 65 }],
 *   ['B', 'Second letter', { val: 66 }]
 * )
 *
 * console.log(E.A.val) // 65
 * console.log(E.data(E.A).val) // 65
 *
 * console.log(E.A) // 0
 * console.log(E.B) // 1
 *
 * let array = ['a', 'b', 'c']
 * let d = new DataNumber(1, {hot: true})
 *
 * console.log(array[d]) // 'b'
 * console.log(d.hot) // true
 * ```
 */
var DataNumber =
/*#__PURE__*/
function (_Number) {
  (0, _inherits2["default"])(DataNumber, _Number);

  function DataNumber(finiteValue) {
    var _this;

    var dataValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, DataNumber);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DataNumber).call(this, finiteValue));
    _this.finiteValue = finiteValue;
    _this[DataNumber.DATA] = dataValue;
    var s = (0, _assertThisInitialized2["default"])(_this);
    var o = {
      get data() {
        return s[DataNumber.DATA];
      }

    };
    return (0, _possibleConstructorReturn2["default"])(_this, new Proxy((0, _assertThisInitialized2["default"])(_this), {
      has: function has(target, key) {
        return key in o.data;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target) {
        var descriptor = Object.assign({}, Reflect.getOwnPropertyDescriptor(target[DataNumber.DATA]) || {});
        return Object.assign(descriptor, {
          enumerable: true,
          configurable: true
        });
      },
      ownKeys: function ownKeys(target) {
        return Reflect.ownKeys(target[DataNumber.DATA]);
      },
      set: function set(obj, prop, value) {
        o.data[prop] = value;
        return true;
      },
      get: function get(target, prop, receiver) {
        if (prop === Symbol.toPrimitive) {
          return function () {
            return finiteValue;
          };
        } else if (prop === Symbol.toStringTag) {
          return 'DataNumber';
        } else if (prop in o.data) {
          return o.data[prop];
        } else {
          return Reflect.get(target, prop, receiver);
        }
      }
    }));
  }

  (0, _createClass2["default"])(DataNumber, [{
    key: _util["default"].inspect.custom,
    value: function value(depth, options) {
      return this.finiteValue;
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.finiteValue;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return Number(this);
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return this.constructor.name;
    }
  }, {
    key: Symbol.toPrimitive,
    get: function get() {
      return this.finiteValue;
    }
  }, {
    key: Symbol.species,
    get: function get() {
      return Number;
    }
  }, {
    key: Symbol.iterator,
    get: function get() {
      return (
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          var key;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _regenerator["default"].keys(this[DataNumber.DATA]);

                case 1:
                  if ((_context.t1 = _context.t0()).done) {
                    _context.next = 7;
                    break;
                  }

                  key = _context.t1.value;
                  _context.next = 5;
                  return key;

                case 5:
                  _context.next = 1;
                  break;

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        })
      );
    }
  }], [{
    key: "DATA",
    get: function get() {
      return Symbol["for"]('DataNumber.data');
    }
  }]);
  return DataNumber;
}((0, _wrapNativeSuper2["default"])(Number));
/**
 * Creates an array with several notable properties. Given several strings,
 * the array will be indexed by both name and number. Some of the notable
 * properties added to the resulting array are as follows:
 *
 * Functions:
 * ```
 *   data() - supplied with the index or string, any associated data objects
 *            will be returned. 'data()' will only exist if there is no
 *            such key. A synonym key __data__ will also be set.
 *   desc() - supplied with the index or string, either a reflecting string
 *            key or supplied detailed description will be returned. `desc()`
 *            will only exist if there is no such key. A synonym key __desc__
 *            will also be set
 * ```
 *
 * In addition, the resulting enumeration object also has its
 * `Symbol.iterator` overloaded to return an array for each entry where the
 * first item of the array is the key, the second the description and the
 * final the data object. An empty object will always be present and even
 * if a custom description is not provided, the string key will be used as
 * such; this approach ensures values for each item.
 *
 * @param  {Array<mixed>} elements each element, assumed to be a String
 * denoting the named key for the enumeration entry. If the supplied value
 * is an array, the first will be the string key and the second will be
 * the data to be stored for such key. A numeric representation will be
 * applied for each key
 * @return {Array<mixed>} an object with both named and numeric keys that
 * help define some constants for use within your application. Data can
 * additionally be stored on the "enum" using Symbols for keys. The named
 * keys as parameters to `Symbol.for` will be used to store any supplied data
 */


exports.DataNumber = DataNumber;

function createMutableEnum() {
  var obj = [];

  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
    var element = _elements[_i];
    var elem = element;
    var data = {};
    var desc = element;
    var array = Array.from(element); // If the element is an array, fetch the important bits in the
    // specified order. 0. Name of constant 1. Description 2. Data

    if (typeof element !== 'string' && Array.isArray(array)) {
      elem = array[0];
      desc = array[1] || desc;
      data = array[2] || data;
    } // Make a doubly linked enum. So if you provide a enum value of
    // ITEM then ITEM would equal 0 and element 0 would be 'ITEM'


    obj[obj[elem] = new DataNumber(obj.length, data)] = elem; // Use symbols to store superfluous information such as description

    obj[Symbol["for"]("Description:".concat(elem))] = desc; // Use another symbol if a value for data is supplied

    if (data !== null) {
      obj[Symbol["for"](elem)] = data;
    }
  }
  /**
   * A helper function to store a given value to more than one key if that
   * key does not already exist. This serves primariy
   *
   * @param {Object} obj an object on which to store the keys and value
   * @param {Array<String>} keys if the object does not have the key, store
   * the supplied value
   * @param {mixed} val the value to store
   */


  function setOn(obj, keys, val) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (!obj.hasOwnProperty(key)) {
          obj[key] = val;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  /* In the case that there is an enum 'desc', '__desc__' is also defined */


  setOn(obj, ['desc', '__desc__'], function describe(keyOrVal) {
    var string = Symbol["for"]("Description:".concat(keyOrVal));
    var number = Symbol["for"]("Description:".concat(this[keyOrVal]));
    return this[string] || this[number];
  });
  /* In the case that there is an enum 'data', '__data__' is also defined */

  setOn(obj, ['data', '__data__'], function getData(keyOrVal) {
    var string = Symbol["for"](keyOrVal);
    var number = Symbol["for"](this[keyOrVal]);
    return this[string] || this[number];
  });
  /* In the case that there is an enum 'entry', '__entry__' is also defined */

  setOn(obj, ['entry', '__entry__'], function getEntry(keyOrVal) {
    var prop = Number(keyOrVal) == keyOrVal ? this[keyOrVal] : keyOrVal;

    var desc = this.__desc__(keyOrVal);

    var data = this.__data__(keyOrVal);

    return [prop, desc, data];
  });
  /*
  A custom iterator is defined that returns an array of all values for each
  entry in the enumeration. This allows an alternate way to easily get to the
  data for each entry as well.
  */

  obj[Symbol.iterator] =
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var i, key;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < this.length)) {
              _context2.next = 8;
              break;
            }

            key = this[i];
            _context2.next = 5;
            return [key, this[Symbol["for"]("Description:".concat(key))], this[Symbol["for"](key)]];

          case 5:
            i++;
            _context2.next = 1;
            break;

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  });
  obj[Symbol.toStringTag] = "Enum"; // Return the generated enum

  return obj;
}
/**
 * The default approach that is exported from this module takes the results
 * of `createMutableEnum()` and passes it through a call to `Object.freeze()`
 * before handing it back. It is otherwise identical to the mutable form of
 * its function.
 *
 * @param  {Array<mixed>} elements each element, assumed to be a String
 * denoting the named key for the enumeration entry. If the supplied value
 * is an array, the first will be the string key and the second will be
 * the data to be stored for such key. A numeric representation will be
 * applied for each key
 * @return {Array<mixed>} an object with both named and numeric keys that
 * help define some constants for use within your application. Data can
 * additionally be stored on the "enum" using Symbols for keys. The named
 * keys as parameters to `Symbol.for` will be used to store any supplied data
 */


function createEnum() {
  return Object.freeze(createMutableEnum.apply(void 0, arguments));
}

var _default = createEnum;
exports["default"] = _default;