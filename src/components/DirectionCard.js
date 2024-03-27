import { useEffect, useState } from "react";
import { Box, Image, Link, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

const DirectionCard = (props) => {
  const [showWashroomDetails, setShowWashroomDetails] = useState(false);
  const { item } = props;
  const navigation = useNavigation();
  const showMap = item.mapNode && item.mapNode !== "outside";
  const properties = item.properties;

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <View
      bg="#FAFAFA"
      borderColor="#D4D4D4"
      borderRadius="xl"
      borderWidth={"2"}
      px="4"
      py="6"
      my="2"
    >
      {item.id && (
        <Text fontSize={"lg"} bold mb={3}>
          Step {item.id}
        </Text>
      )}
      <Text fontSize={"lg"}>{item.text}</Text>

      {item.properties?.icon === "WASHROOM" && (
        <Link
          marginTop={2}
          marginBottom={2}
          onPress={() => {
            setShowWashroomDetails(!showWashroomDetails);
          }}
        >
          {showWashroomDetails
            ? "Hide Washroom Details"
            : "Show Washroom Details"}
        </Link>
      )}
      {showWashroomDetails && (
        <>
          <Text>Type: {properties.type}</Text>
          <Text>
            Automatic Door: {properties.acc_button_access ? "Yes" : "No"}
          </Text>
          <Text>Accessible Stall: {properties.acc_stall ? "Yes" : "No"}</Text>
          <Text>
            Accessible Stall Dimensions: {properties.stall_dimensions[0]} x{" "}
            {properties.stall_dimensions[1]} inches
          </Text>
          <Text>Toilet Height: {properties.toilet_height} inches</Text>
          <Text>Grab Bars: {properties.grab_bar ? "Yes" : "No"}</Text>
        </>
      )}
      {showMap && (
        <Link
          marginTop={4}
          fontSize={"lg"}
          onPress={() => {
            navigation.navigate("Map", {
              item: item,
            });
          }}
        >
          Open floor plan map
        </Link>
      )}
    </View>
  );
};

export default DirectionCard;
