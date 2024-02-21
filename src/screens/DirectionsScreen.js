import { Text, Button, View, FlatList } from "native-base";
import DirectionCard from "../components/DirectionCard";
import { getFormattedDirections } from "../../utils/getFormattedDirections";
import useServerData from "../hooks/useServerData";
import { API_BASE_URL } from "@env";
import { useState, useEffect } from "react";

const DirectionsScreen = ({ route, navigation }) => {
  const [url, setUrl] = useState(null);
  const directions = useServerData(url);
  const { type, options, startLocation, endLocation } = route.params;

  useEffect(() => {
    if (type === "nearestWashroom") {
      const newUrl =
        encodeURI(`${API_BASE_URL}/routes/nearestWashroom/${startLocation}?`) +
        new URLSearchParams(options);
      setUrl(newUrl);
    } else if (type === "campusNavigation") {
      const newUrl =
        encodeURI(`${API_BASE_URL}/routes/${startLocation}-${endLocation}?`) +
        new URLSearchParams(options);
      setUrl(newUrl);
    }
  }, [type, options, startLocation, endLocation]);

  return (
    <View height="100%">
      {directions && (
        <FlatList
          px="4"
          py="6"
          data={getFormattedDirections(directions)}
          renderItem={({ item }) => <DirectionCard item={item} />}
        ></FlatList>
      )}
    </View>
  );
};

export default DirectionsScreen;
