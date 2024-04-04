import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  xtraStyle?: string;
  isOutline?: boolean;
}

export default function CustomButton({
  title,
  xtraStyle,
  isOutline = false,
  ...rest
}: Props) {
  return (
    <button
      className={`${isOutline ? styles.btnOutline : styles.btn} ${xtraStyle}`}
      {...rest}
    >
      {title}
    </button>
  );
}
