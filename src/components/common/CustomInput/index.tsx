"use client";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaUnlock, FaLock } from "react-icons/fa";
import styles from "./styles.module.scss";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  xtraStyle?: string | undefined;
  showPostIcon?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, InputType>(
  ({ id, type, value, xtraStyle, showPostIcon = false, ...rest }, ref) => {
    const [showPwd, setShowPwd] = useState(false);

    return (
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          id={id}
          required
          type={showPostIcon ? (showPwd ? "text" : "password") : type}
          value={value ? value : ""}
          className={`${styles.input} ${xtraStyle}`}
          {...rest}
        />
        {showPostIcon && (
          <label htmlFor={id}>
            {showPwd ? (
              <span onClick={() => setShowPwd((prev) => !prev)}>
                <FaUnlock className={styles.unlockIcon} />
              </span>
            ) : (
              <span onClick={() => setShowPwd((prev) => !prev)}>
                <FaLock className={styles.unlockIcon} />
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);
