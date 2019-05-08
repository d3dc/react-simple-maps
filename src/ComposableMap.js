import React, { Component } from "react"

import { MapContext } from "./utils"
import projections from "./projections"
import defaultProjectionConfig from "./projectionConfig"

class ComposableMap extends Component {
  buildProjection() {
    const { projection, projectionConfig, width, height } = this.props

    return typeof projection !== "function"
      ? projections(width, height, projectionConfig, projection)
      : projection(width, height, projectionConfig)
  }
  render() {
    const {
      width,
      height,
      style,
      className,
      showCenter,
      children,
      aspectRatio,
      viewBox,
      defs
    } = this.props

    const projection = this.buildProjection()

    return (
      <MapContext.Provider
        value={{
          width,
          height,
          projection
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={viewBox ? viewBox : `0 0 ${width} ${height}`}
          className={`rsm-svg ${className || ""}`}
          style={style}
          preserveAspectRatio={aspectRatio}
        >
          {defs && <defs>{defs}</defs>}
          {children}
          {showCenter && (
            <g>
              <rect
                x={width / 2 - 0.5}
                y={0}
                width={1}
                height={height}
                fill="#e91e63"
              />
              <rect
                x={0}
                y={height / 2 - 0.5}
                width={width}
                height={1}
                fill="#e91e63"
              />
            </g>
          )}
        </svg>
      </MapContext.Provider>
    )
  }
}

ComposableMap.defaultProps = {
  projection: "times",
  projectionConfig: defaultProjectionConfig,
  aspectRatio: "xMidYMid",
  viewBox: null
}

export default ComposableMap
