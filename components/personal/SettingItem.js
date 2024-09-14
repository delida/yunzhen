import React from "react";
import PropTyes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px2dp } from "@/utils/px2dp";

import ArrowRight from "@/assets/svg/arrow_right.svg";

function SettingItem({ onChange, text, isActive, isShow, icon }) {
  return (
    <TouchableOpacity style={[styles.settingContainer, isActive ? styles.activeSetting : null]} onPress={onChange} activeOpacity={1}>
      <View style={[styles.settingLeftIconBox]}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.settingRightIconBox}>
        <View style={[isShow ? styles.message : null]} />
        <ArrowRight width={27} height={27} />
      </View>
    </TouchableOpacity>
  );
}

SettingItem.propTypes = {
  onChange: PropTyes.func,
  isActive: PropTyes.bool,
  text: PropTyes.string,
  isShow: PropTyes.bool,
  icon: PropTyes.element,
};

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: px2dp(335),
    paddingVertical: px2dp(12),
  },
  activeSetting: {
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "rgba(187, 187, 187, 1)",
  },
  settingLeftIconBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: px2dp(20),
  },
  settingRightIconBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: px2dp(7),
  },
  message: {
    width: px2dp(10),
    height: px2dp(10),
    backgroundColor: "#E31E1E",
    borderRadius: px2dp(5),
  },
  text: {
    fontSize: px2dp(15),
    color: "rgba(80, 85, 89, 1)",
    marginLeft: px2dp(12),
  },
});

export default SettingItem;
