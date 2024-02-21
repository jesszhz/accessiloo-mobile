import { MaterialIcons } from "@expo/vector-icons";
import { VStack, Input, Icon, View, FlatList, Text } from "native-base";
import { Pressable } from "react-native";
import { useState } from "react";

const DropdownItem = (props) => {
  const { onClick, item } = props;
  const pressHandler = () => {
    console.log("pressed", item.name);
  };
  return (
    <Pressable onPress={pressHandler}>
      <View>
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const DropdownSeparator = () => {
  return <View height={1} width="100%"></View>;
};

const SearchBar = (props) => {
  const { locations, maxElements = 6, placeholder } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const searchItems = (searchText) => {
    if (searchText === "") {
      setSearchResults([]);
      return;
    }
    const newSearchResults = locations.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearchResults(newSearchResults.slice(0, maxElements));
  };

  return (
    <VStack
      onBlur={() => {
        setDropdownVisible(false);
      }}
      w="100%"
      space={5}
      alignSelf="center"
    >
      <Input
        placeholder={placeholder}
        width="100%"
        variant="rounded"
        onChangeText={(text) => {
          searchItems(text);
        }}
        onFocus={() => {
          setDropdownVisible(true);
        }}
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
      {dropdownVisible && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <DropdownItem item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={DropdownSeparator}
        ></FlatList>
      )}
    </VStack>
  );
};

export default SearchBar;
