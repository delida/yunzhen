import { Dimensions } from "react-native";

// 设计稿宽度
const defaultWidth = 375;

// 当前设备宽度 & 高度
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const px2dp = (uiEleWidth) => {
  return (uiEleWidth * width) / defaultWidth;
};
