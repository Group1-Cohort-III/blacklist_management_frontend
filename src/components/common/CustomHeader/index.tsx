import styles from "./styles.module.scss";

interface Props {
  text: string;
  xtraStyle?: string;
  size?: "large" | "medium" | "small";
}

export default function CustomHeader({
  text,
  xtraStyle,
  size = "small",
}: Props) {
  return (
    <h1
      className={`${styles.h1} ${
        size === "large"
          ? styles.large
          : size === "medium"
          ? styles.medium
          : size === "small"
          ? styles.small
          : ""
      } ${xtraStyle}`}
    >
      {text}
    </h1>
  );
}
