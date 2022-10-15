import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// @ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrigin,
  setDestination,
  setOrigin,
} from "../redux/slices/navSlice";
import DismissKeyboardView from "../components/DismissKeyboardView";
import NavFavorites from "../components/NavFavorites";

const HomeScreen: FC<StackScreenProps<any>> = ({}) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin) as any;

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <View style={tw.style("p-5 h-full")}>
          <Image
            source={{ uri: "https://links.papareact.com/gzs" }}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <GooglePlacesAutocomplete
            styles={{
              container: { flex: 0 },
              textInput: {
                fontSize: 18,
                height: 56,
                fontFamily: "Uber-Medium",
                paddingHorizontal: 16,
              },
              description: { fontSize: 16, fontFamily: "Uber-Medium" },
            }}
            query={{ key: GOOGLE_MAPS_API_KEY }}
            enableHighAccuracyLocation
            minLength={3}
            fetchDetails
            onPress={(data, details) => {
              dispatch(
                setOrigin({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            textInputProps={{
              value: origin?.description,
              onChangeText: () => dispatch(setOrigin(null)),
            }}
            nearbyPlacesAPI={"GooglePlacesSearch"}
            placeholder={"Where from?"}
            enablePoweredByContainer={false}
            debounce={100}
          />

          <View style={tw`mt-2`}>
            <NavOptions />
          </View>

          <View style={tw`mt-2`}>
            <NavFavorites
              onSelected={(origin) => {
                dispatch(setOrigin(origin));
              }}
            />
          </View>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default HomeScreen;
