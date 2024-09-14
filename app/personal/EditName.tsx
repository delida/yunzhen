import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, DeviceEventEmitter } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import { GoBack } from "@/utils/GoBack";
import Input from "@/components/personal/TextInput";
import { Toast } from "@/utils/Toast";
import constant from "@/expand/api";
import DeviceStorage from "@/utils/DeviceStorage";
import NavigationUtil from "@/utils/NavigationUtil";
import styles from "@/styles/personal/editname";
import { request } from "@/expand/request";

const { update } = constant;

const EditNamePage = (props) => {
  const [username, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [value, setValue] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getData = async () => {
      let userName = await DeviceStorage.get("username");
      let nickName = await DeviceStorage.get("nickname");
      const token = await DeviceStorage.get("token");
      setNickName(nickName);
      setUserName(userName);
      setToken(token);
    };

    getData();
  }, []);

  const onChangeUnserName = (val) => {
    setValue(val);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeUserName = useCallback((val) => {
    setValue(val);
  });

  const _onBlurName = () => {};

  const _onFocus = () => {};

  const handleSubmit = () => {
    const data = {
      key: "nickName",
      value: value,
    };
    if (value === null) {
      Toast.showToast("用户名不能为空");
      return;
    }
    if (token !== undefined) {
      request(update, "POST", data, token)
        .then((ret) => {
          if (ret.success === true && ret.statusCode === 200) {
            Toast.showToast(ret.message);
            DeviceStorage.save("nickname", value);

            // 发送事件给上级组件
            DeviceEventEmitter.emit("edit_nickname", {
              success: true,
              name: value,
            });
            NavigationUtil.goBack(props.navigation);
          } else if (ret.success === false) {
            Toast.showToast(ret.message);
          }
        })
        .catch((err) => {
          console.log(`NetWork ERROR: ===> ${err}`);
        });
    } else {
      // TODO
      console.log("err");
    }
  };

  const content = (
    <View style={{ backgroundColor: "#fff" }}>
      <Input placeholder={username} isBorder={true} lebal={"账号"} width={40} />
      <Input onChangeText={(val) => onChangeUserName(val)} placeholder={nickName} lebal={"姓名"} isShow={isShow} isInput={true} onBlur={_onBlurName} onFocus={_onFocus} width={40} />
    </View>
  );

  const StatusBar = {
    backgroundColor: "#F2F4F7",
    barStyle: "dark-content",
  };
  const topBar = <TopNavigationBar title="修改昵称" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack(props)} />;
  return (
    <SafeAreaView style={styles.editContainer}>
      {topBar}
      {content}
      <TouchableOpacity style={styles.submitBox} activeOpacity={1} onPress={handleSubmit}>
        <Text style={styles.saveText}>保存</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// class EditName extends React.Component {
//     state = {
//         userName: null,
//         nickName: null,
//         isShow: false,
//     };

//     async componentDidMount() {
//         let userName = await DeviceStorage.get('username');
//         let nickName = await DeviceStorage.get('nickname');
//         this.setState({
//             userName,
//             nickName,
//         });
//     }
//     /**
//      * 验证姓名
//      */
//     _onBlurName = () => {
//         try {
//             const {name} = this.state;
//             if (name == null) {
//                 return Toast.showToast('请输入您的姓名');
//             } else {
//                 // TODO
//             }
//         } catch (err) {
//             console.log('edit name blur name err', err);
//         }
//     };

//     /**
//      * 编辑姓名输入框获取焦点触发
//      */
//     _onFocus = () => {
//         this.setState({
//             isShow: false,
//         });
//     };

//     // 保存
//     handleSubmit = async () => {
//         try {
//             let token = await DeviceStorage.get('token');
//             const {editNickName} = this.props;
//             let {name} = this.state;
//             if (name == null) {
//                 Toast.showToast('修改用户名不能为空');
//             } else {
//                 const data = {
//                     key: 'nickName',
//                     value: this.state.name,
//                 };
//                 editNickName(update, 'POST', data, token);
//                 Loading.show('修改中');
//                 setTimeout(() => {
//                     Loading.hidden();
//                     let edit_name = this.props.nickName;
//                     if (edit_name.success === true) {
//                         Toast.showToast('修改成功');
//                         NavigationUtil.goBack(this.props.navigation);
//                         // 发送事件给上级组件
//                         DeviceEventEmitter.emit('edit_nickname', {
//                             success: true,
//                             name: name,
//                         });
//                     } else if (edit_name.success === false) {
//                         Toast.showToast('修改失败');
//                     } else {
//                         Toast.showToast('修改异常');
//                     }
//                 }, 2000);
//             }
//         } catch (err) {
//             console.log('edit name save err', err);
//         }
//     };
//     _renderInput() {
//         return (
//             <View style={{backgroundColor: '#fff'}}>
//                 <Input
//                     onChangeText={this.handleChangeText}
//                     placeholder={this.state.userName}
//                     isBorder={true}
//                     lebal={'账号'}
//                     width={40}
//                 />
//                 <Input
//                     onChangeText={(val) => this.setState({name: val})}
//                     placeholder={this.state.nickName}
//                     lebal={'姓名'}
//                     isShow={this.state.isShow}
//                     isInput={true}
//                     onBlur={this._onBlurName}
//                     onFocus={this._onFocus}
//                     width={40}
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
//                 <Text style={styles.saveText}>保存</Text>
//             </TouchableOpacity>
//         );
//     }
//     render() {
//         const StatusBar = {
//             backgroundColor: '#F2F4F7',
//             barStyle: 'dark-content',
//         };
//         const topBar = (
//             <TopNavigationBar
//                 title="修改昵称"
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#F2F4F7'}}
//                 leftButton={GoBack(this.props)}
//             />
//         );
//         return (
//             <SafeAreaView style={styles.editContainer}>
//                 {topBar}
//                 {this._renderInput()}
//                 {this._renderSubmit()}
//             </SafeAreaView>
//         );
//     }
// }

// export default connect(
//     ({nickName}) => ({nickName}),
//     (dispatch) => ({
//         editNickName(url, method, data, token) {
//             dispatch(actions.editNickName(url, method, data, token));
//         },
//     })
// )(EditName);

export default EditNamePage;
