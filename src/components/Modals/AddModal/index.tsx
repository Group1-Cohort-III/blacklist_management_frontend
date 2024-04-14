import {
  useCreateProductMutation,
  useGetAllProductsQuery,
} from "../../../services/product.api";
import { useCreateUserMutation } from "../../../services/user.api";
import { selectStyles } from "../../../utils/selector.style.util";
import { RTKError } from "../../../interfaces/generic.interface";
import { userOpts } from "../../../utils/data.util";
import { isValidEmail } from "../../../utils/validemail.util";
import { IOpt } from "../../../interfaces/props.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomSelect from "../../CustomSelect";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import Toast from "../../Toast";
import {
  useBlacklistMutation,
  useGetBlacklistCriteriaQuery,
} from "../../../services/blacklist.api";
import { useAppSelector } from "../../../hooks/store.hook";
import { decodeUserData } from "../../../utils/jwt.util";
import { UserData } from "../../../interfaces/slice.interface";

interface Props {
  showModal: string | null;
  title: string;
  inputData: string[];
  type?: "user" | "product" | "blacklist";
}

export default function AddModal({
  showModal,
  title,
  inputData,
  type = "user",
}: Props) {
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(inputData.map((data) => [data, ""]))
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenA, setIsMenuOpenA] = useState(false);
  const [inputReason, setInputReason] = useState("");
  const { token } = useAppSelector((state) => state.auth);
  const { userId } = decodeUserData(token as string) as UserData;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedOpt, setSelectedOpt] = useState<IOpt | null>(null);
  const [selectedOptA, setSelectedOptA] = useState<IOpt | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [
    createUser,
    {
      isLoading: isLoadingUser,
      isError: isErrUser,
      data: userDataResp,
      error: errUser,
      reset: resetUser,
      isSuccess: isSuccessUser,
    },
  ] = useCreateUserMutation();
  const [
    createProduct,
    {
      isLoading: isLoadingProd,
      isError: isErrProd,
      data: prodDataResp,
      error: errProd,
      reset: resetProd,
      isSuccess: isSuccessProd,
    },
  ] = useCreateProductMutation();
  const [page, setPage] = useState(1);
  const getProdQuery = useGetAllProductsQuery({ page, perPage: 2 });
  const getCriteQuery = useGetBlacklistCriteriaQuery();
  const [blacklist, getBlacklistProps] = useBlacklistMutation();
  const [criteriaOpt, setCriteriaOpt] = useState<IOpt[]>([]);
  const [productOpt, setProductOpt] = useState<IOpt[]>([]);

  const userDisable =
    Object.values(inputValue).some((value) => value === "") ||
    !selectedOpt ||
    !isValidEmail(inputValue["Email"]) ||
    isLoadingUser;

  const prodDisable =
    Object.values(inputValue).some((value) => value === "") || isLoadingProd;

  const listDisable =
    !selectedOpt ||
    !selectedOptA ||
    inputReason === "" ||
    getBlacklistProps.isLoading;

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = evt.target;
    if (name === "reason") {
      setInputReason(value);
      return;
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSelect = (newVal: IOpt) => {
    setSelectedOpt(newVal);
  };

  const onSelectList = (newVal: IOpt) => {
    setSelectedOptA(newVal);
  };

  const handleOnClick = () => {
    // USER SERVICES
    if (type === "user" && selectedOpt && inputValue["Email"] !== "") {
      createUser({
        emailAddress: inputValue["Email"],
        roles: [+selectedOpt.value],
      });
      return;
    }

    // PRODUCT SERVICES
    if (type === "product" && !prodDisable) {
      console.log(inputValue);
      createProduct({
        productName: inputValue["Name"],
        productDescription: inputValue["Description"],
      });

      return;
    }

    // BLACKLIST SERVICES
    if (type === "blacklist" && !listDisable && userId) {
      blacklist({
        productId: selectedOpt.value,
        criteriaId: selectedOptA.value,
        reason: inputReason,
        userId,
      });
      return;
    }
  };

  // FETCH AND POPULATE ALL PRODUCT DATA
  useEffect(() => {
    if (getProdQuery.isSuccess && getProdQuery.data) {
      const newProdList = getProdQuery.data.data.data.map((itm) => ({
        value: itm.id,
        label: itm.productName,
      }));

      setProductOpt((prevProductOpt) => {
        const uniqueNewProdList = newProdList.filter(
          (newItem) =>
            !prevProductOpt.some((prevItem) => prevItem.value === newItem.value)
        );
        return [...prevProductOpt, ...uniqueNewProdList];
      });
    }
  }, [getProdQuery.data, getProdQuery.isSuccess, setProductOpt]);

  // FETCH AND POPULATE ALL BLACKLIST CRITERIA DATA
  useEffect(() => {
    if (getCriteQuery.data && getCriteQuery.isSuccess) {
      const newData = getCriteQuery.data.map((itm) => ({
        value: itm.id,
        label: itm.categoryName,
      }));
      setCriteriaOpt(newData);
    }
  }, [getCriteQuery.data, getCriteQuery.isSuccess]);

  useEffect(() => {
    setShowToast(
      isErrUser ||
        isSuccessUser ||
        isErrProd ||
        isSuccessProd ||
        getBlacklistProps.isSuccess ||
        getBlacklistProps.isError
    );

    if (!showModal) {
      setSelectedOpt(null);
      setSelectedOptA(null);
    }
    // CLOSE MODEL IF SUCCESSFUL AND RESET FORM
    if (isSuccessUser || isSuccessProd || getBlacklistProps.isSuccess) {
      setInputValue(Object.fromEntries(inputData.map((data) => [data, ""])));
      setInputReason("");
      navigate(pathname, { replace: true });
      resetProd();
      resetUser();
      getBlacklistProps.reset();
    }
  }, [
    getBlacklistProps,
    getBlacklistProps.isError,
    getBlacklistProps.isSuccess,
    inputData,
    isErrProd,
    isErrUser,
    isSuccessProd,
    isSuccessUser,
    navigate,
    pathname,
    resetProd,
    resetUser,
    showModal,
  ]);

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <Toast
          isErrorMsg={
            (userDataResp && userDataResp.statusCode >= 400) ||
            isErrUser ||
            (prodDataResp && prodDataResp.statusCode >= 400) ||
            isErrProd ||
            getBlacklistProps.isError ||
            (getBlacklistProps.data?.statusCode as number) >= 400
          }
          text={
            (errUser as RTKError)?.error.split(":")[1] ||
            (userDataResp && userDataResp.message) ||
            (errProd as RTKError)?.error.split(":")[1] ||
            (prodDataResp && prodDataResp.message) ||
            getBlacklistProps.data?.message ||
            "An error occurred!"
          }
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />
        <ul>
          {type !== "blacklist" &&
            inputData.map((data, idx) => (
              <li key={idx}>
                <CustomInput
                  name={data}
                  value={inputValue[data]}
                  onChange={handleOnChange}
                  type={
                    data === "Password"
                      ? "password"
                      : data === "Email"
                      ? "email"
                      : "text"
                  }
                  placeholder={data}
                />
              </li>
            ))}
          {type === "user" && (
            <li>
              <CustomSelect
                options={userOpts}
                placeholder={`Select User Role`}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                onSelect={onSelect}
                styles={selectStyles(isMenuOpen, "100%")}
              />
            </li>
          )}
          {type === "blacklist" && (
            <>
              <li>
                <CustomSelect
                  isAsync
                  isError={getProdQuery.isError}
                  inProgress={getProdQuery.isLoading || getProdQuery.isFetching}
                  loadMore={setPage}
                  options={productOpt}
                  showBtn={getProdQuery.data?.data.totalPageCount !== page}
                  placeholder={`Select Product`}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  onSelect={onSelect}
                  styles={selectStyles(isMenuOpen, "100%")}
                />
              </li>
              <li>
                <CustomSelect
                  isError={getCriteQuery.isError}
                  inProgress={
                    getCriteQuery.isLoading || getCriteQuery.isFetching
                  }
                  options={criteriaOpt}
                  placeholder={`Select Criteria`}
                  isMenuOpen={isMenuOpenA}
                  setIsMenuOpen={setIsMenuOpenA}
                  onSelect={onSelectList}
                  styles={selectStyles(isMenuOpenA, "100%")}
                />
              </li>
              <li>
                <textarea
                  name="reason"
                  placeholder="Reason"
                  value={inputReason}
                  onChange={handleOnChange}
                ></textarea>
              </li>
            </>
          )}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton
            title={title}
            showLoader={
              isLoadingUser || isLoadingProd || getBlacklistProps.isLoading
            }
            disabled={
              type === "user"
                ? userDisable
                : type === "product"
                ? prodDisable
                : listDisable
            }
            onClick={handleOnClick}
          />
        </div>
      </div>
    </ModalLayout>
  );
}
