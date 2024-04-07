import { useNavigate } from "react-router-dom";
import { Knight } from "../../assets";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import styles from "./styles.module.scss";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.title}>
          <CustomHeader text="Blacklist Management Application" size="large" />
          <CustomHeader text="An admin blacklisting management application, use for blacklisting items or products" />
          <CustomButton
            title="View Blacklisted Items"
            xtraStyle={styles.btn}
            onClick={() => navigate("/blacklist")}
          />
        </div>
        <div className={styles.imgCover}>
          <div className={styles.imgContainer}>
            <img src={Knight} alt="Knight on horse" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
