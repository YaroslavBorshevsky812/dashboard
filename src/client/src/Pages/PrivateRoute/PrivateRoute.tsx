import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { FC } from "react";

interface Props {
  /** Дочерние компоненты. */
  children?: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
const PrivateRoute: FC<Props> = ({ children }) => {
  const [jwt] = useLocalStorage("", "jwt");
  
  return jwt ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;