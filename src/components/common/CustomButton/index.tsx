import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { PuffLoader } from "react-spinners";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  xtraStyle?: string;
  isOutline?: boolean;
  showLoader?: boolean;
  isDeleteBtn?: boolean;
}

export default function CustomButton({
  title,
  xtraStyle,
  isOutline = false,
  showLoader = false,
  isDeleteBtn,
  ...rest
}: Props) {
  return (
    <button
      className={`${isOutline ? styles.btnOutline : styles.btn} ${xtraStyle}`}
      {...rest}
    >
      {showLoader && (
        <PuffLoader color={isDeleteBtn ? "#ffffff" : "#18425D"} size={20} />
      )}
      {`${title}${showLoader ? "..." : ""}`}
    </button>
  );
}
