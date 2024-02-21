const formatLocation = (location) => {
  if (location === "SINGLE_WASHROOM") {
    location = "single stall accessible washroom";
  }
  if (location.indexOf("Exit") > -1 || location.indexOf("washroom") > -1) {
    // appends an correct article in front of the location if needed
    return `the ${location}`;
  }
  return location;
};

export const getFormattedDirections = (apiData) => {
  if (!apiData) {
    return null;
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
        });
        break;
      case "INDOOR":
        directions.push({
          text: `Walk to ${endLocation}`,
          icon: "INDOOR",
        });
        break;
      case "OUTDOOR":
        directions.push({
          text: `Walk from ${startLocation} to ${endLocation}`,
          icon: "OUTDOOR",
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
        });
        break;
    }
    idx++;
  }
  return directions;
};