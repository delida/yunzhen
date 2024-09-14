import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function Input({
  isSelect,
  name,
  placeholder,
  placeholderTextColor,
  isAddress,
  onAddress,
  scrollEnabled,
  onChangeText,
  isTips,
  tips,
  clearButtonMode,
  clearTextOnFocus,
  keyboardType,
  desc,
  maxLength,
  returnKeyLabel,
  returnKeyType,
  secureTextEntry,
  defaultValue,
  isDesc,
  onBlur,
}) {
  return (
    <View style={styles.inputBox}>
      <View style={styles.nameBox}>
        <Text style={styles.text}>{name}</Text>
        {isSelect ? <Text style={styles.sle}>*</Text> : null}
      </View>
      {isAddress ? (
        <TouchableOpacity onPress={onAddress} activeOpacity={1} style={{ width: px2dp(280) }}>
          <Text style={[isDesc ? styles.selctText : styles.noselctText]}>{desc}</Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.textBox}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          scrollEnabled={scrollEnabled}
          onChangeText={onChangeText}
          clearButtonMode={clearButtonMode}
          clearTextOnFocus={clearTextOnFocus}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyLabel={returnKeyLabel}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      )}
      {isTips ? <Text style={styles.tips}>{tips}</Text> : null}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    width: px2dp(315),
    alignSelf: "center",
    marginVertical: px2dp(10),
    borderBottomColor: "#eee",
    borderBottomWidth: px2dp(0.5),
    paddingBottom: px2dp(6),
  },
  nameBox: {
    width: px2dp(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sle: {
    marginLeft: px2dp(6),
    marginTop: px2dp(5),
    textAlign: "center",
    color: "red",
  },
  textBox: {
    width: px2dp(200),
    marginHorizontal: px2dp(6),
    paddingHorizontal: px2dp(6),
  },
  tips: {
    color: "red",
    fontSize: px2dp(12),
  },
  text: {
    // width: px2dp(50),
    // textAlign: 'justify'
  },
  selctText: {
    color: "#ccc",
    marginLeft: px2dp(10),
    marginTop: px2dp(4),
  },
  noselctText: {
    color: "#000",
    marginLeft: px2dp(10),
    marginTop: px2dp(4),
  },
});
