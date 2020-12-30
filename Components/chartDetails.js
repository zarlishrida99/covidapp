import React, { useEffect, useState } from "react";
import { View, Text, Animated, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ChartDetails({ data }) {
  const [arrow, setarrow] = useState("angle-down");
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));

  const changeArrow = () => {
    if (arrow == "angle-down") {
      setarrow("angle-up");
    } else {
      setarrow("angle-down");
    }
  };

  function animateView() {
    changeArrow();
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const Information = ({ text }) => {
    return (
      <View style={{ paddingLeft: 2, paddingBottom: 12 }}>
        <Text style={{ color: "#757E88", fontFamily: "Raleway" }}>{text}</Text>
      </View>
    );
  };

  const DetailedView = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 15 }}>
        <Animated.View
          style={{ flex: 1, alignItems: "flex-end", opacity: animatedOpacity }}
        >
          <Information text="Tests" />
          <Information text="Tests Per One Million" />
          <Information text="Today Cases" />
          <Information text="Cases Per One Million" />
          <Information text="Today Deaths" />
          <Information text="Deaths Per One Million" />
          <Information text="Affected Countries" />
        </Animated.View>
        <View style={{ flex: 1, paddingLeft: 25 }}>
          <Animated.View style={{ opacity: animatedOpacity }}>
            <Information text={data.tests} />
            <Information text={data.testsPerOneMillion} />
            <Information text={data.todayCases} />
            <Information text={data.casesPerOneMillion} />
            <Information text={data.todayDeaths} />
            <Information text={data.deathsPerOneMillion} />
            <Information text={data.affectedCountries} />
          </Animated.View>
        </View>
      </View>
    );
  };

  // getting updated date and time
  const date_time = new Date(data.updated).toString();

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ flex: 1, height: 120, flexDirection: "row" }}>
        {/* square boxes */}
        <View
          style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}
        >
          <View
            style={{
              width: 12,
              height: 12,
              margin: 8,
              backgroundColor: "rgb(0,50,133)",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              margin: 8,
              backgroundColor: "rgba(5,142,85,1)",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              margin: 8,
              backgroundColor: "rgba(183,149,72,1)",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              margin: 8,
              backgroundColor: "rgba(155,5,40,1)",
            }}
          />
        </View>
        <View style={{ flex: 2, paddingTop: 4, flexDirection: "row" }}>
          <View style={{ flex: 1, paddingLeft: 5 }}>
            <Information text="Cases" customPaddingBottom={13} />
            <Information text="Recovered" customPaddingBottom={13} />
            <Information text="Critical" customPaddingBottom={10} />
            <Information text="Deaths" customPaddingBottom={13} />
          </View>
          <View style={{ flex: 2, paddingLeft: 15 }}>
            <Information text={data.cases} />
            <Information text={data.recovered} />
            <Information text={data.critical} />
            <Information text={data.deaths} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={animateView}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              paddingRight: 10,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontFamily: "Raleway", color: "#757E88" }}>
              Details{" "}
            </Text>
            <Icon name={arrow} color="#dbd9d9" size={17} />
          </View>
        </TouchableWithoutFeedback>

        {/* {Conditional Rendering of Further Details} */}
        {arrow == "angle-up" ? <DetailedView /> : null}

        {/* Updated Deatils  */}
        <View
          style={{
            flex: 1,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{ fontFamily: "Raleway", fontSize: 12, color: "#757E88" }}
          >
            Last Updated {date_time}
          </Text>
        </View>
      </View>
    </View>
  );
}
