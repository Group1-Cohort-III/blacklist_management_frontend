import CustomButton from "../../components/common/CustomButton";
import CustomHeader from "../../components/common/CustomHeader";
import { OptType } from "../../interfaces/generic.interface";
import { selectOptData } from "../../utils/data.util";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { HomeLogo } from "../../assets";

export default function SelectOption() {
  const [option, setOption] = useState<OptType>({
    yes: false,
    no: false,
  });
  const { yes } = option;

  const navigate = useNavigate();
  const disabled = Object.values(option).some((value) => value === true);

  const handleOnClick = (key: keyof typeof option) => {
    setOption(
      key === "yes" ? { yes: true, no: false } : { yes: false, no: true }
    );
  };

  useEffect(() => {
    document.title = `BlackGuard | Select Option`;
    return () => {
      document.title = "BlackGuard";
    };
  }, [option]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HomeLogo} alt="Logo" />
        </div>
        <form>
          <CustomHeader
            text="Please Select an Option"
            size="medium"
            xtraStyle={styles.title}
          />
          <CustomHeader
            text="Do you have a password?"
            xtraStyle={styles.subTitle}
          />

          <ul className={styles.cardContainer}>
            {selectOptData.map(({ title, key }, i) => (
              <li
                key={i}
                className={`${styles.card} ${option[key] ? styles.active : ""}`}
                onClick={() => handleOnClick(key as keyof typeof option)}
              >
                <p>{title}</p>
                <span className={styles.check}>
                  {option[key] ? <FaCircleCheck /> : <FaRegCircle />}
                </span>
              </li>
            ))}
          </ul>

          <CustomButton
            title="Continue"
            disabled={!disabled}
            xtraStyle={styles.btn}
            onClick={() => navigate(yes ? "/login" : "/setpassword")}
          />
        </form>
      </div>
    </div>
  );
}
