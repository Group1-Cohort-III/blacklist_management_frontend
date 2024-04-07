import DashboardLayout from "../../components/DashboardLayout";
import DeleteModal from "../../components/Modals/DeleteModal";
import ViewModal from "../../components/Modals/ViewModal";
import EditModal from "../../components/Modals/EditModal";
import AddModal from "../../components/Modals/AddModal";
import { useSearchParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import {
  UsersData,
  inputData,
  inputDataEdit,
  inputDataView,
} from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";

export default function DashboardUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = UsersData.head;
  const tbodyData = UsersData.body;
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tableData = (row: string[], data: string, idx: number) => {
    const lstIdx = row.length - 1;
    return (
      <td key={idx}>
        {idx === lstIdx ? (
          <span className={styles.btnAction}>
            <IoEyeSharp onClick={() => setSearchParams({ view: "true" })} />
            <MdOutlineEdit onClick={() => setSearchParams({ edit: "true" })} />
            <BiTrash onClick={() => setSearchParams({ del: "true" })} />
          </span>
        ) : (
          data
        )}
      </td>
    );
  };

  return (
    <>
      <AddModal
        showModal={showModalAdd}
        title="Add User"
        inputData={inputData}
      />
      <ViewModal
        showModal={showModalView}
        title="User Details"
        inputData={inputDataView}
      />
      <EditModal
        showModal={showModalEdit}
        title="Edit User"
        inputData={inputDataEdit}
      />
      <DeleteModal
        showModal={showModalDel}
        title={"Delete User"}
        subtitle={"Are you sure you want to delete user?"}
      />
      <DashboardLayout title="Users">
        <Table
          title="All Users"
          showBtn
          isCustomTr={false}
          tableDataElem={(row, data, index) => tableData(row, data, index)}
          btnTitle="Add User"
          onClick={() => setSearchParams({ add: "true" })}
          theadData={theadData}
          tbodyData={tbodyData}
          totalResults={100}
          resultsPerPage={10}
          maxVisiblePages={5}
          handlePageChange={handlePageChange}
        />
      </DashboardLayout>
    </>
  );
}
