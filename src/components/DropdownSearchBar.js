import React, { Component, useState } from "react";
import { TextInput, TouchableHighlight } from "react-native";
import { FlatList, View, Text, Pressable } from "native-base";
import { useEffect } from "react";

const DropdownHeader = (props) => {
  const { searchItems, searchText } = props;

  return (
    <TextInput
      placeholder="Type here to search"
      onChangeText={(text) => {
        searchItems(text);
      }}
      value={searchText}
    ></TextInput>
  );
};

const DropdownSeparator = () => {
  return <View height={1} width="100%"></View>;
};

const DropdownItem = (props) => {
  const { onClick, item } = props;
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

const DropdownSearchBar = (props) => {
  const { locations, maxElements = 6 } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {}, [locations, searchResults]);

  const searchItems = (searchText) => {
    if (searchText == "") {
      setSearchResults([]);
      return;
    }
    const newSearchResults = locations.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearchResults(newSearchResults.slice(0, maxElements));
    setSearchText(searchText);
  };

  return (
    <View
      padding={2}
      bg={"blue.100"}
      borderWidth={1}
      borderColor={"#D8D8D8"}
      borderRadius={"30"}
    >
      <FlatList
        data={searchResults}
        ListHeaderComponent={<DropdownHeader searchItems={searchItems} />}
        renderItem={({ item }) => <DropdownItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={DropdownSeparator}
      ></FlatList>
    </View>
  );
};

export default DropdownSearchBar;
