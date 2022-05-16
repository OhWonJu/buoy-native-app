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

export async function _BUOY_ALLOCATE(list, groupId) {
  const listForm = list.map((data) => {
    return { model: data, group_id: groupId, line: 1 };
  });

  try {
    const response = await API.put("detail/buoy/allocate/list", listForm);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function _BUOY_DEALLOCATE(list) {
  const listForm = list.map((data) => {
    return { model: data };
  });
  try {
    const response = await API.put("detail/buoy/deallocate/list", listForm);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function _GROUP_CREATE(form) {
  try {
    const response = await API.post("detail/group/create", form);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function _GROUP_DELETE(id) {
  try {
    const response = await API.post("detail/group/delete", { group_id: id });
    return response;
  } catch (e) {
    console.error;
  }
}
