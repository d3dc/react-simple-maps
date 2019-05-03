import React from "react"

import MapGroup from "./MapGroup"

function Markers({ groupName, itemName, componentIdentifier, ...restProps }) {
  return <MapGroup groupName={groupName} itemName={itemName} {...restProps} />
}

Markers.defaultProps = {
  componentIdentifier: "Markers",
  groupName: "markers",
  itemName: "marker"
}

export default Markers
