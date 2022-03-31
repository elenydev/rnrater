import React from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../../components/Loader";

interface ComponentProps {
  children: JSX.Element;
}

const AuthProvider: React.FC<ComponentProps> = (props: ComponentProps): JSX.Element => {
  const { isLoading } = useAuth();

  return isLoading ? <Loader /> : props.children;
};

export default AuthProvider;
