import React, { useEffect, useState } from "react";
import { useFonts } from "@use-expo/font";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import HeaderHome from "../Components/HeaderHome";
import ChartDetails from "../Components/chartDetails";
import Chart from "../Components/barChart";
import LoadingComponent from "../Components/Loading";

//Network Check
// import networkDetails from '../Components/Network'
// Importing Images
import backImage1 from "../Images/coronavirus.png";
import backImage2 from "../Images/coronavirus1.png";

export default function Home({ navigation }) {
  const [worldData, setworldData] = useState([]);
  const [fontsLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway-Medium.ttf"),
  });
  const [Loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    const respsonse = await fetch("https://disease.sh/v2/all");
    const Data = await respsonse.json();
    setworldData(Data);
    setLoading(false);
  };

  useEffect(() => {
    if (worldData == null || worldData.length == 0) {
      fetchAPI();
    } else {
      if (Loading) setLoading(false);
    }
  }, []);

  if (Loading)
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );
  else {
    if (fontsLoaded) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* Rendering Header Component */}
          <HeaderHome navigation={navigation} />

          <Image
            source={backImage2}
            style={styles.backgroundImage2}
            fadeDuration={100}
          />
          <Image
            source={backImage1}
            style={styles.backgroundImage1}
            fadeDuration={100}
          />
          <ScrollView>
            <Text
              style={{
                fontFamily: "Raleway",
                fontSize: 22,
                color: "#CFCFCF",
                paddingLeft: 20,
              }}
            >
              World
            </Text>

            {/* Rendering Bar Chart Component */}
            <Chart worldData={worldData} />
            {/* Rendering Chart Details Component */}

            <ChartDetails data={worldData} />
          </ScrollView>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121517",
  },
  backgroundImage1: {
    width: 160,
    height: 160,
    position: "absolute",
    top: 90,
    right: -40,
    opacity: 0.2,
  },
  backgroundImage2: {
    width: 160,
    height: 160,
    position: "absolute",
    top: 550,
    left: -40,
    opacity: 0.8,
  },
});
