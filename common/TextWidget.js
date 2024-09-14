import React from "react";
import { Text, Platform, StyleSheet } from "react-native";

/**
 * 封装对 android Text 组件的支持
 */
export default class TextWidget extends React.Component {
  renderAndroidText() {
    const { style, children } = this.props;
    let fontStyle = null;

    if (style) {
      if (style instanceof Array) {
        style = StyleSheet.flatten(style);
      }
      fontStyle = style.fontWeight
        ? {
            fontWeight: "normal",
            fontFamily: "PingFangBold",
          }
        : {
            fontFamily: "PingFangRegular",
          };
    }

    return (
      <Text {...this.props} style={[style, fontStyle]}>
        {children}
      </Text>
    );
  }

  render() {
    return Platform.OS === "ios" ? <Text {...this.props} /> : this.renderAndroidText();
  }
}
