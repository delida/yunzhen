import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";
import Cancel from "@/assets/svg/cancel.svg";

function Input({ lebal, onChangeText, onBlur, onFocus, width, defaultValue, secureTextEntry, placeholder, onCancel, isShow, isBorder, isInput }) {
  return (
    <View style={[styles.textInput, isBorder ? styles.actionBorder : null]}>
      <View style={[styles.titleBox]}>
        <Text style={[styles.lebal, { width: px2dp(width) }]}>{lebal}</Text>
        {isInput ? (
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onFocus={onFocus}
            defaultValue={defaultValue}
            placeholderTextColor="#ccc"
          />
        ) : (
          <Text style={styles.text}>{placeholder}</Text>
        )}
      </View>
      {isShow ? (
        <TouchableOpacity activeOpacity={1} onPress={onCancel} style={styles.cancel}>
          <Cancel />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

Input.propTypes = {
  lebal: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  isShow: PropTypes.bool,
  isBorder: PropTypes.bool,
  isInput: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  defaultValue: PropTypes.string, // 输入框默认值
  width: PropTypes.number, // 宽度
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    width: px2dp(335),
    justifyContent: "space-between",
    height: px2dp(50),
    alignSelf: "center",
  },
  lebal: {
    color: "#505559",
    fontSize: px2dp(15),
    textAlign: "center",
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    width: px2dp(335),
  },
  input: {
    marginLeft: px2dp(10),
    fontSize: px2dp(14),
    width: px2dp(200),
  },
  actionBorder: {
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "rgba(187, 187, 187, 1)",
  },
  cancel: {
    position: "relative",
    left: px2dp(-36),
  },
  text: {
    marginLeft: px2dp(10),
  },
});
