/**
 * 字符串转数组
 * @param {*} str string
 */
export function formatArr(str) {
  let arr = [];
  // 如果不是对象，直接 return
  if (str !== Object) return;
  Object.keys(str).forEach((v) => {
    let obj = {};
    obj[v] = str[v];
    if (str[v] !== "0") {
      arr.push(v);
    }
  });
  return arr;
}

/**
 * 时间格式化处理
 * @param {*} time 时间
 * @param {*} cFormat 格式
 * @returns 返回结果，字符串
 */
export function formatTime(time, cFormat) {
  if (arguments.length === 0) return null;
  if ((time + "").length === 10) {
    time = time * 1000;
  }
  let format = cFormat || "{y}-{m}-{d}:{h}:{i}:{s}",
    date;
  if (typeof time === "object") {
    date = time;
  } else {
    date = new Date(time);
  }

  let formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() - 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  let time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let val = formatObj[key];
    if (key === "a") return ["一", "二", "三", "四", "五", "六", "日"];
    if (result.length > 0 && val < 10) {
      val = "0" + val;
    }
    return val || 0;
  });
  return time_str;
}

// 类型判断
export class Decide {
  // 判断是否是字符串
  static isString(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "string";
  }
  // 判断是否是number
  static isNumber(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Number";
  }
  // 判断是否有是boolean
  static isBoolean(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
  }
  // 判断是否是函数
  static isFunction(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Function";
  }
  // 判断是否是null
  // static isNull(o) {
  //     return Object.prototype.toString.call(o).slice(8, -1) === 'Null';
  // }
  // 判断是否是Undefined
  static isUndefined(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
  }
  // 判断是否是Obj
  static isObject(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "String";
  }
  // 判断是否是 Date
  static isDate(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Date";
  }
  // 判断是否是数组
  static isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Array";
  }
  // 判断是否是promise
  static isPromise(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
  }
}

/**
 * 校验字符串
 */
export function checkStr(str, type) {
  switch (type) {
    case "phone": // 手机号
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case "pwd": // 密码
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    default:
      return true;
  }
}

/**
 * @param  {s} 秒数
 * @return {String} 字符串
 *
 * @example formatHMS(3610) // -> 1h0m10s
 */
export function formatHMS(s) {
  var str = "";
  if (s > 3600) {
    str = Math.floor(s / 3600) + "h" + Math.floor((s % 3600) / 60) + "m" + (s % 60) + "s";
  } else if (s > 60) {
    str = Math.floor(s / 60) + "m" + (s % 60) + "s";
  } else {
    str = (s % 60) + "s";
  }
  return str;
}

/*获取某月有多少天*/
export function getMonthOfDay(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var mouth = date.getMonth() + 1;
  var days;

  //当月份为二月时，根据闰年还是非闰年判断天数
  if (mouth === 2) {
    days = (year % 4 === 0 && year % 100 === 0 && year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0) ? 28 : 29;
  } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
    //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    days = 31;
  } else {
    //其他月份，天数为：30.
    days = 30;
  }
  return days;
}

/*获取某年有多少天*/
export function getYearOfDay(time) {
  var firstDayYear = this.getFirstDayOfYear(time);
  var lastDayYear = this.getLastDayOfYear(time);
  var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
  return Math.ceil(numSecond / (24 * 3600));
}

/*获取某年的第一天*/
export function getFirstDayOfYear(time) {
  var year = new Date(time).getFullYear();
  return year + "-01-01 00:00:00";
}

/*获取某年最后一天*/
export function getLastDayOfYear(time) {
  var year = new Date(time).getFullYear();
  var dateString = year + "-12-01 00:00:00";
  var endDay = this.getMonthOfDay(dateString);
  return year + "-12-" + endDay + " 23:59:59";
}

/*获取某个日期是当年中的第几天*/
export function getDayOfYear(time) {
  var firstDayYear = this.getFirstDayOfYear(time);
  var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
  return Math.ceil(numSecond / (24 * 3600));
}

/*获取某个日期在这一年的第几周*/
export function getDayOfYearWeek(time) {
  var numdays = this.getDayOfYear(time);
  return Math.ceil(numdays / 7);
}

/**
 * 返回指定长度的天数集合
 *
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
 * @return {Array} 数组
 *
 * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
 */
export function getDays(time, len, diretion) {
  var tt = new Date(time);
  var getDay = function (day) {
    var t = new Date(time);
    t.setDate(t.getDate() + day);
    var m = t.getMonth() + 1;
    return t.getFullYear() + "-" + m + "-" + t.getDate();
  };
  var arr = [];
  if (diretion === 1) {
    for (var i = 1; i <= len; i++) {
      arr.unshift(getDay(-i));
    }
  } else if (diretion === 2) {
    for (var i = 1; i <= len; i++) {
      arr.push(getDay(i));
    }
  } else {
    for (var i = 1; i <= len; i++) {
      arr.unshift(getDay(-i));
    }
    arr.push(tt.getFullYear() + "-" + (tt.getMonth() + 1) + "-" + tt.getDate());
    for (var i = 1; i <= len; i++) {
      arr.push(getDay(i));
    }
  }
  return diretion === 1
    ? arr.concat([tt.getFullYear() + "-" + (tt.getMonth() + 1) + "-" + tt.getDate()])
    : diretion === 2
    ? [tt.getFullYear() + "-" + (tt.getMonth() + 1) + "-" + tt.getDate()].concat(arr)
    : arr;
}

/**
 * 去除字符串空格
 * @param {String} str 字符串 需要去除空格的
 * @param {*} type 类型
 *  1 所有空格，
 *  2 前后空格
 *  3 前空格
 *  4 后空格
 */
export function trim(str, type) {
  type = type || 1;
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}

/**
 * 随机字符串
 */
export function random(min, max) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    return null;
  }
}
