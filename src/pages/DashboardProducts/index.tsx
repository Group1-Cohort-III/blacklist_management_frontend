import DashboardLayout from "../../components/DashboardLayout";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditModal from "../../components/Modals/EditModal";
import ViewModal from "../../components/Modals/ViewModal";
import AddModal from "../../components/Modals/AddModal";
import { useSearchParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { ProductData, inputDataList } from "../../utils/data.util";
import { useGetAllProductsQuery } from "../../services/product.api";
import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import { formatDate } from "../../utils/formatdate.util";
import { FaCircleCheck } from "react-icons/fa6";
import { Trow } from "../../interfaces/props.interface";
import { sliceText } from "../../utils/slicetext.util";

export default function DashboardProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const perPage = 10;

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery({ perPage, page: currentPage });

  const filterProduct = product
    ? product.data.data.filter((prod) => !prod.isBlacklisted)
    : [];

  // ONLY SHOW NOT BLACKLISTED PRODUCTS
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

  const handleOnEditClick = (prodId: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ edit: "true", index: `${prodId}` });
  };

  const handleOnDeleteClick = (prodId: Trow, rowIdx: number) => {
    setRowIndex(rowIdx);
    setSearchParams({ del: "true", index: `${prodId}` });
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

  const inputDataProdEdit = [
    {
      ph: "Name",
      value: (rowIndex !== null && tbodyData[rowIndex]
        ? tbodyData[rowIndex][2] || ""
        : "") as string,
    },
    {
      ph: "Description",
      value: (rowIndex !== null && tbodyData[rowIndex]
        ? tbodyData[rowIndex][3] || ""
        : "") as string,
    },
  ];

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
            <MdOutlineEdit onClick={() => handleOnEditClick(row[1], rowIdx)} />
            <BiTrash onClick={() => handleOnDeleteClick(row[1], rowIdx)} />
          </span>
        ) : colIdx === 4 ? (
          !row[colIdx] && (
            <span className={styles.checkIcon}>
              <FaCircleCheck size={15} />
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

  return (
    <>
      <AddModal
        type="product"
        showModal={showModalAdd}
        title="Add Product"
        inputData={inputDataList}
      />
      <ViewModal
        type="product"
        showModal={showModalView}
        title="Product Details"
        inputData={inputDataProdView}
      />
      <EditModal
        type="product"
        showModal={showModalEdit}
        title="Edit Product"
        inputData={inputDataProdEdit}
      />
      <DeleteModal
        type="Product"
        showModal={showModalDel}
        title={"Delete Product"}
        subtitle={"Are you sure you want to delete product?"}
      />
      <DashboardLayout title="Products">
        <Table
          title="All Products"
          showBtn
          showFilter
          isCustomTr={false}
          tableDataElem={(row, data, colIdx, rowIdx) =>
            tableData(row, data, colIdx, rowIdx)
          }
          onClick={() => setSearchParams({ add: "true" })}
          btnTitle="Add Product"
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
        />
      </DashboardLayout>
    </>
  );
}
