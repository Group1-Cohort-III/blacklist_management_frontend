import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { isValidEmail } from "../../utils/validemail.util";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaCheck } from "react-icons/fa";
import { HomeLogo } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { resetMsg, resetSuccess } from "../../store/slices/setpassword.slice";
import { setPassword } from "../../services/actions/setpassword.action";
import Toast from "../../components/Toast";

export default function SetPasswordPage() {
  const { isLoading, message, status, success } = useAppSelector(
    (state) => state.setPassword
  );
  const [isValid, setIsValid] = useState({
    isSixLen: false,
    isUpper: false,
    isLower: false,
    isNumeric: false,
    isSpeical: false,
    isMatched: false,
  });
  const [inputValue, setInputValue] = useState({
    email: "",
    psd: "",
    confirmPsd: "",
  });
  const { email, psd, confirmPsd } = inputValue;
  const navigate = useNavigate();
  const inputData = [
    { type: "email", ph: "Email", value: email, name: "email" },
    { type: "password", ph: "New Password", value: psd, name: "psd" },
    {
      type: "password",
      ph: "Confirm Password",
      value: confirmPsd,
      name: "confirmPsd",
    },
  ];
  const psdCondition = [
    { text: "Must be 6 characters or more", status: isValid.isSixLen },
    { text: "Must have atleast one uppercase letter", status: isValid.isUpper },
    { text: "Must have atleast one lowercase letter", status: isValid.isLower },
    { text: "Must have atleast one number", status: isValid.isNumeric },
    {
      text: "Must have atleast one special character",
      status: isValid.isSpeical,
    },
    { text: "Must match with confirm password", status: isValid.isMatched },
  ];
  const isUpper = useMemo(() => /[A-Z]/, []);
  const isLower = useMemo(() => /[a-z]/, []);
  const isNumeric = useMemo(() => /[0-9]/, []);
  const isSpecial = useMemo(() => /[!@#$%^&*(=+-_?)]/, []);
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const disabled =
    Object.values(inputValue).some((value) => value === "") ||
    psd !== confirmPsd ||
    isLoading ||
    !isValidEmail(email) ||
    Object.values(isValid).some((value) => value === false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!disabled) {
      dispatch(
        setPassword({ email, password: psd, confirmPassword: confirmPsd })
      );
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

  useEffect(() => {
    setShowToast(message !== null);

    if (!message) {
      dispatch(resetMsg());
    }

    if (success) {
      setInputValue({ email: "", psd: "", confirmPsd: "" });
      navigate("/login");
      dispatch(resetMsg());
      dispatch(resetSuccess());
    }
  }, [dispatch, message, navigate, success]);

  useEffect(() => {
    document.title = `BlackGuard | Set Password`;

    setIsValid((prev) => ({
      ...prev,
      isSixLen: psd.length >= 6,
      isUpper: isUpper.test(psd),
      isLower: isLower.test(psd),
      isNumeric: isNumeric.test(psd),
      isSpeical: isSpecial.test(psd),
      isMatched: psd === confirmPsd && psd !== "",
    }));

    return () => {
      document.title = "BlackGuard";
    };
  }, [confirmPsd, isLower, isNumeric, isSpecial, isUpper, psd]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <CustomHeader text="Create New Password" size="medium" />
          <CustomHeader
            text="Set a new password for your account"
            xtraStyle={styles.subTitle}
          />
          <Toast
            isErrorMsg={status ? status >= 400 : false}
            text={message && message}
            showErrorMsg={showToast}
            hideErrorMsg={setShowToast}
          />
          {inputData.map((data, i) => (
            <CustomInput
              key={i}
              name={data.name}
              type={data.type}
              placeholder={data.ph}
              value={data.value}
              onChange={handleOnChange}
              xtraStyle={styles.emailInput}
              showPostIcon={data.type.startsWith("password")}
            />
          ))}
          <div className={styles.condition}>
            <h6>Use the following for your password</h6>
            <ul>
              {psdCondition.map((data, i) => (
                <li key={i} className={data.status ? styles.active : ""}>
                  {data.text} {data.status && <FaCheck />}
                </li>
              ))}
            </ul>
          </div>
          <CustomButton
            type="submit"
            title={isLoading ? "Continueing" : "Continue"}
            showLoader={isLoading}
            disabled={disabled}
            xtraStyle={styles.btn}
          />
          <p className={styles.dont}>
            Have password already?{" "}
            <span onClick={() => changeRoute("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
