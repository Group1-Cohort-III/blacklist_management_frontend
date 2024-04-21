import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { isValidEmail } from "../../utils/validemail.util";
import { loginUser } from "../../services/actions/login.action";
import { resetMsg } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";
import { decodeUserData } from "../../utils/jwt.util";
import { UserData } from "../../interfaces/slice.interface";

export default function LoginPage() {
  const { isLoading, message, status, isAuth, token } = useAppSelector(
    (state) => state.auth
  );
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useAppDispatch();
  const { role } = (decodeUserData(token as string) as UserData) || "Users";
  const disabled =
    Object.values(inputValue).some((value) => value === "") ||
    !isValidEmail(inputValue.email) ||
    isLoading;

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!disabled) {
      dispatch(loginUser(inputValue));
    }
  };

  const changeRoute = (path: string) => {
    dispatch(resetMsg());
    navigate(path);
  };

  // Handle on Browser Refreshed
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      dispatch(resetMsg());
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  // LOGIN TO THE USER'S RESPECTIVE SCREEN IF SUCCESSFULL
  useEffect(() => {
    setShowToast(message !== null);

    if (isAuth && role) {
      setInputValue({ email: "", password: "" });
      navigate(`/dashboard/${role === "UserAdmin" ? "users" : "blacklist"}`, {
        replace: true,
      });
    }
  }, [message, isAuth, navigate, role]);

  useEffect(() => {
    document.title = `BlackGuard | Login`;

    return () => {
      document.title = "BlackGuard";
      if (message) dispatch(resetMsg());
    };
  }, [dispatch, message]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <CustomHeader text="Admin Login" size="medium" />
          <CustomHeader text="Welcome back" xtraStyle={styles.subTitle} />
          <Toast
            isErrorMsg={status ? status >= 400 : false}
            text={message && message}
            showErrorMsg={showToast}
            hideErrorMsg={setShowToast}
          />
          <CustomInput
            type="email"
            name="email"
            required
            value={inputValue.email}
            onChange={handleOnChange}
            placeholder="Email"
            xtraStyle={styles.emailInput}
          />
          <CustomInput
            id="password"
            required
            type="password"
            name="password"
            value={inputValue.password}
            onChange={handleOnChange}
            placeholder="Password"
            xtraStyle={styles.emailInput}
            showPostIcon
          />
          <CustomButton
            type="submit"
            title={isLoading ? "Logining" : "Login"}
            showLoader={isLoading}
            disabled={disabled}
            xtraStyle={styles.btn}
          />
          <p className={styles.dont}>
            Don't have password?{" "}
            <span onClick={() => changeRoute("/setpassword")}>
              Set Password
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
