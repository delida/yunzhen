import { StyleSheet, Platform } from "react-native";
import { px2dp, width } from "../../utils/px2dp";

const styles = StyleSheet.create({
  personalContainer: {
    flex: 1,
  },
  userContainer: {
    width: width,
    height: px2dp(193),
    backgroundColor: "#4DAB6D",
  },
  keyStoreBox: {
    width: px2dp(335),
    height: px2dp(142),
    borderRadius: px2dp(12),
    backgroundColor: "#333",
    alignSelf: "center",
    // position: 'relative',
    // top: px2dp(-96)
    marginTop: px2dp(-96),
  },
  keyStoreText: {
    color: "#F2E1AE",
    fontSize: px2dp(12),
    marginTop: px2dp(38),
    marginLeft: px2dp(18),
    marginBottom: px2dp(30),
  },
  keySroreBtnWrap: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: px2dp(8),
  },
  backupBtn: {
    width: px2dp(106),
    height: px2dp(22),
    backgroundColor: "#F2E2AE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: px2dp(15),
  },
  backupText: {
    color: "#505559",
    fontSize: px2dp(13),
    fontWeight: "500",
  },
  userInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: px2dp(32),
    paddingLeft: px2dp(26),
    paddingRight: px2dp(29),
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  noavatarBox: {
    width: px2dp(64),
    height: px2dp(64),
    borderRadius: px2dp(32),
    backgroundColor: "#ccc",
  },
  avatarBox: {
    width: px2dp(64),
    height: px2dp(64),
    borderRadius: px2dp(32),
  },
  loginBtnBox: {},
  username: {
    fontSize: px2dp(18),
    color: "#FEFFFE",
    marginLeft: px2dp(12),
  },
  loginText: {
    color: "#FEFFFE",
    fontSize: px2dp(18),
  },
  settingBox: {
    alignSelf: "center",
    marginTop: px2dp(51),
  },
  exitBox: {
    width: px2dp(335),
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? px2dp(112) : px2dp(75),
    alignItems: "center",
    height: px2dp(53),
    justifyContent: "center",
    borderTopColor: "rgba(187, 187, 187, 1)",
    borderTopWidth: px2dp(0.5),
  },
  exitText: {
    fontSize: px2dp(15),
    color: "#E35D2C",
  },
  modalBox: {
    width: px2dp(259),
    height: px2dp(144),
    borderRadius: px2dp(13),
    backgroundColor: "#FDFFFB",
    alignSelf: "center",
    alignItems: "center",
  },
  updateTitle: {
    fontSize: px2dp(18),
    color: "#030303",
    marginTop: px2dp(21),
  },
  updateVersion: {
    marginTop: px2dp(12),
    fontSize: px2dp(14),
    color: "#333",
  },
  updateFotter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: px2dp(44),
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: px2dp(0.5),
    borderTopColor: "rgba(187, 187, 187, 1)",
  },
  btn: {
    width: px2dp(259 / 2),
    height: px2dp(44),
    alignItems: "center",
    justifyContent: "center",
  },
  canleText: {
    color: "#E31E1E",
    fontSize: px2dp(17),
  },
  downloadText: {
    fontSize: px2dp(17),
    color: "#4DAB6D",
  },
});

export default styles;
