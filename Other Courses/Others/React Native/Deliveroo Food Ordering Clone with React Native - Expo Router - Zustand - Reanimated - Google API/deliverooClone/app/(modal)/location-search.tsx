import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";

import Colors from "@/constants/Colors";

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 51.507,
    longitude: -0.0877,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails
        query={{ key: apiKey, language: "en" }}
        onPress={(data, details) => {
          const point = details?.geometry.location;

          if (!point) {
            return;
          }
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng
          });
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: "#fff"
          }
        }}
      />
      <MapView style={styles.map} showsUserLocation region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1
  }
});

export default LocationSearch;
