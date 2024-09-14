import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import { px2dp } from "@/utils/px2dp";
import styles from "@/styles/personal/about";

const AboutPage = (props) => {
  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  return (
    <SafeAreaView style={styles.aboutContainer}>
      <TopNavigationBar title="关于墨珩" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack(props)} />
      <View style={styles.aboutBox}>
        <Text style={styles.desc}>
          上海墨珩网络科技有限公司 (简称:墨珩科技)
          成立于2018年，是由来自硅谷的专家与国内区块链行业资深人士联合创建，拥有六年研发经验的世界顶级全栈区块链团队，已申请近20项知识产权发明专利，通过上海区块链企业认定、ISO质量管理体系认证，是掌握区块链核心技术与应用解决方案的科创企业。
        </Text>
        <Text style={[styles.desc, { marginTop: px2dp(40) }]}>商务合作 ：qteng@moheng.ai</Text>
        <Text style={[styles.desc]}>市场合作 ：zbchu@moheng.ai</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutPage;
