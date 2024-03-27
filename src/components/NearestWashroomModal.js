import { useNavigation } from "@react-navigation/native";
import { Modal, Button, Text, HStack, Box } from "native-base";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CheckBox from "react-native-check-box";


const checkboxOptions = [
  { label: "female", title: "Female" },
  { label: "male", title: "Male" },
  { label: "gn", title: "Gender Neutral" },
  { label: "single", title: "Single Stall" },
];

const StyledCheckbox = (props) => {
  const { option, handleClick, formData } = props;

  return (
    <CheckBox
      key={option.label}
      onClick={handleClick}
      isChecked={
        option.inverse ? !formData[option.label] : formData[option.label]
      }
      rightText={option.title}
      rightTextStyle={{ color: "#4C1D95", fontSize: 16 }}
    ></CheckBox>
  );
};

const NearestWashroomModal = (props) => {
  const { startLocation, isOpen, onCloseHandler, routeOptions } = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    single: false,
    multi: false,
    female: false,
    male: false,
    gn: false,
    accessble: false,
  });

  const handleChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option.label]: !prevFormData[option.label],
    }));
  };

  const checkboxes = checkboxOptions.map((option) => (
    <StyledCheckbox
      option={option}
      handleClick={() => {
        handleChange(option);
      }}
      formData={formData}
    ></StyledCheckbox>
  ));

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} size="xl">
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <Box>{checkboxes}</Box>
          <Box
            borderBottomColor={"gray.300"}
            borderBottomWidth={2}
            marginY={2}
          ></Box>
          <Box>
            <StyledCheckbox
              option={{ label: "accessible", title: "Accessible" }}
              handleClick={() => {
                handleChange(option);
              }}
              formData={formData}
            ></StyledCheckbox>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bgColor={"#4C1D95"}
            onPress={() => {
              onCloseHandler();
              navigation.navigate("Directions", {
                type: "nearestWashroom",
                options: { ...formData, ...routeOptions },
                startLocation: startLocation,
              });
            }}
          >
            Get Directions
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NearestWashroomModal;
