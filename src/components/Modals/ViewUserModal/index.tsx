import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store.hook";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";

interface Props {
  showModal: string | null;
  title: string;
}

export default function ViewUserModal({ showModal, title }: Props) {
  const users = useAppSelector((state) => state.general.users);
  const searchParams = useSearchParams()[0];
  const userId = searchParams.get("id") as string;
  const user = users.find(({ id }) => id === userId);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        {user ? (
          <ul>
            {Object.keys(user)
              .filter(
                (key) =>
                  ["id", "gender", "roles", "phoneNumber"].includes(key) !==
                  true
              )
              .map((key) => {
                const castKey = key as keyof typeof user;
                return (
                  <li key={key}>
                    <h2>{key}</h2>
                    <p>
                      {castKey === "firstName" || castKey === "lastName"
                        ? user[castKey]
                          ? user[castKey]
                          : "None"
                        : castKey === "isPasswordSet"
                        ? user[castKey]
                          ? "Yes"
                          : "No"
                        : user[castKey]}
                    </p>
                  </li>
                );
              })}
          </ul>
        ) : (
          <h2 className={styles.notFound}>No User found!</h2>
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
