import DashboardLayout from "../../components/DashboardLayout";
import { DeleteModalMemiozed } from "../../components/Modals/DeleteModal";
import AddModal from "../../components/Modals/AddModal";
import { useSearchParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { UsersData, inputData } from "../../utils/data.util";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { UserData } from "../../interfaces/slice.interface";
import { decodeUserData } from "../../utils/jwt.util";
import DashboardBlacklist from "../DashboardBlacklist";
import { useGetAllUsersQuery } from "../../services/user.api";
import { constant } from "../../configs/constant.config";
import { dataType } from "../../interfaces/props.interface";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import EditModalUser from "../../components/Modals/EditModalUser";
import { setUsers } from "../../store/slices/general.slice";
import ViewUserModal from "../../components/Modals/ViewUserModal";
import CustomButton from "../../components/common/CustomButton";

export default function DashboardUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const { token } = useAppSelector((state) => state.auth);
  const { role, email: loginEmail } = decodeUserData(
    token as string
  ) as UserData;
  const { adminEmail } = constant;
  const dispatch = useAppDispatch();
  const perPage = 10;

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllUsersQuery({ perPage, page: currentPage });

  useEffect(() => {
    if (users?.data) dispatch(setUsers(users.data.data));
  }, [users, dispatch]);

  // REDIRECT TO BLACKLIST DASHBOARD IF NOT USERADMIN
  if (role !== "UserAdmin" && role) {
    return <DashboardBlacklist />;
  }

  const filterUsers = users
    ? users.data.data
        .filter((user) => user.email !== adminEmail)
        .map((data, i) => ({ index: i + 1, ...data, action: "" }))
    : [];

  const theadData = UsersData.head;
  const tbodyData = filterUsers;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnViewClick = (id: dataType) => {
    setSearchParams({ view: "true", id: `${id}` });
  };

  const handleOnEditClick = (id: dataType) => {
    setSearchParams({ edit: "true", id: `${id}` });
  };

  const handleOnDeleteClick = (userEmail: dataType) => {
    setSearchParams({ del: "true", email: `${userEmail}` });
  };

  const tableData = (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIdx: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === lstIdx ? (
          <span className={styles.btnAction}>
            <IoEyeSharp onClick={() => handleOnViewClick(id)} />
            <MdOutlineEdit onClick={() => handleOnEditClick(id)} />
            {/* Don't show Delete button for the login user */}
            {row[3] !== loginEmail && (
              <BiTrash onClick={() => handleOnDeleteClick(row[3])} />
            )}
          </span>
        ) : colIdx === 4 ? (
          <>{data ? "Yes" : "No"}</>
        ) : colIdx === 1 || colIdx === 2 ? (
          <>{!data ? "None" : data}</>
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
        <ViewUserModal showModal={showModalView} title="User Details" />
      )}
      {showModalEdit && <EditModalUser showModal={showModalEdit} />}
      {showModalDel && <DeleteModalMemiozed
        showModal={showModalDel}
        title={"Delete User"}
        subtitle={"Are you sure you want to delete user?"}
      />}
      <DashboardLayout title="Users">
        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.title}>All Users</h4>
            <CustomButton
              title="Add User"
              onClick={() => setSearchParams({ add: "true" })}
            />
          </div>
          <Table
            isCustomTr={false}
            keysToRemove={["id", "gender", "roles", "phoneNumber"]}
            tableDataElem={(id, row, data, colIdx) =>
              tableData(id, row, data, colIdx)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={users?.data ? users?.data.totalCount - 1 : 0}
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
        </div>
      </DashboardLayout>
    </>
  );
}

export const MemoizedUser = memo(DashboardUsers);
