import React from "react";
import { GoBack } from "@/utils/GoBack";
import TopNavigationBar from "@/common/TopNavigationBar";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";

class Terms extends React.Component {
  render() {
    const StatusBar = {
      backgroundColor: "#ffffff",
      barStyle: "dark-content",
    };
    const topBar = <TopNavigationBar statusBar={StatusBar} title="使用条款" style={{ backgroundColor: "#ffffff" }} leftButton={GoBack(this.props)} />;
    return (
      <SafeAreaView style={styles.container}>
        {topBar}
        <Text>使用条款</Text>
      </SafeAreaView>
    );
  }
}

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
