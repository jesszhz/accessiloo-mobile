import { Image, Text, View } from "native-base";
import useServerData from "../hooks/useServerData";
import { useEffect, useState } from "react";
import fillerImg from "../../public/images/filler.png";

const FloorPlanImage = (props) => {
  const { item } = props;

  const [img, setImg] = useState("");

  // fetching the image somehow idk how this works
  useEffect(() => {
    const getImage = async () => {
      try {
        const url = `https://koi-wise-kiwi.ngrok-free.app/locations/image/${item.mapNode}`;
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
    img && (
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
    )
  );
};

const OutsideImage = () => (
  <Image
    alt="map of directions"
    style={{
      width: 350,
      height: 350,
      resizeMode: "contain",
    }}
    source={fillerImg}
  />
);

const DirectionCard = (props) => {
  const { item } = props;

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
      {item?.mapNode === "outside" ? (
        <OutsideImage />
      ) : item.mapNode ? (
        <FloorPlanImage item={item} />
      ) : null}
    </View>
  );
};

export default DirectionCard;
