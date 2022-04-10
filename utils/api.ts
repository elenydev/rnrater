export const DATABASE_URL = "http://192.168.0.23:8080";

export const API_URL = {
  AUTH: {
    CREATE_USER: `${DATABASE_URL}/user/post/createUser`,
    AUTHENTICATE_USER: `${DATABASE_URL}/user/post/authenticateUser`,
  },
  USER: {
    GET_USER_AVATAR: `${DATABASE_URL}/user/get/userAvatar`
  },
  CATEGORIES: {
    GET_LIST: `${DATABASE_URL}/categories/get/getList`,
    CREATE_CATEGORY: `${DATABASE_URL}/categories/post/createCategory`,
    GET_CATEGORY_COVER_IMAGE: `${DATABASE_URL}/categories/get/getCategoryImage`
  }
};
