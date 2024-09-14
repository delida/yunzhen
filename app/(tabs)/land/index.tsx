/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  DeviceEventEmitter, // 监听事件
} from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import NavigationUtil from "@/utils/NavigationUtil";
import LandItem from "@/components/Land/land";
import DeviceStorage from "@/utils/DeviceStorage";

import constant from "@/expand/api";

import { formatArr } from "@/utils/tools";
import styles from "@/styles/land/land";
import { Toast } from "@/utils/Toast";

// svg
import Plus from "@/assets/svg/plus.svg";
import useLand from "@/hooks/useLand";
import { router } from "expo-router";
import useLandStore from "@/stores/land";

const { get_soild_list, update_notification, message_url } = constant;

const Land = () => {
  const [state, setState] = useState({
    url: "http://iph.href.lu/879x200?fg=666666&bg=cccccc",
    cropNo: null,
    soilNo: null,
    soil_arr: [],
    soild_list: {},
    soil_info: null, // 未读消息数量
  });

  const { getSolidListData } = useLand();

  const { landList } = useLandStore();

  const _content = useCallback(() => {
    // const soild_list = this.props.soild_list;
    const soild_list = landList;

    return (
      <ScrollView>
        {(soild_list || []).map?.((c) => {
          return (
            <LandItem
              key={c.soilNo}
              name={c.name}
              area={c.area}
              isShowRound={false}
              isEdit={true}
              isDetail={true}
              onDiagnosis={() => _handleLandDetail(c.soilNo)}
              onEdit={() => handleEdit(c.soilNo, c.name, c.area, c.province, c.district, c.town, c.city)}
              onDetail={() => _golandDetail(c.soilNo, c.name, c.area, c.province, c.district, c.town, false)}
            />
          );
        })}
      </ScrollView>
    );

    //
    // console.log('this state soild_list', soild_list);
    if (soild_list === undefined) {
      return (
        <View>
          <Text style={styles.loading}>加载中...</Text>
        </View>
      );
    } else if (soild_list.success == false && soild_list.statusCode == 509) {
      return (
        <View>
          <Text style={styles.loading}>登录过期，请重新登录</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          {(soild_list || []).map?.((c) => {
            return (
              <LandItem
                key={c.soilNo}
                name={c.name}
                area={c.area}
                isShowRound={false}
                isEdit={true}
                isDetail={true}
                onDiagnosis={() => _handleLandDetail(c.soilNo)}
                onEdit={() => handleEdit(c.soilNo, c.name, c.area, c.province, c.district, c.town, c.city)}
                onDetail={() => _golandDetail(c.soilNo, c.name, c.area, c.province, c.district, c.town, soil_arr?.includes(c.soilNo))}
              />
            );
          })}
        </ScrollView>
      );
    }
  }, [landList]);

  const _messageEventEmitr = () => {
    DeviceEventEmitter.emit("cancle_message", { success: true });
  };

  const _addEventlistener = () => {
    DeviceEventEmitter.addListener("addLand", (event) => {
      if (event.addLand === "success") {
        getSolidListData();
      }
    });
    DeviceEventEmitter.addListener("editLand", (event) => {
      if (event.editLand === "success") {
        getSolidListData();
      }
    });

    // 登录成功后
    DeviceEventEmitter.addListener("login", (event) => {
      if (event.success === true) {
        getSolidListData();
        // _getusermessage(); // 获取消息
      }
    });

    // 监听退出
    DeviceEventEmitter.addListener("login_out", (event) => {
      if (event.success === true) {
        getSolidListData();
      }
    });
  };

  // 添加我的土地
  const handleAddLand = () => {
    router.push("/land/AddLand");
  };

  // 土地详情
  const _handleLandDetail = (soilNo) => {
    router.push("/land/DiagnosisDetail");
  };

  const _golandDetail = (soilNo, name, area, province, district, town, bol) => {
    // this._updateMessage(soilNo, bol); // 删除土地消息提示
    // this._getusermessage(); // 重新获取数据
    router.push({
      pathname: "/land/LandDetail",
      params: {
        soilNo: soilNo,
        name: name,
        area: area,
        province: province,
        district: district,
        town: town,
      },
    });
    // NavigationUtil.goPage(
    //   {
    //     soilNo: soilNo,
    //     name: name,
    //     area: area,
    //     province: province,
    //     district: district,
    //     town: town,
    //   },
    //   "LandDetail"
    // );
  };

  // 编辑土地
  const handleEdit = (soilNo, name, area, province, district, town, city) => {
    router.push({
      pathname: "/land/landEditDetail",
      params: {
        soilNo: soilNo,
        name: name,
        area: area,
        province: province,
        district: district,
        town: town,
        city: city,
      },
    });
    // NavigationUtil.goPage(
    //   {
    //     soilNo: soilNo,
    //     name: name,
    //     area: area,
    //     province: province,
    //     district: district,
    //     town: town,
    //     city: city,
    //   },
    //   "LandEditDetail"
    // );
  };

  // 添加我的土地功能
  const _addLand = (
    <TouchableOpacity style={styles.addlandBox} activeOpacity={1} onPress={handleAddLand}>
      <Text style={styles.addLandText}>添加土地</Text>
    </TouchableOpacity>
  );

  // top bar
  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTopBar = (
    <TopNavigationBar
      title="我的土地"
      statusBar={StatusBar}
      style={{ backgroundColor: "#FEFFFE" }}
      // rightButton={_addLand}
    />
  );
  const _landImg = <Image source={{ uri: state.url }} style={styles.landImg} />;

  useEffect(() => {
    _addEventlistener();
  }, []);

  useEffect(() => {
    getSolidListData();
  }, []);

  // const _getusermessage = async () => {
  //   const { getMessageInfo } = this.props;
  //   const data = null;
  //   let token = await DeviceStorage.get("token");
  //   getMessageInfo(message_url, "GET", data, token);
  //   setTimeout(() => {
  //     let soil = this.props.message.data.data.soil;
  //     console.log("获取消息成功", soil);
  //     let save_soil = formatArr(soil);
  //     setTimeout(() => {
  //       this.setState({ soil_arr: save_soil });
  //     }, 200);
  //     this._formatMessage(soil);
  //   }, 2000);
  // };

  // // 获取返回的信息
  // const _formatMessage = async (soil) => {
  //   try {
  //     console.log("soil", soil);
  //     if (soil == null) {
  //       return;
  //     } else {
  //       // 处理异常
  //       try {
  //         let arr = [];
  //         let arr2 = [];
  //         let key = [];
  //         for (let i in soil) {
  //           arr.push(soil[i]);
  //         }
  //         for (let j of arr) {
  //           if (j !== "0") {
  //             arr2.push(j++);
  //             key.push(arr[j]);
  //           }
  //         }
  //         let length = arr2.length;
  //         // console.log('消息长度', length);
  //         await DeviceStorage.save("soil_num", length);
  //         DeviceEventEmitter.emit("message_info", { success: true });
  //       } catch (err) {
  //         console.log("formatArr err", err);
  //       }
  //     }
  //   } catch (err) {
  //     console.log("message err", err);
  //   }
  // };
  return (
    <SafeAreaView style={styles.landContainer}>
      {renderTopBar}
      {_landImg}
      {_addLand}
      {_content()}
    </SafeAreaView>
  );
};

export default Land;
