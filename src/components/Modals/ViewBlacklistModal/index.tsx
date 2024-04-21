import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatdate.util";
import { useAppSelector } from "../../../hooks/store.hook";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";

interface Props {
  showModal: string | null;
  title: string;
}

export default function ViewBlacklistModal({ showModal, title }: Props) {
  const blacklistArr = useAppSelector((state) => state.general.blacklist);
  const { pathname } = useLocation();
  const searchParams = useSearchParams()[0];
  const blacklistId = searchParams.get("id") as string;
  const blacklist = blacklistArr.find(
    (data) => data.blacklistId === blacklistId
  );
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        {blacklist ? (
          <ul>
            {Object.keys(blacklist)
              .filter((key) => key !== "blacklistId")
              .map((key) => {
                const castKey = key as keyof typeof blacklist;
                return (
                  <li key={key}>
                    <h2>{key}</h2>
                    <p>
                      {castKey === "createdAt"
                        ? formatDate(blacklist[castKey])
                        : blacklist[castKey]}
                    </p>
                  </li>
                );
              })}
          </ul>
        ) : (
          <h2 className={styles.notFound}>No blacklist found!</h2>
        )}
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
