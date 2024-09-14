import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import styles from "@/styles/personal/changepassword";
import Input from "@/components/personal/TextInput";
import { Toast } from "@/utils/Toast";

import constant from "@/expand/api";
import { request } from "@/expand/request";
import DeviceStorage from "@/utils/DeviceStorage";

import { router } from "expo-router";

const { changepass } = constant;

const ChangePasswordPage = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getData = async () => {
      const token = await DeviceStorage.get("token");
      setToken(token);
    };
    getData();
  }, []);

  const handleOldPassword = (val) => {
    setOldPassword(val);
  };

  const handleNewPassword = (val) => {
    setNewPassword(val);
  };

  const handleConfirmPassword = (val) => {
    setConfirmPassword(val);
  };

  const _onBlurPassword = () => {};

  const _onBlurNewPassword = () => {};

  const _savePwdBlur = () => {};

  const handleSubmit = () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      Toast.showToast("必填字段不能为空");
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.showToast("输入的两次密码不一样，请重新输入");
      return;
    }
    const data = {
      oldpwd: oldPassword,
      newpwd: newPassword,
    };
    request(changepass, "POST", data, token)
      .then((ret) => {
        if (ret.success === true && ret.statusCode === 200) {
          Toast.showToast(ret.message);
          router.back();
        } else if (ret.success === false && ret.statusCode === 601) {
          Toast.showToast(ret.message);
        }
      })
      .catch((err) => {
        Toast.showToast(err);
        console.log(`Network Error:===> ${err}`);
      });
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const _topBar = <TopNavigationBar title="修改密码" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack()} />;
  return (
    <SafeAreaView style={styles.changePassword}>
      {_topBar}
      <View style={{ backgroundColor: "#fff" }}>
        <Input onChangeText={handleOldPassword} placeholder={"请输入当前密码"} isBorder={true} isInput={true} lebal={"旧密码"} secureTextEntry={true} onBlur={_onBlurPassword} width={70} />
        <Input onChangeText={handleNewPassword} placeholder={"请输入6-18位字符或数字"} lebal={"新密码"} isBorder={true} isInput={true} secureTextEntry={true} onBlur={_onBlurNewPassword} width={70} />
        <Input onChangeText={handleConfirmPassword} placeholder={"再次输入新密码"} lebal={"确认密码"} isInput={true} secureTextEntry={true} onBlur={_savePwdBlur} width={70} />
      </View>
      <TouchableOpacity style={styles.submitBox} activeOpacity={1} onPress={handleSubmit}>
        <Text style={styles.saveText}>完成</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// class ChangePassword extends React.Component {
//     state = {
//         oldPassword: null,
//         newPassword: null,
//         confirmPassword: null,
//     };

//     // shouldComponentUpdate(nextProps) {
//     //     console.log('nextProps', nextProps.changepass);
//     //     if (nextProps.changepass.success === true) {
//     //         Loading.show('修改中');
//     //         setTimeout(() => {
//     //             Loading.hidden();
//     //             if()
//     //             NavigationUtil.goBack(this.props.navigation);
//     //         }, 200);
//     //         return false;
//     //     }
//     //     return true;
//     // }

//     handleOldPassword = (value) => {
//         this.setState({
//             oldPassword: value,
//         });
//     };
//     handleNewPassword = (value) => {
//         this.setState({
//             newPassword: value,
//         });
//     };
//     handleConfirmPassword = (value) => {
//         this.setState({
//             confirmPassword: value,
//         });
//     };

//     /**
//      * 验证输入密码
//      */
//     _onBlurPassword = () => {
//         const {newPassword} = this.state;
//         if (newPassword == null) {
//             return Toast.showToast('新秘密不能为空');
//         } else {
//             let reg = /^[a-zA-Z]{8,18}$/;
//             let passwordStr = newPassword.replace(/\s/g, '');
//             let passwordStr1 = reg.test(passwordStr);
//             if (passwordStr1) {
//                 return;
//             } else {
//                 Toast.showToast('密码必须为8-18位字符串或特殊符号');
//             }
//         }
//     };

//     /**
//      * 再次验证新输入密码
//      */
//     _onBlurNewPassword = () => {
//         const {oldPassword} = this.state;
//         if (oldPassword == null) {
//             return Toast.showToast('再次输入密码不能为空');
//         } else {
//             let reg = /^[a-zA-Z]{8,18}$/;
//             let passwordStr = oldPassword.replace(/\s/g, '');
//             let passwordStr1 = reg.test(passwordStr);
//             if (passwordStr1) {
//                 return;
//             } else {
//                 Toast.showToast('密码必须为8-18位字符串或特殊符号');
//             }
//         }
//     };

//     /**
//      * 再次输入新密码校验
//      */
//     _savePwdBlur = () => {
//         const {confirmPassword} = this.state;
//         if (confirmPassword == null) {
//             return Toast.showToast('再次输入密码不能为空');
//         } else {
//             let reg = /^[a-zA-Z]{8,18}$/;
//             let comfirmPasswordStr = confirmPassword.replace(/\s/g, '');
//             let comfirmPasswordStr1 = reg.test(comfirmPasswordStr);
//             if (comfirmPasswordStr1) {
//                 return;
//             } else {
//                 Toast.showToast('密码必须为8-18位字符串或特殊符号');
//             }
//         }
//     };

//     // 提交完成修改密码
//     handleSubmit = async () => {
//         const {oldPassword, newPassword, confirmPassword} = this.state;
//         let token = await DeviceStorage.get('token');
//         if ((oldPassword && newPassword) == null) {
//             Toast.showToast('修改密码不能为空');
//         } else {
//             if (newPassword === confirmPassword) {
//                 const {changePass} = this.props;
//                 const data = {
//                     oldpwd: oldPassword,
//                     newpwd: newPassword,
//                 };
//                 changePass(changepass, 'POST', data, token);
//                 Loading.show('修改中');
//                 setTimeout(() => {
//                     Loading.hidden();
//                     let change_pass = this.props.changepass;
//                     if (change_pass.success === true) {
//                         Toast.showToast('修改成功');
//                         NavigationUtil.goBack(this.props.navigation);
//                     } else if (change_pass.success === false) {
//                         Toast.showToast('密码更改失败');
//                     } else {
//                         Toast.showToast('修改异常');
//                     }
//                     // console.log('change_pass', change_pass);
//                 }, 2000);
//             } else {
//                 Toast.showToast('两次输入的密码不一样');
//             }
//         }
//     };
//     _renderInput() {
//         return (
//             <View style={{backgroundColor: '#fff'}}>
//                 <Input
//                     onChangeText={this.handleOldPassword}
//                     placeholder={'请输入当前密码'}
//                     isBorder={true}
//                     isInput={true}
//                     lebal={'旧密码'}
//                     secureTextEntry={true}
//                     onBlur={this._onBlurPassword}
//                     width={70}
//                 />
//                 <Input
//                     onChangeText={this.handleNewPassword}
//                     placeholder={'请输入6-18位字符或数字'}
//                     lebal={'新密码'}
//                     isBorder={true}
//                     isInput={true}
//                     secureTextEntry={true}
//                     onBlur={this._onBlurNewPassword}
//                     width={70}
//                 />
//                 <Input
//                     onChangeText={this.handleConfirmPassword}
//                     placeholder={'再次输入新密码'}
//                     lebal={'确认密码'}
//                     isInput={true}
//                     secureTextEntry={true}
//                     onBlur={this._savePwdBlur}
//                     width={70}
//                 />
//             </View>
//         );
//     }
//     _renderSubmit() {
//         return (
//             <TouchableOpacity
//                 style={styles.submitBox}
//                 activeOpacity={1}
//                 onPress={this.handleSubmit}>
//                 <Text style={styles.saveText}>完成</Text>
//             </TouchableOpacity>
//         );
//     }
//     render() {
//         const StatusBar = {
//             backgroundColor: '#ffffff',
//             barStyle: 'dark-content',
//         };
//         const _topBar = (
//             <TopNavigationBar
//                 title="修改密码"
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#F2F4F7'}}
//                 leftButton={GoBack(this.props)}
//             />
//         );
//         return (
//             <SafeAreaView style={styles.changePassword}>
//                 {_topBar}
//                 {this._renderInput()}
//                 {this._renderSubmit()}
//             </SafeAreaView>
//         );
//     }
// }

// export default connect(
//     ({changepass}) => ({changepass}),
//     (dispatch) => ({
//         changePass(url, method, data, token) {
//             dispatch(actions.changePass(url, method, data, token));
//         },
//     })
// )(ChangePassword);

export default ChangePasswordPage;
