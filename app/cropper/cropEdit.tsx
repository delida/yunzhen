import React from "react";
import { Text, SafeAreaView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";

import styles from "@/styles/cropper/editcrop";

const CropEdit = (props) => {
  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTop = <TopNavigationBar title="农作物设置" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(props)} />;
  return (
    <SafeAreaView style={styles.corpEdit}>
      {renderTop}
      <Text>农作物设置</Text>
    </SafeAreaView>
  );
};

export default CropEdit;
