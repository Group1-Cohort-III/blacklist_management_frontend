import { selectStyles } from "../../../utils/selector.style.util";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { cateOpts, userOpts } from "../../../utils/data.util";
import { IOpt } from "../../../utils/interfaces";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenA, setIsMenuOpenA] = useState(false);

  const onSelect = (newVal: IOpt) => {
    console.log(newVal);
  };

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
                      placeholder={data.ph}
                      value={data.value}
                      onChange={() => {}}
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
                      <textarea id={data.ph}>
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
                        placeholder={data.ph}
                        value={data.value}
                        onChange={() => {}}
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
                    onSelect={onSelect}
                    prefillId={data.value}
                    styles={selectStyles(isMenuOpen, "100%")}
                  />
                ) : (
                  <CustomInput
                    id={data.ph}
                    placeholder={data.ph}
                    value={data.value}
                    onChange={() => {}}
                  />
                )}
              </li>
            ))}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton title={title} />
        </div>
      </div>
    </ModalLayout>
  );
}
