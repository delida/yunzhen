/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import NavigationUtil from "@/utils/NavigationUtil";
import AddLandItem from "@/components/Land/AddLandItem";
import addressData from "@/json/addres";

import constant from "@/expand/api";
import { Toast } from "@/utils/Toast";
import DeviceStorage from "@/utils/DeviceStorage";
import ArrowDown from "@/assets/svg/arrow_down.svg";
import styles from "@/styles/land/addland";
import useLand from "@/hooks/useLand";
import { router } from "expo-router";

const { add_land } = constant;

const AddLand = () => {
  const { addLand } = useLand();
  const [state, setState] = useState({
    name: null,
    area: null,
    selectOpt: "请输入省/市/区",
    province: "直辖市",
    city: "北京市",
    district: "东城区",
    town: "xxx街道",
  });

  const handName = (name) => {
    setState((v) => ({ ...v, name }));
  };

  const handArea = (area) => {
    setState((v) => ({ ...v, area }));
  };

  const handTown = (town) => {
    setState((v) => ({ ...v, town }));
  };

  // 保存
  const handleSave = async () => {
    const { name, area, province, district, town, city } = state;

    if ((name && area && province && district && town && city) !== null) {
      const data = {
        name: name,
        area: area,
        province: province,
        city: city,
        district: district,
        town: town,
      };
      await addLand(state);
      DeviceEventEmitter.emit("addLand", { addLand: "success" });
      router.back();
      //   NavigationUtil.goBack(this.props.navigation);
    } else {
      Toast.showToast("字段不能为空");
      return false;
    }
  };
  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTopBar = <TopNavigationBar title="添加土地" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack()} />;
  const _textInput = (
    <>
      <AddLandItem text={"土地名称"} placeholder={"输入名称"} placeholderTextColor={"#888"} onChangeText={handName} />
      <AddLandItem text={"占地面积"} placeholder={"输入面积"} placeholderTextColor={"#888"} onChangeText={handArea} isShow={true} keyboardType={"number-pad"} />
      {/* <View style={styles.seleOpt}>
        <Text style={styles.seleOptText}>地理位置</Text>
        <TouchableOpacity style={styles.seleOptInpt} onPress={this._showPicker} activeOpacity={1}>
          <Text style={styles.cityText}>{this.state.selectOpt}</Text>
          <ArrowDown width={10} height={10} style={styles.arrowdown} />
        </TouchableOpacity>
      </View>
      <AddLandItem placeholder={"请输入详细地址信息"} placeholderTextColor={"#888"} onChangeText={this.handTown} /> */}
    </>
  );
  const _save = (
    <TouchableOpacity style={styles.saveBox} activeOpacity={1} onPress={handleSave}>
      <Text style={styles.saveText}>确定</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.addLandContainer}>
      {renderTopBar}
      {_textInput}
      {_save}
    </SafeAreaView>
  );
};

export default AddLand;
