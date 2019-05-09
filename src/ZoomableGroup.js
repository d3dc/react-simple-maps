import React, { Component, createRef } from "react"
import { geoPath } from "d3-geo"

import {
  MapContext,
  calculateResizeFactor,
  calculateMousePosition,
  computeBackdrop
} from "./utils"

class ZoomableGroup extends Component {
  constructor(props, context) {
    super(props, context)

    const { center, backdrop } = this.props
    const { width, height, zoom, projection } = this.context

    const transformedBackdrop = computeBackdrop(projection, backdrop)
    const mouseX = calculateMousePosition(
      "x",
      projection,
      zoom,
      1,
      center,
      width,
      height
    )
    const mouseY = calculateMousePosition(
      "y",
      projection,
      zoom,
      1,
      center,
      width,
      height
    )

    this.state = {
      mouseX,
      mouseY,
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
    }

    this.zoomableGroupNode = createRef()

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }
  handleMouseMove({ pageX, pageY }) {
    if (this.props.disablePanning) return
    if (!this.state.isPressed) return
    this.setState({
      mouseX: pageX - this.state.mouseXStart,
      mouseY: pageY - this.state.mouseYStart
    })
  }
  handleTouchMove({ touches }) {
    this.handleMouseMove(touches[0])
  }
  handleMouseUp() {
    if (this.props.disablePanning) return
    if (!this.state.isPressed) return
    this.setState({
      isPressed: false
    })
    if (!this.props.onMoveEnd) return
    const { mouseX, mouseY, resizeFactorX, resizeFactorY } = this.state
    const { zoom, width, height, projection } = this.context
    const { onMoveEnd } = this.props
    const x = width / 2 - (mouseX * resizeFactorX) / zoom
    const y = height / 2 - (mouseY * resizeFactorY) / zoom
    const newCenter = projection.invert([x, y])
    onMoveEnd(newCenter)
  }
  handleMouseDown({ pageX, pageY }) {
    if (this.props.disablePanning) return
    const { mouseX, mouseY, resizeFactorX, resizeFactorY } = this.state
    const { zoom, width, height, projection } = this.context
    const { onMoveStart } = this.props
    this.setState({
      isPressed: true,
      mouseXStart: pageX - mouseX,
      mouseYStart: pageY - mouseY
    })
    if (!onMoveStart) return
    const x = width / 2 - (mouseX * resizeFactorX) / zoom
    const y = height / 2 - (mouseY * resizeFactorY) / zoom
    const currentCenter = projection.invert([x, y])
    onMoveStart(currentCenter)
  }
  handleTouchStart({ touches }) {
    if (touches.length > 1) {
      this.handleMouseDown(touches[0])
    } else {
      this.handleMouseUp()
    }
  }
  preventTouchScroll(evt) {
    if (evt.touches.length > 1) {
      evt.preventDefault()
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const { mouseX, mouseY, resizeFactorX, resizeFactorY } = this.state
    const { projection, width, height } = this.context
    const { center, zoom } = this.props

    const zoomFactor = nextProps.zoom / zoom
    const centerChanged =
      JSON.stringify(nextProps.center) !== JSON.stringify(center)

    this.setState({
      zoom: nextProps.zoom,
      mouseX: centerChanged
        ? calculateMousePosition(
            "x",
            nextContext.projection,
            nextProps.zoom,
            resizeFactorX,
            center,
            width,
            height
          )
        : mouseX * zoomFactor,
      mouseY: centerChanged
        ? calculateMousePosition(
            "y",
            nextContext.projection,
            nextProps.zoom,
            resizeFactorY,
            center,
            width,
            height
          )
        : mouseY * zoomFactor
    })
  }
  handleResize() {
    const { width, height, projection, zoom } = this.context

    const resizeFactorX = calculateResizeFactor(
      this.zoomableGroupNode.current.parentNode.getBoundingClientRect().width,
      width
    )
    const resizeFactorY = calculateResizeFactor(
      this.zoomableGroupNode.current.parentNode.getBoundingClientRect().height,
      height
    )

    const xPercentageChange = (1 / resizeFactorX) * this.state.resizeFactorX
    const yPercentageChange = (1 / resizeFactorY) * this.state.resizeFactorY

    this.setState({
      resizeFactorX: resizeFactorX,
      resizeFactorY: resizeFactorY,
      mouseX: this.state.mouseX * xPercentageChange,
      mouseY: this.state.mouseY * yPercentageChange
    })
  }
  componentDidMount() {
    const { center } = this.props
    const { width, height, projection, zoom } = this.context

    const resizeFactorX = calculateResizeFactor(
      this.zoomableGroupNode.current.parentNode.getBoundingClientRect().width,
      width
    )
    const resizeFactorY = calculateResizeFactor(
      this.zoomableGroupNode.current.parentNode.getBoundingClientRect().height,
      height
    )

    this.setState({
      resizeFactorX: resizeFactorX,
      resizeFactorY: resizeFactorY,
      mouseX: calculateMousePosition(
        "x",
        projection,
        zoom,
        resizeFactorX,
        center,
        width,
        height
      ),
      mouseY: calculateMousePosition(
        "y",
        projection,
        zoom,
        resizeFactorY,
        center,
        width,
        height
      )
    })

    window.addEventListener("resize", this.handleResize)
    window.addEventListener("mouseup", this.handleMouseUp)
    this.zoomableGroupNode.current.addEventListener(
      "touchmove",
      this.preventTouchScroll
    )
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("mouseup", this.handleMouseUp)
    this.zoomableGroupNode.current.removeEventListener(
      "touchmove",
      this.preventTouchScroll
    )
  }
  render() {
    const { projection, width, height } = this.context
    const { zoom, center, style, children } = this.props

    const { mouseX, mouseY, resizeFactorX, resizeFactorY } = this.state

    return (
      <MapContext
        value={{
          ...this.context,
          center,
          zoom
        }}
      >
        <g
          className="rsm-zoomable-group"
          ref={this.zoomableGroupNode}
          transform={`
           translate(
             ${Math.round((width / 2 + resizeFactorX * mouseX) * 100) / 100}
             ${Math.round((height / 2 + resizeFactorY * mouseY) * 100) / 100}
           )
           scale(${zoom})
           translate(${-width / 2} ${-height / 2})
         `}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleMouseUp}
          style={style}
        >
          <rect
            x={this.state.backdrop.x}
            y={this.state.backdrop.y}
            width={this.state.backdrop.width}
            height={this.state.backdrop.height}
            fill="transparent"
            style={{ strokeWidth: 0 }}
          />
          {children}
        </g>
      </MapContext>
    )
  }
}

ZoomableGroup.contextType = MapContext

ZoomableGroup.defaultProps = {
  center: [0, 0],
  backdrop: {
    x: [-179.9, 179.9],
    y: [89.9, -89.9]
  },
  zoom: 1,
  disablePanning: false
}

export default ZoomableGroup
