import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.0.20:3124/",
  timeout: 30000,
  headers: {
    accept: "apllication/json",
    // "Content-Type": "application/x-www-form-urlencoded",
    // Authorization: "",
  },
});

export async function _GET(endPoint, setData, setLoading) {
  try {
    const response = await API.get(endPoint);
    setData(response.data);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
}

export async function _REFECTH(endPoint, setData) {
  try {
    const response = await API.get(endPoint);
    setData(response.data);
  } catch (e) {
    console.error(e);
  }
}

export async function _POST(endPoint, params) {
  try {
    const response = await API.post(endPoint, params);
    // console.log(response);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export function _POST2(endPoint, params) {
  console.log(endPoint, params);
  API.post("user/check", params)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
