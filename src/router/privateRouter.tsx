import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { isTokenExpired } from "../utils/jwt.util";
import SelectOption from "../pages/SelectOption";
import { logoutUser } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrivateRouter({ children }: Props) {
  const { isAuth, isExpired, token } = useAppSelector((state) => state.auth);
  const hasTokenExpired = isTokenExpired(token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpired || hasTokenExpired) {
      navigate("/login", { replace: true });
      dispatch(logoutUser());
    }
  }, [dispatch, hasTokenExpired, isExpired, navigate]);

  if (!isAuth) {
    return <SelectOption />;
  }

  return children;
}
