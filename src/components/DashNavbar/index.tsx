import { useNavigate, useSearchParams } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import styles from "./styles.module.scss";
import { FaUser } from "react-icons/fa";

interface Props {
  title: string;
}

export default function DashNavbar({ title }: Props) {
  const setSearchParams = useSearchParams()[1];
  const navigate = useNavigate();

  return (
    <nav className={styles.dashNavbar}>
      <span className={styles.menu}>
        <BiMenuAltLeft
          size={30}
          onClick={() => setSearchParams({ show: "true" })}
        />
        <h1 className={styles.title}>{title}</h1>
      </span>
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
