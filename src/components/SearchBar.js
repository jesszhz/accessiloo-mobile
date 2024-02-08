import { MaterialIcons } from "@expo/vector-icons";
import { VStack, Input, Icon } from "native-base";
import { Pressable } from "react-native";

const SearchBar = (props) => {
  const { placeholder, searchFunction } = props;
  return (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        placeholder={placeholder}
        width="100%"
        variant="rounded"
        InputRightElement={
          <Pressable onPress={searchFunction}>
            <Icon
              m="2"
              mr="3"
              size="6"
              color="#4C1D95"
              as={<MaterialIcons name="search" />}
            />
          </Pressable>
        }
      />
    </VStack>
  );
};

export default SearchBar;
