import CustomButton from "../common/CustomButton";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <div className={styles.navLogo}>
          <img src={HomeLogo} alt="Home Logo" />
        </div>
      </Link>
      <ul className={styles.navLink}>
        <li>
          <CustomButton title="About Us" isOutline />
        </li>
        <li>
          <CustomButton title="Login" xtraStyle={styles.btn} />
        </li>
      </ul>
    </nav>
  );
}
