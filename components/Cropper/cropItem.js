import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";
import { px2dp } from "@/utils/px2dp";

function AddCropItem({ cropName, onCropEdit, onSelect, isShow, isDetail, isEdit, tips, date, cropDetail, cropRecommen, keyStore, onDiagnosis, onDetail }) {
  return (
    <View style={styles.addCropItemBox}>
      <View style={styles.addTopBox}>
        <View style={styles.addLeftBox}>
          <View style={styles.line} />
          <Text style={styles.title}>{cropName}</Text>
          {isEdit ? (
            <TouchableOpacity onPress={onCropEdit} style={styles.edit} activeOpacity={1}>
              <Text style={styles.editText}>修改</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {isDetail ? (
          <View style={styles.cropDateAndDetail}>
            <Text style={styles.date}>{date}</Text>
            <TouchableOpacity activeOpacity={1} onPress={onDetail} style={styles.addRightBox}>
              <Text style={styles.detail}>诊断详情</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.selectBox} onPress={onSelect} activeOpacity={1}>
            <Text style={styles.selectText}>选择</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cropDetailBox}>
        <Text style={styles.area}>{cropDetail}</Text>
        <Text style={styles.cropRecommen}>{cropRecommen}</Text>
      </View>
      <View style={styles.diagnosisWrap}>
        <Text style={styles.keyStore} numberOfLines={1}>
          {keyStore}
        </Text>
        {isShow ? (
          <TouchableOpacity onPress={onDiagnosis} style={styles.diagnosisBox}>
            {tips !== 0 ? (
              <View style={styles.tips}>
                <Text style={styles.tipsText}>{tips}</Text>
              </View>
            ) : null}
            <Text style={styles.diagnosisText}>诊断报告</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

AddCropItem.propTypes = {
  cropName: PropTypes.string,
  cropDetail: PropTypes.string,
  date: PropTypes.string,
  cropRecommen: PropTypes.string,
  keyStore: PropTypes.string,
  onDetail: PropTypes.func,
  onCropEdit: PropTypes.func,
  onDiagnosis: PropTypes.func,
  isEdit: PropTypes.bool,
  isDetail: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default AddCropItem;

const styles = StyleSheet.create({
  addCropItemBox: {
    width: px2dp(335),
    height: px2dp(100),
    alignSelf: "center",
    marginTop: px2dp(16),
    paddingVertical: px2dp(10),
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: px2dp(0.5),
  },
  addTopBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addLeftBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  addRightBox: {
    width: px2dp(80),
    height: px2dp(22),
    flexDirection: "row",
    alignItems: "center",
    paddingRight: px2dp(3),
    justifyContent: "center",
    borderColor: "#ADB4B9",
    borderWidth: px2dp(1),
  },
  line: {
    width: px2dp(3),
    height: px2dp(19),
    backgroundColor: "#4DAB6D",
    borderRadius: px2dp(2),
  },
  title: {
    paddingHorizontal: px2dp(10),
    color: "#030303",
    fontSize: px2dp(17),
  },
  edit: {
    width: px2dp(50),
    height: px2dp(22),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ADB4B9",
    borderWidth: px2dp(1),
    borderRadius: px2dp(3),
  },
  editText: {
    color: "#505559",
    fontSize: px2dp(13),
  },
  area: {
    color: "#505559",
    fontSize: px2dp(12),
    marginHorizontal: px2dp(16),
  },
  keyStore: {
    width: px2dp(280),
    color: "#ADB4B9",
    fontSize: px2dp(12),
    marginHorizontal: px2dp(16),
  },
  detail: {
    color: "#505559",
    fontSize: px2dp(13),
  },
  diagnosisWrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  diagnosisBox: {
    width: px2dp(80),
    height: px2dp(26),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: px2dp(0.5),
    borderColor: "#ADB4B9",
  },
  diagnosisText: {
    color: "#505559",
    fontSize: px2dp(13),
  },
  tips: {
    position: "absolute",
    top: px2dp(-10),
    right: px2dp(-8),
    width: px2dp(16),
    height: px2dp(16),
    borderRadius: px2dp(16 / 2),
    backgroundColor: "#E83939",
    alignItems: "center",
  },
  tipsText: {
    color: "#F7F8F7",
    fontSize: px2dp(12),
  },
  cropDateAndDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginRight: px2dp(5),
    fontSize: px2dp(12),
    color: "#505559",
  },
  cropDetailBox: {
    marginTop: px2dp(10),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: px2dp(16),
  },
  cropRecommen: {
    fontSize: px2dp(12),
    color: "#098643",
  },
  selectBox: {
    width: px2dp(80),
    height: px2dp(26),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4DAB6D",
    borderRadius: px2dp(3),
  },
  selectText: {
    color: "#FDFFFD",
    fontSize: px2dp(13),
    fontWeight: "400",
  },
});
