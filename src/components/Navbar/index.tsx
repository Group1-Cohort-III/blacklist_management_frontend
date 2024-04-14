import { AnimatePresence, motion } from "framer-motion";
import { navbarAnimate } from "../../utils/data.util";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import styles from "./styles.module.scss";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { HomeLogo } from "../../assets";
import { useState } from "react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (pathname: string) => {
    setShowMenu(false);
    navigate(pathname);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={"/"}>
          <div className={styles.navLogo}>
            <img src={HomeLogo} alt="Home Logo" />
          </div>
        </Link>
        {/* Show on desktop Screen */}
        <ul className={styles.navLink}>
          <li>
            <CustomButton
              title="About Us"
              isOutline
              onClick={() => navigate("/about")}
            />
          </li>
          <li>
            <CustomButton
              title="Login"
              xtraStyle={styles.btn}
              onClick={() => navigate("/select")}
            />
          </li>
        </ul>
        {/* Show Menu on Mobile Screen */}
        <span className={styles.btnMenu} onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <MdClose size={30} /> : <IoMenu size={30} />}
        </span>
        <AnimatePresence mode="wait">
          {showMenu && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navbarAnimate}
              className={styles.mobileNavLink}
            >
              <li onClick={() => handleOnClick("/about")}>About Us</li>
              <li onClick={() => handleOnClick("/select")}>Login</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
