import clientAxios from "../config/Axios";
import { tokenHeaders } from "../config/headers";

export const updateProfilePictureUser = async (url, token) => {
  try {
    const info = { url };
    const { data } = await clientAxios.put(
      "/users/updateProfilePicture",
      info,
      tokenHeaders(token)
    );
    return { data, ok: true };
  } catch (e) {
    const error = e.response.data.errors
      ? e.response.data.errors[0].msg
      : e.response.data.msg;
    return { error, ok: false };
  }
};
