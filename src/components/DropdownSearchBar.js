import React, { Component, useState } from "react";
import { TextInput } from "react-native";
import { FlatList, View, Text } from "native-base";
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
      <Text>{item.title}</Text>
    </View>
  );
};

const DropdownSearchBar = () => {
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("rerender happening");
    setLocations([
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ]);
  }, []);

  useEffect(() => {
    console.log("search results:");
    console.log(searchResults);
  }, [locations, searchResults]);

  const searchItems = (searchText) => {
    if (searchText == "") {
      setSearchResults([]);
      return;
    }
    const newSearchResults = locations.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearchResults(newSearchResults);
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
