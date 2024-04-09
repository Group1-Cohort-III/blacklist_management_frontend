import { cateOpts, statusOpts, userOpts } from "../../../utils/data.util";
import { selectStyles } from "../../../utils/selector.style.util";
import { isValidEmail } from "../../../utils/validemail.util";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { IOpt } from "../../../utils/interfaces";
import CustomSelect from "../../CustomSelect";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";

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
  const [selectedOpt, setSelectedOpt] = useState<IOpt | null>(null);
  const [selectedOptA, setSelectedOptA] = useState<IOpt | null>(null);
  const product = [
    {
      ph: "Category",
      isMenuOpen,
      action: setIsMenuOpen,
      opt: cateOpts,
      select: (val: IOpt) => onSelect(val),
    },
    {
      ph: "Status",
      isMenuOpen: isMenuOpenA,
      action: setIsMenuOpenA,
      opt: statusOpts,
      select: (val: IOpt) => onSelectProd(val),
    },
  ];

  const userDisable =
    Object.values(inputValue).some((value) => value === "") ||
    !selectedOpt ||
    !isValidEmail(inputValue["Email"]);

  const prodDisable =
    Object.values(inputValue).some((value) => value === "") ||
    !selectedOpt ||
    !selectedOptA;

  const listDisable =
    Object.values(inputValue).some((value) => value === "") ||
    !selectedOpt ||
    inputReason === "";

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
    console.log(newVal);
  };

  const onSelectProd = (newVal: IOpt) => {
    setSelectedOptA(newVal);
  };

  useEffect(() => {
    if (!showModal) {
      setSelectedOpt(null);
      setSelectedOptA(null);
    }
  }, [showModal]);

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <ul>
          {inputData.map((data, idx) => (
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
          {type === "product" &&
            product.map((data, idx) => (
              <li key={idx}>
                <CustomSelect
                  options={data.opt}
                  placeholder={`Select ${data.ph}`}
                  isMenuOpen={data.isMenuOpen}
                  setIsMenuOpen={data.action}
                  onSelect={data.select}
                  styles={selectStyles(isMenuOpen, "100%")}
                />
              </li>
            ))}
          {type === "blacklist" && (
            <>
              <li>
                <CustomSelect
                  options={cateOpts}
                  placeholder={`Select Category`}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  onSelect={onSelect}
                  styles={selectStyles(isMenuOpen, "100%")}
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
            disabled={
              type === "user"
                ? userDisable
                : type === "product"
                ? prodDisable
                : listDisable
            }
          />
        </div>
      </div>
    </ModalLayout>
  );
}
