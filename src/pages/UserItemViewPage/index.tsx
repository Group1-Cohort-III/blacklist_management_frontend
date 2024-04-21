import { ChangeEvent, useEffect, useState, KeyboardEvent, memo } from "react";
import ViewBlacklistModal from "../../components/Modals/ViewBlacklistModal";
import { useGetAllBlacklistQuery } from "../../services/blacklist.api";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { CustomInput } from "../../components/common/CustomInput";
import { setBlacklist } from "../../store/slices/general.slice";
import { dataType } from "../../interfaces/props.interface";
import { formatDate } from "../../utils/formatdate.util";
import { useAppDispatch } from "../../hooks/store.hook";
import { sliceText } from "../../utils/slicetext.util";
import { BlackListData } from "../../utils/data.util";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { FiSearch } from "react-icons/fi";

export default function UserItemViewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const showModalView = searchParams.get("view");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pageSize = 10;
  const {
    data: blacklist,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetAllBlacklistQuery({ pageSize, page: currentPage });
  const theadData = BlackListData.head;
  const tbodyData = blacklist
    ? blacklist.data.map((data, i) => ({
        index: i + 1,
        ...data,
        action: "",
      }))
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnViewClick = (id: dataType) => {
    setSearchParams({ view: "true", id: `${id}` });
  };

  const getUniqIdCallback = (id: dataType) => {
    setSearchParams({ view: "true", id: `${id}` });
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleOnKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" && inputValue !== "") {
      navigate(`/blacklist/search/?query=${inputValue}`);
      setInputValue("");
    }
  };

  const handleOnClick = () => {
    if (inputValue !== "") {
      navigate(`/blacklist/search/?query=${inputValue}`);
      setInputValue("");
    }
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

  useEffect(() => {
    if (blacklist?.data) dispatch(setBlacklist(blacklist.data));
  }, [blacklist?.data, dispatch]);

  useEffect(() => {
    document.title = `BlackGuard | ViewItems`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  return (
    <>
      {showModalView && (
        <ViewBlacklistModal
          showModal={showModalView}
          title="Blacklist Details"
        />
      )}

      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.title}>Blacklisted Products</h4>
            <div className={styles.inputContainer}>
              <span className={styles.btnSearch} onClick={handleOnClick}>
                <FiSearch />
              </span>
              <CustomInput
                placeholder="Search Blacklisted Product"
                value={inputValue}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                xtraStyle={styles.input}
              />
            </div>
          </div>
          <Table
            isCustomTr={false}
            keysToRemove={["blacklistId"]}
            tableDataElem={(id, row, data, colIdx) =>
              tableData(id, row, data, colIdx)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            getUniqIdCallback={getUniqIdCallback}
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
      </div>
    </>
  );
}

export const MemoizedUserItemView = memo(UserItemViewPage);
