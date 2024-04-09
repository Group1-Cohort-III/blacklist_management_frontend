import { selectStyles } from "../../../utils/selector.style.util";
import CustomSelect from "../../CustomSelect";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { cateOpts, userOpts } from "../../../utils/data.util";
import { IOpt } from "../../../utils/interfaces";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  showModal: string | null;
  title: string;
  inputData: {
    ph: string;
    value: string;
    opt: IOpt[];
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenA, setIsMenuOpenA] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<IOpt | null>(null);
  const [selectedOptA, setSelectedOptA] = useState<IOpt | null>(null);
  const [inputReason, setInputReason] = useState(
    inputData.find((data) => (data.ph === "Reason" ? data.value : ""))
  );

  const onSelect = (newVal: IOpt) => {
    setSelectedOpt(newVal);
  };

  const onSelectProd = (newVal: IOpt) => {
    setSelectedOptA(newVal);
  };

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = evt.target;
    if (name === "reason" && inputReason) {
      setInputReason({ ...inputReason, value });
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    console.log(inputReason);
  }, [inputReason]);

  const userDisable = Object.values(inputValue).some((value) => value === "");

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <ul>
          {inputData.map((data, idx) => {
            const lstIdx = inputData.length - 1;
            return type === "user" ? (
              <li key={idx}>
                {idx === lstIdx ? (
                  <CustomSelect
                    options={userOpts}
                    placeholder="Select User Role"
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    onSelect={onSelect}
                    prefillId={"user"}
                    styles={selectStyles(isMenuOpen, "100%")}
                  />
                ) : (
                  <>
                    <label htmlFor={data.ph}>{data.ph}</label>
                    <CustomInput
                      id={data.ph}
                      name={data.ph}
                      placeholder={data.ph}
                      value={inputValue[data.ph]}
                      onChange={handleOnChange}
                    />
                  </>
                )}
              </li>
            ) : (
              type === "blacklist" && (
                <li>
                  {idx === lstIdx ? (
                    <>
                      <label htmlFor={data.ph}>{data.ph}</label>
                      <textarea
                        id={data.ph}
                        name="reason"
                        value={inputReason?.value}
                        onChange={handleOnChange}
                      >
                        {inputData[lstIdx].value}
                      </textarea>
                    </>
                  ) : data.ph === "Category" ? (
                    <>
                      <label>{data.ph}</label>
                      <CustomSelect
                        options={cateOpts}
                        placeholder="Select Category"
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        onSelect={onSelect}
                        prefillId={data.value}
                        styles={selectStyles(isMenuOpen, "100%")}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor={data.ph}>{data.ph}</label>
                      <CustomInput
                        id={data.ph}
                        name={data.ph}
                        placeholder={data.ph}
                        value={inputValue[data.ph]}
                        onChange={handleOnChange}
                      />
                    </>
                  )}
                </li>
              )
            );
          })}
          {type === "product" &&
            inputData.map((data, i) => (
              <li key={i}>
                <label htmlFor={data.ph}>{data.ph}</label>
                {data.ph === "Category" || data.ph === "Status" ? (
                  <CustomSelect
                    options={data.opt}
                    placeholder={`Select ${data.ph}`}
                    isMenuOpen={
                      data.ph === "Category" ? isMenuOpen : isMenuOpenA
                    }
                    setIsMenuOpen={
                      data.ph === "Category" ? setIsMenuOpen : setIsMenuOpenA
                    }
                    onSelect={data.ph === "Category" ? onSelect : onSelectProd}
                    prefillId={data.value}
                    styles={selectStyles(isMenuOpen, "100%")}
                  />
                ) : (
                  <CustomInput
                    id={data.ph}
                    name={data.ph}
                    placeholder={data.ph}
                    value={inputValue[data.ph]}
                    onChange={handleOnChange}
                  />
                )}
              </li>
            ))}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton title={title} disabled={userDisable} />
        </div>
      </div>
    </ModalLayout>
  );
}
