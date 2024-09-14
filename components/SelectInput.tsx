import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function SelectInput({ value, onPlus, onLess, disabled, onChange }) {
  return (
    <View style={styles.selectBox}>
      <TextInput style={styles.value} placeholder={value.toString()} editable={false} placeholderTextColor="#000" onChangeText={onChange} />
      {/* <Text style={styles.value}>{value}</Text> */}
      <View style={styles.selectRight}>
        <TouchableOpacity activeOpacity={1} style={styles.plus} onPress={onPlus}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} disabled={disabled} onPress={onLess} style={styles.less}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SelectInput.propTypes = {
  value: PropTypes.number,
  onPlus: PropTypes.func,
  onLess: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SelectInput;

const styles = StyleSheet.create({
  selectBox: {
    width: px2dp(88),
    height: px2dp(32),
    borderRadius: px2dp(6),
    borderWidth: px2dp(0.5),
    borderColor: "#BBBBBB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: px2dp(6),
  },
  value: {
    color: "#333",
    padding: 0, // fix android TextInput height bug
  },
  selectRight: {
    width: px2dp(22),
    alignItems: "center",
    borderLeftColor: "#BBBBBB",
    borderLeftWidth: px2dp(0.5),
  },
  plus: {
    width: px2dp(22),
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: px2dp(0.5),
    alignItems: "center",
  },
  less: {
    width: px2dp(22),
    alignItems: "center",
  },
});
