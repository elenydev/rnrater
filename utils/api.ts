export const DATABASE_URL = "http://192.168.0.21:8080";

export const API_URL = {
  AUTH: {
    CREATE_USER: `${DATABASE_URL}/user/post/createUser`,
    AUTHENTICATE_USER: `${DATABASE_URL}/user/post/authenticateUser`,
  },
  USER: {
    GET_USER_AVATAR: `${DATABASE_URL}/user/get/userAvatar`
  },
  CATEGORIES: {
    GET_LIST: `${DATABASE_URL}/category/get/getList`
  }
};
