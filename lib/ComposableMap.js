"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _projections = _interopRequireDefault(require("./projections"));

var _projectionConfig = _interopRequireDefault(require("./projectionConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ComposableMap =
/*#__PURE__*/
function (_Component) {
  _inherits(ComposableMap, _Component);

  function ComposableMap() {
    _classCallCheck(this, ComposableMap);

    return _possibleConstructorReturn(this, _getPrototypeOf(ComposableMap).apply(this, arguments));
  }

  _createClass(ComposableMap, [{
    key: "buildProjection",
    value: function buildProjection() {
      var _this$props = this.props,
          projection = _this$props.projection,
          projectionConfig = _this$props.projectionConfig,
          width = _this$props.width,
          height = _this$props.height;
      return typeof projection !== "function" ? (0, _projections["default"])(width, height, projectionConfig, projection) : projection(width, height, projectionConfig);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          className = _this$props2.className,
          showCenter = _this$props2.showCenter,
          children = _this$props2.children,
          aspectRatio = _this$props2.aspectRatio,
          viewBox = _this$props2.viewBox,
          defs = _this$props2.defs;
      var projection = this.buildProjection();
      return _react["default"].createElement(_utils.MapContext.Provider, {
        value: {
          width: width,
          height: height,
          projection: projection
        }
      }, _react["default"].createElement("svg", {
        width: width,
        height: height,
        viewBox: viewBox ? viewBox : "0 0 ".concat(width, " ").concat(height),
        className: "rsm-svg ".concat(className || ""),
        style: style,
        preserveAspectRatio: aspectRatio
      }, defs && _react["default"].createElement("defs", null, defs), children, showCenter && _react["default"].createElement("g", null, _react["default"].createElement("rect", {
        x: width / 2 - 0.5,
        y: 0,
        width: 1,
        height: height,
        fill: "#e91e63"
      }), _react["default"].createElement("rect", {
        x: 0,
        y: height / 2 - 0.5,
        width: width,
        height: 1,
        fill: "#e91e63"
      }))));
    }
  }]);

  return ComposableMap;
}(_react.Component);

ComposableMap.defaultProps = {
  projection: "times",
  projectionConfig: _projectionConfig["default"],
  aspectRatio: "xMidYMid",
  viewBox: null
};
var _default = ComposableMap;
exports["default"] = _default;