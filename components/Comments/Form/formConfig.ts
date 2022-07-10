export interface FormState {
  comment?: string;
}

export const defaultValues: FormState = {
  comment: undefined,
};

export const validationRules = {
  comment: {
    required: {
      value: true,
      message: "You cannot post empty comment",
    },
  },
};
