import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import CarryItem from "@/components/Land/carry";
import Modal from "react-native-modal";
import styles from "@/styles/land/diagnosisdetail";
import LandBtn from "@/components/Land/landBtn";
import DiagnosisContent from "@/components/Land/diagnosisContent";

export default class DiagnosisDetail extends React.PureComponent {
  state = {
    data: [
      { id: 1, name: "土地名称", desc: "东南地块", isShow: false },
      { id: 2, name: "占地面积", desc: "100 亩", isShow: false },
      {
        id: 3,
        name: "地理位置",
        desc: "上海市奉贤区即墨镇新建村",
        isShow: false,
      },
      {
        id: 4,
        name: "检测记录",
        desc: "0xD6FC9098eED3caEd2440d79d67b78c58090ab",
        isShow: true,
      },
    ],
    isVisible: false,
    week: [],
    isDignosisVisibale: false,
  };
  /** 处理点击显示全部时，显示modal页面 */
  handleModal = () => {
    this.setState({ isVisible: true });
  };
  /** 点击关闭 modal 层 */
  _canel = () => {
    this.setState({ isVisible: false });
  };
  /** 处理 改良方案  */
  handleProgram = () => {
    // 显示modal，处理modal事务
    this.setState({
      isDignosisVisibale: true,
    });
  };

  /** 确定 mdoal */
  handleConfirm = () => {
    this.setState({
      isDignosisVisibale: false,
    });
  };

  render() {
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    const renderTopBar = <TopNavigationBar title="诊断详情" statusBar={StatusBar} style={{ backgroundColor: "#FEFFFE" }} leftButton={GoBack(this.props)} />;
    const _modalDigonsis = (
      <Modal isVisible={this.state.isDignosisVisibale}>
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
          <TouchableOpacity activeOpacity={1} onPress={this.handleConfirm} style={styles.confirm}>
            <Text style={styles.confirmText}>确定</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
    const content = (
      <>
        {this.state.data.map((d) => (
          <CarryItem key={d.id} name={d.name} desc={d.desc} isShow={d.isShow} onReadSee={this.handleModal} />
        ))}
      </>
    );
    /** 检测报告 content */
    const _diagnosisContent = (
      <>
        <DiagnosisContent
          date={"2020-07-28"}
          result={"待增肥"}
          onProgram={this.handleProgram}
          program={"50号 通用有机肥"}
          dosage={"4000 kg"}
          week={this.state.week}
          keyStore={"0xD6FC9098eED3caEd2440d79d67b8E078c58090ab"}
        />
        <View style={styles.saveBox}>
          <LandBtn onPress={this.handleSave} backgroudColor={"#4DAB6D"} text={"确定"} />
        </View>
      </>
    );
    /** 检测报告 */
    const _modal = (
      <Modal isVisible={this.state.isVisible}>
        <View style={styles.modalBox}>
          <TouchableOpacity activeOpacity={1} onPress={this._canel}>
            <Text style={{ color: "red" }}>关闭</Text>
          </TouchableOpacity>
          <View style={styles.showText}>
            <Text>显示文件区域</Text>
          </View>
        </View>
      </Modal>
    );
    return (
      <SafeAreaView style={styles.diagnosisContainer}>
        {renderTopBar}
        <ScrollView>
          {_modalDigonsis}
          {_modal}
          {content}
          {_diagnosisContent}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
