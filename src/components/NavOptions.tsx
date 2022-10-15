import React from "react";

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../redux/slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "145",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw.style(
            !origin && "opacity-60",
            `p-2 pl-6 pb-8 pt-4 bg-gray-200 w-45 m-1 rounded h-full`
          )}
          onPress={() => navigation.navigate(item.screen as never)}
          disabled={!origin}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text
              style={[
                tw`text-lg mt-2 font-semibold`,
                { fontFamily: "Uber-Medium" },
              ]}
            >
              {item.title}
            </Text>
            <Icon
              tvParallaxProperties={false}
              style={tw`bg-black p-2 rounded-full w-10 my-2`}
              name={"arrowright"}
              color="white"
              type={"antdesign"}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
