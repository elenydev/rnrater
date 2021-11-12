import { map } from "lodash";
import { useEffect, useState, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";

export const useCustomForm = (defaultValues: FieldValues) => {
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    const formErrors = errors ? Object.keys(errors) : undefined;
    const firstErrorKey = formErrors?.length ? formErrors[0] : undefined;
    setFormError(
      firstErrorKey
        ? errors[firstErrorKey as keyof typeof errors]?.message
        : undefined
    );
  }, [...Object.keys(defaultValues).map(key => errors[key])]);

  return {
    handleSubmit,
    reset,
    control,
    formError,
  };
};
