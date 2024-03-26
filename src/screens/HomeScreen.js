import {
  Image,
  Box,
  View,
  Flex,
  Center,
  Checkbox,
  Row,
  Heading,
} from "native-base";
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
import LocationSelector from "../components/LocationSelector";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const purpleHex = "#4C1D95";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    elevators: true,
    stairs: true,
    indoor: false,
  });
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const url = `${API_BASE_URL}/locations`;
  const locations = useServerData(url);

  const handleCheckBox = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option]: !prevFormData[option],
    }));
  };

  return (
    <>
      {/* Modal  */}
      <NearestWashroomModal
        startLocation={startLocation}
        isOpen={modalVisible}
        onCloseHandler={() => setModalVisible(false)}
      ></NearestWashroomModal>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Center w="100%">
          <Flex my="5%" w="90%" gap="4" justifyContent="flex-start">
            {/* Seach boxes */}
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={true}
              onSelectItem={setSelectedItem}
              dataSet={[
                { id: "1", title: "Alpha" },
                { id: "2", title: "Beta" },
                { id: "3", title: "Gamma" },
              ]}
            />
            <LocationSelector
              locations={locations}
              placeholder="Search Your Location..."
              selectedLocation={startLocation}
              setSelectedLocation={setStartLocation}
            />
            <LocationSelector
              locations={locations}
              placeholder="Search Your Destination..."
              selectedLocation={endLocation}
              setSelectedLocation={setEndLocation}
            />
            {/* Check boxes  */}
            <CheckBox
              onClick={() => {
                handleCheckBox("stairs");
              }}
              isChecked={!formData.stairs}
              rightText={"Avoid Stairs"}
              rightTextStyle={{ fontSize: 18 }}
            />
            <CheckBox
              onClick={() => {
                handleCheckBox("elevators");
              }}
              isChecked={!formData.elevators}
              rightText={"Avoid Elevators"}
              rightTextStyle={{ fontSize: 18 }}
            />
            <CheckBox
              onClick={() => {
                handleCheckBox("indoor");
              }}
              isChecked={formData.indoor}
              rightText={"Indoor Only"}
              rightTextStyle={{ fontSize: 18 }}
            />
            {/* IDK WHY THE CHECKBOXES HAVE THEIR TEXT CUT OFF WHEN I TRY TO CENTER */}
            {/* <Row space={3} justifyContent="center">
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
              <Center h="40" w="20" bg="primary.300" rounded="md"></Center>
            </Row> */}
            {/* Buttons and map */}
            <Button
              size={"lg"}
              borderRadius="lg"
              colorScheme="purple"
              bg={purpleHex}
              onPress={() => {
                navigation.navigate("Directions", {
                  type: "campusNavigation",
                  startLocation: startLocation,
                  endLocation: endLocation,
                  options: formData,
                });
              }}
            >
              Get Directions
            </Button>
            <Button
              size={"lg"}
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
