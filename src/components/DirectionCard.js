import { Text, Pressable } from "native-base";

const DirectionCard = (props) => {
  const { item } = props;

  const pressHandler = () => {
    console.log("im pressed!");
  };

  return (
    <Pressable
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
    </Pressable>
  );
};

export default DirectionCard;
