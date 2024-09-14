import React from "react";
import { View, SafeAreaView, Text, Animated, Easing, Platform, Vibration, TouchableOpacity } from "react-native";

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import BackSvg from "@/assets/svg/back.svg";
import styles from "@/styles/scanCode";
import { router } from "expo-router";
// Sound.setCategory("Playback");
/* 扫码 */
class ScanCode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moveAnim: new Animated.Value(0),
      code: "",
      facing: "back",
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    // 开始动画
    this.state.moveAnim.setValue(0); // 设置开始动画
    Animated.timing(this.state.moveAnim, {
      toValue: -200,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => this.startAnimation());
  };

  // 识别二维码
  onBarCodeRead = (result) => {
    const data = result;

    // 当 data 值存在时
    if (data && !this.state.code) {
      this.setState({ code: data });

      // 添加提示音效
      // let whoosh = new Sound("scanner.mp3", Sound.MAIN_BUNDLE, (err) => {
      //   if (err) {
      //     console.log("failed to load the sound", err);
      //     return;
      //   }
      //   console.log("duration in seconds: " + whoosh.getDuration() + "number of channels: " + whoosh.getNumberOfChannels());

      //   whoosh.play((success) => {
      //     if (success) {
      //       whoosh.pause();
      //       console.log("scan qr result => ", data);
      //       // callback
      //     } else {
      //       console.log("playback failed due to audio decoding errors");
      //     }
      //   });
      // });

      // whoosh.setNumberOfLoops(1);
      // whoosh.release();

      if (Platform.OS === "ios") {
        Vibration.vibrate(100, false);
      } else {
        Vibration.vibrate([0, 100], false);
      }
    }
  };

  _goBack = () => {
    router.back();
    // NavigationUtil.goBack(this.props.navigation);
  };

  render() {
    return (
      <SafeAreaView style={styles.scanCodeContainer}>
        <CameraView style={styles.preview} facing={this.state.facing}>
          <TouchableOpacity style={styles.backStyle} activeOpacity={1} onPress={this._goBack}>
            <BackSvg width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
            <Animated.View
              style={[
                styles.border,
                {
                  transform: [{ translateY: this.state.moveAnim }],
                },
              ]}
            />
            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </CameraView>
        {/* <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={this.onBarCodeRead}
        >
          <TouchableOpacity style={styles.backStyle} activeOpacity={1} onPress={this._goBack}>
            <BackSvg width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
            <Animated.View
              style={[
                styles.border,
                {
                  transform: [{ translateY: this.state.moveAnim }],
                },
              ]}
            />
            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera> */}
      </SafeAreaView>
    );
  }
}

export default ScanCode;
