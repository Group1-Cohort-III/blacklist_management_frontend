import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";

interface Props {
  showModal: string | null;
  title: string;
  inputData: {
    ph: string;
    value: string;
  }[];
}

export default function ViewModal({ showModal, title, inputData }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <ul>
          {inputData.map((data, idx) => (
            <li key={idx}>
              <h2>{data.ph}</h2>
              <p>{data.value}</p>
            </li>
          ))}
        </ul>
        <div
          className={styles.btnContainer}
          onClick={() => navigate(pathname, { replace: true })}
        >
          <CustomButton title="Close" />
        </div>
      </div>
    </ModalLayout>
  );
}
