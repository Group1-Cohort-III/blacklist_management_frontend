import { CustomInput } from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import DashboardLayout from "../../components/DashboardLayout";
import { UserData } from "../../interfaces/slice.interface";
import { useAppSelector } from "../../hooks/store.hook";
import { decodeUserData } from "../../utils/jwt.util";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { formatDate } from "../../utils/formatdate.util";

export default function SettingsPage() {
  const { token } = useAppSelector((state) => state.auth);
  const userInfo: UserData | null = token ? decodeUserData(token) : null;
  const fname = userInfo?.given_name.split(" ")[0];
  const lname = userInfo?.given_name.split(" ")[1];

  const userData = [
    { label: "First Name", data: fname || "None" },
    { label: "Last Name", data: lname || "None" },
    { label: "Email", data: userInfo?.email || "None" },
    { label: "Role", data: userInfo?.role || "None" },
    { label: "Date Created", data: formatDate("2024-04-11T21:43:49.6089055")},
    { label: "Current Password", data: "" },
    { label: "New Password", data: "" },
    { label: "Confirm Password", data: "" },
  ];

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

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <DashboardLayout title="Settings">
      <div className={styles.container}>
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
                readOnly={
                  data.label === "Email" ||
                  data.label === "Role" ||
                  data.label === "Date Created"
                }
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
            title="Update"
            xtraStyle={styles.btn}
            disabled={disableUpd}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
