import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { isValidEmail } from "../../utils/validemail.util";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";

export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    email: "",
    psd: "",
  });
  const navigate = useNavigate();
  const disabled =
    Object.values(inputValue).some((value) => value === "") ||
    !isValidEmail(inputValue.email);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    document.title = `BlackGuard | Login`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Logo" />
        </div>
        <form>
          <CustomHeader text="Admin Login" size="medium" />
          <CustomHeader text="Welcome back" xtraStyle={styles.subTitle} />
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
            id="psd"
            required
            type="password"
            name="psd"
            value={inputValue.psd}
            onChange={handleOnChange}
            placeholder="Password"
            xtraStyle={styles.emailInput}
            showPostIcon
          />
          <CustomButton
            title="Login"
            disabled={disabled}
            xtraStyle={styles.btn}
            onClick={() => navigate("/setpassword")}
          />
        </form>
      </div>
    </div>
  );
}
