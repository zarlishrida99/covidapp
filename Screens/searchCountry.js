import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import LoadingComponent from "../Components/Loading";
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
//Importing Images
import backImage from "../Images/coronavirus3.png";
import Icon from "react-native-vector-icons/FontAwesome5";

export default searchCountry = ({ navigation }) => {
  const [CountryList, setCountryList] = useState([]);
  const [array, setarray] = useState([]); //this is because of searching the array
  const [Loading, setLoading] = useState(true);
  const [ListEnd, setListEnd] = useState(false);
  const [Input, setInput] = useState("");

  useEffect(() => {
    if (CountryList == null || CountryList.length == 0) {
      fetchCountriesList();
    } else {
      if (Loading) {
        setLoading(false);
      }
    }
  }, [array]);

  const fetchCountriesList = async () => {
    const response = await fetch("https://corona.lmao.ninja/v2/countries");
    const data = await response.json();
    setCountryList(data);
    setarray(data); //this is because of searching the array of countries
    setLoading(false);
  };

  const searchCountries = (text) => {
    const searchedData = array.filter((item) => {
      const country = item.country.toLowerCase();
      const searchText = Input.toLowerCase();
      if (country.indexOf(searchText) > -1) {
        return country;
      }
    });
    setCountryList(searchedData);
  };

  const listEndLoading = () => {
    if (ListEnd === false) return <LoadingComponent />;
    else return null;
  };

  const go_to_route = (countryDetails) => {
    navigation.navigate("Country", { countryDetails: countryDetails });
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
        {/* input field with animation */}

        <View style={[styles.header, { flexDirection: "row" }]}>
          <View style={{ flex: 0.9, justifyContent:'center',alignItems:'flex-start'}}>
            <Text
              style={{
                fontFamily: "Raleway",
                fontSize: 25,
                color: "#CFCFCF",
                paddingLeft: 10,
              }}
            >
              Search Country
            </Text>
          </View>

          <View style={{ flex: 0.1, paddingTop: 30,alignItems:'flex-start'}}>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <Icon name={"bars"} size={18} color={"#CFCFCF"} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Fumi
          label={"World"}
          labelStyle={{ color: "#CFCFCF" }}
          value={Input == "" ? "" : Input}
          inputStyle={{ fontFamily: "Raleway", color: "#CFCFCF" }}
          style={{
            marginHorizontal: 15,
            borderRadius: 8,
            backgroundColor: "#1D2329",
          }}
          iconClass={FontAwesomeIcon}
          iconName={"globe"}
          iconColor={"white"}
          iconSize={25}
          onChangeText={(text) => {
            setInput(text);
            searchCountries(text);
          }}
          iconWidth={55}
          inputPadding={22}
        />

        {/* BackGround Image  */}
        <Image
          source={backImage}
          style={styles.backImageStyle}
          fadeDuration={100}
        />

        {/* List of Countries */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: "row", margin: 15 }}>
              <View style={{ flex: 3 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Raleway",
                    color: "#757E88",
                    paddingLeft: 5,
                  }}
                >
                  County{" "}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Raleway",
                    color: "#757E88",
                  }}
                >
                  Deaths
                </Text>
              </View>
            </View>
            <FlatList
              data={CountryList}
              onEndReachedThreshold={0.8}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={listEndLoading}
              onEndReached={() => setListEnd(true)}
              removeClippedSubviews={true}
              renderItem={({ item, i }) => (
                <TouchableOpacity
                  activeOpacity={0.1}
                  onPress={() => go_to_route(item)}
                >
                  <View style={{ flex: 1, flexDirection: "row", margin: 8 }}>
                    <View style={{ flex: 3, paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Raleway",
                          color: "#CFCFCF",
                        }}
                      >
                        {item.country}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Raleway",
                          color: "#CFCFCF",
                        }}
                      >
                        {item.deaths}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
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
