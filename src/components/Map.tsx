import React, { useEffect, useRef } from "react";

import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTimeTravelInformation,
} from "../redux/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const origin = useSelector(selectOrigin) as any;
  const destination = useSelector(selectDestination) as any;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) =>
          dispatch(setTimeTravelInformation(data.rows[0].elements[0]))
        );
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  useEffect(() => {
    if (!origin) {
      navigation.navigate("HomeScreen" as never);
    }
  }, []);

  return (
    origin && (
      <MapView
        ref={mapRef}
        style={tw`flex-1`}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        zoomEnabled
        mapType="mutedStandard"
        showsMyLocationButton
      >
        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            destination={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={2.5}
            mode={"DRIVING"}
            strokeColor={"black"}
          />
        )}
        {origin.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title={"Origin"}
            tappable
            description={origin.description}
            identifier={"origin"}
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title={"Destination"}
            tappable
            pinColor={"black"}
            description={destination.description}
            identifier={"destination"}
          />
        )}
      </MapView>
    )
  );
};

export default Map;
