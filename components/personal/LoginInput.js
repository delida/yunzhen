import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { px2dp } from "@/utils/px2dp";
import PropTypes from "prop-types";

function LoginInput({ onChangeText, placeholder, placeholderTextColor, secureTextEntry }) {
  return (
    <View style={styles.loginBox}>
      <TextInput onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={placeholderTextColor} secureTextEntry={secureTextEntry} />
    </View>
  );
}

LoginInput.porpTypes = {
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default LoginInput;

const styles = StyleSheet.create({
  loginBox: {
    width: px2dp(335),
    height: px2dp(42),
    alignSelf: "center",
    borderBottomColor: "rgba(187, 187, 187, 1)",
    borderBottomWidth: px2dp(0.5),
    flexDirection: "row",
    alignItems: "center",
  },
});
