import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={"/"}>
          <div className={styles.navLogo}>
            <img src={HomeLogo} alt="Home Logo" />
          </div>
        </Link>
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
              onClick={() => navigate("/login")}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
