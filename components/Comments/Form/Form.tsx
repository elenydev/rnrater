import React, { useCallback } from "react";
import { Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "../../Themed";
import { StyleSheet, TextInput } from "react-native";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFormManager } from "../../../managers/FormManager/selectors";
import { FormInstanceName } from "../../../managers/FormManager/enums";
import { defaultValues, validationRules } from "./formConfig";
import { postCommentTrigger } from "../domain/actions";
import { CategoryStackRoutesProps } from "../../../infrastructure/router/interfaces";
import { CategoryStackRoutes } from "../../../infrastructure/router/enums";
import { useRoute } from "@react-navigation/native";
import { getCurrentUser } from "../../../components/Auth/domain/selectors";

const Form = () => {
  const dispatch = useDispatch();
  const formManager = useSelector(getFormManager, shallowEqual);
  const user = useSelector(getCurrentUser, shallowEqual);
  const { formInstance, formError } = useCustomForm({
    defaultValues,
  });
  const { setValue, control, handleSubmit } = formInstance;
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();

  const handleAddComment = useCallback(
    (data: { comment: string }) => {
      dispatch(
        postCommentTrigger({
          content: data.comment,
          categoryPostId: params.categoryEntityId,
          authorId: user?.userId!,
        })
      );
    },
    [params.categoryEntityId, user?.userId]
  );

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
              placeholder="Add comment"
              multiline
            />
          )}
          rules={validationRules.comment}
        />

        <FontAwesome.Button
          size={10}
          name="send"
          onPress={handleSubmit(handleAddComment)}
        >
          Add
        </FontAwesome.Button>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginRight: 15,
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
