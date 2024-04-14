import { useNavigate, useSearchParams } from "react-router-dom";
import { UserData } from "../../interfaces/slice.interface";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import styles from "./styles.module.scss";
import { FaUser } from "react-icons/fa";
import { constant } from "../../configs/constant.config";
import { sliceText } from "../../utils/slicetext.util";

interface Props {
  title: string;
  userData: UserData | null;
}

const width = window.innerWidth;

export default function DashNavbar({ title, userData }: Props) {
  const setSearchParams = useSearchParams()[1];
  const navigate = useNavigate();
  const { adminEmail } = constant;
  const isSuperAdmin = userData?.email === adminEmail;

  const shrinkTxt = (txt: string) => {
    return width <= 312
      ? sliceText(txt, 5)
      : width <= 360
      ? sliceText(txt, 10)
      : width < 412
      ? sliceText(txt, 15)
      : txt;
  };

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
            <h4>{shrinkTxt(userData?.email as string) || "user@email.com"} </h4>
            <h6>
              {isSuperAdmin ? "SuperAdmin" : userData?.role || "UserRole"}{" "}
            </h6>
          </div>
          <span className={styles.passport}>
            <FaUser />
          </span>
        </div>
      </div>
    </nav>
  );
}
