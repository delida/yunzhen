import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { px2dp } from "@/utils/px2dp";
import Swiper from "react-native-swiper";

function SwiperItem({ url }) {
  return (
    <View style={styles.swiperBox}>
      <Swiper paginationStyle={{ bottom: px2dp(10) }} autoplay={true} loop={true} style={{ height: px2dp(193) }}>
        <Image
          style={{
            width: px2dp(335),
            height: px2dp(193),
          }}
          source={{
            uri: "https://www.dute.org/imgplaceholder/800x240",
          }}
        />
        <Image
          style={{
            width: px2dp(335),
            height: px2dp(193),
          }}
          source={{
            uri: "https://www.dute.org/imgplaceholder/800x240",
          }}
        />
      </Swiper>
    </View>
  );
}

export { SwiperItem };

const styles = StyleSheet.create({
  swiperBox: {
    width: px2dp(335),
    height: px2dp(193),
    alignSelf: "center",
    marginTop: px2dp(8),
    borderRadius: px2dp(3),
    overflow: "hidden",
  },
});
