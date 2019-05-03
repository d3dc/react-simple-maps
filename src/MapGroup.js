import React, { useContext } from "react"

import { MapContext } from "./utils"

function MapGroup({ style, groupName, itemName, children }) {
  const context = useContext(MapContext)
  return (
    <MapContext.Provider
      value={{
        ...context,
        groupName,
        itemName
      }}
    >
      <g className={`rsm-${groupName}`} style={style}>
        {children}
      </g>
    </MapContext.Provider>
  )
}

MapGroup.defaultProps = {
  componentIdentifier: "Group",
  groupName: "group",
  itemName: "group-item"
}

export default MapGroup
