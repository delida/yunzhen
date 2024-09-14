import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, ScrollView, Text } from "react-native";
import { height } from "@/utils/px2dp";
import TopNavigationBar from "@/common/TopNavigationBar";

import Button from "@/components/Button/Button";
import NavigationUtil from "@/utils/NavigationUtil";
import DiagnosisContent from "@/components/DiagnosisContent";
import Modal from "react-native-modal";

import moment from "moment";
import styles from "@/styles/cropper/diagnosis";
import { router } from "expo-router";

const DiagnosisPage = (props) => {
  const [store, setStore] = useState("0xD6FC9098eED3caEd2440d79d67b8E078c58090ab");
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    let nowDate = moment().format("YYYY-MM-DD");
    setDate(nowDate);
  }, []);

  const _save = () => {
    router.back();
  };

  const handleProgram = () => {
    setIsVisible(true);
  };

  const handleConfirm = () => {
    setIsVisible(false);
  };

  const StatusBar = {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
  };
  const renderTop = <TopNavigationBar title="诊断详情" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} />;
  const _fotter = (
    <View style={styles.fotter}>
      <Button onChange={_save} backgroundColor={"#4DAB6D"} color={"#fff"} text={"确定"} />
    </View>
  );
  const _diagnosisContent = (
    <View style={styles.diagnosisContent}>
      <>
        <View style={styles.itemBox}>
          <Text style={styles.name}>农作物：</Text>
          <Text style={styles.desc}>有机 / 马铃薯</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.name}>占地面积：</Text>
          <Text style={styles.desc}>20 亩</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.name}>土地信息：</Text>
          <Text numberOfLines={1} style={styles.store}>
            {store}
          </Text>
        </View>
      </>
      <DiagnosisContent result={"待增肥"} program={"50号通用有机肥"} dosage={"100kg"} onProgram={handleProgram} keyStore={store} date={date} />
      {_fotter}
    </View>
  );

  const _modal = (
    <Modal isVisible={isVisible}>
      <View style={styles.diagnosisModal}>
        <Text style={styles.modalTitle}>50号 通用有机肥</Text>
        <View style={styles.dealer}>
          <Text style={styles.dealerl}>经销商:</Text>
          <Text style={styles.dealerr}>经销商经销商经销商</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressl}>地址:</Text>
          <Text style={styles.addressr}>上海市静安区</Text>
        </View>
        <View style={styles.tel}>
          <Text style={styles.tell}>电话:</Text>
          <Text style={styles.telr}>400-82008800</Text>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleConfirm} style={styles.confirm}>
          <Text style={styles.confirmText}>确定</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={styles.diagnosis}>
      {_modal}
      {renderTop}
      <ScrollView
        style={{
          height: height,
        }}
        showsVerticalScrollIndicator={false} // fix 内容过长滚动出现垂直滚动条
      >
        {_diagnosisContent}
      </ScrollView>
    </SafeAreaView>
  );
};

// class Diagnosis extends React.PureComponent {
//     state = {
//         isVisible: false,
//         store: '0xD6FC9098eED3caEd2440d79d67b8E078c58090ab',
//         date: null,
//     };
//     componentDidMount() {
//         let nowDate = moment().format('YYYY-MM-DD');
//         this.setState({
//             date: nowDate,
//         });
//     }
//     // 保存
//     _save = () => {
//         NavigationUtil.goBack(this.props.navigation);
//     };
//     // 改良方案
//     handleProgram = () => {
//         this.setState({
//             isVisible: true,
//         });
//     };
//     // 关闭 modal
//     handleConfirm = () => {
//         this.setState({
//             isVisible: false,
//         });
//     };
//     render() {
//         const StatusBar = {
//             backgroundColor: '#ffffff',
//             barStyle: 'dark-content',
//         };
//         const renderTop = (
//             <TopNavigationBar
//                 title="诊断详情"
//                 statusBar={StatusBar}
//                 style={{backgroundColor: '#FEFFFE'}}
//             />
//         );
//         const _fotter = (
//             <View style={styles.fotter}>
//                 <Button
//                     onChange={this._save}
//                     backgroundColor={'#4DAB6D'}
//                     color={'#fff'}
//                     text={'确定'}
//                 />
//             </View>
//         );
//         const _diagnosisContent = (
//             <View style={styles.diagnosisContent}>
//                 <>
//                     <View style={styles.itemBox}>
//                         <Text style={styles.name}>农作物：</Text>
//                         <Text style={styles.desc}>有机 / 马铃薯</Text>
//                     </View>
//                     <View style={styles.itemBox}>
//                         <Text style={styles.name}>占地面积：</Text>
//                         <Text style={styles.desc}>20 亩</Text>
//                     </View>
//                     <View style={styles.itemBox}>
//                         <Text style={styles.name}>土地信息：</Text>
//                         <Text numberOfLines={1} style={styles.store}>
//                             {this.state.store}
//                         </Text>
//                     </View>
//                 </>
//                 <DiagnosisContent
//                     result={'待增肥'}
//                     program={'50号通用有机肥'}
//                     dosage={'100kg'}
//                     onProgram={this.handleProgram}
//                     keyStore={this.state.store}
//                     date={this.state.date}
//                 />
//                 {_fotter}
//             </View>
//         );

//         const _modal = (
//             <Modal isVisible={this.state.isVisible}>
//                 <View style={styles.diagnosisModal}>
//                     <Text style={styles.modalTitle}>50号 通用有机肥</Text>
//                     <View style={styles.dealer}>
//                         <Text style={styles.dealerl}>经销商:</Text>
//                         <Text style={styles.dealerr}>经销商经销商经销商</Text>
//                     </View>
//                     <View style={styles.address}>
//                         <Text style={styles.addressl}>地址:</Text>
//                         <Text style={styles.addressr}>上海市静安区</Text>
//                     </View>
//                     <View style={styles.tel}>
//                         <Text style={styles.tell}>电话:</Text>
//                         <Text style={styles.telr}>400-82008800</Text>
//                     </View>
//                     <TouchableOpacity
//                         activeOpacity={1}
//                         onPress={this.handleConfirm}
//                         style={styles.confirm}>
//                         <Text style={styles.confirmText}>确定</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//         );
//         return (
//             <SafeAreaView style={styles.diagnosis}>
//                 {_modal}
//                 {renderTop}
//                 <ScrollView
//                     style={{
//                         height: height,
//                     }}
//                     showsVerticalScrollIndicator={false} // fix 内容过长滚动出现垂直滚动条
//                 >
//                     {_diagnosisContent}
//                 </ScrollView>
//             </SafeAreaView>
//         );
//     }
// }

export default DiagnosisPage;
