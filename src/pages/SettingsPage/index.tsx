import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { setPassword } from "../../services/actions/setpassword.action";
import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { resetMsg } from "../../store/slices/setpassword.slice";
import DashboardLayout from "../../components/DashboardLayout";
import { UserData } from "../../interfaces/slice.interface";
import { ChangeEvent, useEffect, useState } from "react";
import { decodeUserData } from "../../utils/jwt.util";
import { userDataFunc } from "../../utils/data.util";
import styles from "./styles.module.scss";
import Toast from "../../components/Toast";

export default function SettingsPage() {
  const { token } = useAppSelector((state) => state.auth);
  const { isLoading, message, status, success } = useAppSelector(
    (state) => state.setPassword
  );
  const userInfo: UserData | null = token ? decodeUserData(token) : null;
  const email = userInfo?.email;
  const dispatch = useAppDispatch();
  const userData = userDataFunc(userInfo);
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(userData.map((val) => [val.label, val.data]))
  );
  const slicedObj = Object.entries(inputValue);
  const updInput = Object.fromEntries(slicedObj.slice(4));
  const [showToast, setShowToast] = useState(false);

  const disableUpd =
    Object.values(updInput).some((val) => val === "") ||
    inputValue["New Password"] !== inputValue["Confirm Password"] ||
    isLoading;

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    setShowToast(message !== null);

    if (success) {
      // Reset Password Input
      setInputValue((prev) => ({
        ...prev,
        "Current Password": "",
        "New Password": "",
        "Confirm Password": "",
      }));
    }

    return () => {
      if (message) dispatch(resetMsg());
    };
  }, [dispatch, message, success]);

  const changePassword = () => {
    if (!disableUpd && email) {
      dispatch(
        setPassword({
          email,
          password: inputValue["New Password"].trim(),
          confirmPassword: inputValue["Confirm Password"].trim(),
        })
      );
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className={styles.container}>
        <Toast
          isErrorMsg={status ? status >= 400 : false}
          text={message && message}
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />
        <CustomHeader text="User Profile" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {userData.slice(0, 5).map((data, idx) => (
            <li key={idx}>
              <label htmlFor={data.label}>{data.label}</label>
              <CustomInput
                id={data.label}
                name={data.label}
                value={inputValue[data.label]}
                onChange={handleOnChange}
                type={idx === 3 ? "email" : "text"}
                disabled
              />
            </li>
          ))}
        </ul>
        <CustomHeader text="Change Password" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {userData.slice(5).map((data, idx) => (
            <li key={idx}>
              <label htmlFor={data.label}>{data.label}</label>
              <CustomInput
                id={data.label}
                type="password"
                name={data.label}
                value={inputValue[data.label]}
                onChange={handleOnChange}
                showPostIcon
              />
            </li>
          ))}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton
            title={isLoading ? "changing" : "change password"}
            xtraStyle={styles.btn}
            disabled={disableUpd}
            showLoader={isLoading}
            onClick={changePassword}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
