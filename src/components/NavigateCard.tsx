import React, { useEffect } from "react";

import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// @ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../redux/slices/navSlice";
import NavFavorites from "./NavFavorites";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setDestination(null));
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text
        style={[
          tw`text-2xl py-5 text-center font-semibold`,
          { fontFamily: "Uber-Medium" },
        ]}
      >
        Good Morning, Emma
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink p-4`}>
        <GooglePlacesAutocomplete
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 18,
              height: 52,
              backgroundColor: "#eeeeee",
              fontFamily: "Uber-Medium",
            },
            description: { fontSize: 16, fontFamily: "Uber-Medium" },
          }}
          query={{ key: GOOGLE_MAPS_API_KEY }}
          minLength={3}
          fetchDetails
          onPress={(data, details) => {
            dispatch(
              setDestination({
                location: details?.geometry.location,
                description: data.description,
              })
            );

            navigation.navigate("RideOptionsCard" as never);
          }}
          textInputProps={{
            returnKeyType: "search",
          }}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          placeholder={"Where to?"}
          enablePoweredByContainer={false}
          debounce={100}
        />
        <NavFavorites
          onSelected={(destination) => {
            dispatch(setDestination(destination));
            navigation.navigate("RideOptionsCard" as never);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
