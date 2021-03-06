"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Modifier = exports.Operation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fnOrVal = require("./fnOrVal");

var _objectPath = require("./object-path");

var _enumeration = require("./enumeration");

var _matcher = require("./matcher");

var Operation = (0, _enumeration.createEnum)(['REPLACEMENT', 'Replace the value rather than modify'], ['ADDITION', 'Add the value of the modifier to the target'], ['MULTIPLICATION', 'Multiply the value of the modifier to the target']);
exports.Operation = Operation;

var Modifier =
/*#__PURE__*/
function () {
  function Modifier(desc, amount, matcher, objectPath) {
    var operation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Operation.ADDITION;
    (0, _classCallCheck2["default"])(this, Modifier);

    if (arguments.length === 1 && arguments[0] instanceof Object) {
      Object.assign(this, arguments[0]);

      if (!this.operation) {
        this.operation = Operation.ADDITION;
      }
    } else {
      this.desc = desc;
      this.amount = amount;
      this.matcher = matcher;
      this.objectPath = objectPath;
      this.operation = operation;
    }
  }

  (0, _createClass2["default"])(Modifier, [{
    key: "applyTo",
    value: function applyTo(object) {
      var _this = this;

      switch (this.operation) {
        case Operation.REPLACEMENT:
          if (this.matcher) {
            new _matcher.Matcher(this.matcher).entriesOf(object).forEach(function (obj) {
              if (_this.objectPath) {
                new _objectPath.ObjectPath(_this.objectPath, obj[1]).set(_this.amount);
              } else {
                obj = _this.amount;
              }
            });
          }

          break;

        default:
        case Operation.ADDITION:
          if (this.matcher) {
            new _matcher.Matcher(this.matcher).entriesOf(object).forEach(function (obj) {
              if (_this.objectPath) {
                new _objectPath.ObjectPath(_this.objectPath, obj[1]).add(_this.amount);
              } else {
                obj += _this.amount;
              }
            });
          }

          break;

        case Operation.MULTIPLICATION:
          if (this.matcher) {
            new _matcher.Matcher(this.matcher).entriesOf(object).forEach(function (obj) {
              if (_this.objectPath) {
                new _objectPath.ObjectPath(_this.objectPath, obj[1]).multiply(_this.amount);
              } else {
                obj *= _this.amount;
              }
            });
          }

          break;
      }
    }
  }]);
  return Modifier;
}();

exports.Modifier = Modifier;
var _default = Modifier;
exports["default"] = _default;