/* eslint-disable no-shadow */
import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import NavigationUtil from "@/utils/NavigationUtil";

import constant from "@/expand/api";
import DeviceStorage from "@/utils/DeviceStorage";
import { width, height } from "@/utils/px2dp";

const { refreshtoken } = constant;

class Welcom extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: width,
            height: height,
          }}
          source={require("@/assets/svg/logo.png")}
        />
      </View>
    );
  }
}

export default Welcom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
