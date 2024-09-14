import React, { useEffect, useState } from "react";
import { View, SafeAreaView, DeviceEventEmitter } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import AccountItem from "@/components/personal/AccountItem";
import { height } from "@/utils/px2dp";
import NavigationUtil from "@/utils/NavigationUtil";
import DeviceStorage from "@/utils/DeviceStorage";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "@/utils/Toast";
import { requestPermissionsAsync } from "expo-media-library";

import constant from "@/expand/api";
import { Loading } from "@/utils/Loading";
import styles from "@/styles/personal/accountsetting";
import { request } from "@/expand/request";
import useUser from "@/hooks/useUser";
import { router } from "expo-router";
import useUserStore from "@/stores/user";

const { upload_file, get_user_info } = constant;

// class AccountSetting extends React.Component {
//   state = {
//     userName: null,
//     avatar: null,
//     address: null,
//     accountAddress: null,
//     nickName: null,
//   };
//   async componentDidMount() {
//     this._addlistener();
//     this._getInfo();
//   }

//   // componentDidUpdate(nextState) {
//   //     if (nextState.avatar === this.state.avatar) {
//   //         return true;
//   //     }
//   //     return null;
//   // }

//   componentWillUnmount() {
//     DeviceEventEmitter.emit("account_event", { success: true });
//   }

//   async _getInfo() {
//     let userName = await DeviceStorage.get("username");
//     let accountAddress = await DeviceStorage.get("userAddr");
//     let city = await DeviceStorage.get("city");
//     let district = await DeviceStorage.get("district");
//     let province = await DeviceStorage.get("province");
//     let avatar = await DeviceStorage.get("avatar");
//     let nickName = await DeviceStorage.get("nickname");
//     let address = `${city}${province}${district}`;
//     this.setState({ userName, accountAddress, address, avatar, nickName });
//   }

//   // 事件监听
//   _addlistener() {
//     DeviceEventEmitter.addListener("edit_address", (event) => {
//       if (event.success === true) {
//         // TODO
//         let tem_address = event.address;
//         let city = tem_address.city;
//         let town = tem_address.town; // 详细地址
//         let province = tem_address.province;
//         let district = tem_address.district;
//         let address = `${city}${province}${district}`;
//         this.setState({ address });
//       }
//     });
//     DeviceEventEmitter.addListener("edit_nickname", (event) => {
//       if (event.success === true) {
//         // this._getUserInfo();
//         let name = event.name;
//         this.setState({
//           nickName: name,
//         });
//       }
//     });
//     DeviceEventEmitter.addListener("upload_avatar", (event) => {
//       if (event.success === true) {
//         // this._getUserInfo();
//         const avatar = event.avatar;
//         console.log("上传头像成功更改--", avatar);

//         this.setState({ avatar });
//         this._saveAvatar(avatar);
//       }
//     });
//   }

//   _getUserInfo = async () => {
//     const { getUserInfo } = this.props;

//     let token = await DeviceStorage.get("token");
//     getUserInfo(get_user_info, token);

//     setTimeout(() => {
//       let ret = this.props.userInfo;
//       let avatar = ret.avatar;
//       console.log("----avatar----", avatar);
//       this.setState({ avatar });
//       this._saveAvatar(avatar);
//     }, 3000);
//   };

