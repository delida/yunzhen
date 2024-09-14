import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import ProgressItem from "@/components/Progress/ProgressItem";

import { px2dp } from "@/utils/px2dp";

import constant from "@/expand/api";
import { router } from "expo-router";

const {} = constant;

/* 改良进度 */
class Progress extends React.Component {
  state = {
    list: [
      {
        id: 1001,
        name: "东南土地",
        detail: "面积 50亩",
        recommen: "推荐50号通用有机肥",
        keyStore: "0xD6FC9098eED3caEd2440d79d67b8Ec58090ab",
      },
      {
        id: 1002,
        name: "东南土地",
        detail: "面积 50亩",
        recommen: "推荐50号通用有机肥",
        keyStore: "0xD6FC9098eED3caEd2440d79d67b8Ec58090ab",
      },
    ],
  };

  _onDetail = () => {
    router.push("/cropper/diagnosis");
  };

  render() {
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    const topBar = <TopNavigationBar title="改良进度" statusBar={StatusBar} style={{ backgroundColor: "#fff" }} />;
    const _content = (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.state.list.map((p) => (
          <View style={styles.progressWrap} key={p.id}>
            <ProgressItem onDetail={this._onDetail} cropName={p.name} cropDetail={p.detail} cropRecommen={p.recommen} keyStore={p.keyStore} />
          </View>
        ))}
      </ScrollView>
    );
    return (
      <SafeAreaView style={styles.container}>
        {topBar}
        {_content}
      </SafeAreaView>
    );
  }
}

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContentBox: {},
  progressWrap: {
    borderTopColor: "#BBBBBB",
    borderTopWidth: px2dp(0.5),
    marginBottom: px2dp(10),
  },
});
