import React from "react"

import MapGroup from "./MapGroup"

function Annotations({
  groupName,
  itemName,
  componentIdentifier,
  ...restProps
}) {
  return <MapGroup groupName={groupName} itemName={itemName} {...restProps} />
}

Annotations.defaultProps = {
  componentIdentifier: "Annotations",
  groupName: "annotations",
  itemName: "annotation"
}

export default Annotations
