import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { UserViewData } from "../../utils/data.util";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function UserItemViewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = UserViewData.head;
  const tbodyData = UserViewData.body;

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
  );
}
