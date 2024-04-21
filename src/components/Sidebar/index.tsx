import { MdClose } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import styles from "./styles.module.scss";
import { DashLogo } from "../../assets";
import { AnimatePresence, motion } from "framer-motion";
import {
  framerText,
  sidebarAnimate,
  sidebarLinksFunc,
} from "../../utils/data.util";
import { useAppDispatch } from "../../hooks/store.hook";
import { logoutUser } from "../../store/slices/auth.slice";
import { UserData } from "../../interfaces/slice.interface";
import { reset } from "../../store/slices/general.slice";
import { persistor } from "../../store/store";

interface Props {
  userData: UserData | null;
}

export default function Sidebar({ userData }: Props) {
  const searchParams = useSearchParams()[0];
  const { pathname: pth } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showSidebar = searchParams.get("show");
  const role = userData?.role;
  const sidebarLinks = sidebarLinksFunc(role as string);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/", { replace: true });
    persistor.purge();
  };

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
        <div className={styles.logout} onClick={logout}>
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
              <div className={styles.logout} onClick={logout}>
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
