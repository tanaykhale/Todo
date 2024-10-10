import { Navigate, Outlet } from "react-router-dom";

type Prop = {
  auth: boolean | null;
};

const AuthGuard = ({ auth }: Prop): JSX.Element | null => {
  if (auth) {
    return <Outlet />;
  }

  return <Navigate to="/signup" replace />;
};

export default AuthGuard;
