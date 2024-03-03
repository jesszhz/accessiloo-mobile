import { Image, Text, View } from "native-base";
import useServerData from "../hooks/useServerData";
import { useEffect, useState } from "react";

const DirectionCard = (props) => {
  const { item } = props;
  const [img, setImg] = useState("");

  const pressHandler = () => {
    console.log("im pressed!");
  };

  // fetching the image somehow idk how this works
  useEffect(() => {
    const getImage = async () => {
      try {
        const url = "https://koi-wise-kiwi.ngrok-free.app/locations/image/E7-1";
        const response = await fetch(url);
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setImg(imgUrl);
      } catch (err) {
        console.log("Something went wrong", err);
      }
    };
    getImage();
  }, []);

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
      {img && (
        <Image
          alt="map of directions"
          style={{
            width: 350,
            height: 350,
            resizeMode: "contain",
          }}
          source={{
            uri: img,
          }}
        />
      )}
    </View>
  );
};

export default DirectionCard;
