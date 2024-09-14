import React from "react";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";

class Privacy extends React.Component {
  render() {
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    const topBar = <TopNavigationBar statusBar={StatusBar} title="隐私条款" style={{ backgroundColor: "#ffffff" }} leftButton={GoBack(this.props)} />;
    return (
      <SafeAreaView style={styles.container}>
        {topBar}
        <Text>隐私条款</Text>
      </SafeAreaView>
    );
  }
}

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
