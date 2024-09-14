/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  DeviceEventEmitter, // 监听事件
} from "react-native";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import { px2dp } from "@/utils/px2dp";
import LandBtn from "@/components/Land/landBtn";
import Modal from "react-native-modal";
import ArrowDown from "@/assets/svg/arrow_down.svg";
import NavigationUtil from "@/utils/NavigationUtil";

import constant from "@/expand/api";

import addressData from "@/json/addres";
import { Toast } from "@/utils/Toast";
import DeviceStorage from "@/utils/DeviceStorage";
import { router, useLocalSearchParams } from "expo-router";
import useLand from "@/hooks/useLand";

const { upload_land } = constant;

const LandEditDetail = () => {
  const { soilNo, name, area, province, district, town, city } = useLocalSearchParams();
  const { updateLand } = useLand();
  const [state, setState] = useState({
    isVisibale: false,
    defaultIndex: 1,
    defaultValue: "北京市",
    address: null,
    selectOpt: "请输入省/市/区", // 选择的地址值
    soilNo,
    name,
    area,
    province,
    district,
    town,
    city,
  });

  const _handleChangeArea = (area) => {
    setState((v) => ({ ...v, area }));
  };

  // 土地名称
  const _handleChangeLand = (name) => {
    setState((v) => ({ ...v, name }));
  };

  const _handleTown = (town) => {
    setState((v) => ({ ...v, town }));
  };

  /** 删除 */
  const _delete = () => {
    setState((v) => ({ ...v, isVisibale: true }));
  };

  /** 确定删除 */
  const _comfiom = () => {
    setState((v) => ({ ...v, isVisibale: false }));
  };

  const _save = async () => {
    const { area, soilNo, name, province, city, district, town } = state;
    if (area && soilNo && name && province && city && district && town) {
      const data = {
        soilNo: soilNo,
        name: name,
        area: area,
        province: province,
        city: city,
        district: district,
        town: town,
      };
      await updateLand(data);
      DeviceEventEmitter.emit("editLand", { editLand: "success" });
      router.back();
      console.log("data", data);
      // 更新完成后返回上一级页面
    } else {
      Toast.showToast("字段不能为空");
      return false;
    }
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTopBar = <TopNavigationBar title="编辑土地" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack()} />;
  const _ceditContent = (
    <View style={styles.editBox}>
      <View style={[styles.landRow, styles.landNameBox]}>
        <Text style={styles.name}>土地名称</Text>
        <TextInput placeholder={state.name} style={[styles.txetInput, styles.fixAndroidTextInput]} placeholderTextColor="#888" onChangeText={_handleChangeLand} />
      </View>
      <View style={[styles.landRow, styles.landAreaBox]}>
        <Text style={[styles.name]}>占地面积</Text>
        <View style={styles.landRow}>
          <TextInput style={[styles.txetInput, styles.fixAndroidTextInput]} placeholder={`${state.area}`} keyboardType="numeric" placeholderTextColor="#888" onChangeText={_handleChangeArea} />
          <Text style={styles.muText}>亩</Text>
        </View>
      </View>
      {/* <View style={[styles.landRow, styles.landPosistionBox]}>
        <Text style={styles.name}>地理位置</Text>
        <View
          style={[
            styles.txetInput,
            {
              justifyContent: "space-between",
              paddingRight: px2dp(10),
            },
          ]}
        >
          <TouchableOpacity style={{ width: px2dp(255) }} onPress={this._showPicker} activeOpacity={1}>
            <Text style={styles.cityText}>{state.selectOpt}</Text>
          </TouchableOpacity>
          <ArrowDown width={10} height={10} style={{ marginRight: px2dp(8) }} />
        </View>
      </View> */}
      {/* <View style={[styles.landRow, styles.addressBox]}>
        <TextInput style={[styles.txetInput, styles.fixAndroidTextInput]} placeholder={`${state.town}`} placeholderTextColor="#888" onChangeText={_handleTown} />
      </View> */}
    </View>
  );
  const _btnFooter = (
    <View style={styles.btnFooter}>
      <LandBtn onPress={_delete} backgroudColor={"#E83939"} text={"删除"} />
      <LandBtn onPress={_save} backgroudColor={"#4DAB6D"} text={"完成"} />
    </View>
  );
  const _modal = (
    <Modal isVisible={state.isVisibale}>
      <View style={styles.modalBox}>
        <Text style={styles.modalTitle}>确定删除改土地?</Text>
        <TouchableOpacity style={styles.btnBox} activeOpacity={1} onPress={_comfiom}>
          <Text style={styles.btnText}>确定</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={styles.landEditDetail}>
      {_modal}
      {renderTopBar}
      {_ceditContent}
      {_btnFooter}
    </SafeAreaView>
  );
};

