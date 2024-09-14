import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { px2dp } from "@/utils/px2dp";

function Content({}) {
  return (
    <View style={styles.contentBox}>
      <Text>时间轴</Text>
    </View>
  );
}

export default Content;

Content.propTypes = {};

const styles = StyleSheet.create({
  contentBox: {
    width: px2dp(335),
    alignSelf: "center",
  },
});
