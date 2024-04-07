import CustomHeader from "../common/CustomHeader";
import { IoMdSettings } from "react-icons/io";
import styles from "./styles.module.scss";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

export default function DashNavbar({ title }: Props) {
  const navigate = useNavigate();

  return (
    <nav className={styles.dashNavbar}>
      <CustomHeader text={title} size="medium" />
      <div className={styles.right}>
        <span
          className={styles.settings}
          onClick={() => navigate("/dashboard/settings")}
        >
          <IoMdSettings />
        </span>
        <div className={styles.title}>
          <div className={styles.name}>
            <h4>Vicolas Akoh</h4>
            <h6>User Admin</h6>
          </div>
          <span className={styles.passport}>
            <FaUser />
          </span>
        </div>
      </div>
    </nav>
  );
}