// class LandEditDetail extends React.PureComponent {
//   state = {
//     isVisibale: false,
//     defaultIndex: 1,
//     defaultValue: "北京市",
//     address: null,
//     area: null,
//     name: null,
//     province: null,
//     district: null,
//     town: null,
//     soilNo: null,
//     selectOpt: "请输入省/市/区", // 选择的地址值
//     city: null,
//   };

//   componentDidMount() {
//     const { soilNo, name, area, province, district, town, city } = this.props.navigation.state.params;
//     console.log("city", city);
//     let templateSelectOpt = "";
//     if (city === "直辖市") {
//       templateSelectOpt = `${province}${district}`;
//     } else {
//       templateSelectOpt = `${city}${province}${district}`;
//     }
//     this.setState({
//       soilNo,
//       name,
//       area,
//       province,
//       district,
//       town,
//       city,
//       selectOpt: templateSelectOpt,
//     });
//   }

//   componentWillUnmount() {
//     // 返回上级页面时，发送监听
//     DeviceEventEmitter.emit("editLand", { editLand: "success" });
//   }

//   _handleTown = (town) => {
//     this.setState({ town });
//   };

//   // 占地面积
//   _handleChangeArea = (area) => {
//     this.setState({ area });
//   };

//   // 土地名称
//   _handleChangeLand = (name) => {
//     this.setState({ name });
//   };

//   /** 删除 */
//   _delete = () => {
//     this.setState({
//       isVisibale: true,
//     });
//   };
//   /*
//    * 保存时请求接口，将参数发给服务器
//    */
//   _save = async () => {
//     const { area, soilNo, name, province, city, district, town } = this.state;
//     const { updateLand } = this.props;

//     if (area && soilNo && name && province && city && district && town) {
//       let token = await DeviceStorage.get("token");
//       const data = {
//         soilNo: soilNo,
//         name: name,
//         area: area,
//         province: province,
//         city: city,
//         district: district,
//         town: town,
//       };
//       updateLand(upload_land, "POST", data, token);
//       console.log("data", data);
//       // 更新完成后返回上一级页面
//       NavigationUtil.goBack(this.props.navigation);
//     } else {
//       Toast.showToast("字段不能为空");
//       return false;
//     }
//   };

//   /**
//    * 选择地址
//    */
//   handlePickerConfirm = (data) => {
//     if (data.length !== 0) {
//       let temp_city = data[1];
//       let temp_district = data[2];
//       let temp_province = data[0];
//       this.setState({
//         city: temp_city,
//         district: temp_district,
//         province: temp_province,
//       });
//       if (data[0] === "直辖市") {
//         let temp_data = data.slice(1, data.length);
//         let str = temp_data.join("");
//         this.setState({ selectOpt: str });
//       } else {
//         let str = data.join("");
//         this.setState({ selectOpt: str });
//       }
//     }
//     return false;
//   };

//   _showPicker = () => {
//     Picker.init({
//       pickerData: addressData,
//       selectedValue: [1],
//       pickerConfirmBtnText: "确定",
//       pickerCancelBtnText: "取消",
//       pickerTitleText: "请选择地址",
//       onPickerConfirm: this.handlePickerConfirm,
//     });
//     Picker.show();
//   };

