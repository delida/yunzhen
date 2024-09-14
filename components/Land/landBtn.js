import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function LandBtn({ onPress, text, backgroudColor }) {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.landBtn, { backgroundColor: backgroudColor }]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

LandBtn.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  backgroudColor: PropTypes.string,
};

export default LandBtn;

const styles = StyleSheet.create({
  landBtn: {
    width: px2dp(157),
    height: px2dp(37),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: px2dp(3),
  },
  text: {
    color: "#fff",
    fontSize: px2dp(16),
    fontWeight: "500",
  },
});
