import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import NavigationUtil from "@/utils/NavigationUtil";

import styles from "@/styles/index";

import constant from "@/expand/api";
import { SwiperItem } from "@/components/Index/Swiper";

import PercentageCircle from "@/charts/cricle";

// import { WGS84 } from 'gcoord'
import { router } from "expo-router";

import SearchIcon from "@/assets/svg/search.svg";
import ArrowRight from "@/assets/svg/arrow_right.svg";
import SaoMa from "@/assets/svg/ma.svg";
import ArrowDown from "@/assets/svg/arrow-down.svg";

const {} = constant;

/**
 * 需求:
 * 首页搜索滑动隐藏
 */

class Index extends React.Component {
  state = {
    isShow: false,
    inputText: "",
    searchValue: "",
    scrollValue: 0,
    radius: 45,
    location: null,
    latitude: null,
    longitude: null,
    showWelcome: true,
  };

  async componentDidMount() {
    // if (Platform.OS === "android") {
    //   const result = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]);
    //   console.log("result", result);
    // }
    // await init({
    //   ios: "7ce2b50f95c3a7fe4de74b30ecf4b16e",
    //   android: "6376336575eb315ca33b7febcf01d400",
    // });

    // 开启逆向坐标 ios 端
    // if (Platform.OS === "ios") {
    //   setLocatingWithReGeocode(true);
    // } else {
    //   // android
    // }

    setTimeout(() => {
      this.setState({ showWelcome: false });
    }, 3000);

    //定位开启
    this.getCurrentPosition();
  }

  componentWillUnmount() {}

  updateLocationState(location) {
    if (location) {
      location.updateTime = new Date().toLocaleString();
      let tem_latitude = location.location.latitude;
      let tem_longitude = location.location.longitude;

      // 逆向地理坐标
      this.setState({
        latitude: tem_latitude,
        longitude: tem_longitude,
      });
    }
  }

  getCurrentPosition = () => {
    // Geolocation.getCurrentPosition(
    //   (position) => this.updateLocationState(position),
    //   (error) => this.updateLocationState(error)
    // );
  };

  watchPosition = () => {
    // if (!this.watchId) {
    //   this.watchId = Geolocation.watchPosition(
    //     (position) => this.updateLocationState(position),
    //     (error) => this.updateLocationState(error)
    //   );
    // }
  };

  clearWatch = () => {
    // if (this.watchId) {
    //   Geolocation.clearWatch(this.watchId);
    //   this.watchId = null;
    // }
    // this.setState({ location: null });
  };

  _onFocusSearch = () => {
    this.setState({ isShow: true });
  };
  _onBlurSearch = () => {
    this.setState({ isShow: false });
  };
  onChangeText = (value) => {
    this.setState({ searchValue: value });
  };

  _goSearch = () => {
    router.push("/home/Search");
    // NavigationUtil.goPage({}, "Search");
  };
  // _clear = () => {
  //   this.setState({ inputText: '' })
  // }
  _onScroll = (event) => {
    /**
         *  _contentViewScroll(e: Object){
            var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
            var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
            var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
            if (offsetY + oriageScrollHeight >= contentSizeHeight){
                Console.log('上传滑动到底部事件')
            }
        }
         */
    // console.log('value', event.nativeEvent.off.height)
  };

  _goRecoDetail = () => {
    NavigationUtil.goPage({}, "LandRecoDetail");
  };

  /**
   * 打开相机扫码
   * TODO:
   *  -
   */
  _openCamera = () => {
    router.push("/home/ScanCode");
  };

  /**
   * 打开地图
   * TODO:
   *  -
   */
  _openMap = () => {
    // TODO
  };

  _recommed = () => {
    return (
      <View style={styles.recommeBox}>
        <View style={styles.recomTitle}>
          <Text style={styles.recomTitleText}>土地诊断综合推荐</Text>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={this._goRecoDetail} style={styles.reConBox}>
          <View style={styles.title}>
            <Text style={styles.titleText}>东南地块</Text>
            <ArrowRight width={20} height={20} />
          </View>
          <Text style={[styles.desc, styles.address]}>上海市奉贤区即墨镇</Text>
          <Text style={[styles.desc, styles.keyStore]} numberOfLines={1}>
            0xD6FC9098eED3caEd2440d79d67b8E078c58090ab
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { radius } = this.state;
    const search = (
      <View style={styles.searchWrap}>
        <TouchableOpacity style={styles.locationBox} activeOpacity={1} onPress={this._openMap}>
          <Text style={styles.locationText}>杭州</Text>
          <ArrowDown width={12} height={12} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={this._goSearch} style={styles.searchBox}>
          <SearchIcon width={20} height={20} />
          <Text style={styles.searchText}>搜索地名或农作物名称</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saoMa} activeOpacity={1} onPress={this._openCamera}>
          <SaoMa width={30} height={30} />
        </TouchableOpacity>
      </View>
    );
    const chartView = (
      <View style={styles.chartViewBox}>
        <Text style={styles.chartTitle}>全国农作物改良进度一览</Text>
        <View style={styles.circleBox}>
          <PercentageCircle radius={radius} percent={60} color="#3498db" borderWidth={8}>
            <Text style={styles.circleText}>改良完成率</Text>
            <Text style={styles.circleDeg}>60%</Text>
          </PercentageCircle>
          <PercentageCircle radius={radius} percent={40} color="#3498db" borderWidth={8}>
            <Text style={styles.circleText}>改良中</Text>
            <Text style={styles.circleDeg}>40%</Text>
          </PercentageCircle>
          <PercentageCircle radius={radius} percent={10} color="#3498db" borderWidth={8}>
            <Text style={styles.circleText}>诊断中</Text>
            <Text style={styles.circleDeg}>10%</Text>
          </PercentageCircle>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.indexContainer}>
        {search}
        <ScrollView onScroll={this._onScroll} showsVerticalScrollIndicator={false} style={styles.scrollBox}>
          <SwiperItem />
          {chartView}
          {this._recommed()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Index;
