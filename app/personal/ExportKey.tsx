import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import TopNavigationBar from "../../common/TopNavigationBar";
import { GoBack } from "../../utils/GoBack";
import * as Clipboard from "expo-clipboard";
import DeviceStorage from "../../utils/DeviceStorage";
import { Toast } from "../../utils/Toast";
import styles from "../../styles/personal/exportkey";

export default class ExportKey extends React.Component {
  state = {
    key: null,
  };
  async componentDidMount() {
    let key = await DeviceStorage.get("keyStore");
    this.setState({ key });
  }
  // 复制key
  handleExportSubmit = async () => {
    Clipboard.setStringAsync(this.state.key);
    // Toast.showSuccess('复制成功');
    Toast.showToast("复制成功", 500);
  };
  _renderTopBar() {
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    return <TopNavigationBar title="导出Keystore" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack(this.props)} />;
  }
  render() {
    return (
      <SafeAreaView style={styles.keyContainer}>
        {this._renderTopBar()}
        <View style={styles.copyBox}>
          <Text>请复制粘贴Keystore文件到安全、离线的地方保存。</Text>

          <View style={styles.keyBox}>
            <Text style={styles.key}>{this.state.key}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.exportBox} activeOpacity={1} onPress={this.handleExportSubmit}>
          <Text style={styles.saveText}>复制Keystore</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

// import React, { useCallback, useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
// import TopNavigationBar from "@/common/TopNavigationBar";
// import { GoBack } from "@/utils/GoBack";

// import DeviceStorage from "@/utils/DeviceStorage";
// import { Toast } from "@/utils/Toast";
// import styles from "@/styles/personal/exportkey";
// import * as Clipboard from "expo-clipboard";

// const ExportKey = () => {
//   // const [state, setState] = useState({
//   //   _key: "",
//   // });

//   const [keyStore, setKeyStore] = useState("");

//   const handleExportSubmit = useCallback(async () => {
//     await Clipboard.setStringAsync(keyStore);

//     // Toast.showSuccess('复制成功');
//     Toast.showToast("复制成功");
//   }, [keyStore]);

//   const _renderTopBar = () => {
//     const StatusBar = {
//       backgroundColor: "#ffffff",
//       barStyle: "dark-content",
//     };
//     return <TopNavigationBar title="导出Keystore" statusBar={StatusBar} style={{ backgroundColor: "#F2F4F7" }} leftButton={GoBack()} />;
//   };

//   useEffect(() => {
//     (async () => {
//       let _key = await DeviceStorage.get("keyStore");
//       setKeyStore(_key);
//     })();
//   }, []);

//   return (
//     <SafeAreaView style={styles.keyContainer}>
//       {_renderTopBar()}
//       <View style={styles.copyBox}>
//         <Text>请复制粘贴Keystore文件到安全、离线的地方保存。</Text>

//         <View style={styles.keyBox}>
//           <Text style={styles.key}>{keyStore}</Text>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.exportBox} activeOpacity={1} onPress={handleExportSubmit}>
//         <Text style={styles.saveText}>复制Keystore</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default ExportKey;
