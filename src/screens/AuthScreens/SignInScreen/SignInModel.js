import { _POST } from "../../../../utils/Api";

export const _LOGIN = async (params, setLoading) => {
  setLoading(true);
  const result = await _POST("user/login", params);
  setLoading(false);
  return result.data;
};
