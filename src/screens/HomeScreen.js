import {
  Icon,
  Box,
  Heading,
  Image,
  Flex,
  Spacer,
  Column,
  Stack,
  View,
  Text,
  HStack,
  Input,
  Center,
  Checkbox,
  VStack,
  Row,
} from "native-base";
import { Button } from "native-base";
import {
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import campusMap from "../../public/images/campus-map.png";
import verticalDots from "../../public/icons/vertical-dots.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import StyledButton from "../components/StyledButton";
import SearchBar from "../components/SearchBar";
import { Keyboard } from "react-native";
import DropdownSearchBar from "../components/DropdownSearchBar";
import { API_BASE_URL } from "@env";
import { useState, useEffect } from "react";
import useServerData from "../hooks/useServerData";
import NearestWashroomModal from "../components/NearestWashroomModal";

const purpleHex = "#4C1D95";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
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
            <DropdownSearchBar locations={locations}></DropdownSearchBar>

            <Flex direction="row" alignItems="center">
              <SearchBar
                placeholder="Search Your Location..."
                searchFunction={searchLocation} locations={locations}
              ></SearchBar>
            </Flex>
            <Flex direction="row" alignItems="center">
              <SearchBar
                placeholder="Search Your Destination..."
                searchFunction={searchLocation}
              ></SearchBar>
            </Flex>

            {/* Check boxes  */}
            <Row alignItems="center" justifyContent="center">
              <Checkbox mr="7" colorScheme="purple">
                Avoid Stairs
              </Checkbox>
              <Checkbox colorScheme="purple">Avoid Ramps</Checkbox>
            </Row>

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
