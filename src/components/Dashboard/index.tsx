import { useEffect, useState } from "react";
import DashNavbar from "../../components/DashNavbar";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.scss";
import Table from "../../components/Table";
import { UsersData } from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = UsersData.head;
  const tbodyData = UsersData.body;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.title = `BlackGuard | Dashboard`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  const tableData = (row: string[], data: string, idx: number) => {
    const lstIdx = row.length - 1;
    return (
      <td key={idx}>
        {idx === lstIdx ? (
          <span className={styles.btnAction}>
            <IoEyeSharp />
            <MdOutlineEdit />
            <BiTrash />
          </span>
        ) : (
          data
        )}
      </td>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <DashNavbar title="Users" />
        <div className={styles.body}>
          <Table
            title="All Users"
            showBtn
            isCustomTr={false}
            tableDataElem={(row, data, index) => tableData(row, data, index)}
            btnTitle="Add User"
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={100}
            resultsPerPage={10}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
