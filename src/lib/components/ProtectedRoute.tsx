import { Navigate } from "react-router-dom";

type Props = {
  ifReturn: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({ ifReturn, children }: Props) => {
  if (ifReturn) return children;

  return <Navigate to="/" replace={true} />;
};
