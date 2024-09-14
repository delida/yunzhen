import { Platform } from "react-native";

/**
 * 根据平台设置字体样式
 * @param {Object} androidStyle
 * @param {Object} iosStyle
 */
export function PlatformStyle(androidStyle = {}, iosStyle = {}) {
  if (Platform.OS === "ios") {
    return iosStyle;
  }
  return androidStyle;
}