//   /** 确定删除 */
//   _comfiom = () => {
//     this.setState({
//       isVisibale: false,
//     });
//   };
//   render() {
//     const StatusBar = {
//       backgroundColor: "#ffffff",
//       barStyle: "dark-content",
//     };
//     const renderTopBar = <TopNavigationBar title="编辑土地" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(this.props)} />;
//     const _ceditContent = (
//       <View style={styles.editBox}>
//         <View style={[styles.landRow, styles.landNameBox]}>
//           <Text style={styles.name}>土地名称</Text>
//           <TextInput placeholder={this.state.name} style={[styles.txetInput, styles.fixAndroidTextInput]} placeholderTextColor="#888" onChangeText={this._handleChangeLand} />
//         </View>
//         <View style={[styles.landRow, styles.landAreaBox]}>
//           <Text style={[styles.name]}>占地面积</Text>
//           <View style={styles.landRow}>
//             <TextInput
//               style={[styles.txetInput, styles.fixAndroidTextInput]}
//               placeholder={`${this.state.area}`}
//               keyboardType="numeric"
//               placeholderTextColor="#888"
//               onChangeText={this._handleChangeArea}
//             />
//             <Text style={styles.muText}>亩</Text>
//           </View>
//         </View>
//         <View style={[styles.landRow, styles.landPosistionBox]}>
//           <Text style={styles.name}>地理位置</Text>
//           <View
//             style={[
//               styles.txetInput,
//               {
//                 justifyContent: "space-between",
//                 paddingRight: px2dp(10),
//               },
//             ]}
//           >
//             <TouchableOpacity style={{ width: px2dp(255) }} onPress={this._showPicker} activeOpacity={1}>
//               <Text style={styles.cityText}>{this.state.selectOpt}</Text>
//             </TouchableOpacity>
//             <ArrowDown width={10} height={10} style={{ marginRight: px2dp(8) }} />
//           </View>
//         </View>
//         <View style={[styles.landRow, styles.addressBox]}>
//           <TextInput style={[styles.txetInput, styles.fixAndroidTextInput]} placeholder={`${this.state.town}`} placeholderTextColor="#888" onChangeText={this._handleTown} />
//         </View>
//       </View>
//     );
//     const _btnFooter = (
//       <View style={styles.btnFooter}>
//         <LandBtn onPress={this._delete} backgroudColor={"#E83939"} text={"删除"} />
//         <LandBtn onPress={this._save} backgroudColor={"#4DAB6D"} text={"完成"} />
//       </View>
//     );
//     const _modal = (
//       <Modal isVisible={this.state.isVisibale}>
//         <View style={styles.modalBox}>
//           <Text style={styles.modalTitle}>确定删除改土地?</Text>
//           <TouchableOpacity style={styles.btnBox} activeOpacity={1} onPress={this._comfiom}>
//             <Text style={styles.btnText}>确定</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     );
//     return (
//       <SafeAreaView style={styles.landEditDetail}>
//         {_modal}
//         {renderTopBar}
//         {_ceditContent}
//         {_btnFooter}
//       </SafeAreaView>
//     );
//   }
// }

export default LandEditDetail;

const styles = StyleSheet.create({
  landEditDetail: {
    flex: 1,
  },
  editBox: {
    width: px2dp(335),
    alignSelf: "center",
  },
  landRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: px2dp(6),
  },
  txetInput: {
    borderWidth: px2dp(0.5),
    borderColor: "#BBBBBB",
    borderStyle: "solid",
    width: px2dp(278),
    height: px2dp(30),
    borderRadius: px2dp(3),
    marginLeft: px2dp(6),
    paddingLeft: px2dp(6),
    alignItems: "center",
    flexDirection: "row",
  },
  fixAndroidTextInput: {
    paddingTop: Platform.OS === "ios" ? 0 : px2dp(9),
  },
  muText: {
    position: "relative",
    right: px2dp(18),
  },
  addressBox: {
    justifyContent: "flex-end",
  },
  btnFooter: {
    width: px2dp(335),
    flexDirection: "row",
    position: "absolute",
    bottom: px2dp(120),
    alignSelf: "center",
    justifyContent: "space-between",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: px2dp(260),
    alignSelf: "center",
    borderRadius: px2dp(6),
    height: px2dp(120),
    alignItems: "center",
  },
  modalTitle: {
    marginVertical: px2dp(30),
    fontSize: px2dp(16),
    color: "red",
  },
  btnBox: {
    borderTopColor: "#bbb",
    borderTopWidth: px2dp(0.5),
    width: "100%",
    alignItems: "center",
    height: px2dp(40),
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  btnText: {
    fontSize: px2dp(16),
    color: "#4DAB6D",
  },
  dropdownStyle: {
    width: px2dp(260),
    backgroundColor: "red",
  },
  dropdownTextStyle: {
    color: "#101010",
    fontSize: px2dp(12),
    // backgroundColor: 'rgba(136, 136, 136, 1)'
  },
  textStyle: {
    color: "#101010",
    fontSize: px2dp(12),
  },
  name: {
    color: "#333",
    fontSize: px2dp(13),
  },
  cityText: {
    color: "#888",
  },
});
