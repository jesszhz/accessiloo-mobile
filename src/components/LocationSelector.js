import {
  Center,
  Box,
  Modal,
  VStack,
  Input,
  Text,
  Icon,
  Pressable,
  Heading,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";

const LocationSelectorModal = (props) => {
  const {
    isOpen,
    onCloseHandler,
    locations,
    selectedLocation,
    setSelectedLocation,
  } = props;

  const locationCards = locations?.map((location, index) => (
    <Pressable
      key={index}
      onPress={() => {
        setSelectedLocation(location.name);
        onCloseHandler();
      }}
    >
      {({ isPressed }) => {
        return (
          <Box
            key={location.name}
            justifyContent={"center"}
            alignItems="center"
            height={12}
            bg={isPressed ? "coolGray.200" : "transparent"}
          >
            <Text fontSize={"md"}>{location.name}</Text>
          </Box>
        );
      }}
    </Pressable>
  ));

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <Modal.Content maxWidth={"400px"} height={"500px"}>
        <Modal.Body>{locationCards}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const sortLocations = (locations) => {
  if (!locations || locations.length == 0) {
    return;
  }

  return locations.sort((a, b) => {
    const compareResult = a.name.localeCompare(b.name);
    return compareResult;
  });
};

const LocationSelector = (props) => {
  const { locations, placeholder, selectedLocation, setSelectedLocation } =
    props;
  const [isModalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  return (
    <>
      <LocationSelectorModal
        isOpen={isModalVisible}
        onCloseHandler={() => setModalVisible(false)}
        locations={sortLocations(locations)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      ></LocationSelectorModal>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          size="lg"
          ref={inputRef}
          placeholder={placeholder}
          width="100%"
          variant="rounded"
          onFocus={() => {
            setModalVisible(true);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
          value={selectedLocation}
          InputRightElement={
            <Pressable
              onPress={() => {
                setSelectedLocation("");
              }}
            >
              <Icon
                m="2"
                mr="3"
                size="6"
                color="#4C1D95"
                as={<MaterialIcons name="clear" />}
              />
            </Pressable>
          }
        />
      </VStack>
    </>
  );
};

export default LocationSelector;
