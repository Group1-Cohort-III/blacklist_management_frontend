import { MdClose, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { TiCancelOutline } from "react-icons/ti";
import styles from "./styles.module.scss";
import { FaUsers } from "react-icons/fa";
import { DashLogo } from "../../assets";
import { AnimatePresence, motion } from "framer-motion";
import { framerText, sidebarAnimate } from "../../utils/data.util";

export default function Sidebar() {
  const searchParams = useSearchParams()[0];
  const { pathname: pth } = useLocation();
  const navigate = useNavigate();
  const showSidebar = searchParams.get("show");
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
    <>
      {/* Display on Desktop Screens */}
      <aside className={styles.aside}>
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

      {/* Display on Mobile and Tablet Screens */}
      <AnimatePresence mode="wait" onExitComplete={() => navigate(pth)}>
        {showSidebar && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              variants={sidebarAnimate}
              className={styles.mobileAside}
            >
              <span className={styles.closeBtn} onClick={() => navigate(pth)}>
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
                    <motion.span {...framerText(idx)}>{title}</motion.span>
                  </li>
                ))}
              </ul>
              <div className={styles.logout} onClick={() => navigate("/")}>
                <span>{<IoMdLogOut />}</span>
                <span>Logout</span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
