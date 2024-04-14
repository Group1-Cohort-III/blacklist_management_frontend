import { UserData } from "../../interfaces/slice.interface";
import { useAppSelector } from "../../hooks/store.hook";
import { decodeUserData } from "../../utils/jwt.util";
import styles from "./styles.module.scss";
import DashNavbar from "../DashNavbar";
import { useEffect } from "react";
import Sidebar from "../Sidebar";

interface Props {
  children: React.ReactElement;
  title: string;
}

export default function DashboardLayout({ children, title }: Props) {
  const { token } = useAppSelector((state) => state.auth);
  const userData: UserData | null = token ? decodeUserData(token) : null;

  useEffect(() => {
    document.title = `BlackGuard | ${title}`;
    return () => {
      document.title = "BlackGuard";
    };
  }, [title]);

  return (
    <div className={styles.container}>
      <Sidebar userData={userData} />
      <div className={styles.content}>
        <DashNavbar title={title} userData={userData} />
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
