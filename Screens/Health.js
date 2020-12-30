import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import LoadingComponent from "../Components/Loading";
//Importing Images
import socialDistance from "../Images/social-distance.png";
import stayHomeStaySafe from "../Images/stay-home-stay-safe.png";
import cough from "../Images/cough.png";
import Icon from "react-native-vector-icons/FontAwesome5";

export default Health = () => {
  const [loading, setloding] = useState(true);

  useEffect(() => {
    setloding(false);
  });

  const Instructions = ({ heading, text, imageLink }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", padding: 7 }}>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <Image
            source={imageLink}
            resizeMode="contain"
            fadeDuration={100}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View style={{ flex: 3, flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "Raleway",
              fontSize: 22,
              color: "#ababab",
              padding: 7,
            }}
          >
            {heading}
          </Text>
          <Text
            style={{ fontFamily: "Raleway", fontSize: 14, color: "#969595" }}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingComponent />;
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
              Health
            </Text>
          </View>

          <View style={{ flex: 0.1, paddingTop: 30, alignItems: "flex-start" }}>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <Icon name={"bars"} size={18} color={"#CFCFCF"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <Instructions
              imageLink={cough}
              heading="Symptoms "
              text="Common symptoms of COVID-19 include fever, dry cough, fatigue, loss of appetite, loss of smell, and body ache. In some people, COVID-19 causes more severe symptoms like high fever, severe cough, and shortness of breath, which often indicates pneumonia.

A person may have mild symptoms for about one week, then worsen rapidly. Let your doctor know if your symptoms quickly worsen over a short period of time. Also call the doctor right away if you or a loved one with COVID-19 experience any of the following emergency symptoms: trouble breathing, persistent pain or pressure in the chest, confusion or inability to arouse the person, or bluish lips or face."
            />

            <Instructions
              imageLink={socialDistance}
              heading="Social Distancing"
              text="As an individual, you can lower your risk of infection by reducing your rate of contact with other people. Avoiding public spaces and unnecessary social gatherings, especially events with large numbers of people or crowds, will lower the chance that you will be exposed to the coronavirus as well as to other infectious diseases like flu."
            />
            <Instructions
              imageLink={stayHomeStaySafe}
              heading="Stay Home Stay Safe"
              text="People who have been uncovered to the new coronavirus and who are at risk for coming down with covid-19 might practice self-quarantine. Fitness specialists advocate that self-quarantine lasts 14 days.  Weeks offer sufficient time for them to recognize whether or not or not they’ll become sick and be contagious to other humans. You might be asked to exercise self-quarantine when you have these days lower back from touring to a part of the country or the world wherein covid-19 is spreading hastily, or when you have knowingly been exposed to an inflamed individual."
            />
          </ScrollView>
        </View>
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
  body: {
    flex: 3,
  },
});
