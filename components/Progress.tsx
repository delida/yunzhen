import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Use, Defs, Stop } from "react-native-svg";
import { px2dp } from "@/utils/px2dp";

let AnimatedPath = Animated.createAnimatedComponent(Path);
let AnimatedCircle = Animated.createAnimatedComponent(Circle);

class Progress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startAnimstion = this.startAnimstion.bind(this);
    this.state = {
      lineFillAnimation: new Animated.Value(0),
    };
    this.dasharray = [Math.PI * 2 * 42];
    this.lineAnimation = this.state.lineFillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [`M5 8 l0 0`, `M5 8 l285 0`],
    });
  }

  componentDidMount() {
    this.startAnimstion();
  }
  startAnimstion() {
    this.state.lineFillAnimation.setValue(0);

    Animated.spring(this.state.lineFillAnimation, {
      toValue: 20, // 已完成的量
      friction: 5,
      tension: 25, // 弹回量
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Svg height="16" width="285">
          <G fill="none" stroke="#F5F5F5">
            <Path strokeLinecap="round" strokeWidth="8" d="M5 8 l285 0" />
          </G>
          <G fill="none" stroke="#098643">
            <AnimatedPath strokeLinecap="round" strokeWidth="8" d={this.lineAnimation} />
          </G>
        </Svg>
      </View>
    );
  }
}

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
