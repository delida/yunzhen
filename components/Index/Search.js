import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

import SearchIcon from "@/assets/svg/search.svg";
import CalIcon from "@/assets/svg/cal.svg";

function Search({ isShow, onFocus, onBlur, onPress, onChangeText, value }) {
  return (
    <View style={styles.searchBox}>
      <SearchIcon />
      <TextInput style={styles.textInput} placeholder="搜索地名或农作物名称" placeholderTextColor="#ADB4B9" onFocus={onFocus} onBlur={onBlur} defaultValue={value} onChangeText={onChangeText} />
      {isShow ? (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.claBox}>
          <CalIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

Search.propTypes = {
  isShow: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPress: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export { Search };

const styles = StyleSheet.create({
  searchBox: {
    width: px2dp(335),
    alignSelf: "center",
    height: px2dp(38),
    backgroundColor: "#F7F8F7",
    borderRadius: px2dp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: px2dp(8),
  },
  textInput: {
    marginLeft: px2dp(8),
    width: px2dp(280),
    height: px2dp(30),
    fontSize: px2dp(14),
  },
  claBox: {
    position: "absolute",
    top: px2dp(8),
    right: px2dp(12),
  },
});
