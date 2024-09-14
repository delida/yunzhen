import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function Button({ onChange, text, color, backgroundColor }) {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.buttonContainer, { backgroundColor: backgroundColor }]} onPress={onChange}>
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: px2dp(157),
    height: px2dp(37),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: px2dp(14),
  },
});

export default Button;
