import { Text, Button, View, FlatList } from "native-base";
import DirectionCard from "../components/DirectionCard";
import { getFormattedDirections } from "../../utils/getFormattedDirections";
import useServerData from "../hooks/useServerData";
import { API_BASE_URL } from "@env";
import { useState, useEffect } from "react";

const DATA = [
  {
    nodes: [
      "E7 Floor 2",
      "E7 Floor 1",
      "E7 Northeast Exit",
      "E6 Southwest Exit",
      "E6 Floor 1",
      "E6 Floor 2",
      "E6 Floor 3",
    ],
    edges: ["ELEVATOR", "INDOOR", "OUTDOOR", "INDOOR", "ELEVATOR", "ELEVATOR"],
  },
];

const DirectionsScreen = ({ route, navigation }) => {
  const [url, setUrl] = useState(null);
  const directions = getFormattedDirections(useServerData(url));
  const { type, options } = route.params;

  useEffect(() => {
    if (type === "nearestWashroom") {
      const newUrl =
        encodeURI(`${API_BASE_URL}/routes/nearestWashroom/E7 Floor 1?`) +
        new URLSearchParams(options);
      setUrl(newUrl);
    } else if (type === "campusNavigation") {
      const newUrl =
        encodeURI(`${API_BASE_URL}/routes/E7 Floor 1-E6 Floor 2?`) +
        new URLSearchParams(options);
      setUrl(newUrl);
    }
  }, [type]);

  useEffect(() => {
    console.log("directions are", directions);
  }, [directions]);

  return (
    <View>
      <FlatList
        data={directions}
        renderItem={({ item }) => <DirectionCard item={item} />}
      ></FlatList>
    </View>
  );
};

export default DirectionsScreen;
