import React, { useState } from "react";
import { View, TextInput, SafeAreaView, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
import SearchIcon from "@/assets/svg/search.svg";
import CalIcon from "@/assets/svg/cal.svg";

import styles from "@/styles/serch";
import { router } from "expo-router";

/**
 * 需求:
 * 实现动态搜索模糊查询
 * 根据作物名称
 * 搜索历史
 * 展示土地模块
 */

const Search = (props) => {
  const [value, setValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [history, setHistory] = useState([{ name: "热门土地" }]);

  const _back = () => {
    router.back();
  };

  const _clearText = () => {
    setHistory([]);
  };

  const _handleClear = () => {
    setHistory([]);
  };

  const _onBlur = () => {};

  const _onFocus = () => {};

  const _onChangeText = (value) => {
    if (value) {
      setValue(value);
      setTimeout(() => {
        // 请求服务器，拿到数据
      }, 1000);
      // clearTimeout(this.settimeId);
      // this.settimeId = setTimeout(() => {
      //     // 请求服务器，拿到数据
      // }, 1000);
    } else {
      setValue("");
      // this.setState({textValue: ''});
    }
  };

  const _searchHeader = (
    <View style={styles.searchBox}>
      <SearchIcon width={20} height={20} />
      <TextInput style={styles.textInput} placeholder="搜索地名或农作物名称" placeholderTextColor="#ADB4B9" onBlur={_onBlur} onFocus={_onFocus} onChangeText={_onChangeText} />
      {isShow ? (
        <TouchableOpacity activeOpacity={1} onPress={_handleClear} style={styles.claBox}>
          <CalIcon width={20} height={20} />
        </TouchableOpacity>
      ) : null}
      {Platform.OS === "ios" ? (
        <TouchableOpacity onPress={_back} activeOpacity={1} style={styles.caleTextBox}>
          <Text style={styles.caleText}>取消</Text>
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          onPress={() => {
            router.back();
            // NavigationUtil.goBack(props.navigation);
          }}
          activeOpacity={1}
          style={[styles.caleTextBox, { backgroundColor: "red" }]}
        >
          <Text style={styles.caleText}>取消</Text>
        </TouchableNativeFeedback>
      )}
    </View>
  );
  const _searchHistory = (
    <View style={styles.searchHistoryBox}>
      <View style={styles.searchHistoryTop}>
        <Text style={styles.text}>搜索历史</Text>
        <TouchableOpacity onPress={_clearText} activeOpacity={1}>
          <Text style={styles.text}>清空记录</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemWraper}>
        {history &&
          history.map((h, i) => (
            <TouchableOpacity style={styles.itemBox} key={i}>
              <Text style={styles.name} numberOfLines={1}>
                {h.name}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.searchContainer}>
      {_searchHeader}
      {_searchHistory}
    </SafeAreaView>
  );
};

export default Search;
