import "./storage";

export default class StorageOpt {
  /**
   * 保存
   * @param {key} key
   * @param {data} data
   * @param {expires} expires
   */
  static save(key, data, expires) {
    storage.save({
      key: key,
      data: data,
      expires: expires, // 设置过期时间
    });
  }

  /**
   * 读取
   * @param {key} key
   * @param {callabck} callBack
   */
  static loaddata(key, callBack) {
    storage
      .load({
        key: key,
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
            // 各种参数
          },
          someFlag: true,
        },
      })
      .then((ret) => {
        callBack(ret);
      })
      .catch((err) => {
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break;
          case "ExpiredError":
            // TODO
            break;
        }
        //没找到数据返回空
        callBack("");
      });
  }

  /**
   * 删除
   * @param {key} key
   */
  static delete(key) {
    storage.remove({ key: key });
  }
}
