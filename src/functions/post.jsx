import clientAxios from "../config/Axios";
import { tokenHeaders } from "../config/headers";

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token,
  textColor
) => {
  try {
    const info = { type, background, text, images, user, textColor };
    const { data } = await clientAxios.post("/post", info, tokenHeaders(token));
    return { data, ok: true };
  } catch (e) {
    const error = e.response.data.errors
      ? e.response.data.errors[0].msg
      : e.response.data.msg;
    return { error, ok: false };
  }
};
