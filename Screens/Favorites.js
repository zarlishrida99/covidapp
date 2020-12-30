import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import backImage from "../Images/coronavirus3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "../Components/Loading";

export default function Favorites({ navigation }) {
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    //   get the data from Storage
    AsyncStorage.getAllKeys().then((result) => {
      setFavorites(result);
      setLoading(false);
    });
  },[Favorites]);

  const go_to_route = async (item) => {
    await AsyncStorage.getItem(item).then((result) => {
      const data = JSON.parse(result);
      navigation.navigate("Country", { countryDetails: data });
    });
  };

  if (Loading) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { flexDirection: "row" }]}>
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway",
                fontSize: 25,
                color: "#CFCFCF",
                paddingLeft: 10,
              }}
            >
              Favorites
            </Text>
          </View>

          <View style={{ flex: 0.1, paddingTop: 30, alignItems: "flex-start" }}>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <Icon name={"bars"} size={18} color={"#CFCFCF"} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* BackGround Image  */}
        <Image
          source={backImage}
          style={styles.backImageStyle}
          fadeDuration={100}
        />

        <FlatList
          data={Favorites}
          onEndReachedThreshold={0.8}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => (
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => go_to_route(item)}
            >
              <View style={{ flexDirection: "row", margin: 8 }}>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Raleway",
                      color: "#CFCFCF",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121517",
  },
  header: {
    height: 80,
    justifyContent: "center",
    paddingLeft: 20,
  },
  backImageStyle: {
    width: 160,
    height: 160,
    position: "absolute",
    top: 120,
    opacity: 0.2,
    right: 0,
    tintColor: "#CFCFCF",
  },
});
