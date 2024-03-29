export const getFormattedDirections = (apiData) => {
  if (!apiData || apiData.length == 0) {
    return [{ text: "No directions found" }];
  }

  const { nodes, edges } = apiData;
  if (!edges || edges.length == 0) {
    return [{ text: "No directions found" }];
  }
  const directions = [];
  let idx = 0;

  while (idx < edges.length) {
    const path = edges[idx];
    const startNode = nodes[idx];
    let endNode = nodes[idx + 1];

    // coalescing multi-floor stair or elevator trips into a single instruction
    switch (path) {
      case "ELEVATOR":
        while (idx < edges.length && edges[idx + 1] == "ELEVATOR") {
          idx++;
          endNode = nodes[idx + 1];
        }
        break;
      case "STAIR":
        while (idx < edges.length && edges[idx + 1] == "STAIR") {
          idx++;
          endNode = nodes[idx + 1];
        }
        break;
    }

    directions.push({
      ...getDirectionsFromNodes(startNode, endNode, path),
      id: directions.length + 1,
    });
    idx++;
  }

  return directions;
};

const getMapNodeFromName = (name) => {
  const nameArr = name.split(" ");
  console.log("nameArr", nameArr);
  return `${nameArr[0]}-${nameArr[nameArr.length - 1]}`;
};

const getDirectionsFromNodes = (startNode, endNode, path) => {
  console.log("startNode", startNode);
  const isWashroom = endNode.labels[0] === "WASHROOM";

  const startLocation = startNode.properties.name;
  const endLocation = isWashroom
    ? getWashroomName(endNode)
    : endNode.properties.name;

  switch (path) {
    case "INDOOR":
      directions = {
        text: `Navigate from ${startLocation} to ${endLocation}`,
        icon: "INDOOR",
        startLocationString: startLocation,
        endLocationString: endLocation,
        mapNode: getMapNodeFromName(startLocation),
      };

      if (startLocation.includes("Bridge") && !endLocation.includes("Bridge")) {
        directions.mapNode = getMapNodeFromName(endLocation);
      } else if (startLocation.includes("Bridge")) {
        directions.mapNode = null;
      }

      if (isWashroom) {
        directions.properties = getWashroomProperties(endNode);
        directions.icon = "WASHROOM";
      }
      break;
    case "OUTDOOR":
      directions = {
        text: `Exit using ${startLocation} and navigate outdoors to ${endLocation}`,
        icon: "OUTDOOR",
        startLocationString: startLocation,
        endLocationString: endLocation,
      };
      break;
    case "ELEVATOR":
      directions = {
        text: `Take the elevator from ${startLocation} to ${endLocation}`,
        icon: "ELEVATOR",
        startLocationString: startLocation,
        endLocationString: endLocation,
        mapNode: getMapNodeFromName(startLocation),
      };
      break;
    case "STAIR":
      directions = {
        text: `Take stairs from ${startLocation} to ${endLocation}`,
        icon: "STAIR",
        startLocationString: startLocation,
        endLocationString: endLocation,
        mapNode: getMapNodeFromName(startLocation),
      };
      break;
  }

  return directions;
};

const getWashroomName = (node) => {
  const { properties } = node;
  if (!node || !properties) {
    return "";
  }

  const nameArr = ["the"];

  if (properties.acc_stall) {
    nameArr.push("accessible");
  }

  if (properties.multi_stall) {
    nameArr.push("multi-stall");
  }

  switch (properties.type) {
    case "S":
      nameArr.push("single stall");
      break;
    case "M":
      nameArr.push("male");
      break;
    case "F":
      nameArr.push("female");
      break;
    case "GN":
      nameArr.push("gender neutral");
      break;
  }

  return nameArr.join(" ") + " washroom";
};

const getWashroomProperties = (node) => {
  const properties = {
    acc_button_access: node.properties.acc_button_access,
    acc_stall: node.properties.acc_stall,
    grab_bar: node.properties.grab_bar,
  };

  if (node.properties.l) {
    properties.stall_dimensions = [node.properties.l, node.properties.w];
  }

  if (node.properties.h) {
    properties.toilet_height = node.properties.h;
  }

  switch (node.properties.type) {
    case "S":
      properties.type = "Universal Washroom";
      break;
    case "W":
      properties.type = "Female Washroom";
      break;

    case "M":
      properties.type = "Male Washroom";
      break;

    case "GN":
      properties.type = "Gender Neutral Washroom";
      break;
  }

  return properties;
};
