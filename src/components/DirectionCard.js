import { useEffect } from "react";
import { Image, Link, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

const DirectionCard = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  const showMap = item.mapNode && item.mapNode !== "outside";

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
      <Text fontSize={"lg"} bold mb={3}>
        Step {item.id}
      </Text>
      <Text fontSize={"lg"}>{item.text}</Text>
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
