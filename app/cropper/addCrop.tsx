import React from "react";
import { SafeAreaView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import CropItem from "@/components/Cropper/cropItem";

import constant from "@/expand/api";
import styles from "@/styles/cropper/addcrop";
import { router } from "expo-router";

const {} = constant;

/**
 * 土地列表
 */
const AddCrop = (props) => {
  const handleSelect = () => {
    router.push("/cropper/cropSetting");
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTop = <TopNavigationBar title="土地列表" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(props)} />;
  const _content = <CropItem cropName={"东南地块"} isDetail={false} cropDetail={"面积 100亩"} onSelect={handleSelect} keyStore={"0xD6FC9098eED3caEd2440d79d67b78c58090ab"} />;
  return (
    <SafeAreaView style={styles.addCrop}>
      {renderTop}
      {_content}
    </SafeAreaView>
  );
};

export default AddCrop;
