import { useSelector } from "react-redux";
import { getUserStoreLoading } from "../../../components/Auth/domain/selectors";

export const useAuth = () => {
  const isLoading = useSelector(getUserStoreLoading);

  return {
    isLoading,
  };
};
