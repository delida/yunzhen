import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px2dp } from "@/utils/px2dp";
import PropTypes from "prop-types";
import Arrow from "@/assets/svg/arrow_al.svg";

function CarryItem({ name, desc, onPress, isShow }) {
  return (
    <View style={styles.carry}>
      <Text style={styles.name}>{name}:</Text>
      <View style={styles.descBox}>
        {isShow ? (
          <View style={styles.waitBox}>
            <Text style={styles.waitTime}>2020-02-20</Text>
            <Text style={styles.waitText}>待检测...</Text>
          </View>
        ) : (
          <Text style={[styles.desc, isShow ? styles.noAction : null]} numberOfLines={1}>
            {desc}
          </Text>
        )}
        {isShow ? (
          <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.seeBox}>
            <Text style={styles.see}>确认已检测</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

CarryItem.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isShow: PropTypes.bool,
};

export default CarryItem;

const styles = StyleSheet.create({
  carry: {
    width: px2dp(335),
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: px2dp(10),
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: px2dp(0.5),
    marginTop: px2dp(5),
  },
  name: {
    color: "#505559",
    fontSize: px2dp(14),
  },
  descBox: {
    width: px2dp(260),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  waitBox: {
    flexDirection: "column",
    marginLeft: px2dp(20),
  },
  waitTime: {
    color: "#505559",
    fontSize: px2dp(12),
  },
  waitText: {
    color: "#E85B39",
    fontSize: px2dp(12),
  },
  desc: {
    width: px2dp(180),
    color: "#030303",
    fontSize: px2dp(16),
    marginLeft: px2dp(20),
  },
  noAction: {
    color: "#ADB4B9",
    fontSize: px2dp(12),
  },
  seeBox: {
    alignItems: "center",
    backgroundColor: "#4DAB6D",
    justifyContent: "center",
    paddingHorizontal: px2dp(4),
    paddingVertical: px2dp(6),
    borderRadius: px2dp(3),
  },
  see: {
    color: "#ffffff",
    fontSize: px2dp(12),
  },
});
