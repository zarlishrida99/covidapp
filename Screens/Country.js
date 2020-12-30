import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  ToastAndroid,
} from "react-native";
import ChartDetails from "../Components/chartDetails";
import Chart from "../Components/barChart";
import Loadingcomponent from "../Components/Loading";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Country = ({ navigation, route }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [Flag, setFlag] = useState("");
  const [isFavorite, setisFavorite] = useState(false);

  const fetchData = async () => {
    setdata(route.params.countryDetails);
    const image = {
      uri: route.params.countryDetails.countryInfo.flag,
    };
    setFlag(image);
  };

  useEffect(() => {
    async function getData() {
      if (data == null || data.length == 0) {
        await fetchData();
        setLoading(false);
      } else setLoading(false);
    }
    getData();
  },[]);

  useEffect(() => {
    const asyncStorage = async () => {
      if (data != []) {
        try {
          const value = await AsyncStorage.getAllKeys();
          // search for the key with the name of the country
          const isKeyAvailable = value.indexOf(data.country);

          if (isKeyAvailable != -1) setisFavorite(true);
          else setisFavorite(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    asyncStorage();
    setLoading(false);
  }, [data]);

  const handleFavorites = async () => {
    // add or remove the country from the async storage

    try {
      const value = await AsyncStorage.getAllKeys();
      // search for the key with the name of the country

      const isKeyAvailable = value.indexOf(data.country);
      if (isKeyAvailable == -1) {
        ToastAndroid.show(`Adding ${data.country} to Favorites`, 2000);
        // if no country found then add the country in the storage
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(data.country, jsonData);
        setisFavorite(true);
      } else {
        ToastAndroid.show(`Removing ${data.country} from Favorites`, 2000);
        await AsyncStorage.removeItem(data.country);
        setisFavorite(false);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // check if the contry is favorites or not

  if (Loading || Flag == "")
    return (
      <View style={styles.container}>
        <Loadingcomponent />
      </View>
    );
  else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.header]}>
            <Image
              source={{ uri: Flag.uri }}
              style={styles.FlagStyle}
              fadeDuration={100}
            />
            <Text style={styles.countryName}>{data.country.toUpperCase()}</Text>
            <TouchableWithoutFeedback onPress={() => handleFavorites()}>
              <FontAwesome
                name={"star"}
                size={28}
                color={`${isFavorite === false ? "#ffffff" : "#FFFB00"}`}
              />
            </TouchableWithoutFeedback>
          </View>

          {/*  Bar Chart Component */}
          <Chart worldData={data} />
          {/*  Chart Details Component */}

          <ChartDetails data={data} />
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121517",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  countryName: {
    fontFamily: "Raleway",
    fontSize: 22,
    color: "#CFCFCF",
    margin: 10,
  },
  FlagStyle: {
    width: 150,
    height: 100,
    borderRadius: 20,
    margin: 20,
  },
});
