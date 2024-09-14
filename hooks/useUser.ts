import axios from "axios";

const { get_user_info, base_url } = constant;
import constant from "@/expand/api";
import DeviceStorage from "@/utils/DeviceStorage";
import useUserStore from "@/stores/user";

export default () => {
  const { setUserInfo, userInfo } = useUserStore();

  const getUserInfo = async () => {
    let token = await DeviceStorage.get("token");
    axios({
      baseURL: base_url,
      url: get_user_info,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwttoken: token === null ? "" : token,
      },
    })
      .then((ret) => {
        let data = ret.data;
        // console.log("userInfo----", data);
        let address = `${data.city}${data.province}${data.district}`;
        console.log("address", address);
        setUserInfo({
          ...data,
          address,
        });
      })
      .catch((err) => {});
  };

  return {
    userInfo,
    getUserInfo,
  };
};
