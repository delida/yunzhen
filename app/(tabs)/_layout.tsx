import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, Text, View } from "react-native";

// const HomeSvg = require("@/assets/images/tab/language.svg");
// @ts-ignore
import HomeSvg from "@/assets/images/tab/language.svg";
// @ts-ignore
import SelHomeSvg from "@/assets/images/tab/ac-language.svg";
// @ts-ignore
import FaMapSvg from "@/assets/images/tab/fa-map.svg";
// @ts-ignore
import SelFaMapSvg from "@/assets/images/tab/ac-fa-map.svg";
// @ts-ignore
import FaLemon from "@/assets/images/tab/fa-lemon.svg";
// @ts-ignore
import SelFaLemon from "@/assets/images/tab/ac-fa-lemon.svg";
// @ts-ignore
import SelOutlineHome from "@/assets/images/tab/ac-outline-home.svg";
// @ts-ignore
import OutLineHome from "@/assets/images/tab/outline-home.svg";
// @ts-ignore
import SelFormatIndent from "@/assets/images/tab/ac-format_indent_increase.svg";
// @ts-ignore
import FormatIndent from "@/assets/images/tab/format_indent_increase.svg";
import Welcom from "@/components/Welcom";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
  }, []);

  if (showWelcome) {
    return <Welcom></Welcom>;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(9, 134, 67, 0.99)",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index/index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, focused }) => (focused ? <SelHomeSvg></SelHomeSvg> : <HomeSvg></HomeSvg>),
        }}
      />
      <Tabs.Screen
        name="land/index"
        options={{
          title: "我的土地",
          tabBarIcon: ({ color, focused }) => (focused ? <SelFaMapSvg /> : <FaMapSvg />),
        }}
      />
      <Tabs.Screen
        name="cropper"
        options={{
          title: "农作物改良",
          tabBarIcon: ({ color, focused }) => (focused ? <SelFaLemon /> : <FaLemon />),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "改良进度",
          tabBarIcon: ({ color, focused }) => (focused ? <SelFormatIndent /> : <FormatIndent />),
        }}
      />
      <Tabs.Screen
        name="personal/index"
        options={{
          title: "账户设置",
          tabBarIcon: ({ color, focused }) => (focused ? <SelOutlineHome /> : <OutLineHome />),
        }}
      />
    </Tabs>
  );
}
