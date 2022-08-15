import { EMAIL_REGEX } from '../../../constants/Util';

export interface FormState {
  email?: string
  password?: string
}

export const defaultValues: FormState = {
  email: undefined,
  password: undefined
};

export const validationRules = {
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: EMAIL_REGEX,
      message: 'Please provide correct e-mail'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: 8,
      message: 'Password has to include min. 8 characters'
    }
  }
};
