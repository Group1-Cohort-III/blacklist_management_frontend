import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteProductMutation } from "../../../services/product.api";
import { useDeleteUserMutation } from "../../../services/user.api";
import { RTKUpdErr } from "../../../interfaces/generic.interface";
import { memo, useCallback, useEffect, useState } from "react";
import CustomButton from "../../common/CustomButton";
import CustomHeader from "../../common/CustomHeader";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import Toast from "../../Toast";

interface Props {
  showModal: string | null;
  title: string;
  subtitle: string;
  type?: "User" | "Product" | "Blacklist";
}

export default function DeleteModal({
  showModal,
  title,
  subtitle,
  type = "User",
}: Props) {
  const [showToast, setShowToast] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const productID = searchParams.get("id");
  const userEmail = searchParams.get("email");

  const [
    deleteUser,
    {
      isLoading: isLoadingUser,
      isError: isErrUser,
      data: userDataResp,
      error: errUser,
      isSuccess: isSuccessUser,
      reset: resetUser,
    },
  ] = useDeleteUserMutation();

  const [
    deleteProd,
    {
      isLoading: isLoadingProd,
      isError: isErrProd,
      data: prodDataResp,
      error: errProd,
      isSuccess: isSuccessProd,
      reset: resetProd,
    },
  ] = useDeleteProductMutation();

  const handleOnDelete = useCallback(() => {
    if (type === "User" && userEmail) {
      deleteUser(userEmail);
      return;
    }

    if (type === "Product") {
      if (productID) deleteProd(productID);
      return;
    }
  }, [deleteUser, deleteProd, type, productID, userEmail]);

  useEffect(() => {
    setShowToast(isErrUser || isSuccessUser || isErrProd || isSuccessProd);
    const error = (errUser as RTKUpdErr)?.originalStatus === 500;

    if (isSuccessUser || isSuccessProd || error) {
      navigate(pathname, { replace: true });
      resetUser();
      resetProd();
    }
  }, [
    errUser,
    isErrProd,
    isErrUser,
    isSuccessProd,
    isSuccessUser,
    navigate,
    pathname,
    resetProd,
    resetUser,
  ]);

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <Toast
          isErrorMsg={
            ((errUser as RTKUpdErr)?.originalStatus >= 400 && isErrUser) ||
            ((errProd as RTKUpdErr)?.originalStatus >= 400 && isErrProd)
          }
          text={
            (errUser as RTKUpdErr)?.data ||
            (userDataResp && userDataResp) ||
            (errProd as RTKUpdErr)?.data ||
            (prodDataResp && prodDataResp.message) ||
            "An error occurred!"
          }
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />
        <CustomHeader text={subtitle} xtraStyle={styles.subtitle} />
        <div className={styles.btnContainer}>
          <CustomButton
            title="No"
            onClick={() => navigate(pathname, { replace: true })}
          />
          <CustomButton
            isDeleteBtn
            title={isLoadingUser || isLoadingProd ? "Deleting" : "Yes"}
            onClick={handleOnDelete}
            showLoader={isLoadingUser || isLoadingProd}
            disabled={isLoadingUser}
          />
        </div>
      </div>
    </ModalLayout>
  );
}

export const DeleteModalMemiozed = memo(DeleteModal);
