import { _POST, _POST2 } from "../../../../utils/Api";

export const _REQUEST_EMAIL_CODE = async (email, setLoading) => {
  const result = {
    ok: false,
    error: null,
  };
  setLoading(true);
  const check = await _POST("user/check", email);
  if (check.data.message === 1) {
    result.error = "Email exist.";
    return result;
  }
  const emailCode = await _POST("user/email/key", email);
  emailCode.data.code === 1 && (result.ok = true);
  setLoading(false);
  return result;
};

export const _CONFIRM_EMAIL_CODE = async (params) => {
  const codeConfirm = await _POST("user/email/auth", params);
  if (codeConfirm.data.code === 1) return true;
  return false;
};

export const _CREATE_ACCOUNT = async (params, setCreateLoading) => {
  setCreateLoading(true);
  const result = await _POST("user/register", params);
  if (result.data.code === 1) return true;
  setCreateLoading(false);
  return false;
};
