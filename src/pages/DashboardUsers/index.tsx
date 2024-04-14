import DashboardLayout from "../../components/DashboardLayout";
import DeleteModal from "../../components/Modals/DeleteModal";
import ViewModal from "../../components/Modals/ViewModal";
import AddModal from "../../components/Modals/AddModal";
import { useSearchParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { UsersData, inputData } from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useAppSelector } from "../../hooks/store.hook";
import { UserData } from "../../interfaces/slice.interface";
import { decodeUserData } from "../../utils/jwt.util";
import DashboardBlacklist from "../DashboardBlacklist";
import { useGetAllUsersQuery } from "../../services/user.api";
import { constant } from "../../configs/constant.config";
import { Trow } from "../../interfaces/props.interface";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import EditModalUser from "../../components/Modals/EditModalUser";

export default function DashboardUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const { token } = useAppSelector((state) => state.auth);
  const { role } = decodeUserData(token as string) as UserData;
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const { adminEmail } = constant;
  const perPage = 10;

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllUsersQuery({ perPage, page: currentPage });

  // REDIRECT TO BLACKLIST DASHBOARD IF NOT USERADMIN
  if (role !== "UserAdmin" && role) {
    return <DashboardBlacklist />;
  }

  const filterUsers = users
    ? users.data.data.filter((user) => user.email !== adminEmail)
    : [];

  const transformedUsers = filterUsers.map((item, idx) => {
    return [
      idx + 1,
      item.id,
      item.firstName || "None",
      item.lastName || "None",
      item.email,
      item.isPasswordSet,
      "",
    ];
  });

  const theadData = UsersData.head;
  const tbodyData = transformedUsers;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnViewClick = (rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ view: "true" });
  };

  const handleOnEditClick = (userEmail: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ edit: "true", id: `${userEmail}` });
  };

  const handleOnDeleteClick = (userEmail: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ del: "true", id: `${userEmail}` });
  };

  const inputDataUserView = theadData.slice(2).map((label, index) => {
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
            <IoEyeSharp onClick={() => handleOnViewClick(rowIdx)} />
            <MdOutlineEdit onClick={() => handleOnEditClick(row[4], rowIdx)} />
            <BiTrash onClick={() => handleOnDeleteClick(row[4], rowIdx)} />
          </span>
        ) : colIdx === 5 ? (
          <>{data ? "Yes" : "No"}</>
        ) : (
          data
        )}
      </td>
    );
  };

  return (
    <>
      {showModalAdd && (
        <AddModal
          showModal={showModalAdd}
          title="Add User"
          inputData={inputData}
        />
      )}
      {showModalView && (
        <ViewModal
          type="user"
          showModal={showModalView}
          title="User Details"
          inputData={inputDataUserView}
        />
      )}
      {showModalEdit && <EditModalUser showModal={showModalEdit} />}
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
          tableDataElem={(row, data, colIdx, rowIdx) =>
            tableData(row, data, colIdx, rowIdx)
          }
          onClick={() => setSearchParams({ add: "true" })}
          btnTitle="Add User"
          theadData={theadData}
          tbodyData={tbodyData}
          totalResults={users?.data.totalCount || 0}
          resultsPerPage={perPage}
          maxVisiblePages={5}
          handlePageChange={handlePageChange}
          emptyText="No User Added Yet!"
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
