import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import { Knight } from "../../assets";
import { useEffect } from "react";

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `BlackGuard | AboutUs`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.imgCover}>
          <div className={styles.imgContainer}>
            <img src={Knight} alt="Knight on horse" />
          </div>
        </div>
        <div className={styles.title}>
          <CustomHeader text="About Us" size="medium" />
          <CustomHeader text="A powerful tool designed for administrators to efficiently manage blacklists of items or products. Whether you're dealing with prohibited goods, unwanted content, or restricted materials, our application provides the functionality you need to maintain control and ensure compliance." />
          <CustomButton
            title="View Blacklisted Items"
            xtraStyle={styles.btn}
            onClick={() => navigate("/blacklist")}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
