import { Image, Box, View, Flex, Center, Checkbox, Row } from "native-base";
import { Button } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import campusMap from "../../public/images/campus-map.png";
import SearchBar from "../components/SearchBar";
import { Keyboard } from "react-native";
import { API_BASE_URL } from "@env";
import { useState, useEffect } from "react";
import useServerData from "../hooks/useServerData";
import NearestWashroomModal from "../components/NearestWashroomModal";
import CheckBox from "react-native-check-box";

const purpleHex = "#4C1D95";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const url = `${API_BASE_URL}/locations`;
  const locations = useServerData(url);

  const searchLocation = () => {
    console.log("searching");
  };

  return (
    <>
      {/* Modal  */}
      <NearestWashroomModal
        isOpen={modalVisible}
        onCloseHandler={() => setModalVisible(false)}
        onSubmit={() => {
          navigation.navigate("Directions"), { apiCall: "yeet" };
        }}
      ></NearestWashroomModal>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Center w="100%">
          <Flex my="5%" w="90%" gap="4" justifyContent="flex-start">
            {/* Seach boxes */}

            <Flex direction="row" alignItems="center">
              <SearchBar
                placeholder="Search Your Location..."
                searchFunction={searchLocation}
                locations={locations}
              ></SearchBar>
            </Flex>
            <Flex direction="row" alignItems="center">
              <SearchBar
                placeholder="Search Your Destination..."
                searchFunction={searchLocation}
              ></SearchBar>
            </Flex>

            {/* Check boxes  */}
            <CheckBox rightText={"Avoid Stairs"} />
            <CheckBox rightText={"Avoid Elevators"} />
            {/* IDK WHY THE CHECKBOXES HAVE THEIR TEXT CUT OFF WHEN I TRY TO CENTER */}
            {/* <Row space={3} justifyContent="center">
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
            </Row> */}

            {/* Buttons and map */}

            <Button
              borderRadius="lg"
              colorScheme="purple"
              bg={purpleHex}
              onPress={() => {
                navigation.navigate("Directions");
              }}
            >
              Search Directions
            </Button>
            <Button
              borderRadius="lg"
              colorScheme="purple"
              bg={purpleHex}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              Find Nearest Washroom
            </Button>
            <Center>
              <Image
                source={campusMap}
                alt="Map of buildings on the UW campus"
                w="100%"
              ></Image>
            </Center>
          </Flex>
        </Center>
      </TouchableWithoutFeedback>
    </>
  );
};

export default HomeScreen;
