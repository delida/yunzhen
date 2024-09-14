import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { px2dp } from "@/utils/px2dp";
import PropTypes from "prop-types";

function AddressItem({ lable, desc, isDetail, onChangeText, onPress, placeholder }) {
  return (
    <View style={styles.addressItem}>
      <Text style={styles.lable}>{lable}</Text>
      <View style={styles.selectBox}>
        {isDetail ? (
          <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor="#ddd" />
        ) : (
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Text style={styles.text}>{desc}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

AddressItem.propTypes = {
  lable: PropTypes.string,
  desc: PropTypes.string,
  isDetail: PropTypes.bool, // 是否是详细地址
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
  placeholder: PropTypes.string,
};

export default AddressItem;

const styles = StyleSheet.create({
  addressItem: {
    width: px2dp(340),
    height: px2dp(52),
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "rgba(187, 187, 187, 1)",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  selectBox: {
    marginLeft: px2dp(9),
    width: px2dp(260),
    height: px2dp(30),
    borderRadius: px2dp(6),
    borderWidth: px2dp(0.5),
    borderColor: "rgba(187, 187, 187, 1)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: px2dp(10),
  },
  lable: {
    color: "#101010",
    fontSize: px2dp(15),
  },
  text: {
    color: "#505559",
    fontSize: px2dp(14),
  },
  input: {
    height: px2dp(26),
    width: px2dp(230),
    fontSize: px2dp(14),
    paddingVertical: 0, // 解决输入框文字不能显示全bug
  },
});
