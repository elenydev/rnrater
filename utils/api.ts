export const DATABASE_URL = "http://192.168.0.23:8080";

export const API_URL = {
  AUTH: {
    CREATE_USER: `${DATABASE_URL}/user/post/createUser`,
    AUTHENTICATE_USER: `${DATABASE_URL}/user/post/authenticateUser`,
  },
  USER: {
    GET_USER_AVATAR: `${DATABASE_URL}/user/get/userAvatar`
  },
  CATEGORY: {
    GET_LIST: `${DATABASE_URL}/category/get/getList`,
    CREATE_CATEGORY: `${DATABASE_URL}/category/post/createCategory`,
    GET_CATEGORY_COVER_IMAGE: `${DATABASE_URL}/category/get/getCategoryImage`,
  },
  CATEGORY_POST: {
    GET_LIST: `${DATABASE_URL}/categoryPost/get/getList`,
    GET_BY_ID: `${DATABASE_URL}/categoryPost/get/getById`,
    CREATE_CATEGORY_POST: `${DATABASE_URL}/categoryPost/post/createCategoryPost`
  }
};
