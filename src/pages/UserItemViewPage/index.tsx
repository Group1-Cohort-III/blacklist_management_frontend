import { ProductData } from "../../utils/data.util";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../services/product.api";
import { formatDate } from "../../utils/formatdate.util";
import ViewModal from "../../components/Modals/ViewModal";
import { useSearchParams } from "react-router-dom";
import { sliceText } from "../../utils/slicetext.util";
import { TiCancelOutline } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { Trow } from "../../interfaces/props.interface";

export default function UserItemViewPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const showModalView = searchParams.get("view");
  const perPage = 10;

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery({ perPage, page: currentPage });

  const filterProduct = product
    ? product.data.data.filter((prod) => prod.isBlacklisted)
    : [];

  const transformedProduct = filterProduct.map((item, idx) => {
    return [
      idx + 1,
      item.id,
      item.productName,
      item.productDescription,
      item.isBlacklisted,
      formatDate(item.createdAt),
      formatDate(item.updatedAt),
      "",
    ];
  });

  const theadData = ProductData.head;
  const tbodyData = transformedProduct;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnViewClick = (rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ view: "true" });
  };

  const inputDataProdView = theadData.slice(2).map((label, index) => {
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
          </span>
        ) : colIdx === 4 ? (
          row[colIdx] && (
            <span className={styles.checkIcon}>
              <TiCancelOutline size={15} />
            </span>
          )
        ) : colIdx === 1 ? (
          data.toString().substring(0, 5)
        ) : colIdx === 3 ? (
          <>{sliceText(data as string, 15)}</>
        ) : (
          data
        )}
      </td>
    );
  };

  useEffect(() => {
    document.title = `BlackGuard | ViewItems`;
    return () => {
      document.title = "BlackGuard";
    };
  }, []);

  return (
    <>
      <ViewModal
        type="product"
        showModal={showModalView}
        title="Product Details"
        inputData={inputDataProdView}
      />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Table
            title="BlackListed Items"
            isCustomTr={false}
            tableDataElem={(row, data, colIdx, rowIdx) =>
              tableData(row, data, colIdx, rowIdx)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={product?.data.totalCount || 0}
            resultsPerPage={perPage}
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
            xtraStyle={styles.table}
          />
        </div>
      </div>
    </>
  );
}
