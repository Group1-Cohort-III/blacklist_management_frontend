import CustomButton from "../../common/CustomButton";
import CustomHeader from "../../common/CustomHeader";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../../Toast";
import { RTKUpdErr } from "../../../interfaces/generic.interface";
import { useDeleteUserMutation } from "../../../services/user.api";
import { useDeleteProductMutation } from "../../../services/product.api";

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
  const productID = searchParams.get("index");
  const userEmail = searchParams.get("id");

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

  const handleOnDelete = () => {
    if (type === "User") {
      deleteUser(userEmail as string);
      return;
    }
    if (type === "Product") {
      if (productID) deleteProd(productID);
      return;
    }
  };

  useEffect(() => {
    setShowToast(isErrUser || isSuccessUser || isErrProd || isSuccessProd);

    console.log("Error Modal ", errUser);
    console.log("Success Modal ", userDataResp);
    if (isSuccessUser || isSuccessProd) {
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
    userDataResp,
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
