import DashboardLayout from "../../components/DashboardLayout";
import { MdOutlineEdit } from "react-icons/md";
import {
  BlackListData,
  inputDataList,
  inputDataListEdit,
  inputDataListView,
} from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddModal from "../../components/Modals/AddModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditModal from "../../components/Modals/EditModal";
import ViewModal from "../../components/Modals/ViewModal";

export default function DashboardBlacklist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const theadData = BlackListData.head;
  const tbodyData = BlackListData.body;
  console.log(currentPage);

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
        type="blacklist"
        showModal={showModalAdd}
        title="Add Blacklist"
        inputData={inputDataList}
      />
      <ViewModal
        showModal={showModalView}
        title="Blacklist Details"
        inputData={inputDataListView}
      />
      <EditModal
        type="blacklist"
        showModal={showModalEdit}
        title="Edit Blacklist"
        inputData={inputDataListEdit}
      />
      <DeleteModal
        showModal={showModalDel}
        title={"Delete Blacklist"}
        subtitle={"Are you sure you want to delete this blacklisted product?"}
      />
      <DashboardLayout title="BlackList">
        <Table
          title="Blacklisted Products"
          showBtn
          isCustomTr={false}
          tableDataElem={(row, data, index) => tableData(row, data, index)}
          onClick={() => setSearchParams({ add: "true" })}
          btnTitle="Add Blacklist"
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
