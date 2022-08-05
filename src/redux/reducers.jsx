export const postsReducer = (state, action) => {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" };
    case "POSTS_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
export const profileReducer = (state, action) => {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PROFILE_SUCCESS":
      return { ...state, loading: false, profile: action.payload, error: "" };
    case "PROFILE_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
export const photosReducer = (state, action) => {
  switch (action.type) {
    case "PHOTOS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PHOTOS_SUCCESS":
      return { ...state, loading: false, photos: action.payload, error: "" };
    case "PHOTOS_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
