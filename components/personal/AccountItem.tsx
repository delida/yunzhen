import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { px2dp } from "@/utils/px2dp";

import ArrowRight from "@/assets/svg/arrow_right.svg";

function AccountItem({ text, onChange, message, isShow, isIcon, showAvatar, avatar_url }) {
  return (
    <TouchableOpacity style={styles.accountItemContainer} activeOpacity={1} onPress={onChange}>
      <Text style={styles.accountName}>{text}</Text>
      {showAvatar ? (
        <View style={styles.arrowBox}>
          <View style={styles.avatar}>
            <Image style={styles.avatar} source={{ uri: avatar_url }} />
            {/* <ImageSvg width={22} height={22} /> */}
          </View>
          <ArrowRight width={20} height={20} />
        </View>
      ) : (
        <View style={styles.arrowBox}>
          {isShow ? <Text style={[styles.message, isIcon ? null : styles.noAction]}>{message}</Text> : null}
          {isIcon ? <ArrowRight width={20} height={20} /> : null}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default AccountItem;

const styles = StyleSheet.create({
  accountItemContainer: {
    width: px2dp(335),
    height: px2dp(56),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "rgba(187, 187, 187, 1)",
    alignSelf: "center",
    paddingLeft: px2dp(2),
  },
  arrowBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountName: {
    fontSize: px2dp(15),
    color: "#505559",
  },
  message: {
    width: "auto",
    flexDirection: "row",
    maxWidth: px2dp(200),
    color: "#8CA2AA",
    fontSize: px2dp(14),
  },
  noAction: {
    marginRight: px2dp(6),
    color: "#505559",
    fontSize: px2dp(14),
  },
  avatar: {
    width: px2dp(51),
    height: px2dp(47),
    borderRadius: px2dp(10),
    //backgroundColor: '#E1E3E6',
    alignItems: "center",
    justifyContent: "center",
  },
});
