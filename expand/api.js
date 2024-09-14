const constant = {
  base_url: "https://yunzhen.moheng.tech/",
  // base_url: 'http://139.9.106.34:4001/',
  register: "appapi/register",
  login: "appapi/login",
  refreshtoken: "appapi/op/refreshtoken", /// 刷新token
  send_code: "appapi/sendOTP",
  auth_code: "appapi/verifyOTP",
  resetpwd: "appapi/resetpwd",
  changepass: "appapi/op/appuser/changepassword",
  update: "/appapi/op/appuser/update",
  test: "appapi/test",
  upload_file: "appapi/op/appuser/uploadAvatarImage", // 上传头像
  get_user_info: "appapi/op/appuser/getUserInfo", // 获取头像
  get_soild_list: "appapi/op/appsoil/mySoilList", // 土地信息
  upload_quality: "appapi/op/appsoil/uploadQualityReportImage", // 上传土地凭证
  upload_land: "appapi/op/appsoil/update", // 更新土地
  add_land: "appapi/op/appsoil/add", // 添加土地
  test_register: "appapi/test/mockregiester", // 测试注册
  message_url: "appapi/op/appuser/notification/get", // 获取消息
  update_addr: "appapi/op/appuser/update_addr", // 更新地址
  update_notification: "appapi/op/appuser/notification/update", // 更新消息数
  cropconfig: "appapi/op/appcrop/cropconfig", // 农作物改良
  diagnose: "appapi/op/appcrop/diagnose", // diagnose
};

export default constant;
