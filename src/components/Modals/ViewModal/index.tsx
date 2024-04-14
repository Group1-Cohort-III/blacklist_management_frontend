import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useGetABlacklistQuery } from "../../../services/blacklist.api";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../../../utils/formatdate.util";

interface Props {
  type: "user" | "product" | "blacklist";
  showModal: string | null;
  title: string;
  inputData: {
    ph: string;
    value: string | number | boolean;
  }[];
}

export default function ViewModal({
  showModal,
  title,
  inputData,
  type = "user",
}: Props) {
  const { pathname } = useLocation();
  const searchParams = useSearchParams()[0];
  const blacklistId = searchParams.get("id") as string;
  const getBlackListQuery = useGetABlacklistQuery(blacklistId);
  const navigate = useNavigate();

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <ul>
          {type !== "blacklist" &&
            inputData.map((data, idx) => (
              <li key={idx}>
                <h2>{data.ph}</h2>
                <p>
                  {data.ph === "Status"
                    ? !data.value && "Not Blacklisted Yet"
                    : data.ph === "Set password"
                    ? data.value
                      ? "Yes"
                      : "No"
                    : data.value}
                </p>
              </li>
            ))}
          {type === "blacklist" &&
            (getBlackListQuery.isLoading || getBlackListQuery.isFetching ? (
              <div className={styles.loader}>
                <ClipLoader size={15} color="#18425D" />
              </div>
            ) : getBlackListQuery.isError ? (
              <p className={styles.errTxt}>An error occurred!</p>
            ) : (
              <>
                <li>
                  <h2>Product Name</h2>
                  <p>{getBlackListQuery.data?.data?.productName}</p>
                </li>
                <li>
                  <h2>Criteria</h2>
                  <p>{getBlackListQuery.data?.data?.criteriaName}</p>
                </li>
                <li>
                  <h2>Reason</h2>
                  <p>{getBlackListQuery.data?.data?.reason}</p>
                </li>
                <li>
                  <h2>Date</h2>
                  <p>
                    {formatDate(
                      getBlackListQuery.data?.data?.createdAt as string
                    )}
                  </p>
                </li>
              </>
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
