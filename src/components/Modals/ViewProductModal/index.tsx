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

export default function ViewProductModal({ showModal, title }: Props) {
  const products = useAppSelector((state) => state.general.products);
  const { pathname } = useLocation();
  const searchParams = useSearchParams()[0];
  const productId = searchParams.get("id") as string;
  const product = products.find(({ id }) => id === productId);
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        {product ? (
          <ul>
            {Object.keys(product)
              .filter(
                (key) =>
                  ["id", "updatedAt", "createdBy", "isDeleted"].includes(
                    key
                  ) !== true
              )
              .map((key) => {
                const castKey = key as keyof typeof product;
                return (
                  <li key={key}>
                    <h2>{key}</h2>
                    <p>
                      {castKey === "createdAt"
                        ? formatDate(product[castKey])
                        : castKey === "isBlacklisted"
                        ? product[castKey]
                          ? "Blacklisted"
                          : "Not Blacklisted"
                        : product[castKey]}
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
