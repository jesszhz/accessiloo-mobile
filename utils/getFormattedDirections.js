const formatLocation = (location) => {
  switch (location) {
    case "SINGLE_WASHROOM":
      location = "single stall accessible washroom";
      break;
    case "FEMALE_WASHROOM":
      location = "women's washroom";
      break;
    case "MALE_WASHROOM":
      location = "men's washroom";
      break;
    case "ACCESSIBLE_WASHROOM":
      location = "accessible washroom";
      break;
  }

  if (location.indexOf("Exit") > -1 || location.indexOf("washroom") > -1) {
    // appends an correct article in front of the location if needed
    return `the ${location}`;
  }
  return location;
};

const getMapNodeString = (mapNode) => {
  const mapNodeArr = mapNode.split(" ");

  if (mapNodeArr[mapNodeArr.length - 1] === "Exit") {
    return `${mapNodeArr[1]}-1`;
  }
  return `${mapNodeArr[0]}-${mapNodeArr[mapNodeArr.length - 1]}`;
};

export const getFormattedDirections = (apiData) => {
  if (!apiData || apiData.length === 0) {
    return [{ text: "No directions found" }];
  }

  if (Array.isArray(apiData)) {
    apiData = apiData[0];
  }

  const { nodes, edges } = apiData;

  const directions = [];
  let idx = 0;

  while (idx < edges.length) {
    const path = edges[idx];
    const startLocation = formatLocation(nodes[idx]);
    let endLocation = formatLocation(nodes[idx + 1]);

    switch (path) {
      case "ELEVATOR":
        // coalescing multi-floor elevator rides
        while (idx < edges.length && edges[idx + 1] == "ELEVATOR") {
          idx++;
          endLocation = nodes[idx + 1];
        }
        directions.push({
          text: `Take elevator from ${startLocation} to ${endLocation}`,
          icon: "ELEVATOR",
          mapNode: getMapNodeString(startLocation),
          startNode: startLocation,
          endNode: endLocation,
          id: directions.length + 1,
        });
        break;
      case "INDOOR":
        if (endLocation.includes("Tunnel")) {
          directions.push({
            text: `Walk to ${endLocation}`,
            icon: "INDOOR",
            mapNode: getMapNodeString(startLocation),
            startNode: startLocation,
            endNode: endLocation,
            id: directions.length + 1,
          });
        } else {
          directions.push({
            text: `Navigate to ${endLocation}`,
            icon: "INDOOR",
            mapNode: getMapNodeString(endLocation),
            startNode: startLocation,
            endNode: endLocation,
            id: directions.length + 1,
          });
        }
        break;
      case "OUTDOOR":
        directions.push({
          text: `Exit using ${startLocation} and navigate outdoors to ${endLocation}`,
          icon: "OUTDOOR",
          mapNode: null,
          startNode: startLocation,
          endNode: endLocation,
          id: directions.length + 1,
        });
        break;
      case "STAIR":
        // coalescing multi-floor stair trips
        while (idx < edges.length && edges[idx + 1] == "STAIR") {
          idx++;
          endLocation = nodes[idx + 1];
        }
        directions.push({
          text: `Take stairs from ${startLocation} to ${endLocation}`,
          icon: "STAIR",
          mapNode: getMapNodeString(startLocation),
          startNode: startLocation,
          endNode: endLocation,
          id: directions.length + 1,
        });
        break;
    }
    idx++;
  }
  return directions;
};
