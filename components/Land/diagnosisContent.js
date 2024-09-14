import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px2dp } from "@/utils/px2dp";
import PropTypes from "prop-types";
import Arrow from "@/assets/svg/arrow_al.svg";

function DiagnosisContent({ result, keyStore, week, date, program, dosage, onProgram }) {
  return (
    <View style={styles.lenBox}>
      <View style={styles.topHeader}>
        <Text style={styles.topText}>诊断报告</Text>
      </View>
      {/* 内容 */}
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>诊断结果：</Text>
        <Text style={styles.resultDesc}>{result}</Text>
      </View>
      <View style={styles.program}>
        <Text style={styles.resultTitle}>改良方案：</Text>
        <TouchableOpacity activeOpacity={1} onPress={onProgram} style={styles.programBtnBox}>
          <Text style={styles.resultDesc}>{program}</Text>
          <Arrow />
        </TouchableOpacity>
      </View>
      <View style={styles.program}>
        <Text style={styles.resultTitle}>合计用量：</Text>
        <Text style={styles.resultDesc}>{dosage}</Text>
      </View>
      <View style={styles.fangfa}>
        <Text style={styles.resultTitle}>使用方法：</Text>
        <View>
          <Text style={styles.week}>第一周：每亩施肥 100kg</Text>
          <Text style={styles.week}>第一周：每亩施肥 100kg</Text>
          <Text style={styles.week}>第一周：每亩施肥 100kg</Text>
          <Text style={styles.week}>第一周：每亩施肥 100kg</Text>
          <Text style={styles.week}>第一周：每亩施肥 100kg</Text>
        </View>
      </View>
      <View style={styles.program}>
        <Text style={styles.resultTitle}>上链记录: </Text>
        {/* <Text style={styles.resultDesc}>4000 kg</Text> */}
      </View>
      <View style={[styles.program, { height: px2dp(47) }]}>
        <Text style={styles.resultTitle}>哈希地址：</Text>
        <Text style={styles.keyStoreText} numberOfLines={1}>
          {keyStore}
        </Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.dateTitle}>报告日期：</Text>
        <Text style={styles.dateDesc}>{date}</Text>
      </View>
    </View>
  );
}

DiagnosisContent.propTypes = {
  result: PropTypes.string,
  keyStore: PropTypes.string,
  date: PropTypes.string,
  week: PropTypes.array,
  program: PropTypes.string,
  onProgram: PropTypes.func,
};

export default DiagnosisContent;

const styles = StyleSheet.create({
  lenBox: {
    width: px2dp(335),
    height: px2dp(485),
    alignSelf: "center",
    marginTop: px2dp(18),
    borderWidth: px2dp(0.5),
    borderColor: "#4DAB6D",
  },
  topHeader: {
    height: px2dp(37),
    backgroundColor: "#4DAB6D",
    alignItems: "center",
    justifyContent: "center",
  },
  topText: {
    fontSize: px2dp(16),
    color: "#fff",
  },
  saveBox: {
    marginTop: px2dp(30),
    width: px2dp(335),
    alignSelf: "center",
    alignItems: "flex-end",
  },
  resultBox: {
    height: px2dp(32),
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "#BBBBBB",
    paddingLeft: px2dp(8),
  },
  resultTitle: {
    color: "#505559",
    fontSize: px2dp(14),
  },
  resultDesc: {
    color: "#030303",
    fontSize: px2dp(14),
    marginLeft: px2dp(4),
  },
  program: {
    height: px2dp(36),
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "#BBBBBB",
    paddingLeft: px2dp(8),
  },
  fangfa: {
    marginTop: px2dp(10),
    flexDirection: "row",
    paddingLeft: px2dp(8),
    marginBottom: px2dp(20),
  },
  week: {
    marginLeft: px2dp(3),
    marginBottom: px2dp(20),
    color: "#505559",
    fontSize: px2dp(14),
  },
  dateBox: {
    height: px2dp(40),
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: px2dp(8),
  },
  dateTitle: {
    color: "#ADB4B9",
    fontSize: px2dp(14),
  },
  dateDesc: {
    color: "#ADB4B9",
    fontSize: px2dp(12),
    marginLeft: px2dp(4),
  },
  keyStoreText: {
    width: px2dp(246),
    color: "#4DAB6D",
    fontSize: px2dp(12),
    marginLeft: px2dp(4),
  },
  programBtnBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
