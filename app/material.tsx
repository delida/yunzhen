import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, DeviceEventEmitter } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";

import styles from "@/styles/personal/material";
import Input from "@/components/Input";

import { GoBack } from "@/utils/GoBack";

import constant from "@/expand/api";
import addressData from "@/json/addres";
import { Toast } from "@/utils/Toast";
import Modal from "react-native-modal";
import DeviceStorage from "@/utils/DeviceStorage";
import { request } from "@/expand/request";
import { Loading } from "@/utils/Loading";
import { router, useLocalSearchParams } from "expo-router";
// import SlidePicker from "react-native-slidepicker";

const { register } = constant;

const MaterialPage = (props) => {
  const { mobile: _mobile, code: _code } = useLocalSearchParams<{ mobile: string; code: string }>();
  const [nickname, setNickName] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [nowPassword, setNowPassword] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(_mobile);
  const [code, setCode] = useState(_code);
  const [token, setToken] = useState("");
  const [selectOpt, setSelectOpt] = useState("直辖市/北京市市/东城区");
  const [city, setCity] = useState("直辖市");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("北京市");
  const [district, setDistrict] = useState("东城区");
  const [isVisible, setIsVisible] = useState(true);
  const [keyStore, setKeyStore] = useState("keystore");
  const [accountAddress, setAccountAddress] = useState("account address");
  const [isDesc, setIsDesc] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setMobile(_mobile);
    setCode(_code);
  }, [_mobile, _code]);

  const _onUsernameBlur = () => {
    console.log("用户失去焦点验证");
  };

  const _onPasswordBlur = () => {
    console.log("密码失去焦点验证");
  };

  const _onComfimPasswordBlur = () => {
    console.log("确认密码失去焦点验证");
  };

  const _submitRegister = () => {
    const data = {
      userName: username,
      password: password,
      telephone: mobile,
      otp: code,
      city: city, // 城市
      province: province,
      district: district,
      town: town, // 详细地址
    };
    Loading.show("注册中");
    request(register, "POST", data)
      .then((ret) => {
        Loading.hidden();
        if (ret.success === true && ret.statusCode === 200) {
          Toast.showToast(ret.message);
          DeviceEventEmitter.emit("register_success");
          router.push("/login");

          _save(ret);
        } else if (ret.success === false) {
          Toast.showToast(ret.message);
        }
      })
      .catch((err) => {
        Loading.hidden();
        console.log(`Network error:====> ${err}`);
      });
  };
  const _save = async (ret) => {
    console.log("ret.data.wallet", ret.data.wallet);
    let register_data = ret.data.wallet;
    let keyStore = register_data.keyStore;
    let privateKey = register_data.privateKey;

    // 保存到storage中
    await DeviceStorage.save("keyStore", keyStore);
    await DeviceStorage.save("privateKey", privateKey);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const handleUserName = (username) => {
    setUserName(username);
  };
  const handleComfimPassword = (nowPassword) => {
    setNowPassword(nowPassword);
  };
  const _showPicker = () => {
    // setShowPicker(true);
    // Picker.init({
    //   pickerData: addressData,
    //   selectedValue: [1],
    //   pickerConfirmBtnText: "确定",
    //   pickerCancelBtnText: "取消",
    //   pickerTitleText: "请选择省份",
    //   onPickerConfirm: handlePickerConfirm,
    // });
    // Picker.show();
  };
  const handlePickerConfirm = (data) => {
    if (data.length !== 0) {
      let temp_city = data[0];
      let temp_district = data[2];
      let temp_province = data[1];
      setCity(temp_city);
      setDistrict(temp_district);
      setProvince(temp_province);
      setIsDesc(false);
      // this.setState({
      //     city: temp_city,
      //     district: temp_district,
      //     province: temp_province,
      // });
      if (data[0] === "直辖市") {
        let temp_data = data.slice(1, data.length);
        let str = temp_data.join("");
        // this.setState({selectOpt: str});
        // setIsDesc(false);
        setSelectOpt(str);
      } else {
        let str = data.join("");
        // this.setState({selectOpt: str});
        // setIsDesc(false);
        setSelectOpt(str);
      }
    } else {
      // TODO
    }
  };
  const _handleSave = () => {
    setIsVisible(false);
  };
  const _modal = () => {
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.saveModelBox}>
          <View style={styles.keyStoreBox}>
            <Text style={styles.saveModelTitle}>keyStore：</Text>
            <Text style={styles.saveModalContent} numberOfLines={1}>
              {keyStore}
            </Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.saveModelTitle}>账号地址：</Text>
            <Text style={styles.saveModalContent} numberOfLines={1}>
              {accountAddress}
            </Text>
          </View>
          <TouchableOpacity style={styles.saveBottonBox} activeOpacity={1} onPress={_handleSave}>
            <Text style={styles.saveText}>复制保存到本地</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const data = [
    {
      label: "Asia",
      value: "asia",
      options: [
        {
          label: "China",
          value: "china",
          options: [
            {
              label: "shandong",
              value: "shandong",
              options: [
                {
                  label: "Ji Nan",
                  value: "Ji Nan",
                },
                {
                  label: "Qing Dao",
                  value: "Qing Dao",
                },
                {
                  label: "Bin Zhou",
                  value: "Bin Zhou",
                },
                {
                  label: "Zi Bo",
                  value: "Zi Bo",
                },
              ],
            },
            {
              label: "Gan Su",
              value: "Gan Su",
              options: [
                {
                  label: "Lan Zhou",
                  value: "Lan Zhou",
                },
                {
                  label: "Zhang Ye",
                  value: "Zhang Ye",
                },
                {
                  label: "Wu Wei",
                  value: "Wu Wei",
                },
                {
                  label: "Jiu Quan",
                  value: "Jiu Quan",
                },
                {
                  label: "Tian Shui",
                  value: "Tian Shui",
                },
              ],
            },
            {
              label: "Zhe Jiang",
              value: "Zhe Jiang",
              options: [
                {
                  label: "Hang Zhou",
                  value: "Hang Zhou",
                },
                {
                  label: "Wen Zhou",
                  value: "Wen Zhou",
                },
                {
                  label: "Shao Xing",
                  value: "Shao Xing",
                },
              ],
            },
            {
              label: "Hu Bei",
              value: "Hu Bei",
              options: [
                {
                  label: "Wu Han",
                  value: "Wu Han",
                },
                {
                  label: "Xiang Yang",
                  value: "Xiang Yang",
                },
                {
                  label: "Jing Zhou",
                  value: "Jing Zhou",
                },
              ],
            },
          ],
        },
        {
          label: "Japan",
          value: "japan",
          options: [],
        },
        {
          label: "South Korea",
          value: "South Korea",
        },
      ],
    },
    {
      label: "North America",
      value: "north america",
      options: [
        {
          label: "USA",
          value: "usa",
          options: [
            {
              label: "Pennsylvania",
              value: "Pennsylvania",
              options: [{ label: "Philly", value: "Philly" }],
            },
            { label: "Hawaii", value: "Hawaii" },
            {
              label: "New Mexico",
              value: "New Mexico",
              options: [
                {
                  label: "ABQ",
                  value: "ABQ",
                },
                {
                  label: "Santa Fe",
                  value: "Santa Fe",
                },
              ],
            },
            { label: "Texas", value: "Texas" },
            { label: "Nevada", value: "Nevada" },
          ],
        },
        {
          label: "Canada",
          value: "canada",
          options: [
            { label: "Ottawa", value: "Ottawa" },
            { label: "Toronto", value: "Toronto" },
            { label: "Montreal", value: "Montreal" },
            { label: "Vancouver", value: "Vancouver" },
            { label: "Quebec City", value: "Quebec City" },
          ],
        },
        {
          label: "Mexico",
          value: "Mexico",
        },
      ],
    },
    {
      label: "Europe",
      value: "europe",
      options: [
        {
          label: "Germany",
          value: "Germany",
          options: [
            { label: "Berlin", value: "Berlin" },
            { label: "Hamburg", value: "Hamburg" },
            { label: "Munich", value: "Munich" },
            { label: "Cologne", value: "Cologne" },
            { label: "Bremen", value: "Bremen" },
            { label: "Stuttgart", value: "Stuttgart" },
            { label: "Dortmund", value: "Dortmund" },
          ],
        },
        {
          label: "France",
          value: "France",
          options: [
            { label: "Paris", value: "Paris" },
            { label: "Dunkerque", value: "Dunkerque" },
            { label: "Lille", value: "Lille" },
            { label: "Cherbourg", value: "Cherbourg" },
            { label: "Rouen", value: "Rouen" },
          ],
        },
        {
          label: "U.K.",
          value: "uk",
          options: [
            { label: "London", value: "London" },
            { label: "Manchester", value: "Manchester" },
            { label: "Edinburgh", value: "Edinburgh" },
            { label: "Birmingham", value: "Birmingham" },
            { label: "Cambrvaluege", value: "Cambrvaluege" },
          ],
        },
      ],
    },
    {
      label: "Africa",
      value: "Africa",
    },
  ];
  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const _topBar = <TopNavigationBar statusBar={StatusBar} title="用户资料" style={{ backgroundColor: "#ffffff" }} leftButton={GoBack(props)} />;
  return (
    <SafeAreaView style={styles.container}>
      {_topBar}

      <Input
        isTips={true}
        placeholder="请输入用户名"
        onChangeText={handleUserName}
        isSelect={true}
        name="用户名"
        returnKeyType="next"
        maxLength={16}
        placeholderTextColor="#ccc"
        onBlur={_onUsernameBlur}
      />
      <Input
        isTips={true}
        placeholder="请输入密码"
        onChangeText={handlePassword}
        isSelect={true}
        name="密码"
        returnKeyType="next"
        maxLength={18}
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onBlur={_onPasswordBlur}
      />
      <Input
        isTips={true}
        placeholder="请再次输入密码"
        onChangeText={handleComfimPassword}
        isSelect={true}
        name="确认密码"
        returnKeyType="next"
        maxLength={18}
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onBlur={_onComfimPasswordBlur}
      />
      <Input isTips={true} isAddress={true} onAddress={_showPicker} isSelect={true} name="地址选择" desc={selectOpt} returnKeyType="next" isDesc={isDesc} />
      <Input isTips={true} onAddress={_showPicker} isSelect={true} name="详细地址" placeholder="请输入详细地址(精确到门牌号)" returnKeyType="done" placeholderTextColor="#ccc" />
      <TouchableOpacity style={styles.submitBox} activeOpacity={1} onPress={_submitRegister}>
        <Text style={styles.saveText}>提交</Text>
      </TouchableOpacity>
      {/* <SlidePicker.Cascade
        visible={showPicker}
        dataSource={data}
        values={""}
        wheels={4}
        checkRange={5}
        itemDividerColor={"#ddd"}
        checkedTextStyle={{ fontSize: 15 }}
        itemHeight={44}
        animationDuration={300}
        titleText={"Position"}
        cancelTextStyle={styles.cancelTextStyle}
        onMaskClick={() => console.log("onMaskClick")}
        onCancelClick={() => console.log("onCancelClick")}
        onConfirmClick={(res) => {
          console.info("[res]", res);
        }}
      /> */}
      {/* {_testBtn}
                {this._modal()} */}
    </SafeAreaView>
  );
};

export default MaterialPage;
