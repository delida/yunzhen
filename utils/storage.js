import { AsyncStorage } from "react-native";
import Storage from "react-native-storage";

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null, // 用不过期
  enableCache: true,
});

// 导出react native 全局
global.storage = storage;

storage.sync = require("./RNAsyncStorage_Asyn").asyncdata;
