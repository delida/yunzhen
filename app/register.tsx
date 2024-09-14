/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import styles from "@/styles/personal/register";
import { GoBack } from "@/utils/GoBack";

import constant from "@/expand/api";
import { request } from "@/expand/request";
import { Toast } from "@/utils/Toast";
import { Loading } from "@/utils/Loading";
import NavigationUtil from "@/utils/NavigationUtil";
import TopNavigationBar from "@/common/TopNavigationBar";
import { router } from "expo-router";

const { send_code, auth_code } = constant;

const RegisterPage = (props) => {
  const [mobile, setMobile] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowTitle, setIsShowTitle] = useState(true);
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(true);
  const [code, setCode] = useState(null);
  const [isSetting, setIsSetting] = useState(true);
  const [password, setPassword] = useState("");
  const [nowPassword, setNowPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 59) {
      intervalRef.current = setInterval(() => {
        setCount((preCount) => preCount - 1);
      }, 1000);
    } else if (count === 0) {
      clearInterval(intervalRef.current);
    }
  }, [count]);

  const _terms = () => {
    router.push("/terms");
    // NavigationUtil.goPage({}, "Terms");
  };
  const _privacy = () => {
    router.push("/privacy");
    // NavigationUtil.goPage({}, "Privacy");
  };
  const handleChangeMobile = (mobile) => {
    setMobile(mobile);
  };

  const _onBlurPhone = () => {
    if (mobile === null) {
      Toast.showToast("手机号不能为空");
      return;
    } else {
      const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      const mobileStr = mobile.replace(/\s/g, "");
      const mobileStr1 = reg.test(mobileStr);
      if (mobileStr1) {
        return;
      } else {
        Toast.showToast("请检查手机号格式");
        return;
      }
    }
  };

  const handleChangeCode = (code) => {
    setCode(code);
  };

  const _onBlurCode = useCallback(() => {
    if (code === null) {
      Toast.showToast("验证码不能为空");
      return;
    } else {
      const reg = /^[0-9]{6}$/;
      const codeStr = code.replace(/\s/g, "");
      const codeStr1 = reg.test(codeStr);
      if (codeStr1) {
        setIsFocus(true);
        return;
      } else {
        Toast.showToast("验证码必须为6位数字");
        return;
      }
    }
  }, [code]);

  const handleSendCode = useCallback(() => {
    console.log("发送");
    if (mobile !== null) {
      Loading.show("发送中");
      setDisabled(true);
      const data = {
        phone: mobile,
        type: 0, // 注册
      };
      request(send_code, "POST", data)
        .then((ret) => {
          Loading.hidden();
          setDisabled(false);
          if (ret.success === true && ret.statusCode === 200) {
            setCount(59);
            Toast.showToast(ret.message);
          } else if (ret.success === false && ret.statusCode === 423) {
            Toast.showToast(ret.message);
          } else if (ret.success === false && ret.statusCode === 701) {
            Toast.showToast(ret.message);
          }
          console.log("ret", ret);
        })
        .catch((err) => {
          Loading.hidden();
          console.log(`Network err: ===> ${err}`);
          Toast.showToast("网络错误");
        });
    } else {
      Toast.showToast("手机号码不能为空");
    }
  }, [mobile]);

  const handleNext = () => {
    const data = {
      phone: mobile,
      otp: code,
    };
    Loading.show("验证中");
    // Loading.hidden();
    // return router.push({ pathname: "/material", params: { mobile, code } });
    request(auth_code, "POST", data)
      .then((ret) => {
        Loading.hidden();
        if (ret.success === true) {
          Toast.showToast(ret.message);
          router.push({ pathname: "/material", params: { mobile, code } });
          // NavigationUtil.goPage({ mobile, code }, "Material");
        } else if (ret.success === false) {
          Toast.showToast(ret.message);
          // NavigationUtil.goPage({mobile, code}, 'Material');
          return;
        }
        console.log(ret);
      })
      .catch((err) => {
        Loading.hidden();
        console.log(`NetWork Error: ===> ${err}`);
        Toast.showToast("网络错误");
      });
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const topBar = <TopNavigationBar statusBar={StatusBar} style={{ backgroundColor: "#ffffff" }} leftButton={GoBack(props)} />;
  return (
    <SafeAreaView style={styles.registerCotainer}>
      {topBar}
      <View style={styles.titleBox}>
        <Text style={styles.title}>输入手机号码</Text>
        <View style={styles.terms}>
          <Text style={styles.noTerms}>注册即代表阅读并同意</Text>
          <TouchableOpacity activeOpacity={1} onPress={_terms}>
            <Text style={styles.termsText}>使用条款</Text>
          </TouchableOpacity>
          <Text style={styles.noTerms}>与</Text>
          <TouchableOpacity activeOpacity={1} onPress={_privacy}>
            <Text style={styles.termsText}>隐私政策</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textInputWrap}>
        <View style={styles.textInputBox}>
          <TextInput
            placeholder={"请输入手机号"}
            onChangeText={handleChangeMobile}
            placeholderTextColor={"#ccc"}
            // onFocus={handleFocus}
            onBlur={_onBlurPhone}
            keyboardType="number-pad"
            returnKeyType="next"
            returnKeyLabel="next" // 兼容 android
            maxLength={11} // 只能输入十一位数字手机号码
          />
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            placeholder={"请输入短信中的验证码"}
            onChangeText={handleChangeCode}
            placeholderTextColor={"#ccc"}
            // onFocus={handleCodeFocus}
            clearTextOnFocus={true}
            onBlur={_onBlurCode}
            keyboardType="numeric"
            returnKeyType="done"
            returnKeyLabel="done" // 兼容 andriod
            maxLength={6} // 只能输入6数字位验证码
          />
          <TouchableOpacity style={styles.sendCode} activeOpacity={1} onPress={handleSendCode}>
            <View style={styles.timerBox}>
              <Text style={styles.timerText}>{count ? `${count}秒后获取` : "获取验证码"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={[styles.submitBox, isFocus ? styles.activeSubmitBox : null]} activeOpacity={1} onPress={handleNext}>
        <Text style={styles.saveText}>下一步</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// class Register extends React.PureComponent {
//     state = {
//         mobile: null,
//         isFocus: false,
//         isShowTitle: true,
//         isShowTimer: false,
//         count: 60,
//         liked: true,
//         code: 0,
//         value: '',
//         isSetting: true, // 设置密码
//         password: null,
//         nowPassword: null,
//         isRegister: true, // 注册成功
//         disabled: false, // 在密码
//         isAuth: true, // 是否验证
//     };

//     componentDidMount() {}

//     // 获取焦点
//     handleFocus = () => {
//         this.setState({isFocus: true});
//     };

//     // 发送验证码事件
//     handleSendCode = () => {
//         try {
//             const {mobile} = this.state;
//             const {liked} = this.state;
//             if (mobile !== null) {
//                 Loading.show('发送中');
//                 if (!liked) {
//                     return;
//                 }

//                 /**
//                  * 延时操作， 按钮不能点击
//                  */

//                 this.setState({disabled: true});

//                 setTimeout(() => {
//                     this.setState({disabled: false});
//                 }, 60000);

//                 setTimeout(() => {
//                     Loading.hidden();
//                     this.countDown();
//                     const {sendCode} = this.props;
//                     let data = {
//                         phone: mobile,
//                         type: 0, // 注册
//                     };
//                     sendCode(send_code, 'POST', data);
//                     setTimeout(() => {
//                         let ret = this.props.auth_send_code;
//                         if (ret.success === true) {
//                             Toast.showToast('验证码发送成功');
//                         } else {
//                             Toast.showToast('验证发送失败');
//                         }
//                         /**
//                          *  else if (ret.success === false && ret.statusCode === 423) {
//                          *       Toast.showToast('该手机号已被注册！');
//                          *  }
//                          */
//                     }, 2000);
//                 }, 200);
//             } else {
//                 Toast.showToast('手机号码不能为空');
//             }
//         } catch (err) {
//             console.log('register send code err', err);
//         }
//     };

//     // 发送验证码
//     countDown() {
//         try {
//             const {count} = this.state;
//             if (count === 1) {
//                 this.setState({
//                     count: 60,
//                     liked: true,
//                 });
//             } else {
//                 this.setState({
//                     count: count - 1,
//                     liked: false,
//                 });
//                 setTimeout(this.countDown.bind(this), 1000);
//             }
//         } catch (err) {
//             console.log('register send count code', err);
//         }
//     }

//     handleChangeMobile = (mobile) => {
//         console.log('register mobile', mobile);
//         this.setState({mobile});
//     };

//     handleChangeCode = (code) => {
//         this.setState({code});
//     };

//     /**
//      * 验证手机号是否为国内手机号
//      */
//     _onBlurPhone = () => {
//         try {
//             const {mobile} = this.state;
//             if (mobile == null) {
//                 Toast.showToast('手机号不能为空');
//             } else {
//                 try {
//                     let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
//                     let mobileStr = mobile.replace(/\s/g, '');
//                     let mobileStr1 = reg.test(mobileStr);
//                     if (mobileStr1) {
//                         return;
//                     } else {
//                         Toast.showToast('请检查手机号格式');
//                     }
//                 } catch (err) {
//                     console.log('auth mobile err', err);
//                 }
//             }
//         } catch (err) {
//             console.log('register send code err', err);
//         }
//     };

//     /**
//      * 验证验证码是否是6位数字
//      */
//     _onBlurCode = () => {
//         try {
//             const {code} = this.state;
//             if (code == null) {
//                 Toast.showToast('验证码不能为空');
//                 return;
//             } else {
//                 try {
//                     let reg = /^[0-9]{6}$/;
//                     let codeStr = code.replace(/\s/g, '');
//                     let codeStr1 = reg.test(codeStr);
//                     if (codeStr1) {
//                         return;
//                     } else {
//                         Toast.showToast('验证码必须为6位数字');
//                     }
//                 } catch (err) {
//                     console.log('register code err', err);
//                 }
//             }
//         } catch (err) {
//             console.log('register code number', err);
//         }
//     };

//     // 下一步， 完成注册
//     handleNext = () => {
//         try {
//             const {authCodeData} = this.props;
//             let {mobile, code} = this.state;

//             if ((mobile && code) == null) {
//                 Toast.showToast('手机号验证码不能为空');
//             } else if (mobile == null) {
//                 Toast.showToast('手机号不能为空');
//             } else if (code == null) {
//                 Toast.showToast('验证码不能为空');
//             } else {
//                 let data = {
//                     phone: mobile,
//                     otp: code,
//                 };

//                 /**
//                  * 这里的实际情况是
//                  * 后端返回值前端验证，正确通过后，跳转下一个页面
//                  * 填写用户资料
//                  */
//                 setTimeout(() => {
//                     this.setState({isAuth: false});
//                 }, 300);

//                 /**
//                  * 获取验证码成功后，系统会等待后端返回结果
//                  * 正确无误才会跳转下一步
//                  */

//                 authCodeData(auth_code, 'POST', data);
//                 if (this.state.isAuth === true) {
//                     Loading.show('验证中');
//                     setTimeout(() => {
//                         Loading.hidden();
//                         let ret = this.props.authCode;
//                         if (ret.success === true) {
//                             Toast.showToast('验证成功');
//                             NavigationUtil.goPage({mobile, code}, 'Material');
//                         } else if (ret.success === false) {
//                             Toast.showToast('验证失败，验证码错误或已经过期！');
//                         } else {
//                             Toast.showToast('注册异常');
//                         }
//                         // console.log('ret', ret);
//                         // NavigationUtil.goPage({mobile, code}, 'Material');
//                     }, 2000);
//                 } else {
//                     // 验证超时，请检查网络设置
//                 }
//             }
//         } catch (err) {
//             console.log('register err logs', err);
//         }
//     };

//     // 跳转使用条款
//     _terms = () => {
//         NavigationUtil.goPage({}, 'Terms');
//     };

//     // 跳转隐私条款
//     _privacy = () => {
//         NavigationUtil.goPage({}, 'Privacy');
//     };

//     _renderTopBar() {
//         const StatusBar = {
//             backgroundColor: '#ffffff',
//             barStyle: 'dark-content',
//         };
//         return (
//             <TopNavigationBar
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#ffffff'}}
//                 leftButton={GoBack(this.props)}
//             />
//         );
//     }

//     _renderTextInput = () => {
//         return (
//             <View style={styles.textInputWrap}>
//                 <View style={styles.textInputBox}>
//                     <TextInput
//                         placeholder={'请输入手机号'}
//                         onChangeText={this.handleChangeMobile}
//                         placeholderTextColor={'#ccc'}
//                         onFocus={this.handleFocus}
//                         onBlur={this._onBlurPhone}
//                         keyboardType="number-pad"
//                         returnKeyType="next"
//                         returnKeyLabel="next" // 兼容 android
//                         maxLength={11} // 只能输入十一位数字手机号码
//                     />
//                 </View>
//                 <View style={styles.textInputBox}>
//                     <TextInput
//                         placeholder={'请输入短信中的验证码'}
//                         onChangeText={this.handleChangeCode}
//                         placeholderTextColor={'#ccc'}
//                         onFocus={this.handleFocus}
//                         clearTextOnFocus={true}
//                         onBlur={this._onBlurCode}
//                         keyboardType="number-pad"
//                         returnKeyType="done"
//                         returnKeyLabel="done" // 兼容 andriod
//                         maxLength={6} // 只能输入6数字位验证码
//                     />
//                     <TouchableOpacity
//                         style={styles.sendCode}
//                         activeOpacity={1}
//                         onPress={this.handleSendCode}
//                         disabled={this.state.disabled}>
//                         <View style={styles.timerBox}>
//                             <Text style={styles.timerText}>
//                                 {this.state.liked
//                                     ? '获取验证码'
//                                     : `${this.state.count} 秒后重发`}
//                             </Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };

//     _registerTitle() {
//         return (
//             <View style={styles.titleBox}>
//                 <Text style={styles.title}>输入手机号码</Text>
//                 <View style={styles.terms}>
//                     <Text style={styles.noTerms}>注册即代表阅读并同意</Text>
//                     <TouchableOpacity activeOpacity={1} onPress={this._terms}>
//                         <Text style={styles.termsText}>使用条款</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.noTerms}>与</Text>
//                     <TouchableOpacity activeOpacity={1} onPress={this._privacy}>
//                         <Text style={styles.termsText}>隐私政策</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }

//     _renderSubmit() {
//         return (
//             <>
//                 <TouchableOpacity
//                     style={[
//                         styles.submitBox,
//                         this.state.isFocus ? styles.activeSubmitBox : null,
//                     ]}
//                     activeOpacity={1}
//                     onPress={this.handleNext}>
//                     <Text style={styles.saveText}>下一步</Text>
//                 </TouchableOpacity>
//             </>
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
//             <SafeAreaView style={styles.registerCotainer}>
//                 {topBar}
//                 {this._registerTitle()}
//                 {this._renderTextInput()}
//                 {this._renderSubmit()}
//             </SafeAreaView>
//         );
//     }
// }

// export default connect(
//     ({authCode,auth_send_code}) => ({authCode,auth_send_code}),
//     (dispatch) => ({
//         sendCode(url, method, data) {
//             dispatch(actions.sendCode(url, method, data));
//         },
//         authCodeData(url, method, data) {
//             dispatch(actions.authCodeData(url, method, data));
//         },
//         testRegister(url, method, data) {
//             dispatch(actions.testRegister(url, method, data));
//         },
//     })
// )(Register);

export default RegisterPage;
