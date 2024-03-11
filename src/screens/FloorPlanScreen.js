import { useState, useEffect } from "react";
import fillerImg from "../../public/images/filler.png";
// import ImageZoom from "react-native-image-pan-zoom";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Dimensions } from "react-native";
import { Image } from "native-base";

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
          width: 250,
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
    // style={{
    //   width: 350,
    //   height: 350,
    //   resizeMode: "contain",
    // }}
    source={fillerImg}
  />
);

const FloorPlanScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [uri, setUri] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const url = `https://koi-wise-kiwi.ngrok-free.app/locations/image/${item.mapNode}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setUri(imgUrl);
      } catch (err) {
        console.log("Something went wrong", err);
      }
    };

    if (item.mapNode === "outside") {
      setUri(fillerImg);
    } else {
      getImage();
    }
  }, []);

  // const mapImg =
  //   item?.mapNode === "outside" ? (
  //     <OutsideImage />
  //   ) : item.mapNode ? (
  //     <FloorPlanImage item={item} />
  //   ) : null;

  // return (
  //   <ImageZoom
  //     cropWidth={Dimensions.get("window").width}
  //     cropHeight={Dimensions.get("window").height}
  //     imageWidth={200}
  //     imageHeight={200}
  //   >
  //     {mapImg}
  //   </ImageZoom>
  // );
  if (uri) {
    return <ImageZoom uri={uri} maxScale={10} />;
  }
};

export default FloorPlanScreen;
