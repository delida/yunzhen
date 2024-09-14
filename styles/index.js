import { StyleSheet, Platform } from "react-native";
import { px2dp } from "../utils/px2dp";

const styles = StyleSheet.create({
  indexContainer: {
    flex: 1,
    backgroundColor: "#4FAB6E",
    marginTop: Platform.OS === "android" ? 55 : 0,
  },
  chartViewBox: {
    height: px2dp(200),
    width: px2dp(335),
    alignSelf: "center",
    marginTop: px2dp(12),
    backgroundColor: "#F7F8F7",
    borderRadius: px2dp(2),
  },
  chartTitle: {
    color: "#101010",
    fontSize: px2dp(16),
    fontWeight: "600",
    textAlign: "center",
    marginTop: px2dp(31),
  },
  circleBox: {
    marginTop: px2dp(40),
    width: px2dp(300),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  circleText: {
    fontSize: px2dp(10),
    color: "#505559",
    marginTop: px2dp(8),
  },
  circleDeg: {
    fontSize: px2dp(10),
    color: "#505559",
    marginTop: px2dp(10),
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: px2dp(335),
    height: px2dp(38),
    // justifyContent: 'space-around'
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: px2dp(4),
  },
  locationText: {
    fontSize: px2dp(12),
    color: "#fff",
    fontWeight: "600",
    marginRight: px2dp(2),
  },
  searchBox: {
    width: px2dp(250),
    alignSelf: "center",
    height: px2dp(32),
    backgroundColor: "#F7F8F7",
    borderRadius: px2dp(30),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: px2dp(8),
  },
  searchText: {
    marginLeft: px2dp(8),
    color: "#ADB4B9",
    fontSize: px2dp(14),
  },
  saoMa: {
    marginLeft: px2dp(12),
  },
  recommeBox: {
    width: px2dp(335),
    height: px2dp(200),
    backgroundColor: "#F7F8F7",
    borderRadius: px2dp(2),
    alignSelf: "center",
    marginTop: px2dp(12),
    marginBottom: px2dp(8),
  },
  recomTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: px2dp(25),
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: px2dp(0.5),
  },
  recomTitleText: {
    fontSize: px2dp(16),
    color: "#030303",
    fontWeight: "500",
  },
  reConBox: {
    height: px2dp(100),
    width: "100%",
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: "#BBBBBB",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: px2dp(18),
    marginVertical: px2dp(8),
  },
  titleText: {
    fontSize: px2dp(16),
    color: "#030303",
    fontWeight: "500",
  },
  desc: {
    marginVertical: px2dp(8),
    marginHorizontal: px2dp(18),
  },
  keyStore: {
    fontSize: px2dp(12),
    color: "#ADB4B9",
  },
  address: {
    color: "#030303",
    fontSize: px2dp(12),
  },
  scrollBox: {
    marginBottom: Platform.OS === "ios" ? 0 : px2dp(4), // 决绝 android 底部贴底问题
  },
});

export default styles;
