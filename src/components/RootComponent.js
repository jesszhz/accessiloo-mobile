import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, extendTheme } from "native-base";
import DirectionsScreen from "../screens/DirectionsScreen";

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: "#4C1D95",
  },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" },
  // headerBackTitle: false,
};

export const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Accessiloo Home" component={HomeScreen} />
        <Stack.Screen name="Directions" component={DirectionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
