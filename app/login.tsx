/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, DeviceEventEmitter } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import { px2dp } from "@/utils/px2dp";
import NavigationUtil from "@/utils/NavigationUtil";
import constant from "@/expand/api";
import DeviceStorage from "@/utils/DeviceStorage";
import { Toast } from "@/utils/Toast";
import styles from "@/styles/login";
import { request } from "@/expand/request";
import { router } from "expo-router";
import useUserStore from "@/stores/user";

const { login } = constant;

const LoginPage = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const { setUserInfo } = useUserStore();

  useEffect(() => {}, []);

  const onChangeMobile = (val) => {
    setUserName(val);
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  const _onBlurName = () => {};

  const _onBlurPassword = () => {};

  const goRetrievePass = () => {
    NavigationUtil.goPage({}, "RetrievePass");
  };

  const goRegister = () => {
    router.push("/register");
  };

  const handleSubmit = () => {
    const data = {
      userName: username,
      password: password,
    };
    request(login, "POST", data)
      .then((ret) => {
        if (ret.success === true && ret.statusCode === 200) {
          Toast.showToast(ret.message);
          loginformData(ret.data);
          setTimeout(() => {
            router.back();
          }, 300);
          DeviceEventEmitter.emit("login", { success: true });
          DeviceEventEmitter.emit("demo", { success: true });
        } else if (ret.success === false && ret.statusCode === 601) {
          Toast.showToast(ret.message);
        }
      })
      .catch((err) => {
        console.log(`network err ==> ${err}`);
      });
  };

  const loginformData = async (args) => {
    console.log("args", args);
    let token = args.jwttoken;
    let userName = args.profile.userName;
    let telephone = args.profile.telephone;
    let login_status = args.profile.status;
    let city = args.profile.city;
    let district = args.profile.district;
    let province = args.profile.province;
    let nickName = args.profile.nickName;
    let avatar = args.profile.avatar;
    let town = args.profile.town;
    let userAddr = args.profile.userAddr;
    let address = `${city}${province}${district}`;

    await DeviceStorage.save("token", token);
    await DeviceStorage.save("username", userName);
    await DeviceStorage.save("telephone", telephone);
    await DeviceStorage.save("login_status", login_status);
    await DeviceStorage.save("city", city);
    await DeviceStorage.save("district", district);
    await DeviceStorage.save("province", province);
    await DeviceStorage.save("nickname", nickName);
    await DeviceStorage.save("avatar", avatar);
    await DeviceStorage.save("town", town);
    await DeviceStorage.save("userAddr", userAddr);
    await DeviceStorage.save("address", address);
    setUserInfo({
      userName,
      telephone,
      avatar,
      userAddr,
      address,
      city,
      district,
      province,
      nickName,
    });
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const topBar = <TopNavigationBar statusBar={StatusBar} style={{ backgroundColor: "#ffffff" }} leftButton={GoBack()} />;
  const content = () => {
    return (
      <View style={{ marginTop: px2dp(120) }}>
        <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInputStyle}
            placeholder={"请输入手用户名"}
            onChangeText={(val) => onChangeMobile(val)}
            placeholderTextColor={"#ccc"}
            // onFocus={this.handleFocus}
            onBlur={_onBlurName}
            autoCapitalize="none"
            maxLength={11}
            returnKeyType="next"
          />
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInputStyle}
            placeholder={"请输入密码"}
            onChangeText={(val) => onChangePassword(val)}
            placeholderTextColor={"#ccc"}
            // onFocus={this.handleFocus}
            secureTextEntry={true}
            onBlur={_onBlurPassword}
            autoCapitalize="none"
            maxLength={16}
            returnKeyType="done"
          />
        </View>
        <View style={styles.ftBt}>
          <TouchableOpacity activeOpacity={1} onPress={goRetrievePass} style={styles.retrieveBox}>
            <Text style={styles.retrieveText}>忘记密码</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={goRegister} style={styles.nowLoginBox}>
            <Text style={styles.nowText}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.loginContainer}>
      {topBar}
      {content()}
      <TouchableOpacity style={styles.submitBox} activeOpacity={1} onPress={handleSubmit}>
        <Text style={styles.saveText}>登录</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: null,
//             password: null,
//             isFocus: false, // 失去焦点
//         };
//     }

//     // 页面销毁
//     componentWillUnmount() {
//         // DeviceEventEmitter.emit('login_sucess', {success: true});
//     }

//     // 登录成功后对数据处理
//     async _loginformData(props_data) {
//         let token = props_data.data.jwttoken;
//         let username = props_data.data.profile.userName;
//         let telephone = props_data.data.profile.telephone;
//         let login_status = props_data.data.profile.status;
//         let city = props_data.data.profile.city;
//         let district = props_data.data.profile.district;
//         let province = props_data.data.profile.province;
//         let nickname = props_data.data.profile.nickName;
//         let avatar = props_data.data.profile.avatar;
//         let town = props_data.data.profile.town;
//         let userAddr = props_data.data.profile.userAddr;

//         // 保存登录成功后的数据
//         await DeviceStorage.save('token', token);
//         await DeviceStorage.save('username', username);
//         await DeviceStorage.save('telephone', telephone);
//         await DeviceStorage.save('login_status', login_status);
//         await DeviceStorage.save('city', city);
//         await DeviceStorage.save('district', district);
//         await DeviceStorage.save('province', province);
//         await DeviceStorage.save('nickname', nickname);
//         await DeviceStorage.save('avatar', avatar);
//         await DeviceStorage.save('town', town);
//         await DeviceStorage.save('userAddr', userAddr);
//     }

//     handleChangeAccount = (username) => {
//         this.setState({username});
//     };

//     handleChangePassword = (password) => {
//         this.setState({password});
//     };

//     // 跳转注册
//     goRegister = () => {
//         // TODO
//         NavigationUtil.goPage({}, 'Register');
//     };

//     /**
//      * 失去焦点后验证该输入框值
//      * 是否在规定范围内
//      */
//     _onBlurName = () => {
//         const {username} = this.state;
//         if (username == null) {
//             Toast.showToast('用户名不能为空');
//         } else {
//             // 正则匹配用户名为6-16位，不能包含空格
//             let reg = /^[0-9a-zA-Z]{6,16}$/;
//             let usernameStr = username.replace(/\s/g, '');
//             let usernameStr1 = reg.test(usernameStr);
//             if (usernameStr1) {
//                 return;
//             } else {
//                 Toast.showToast('用户名必须为6-16位字符');
//             }
//         }
//     };

//     /**
//      * 验证密码是否匹配规则
//      */
//     _onBlurPassword = () => {
//         const {password} = this.state;
//         if (password == null) {
//             Toast.showToast('用户秘密不能为空', 200);
//         } else {
//             let reg = /^[a-zA-Z]{8,18}$/;
//             let passwordStr = password.replace(/\s/g, '');
//             let passwordStr1 = reg.test(passwordStr);
//             if (passwordStr1) {
//                 return;
//             } else {
//                 Toast.showToast('密码必须为8-18位字符串或特殊符号');
//             }
//         }
//     };

//     // 登录
//     handleSubmit = () => {
//         try {
//             const {loginData} = this.props;

//             let {username, password} = this.state;

//             if ((username && password) == null) {
//                 // Toast.showToast('用户名密码不能为空');
//             } else {
//                 const data = {
//                     userName: this.state.username,
//                     password: this.state.password,
//                 };
//                 Loading.show('登录中');
//                 loginData(login, 'POST', data);
//                 setTimeout(() => {
//                     Loading.hidden();
//                     let info = this.props.login_data;
//                     if (info.success === true) {
//                         Toast.showToast('登录成功');
//                         this._loginformData(info);
//                         setTimeout(() => {
//                             NavigationUtil.goBack(this.props.navigation);
//                         }, 600);
//                         DeviceEventEmitter.emit('login', {success: true});
//                         DeviceEventEmitter.emit('demo', {success: true});
//                     } else if (info.success === false) {
//                         Loading.hidden();
//                         Toast.showToast('登录失败');
//                     }
//                 }, 2000);
//             }
//         } catch (err) {
//             console.log('login err', err);
//         }

//         // const { username, password } = this.state
//         // let newUserName = username.replace('/\s/g', "")
//         // let newPassword = password.replace('/\s/g', "")
//         // console.log('newUserName', newUserName)
//         // let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
//         // let regsName = /^[a-zA-Z]\w{3, 10}$/ig // 匹配用户名是否合法
//         // let regsPassword = /^[\w_-]{6,16}$/ // 匹配密码是否合法
//         // if (username.length == 0) {
//         //     Toast.showToast('用户名或密码不能为空')
//         // } else {
//         //     if (!regsName.test(newUserName)) {
//         //         Toast.showToast('请输入正确的用户名')
//         //     }
//         //     if (!regsPassword.test(newPassword)) {
//         //         Toast.showToast('请输入正确的密码')
//         //     }
//         // }
//         // console.log('username',username)
//         // console.log('password',password)
//         // const { loginData } = this.props

//         // setTimeout( async () => {
//         //     const {login} = this.props
//         //     let token = login.item.jwttoken
//         //     await DeviceStorage.delete('token')
//         //     await DeviceStorage.save('token', token)
//         // }, 3000)

//         // 登录成功后，返回到首页
//     };

//     // 忘记密码
//     goRetrievePass = () => {
//         NavigationUtil.goPage({}, 'RetrievePass');
//     };

//     _renderContent() {
//         return (
//             <>
//                 <View style={styles.textInputBox}>
//                     <TextInput
//                         placeholder={'请输入手用户名'}
//                         onChangeText={(val) => this.setState({username: val})}
//                         placeholderTextColor={'#ccc'}
//                         // onFocus={this.handleFocus}
//                         onBlur={this._onBlurName}
//                         autoCapitalize="none"
//                         maxLength={11}
//                         returnKeyType="next"
//                     />
//                 </View>
//                 <View style={styles.textInputBox}>
//                     <TextInput
//                         placeholder={'请输入密码'}
//                         onChangeText={(val) => this.setState({password: val})}
//                         placeholderTextColor={'#ccc'}
//                         // onFocus={this.handleFocus}
//                         secureTextEntry={true}
//                         onBlur={this._onBlurPassword}
//                         autoCapitalize="none"
//                         maxLength={16}
//                         returnKeyType="done"
//                     />
//                 </View>
//                 <View style={styles.ftBt}>
//                     <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={this.goRetrievePass}
//                         style={styles.retrieveBox}>
//                         <Text style={styles.retrieveText}>忘记密码</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={this.goRegister}
//                         style={styles.nowLoginBox}>
//                         <Text style={styles.nowText}>立即注册</Text>
//                     </TouchableOpacity>
//                 </View>
//             </>
//         );
//     }
//     // _renderContent() {
//     //     return (
//     //         <View>
//     //             <LoginInput
//     //                 placeholder={'请输入用户名'}
//     //                 placeholderTextColor={'rgba(187, 187, 187, 1)'}
//     //                 onChangeText={this.handleMobile}
//     //             />
//     //             <LoginInput
//     //                 placeholder={'请输入密码'}
//     //                 placeholderTextColor={'rgba(187, 187, 187, 1)'}
//     //                 onChangeText={this.handlePassword}
//     //                 secureTextEntry={true}
//     //             />
//     //             <TouchableOpacity activeOpacity={1} onPress={this.goRegister} style={styles.nowLoginBox}>
//     //                 <Text style={styles.nowText}>立即注册</Text>
//     //             </TouchableOpacity>
//     //         </View>
//     //     )
//     // }
//     _renderSubmit() {
//         return (
//             <TouchableOpacity
//                 style={styles.submitBox}
//                 activeOpacity={1}
//                 onPress={this.handleSubmit}>
//                 <Text style={styles.saveText}>登录</Text>
//             </TouchableOpacity>
//         );
//     }
//     render() {
//         const StatusBar = {
//             backgroundColor: '#ffffff',
//             barStyle: 'dark-content',
//         };
//         const topBar = (
//             <TopNavigationBar
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#ffffff'}}
//                 leftButton={GoBack(this.props)}
//             />
//         );
//         return (
//             <SafeAreaView style={StyleSheet.loginContainer}>
//                 {topBar}
//                 <View
//                     style={{
//                         marginTop: px2dp(120),
//                     }}>
//                     {this._renderContent()}
//                     {this._renderSubmit()}
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }

export default LoginPage;
