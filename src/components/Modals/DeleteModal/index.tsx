import CustomButton from "../../common/CustomButton";
import CustomHeader from "../../common/CustomHeader";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  showModal: string | null;
  title: string;
  subtitle: string;
}

export default function DeleteModal({ showModal, title, subtitle }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <CustomHeader text={subtitle} xtraStyle={styles.subtitle} />
        <div className={styles.btnContainer}>
          <CustomButton
            title="No"
            onClick={() => navigate(pathname, { replace: true })}
          />
          <CustomButton title="Yes" />
        </div>
      </div>
    </ModalLayout>
  );
}
