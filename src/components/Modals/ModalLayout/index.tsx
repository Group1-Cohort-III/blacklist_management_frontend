import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.scss";
import { MdClose } from "react-icons/md";
import { ReactNode } from "react";

interface Props {
  showModal: string | null;
  children: ReactNode;
  xtraStyle?: string;
  title: string;
}

const modal = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function ModalLayout({
  showModal,
  children,
  xtraStyle,
  title,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => navigate(pathname, { replace: true })}
    >
      {showModal && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modal}
            className={`${styles.modal} ${xtraStyle}`}
          >
            <span
              className={styles.closeBtn}
              onClick={() => navigate(pathname, { replace: true })}
            >
              <MdClose size={20} />
            </span>
            <h3 className={styles.title}>{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
