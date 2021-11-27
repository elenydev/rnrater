import * as SecureStore from "expo-secure-store";

export const setSecureItem = async (
  key: string,
  value: string
): Promise<void> => {
  return await SecureStore.setItemAsync(key, value);
};

export const getSecureItem = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};
