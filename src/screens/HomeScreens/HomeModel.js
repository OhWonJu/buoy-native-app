import { API } from "../../../utils/Api";
import _ from "underscore";

export const _GET_HOME = async (endPoints, setDatas, setLoading) => {
  try {
    setLoading(true);
    const weather = await API.get(endPoints[0]);
    const groups = await API.get(endPoints[1]);
    setDatas[0](weather.data);
    setDatas[1](groups.data);
    setLoading(false);
  } catch (e) {
    console.error(e);
  }
};
