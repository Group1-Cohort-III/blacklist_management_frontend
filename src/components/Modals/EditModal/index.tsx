import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateUserMutation } from "../../../services/user.api";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import Toast from "../../Toast";
import {
  useGetAProductQuery,
  useUpdateProductMutation,
} from "../../../services/product.api";
import {
  useGetABlacklistQuery,
  useRemoveBlacklistMutation,
} from "../../../services/blacklist.api";
import { useAppSelector } from "../../../hooks/store.hook";
import { decodeUserData } from "../../../utils/jwt.util";
import { UserData } from "../../../interfaces/slice.interface";

interface Props {
  showModal: string | null;
  title: string;
  inputData: {
    ph: string;
    value: string;
  }[];
  type?: "user" | "product" | "blacklist";
}

export default function EditModal({
  showModal,
  title,
  inputData,
  type = "user",
}: Props) {
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(inputData.map((data) => [data.ph, data.value]))
  );
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slugID = searchParams.get("index");
  const blackLstId = searchParams.get("id");
  const [inputReason, setInputReason] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const { userId } = decodeUserData(token as string) as UserData;
  const [updateUser, userMutationResult] = useUpdateUserMutation();
  const [updateProd, prodMutationResult] = useUpdateProductMutation();
  const { data, isSuccess } = useGetAProductQuery(slugID as string);
  const blacklist = useGetABlacklistQuery(blackLstId as string);
  const [removeBlacklst, getRemoveBlacklst] = useRemoveBlacklistMutation();

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleOnTAChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setInputReason(value);
  };

  const userDisable =
    Object.values(inputValue).some((value) => value === "") ||
    userMutationResult.isLoading ||
    prodMutationResult.isLoading;

  const listDisable = inputReason === "" || getRemoveBlacklst.isLoading;

  const handleOnClick = () => {
    if (type === "user" && !userDisable) {
      updateUser({
        firstName: inputValue["First Name"],
        lastName: inputValue["Last Name"],
        email: inputValue["Email"],
      });
      return;
    }
    if (type === "product" && !userDisable && slugID) {
      updateProd({
        productName: inputValue["Name"],
        productDescription: inputValue["Description"],
        id: slugID,
      });
      return;
    }

    if (type === "blacklist" && inputReason && blackLstId && userId) {
      removeBlacklst({ id: blackLstId, userId, reason: inputReason });
    }
  };

  useEffect(() => {
    setShowToast(
      userMutationResult.isError ||
        userMutationResult.isSuccess ||
        prodMutationResult.isError ||
        prodMutationResult.isSuccess ||
        getRemoveBlacklst.isError ||
        getRemoveBlacklst.isSuccess
    );
    // SET DEFAULT INPUT VALUES FOR PRODUCTS
    if (isSuccess && data) {
      setInputValue({
        Name: data?.data?.productName || "",
        Description: data?.data?.productDescription || "",
      });
    }
    // CLOSE MODAL IF EDITED SUCCESSFULLY AND RESET
    if (
      userMutationResult.isSuccess ||
      prodMutationResult.isSuccess ||
      getRemoveBlacklst.isSuccess
    ) {
      setInputValue(Object.fromEntries(inputData.map((data) => [data, ""])));
      setInputReason("");
      navigate(pathname);
      userMutationResult.reset();
      prodMutationResult.reset();
      getRemoveBlacklst.reset();
    }
  }, [
    data,
    userMutationResult.isError,
    userMutationResult.isSuccess,
    prodMutationResult.isError,
    prodMutationResult.isSuccess,
    isSuccess,
    navigate,
    pathname,
    inputData,
    getRemoveBlacklst.isError,
    getRemoveBlacklst.isSuccess,
    userMutationResult,
    prodMutationResult,
    getRemoveBlacklst,
  ]);

  return (
    <ModalLayout
      title={type === "blacklist" ? "Remove Blacklist" : title}
      showModal={showModal}
    >
      <div className={styles.container}>
        <Toast
          isErrorMsg={
            userMutationResult.isError ||
            (prodMutationResult.data &&
              prodMutationResult.data.statusCode >= 400) ||
            prodMutationResult.isError ||
            getRemoveBlacklst.isError ||
            (getRemoveBlacklst.data &&
              getRemoveBlacklst.data?.statusCode >= 400)
          }
          text={
            (userMutationResult.error as Error)?.message ||
            (prodMutationResult.error as Error)?.message ||
            (prodMutationResult.data && prodMutationResult.data.message) ||
            getRemoveBlacklst.data?.message ||
            (getRemoveBlacklst.error as Error)?.message ||
            "An error occurred!"
          }
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />
        <ul>
          {type === "user" &&
            inputData.map((data, idx) => (
              <li key={idx}>
                <>
                  <label htmlFor={data.ph}>{data.ph}</label>
                  <CustomInput
                    id={data.ph}
                    name={data.ph}
                    placeholder={data.ph}
                    value={inputValue[data.ph]}
                    onChange={handleOnChange}
                    readOnly={data.ph === "Email"}
                  />
                </>
              </li>
            ))}

          {type === "blacklist" && (
            <>
              {[
                {
                  label: "Product Name",
                  value: blacklist.data?.data?.productName || "",
                },
                {
                  label: "Criteria",
                  value: blacklist.data?.data?.criteriaName || "",
                },
                {
                  label: "Reason for blacklisted",
                  value: blacklist.data?.data?.reason || "",
                },
              ].map((itm, i) => (
                <li key={i}>
                  <label htmlFor="name">{itm.label}</label>
                  <h2>{itm.value}</h2>
                </li>
              ))}
              <li>
                <label htmlFor="reason">
                  Reason why this product should be removed
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={inputReason}
                  onChange={handleOnTAChange}
                ></textarea>
              </li>
            </>
          )}

          {type === "product" &&
            inputData.map((data, i) => (
              <li key={i}>
                <label htmlFor={data.ph}>{data.ph}</label>
                <CustomInput
                  id={data.ph}
                  name={data.ph}
                  placeholder={data.ph}
                  value={inputValue[data.ph]}
                  onChange={handleOnChange}
                />
              </li>
            ))}
        </ul>

        <div className={styles.btnContainer}>
          <CustomButton
            title={type === "blacklist" ? "Remove" : title}
            showLoader={
              userMutationResult.isLoading ||
              prodMutationResult.isLoading ||
              getRemoveBlacklst.isLoading
            }
            disabled={type === "blacklist" ? listDisable : userDisable}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </ModalLayout>
  );
}
