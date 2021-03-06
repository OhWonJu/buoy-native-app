import { API } from "../../../utils/Api";

export async function _GET_PAGE(endPoint, oldData, setData, setPage) {
  try {
    const response = await API.get(endPoint);
    let newData = oldData.concat(response.data);
    setData(newData);
    setPage((prev) => prev + 1);
  } catch (e) {
    console.error(e);
  }
}

export async function _GROUP_EDIT(params) {
  try {
    const response = await API.put("detail/group/modify", params);
  } catch (e) {
    console.error(e);
  }
}
