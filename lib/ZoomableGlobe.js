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

var ZoomableGlobe =
/*#__PURE__*/
function (_Component) {
  _inherits(ZoomableGlobe, _Component);

  function ZoomableGlobe(props, context) {
    var _this;

    _classCallCheck(this, ZoomableGlobe);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZoomableGlobe).call(this, props, context));
    var initialRotation = props.projection.rotate();
    _this.state = {
      mouseX: 0,
      mouseY: 0,
      mouseXStart: 0,
      mouseYStart: 0,
      isPressed: false,
      rotation: [initialRotation[0] - props.center[0], initialRotation[1] - props.center[1], initialRotation[2]]
    };
    _this.zoomableGlobeNode = (0, _react.createRef)();
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_this));
    _this.handleTouchMove = _this.handleTouchMove.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ZoomableGlobe, [{
    key: "handleMouseMove",
    value: function handleMouseMove(_ref) {
      var pageX = _ref.pageX,
          pageY = _ref.pageY,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      if (this.props.disablePanning) return;
      if (!this.state.isPressed) return;
      var differenceX = clientX - this.state.mouseXStart;
      var differenceY = clientY - this.state.mouseYStart;
      this.setState({
        mouseX: clientX,
        mouseY: clientY,
        mouseXStart: clientX,
        mouseYStart: clientY,
        rotation: [this.state.rotation[0] + differenceX * this.props.sensitivity, this.state.rotation[1] - differenceY * this.props.sensitivity, this.state.rotation[2]]
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
      var newCenter = this.props.projection.invert([this.props.width / 2, this.props.height / 2]);
      this.props.onMoveEnd(newCenter);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(_ref3) {
      var pageX = _ref3.pageX,
          pageY = _ref3.pageY,
          clientX = _ref3.clientX,
          clientY = _ref3.clientY;
      if (this.props.disablePanning) return;
      this.setState({
        isPressed: true,
        mouseXStart: clientX,
        mouseYStart: clientY
      });
      if (!this.props.onMoveStart) return;
      var currentCenter = this.props.projection.invert([this.props.width / 2, this.props.height / 2]);
      this.props.onMoveStart(currentCenter);
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
      var _this$state = this.state,
          mouseX = _this$state.mouseX,
          mouseY = _this$state.mouseY;
      var projection = this.context.projection;
      var _this$props = this.props,
          center = _this$props.center,
          zoom = _this$props.zoom;
      var zoomFactor = nextProps.zoom / zoom;
      var centerChanged = JSON.stringify(nextProps.center) !== JSON.stringify(center);
      this.setState({
        zoom: nextProps.zoom,
        rotation: centerChanged ? [-nextProps.center[0], -nextProps.center[1], this.state.rotation[2]] : this.state.rotation
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height,
          projection = _this$props2.projection,
          zoom = _this$props2.zoom;
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.zoomableGlobeNode.current.addEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.zoomableGlobeNode.current.removeEventListener("touchmove", this.preventTouchScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          center = _this$props3.center,
          zoom = _this$props3.zoom,
          style = _this$props3.style,
          children = _this$props3.children;
      var _this$context = this.context,
          projection = _this$context.projection,
          width = _this$context.width,
          height = _this$context.height;
      var _this$state2 = this.state,
          rotation = _this$state2.rotation,
          mouseX = _this$state2.mouseX,
          mouseY = _this$state2.mouseY;
      return _react["default"].createElement(_utils.MapContext, {
        value: _objectSpread({}, this.context, {
          projection: projection.rotate(rotation),
          center: center,
          zoom: zoom
        })
      }, _react["default"].createElement("g", {
        className: "rsm-zoomable-globe",
        ref: this.zoomableGlobeNode,
        transform: "\n           translate(".concat(width / 2, " ").concat(height / 2, ")\n           scale(").concat(zoom, ")\n           translate(").concat(-width / 2, " ").concat(-height / 2, ")\n         "),
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleMouseUp,
        style: style
      }));
    }
  }]);

  return ZoomableGlobe;
}(_react.Component);

ZoomableGlobe.contextType = _utils.MapContext;
ZoomableGlobe.defaultProps = {
  center: [0, 0],
  zoom: 1,
  disablePanning: false,
  sensitivity: 0.25
};
var _default = ZoomableGlobe;
exports["default"] = _default;