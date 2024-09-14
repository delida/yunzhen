import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px2dp } from "@/utils/px2dp";
import PropTypes from "prop-types";
import Arrow from "@/assets/svg/arrow.svg";

function LandItem({ onEdit, onDetail, name, area, keyStore, isShow, isEdit, isDetail, tips, onDiagnosis, onSelect, isShowRound }) {
  return (
    <View style={styles.landContainer}>
      <View style={styles.addTopBox}>
        <View style={styles.addLeftBox}>
          <View style={styles.line} />
          <View style={styles.nameBox}>
            {isShowRound ? <View style={styles.round} /> : null}
            <Text style={styles.title}>{name}</Text>
          </View>
          {isEdit ? (
            <TouchableOpacity onPress={onEdit} style={styles.edit} activeOpacity={1}>
              <Text style={styles.editText}>修改</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {isDetail ? (
          <TouchableOpacity activeOpacity={1} onPress={onDetail} style={styles.addRightBox}>
            <Text style={styles.detail}>详情</Text>
            <Arrow width={26} height={26} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.selectBox} activeOpacity={1} onPress={onSelect}>
            <Text style={styles.selectText}>选择</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.area}>面积 {area} 亩</Text>
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

LandItem.propTypes = {
  onEdit: PropTypes.func.isRequired, // 必传参数
  onDetail: PropTypes.func.isRequired,
  name: PropTypes.string,
  area: PropTypes.number, // 面积
  keyStore: PropTypes.string,
  isShow: PropTypes.bool,
  tips: PropTypes.number,
  onDiagnosis: PropTypes.func,
  isEdit: PropTypes.bool,
  isShowRound: PropTypes.bool,
};

export default LandItem;

const styles = StyleSheet.create({
  landContainer: {
    marginTop: px2dp(16),
    paddingVertical: px2dp(10),
    width: px2dp(325),
    alignSelf: "center",
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
    flexDirection: "row",
    alignItems: "center",
    paddingRight: px2dp(3),
  },
  line: {
    width: px2dp(3),
    height: px2dp(19),
    backgroundColor: "#4DAB6D",
  },
  nameBox: {
    flexDirection: "row",
  },
  round: {
    width: px2dp(6),
    height: px2dp(6),
    borderRadius: px2dp(3),
    backgroundColor: "red",
    position: "relative",
    right: px2dp(-4),
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
  },
  editText: {
    color: "#505559",
    fontSize: px2dp(13),
  },
  area: {
    color: "#505559",
    fontSize: px2dp(12),
    marginHorizontal: px2dp(16),
    marginTop: px2dp(16),
    marginBottom: px2dp(10),
  },
  keyStore: {
    width: px2dp(240),
    color: "#ADB4B9",
    fontSize: px2dp(12),
    // marginHorizontal: px2dp(16)
  },
  detail: {
    color: "#959595",
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
});
