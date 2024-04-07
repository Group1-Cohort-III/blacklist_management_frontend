import { FaUsers } from "react-icons/fa";
import styles from "./styles.module.scss";
import { MdClose, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { TiCancelOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { DashLogo } from "../../assets";

export default function Sidebar() {
  const { pathname: pth } = useLocation();
  const navigate = useNavigate();
  const sidebarLinks = [
    { title: "Users", Icon: FaUsers, path: "/users" },
    {
      title: "Products",
      Icon: MdOutlineProductionQuantityLimits,
      path: "/products",
    },
    { title: "BlackList", Icon: TiCancelOutline, path: "/blacklist" },
    { title: "Settings", Icon: IoMdSettings, path: "/settings" },
  ];

  return (
    <aside className={styles.aside}>
      <span className={styles.closeBtn}>
        <MdClose />
      </span>
      <div className={styles.logoContainer}>
        <img src={DashLogo} alt="Logo" />
      </div>
      <ul className={styles.links}>
        {sidebarLinks.map(({ title, Icon, path }, idx) => (
          <li
            key={idx}
            onClick={() => navigate(`/dashboard${path}`)}
            className={pth === `/dashboard${path}` ? styles.active : ""}
          >
            <span className={styles.icon}>{<Icon />}</span>
            <span>{title}</span>
          </li>
        ))}
      </ul>
      <div className={styles.logout} onClick={() => navigate("/")}>
        <span>{<IoMdLogOut />}</span>
        <span>Logout</span>
      </div>
    </aside>
  );
}
