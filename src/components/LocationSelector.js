import {
  Center,
  Box,
  Modal,
  VStack,
  Input,
  Text,
  Icon,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";

const LocationSelectorModal = (props) => {
  const {
    isOpen,
    onCloseHandler,
    locations,
    selectedLocation,
    setSelectedLocation,
  } = props;

  const locationCards = locations?.map((location) => (
    <Pressable
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
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      ></LocationSelectorModal>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
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
            <Icon
              m="2"
              mr="3"
              size="6"
              color="#4C1D95"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
    </>
  );
};

export default LocationSelector;
