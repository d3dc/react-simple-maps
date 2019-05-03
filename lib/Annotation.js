"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _d3Geo = require("d3-geo");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Annotation(props) {
  var context = (0, _react.useContext)(_utils.MapContext);
  var zoom = context.zoom,
      projection = context.projection,
      width = context.width,
      height = context.height;
  var subject = props.subject,
      style = props.style,
      hiddenStyle = props.hiddenStyle,
      dx = props.dx,
      dy = props.dy,
      stroke = props.stroke,
      strokeWidth = props.strokeWidth,
      curve = props.curve,
      markerEnd = props.markerEnd,
      children = props.children;
  var connectorPath = (0, _utils.createConnectorPath)(null, [-dx / zoom, -dy / zoom], curve);
  var translation = projection(subject);
  var lineString = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [projection.invert([width / 2, height / 2]), subject]
    }
  };
  var radians = Math.PI / 2,
      degrees = 90;
  var isGlobe = projection.clipAngle && projection.clipAngle() === degrees;
  var isHidden = isGlobe && (0, _d3Geo.geoLength)(lineString) > radians;
  return _react["default"].createElement("g", {
    className: "rsm-annotation",
    style: isHidden ? _objectSpread({}, style, hiddenStyle) : style,
    transform: "translate(\n          ".concat(translation[0] + dx / zoom, "\n          ").concat(translation[1] + dy / zoom, "\n        )"),
    textAnchor: (0, _utils.createTextAnchor)(dx)
  }, children, _react["default"].createElement("path", {
    d: connectorPath,
    stroke: stroke,
    strokeWidth: strokeWidth,
    fill: "none",
    markerEnd: markerEnd
  }));
}

Annotation.defaultProps = {
  curve: 0,
  markerEnd: "none",
  componentIdentifier: "Annotation",
  stroke: "#000000",
  strokeWidth: 1,
  zoom: 1
};
var _default = Annotation;
exports["default"] = _default;