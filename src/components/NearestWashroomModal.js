import { useNavigation } from "@react-navigation/native";
import { Modal, Button, Text } from "native-base";
import { useEffect, useState } from "react";
import CheckBox from "react-native-check-box";

const washroomOptions = [
  { label: "single" },
  { label: "female" },
  { label: "male" },
  { label: "accessible" },
];

const NearestWashroomModal = (props) => {
  const { startLocation, isOpen, onCloseHandler } = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    single: false,
    female: false,
    male: false,
    accessible: false,
  });

  const handleChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option.label]: !prevFormData[option.label],
    }));
  };

  const washroomCheckboxes = washroomOptions.map((option) => (
    <CheckBox
      key={option.label}
      onClick={() => {
        handleChange(option);
      }}
      isChecked={formData[option.label]}
      rightText={option.label}
    ></CheckBox>
  ));

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>{washroomCheckboxes}</Modal.Body>
        <Modal.Footer>
          <Button
            onPress={() => {
              onCloseHandler();
              navigation.navigate("Directions", {
                type: "nearestWashroom",
                options: formData,
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
