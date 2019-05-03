import { createContext, useContext } from "react"

export const MapContext = createContext({
  width: 800,
  height: 450,
  zoom: 1,
  groupName: "",
  itemName: "item",
  projection: null
})

export const useMap = () => useContext(MapContext)

export function calculateResizeFactor(actualDimension, baseDimension) {
  if (actualDimension === 0) return 1
  return (1 / 100) * ((100 / actualDimension) * baseDimension)
}

export function calculateMousePosition(
  direction,
  projection,
  zoom,
  resizeFactor,
  center,
  width,
  height
) {
  const reference = { x: 0, y: 1 }
  const canRotate = !!projection.rotate
  const reverseRotation = !!canRotate
    ? projection.rotate().map(item => -item)
    : false
  const point = !!reverseRotation
    ? projection.rotate(reverseRotation)([-center[0], -center[1]])
    : projection([center[0], center[1]])
  const returner = point
    ? (point[reference[direction]] -
        (reference[direction] === 0 ? width : height) / 2) *
      zoom *
      (1 / resizeFactor)
    : 0
  if (canRotate)
    projection.rotate([
      -reverseRotation[0],
      -reverseRotation[1],
      -reverseRotation[2]
    ])
  return !!reverseRotation ? returner : -returner
}

export function isChildOfType(child, expectedTypes) {
  return expectedTypes.indexOf(child.props.componentIdentifier) !== -1
}

export function roundPath(path, precision) {
  if (!path) return
  const query = /[\d\.-][\d\.e-]*/g
  return path.replace(
    query,
    n => Math.round(n * (1 / precision)) / (1 / precision)
  )
}

export function createConnectorPath(connectorType, endPoint, curve) {
  const e0 = endPoint[0]
  const e1 = endPoint[1]
  return `M0,0 Q ${((curve + 1) / 2) * e0},${e1 -
    ((curve + 1) / 2) * e1} ${e0},${e1}`
}

export function createTextAnchor(dx) {
  if (dx > 0) return "start"
  else if (dx < 0) return "end"
  else return "middle"
}

export function computeBackdrop(projection, backdrop) {
  const canRotate = projection.rotate
  const originalRotation = canRotate ? projection.rotate() : null

  const tl = canRotate
    ? projection.rotate([0, 0, 0])([backdrop.x[0], backdrop.y[0]])
    : projection([backdrop.x[0], backdrop.y[0]])

  const br = canRotate
    ? projection.rotate([0, 0, 0])([backdrop.x[1], backdrop.y[1]])
    : projection([backdrop.x[1], backdrop.y[1]])

  const x = tl ? tl[0] : 0
  const x0 = br ? br[0] : 0

  const y = tl ? tl[1] : 0
  const y0 = br ? br[1] : 0

  const width = x0 - x
  const height = y0 - y

  if (originalRotation) projection.rotate(originalRotation)

  return { x, y, width, height }
}
