import { Image, Link, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

const DirectionCard = (props) => {
  const { item } = props;
  const navigation = useNavigation();

  const pressHandler = () => {
    console.log("im pressed!");
  };

  return (
    <View
      bg="#FAFAFA"
      borderColor="#D4D4D4"
      borderRadius="xl"
      borderWidth={"2"}
      onPress={pressHandler}
      px="4"
      py="6"
      my="2"
    >
      <Text fontSize={"md"}>{item.text}</Text>
      {item.mapNode && (
        <Link
          marginTop={4}
          fontSize={"md"}
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
