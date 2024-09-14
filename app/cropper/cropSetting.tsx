import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import TopNavigationBar from "@/common/TopNavigationBar";
import DeviceStorage from "@/utils/DeviceStorage";
import { GoBack } from "@/utils/GoBack";
import styles from "@/styles/cropper/settingcrop";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown";
import SelectInput from "@/components/SelectInput";
import Progress from "@/components/Progress";
import { request } from "@/expand/request";
import constant from "@/expand/api";

import moment from "moment";
import { useLocalSearchParams } from "expo-router";

const { cropconfig, diagnose } = constant;

const defaultIndex = 1;
const defaultValue = "作物1";
const defaultValue2 = "根茎类";
const defaultValue3 = "马铃薯";

const CropSettingPage = (props) => {
  const { isEdit: _isEdit } = useLocalSearchParams<{ isEdit: boolean }>();
  const [isSave, setIsSave] = useState(true);
  const [isCarry, setIsCarry] = useState(true);
  const [date, setDate] = useState(null);
  const [isEdit, setIsEdit] = useState(_isEdit);
  const [options, setOptions] = useState(["作物1", "作物2", "作物3"]);
  const [options2, setOptions2] = useState(["根茎类", "茄果类", "叶类", "粮食作物", "中药类"]);
  const [options3, setOptions3] = useState(["马铃薯", "白薯", "番薯", "白萝卜", "红萝卜", "姜", "蒜"]);
  const [value, setValue] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = await DeviceStorage.get("token");
      setToken(token);

      request(cropconfig, "POST", {}, token)
        .then((ret) => {
          console.log(cropconfig, ret);
        })
        .catch((err) => {
          console.log("农作物改良错误");
          console.log(err);
        });
    };

    const now = moment().format("YYYY-MM-DD hh:mm:ss");

    setIsEdit(isEdit);
    setDate(now);

    init();
  }, []);

  const handlePlus = () => {
    setValue(value + 1);
  };

  const handleLess = () => {
    setValue(value - 1);
  };

  const onChange = (value) => {
    console.log("value", value.target.value);
  };

  const handleSave = () => {
    setIsSave(false);
  };

  const _delete = () => {
    setIsSave(true);
  };

  const _save = () => {
    setIsCarry(false);
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTop = <TopNavigationBar title="农作物设置" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(props)} />;
  const _content = (
    <View style={styles.cropBox}>
      <View style={styles.cropTopBox}>
        <View style={styles.line} />
        <Text style={styles.cropTopTitle}>东南土地</Text>
      </View>
      <Text style={styles.cropDesc}>总面积 100亩</Text>
      <Text numberOfLines={1} style={styles.cropKeyStore}>
        0xD6FC9098eED3caEd2440d79d67b78c58090ab
      </Text>
    </View>
  );
  const _selectInput = (
    <View style={styles.selectWrap}>
      <View style={[styles.cropSelectBox, isSave ? null : styles.aCropSelectBox]}>
        <Text style={styles.selectName}>品质种类:</Text>
        {isSave ? <Dropdown style={styles.dropBox} options={options} defaultIndex={defaultIndex} defaultValue={defaultValue} dropdownStyle={styles.dropdownStyle} /> : <Text>{defaultValue}</Text>}
      </View>
      <View style={[styles.cropSelectBox, isSave ? null : styles.aCropSelectBox]}>
        <Text style={styles.selectName}>作物类型:</Text>
        {isSave ? <Dropdown style={styles.dropBox} options={options2} defaultIndex={defaultIndex} defaultValue={defaultValue2} dropdownStyle={styles.dropdownStyle} /> : <Text>{defaultValue2}</Text>}
      </View>
      <View style={[styles.cropSelectBox, isSave ? null : styles.aCropSelectBox]}>
        <Text style={styles.selectName}>作物名称:</Text>
        {isSave ? <Dropdown style={styles.dropBox} options={options3} defaultIndex={defaultIndex} defaultValue={defaultValue3} dropdownStyle={styles.dropdownStyle} /> : <Text>{defaultValue3}</Text>}
      </View>
      <View style={[styles.cropSelectBox, isSave ? null : styles.aCropSelectBox]}>
        <Text style={styles.selectName}>占地面积:</Text>
        {isSave ? <SelectInput value={value} onLess={handleLess} onPlus={handlePlus} onChange={onChange} disabled={value === 1 ? true : false} /> : <Text>{value}</Text>}
        <Text style={styles.mu}>亩</Text>
      </View>
      {isSave ? null : (
        <View style={[styles.cropSelectBox, isSave ? null : styles.aCropSelectBox]}>
          <Text style={styles.selectName}>提交日期:</Text>
          <Text style={styles.mu}>{date}</Text>
        </View>
      )}
    </View>
  );

  const _fotter = (
    <>
      {isEdit && isEdit ? (
        <View style={styles.saveBox}>
          <Button onChange={_delete} backgroundColor={"#E83939"} color={"#fff"} text={"删除"} />
          <Button onChange={_save} backgroundColor={"#4DAB6D"} color={"#fff"} text={"确定"} />
        </View>
      ) : (
        <>
          {isCarry && isCarry ? (
            <>
              {isSave ? (
                <View style={styles.fotter}>
                  <Button onChange={handleSave} backgroundColor={"#4DAB6D"} color={"#fff"} text={"确定"} />
                </View>
              ) : (
                <View style={styles.saveBox}>
                  <Button onChange={_delete} backgroundColor={"#E83939"} color={"#fff"} text={"删除"} />
                  <Button onChange={_save} backgroundColor={"#4DAB6D"} color={"#fff"} text={"确定"} />
                </View>
              )}
            </>
          ) : (
            <View style={styles.diagnosisBox}>
              <Text style={styles.diagnosis}>正在诊断：</Text>
              <View style={styles.diagnosisContent}>
                <Progress />
                <Text style={styles.progressText}>诊断中...</Text>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.cropSetting}>
      {renderTop}
      {_content}
      {_selectInput}
      {_fotter}
    </SafeAreaView>
  );
};

// class CropSetting extends React.Component {
//     state = {
//         options: ['demo1', 'demo2', 'demo3'],
//         options2: ['根茎类', '茄果类', '叶类', '粮食作物', '中药类'],
//         options3: ['马铃薯', '白薯', '番薯', '白萝卜', '红萝卜', '姜', '蒜'],
//         defaultIndex: 1,
//         defaultValue2: '根茎类',
//         defaultValue3: '马铃薯',
//         defaultValue: 'demo1',
//         value: 2,
//         isSave: true, // 保存设置
//         date: null, // 保存日期
//         isCarry: true, // 完成
//         isEdit: null,
//     };

//     componentDidMount() {
//         const now = moment().format('YYYY-MM-DD');
//         const {isEdit} = this.props.navigation.state.params;
//         this.setState({isEdit});
//         this.setState({
//             date: now,
//         });
//     }

//     handleSave = () => {
//         this.setState({
//             isSave: false,
//         });
//     };
//     handleLess = () => {
//         this.setState({
//             value: this.state.value - 1,
//         });
//     };
//     handlePlus = () => {
//         this.setState({
//             value: this.state.value + 1,
//         });
//     };
//     /* 删除土地 */
//     _delete = () => {};
//     /* 保存， 显示审核进度条 */
//     _save = () => {
//         this.setState({
//             isCarry: false,
//         });
//     };
//     render() {
//         const StatusBar = {
//             backgroundColor: '#ffffff',
//             barStyle: 'dark-content',
//         };
//         const renderTop = (
//             <TopNavigationBar
//                 title="农作物设置"
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#FEFFFE'}}
//                 leftButton={GoBack(this.props)}
//             />
//         );
//         const _content = (
//             <View style={styles.cropBox}>
//                 <View style={styles.cropTopBox}>
//                     <View style={styles.line} />
//                     <Text style={styles.cropTopTitle}>东南土地</Text>
//                 </View>
//                 <Text style={styles.cropDesc}>总面积 100亩</Text>
//                 <Text numberOfLines={1} style={styles.cropKeyStore}>
//                     0xD6FC9098eED3caEd2440d79d67b78c58090ab
//                 </Text>
//             </View>
//         );
//         const _selectInput = (
//             <View style={styles.selectWrap}>
//                 <View
//                     style={[
//                         styles.cropSelectBox,
//                         this.state.isSave ? null : styles.aCropSelectBox,
//                     ]}>
//                     <Text style={styles.selectName}>品质种类:</Text>
//                     {this.state.isSave ? (
//                         <Dropdown
//                             style={styles.dropBox}
//                             options={this.state.options}
//                             defaultIndex={this.state.defaultIndex}
//                             defaultValue={this.state.defaultValue}
//                             dropdownStyle={styles.dropdownStyle}
//                         />
//                     ) : (
//                         <Text>{this.state.defaultValue}</Text>
//                     )}
//                 </View>
//                 <View
//                     style={[
//                         styles.cropSelectBox,
//                         this.state.isSave ? null : styles.aCropSelectBox,
//                     ]}>
//                     <Text style={styles.selectName}>作物类型:</Text>
//                     {this.state.isSave ? (
//                         <Dropdown
//                             style={styles.dropBox}
//                             options={this.state.options2}
//                             defaultIndex={this.state.defaultIndex}
//                             defaultValue={this.state.defaultValue2}
//                             dropdownStyle={styles.dropdownStyle}
//                         />
//                     ) : (
//                         <Text>{this.state.defaultValue2}</Text>
//                     )}
//                 </View>
//                 <View
//                     style={[
//                         styles.cropSelectBox,
//                         this.state.isSave ? null : styles.aCropSelectBox,
//                     ]}>
//                     <Text style={styles.selectName}>作物名称:</Text>
//                     {this.state.isSave ? (
//                         <Dropdown
//                             style={styles.dropBox}
//                             options={this.state.options3}
//                             defaultIndex={this.state.defaultIndex}
//                             defaultValue={this.state.defaultValue3}
//                             dropdownStyle={styles.dropdownStyle}
//                         />
//                     ) : (
//                         <Text>{this.state.defaultValue3}</Text>
//                     )}
//                 </View>
//                 <View
//                     style={[
//                         styles.cropSelectBox,
//                         this.state.isSave ? null : styles.aCropSelectBox,
//                     ]}>
//                     <Text style={styles.selectName}>占地面积:</Text>
//                     {this.state.isSave ? (
//                         <SelectInput
//                             value={this.state.value}
//                             onLess={this.handleLess}
//                             onPlus={this.handlePlus}
//                             disabled={this.state.value === 1 ? true : false}
//                         />
//                     ) : (
//                         <Text>{this.state.value}</Text>
//                     )}
//                     <Text style={styles.mu}>亩</Text>
//                 </View>
//                 {this.state.isSave ? null : (
//                     <View
//                         style={[
//                             styles.cropSelectBox,
//                             this.state.isSave ? null : styles.aCropSelectBox,
//                         ]}>
//                         <Text style={styles.selectName}>提交日期:</Text>
//                         <Text style={styles.mu}>{this.state.date}</Text>
//                     </View>
//                 )}
//             </View>
//         );
//         const _fotter = (
//             <>
//                 {this.state.isEdit ? (
//                     <View style={styles.saveBox}>
//                         <Button
//                             onChange={this._delete}
//                             backgroundColor={'#E83939'}
//                             color={'#fff'}
//                             text={'删除'}
//                         />
//                         <Button
//                             onChange={this._save}
//                             backgroundColor={'#4DAB6D'}
//                             color={'#fff'}
//                             text={'确定'}
//                         />
//                     </View>
//                 ) : (
//                     <>
//                         {this.state.isCarry ? (
//                             <>
//                                 {this.state.isSave ? (
//                                     <View style={styles.fotter}>
//                                         <Button
//                                             onChange={this.handleSave}
//                                             backgroundColor={'#4DAB6D'}
//                                             color={'#fff'}
//                                             text={'确定'}
//                                         />
//                                     </View>
//                                 ) : (
//                                     <View style={styles.saveBox}>
//                                         <Button
//                                             onChange={this._delete}
//                                             backgroundColor={'#E83939'}
//                                             color={'#fff'}
//                                             text={'删除'}
//                                         />
//                                         <Button
//                                             onChange={this._save}
//                                             backgroundColor={'#4DAB6D'}
//                                             color={'#fff'}
//                                             text={'确定'}
//                                         />
//                                     </View>
//                                 )}
//                             </>
//                         ) : (
//                             <View style={styles.diagnosisBox}>
//                                 <Text style={styles.diagnosis}>正在诊断：</Text>
//                                 <View style={styles.diagnosisContent}>
//                                     <Progress />
//                                     <Text style={styles.progressText}>
//                                         诊断中...
//                                     </Text>
//                                 </View>
//                             </View>
//                         )}
//                     </>
//                 )}
//             </>
//         );
//         return (
//             <SafeAreaView style={styles.cropSetting}>
//                 {renderTop}
//                 {_content}
//                 {_selectInput}
//                 {_fotter}
//             </SafeAreaView>
//         );
//     }
// }

export default CropSettingPage;
