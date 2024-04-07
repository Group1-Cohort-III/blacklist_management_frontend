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
import {
  ProductData,
  inputDataList,
  inputDataProd,
  inputDataProdView,
} from "../../utils/data.util";

export default function DashboardProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = ProductData.head;
  const tbodyData = ProductData.body;
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
        type="product"
        showModal={showModalAdd}
        title="Add Product"
        inputData={inputDataList}
      />
      <ViewModal
        showModal={showModalView}
        title="Product Details"
        inputData={inputDataProdView}
      />
      <EditModal
        type="product"
        showModal={showModalEdit}
        title="Edit Product"
        inputData={inputDataProd}
      />
      <DeleteModal
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
          tableDataElem={(row, data, index) => tableData(row, data, index)}
          onClick={() => setSearchParams({ add: "true" })}
          btnTitle="Add Product"
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
