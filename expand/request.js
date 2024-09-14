import axios from "axios";
import constant from "./api";

const { base_url } = constant;

export function request(url, method, data, token) {
  console.log("url", url);
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
        jwttoken: token === null ? "" : token,
      },
      method: method,
      ...(["GET", "get"].includes(method)
        ? {}
        : {
            data: data === null ? "" : data,
          }),
    })
      .then((res) => {
        console.log(url, res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log(url, "错误", err);
        reject(err);
      });
  });
}
