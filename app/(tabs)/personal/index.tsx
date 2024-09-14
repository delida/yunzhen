import React from "react";
import { View, Text, SafeAreaView, Alert, TouchableOpacity, ScrollView, DeviceEventEmitter, Image } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { px2dp } from "@/utils/px2dp";
import SettingItem from "@/components/personal/SettingItem";
import NavigationUtil from "@/utils/NavigationUtil";
import Modal from "react-native-modal";
import * as Clipboard from "expo-clipboard";
import DeviceStorage from "@/utils/DeviceStorage";
import styles from "@/styles/personal/personal";

// svg
import Outline from "@/assets/svg/outline.svg";
import Person from "@/assets/svg/person.svg";
import Download from "@/assets/svg/download.svg";
import { router } from "expo-router";

class Personal extends React.Component {
  state = {
    address: null,
    login_status: 0, // 0未登录状态, 1已登录
    avatar: null,
    menu: [
      {
        id: 1,
        text: "账户设置",
        isShow: false,
        isAction: true,
        icon: <Person />,
        com: "AccountSetting",
      },
      {
        id: 2,
        text: "系统更新",
        isShow: true,
        isAction: true,
        icon: <Download />,
        com: "update",
      },
      {
        id: 3,
        text: "关于我们",
        isShow: false,
        isAction: true,
        icon: <Outline />,
        com: "About",
      },
    ],
    isVisible: false,
    isExitVisible: false, // 退出登录 modal
    telephone: null, // 用户手机号码
    userName: null, // 用户名
  };

  async componentDidMount() {
    // 监听登录成功，处理事务
    DeviceEventEmitter.addListener("login", (event) => {
      console.log("----- login ----", event);
      if (event.success === true) {
        console.log("----- login rererere ----", event);
        setTimeout(() => {
          this.getUserInfo();
        }, 200);
      }
    });
    DeviceEventEmitter.addListener("login_out", (event) => {
      if (event.success === true) {
        this.setState({
          login_status: 0,
          userName: "",
          avatar: null,
          address: null,
        });
      }
    });
    DeviceEventEmitter.addListener("account_event", (event) => {
      if (event.success === true) {
        setTimeout(() => {
          this.getUserInfo();
        }, 200);
      }
    });
  }

  async getUserInfo() {
    let userName = await DeviceStorage.get("username");
    let telephone = await DeviceStorage.get("telephone");
    let login_status = await DeviceStorage.get("login_status");
    let avatar = await DeviceStorage.get("avatar");
    let address = await DeviceStorage.get("userAddr");
    this.setState({
      userName,
      telephone,
      login_status,
      address,
      avatar,
    });
  }

  // 跳转到登录
  goToLogin = () => {
    // TODO

    router.push("/login");
    // NavigationUtil.goPage({}, "Login");
  };

  // 备份方法
  _backup = async () => {
    // 复制到剪贴板，方便保存
    await Clipboard.setStringAsync(this.state.address || "122");
    // Clipboard.setString(this.state.address || "");
  };

  // 跳转对应页面
  goToPage = () => {
    // TODO
    Alert.alert("page");
  };

  // 退出登录
  handleExit = () => {
    this.setState({ isExitVisible: true });
  };

  // 取消退出登录
  _exitCancle = () => {
    this.setState({ isExitVisible: false });
  };

  // 确认退出登录
  _confirmExit = async () => {
    this.setState({ isExitVisible: false });
    await DeviceStorage.delete("token");
    await DeviceStorage.delete("username");
    await DeviceStorage.delete("telephone");
    await DeviceStorage.delete("login_status");
    await DeviceStorage.delete("city");
    await DeviceStorage.delete("district");
    await DeviceStorage.delete("province");
    await DeviceStorage.delete("nickname");
    await DeviceStorage.delete("avatar");
    await DeviceStorage.delete("town");
    await DeviceStorage.delete("userAddr");
    await DeviceStorage.delete("soil");
    await DeviceStorage.delete("soil_num");

    DeviceEventEmitter.emit("login_out", { success: true });
  };

  handleChange(com) {
    if (com === "update") {
      this.handleModal();
    } else {
      router.push(`/personal/${com}`);
      // NavigationUtil.goPage({}, com);
    }
  }

  // 跳转账户设置
  _goToSettingPage = () => {
    NavigationUtil.goPage({}, "AccountSetting");
  };

  _renderContent() {
    return (
      <View style={styles.settingBox}>
        {/* <SettingItem
                    text={'账户设置'}
                    isActive={false}
                    isShow={true}
                    icon={<Person />}
                    onChange={this._goToSettingPage}
                /> */}
        {this.state.menu.map((m) => (
          <SettingItem key={m.id} text={m.text} isActive={m.isAction} isShow={m.isShow} icon={m.icon} onChange={() => this.handleChange(m.com)} />
        ))}
      </View>
    );
  }

  handleModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  // 下载
  _dowload = () => {
    // TODO
  };

  // 取消
  _cancle = () => {
    this.setState({
      isVisible: false,
    });
  };

  render() {
    let { isExitVisible, address, isVisible } = this.state;
    // header
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    const _top = <TopNavigationBar title="个人中心" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} />;

    const _userHeader = (
      <View style={styles.userContainer}>
        <View style={styles.userInfoBox}>
          <View style={styles.userInfo}>
            {this.state.avatar == null ? <View style={styles.noavatarBox} /> : <Image style={styles.avatarBox} source={{ uri: this.state.avatar }} />}
            <Text style={styles.username}>{this.state.userName}</Text>
          </View>
          {this.state.login_status === 0 ? (
            <TouchableOpacity style={styles.loginBtnBox} activeOpacity={1} onPress={this.goToLogin}>
              <Text style={styles.loginText}>点击登录</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );

    // 退出登录
    const _exit = (
      <>
        {this.state.login_status === 1 ? (
          <TouchableOpacity onPress={this.handleExit} activeOpacity={1} style={styles.exitBox}>
            <Text style={styles.exitText}>退出登录</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
    // 系统更新
    const _modal = (
      <Modal isVisible={isVisible}>
        <View style={styles.modalBox}>
          <Text style={styles.updateTitle}>更新提示</Text>
          <Text style={styles.updateVersion}>当前可更新到最新版本墨珩1.0.19</Text>
          <View style={styles.updateFotter}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this._cancle}
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
            <TouchableOpacity activeOpacity={1} onPress={this._dowload} style={styles.btn}>
              <Text style={styles.downloadText}>前往下载</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
    // 用户登出弹出提示，该用户是否登出
    const _exitModal = (
      <Modal isVisible={isExitVisible}>
        <View style={styles.modalBox}>
          <Text style={styles.updateTitle}>是否退出登录</Text>
          {/* <Text style={styles.updateVersion}>当前可更新到最新版本墨珩1.0.19</Text> */}
          <View style={styles.updateFotter}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this._exitCancle}
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
            <TouchableOpacity activeOpacity={1} onPress={this._confirmExit} style={styles.btn}>
              <Text style={styles.downloadText}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );

    const _keyStore = (
      <View style={styles.keyStoreBox}>
        <Text style={styles.keyStoreText}>{address}</Text>
        <View style={styles.keySroreBtnWrap}>
          <TouchableOpacity style={styles.backupBtn} activeOpacity={1} onPress={this._backup}>
            <Text style={styles.backupText}>备份Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.personalContainer}>
        {_top}
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {_userHeader}
          {_keyStore}
          {this._renderContent()}
          {_exit}
          {_modal}
          {_exitModal}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Personal;
