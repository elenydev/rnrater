import { EMAIL_REGEX } from "../../constants/Util";

export interface FormState {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export const defaultValues: FormState = {
  firstName: undefined,
  lastName: undefined,
  nickName: undefined,
  email: undefined,
  password: undefined,
  avatarUrl: undefined,
};

export const validationRules ={
    firstName: {
        required: {
          value: true,
          message: "First Name is required",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Last Name is required",
        },
      },
      nickName: {
        required: {
          value: true,
          message: "Nickname is required",
        },
      },
      email: {
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: EMAIL_REGEX,
          message: "Please provide correct e-mail",
        },
      },
      password: {
        required: {
          value: true,
          message: "Password is required",
        },
      },
      avatar: {
        required: {
          value: true,
          message: "Avatar is required",
        },
      }
}