//   async _saveAvatar(avatar) {
//     await DeviceStorage.save("avatar", avatar);
//   }
//   // 上传头像
//   _updaldImgae = async () => {
//     try {
//       let token = await DeviceStorage.get("token");
//       const { uploadFile } = this.props;
//       if (token !== null) {
//         // 上传更换图像
//         const options = {
//           title: "选择上传头像",
//           customButtons: [{ name: "fb", title: "关闭" }],
//           storageOptions: {
//             skipBackup: true,
//             path: "images",
//           },
//         };
//         ImagePicker.showImagePicker(options, async (response) => {
//           // 当不选择图片时
//           if (response.didCancel !== true) {
//             let data_now = response.data;
//             let data_type = response.type;
//             if (data_type === undefined) {
//               return;
//             }
//             let imge_type = data_type.split("/")[1];
//             // this.setState({ base64: data })
//             let data = {
//               data: data_now,
//               suffix: imge_type,
//             };
//             console.log("图片大小---", response.fileSize);
//             const ret = await request(upload_file, "POST", data, token);
//             // console.log('上传头像', res);
//             uploadFile(upload_file, "POST", data, token);
//             // 上传图片成功
//             Loading.show("上传中");
//             setTimeout(async () => {
//               Loading.hidden();
//               // let ret = this.props.uploadfile;
//               console.log("------image-------", ret);
//               // console.log('------image-------', ret);
//               if (ret.success === true) {
//                 Toast.showToast("照片上传成功");
//                 // await DeviceStorage.save('avatar', ret);
//                 // this.setState({avatar: ret.data});
//                 // this._saveAvatar(ret.data);
//                 DeviceEventEmitter.emit("upload_avatar", {
//                   success: true,
//                   avatar: ret.data + `?t=${new Date().getTime()}`,
//                 });
//               } else if (ret.success === false && ret.statusCode === 503) {
//                 Toast.showToast("图片上传异常，图片大小不能超过1M！");
//               }
//             }, 2000);
//           }
//         });
//       } else {
//         Toast.showToast("请先登录");
//       }
//     } catch (err) {
//       console.log("图片上传异常", err);
//     }
//   };

//   // 修改昵称
//   _editUserName = async () => {
//     // TODO
//     try {
//       let token = await DeviceStorage.get("token");
//       if (token !== null) {
//         NavigationUtil.goPage({}, "EditName");
//       } else {
//         Toast.showToast("请先登录");
//       }
//     } catch (err) {
//       console.log("修改昵称err", err);
//     }
//   };

//   // 修改地区
//   _editAddress = async () => {
//     try {
//       let token = await DeviceStorage.get("token");
//       if (token !== null) {
//         NavigationUtil.goPage({}, "EditAddress");
//       } else {
//         Toast.showToast("请先登录");
//       }
//     } catch (err) {
//       console.log("修改地区err", err);
//     }
//   };

//   // 修改密码
//   _editPassword = async () => {
//     try {
//       let token = await DeviceStorage.get("token");
//       if (token !== null) {
//         NavigationUtil.goPage({}, "ChangePassword");
//       } else {
//         Toast.showToast("请先登录");
//       }
//     } catch (err) {
//       console.log("修改密码err", err);
//     }
//   };

//   // 导出keyStore
//   _goToKeyStorePage = async () => {
//     try {
//       let token = await DeviceStorage.get("token");
//       if (token !== null) {
//         NavigationUtil.goPage({}, "ExportKey");
//       } else {
//         Toast.showToast("请先登录");
//       }
//     } catch (err) {
//       console.log("修改密码err", err);
//     }
//   };

//   _renderContent() {
//     return (
//       <View style={{ backgroundColor: "#fff", height: height }}>
//         <AccountItem text={"头像"} isShow={true} isIcon={true} isUser={true} onChange={this._updaldImgae} showAvatar={true} message={null} avatar_url={this.state.avatar} />
//         <AccountItem text={"用户名"} isShow={true} isIcon={false} isUser={false} showAvatar={false} message={this.state.userName} />
//         <AccountItem text={"昵称"} isShow={true} isIcon={true} isUser={true} onChange={this._editUserName} showAvatar={false} message={this.state.nickName} />
//         <AccountItem text={"地区"} isShow={true} isIcon={true} isUser={true} onChange={this._editAddress} showAvatar={false} message={this.state.address} />
//         <AccountItem
//           text={"账号地址"}
//           isShow={true}
//           isIcon={false}
//           isUser={true}
//           // onChange={this._updaldImgae}
//           showAvatar={false}
//           message={this.state.accountAddress}
//         />
//         <AccountItem text={"修改密码"} isShow={true} isIcon={true} isUser={true} onChange={this._editPassword} showAvatar={false} message={null} />
//         <AccountItem text={"导出Keystore"} isShow={true} isIcon={true} isUser={true} onChange={this._goToKeyStorePage} showAvatar={false} message={null} />
//       </View>
//     );
//   }
//   render() {
//     const StatusBar = {
//       backgroundColor: "#F2F4F7",
//       barStyle: "dark-content",
//     };
//     const _topBar = <TopNavigationBar title="账户设置" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack(this.props)} />;
//     return (
//       <SafeAreaView style={styles.accountContainer}>
//         {_topBar}
//         {this._renderContent()}
//       </SafeAreaView>
//     );
//   }
// }

