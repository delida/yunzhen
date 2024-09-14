import constant from "@/expand/api";
import { request } from "@/expand/request";
import useLandStore from "@/stores/land";
import DeviceStorage from "@/utils/DeviceStorage";
const { get_soild_list, add_land, upload_land, upload_quality, update_notification, message_url } = constant;

export default () => {
  const { setLandList } = useLandStore();

  const getSolidListData = async () => {
    let token = await DeviceStorage.get("token");
    request(get_soild_list, "get", null, token)
      .then((res) => {
        let data = res;

        setLandList(data);
      })
      .catch((err) => {});
  };

  const addLand = async (data) => {
    let token = await DeviceStorage.get("token");
    return request(add_land, "POST", data, token)
      .then((res) => {
        let data = res;
      })
      .catch((err) => {});
  };

  const updateLand = async (data) => {
    let token = await DeviceStorage.get("token");
    return request(upload_land, "POST", data, token)
      .then((res) => {
        let data = res;
      })
      .catch((err) => {});
  };

  const uploadLandFile = async (data) => {
    let token = await DeviceStorage.get("token");
    return request(upload_quality, "POST", data, token)
      .then((res) => {
        let data = res;
      })
      .catch((err) => {});
  };

  return {
    addLand,
    updateLand,
    getSolidListData,
    uploadLandFile,
  };
};
