import React from "react"

import MapGroup from "./MapGroup"

function Lines({ groupName, itemName, componentIdentifier, ...restProps }) {
  return <MapGroup groupName={groupName} itemName={itemName} {...restProps} />
}

Lines.defaultProps = {
  componentIdentifier: "Lines",
  groupName: "lines",
  itemName: "line"
}

export default Lines
