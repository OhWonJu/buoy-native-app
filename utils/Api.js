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
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false };
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
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function _BUOY_DEALLOCATE(bouyName) {
  const target = { model: bouyName };
  try {
    const response = await API.put("detail/buoy/deallocate", target);
    return response;
  } catch (e) {
    console.error(e);
  }
}
