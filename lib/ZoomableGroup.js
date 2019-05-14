"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _d3Geo = require("d3-geo");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ZoomableGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(ZoomableGroup, _Component);

  function ZoomableGroup(props, context) {
    var _this;

    _classCallCheck(this, ZoomableGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZoomableGroup).call(this, props, context));
    var _this$props = _this.props,
        zoom = _this$props.zoom,
        center = _this$props.center,
        backdrop = _this$props.backdrop;
    var _this$context = _this.context,
        width = _this$context.width,
        height = _this$context.height,
        projection = _this$context.projection;
    var transformedBackdrop = (0, _utils.computeBackdrop)(projection, backdrop);
    var mouseX = (0, _utils.calculateMousePosition)("x", projection, zoom, 1, center, width, height);
    var mouseY = (0, _utils.calculateMousePosition)("y", projection, zoom, 1, center, width, height);
    _this.state = {
      mouseX: mouseX,
      mouseY: mouseY,
      mouseXStart: 0,
      mouseYStart: 0,
      isPressed: false,
      resizeFactorX: 1,
      resizeFactorY: 1,
      backdrop: {
        width: Math.round(transformedBackdrop.width),
        height: Math.round(transformedBackdrop.height),
        x: Math.round(transformedBackdrop.x),
        y: Math.round(transformedBackdrop.y)
      }
    };
    _this.zoomableGroupNode = (0, _react.createRef)();
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_this));
    _this.handleTouchMove = _this.handleTouchMove.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ZoomableGroup, [{
    key: "handleMouseMove",
    value: function handleMouseMove(_ref) {
      var pageX = _ref.pageX,
          pageY = _ref.pageY;
      if (this.props.disablePanning) return;
      if (!this.state.isPressed) return;
      this.setState({
        mouseX: pageX - this.state.mouseXStart,
        mouseY: pageY - this.state.mouseYStart
      });
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(_ref2) {
      var touches = _ref2.touches;
      this.handleMouseMove(touches[0]);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      if (this.props.disablePanning) return;
      if (!this.state.isPressed) return;
      this.setState({
        isPressed: false
      });
      if (!this.props.onMoveEnd) return;
      var _this$state = this.state,
          mouseX = _this$state.mouseX,
          mouseY = _this$state.mouseY,
          resizeFactorX = _this$state.resizeFactorX,
          resizeFactorY = _this$state.resizeFactorY;
      var _this$context2 = this.context,
          zoom = _this$context2.zoom,
          width = _this$context2.width,
          height = _this$context2.height,
          projection = _this$context2.projection;
      var onMoveEnd = this.props.onMoveEnd;
      var x = width / 2 - mouseX * resizeFactorX / zoom;
      var y = height / 2 - mouseY * resizeFactorY / zoom;
      var newCenter = projection.invert([x, y]);
      onMoveEnd(newCenter);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(_ref3) {
      var pageX = _ref3.pageX,
          pageY = _ref3.pageY;
      if (this.props.disablePanning) return;
      var _this$state2 = this.state,
          mouseX = _this$state2.mouseX,
          mouseY = _this$state2.mouseY,
          resizeFactorX = _this$state2.resizeFactorX,
          resizeFactorY = _this$state2.resizeFactorY;
      var _this$context3 = this.context,
          zoom = _this$context3.zoom,
          width = _this$context3.width,
          height = _this$context3.height,
          projection = _this$context3.projection;
      var onMoveStart = this.props.onMoveStart;
      this.setState({
        isPressed: true,
        mouseXStart: pageX - mouseX,
        mouseYStart: pageY - mouseY
      });
      if (!onMoveStart) return;
      var x = width / 2 - mouseX * resizeFactorX / zoom;
      var y = height / 2 - mouseY * resizeFactorY / zoom;
      var currentCenter = projection.invert([x, y]);
      onMoveStart(currentCenter);
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(_ref4) {
      var touches = _ref4.touches;

      if (touches.length > 1) {
        this.handleMouseDown(touches[0]);
      } else {
        this.handleMouseUp();
      }
    }
  }, {
    key: "preventTouchScroll",
    value: function preventTouchScroll(evt) {
      if (evt.touches.length > 1) {
        evt.preventDefault();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this$state3 = this.state,
          mouseX = _this$state3.mouseX,
          mouseY = _this$state3.mouseY,
          resizeFactorX = _this$state3.resizeFactorX,
          resizeFactorY = _this$state3.resizeFactorY;
      var _this$context4 = this.context,
          projection = _this$context4.projection,
          width = _this$context4.width,
          height = _this$context4.height;
      var _this$props2 = this.props,
          center = _this$props2.center,
          zoom = _this$props2.zoom;
      var zoomFactor = nextProps.zoom / zoom;
      var centerChanged = JSON.stringify(nextProps.center) !== JSON.stringify(center);
      this.setState({
        zoom: nextProps.zoom,
        mouseX: centerChanged ? (0, _utils.calculateMousePosition)("x", nextContext.projection, nextProps.zoom, resizeFactorX, center, width, height) : mouseX * zoomFactor,
        mouseY: centerChanged ? (0, _utils.calculateMousePosition)("y", nextContext.projection, nextProps.zoom, resizeFactorY, center, width, height) : mouseY * zoomFactor
      });
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      var _this$context5 = this.context,
          width = _this$context5.width,
          height = _this$context5.height,
          projection = _this$context5.projection,
          zoom = _this$context5.zoom;
      var resizeFactorX = (0, _utils.calculateResizeFactor)(this.zoomableGroupNode.current.parentNode.getBoundingClientRect().width, width);
      var resizeFactorY = (0, _utils.calculateResizeFactor)(this.zoomableGroupNode.current.parentNode.getBoundingClientRect().height, height);
      var xPercentageChange = 1 / resizeFactorX * this.state.resizeFactorX;
      var yPercentageChange = 1 / resizeFactorY * this.state.resizeFactorY;
      this.setState({
        resizeFactorX: resizeFactorX,
        resizeFactorY: resizeFactorY,
        mouseX: this.state.mouseX * xPercentageChange,
        mouseY: this.state.mouseY * yPercentageChange
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          zoom = _this$props3.zoom,
          center = _this$props3.center;
      var _this$context6 = this.context,
          width = _this$context6.width,
          height = _this$context6.height,
          projection = _this$context6.projection;
      var resizeFactorX = (0, _utils.calculateResizeFactor)(this.zoomableGroupNode.current.parentNode.getBoundingClientRect().width, width);
      var resizeFactorY = (0, _utils.calculateResizeFactor)(this.zoomableGroupNode.current.parentNode.getBoundingClientRect().height, height);
      this.setState({
        resizeFactorX: resizeFactorX,
        resizeFactorY: resizeFactorY,
        mouseX: (0, _utils.calculateMousePosition)("x", projection, zoom, resizeFactorX, center, width, height),
        mouseY: (0, _utils.calculateMousePosition)("y", projection, zoom, resizeFactorY, center, width, height)
      });
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.zoomableGroupNode.current.addEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.zoomableGroupNode.current.removeEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context7 = this.context,
          projection = _this$context7.projection,
          width = _this$context7.width,
          height = _this$context7.height;
      var _this$props4 = this.props,
          zoom = _this$props4.zoom,
          center = _this$props4.center,
          style = _this$props4.style,
          children = _this$props4.children;
      var _this$state4 = this.state,
          mouseX = _this$state4.mouseX,
          mouseY = _this$state4.mouseY,
          resizeFactorX = _this$state4.resizeFactorX,
          resizeFactorY = _this$state4.resizeFactorY;
      return _react["default"].createElement(_utils.MapContext.Provider, {
        value: _objectSpread({}, this.context, {
          center: center,
          zoom: zoom
        })
      }, _react["default"].createElement("g", {
        className: "rsm-zoomable-group",
        ref: this.zoomableGroupNode,
        transform: "\n           translate(\n             ".concat(Math.round((width / 2 + resizeFactorX * mouseX) * 100) / 100, "\n             ").concat(Math.round((height / 2 + resizeFactorY * mouseY) * 100) / 100, "\n           )\n           scale(").concat(zoom, ")\n           translate(").concat(-width / 2, " ").concat(-height / 2, ")\n         "),
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleMouseUp,
        style: style
      }, _react["default"].createElement("rect", {
        x: this.state.backdrop.x,
        y: this.state.backdrop.y,
        width: this.state.backdrop.width,
        height: this.state.backdrop.height,
        fill: "transparent",
        style: {
          strokeWidth: 0
        }
      }), children));
    }
  }]);

  return ZoomableGroup;
}(_react.Component);

ZoomableGroup.contextType = _utils.MapContext;
ZoomableGroup.defaultProps = {
  center: [0, 0],
  backdrop: {
    x: [-179.9, 179.9],
    y: [89.9, -89.9]
  },
  zoom: 1,
  disablePanning: false
};
var _default = ZoomableGroup;
exports["default"] = _default;