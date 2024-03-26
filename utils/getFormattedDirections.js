const dummyData = {
  nodes: [
    {
      identity: {
        low: 13,
        high: 0,
      },
      labels: ["LOCATION"],
      properties: {
        elevators: [
          [0.273, 0.527],
          [0.273, 0.487],
        ],
        name: "E6 Floor 3",
        id: 14,
        floor: 3,
      },
      elementId: "4:7d4d56f0-21ca-4881-8f49-43a9fca62ab5:13",
    },
    {
      identity: {
        low: 29,
        high: 0,
      },
      labels: ["LOCATION"],
      properties: {
        name: "E6/E7 Bridge",
        id: 30,
        floor: 3,
      },
      elementId: "4:7d4d56f0-21ca-4881-8f49-43a9fca62ab5:29",
    },
    {
      identity: {
        low: 2,
        high: 0,
      },
      labels: ["LOCATION"],
      properties: {
        elevators: [
          [0.506, 0.666],
          [0.506, 0.629],
          [0.506, 0.745],
        ],
        name: "E7 Floor 3",
        id: 3,
        floor: 3,
      },
      elementId: "4:7d4d56f0-21ca-4881-8f49-43a9fca62ab5:2",
    },
    {
      identity: {
        low: 3,
        high: 0,
      },
      labels: ["LOCATION"],
      properties: {
        elevators: [
          [0.504, 0.669],
          [0.504, 0.635],
          [0.528, 0.749],
        ],
        name: "E7 Floor 4",
        id: 4,
        floor: 4,
      },
      elementId: "4:7d4d56f0-21ca-4881-8f49-43a9fca62ab5:3",
    },
    {
      identity: {
        low: 47,
        high: 0,
      },
      labels: ["WASHROOM"],
      properties: {
        acc_button_access: true,
        h: 18,
        l: 122,
        type: "S",
        building: "E7",
        acc_stall: true,
        multi_stall: false,
        w: 109,
        grab_bar: true,
        x: 0.547,
        y: 0.634,
        id: 10,
        floor: 4,
      },
      elementId: "4:7d4d56f0-21ca-4881-8f49-43a9fca62ab5:47",
    },
  ],
  edges: ["INDOOR", "INDOOR", "ELEVATOR", "INDOOR"],
};

export const getFormattedDirections = (apiData) => {
  if (!apiData || apiData.length == 0) {
    return [{ text: "No directions found" }];
  }

  const { nodes, edges } = apiData[0];
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

  console.log("directions are", directions);
  return directions;
};

const getDirectionsFromNodes = (startNode, endNode, path) => {
  const isWashroom = endNode.labels[0] === "WASHROOM";

  const startLocation = startNode.properties.name;
  const endLocation = isWashroom
    ? getWashroomName(node)
    : endNode.properties.name;

  switch (path) {
    case "INDOOR":
      directions = {
        text: `Navigate from ${startLocation} to ${endLocation}`,
        icon: "INDOOR",
        startLocationString: startLocation,
        endLocationString: endLocation,
      };

      if (isWashroom) {
        directions.properties = getWashroomProperties(endNode);
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
      };
      break;
    case "STAIR":
      directions = {
        text: `Take stairs from ${startLocation} to ${endLocation}`,
        icon: "STAIR",
        startLocationString: startLocation,
        endLocationString: endLocation,
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

  const nameArr = [];

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
    stall_dimensions: [node.properties.l, node.properties.w],
    toilet_height: node.properties.h,
    grab_bar: node.properties.grab_bar,
  };

  switch (node.properties.type) {
    case "S":
      properties.type = "Universal Washroom";
      break;
    case "M":
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
