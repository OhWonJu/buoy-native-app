import { API } from "../../../utils/Api";

export async function _GET_HOME(endPoints, setDatas, setLoading) {
  try {
    setLoading(true);
    const weather = await API.get(endPoints[0]);
    const groups = await API.get(endPoints[1]);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
}
