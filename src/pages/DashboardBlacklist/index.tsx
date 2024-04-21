import ViewBlacklistModal from "../../components/Modals/ViewBlacklistModal";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { useGetAllBlacklistQuery } from "../../services/blacklist.api";
import DashboardLayout from "../../components/DashboardLayout";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddModal from "../../components/Modals/AddModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditModal from "../../components/Modals/EditModal";
import { formatDate } from "../../utils/formatdate.util";
import { dataType } from "../../interfaces/props.interface";
import { UserData } from "../../interfaces/slice.interface";
import { decodeUserData } from "../../utils/jwt.util";
import DashboardUsers from "../DashboardUsers";
import { sliceText } from "../../utils/slicetext.util";
import { setBlacklist } from "../../store/slices/general.slice";
import {
  BlackListData,
  inputDataList,
  inputDataListEdit,
} from "../../utils/data.util";
import CustomButton from "../../components/common/CustomButton";

export default function DashboardBlacklist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const { token } = useAppSelector((state) => state.auth);
  const { role } = decodeUserData(token as string) as UserData;
  const dispatch = useAppDispatch();
  const pageSize = 10;

  const {
    data: blacklist,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllBlacklistQuery({ pageSize, page: currentPage });

  useEffect(() => {
    if (blacklist) dispatch(setBlacklist(blacklist.data));
  }, [blacklist, dispatch]);

  // REDIRECT TO USER IF NOT BLACKLIST ADMIN
  if (role !== "BlackListAdmin" && role) {
    return <DashboardUsers />;
  }

  const theadData = BlackListData.head;
  const tbodyDt = blacklist
    ? blacklist.data
        .map((data) => ({
          ...data,
          action: "",
        }))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
    : [];

  const tbodyData = tbodyDt.map((itm, i) => ({ index: i + 1, ...itm }));

  const handleOnViewClick = (blacklistId: dataType) => {
    setSearchParams({ view: "true", id: `${blacklistId}` });
  };

  const handleOnEditClick = (blacklistId: dataType) => {
    setSearchParams({ edit: "true", id: `${blacklistId}` });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          </span>
        ) : colIdx === 2 ? (
          <>{sliceText(data as string, 15)}</>
        ) : colIdx === 4 ? (
          <>{formatDate(data as string)}</>
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
          type="blacklist"
          showModal={showModalAdd}
          title="Add Blacklist"
          inputData={inputDataList}
        />
      )}
      {showModalView && (
        <ViewBlacklistModal
          showModal={showModalView}
          title="Blacklist Details"
        />
      )}
      {showModalEdit && (
        <EditModal
          type="blacklist"
          showModal={showModalEdit}
          title="Edit Blacklist"
          inputData={inputDataListEdit}
        />
      )}
      <DeleteModal
        showModal={showModalDel}
        title={"Delete Blacklist"}
        subtitle={"Are you sure you want to delete this blacklisted product?"}
      />
      <DashboardLayout title="BlackList">
        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.title}>Blacklisted Products</h4>
            <CustomButton
              title="Add Blacklist"
              onClick={() => setSearchParams({ add: "true" })}
            />
          </div>
          <Table
            isCustomTr={false}
            keysToRemove={["blacklistId"]}
            tableDataElem={(id, row, data, colIdx) =>
              tableData(id, row, data, colIdx)
            }
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
        </div>
      </DashboardLayout>
    </>
  );
}

export const MemoizedBlacklist = memo(DashboardBlacklist);
