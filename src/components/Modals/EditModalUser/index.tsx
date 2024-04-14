import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  InputValueType,
  RTKUpdErr,
} from "../../../interfaces/generic.interface";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../services/user.api";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import Toast from "../../Toast";

interface Props {
  showModal: string | null;
}

export default function EditModalUser({ showModal }: Props) {
  const [inputValue, setInputValue] = useState<InputValueType>({
    "First Name": "",
    "Last Name": "",
    Email: "",
  });
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userEmail = searchParams.get("id");
  const [showToast, setShowToast] = useState(false);
  const getUserQuery = useGetUserQuery(userEmail as string);
  const [updateUser, userMutationResult] = useUpdateUserMutation();
  const { error } = userMutationResult;

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const userDisable =
    inputValue["First Name"] === "" ||
    inputValue["Last Name"] === "" ||
    userMutationResult.isLoading;

  const handleOnClick = () => {
    if (!userDisable) {
      updateUser({
        firstName: inputValue["First Name"],
        lastName: inputValue["Last Name"],
        email: inputValue["Email"],
      });
    }
  };

  useEffect(() => {
    if (getUserQuery.data) {
      setInputValue({
        "First Name": getUserQuery?.data?.firstName || "",
        "Last Name": getUserQuery?.data?.lastName || "",
        Email: getUserQuery?.data?.email || "",
      });
    }
  }, [getUserQuery.data]);

  useEffect(() => {
    setShowToast(userMutationResult.isError || userMutationResult.isSuccess);
    // CLOSE MODAL IF EDITED SUCCESSFULLY AND RESET
    if (userMutationResult.isSuccess || (error && (error as RTKUpdErr)?.originalStatus <= 400)) {
      setInputValue({
        "First Name": "",
        "Last Name": "",
        Email: "",
      });
      navigate(pathname);
      userMutationResult.reset();
    }
  }, [userMutationResult.isError, userMutationResult.isSuccess, navigate, pathname, userMutationResult, error]);

  return (
    <ModalLayout title={"Edit User"} showModal={showModal}>
      <div className={styles.container}>
        <Toast
          isErrorMsg={error && (error as RTKUpdErr).originalStatus >= 400}
          text={
            (error && (error as RTKUpdErr).data) ||
            (userMutationResult?.error as Error)?.message ||
            "An error occurred!"
          }
          showErrorMsg={showToast}
          hideErrorMsg={setShowToast}
        />
        <ul>
          {["First Name", "Last Name", "Email"].map((data, idx) => (
            <li key={idx}>
              <>
                <label htmlFor={data}>{data}</label>
                <CustomInput
                  id={data}
                  name={data}
                  placeholder={data}
                  value={inputValue[data]}
                  onChange={handleOnChange}
                  readOnly={data === "Email"}
                />
              </>
            </li>
          ))}
        </ul>

        <div className={styles.btnContainer}>
          <CustomButton
            title={userMutationResult.isLoading ? "Editing" : "Edit"}
            showLoader={userMutationResult.isLoading}
            disabled={userDisable}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </ModalLayout>
  );
}
