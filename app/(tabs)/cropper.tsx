import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import styles from "@/styles/cropper/cropper";
import AddCropItem from "@/components/Cropper/cropItem";
import Square from "@/assets/svg/square.svg";
import NavigationUtil from "@/utils/NavigationUtil";
import { router } from "expo-router";

const data = [
  {
    id: 1,
    name: "马铃薯",
    keyStore: "0xD6FC9098eED3caEd2440d79d67b78c58090ab",
    detail: "东南地块 占地 20亩",
    isShow: false,
    tips: 1,
    date: "2020-07-08",
    recommen: "推荐使用50好通用有机肥",
  },
  {
    id: 2,
    name: "烟草",
    keyStore: "0xD6FC9098eED3caEd2440d79d67b78c58090ab",
    detail: "东南地块 占地 20亩",
    isShow: false,
    tips: 0,
    date: "2020-07-08",
    recommen: "推荐使用50好通用有机肥",
  },
  {
    id: 3,
    name: "玉米",
    keyStore: "0xD6FC9098eED3caEd2440d79d67b78c58090ab",
    detail: "东南地块 占地 20亩",
    isShow: true,
    tips: 1,
    date: "2020-07-08",
    recommen: "推荐使用50好通用有机肥",
  },
];

const Cropper = (props) => {
  const [url, setUrl] = useState("http://iph.href.lu/879x200?fg=666666&bg=cccccc");
  const [crop, setCrop] = useState(data);

  const _addCrop = () => {
    router.push("/cropper/addCrop");
    // NavigationUtil.goPage({}, "AddCrop");
  };

  const handleDiagnosisDetail = () => {
    router.push("/cropper/diagnosis");
  };

  const handleEdit = () => {
    let isEdit = true; // 可以编辑
    router.push("/cropper/cropSetting");
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTop = <TopNavigationBar title="农作物改良" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} />;
  const _cropImg = <Image source={{ uri: url }} style={styles.cropImg} />;
  const _addTopContainer = (
    <View style={styles.addCropTopBox}>
      <Text style={styles.addTitle}>我的农作物</Text>
      <TouchableOpacity style={styles.addCrop} activeOpacity={1} onPress={_addCrop}>
        <Text style={styles.addText}>添加</Text>
        <Square />
      </TouchableOpacity>
    </View>
  );
  const _content = (
    <ScrollView>
      {crop &&
        crop.map((c) => (
          <AddCropItem
            key={c.id}
            cropName={c.name}
            date={c.date}
            cropDetail={c.detail}
            keyStore={c.keyStore}
            isEdit={true}
            isDetail={true}
            onDetail={() => handleDiagnosisDetail(c.id)}
            onCropEdit={() => handleEdit(c.id)}
            cropRecommen={c.recommen}
          />
        ))}
    </ScrollView>
  );
  return (
    <SafeAreaView style={styles.cropContainer}>
      {renderTop}
      {_cropImg}
      {_addTopContainer}
      {_content}
    </SafeAreaView>
  );
};

export default Cropper;
