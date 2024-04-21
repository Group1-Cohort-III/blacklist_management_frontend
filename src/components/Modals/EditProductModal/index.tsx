import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateProductMutation } from "../../../services/product.api";
import { useAppSelector } from "../../../hooks/store.hook";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import Toast from "../../Toast";

interface Props {
  showModal: string | null;
  title: string;
}

export default function EditProductModal({ showModal, title }: Props) {
  const products = useAppSelector((state) => state.general.products);
  const searchParams = useSearchParams()[0];
  const productId = searchParams.get("id") as string;
  const product = products.find(({ id }) => id === productId);
  const [inputValue, setInputValue] = useState({
    Name: product?.productName || "",
    Description: product?.productDescription || "",
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [updateProd, prodMutationResult] = useUpdateProductMutation();
  const { isLoading, isError, isSuccess, reset, data, error } =
    prodMutationResult;

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const disable =
    Object.values(inputValue).some((value) => value === "") || isLoading;

  const handleOnClick = () => {
    if (!disable && product) {
      updateProd({
        id: productId,
        productName: inputValue.Name,
        productDescription: inputValue.Description,
      });
    }
  };

  useEffect(() => {
    setShowToast(isError || isSuccess);

    // CLOSE MODAL IF EDITED SUCCESSFULLY AND RESET
    if (isSuccess) {
      setInputValue({ Name: "", Description: "" });
      navigate(pathname);
      reset();
    }
  }, [isSuccess, navigate, pathname, isError, reset]);

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <Toast
          isErrorMsg={(data && data.statusCode >= 400) || isError}
          text={
            (error as Error)?.message ||
            (data && data.message) ||
            "An error occurred!"
          }
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />

        {product ? (
          <ul>
            {Object.keys(inputValue).map((key, i) => (
              <li key={i}>
                <label htmlFor={key}>{key}</label>
                <CustomInput
                  id={key}
                  name={key}
                  placeholder={key}
                  value={inputValue[key as keyof typeof inputValue]}
                  onChange={handleOnChange}
                />
              </li>
            ))}
          </ul>
        ) : (
          <h2 className={styles.notFound}>No Product Found</h2>
        )}

        <div className={styles.btnContainer}>
          <CustomButton
            title={isLoading ? "editing" : "edit"}
            showLoader={isLoading}
            disabled={disable}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </ModalLayout>
  );
}
