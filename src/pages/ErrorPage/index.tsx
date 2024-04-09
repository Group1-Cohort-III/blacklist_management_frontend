import { useRouteError, ErrorResponse, useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import styles from "./styles.module.scss";
import { useEffect } from "react";

export default function ErrorPage() {
  const { status, statusText, data } = useRouteError() as ErrorResponse;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `BlackGuard | ${status === 404 ? "Not Found" : "Error"}`;

    return () => {
      document.title = "BlackGuard";
    };
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Oops!</h1>
        <p>{data || "Sorry, an unexpected error has occurred."}</p>
        <p className={styles.status}>
          {status === 404 ? "Page Not Found" : statusText}
        </p>
        <div className={styles.btnContainer}>
          <CustomButton
            isOutline
            title="Go Home"
            onClick={() => navigate("/", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
}
