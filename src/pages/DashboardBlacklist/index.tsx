import DashboardLayout from "../../components/DashboardLayout";
import { MdOutlineEdit } from "react-icons/md";
import {
  BlackListData,
  inputDataList,
  inputDataListEdit,
} from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddModal from "../../components/Modals/AddModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditModal from "../../components/Modals/EditModal";
import ViewModal from "../../components/Modals/ViewModal";
import { useGetAllBlacklistQuery } from "../../services/blacklist.api";
import { formatDate } from "../../utils/formatdate.util";
import { Trow } from "../../interfaces/props.interface";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { useAppSelector } from "../../hooks/store.hook";
import { UserData } from "../../interfaces/slice.interface";
import { decodeUserData } from "../../utils/jwt.util";
import DashboardUsers from "../DashboardUsers";

export default function DashboardBlacklist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const { token } = useAppSelector((state) => state.auth);
  const { role } = decodeUserData(token as string) as UserData;
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const pageSize = 10;

  const {
    data: blacklist,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllBlacklistQuery({ pageSize, page: currentPage });

  // REDIRECT TO USER IF NOT BLACKLIST ADMIN
  if (role !== "BlackListAdmin" && role) {
    return <DashboardUsers />;
  }

  const transformedBlacklist = blacklist
    ? blacklist.data.map((item, idx) => {
        return [
          idx + 1,
          item.blacklistId,
          item.productName,
          item.criteriaName,
          formatDate(item.createdAt),
          "",
        ];
      })
    : [];

  const theadData = BlackListData.head;
  const tbodyData = transformedBlacklist;

  const handleOnViewClick = (blacklistId: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ view: "true", id: `${blacklistId}` });
  };

  const handleOnEditClick = (blacklistId: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ edit: "true", id: `${blacklistId}` });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const inputDataListView = theadData.slice(2).map((label, index) => {
    if (rowIndex !== null && tbodyData[rowIndex]) {
      return {
        ph: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(),
        value: tbodyData[rowIndex][index + 2] || tbodyData[0][index + 2] || "",
      };
    } else {
      return {
        ph: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(),
        value: "",
      };
    }
  });

  const tableData = (
    row: Trow[],
    data: Trow,
    colIdx: number,
    rowIdx: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === lstIdx ? (
          <span className={styles.btnAction}>
            <IoEyeSharp onClick={() => handleOnViewClick(row[1], rowIdx)} />
            <MdOutlineEdit onClick={() => handleOnEditClick(row[1], rowIdx)} />
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
        type="blacklist"
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
          tableDataElem={(row, data, colIdx, rowIdx) =>
            tableData(row, data, colIdx, rowIdx)
          }
          onClick={() => setSearchParams({ add: "true" })}
          btnTitle="Add Blacklist"
          theadData={theadData}
          tbodyData={tbodyData}
          totalResults={blacklist?.totalCount || 0}
          resultsPerPage={pageSize}
          maxVisiblePages={5}
          handlePageChange={handlePageChange}
          emptyText="No Product Blacklisted Yet!"
          showLoader={isLoading || isFetching}
          isError={isError}
          errMsg={
            (error as RTKUpdErr)?.data ||
            (error as RTKError)?.error.split(":")[1] ||
            "An error occurred"
          }
        />
      </DashboardLayout>
    </>
  );
}
