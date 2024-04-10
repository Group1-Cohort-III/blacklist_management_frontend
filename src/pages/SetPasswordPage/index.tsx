import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";

export default function SetPasswordPage() {
  const [isValid, setIsValid] = useState({
    isSixLen: false,
    isUpper: false,
    isLower: false,
    isNumeric: false,
  });
  const [inputValue, setInputValue] = useState({
    fname: "",
    lname: "",
    psd: "",
    confirmPsd: "",
  });
  const { fname, lname, psd, confirmPsd } = inputValue;
  const navigate = useNavigate();
  const inputData = [
    { type: "text", ph: "First Name", value: fname, name: "fname" },
    { type: "text", ph: "Last Name", value: lname, name: "lname" },
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
  ];
  const isUpper = useMemo(() => /[A-Z]/, []);
  const isLower = useMemo(() => /[a-z]/, []);
  const isNumeric = useMemo(() => /[0-9]/, []);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const disabled =
    Object.values(inputValue).some((value) => value === "") ||
    psd !== confirmPsd ||
    Object.values(isValid).some((value) => value === false);

  useEffect(() => {
    document.title = `BlackGuard | Set Password`;
    setIsValid((prev) => ({
      ...prev,
      isSixLen: psd.length >= 6,
      isUpper: isUpper.test(psd),
      isLower: isLower.test(psd),
      isNumeric: isNumeric.test(psd),
    }));
    return () => {
      document.title = "BlackGuard";
    };
  }, [isLower, isNumeric, isUpper, psd]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Logo" />
        </div>
        <form>
          <CustomHeader text="Create New Password" size="medium" />
          <CustomHeader
            text="Set a new password for your account"
            xtraStyle={styles.subTitle}
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
                  {data.text}
                </li>
              ))}
            </ul>
          </div>
          <CustomButton
            title="Continue"
            disabled={disabled}
            xtraStyle={styles.btn}
            onClick={() => navigate("/dashboard/users")}
          />
        </form>
      </div>
    </div>
  );
}
