import React, { FC } from "react";

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
  {
    id: "123",
    icon: "home",
    title: "Home",
    location: { lat: 6.5192205, lng: 3.3720398 },
    description: "Yaba College of Technology",
  },
  {
    id: "144",
    icon: "briefcase",
    title: "Work",
    location: { lat: 6.4390779, lng: 3.4804383 },
    description: "Fincra",
  },
];

const NavFavorites: FC<{
  onSelected: ({
    location,
    description,
  }: {
    location: any;
    description: string;
  }) => void;
}> = ({ onSelected }) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { icon, title, description, location } }) => (
        <TouchableOpacity
          style={tw`p-2 my-1 items-center flex-row`}
          onPress={() =>
            onSelected && onSelected({ location, description: title })
          }
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-4`}
            name={icon}
            color={"black"}
            type={"ionicon"}
            size={18}
            tvParallaxProperties
          />
          <View>
            <Text
              style={tw.style("text-base mb-px font-medium text-gray-900", {
                fontFamily: "Uber-Medium",
              })}
            >
              {title}
            </Text>
            <Text
              style={[tw`mb-px text-gray-400`, { fontFamily: "Uber-Regular" }]}
            >
              {description}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
