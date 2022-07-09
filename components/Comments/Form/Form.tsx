import React, { useCallback } from "react";
import { Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "../../Themed";
import { StyleSheet, TextInput } from "react-native";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { useDispatch, useSelector } from "react-redux";
import { getFormManager } from "../../../managers/FormManager/selectors";
import { FormInstanceName } from "../../../managers/FormManager/enums";
import { defaultValues, validationRules } from "./formConfig";
import { CreateCommentParams } from "../../../api/comments/intefaces";
import { postCommentTrigger } from "../domain/actions";

const Form = () => {
  const dispatch = useDispatch();
  const formManager = useSelector(getFormManager);
  const { formInstance, formError } = useCustomForm({
    defaultValues,
  });
  const { setValue, control, handleSubmit } = formInstance;

  const handleAddComment = useCallback((data: CreateCommentParams) => {
    dispatch(postCommentTrigger(data));
  }, []);

  formManager.setFormInstance({
    formName: FormInstanceName.CreateComment,
    formInstance,
    additionalActions: () => setValue("comment", undefined),
  });

  return (
    <>
      <View style={styles.formContainer}>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="First Name"
            />
          )}
          rules={validationRules.comment}
        />

        <FontAwesome.Button
          size={10}
          name="send"
          onPress={handleSubmit(handleAddComment)}
        />
      </View>
      <View>
        {formError && <Text style={styles.validationText}>{formError}</Text>}
      </View>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    elevation: 2,
  },
  input: {
    width: "90%",
    fontSize: 16,
    padding: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  validationContainer: {
    padding: 10,
    textAlign: "center",
  },
  validationText: {
    color: "#ff0000",
    marginTop: 14,
  },
});
