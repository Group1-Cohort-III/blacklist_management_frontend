import { selectStyles } from "../../../utils/selector.style.util";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { CustomInput } from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { cateOpts, statusOpts, userOpts } from "../../../utils/data.util";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useState } from "react";
import { IOpt } from "../../../utils/interfaces";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenA, setIsMenuOpenA] = useState(false);
  const product = [
    {
      ph: "Category",
      isMenuOpen,
      action: setIsMenuOpen,
      opt: cateOpts,
    },
    {
      ph: "Status",
      isMenuOpen: isMenuOpenA,
      action: setIsMenuOpenA,
      opt: statusOpts,
    },
  ];

  const onSelect = (newVal: IOpt) => {
    console.log(newVal);
  };

  return (
    <ModalLayout title={title} showModal={showModal}>
      <div className={styles.container}>
        <ul>
          {inputData.map((data, idx) => (
            <li key={idx}>
              <CustomInput
                type={data === "Password" ? "password" : "text"}
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
                  onSelect={onSelect}
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
                <textarea placeholder="Reason"></textarea>
              </li>
            </>
          )}
        </ul>
        <div className={styles.btnContainer}>
          <CustomButton title={title} />
        </div>
      </div>
    </ModalLayout>
  );
}
