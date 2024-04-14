import { AnimatePresence, motion } from "framer-motion";
import { errorMsgAnimate } from "../../utils/data.util";
import { Dispatch, useEffect } from "react";
import styles from "./styles.module.scss";
import { MdClose } from "react-icons/md";

interface Props {
  isErrorMsg?: boolean | null;
  text: string | null;
  showErrorMsg: boolean;
  hideErrorMsg: Dispatch<React.SetStateAction<boolean>>;
}

export default function Toast({
  text,
  isErrorMsg = false,
  showErrorMsg,
  hideErrorMsg,
}: Props) {
  useEffect(() => {
    let timer = 0;
    if (showErrorMsg) {
      timer = setTimeout(() => {
        hideErrorMsg(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [hideErrorMsg, showErrorMsg]);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => hideErrorMsg(false)}>
      {showErrorMsg && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorMsgAnimate}
          className={
            isErrorMsg ? styles.errorContainer : styles.successContainer
          }
        >
          <p>{text}</p>
          <MdClose onClick={() => hideErrorMsg(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
