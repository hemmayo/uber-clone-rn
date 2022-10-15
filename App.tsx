import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./src/screens/MapScreen";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";

export default function App() {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    "Uber-Bold": require("./assets/fonts/UberMoveTextBold.otf"),
    "Uber-Medium": require("./assets/fonts/UberMoveTextMedium.otf"),
    "Uber-Regular": require("./assets/fonts/UberMoveTextRegular.otf"),
    "Uber-Light": require("./assets/fonts/UberMoveTextLight.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={"padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <StatusBar animated translucent />
            <Stack.Navigator>
              <Stack.Screen
                name={"HomeScreen"}
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"MapScreen"}
                component={MapScreen}
                options={{ headerShown: false, animationEnabled: true }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
