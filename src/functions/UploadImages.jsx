import clientAxios from "../config/Axios";
import { tokenHeadersFormData } from "../config/headers";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await clientAxios.post(
      "/upload",
      formData,
      tokenHeadersFormData(token)
    );
    return { data, ok: true };
  } catch (e) {
    const error = e.response.data.errors
      ? e.response.data.errors[0].msg
      : e.response.data.msg;
    return { error, ok: false };
  }
};
