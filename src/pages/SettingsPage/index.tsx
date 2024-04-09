import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import DashboardLayout from "../../components/DashboardLayout";
import { userData } from "../../utils/data.util";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import Toast from "../../components/Toast";

export default function SettingsPage() {
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(userData.map((val) => [val.label, val.data]))
  );
  const slicedObj = Object.entries(inputValue);
  const savedInput = Object.fromEntries(slicedObj.slice(0, 4));
  const updInput = Object.fromEntries(slicedObj.slice(4));
  const disableSave = Object.values(savedInput).some((val) => val === "");
  const disableUpd =
    Object.values(updInput).some((val) => val === "") ||
    inputValue["New Password"] !== inputValue["Confirm Password"];
  const [hasError, setHasError] = useState(true);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <DashboardLayout title="Settings">
      <div className={styles.container}>
        <CustomHeader text="User Profile" xtraStyle={styles.title} />
        <Toast
          isErrorMsg
          text="Invalid Password or username"
          showErrorMsg={hasError}
          hideErrorMsg={setHasError}
        />
        <ul className={styles.userInfo}>
          {userData.slice(0, 4).map((data, idx) => (
            <li key={idx}>
              <label htmlFor={data.label}>{data.label}</label>
              <CustomInput
                id={data.label}
                name={data.label}
                value={inputValue[data.label]}
                onChange={handleOnChange}
                type={idx === 3 ? "email" : "text"}
                readOnly={idx === 3}
              />
            </li>
          ))}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton
            title={"Save"}
            xtraStyle={styles.btn}
            disabled={disableSave}
          />
        </div>
        <CustomHeader text="Change Password" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {userData.slice(4).map((data, idx) => (
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
            title="Update"
            xtraStyle={styles.btn}
            disabled={disableUpd}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
