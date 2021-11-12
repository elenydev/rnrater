import {  useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface HookProps {
  defaultValues: FieldValues
}

export const useCustomForm = ({defaultValues}: HookProps) => {
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
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
  }, [...Object.keys(defaultValues).map((key) => errors[key]), errors]);

  return {
    handleSubmit,
    reset,
    control,
    formError,
    setValue,
  };
};
