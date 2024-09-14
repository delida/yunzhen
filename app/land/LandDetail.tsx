/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import NavigationUtil from "@/utils/NavigationUtil";

import * as ImagePicker from "expo-image-picker";

import Modal from "react-native-modal";
import CarryItem from "@/components/Land/carry";
import LandBtn from "@/components/Land/landBtn";
import { px2dp } from "@/utils/px2dp";
import constant from "@/expand/api";

import DeviceStorage from "@/utils/DeviceStorage";
import { router, useLocalSearchParams } from "expo-router";
import { requestPermissionsAsync } from "expo-media-library";
import useLand from "@/hooks/useLand";

const { upload_quality } = constant;

const LandDetail = () => {
  const { soilNo, name, area, province, district, town } = useLocalSearchParams<{
    soilNo: string;
    name: string;
    area: string;
    province: string;
    district: string;
    town: string;
  }>();
  const { uploadLandFile } = useLand();
  const [state, setState] = useState({
    soilNo,
    name,
    area,
    province,
    district,
    town,
    isVisible: false,
    isDetect: false,
  });

  const getCameraRollPermission = async () => {
    const { status } = await requestPermissionsAsync();

    if (status !== "granted") {
      alert("没有访问相册的权限！");
      return false;
    }

    return true;
  };

  const openImagePicker = async () => {
    await getCameraRollPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false, // 设置为true以允许选择多个图像
      base64: true,
    });

    const { canceled, assets: files } = result;
    if (!canceled) {
      return files[0];
    }
  };

  const _back = () => {
    router.back();
  };

  /**
   * 申请检测
   */
  const _detect = () => {
    setState((v) => ({ ...v, isVisible: true }));
  };

  // 取消
  const _exitCancle = () => {
    setState((v) => ({ ...v, isVisible: false }));
  };

  // 确定
  const _confirmSave = () => {
    setState((v) => ({ ...v, isVisible: false, isDetect: true }));
  };

  const _onConfirm = async () => {
    const file = await openImagePicker();
    let data_now = file?.base64;
    let data_type = file?.mimeType;
    if (data_type === undefined) {
      return;
    }
    let imge_type = data_type.split("/")[1];
    let data = {
      data: data_now,
      suffix: imge_type,
      soilNo: state.soilNo, // 单块土地信息
    };

    await uploadLandFile(data);
    DeviceEventEmitter.emit("message", { success: true });
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTopBar = <TopNavigationBar title="土地详情" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack()} />;
  const content = (
    <>
      <CarryItem name={"土地名称"} desc={state.name} isShow={false} />
      <CarryItem name={"占地面积"} desc={`${state.area} 亩`} isShow={false} />
      {/* <CarryItem name={"地理位置"} desc={`${this.state.province}${this.state.district}${this.state.town}`} isShow={false} /> */}
      <CarryItem name={"检测记录"} desc={"无"} onPress={_onConfirm} isShow={state.isDetect} />
    </>
  );
  const _modal = (
    <Modal isVisible={state.isVisible}>
      <View style={styles.modalBox}>
        <Text style={styles.updateTitle}>温馨提示</Text>
        <Text style={styles.updateVersion}>请联系 400-68789999 上门检测</Text>
        <View style={styles.updateFotter}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={_exitCancle}
            style={[
              styles.btn,
              {
                borderRightColor: "rgba(187, 187, 187, 1)",
                borderRightWidth: px2dp(0.5),
              },
            ]}
          >
            <Text style={styles.canleText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={_confirmSave} style={styles.btn}>
            <Text style={styles.downloadText}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  const btnFooter = (
    <View style={styles.btnFooter}>
      <LandBtn onPress={_back} backgroudColor={"#ADB4B9"} text={"返回"} />
      <LandBtn onPress={_detect} backgroudColor={"#4DAB6D"} text={"申请检测"} />
    </View>
  );
  return (
    <SafeAreaView style={styles.landDetail}>
      {_modal}
      {renderTopBar}
      {content}
      {btnFooter}
    </SafeAreaView>
  );
};

// class LandDetail extends React.PureComponent {
//   state = {
//     name: null,
//     area: null,
//     province: null,
//     district: null,
//     town: null,
//     isVisible: false,
//     isDetect: false,
//     soilNo: null,
//   };

//   componentDidMount() {
//     const { soilNo, name, area, province, district, town } = this.props.navigation.state.params;
//     this.setState({ soilNo, name, area, province, district, town });
//     console.log("soiNo", soilNo);
//   }

//   componentWillUnmount() {
//     // 页面销毁的时候，触发事件
//     DeviceEventEmitter.emit("message", { success: true });
//   }

//   /**
//    * 返回上级菜单
//    */
//   _back = () => {
//     NavigationUtil.goBack(this.props.navigation);
//   };

//   /**
//    * 申请检测
//    */
//   _detect = () => {
//     this.setState({ isVisible: true });
//   };

//   // 取消
//   _exitCancle = () => {
//     this.setState({ isVisible: false });
//   };

//   // 确定
//   _confirmSave = () => {
//     this.setState({ isVisible: false, isDetect: true });
//   };

//   //上传检测报告
//   _onConfirm = () => {
//     const { uploadLandFile } = this.props;
//     const options = {
//       title: "选择检测报告上传",
//       customButtons: [{ name: "fb", title: "关闭" }],
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//       //noData: true, // 是否启用base64
//     };
//     ImagePicker.showImagePicker(options, async (response) => {
//       // 当不选择图片时
//       if (response.didCancel !== true) {
//         let data_now = response.data;
//         let data_type = response.type;
//         let imge_type = data_type.split("/")[1];
//         let token = await DeviceStorage.get("token");
//         // this.setState({ base64: data })

//         let data = {
//           data: data_now,
//           suffix: imge_type,
//           soilNo: this.state.soilNo, // 单块土地信息
//         };
//         console.log(upload_quality + "data", data);
//         console.log("图片大小", response.fileSize);
//         /**
//          * 发送给后端 data
//          */
//         uploadLandFile(upload_quality, "POST", data, token);
//       }
//     });
//   };

//   render() {
//     const { isVisible } = this.state;
//     const StatusBar = {
//       backgroundColor: "#ffffff",
//       barStyle: "dark-content",
//     };
//     const renderTopBar = <TopNavigationBar title="土地详情" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(this.props)} />;
//     const content = (
//       <>
//         <CarryItem name={"土地名称"} desc={this.state.name} isShow={false} />
//         <CarryItem name={"占地面积"} desc={`${this.state.area} 亩`} isShow={false} />
//         <CarryItem name={"地理位置"} desc={`${this.state.province}${this.state.district}${this.state.town}`} isShow={false} />
//         <CarryItem name={"检测记录"} desc={"无"} onPress={this._onConfirm} isShow={this.state.isDetect} />
//       </>
//     );
//     const _modal = (
//       <Modal isVisible={isVisible}>
//         <View style={styles.modalBox}>
//           <Text style={styles.updateTitle}>温馨提示</Text>
//           <Text style={styles.updateVersion}>请联系 400-68789999 上门检测</Text>
//           <View style={styles.updateFotter}>
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={this._exitCancle}
//               style={[
//                 styles.btn,
//                 {
//                   borderRightColor: "rgba(187, 187, 187, 1)",
//                   borderRightWidth: px2dp(0.5),
//                 },
//               ]}
//             >
//               <Text style={styles.canleText}>取消</Text>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={1} onPress={this._confirmSave} style={styles.btn}>
//               <Text style={styles.downloadText}>确定</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//     const btnFooter = (
//       <View style={styles.btnFooter}>
//         <LandBtn onPress={this._back} backgroudColor={"#ADB4B9"} text={"返回"} />
//         <LandBtn onPress={this._detect} backgroudColor={"#4DAB6D"} text={"申请检测"} />
//       </View>
//     );
//     return (
//       <SafeAreaView style={styles.landDetail}>
//         {_modal}
//         {renderTopBar}
//         {content}
//         {btnFooter}
//       </SafeAreaView>
//     );
//   }
// }

export default LandDetail;

const styles = StyleSheet.create({
  landDetail: {
    flex: 1,
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
    width: px2dp(259),
    height: px2dp(144),
    borderRadius: px2dp(13),
    backgroundColor: "#FDFFFB",
    alignSelf: "center",
    alignItems: "center",
  },
  updateTitle: {
    fontSize: px2dp(18),
    color: "#030303",
    marginTop: px2dp(21),
  },
  updateVersion: {
    marginTop: px2dp(12),
    fontSize: px2dp(14),
    color: "#333",
  },
  updateFotter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: px2dp(44),
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: px2dp(0.5),
    borderTopColor: "rgba(187, 187, 187, 1)",
  },
  btn: {
    width: px2dp(259 / 2),
    height: px2dp(44),
    alignItems: "center",
    justifyContent: "center",
  },
  canleText: {
    color: "#E31E1E",
    fontSize: px2dp(17),
  },
  downloadText: {
    fontSize: px2dp(17),
    color: "#4DAB6D",
  },
});
