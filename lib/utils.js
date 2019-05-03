"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateResizeFactor = calculateResizeFactor;
exports.calculateMousePosition = calculateMousePosition;
exports.isChildOfType = isChildOfType;
exports.roundPath = roundPath;
exports.createConnectorPath = createConnectorPath;
exports.createTextAnchor = createTextAnchor;
exports.computeBackdrop = computeBackdrop;
exports.MapContext = void 0;

var _react = require("react");

var MapContext = (0, _react.createContext)({
  width: 800,
  height: 450,
  zoom: 1,
  groupName: "",
  itemName: "item",
  projection: null
});
exports.MapContext = MapContext;

function calculateResizeFactor(actualDimension, baseDimension) {
  if (actualDimension === 0) return 1;
  return 1 / 100 * (100 / actualDimension * baseDimension);
}

function calculateMousePosition(direction, projection, zoom, resizeFactor, center, width, height) {
  var reference = {
    x: 0,
    y: 1
  };
  var canRotate = !!projection.rotate;
  var reverseRotation = !!canRotate ? projection.rotate().map(function (item) {
    return -item;
  }) : false;
  var point = !!reverseRotation ? projection.rotate(reverseRotation)([-center[0], -center[1]]) : projection([center[0], center[1]]);
  var returner = point ? (point[reference[direction]] - (reference[direction] === 0 ? width : height) / 2) * zoom * (1 / resizeFactor) : 0;
  if (canRotate) projection.rotate([-reverseRotation[0], -reverseRotation[1], -reverseRotation[2]]);
  return !!reverseRotation ? returner : -returner;
}

function isChildOfType(child, expectedTypes) {
  return expectedTypes.indexOf(child.props.componentIdentifier) !== -1;
}

function roundPath(path, precision) {
  if (!path) return;
  var query = /[\d\.-][\d\.e-]*/g;
  return path.replace(query, function (n) {
    return Math.round(n * (1 / precision)) / (1 / precision);
  });
}

function createConnectorPath(connectorType, endPoint, curve) {
  var e0 = endPoint[0];
  var e1 = endPoint[1];
  return "M0,0 Q ".concat((curve + 1) / 2 * e0, ",").concat(e1 - (curve + 1) / 2 * e1, " ").concat(e0, ",").concat(e1);
}

function createTextAnchor(dx) {
  if (dx > 0) return "start";else if (dx < 0) return "end";else return "middle";
}

function computeBackdrop(projection, backdrop) {
  var canRotate = projection.rotate;
  var originalRotation = canRotate ? projection.rotate() : null;
  var tl = canRotate ? projection.rotate([0, 0, 0])([backdrop.x[0], backdrop.y[0]]) : projection([backdrop.x[0], backdrop.y[0]]);
  var br = canRotate ? projection.rotate([0, 0, 0])([backdrop.x[1], backdrop.y[1]]) : projection([backdrop.x[1], backdrop.y[1]]);
  var x = tl ? tl[0] : 0;
  var x0 = br ? br[0] : 0;
  var y = tl ? tl[1] : 0;
  var y0 = br ? br[1] : 0;
  var width = x0 - x;
  var height = y0 - y;
  if (originalRotation) projection.rotate(originalRotation);
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}