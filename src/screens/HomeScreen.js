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
import { ScrollView, Pressable, TouchableWithoutFeedback } from "react-native";
import campusMap from "../../public/images/campus-map.png";
import verticalDots from "../../public/icons/vertical-dots.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import StyledButton from "../components/StyledButton";
import SearchBar from "../components/SearchBar";
import { Keyboard } from "react-native";

const purpleHex = "#4C1D95";


const HomeScreen = () => {
  const searchLocation = () => {
    console.log("Searching for location");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Center w="100%">
        <Flex my="5%" w="90%" gap="4" justifyContent="flex-start">
          {/* Seach boxes */}

          <Flex direction="row" alignItems="center">
            {/* <Icon
            size="4"
            as={<MaterialCommunityIcons name="circle-outline" />}
          ></Icon>
          <Image mt="2" source={verticalDots}></Image> */}
            <SearchBar
              placeholder="Search Your Location..."
              searchFunction={searchLocation}
            ></SearchBar>
          </Flex>
          <Flex direction="row" alignItems="center">
            {/* <Icon size="6" as={<MaterialIcons name="location-pin" />}></Icon> */}
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

          <Button borderRadius="lg" colorScheme="purple" bg={purpleHex}>
            Search Directions
          </Button>
          <Center>
            <Image
              source={campusMap}
              alt="Map of buildings on the UW campus"
              w="100%"
            ></Image>
          </Center>
          <StyledButton
            buttonClickHandler={() => {
              console.log("Pressed");
            }}
          >
            Find Nearest Washroom
          </StyledButton>
        </Flex>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
