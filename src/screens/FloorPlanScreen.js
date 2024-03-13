import { useState, useEffect } from "react";
import fillerImg from "../../public/images/filler.png";
// import ImageZoom from "react-native-image-pan-zoom";
import { Image, Dimensions, View, Text } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { API_BASE_URL } from "@env";

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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchImageDimensions = async () => {
      try {
        const [width, height] = await new Promise((resolve, reject) => {
          Image.getSize(
            uri,
            (originalWidth, originalHeight) => resolve([originalWidth, originalHeight]),
            reject
          );
        });
        const scaleFactor = screenWidth / width;
        const imageHeight = height * scaleFactor;
        setDimensions({ width: screenWidth, height: imageHeight });
      } catch (error) {
        console.error('Error getting image dimensions:', error);
      }
    };

    if (uri) {
      fetchImageDimensions();
    }
  }, [uri, screenWidth]);

  useEffect(() => {
    if (item.mapNode === "outside") {
      setUri(fillerImg);
    } else {
      setUri(`${API_BASE_URL}/locations/image/${item.mapNode}`);
    }
  }, [item.mapNode]);

  return (
    <View style={{ flex: 1 }}>
      {uri && dimensions.height ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ImageZoom
            cropWidth={screenWidth * 0.9}
            cropHeight={screenHeight}
            imageWidth={dimensions.width}
            imageHeight={dimensions.height}
            enableCenterFocus={false}
          >
            <Image
              style={{ width: dimensions.width, height: dimensions.height, resizeMode: 'contain' }}
              source={{ uri }}
            />
          </ImageZoom>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default FloorPlanScreen;
