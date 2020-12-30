import React from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";

export default Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator color="white" size="large" />
    </View>
  );
};
