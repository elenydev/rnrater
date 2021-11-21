import { AuthKeys } from "infrastructure/api/enums";
import * as SecureStore from "expo-secure-store";

export const saveAuthKey = async (key: AuthKeys, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getAuthValue = async (key: AuthKeys): Promise<string | null> => {
  const value = await SecureStore.getItemAsync(key);

  return value;
};
