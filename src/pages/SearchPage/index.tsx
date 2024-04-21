import { ChangeEvent, useEffect, useState, KeyboardEvent, memo } from "react";
import ViewBlacklistModal from "../../components/Modals/ViewBlacklistModal";
import { useLazyGetAllBlacklistQuery } from "../../services/blacklist.api";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { CustomInput } from "../../components/common/CustomInput";
import { reset, setBlacklist } from "../../store/slices/general.slice";
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getBlacklist, result] = useLazyGetAllBlacklistQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const showModalView = searchParams.get("view");
  const getQueryStr = searchParams.get("query");
  const [queryString, setQueryStrig] = useState(getQueryStr);
  const dispatch = useAppDispatch();
  const pageSize = 10;
  const navigate = useNavigate();
  const theadData = BlackListData.head;
  const tbodyData = result.data
    ? result.data.data.map((data, i) => ({
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
      getBlacklist({ filterValue: inputValue });
      setIsFilter(true);
      navigate(`/blacklist/search/?query=${inputValue}`);
      setQueryStrig(inputValue);
    }
  };

  const handleOnClick = () => {
    if (inputValue !== "") {
      getBlacklist({ filterValue: inputValue });
      setIsFilter(true);
      navigate(`/blacklist/search/?query=${inputValue}`);
      setQueryStrig(inputValue);
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
    if (!isFilter) {
      getBlacklist(
        !queryString
          ? { pageSize, page: currentPage }
          : { filterValue: queryString }
      );
    }

    if (result.data) dispatch(setBlacklist(result.data.data));

    return () => {
      dispatch(reset());
      setIsFilter(true);
    };
  }, [result.data, dispatch, isFilter, getBlacklist, currentPage, queryString]);

  useEffect(() => {
    document.title = `${
      queryString
        ? `Search results - ${queryString} | BlackGuard`
        : "Search | BlackGuard"
    }`;
    return () => {
      document.title = "BlackGuard";
    };
  }, [queryString]);

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
            <h4 className={styles.title}>
              {queryString ? (
                <>
                  <span>Search Result - </span>{" "}
                  <span className={styles.queryString}>{queryString}</span>
                </>
              ) : (
                <span className={styles.queryString}>Search</span>
              )}
            </h4>
            <div className={styles.inputContainer}>
              <span className={styles.btnSearch} onClick={handleOnClick}>
                <FiSearch />
              </span>
              <CustomInput
                placeholder="Search Blacklisted Product Name"
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
            totalResults={result.data?.totalCount || 0}
            resultsPerPage={pageSize}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
            emptyText="No matching records found"
            showLoader={result.isLoading || result.isFetching}
            isError={result.isError}
            errMsg={
              (result.error as RTKUpdErr)?.data ||
              (result.error as RTKError)?.error.split(":")[1] ||
              "An error occurred"
            }
          />
        </div>
      </div>
    </>
  );
}

export const MemoizedSearch = memo(SearchPage);
