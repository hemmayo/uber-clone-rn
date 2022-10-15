import React from "react";

import { Text, View } from "react-native";
import tw from "twrnc";
import Map from "../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import DismissKeyboardView from "../components/DismissKeyboardView";

const MapScreen = () => {
  const Stack = createStackNavigator();

  return (
    <View>
      <DismissKeyboardView>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2 bg-white`}>
          <Stack.Navigator>
            <Stack.Screen
              name={"NavigateCard"}
              component={NavigateCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"RideOptionsCard"}
              component={RideOptionsCard}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </DismissKeyboardView>
    </View>
  );
};

export default MapScreen;
