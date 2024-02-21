import { Text, Pressable } from "native-base";

const DirectionCard = (props) => {
  const { item } = props;

  const pressHandler = () => {
    console.log("im pressed!");
  };

  return (
    <Pressable onPress={pressHandler}>
      <Text>{item.text}</Text>
    </Pressable>
  );
};

export default DirectionCard;
