import React, { useState } from "react";

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../redux/slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-X-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-X-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation) as any;
  const [selected, setSelected] = useState<typeof data[0] | null>(null);

  return (
    <SafeAreaView style={tw`flex-grow bg-white`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-2 left-5 p-3 rounded-full `}
        >
          <Icon
            name={"chevron-left"}
            type={"fontawesome"}
            tvParallaxProperties
          />
        </TouchableOpacity>
        <Text
          style={[tw`text-xl py-5 text-center`, { fontFamily: "Uber-Regular" }]}
        >
          Select a ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw.style(
              `flex-row justify-between items-center px-8`,
              selected?.id === item.id && "bg-gray-200"
            )}
          >
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
                  height: 120,
                  resizeMode: "contain",
                  marginTop: -25,
                }}
              />
              <View style={tw``}>
                <Text
                  style={[
                    tw`text-xl font-semibold`,
                    { fontFamily: "Uber-Medium" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={{ fontFamily: "Uber-Regular" }}>
                  {travelTimeInformation?.duration?.text}
                </Text>
              </View>
            </View>

            <Text style={[tw`text-xl`, { fontFamily: "Uber-Regular" }]}>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(
                (travelTimeInformation?.duration?.value *
                  200 *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          style={tw.style(
            `bg-gray-900 text-gray-100 p-4 my-2 mx-6 rounded-md`,
            !selected && "bg-opacity-30"
          )}
        >
          <Text style={tw`text-gray-100 text-center text-xl`}>
            Choose {selected?.title || "a ride"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
