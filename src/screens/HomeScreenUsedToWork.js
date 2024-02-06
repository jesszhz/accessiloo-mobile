// import {
//   Icon,
//   Box,
//   Heading,
//   Image,
//   Flex,
//   Spacer,
//   Column,
//   Stack,
//   View,
//   Text,
//   HStack,
//   Input,
//   Center,
//   Checkbox,
//   VStack,
//   Row,
// } from "native-base";
// import { Button } from "native-base";
// import { Pressable } from "react-native";
// import campusMap from "../../public/images/campus-map.png";
// import verticalDots from "../../public/icons/vertical-dots.png";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// const SearchBar = (props) => {
//   const { placeholder, searchFunction } = props;
//   return (
//     <VStack w="100%" space={5} alignSelf="center">
//       <Input
//         placeholder={placeholder}
//         width="100%"
//         variant="rounded"
//         InputRightElement={
//           <Pressable onPress={searchFunction}>
//             <Icon
//               m="2"
//               mr="3"
//               size="6"
//               color="#4C1D95"
//               as={<MaterialIcons name="search" />}
//             />
//           </Pressable>
//         }
//       />
//     </VStack>
//   );
// };

const HomeScreen = ({ navigation }) => {
  const searchLocation = () => {
    console.log("Searching for location");
  };
  return (
    <Center w="100%">
      <Flex my="5%" w="90%" gap="4" justifyContent="flex-start">
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

        <Row alignItems="center" justifyContent="center">
          <Checkbox
            value="avoid stairs"
            colorScheme="purple"
            mr="7"
            defaultIsChecked
          >
            Avoid Stairs
          </Checkbox>
          <Checkbox value="avoid ramps" colorScheme="purple" defaultIsChecked>
            Avoid Ramps
          </Checkbox>
        </Row>

        <Button color="purple">Search Directions</Button>
        <Center>
          <Image
            source={campusMap}
            alt="Map of buildings on the UW campus"
            size="xl"
          ></Image>
        </Center>
        <Button>Find Nearest Washroom</Button>
      </Flex>
    </Center>
  );
};

// export default HomeScreen;
