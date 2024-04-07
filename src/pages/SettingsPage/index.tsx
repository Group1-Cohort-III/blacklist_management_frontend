import DashboardLayout from "../../components/DashboardLayout";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { CustomInput } from "../../components/common/CustomInput";
import styles from "./styles.module.scss";

export default function SettingsPage() {
  const userData = [
    { label: "First Name", data: "Vicolas" },
    { label: "Last Name", data: "Akoh" },
    { label: "Username", data: "Vicolas11" },
    { label: "Email", data: "vicolas@email.com" },
  ];

  return (
    <DashboardLayout title="Settings">
      <div className={styles.container}>
        <CustomHeader text="User Profile" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {userData.map((data, idx) => (
            <li key={idx}>
              <label htmlFor={data.label}>{data.label}</label>
              <CustomInput
                id={data.label}
                value={data.data}
                type={idx === 3 ? "email" : "text"}
                readOnly={idx === 3}
              />
            </li>
          ))}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton title="Save" xtraStyle={styles.btn} />
        </div>
        <CustomHeader text="Change Password" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {["Current Password", "New Password", "Confirm Password"].map(
            (data, idx) => (
              <li key={idx}>
                <label htmlFor={data}>{data}</label>
                <CustomInput id={data} type="email" />
              </li>
            )
          )}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton title="Update" xtraStyle={styles.btn} />
        </div>
      </div>
    </DashboardLayout>
  );
}
