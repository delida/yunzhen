import { Platform, PixelRatio } from "react-native";

const getFontScale = PixelRatio.getFontScale();

/**
 * 适配 Android 字体大小
 * @param {number} fontSize 字体大小
 */
export function PixelFont(fontSize) {
  return Platform.OS === "android" ? fontSize / getFontScale : fontSize;
}