const AccountSetting = () => {
  const { getUserInfo } = useUser();
  const { userInfo, setUserInfo } = useUserStore();
  const [state, setState] = useState({
    userName: null,
    avatar: null,
    address: null,
    accountAddress: null,
    nickName: null,
  });

  const StatusBar = {
    backgroundColor: "#F2F4F7",
    barStyle: "dark-content",
  };
  const _topBar = <TopNavigationBar title="账户设置" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack()} />;

  const _addlistener = () => {
    DeviceEventEmitter.addListener("edit_nickname", (event) => {
      if (event.success === true) {
        // this._getUserInfo();
        getUserInfo();
        DeviceEventEmitter.emit("account_event", { success: true });
      }
    });
    DeviceEventEmitter.addListener("upload_avatar", (event) => {
      if (event.success === true) {
        // this._getUserInfo();
        const avatar = event.avatar;
        _saveAvatar(avatar);
        setUserInfo({ ...userInfo, avatar });
        DeviceEventEmitter.emit("account_event", { success: true });
        // getUserInfo();

        // this.setState({ avatar });
        // this._saveAvatar(avatar);
      }
    });
  };

  useEffect(() => {
    _addlistener();
    return DeviceEventEmitter.emit("account_event", { success: true });
  }, []);

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

    const { canceled, assets: files, base } = result;
    if (!canceled) {
      return files[0];
      console.log("res", result);
    }
  };

  const _updaldImgae = async () => {
    try {
      let token = await DeviceStorage.get("token");
      console.log("_updaldImgae", token);
      if (!!token) {
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
        };

        const ret = await request(upload_file, "POST", data, token);
        // console.log('上传头像', res);

        // 上传图片成功
        Loading.show("上传中");
        setTimeout(async () => {
          Loading.hidden();
          // let ret = this.props.uploadfile;
          console.log("------image-------", ret);
          // console.log('------image-------', ret);
          if (ret.success === true) {
            Toast.showToast("照片上传成功");
            // await DeviceStorage.save('avatar', ret);
            // this.setState({avatar: ret.data});
            // this._saveAvatar(ret.data);
            DeviceEventEmitter.emit("upload_avatar", {
              success: true,
              avatar: ret.data + `?t=${new Date().getTime()}`,
            });
          } else if (ret.success === false && ret.statusCode === 503) {
            Toast.showToast("图片上传异常，图片大小不能超过1M！");
          }
        }, 2000);
        // 上传更换图像
        // const options = {
        //   title: "选择上传头像",
        //   customButtons: [{ name: "fb", title: "关闭" }],
        //   storageOptions: {
        //     skipBackup: true,
        //     path: "images",
        //   },
        // };
        // ImagePicker.showImagePicker(options, async (response) => {
        //   // 当不选择图片时
        //   if (response.didCancel !== true) {
        //     let data_now = response.data;
        //     let data_type = response.type;
        //     if (data_type === undefined) {
        //       return;
        //     }
        //     let imge_type = data_type.split("/")[1];
        //     // this.setState({ base64: data })
        //     let data = {
        //       data: data_now,
        //       suffix: imge_type,
        //     };
        //     console.log("图片大小---", response.fileSize);
        //     const ret = await request(upload_file, "POST", data, token);
        //     // console.log('上传头像', res);

        //     // 上传图片成功
        //     Loading.show("上传中");
        //     setTimeout(async () => {
        //       Loading.hidden();
        //       // let ret = this.props.uploadfile;
        //       console.log("------image-------", ret);
        //       // console.log('------image-------', ret);
        //       if (ret.success === true) {
        //         Toast.showToast("照片上传成功");
        //         // await DeviceStorage.save('avatar', ret);
        //         // this.setState({avatar: ret.data});
        //         // this._saveAvatar(ret.data);
        //         DeviceEventEmitter.emit("upload_avatar", {
        //           success: true,
        //           avatar: ret.data + `?t=${new Date().getTime()}`,
        //         });
        //       } else if (ret.success === false && ret.statusCode === 503) {
        //         Toast.showToast("图片上传异常，图片大小不能超过1M！");
        //       }
        //     }, 2000);
        //   }
        // });
      } else {
        Toast.showToast("请先登录");
      }
    } catch (err) {
      console.log("图片上传异常", err);
    }
  };
  const _saveAvatar = async (avatar) => {
    await DeviceStorage.save("avatar", avatar);
  };

  const _editUserName = async () => {
    // TODO
    try {
      let token = await DeviceStorage.get("token");
      if (token !== null) {
        router.push("/personal/EditName");
        // NavigationUtil.goPage({}, "EditName");
      } else {
        Toast.showToast("请先登录");
      }
    } catch (err) {
      console.log("修改昵称err", err);
    }
  };

  // 修改地区
  const _editAddress = async () => {};

  const _editPassword = async () => {
    try {
      let token = await DeviceStorage.get("token");
      if (token !== null) {
        router.push("/personal/ChangePassword");
        // NavigationUtil.goPage({}, "ChangePassword");
      } else {
        Toast.showToast("请先登录");
      }
    } catch (err) {
      console.log("修改密码err", err);
    }
  };

  // 导出keyStore
  const _goToKeyStorePage = async () => {
    try {
      let token = await DeviceStorage.get("token");
      if (token !== null) {
        router.push("/personal/ExportKey");
      } else {
        Toast.showToast("请先登录");
      }
    } catch (err) {
      console.log("修改密码err", err);
    }
  };

  function _renderContent() {
    return (
      <View style={{ backgroundColor: "#fff", height: height }}>
        <AccountItem text={"头像"} isShow={true} isIcon={true} isUser={true} onChange={_updaldImgae} showAvatar={true} message={null} avatar_url={userInfo.avatar} />
        <AccountItem text={"用户名"} isShow={true} isIcon={false} isUser={false} showAvatar={false} message={userInfo.userName} />
        <AccountItem text={"昵称"} isShow={true} isIcon={true} isUser={true} onChange={_editUserName} showAvatar={false} message={userInfo.nickName} />
        <AccountItem text={"地区"} isShow={true} isIcon={true} isUser={true} onChange={_editAddress} showAvatar={false} message={userInfo.address} />
        {/* <AccountItem
          text={"账号地址"}
          isShow={true}
          isIcon={false}
          isUser={true}
          // onChange={this._updaldImgae}
          showAvatar={false}
          message={userInfo.accountAddress}
        /> */}
        <AccountItem text={"修改密码"} isShow={true} isIcon={true} isUser={true} onChange={_editPassword} showAvatar={false} message={null} />
        <AccountItem text={"导出Keystore"} isShow={true} isIcon={true} isUser={true} onChange={_goToKeyStorePage} showAvatar={false} message={null} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.accountContainer}>
      {_topBar}
      {_renderContent()}
    </SafeAreaView>
  );

  // const _getInfo = () => {
  //   getUserInfo()
  // }
};

export default AccountSetting;
