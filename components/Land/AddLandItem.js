import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function AddLandItem({ placeholder, placeholderTextColor, onChangeText, isDropdown, text, isShow, element, keyboardType }) {
  return (
    <View style={styles.addTextInputBox}>
      <Text style={styles.lable}>{text}</Text>
      <View style={styles.addlanditem}>
        {isDropdown ? (
          <View style={styles.elementBox}>{element}</View>
        ) : (
          <TextInput style={styles.textInputBox} placeholder={placeholder} placeholderTextColor={placeholderTextColor} onChangeText={onChangeText} keyboardType={keyboardType} />
        )}
        {isShow ? <Text style={styles.mu}>亩</Text> : null}
      </View>
    </View>
  );
}

AddLandItem.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onChangeText: PropTypes.func,
  text: PropTypes.string,
  isShow: PropTypes.bool,
  element: PropTypes.element,
  isDropdown: PropTypes.bool,
  keyboardType: PropTypes.string,
};

export default AddLandItem;

const styles = StyleSheet.create({
  addlanditem: {
    borderWidth: px2dp(0.5),
    borderColor: "#BBBBBB",
    flexDirection: "row",
    alignItems: "center",
    width: px2dp(255),
    alignSelf: "center",
    height: px2dp(26),
    marginLeft: px2dp(10),
    borderRadius: px2dp(2),
    paddingLeft: px2dp(6),
    justifyContent: "space-between",
  },
  lable: {
    width: px2dp(64),
    fontSize: px2dp(14),
    color: "#505559",
    fontWeight: "600",
  },
  addTextInputBox: {
    marginBottom: px2dp(10),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  textInputBox: {
    // marginTop: px2dp(10),
    // height: px2dp(20),
    // lineHeight: px2dp(20),
    fontSize: px2dp(14),
    padding: Platform.OS === "android" ? px2dp(1) : 0,
  },
  mu: {
    marginRight: px2dp(12),
    fontSize: px2dp(12),
    color: "#161717",
  },
  elementBox: {
    width: "100%",
  },
});
