import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, extendTheme } from "native-base";
import DirectionsScreen from "../screens/DirectionsScreen";
import FloorPlanScreen from "../screens/FloorPlanScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: "#4C1D95",
  },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" },
  headerBackTitle: "Back",
};

export const Root = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ height: "100%", width: "100%" }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Accessiloo Home" component={HomeScreen} />
            <Stack.Screen name="Directions" component={DirectionsScreen} />
            <Stack.Screen name="Map" component={FloorPlanScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

export default Root;
