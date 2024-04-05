import { Knight } from "../../assets";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import styles from "./styles.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.title}>
          <CustomHeader text="About Us" size="large" />
          <CustomHeader text="An interesting application for blacklist management. Blacklisting product reasons for the betterment of the system." />
          <CustomButton title="View Blacklisted Items" xtraStyle={styles.btn} />
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
