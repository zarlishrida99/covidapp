import React, { useState, useEffect } from "react";
import { View, Dimensions, Animated } from "react-native";
import { LinearGradient, Stop, Defs } from "react-native-svg";
import { BarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";

const screenWidth = Dimensions.get("window").width - 20;

export default function Chart({ worldData }) {
  const [animatedOpacity, setanimatedOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    animateView();
  });

  function animateView() {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }

  const data1 = [worldData.cases].map((value) => ({ value }));
  const data2 = [worldData.recovered].map((value) => ({ value }));
  const data3 = [worldData.critical].map((value) => ({ value }));
  const data4 = [worldData.deaths].map((value) => ({ value }));
  const barData = [
    {
      value: worldData.cases,
      data: data1,
      svg: {
        fill: "url(#gradient1)",
      },
    },
    {
      value: worldData.recovered,
      data: data2,
      svg: {
        fill: "url(#gradient2)",
      },
    },
    {
      value: worldData.critical,
      data: data3,
      svg: {
        fill: "url(#gradient3)",
      },
    },
    {
      value: worldData.deaths,
      data: data4,
      svg: {
        fill: "url(#gradient4)",
      },
    },
  ];
  const Gradient1 = () => (
    <Defs key={"gradient1"}>
      <LinearGradient id={"gradient1"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgb(93,148,239)"} />
        <Stop offset={"100%"} stopColor={"rgb(0,50,133)"} />
      </LinearGradient>
    </Defs>
  );

  const Gradient2 = () => (
    <Defs key={"gradient2"}>
      <LinearGradient id={"gradient2"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgba(5,220,85,1)"} />
        <Stop offset={"100%"} stopColor={"rgba(5,142,85,1)"} />
      </LinearGradient>
    </Defs>
  );

  const Gradient3 = () => (
    <Defs key={"gradient3"}>
      <LinearGradient id={"gradient3"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgba(255,170,72,1)"} />
        <Stop offset={"100%"} stopColor={"rgba(183,149,72,1)"} />
      </LinearGradient>
    </Defs>
  );
  const Gradient4 = () => (
    <Defs key={"gradient4"}>
      <LinearGradient id={"gradient4"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgba(220,57,81,1)"} />
        <Stop offset={"100%"} stopColor={"rgba(155,5,40,1)"} />
      </LinearGradient>
    </Defs>
  );
  return (
    <Animated.View
      style={{
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        opacity: animatedOpacity,
      }}
    >
      <YAxis
        data={barData}
        style={{
          width: 50,
          height: 211,
          color: "#CFCFCF",
          marginRight: 8,
        }}
        svg={{
          fill: "#CFCFCF",
          fontSize: 11,
        }}
        spacing={0}
        min={0}
        max={worldData.cases + worldData.cases / 6}
        yAccessor={({ value, index }) => value}
        contentInset={{ top: 5, bottom: 3 }}
        formatLabel={(value, index) => value}
      />

      <View
        style={{
          borderLeftWidth: 2,
          borderLeftColor: "#CFCFCF",
          borderBottomWidth: 2,
          borderBottomColor: "#CFCFCF",
        }}
      >
        <BarChart
          style={{ height: 200, width: 250, borderLeftColor: "#CFCFCF" }}
          data={barData}
          spacingInner={0.5}
          spacingOuter={0}
          animate={true}
          showGrid={true}
          gridMax={worldData.cases + worldData.cases / 6}
          animationDuration={1000}
          gridMin={0}
          svg={{ fill: "#fff", borderLeftColor: "#fff" }}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 0, bottom: 0 }}
        >
          <Grid />
          <Gradient1 />
          <Gradient2 />
          <Gradient3 />
          <Gradient4 />
        </BarChart>
      </View>
    </Animated.View>
  );
}
