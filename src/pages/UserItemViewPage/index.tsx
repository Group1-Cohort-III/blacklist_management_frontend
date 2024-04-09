import { UserViewData } from "../../utils/data.util";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function UserItemViewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = UserViewData.head;
  const tbodyData = UserViewData.body;
  console.log(currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.title = `BlackGuard | ViewItems`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Table
          title="BlackListed Items"
          theadData={theadData}
          tbodyData={tbodyData}
          totalResults={100}
          resultsPerPage={10}
          handlePageChange={handlePageChange}
          maxVisiblePages={5}
          xtraStyle={styles.table}
        />
      </div>
    </div>
  );
}
