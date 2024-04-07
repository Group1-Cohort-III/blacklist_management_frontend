import styles from "./styles.module.scss";
import DashNavbar from "../DashNavbar";
import { useEffect } from "react";
import Sidebar from "../Sidebar";

interface Props {
  children: React.ReactElement;
  title: string;
}

export default function DashboardLayout({ children, title }: Props) {
  useEffect(() => {
    document.title = `BlackGuard | ${title}`;
    return () => {
      document.title = "BlackGuard";
    };
  }, [title]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <DashNavbar title={title} />
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
