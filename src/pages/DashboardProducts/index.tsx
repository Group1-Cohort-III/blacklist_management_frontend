import { RTKError, RTKUpdErr } from "../../interfaces/generic.interface";
import EditProductModal from "../../components/Modals/EditProductModal";
import ViewProductModal from "../../components/Modals/ViewProductModal";
import { useGetAllProductsQuery } from "../../services/product.api";
import { ProductData, inputDataList } from "../../utils/data.util";
import CustomButton from "../../components/common/CustomButton";
import DashboardLayout from "../../components/DashboardLayout";
import { setProducts } from "../../store/slices/general.slice";
import DeleteModal from "../../components/Modals/DeleteModal";
import { dataType } from "../../interfaces/props.interface";
import { formatDate } from "../../utils/formatdate.util";
import AddModal from "../../components/Modals/AddModal";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { sliceText } from "../../utils/slicetext.util";
import { useSearchParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../components/Table";
import styles from "./styles.module.scss";
import { BiTrash } from "react-icons/bi";
import { UserData } from "../../interfaces/slice.interface";
import { decodeUserData } from "../../utils/jwt.util";

export default function DashboardProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const showModalAdd = searchParams.get("add");
  const showListModalAdd = searchParams.get("list");
  const showModalDel = searchParams.get("del");
  const showModalView = searchParams.get("view");
  const showModalEdit = searchParams.get("edit");
  const { token } = useAppSelector((state) => state.auth);
  const { role } = decodeUserData(token as string) as UserData;
  const dispatch = useAppDispatch();
  const perPage = 10;

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery({ perPage, page: currentPage });

  const theadData = ProductData.head;
  const tbodyDt = products
    ? products.data.data
        .map((itm) => ({
          id: itm.id,
          productName: itm.productName,
          productDescription: itm.productDescription,
          isBlacklisted: itm.isBlacklisted,
          createdAt: itm.createdAt,
          updatedAt: itm.updatedAt,
          createdBy: itm.createdBy,
          isDeleted: itm.isDeleted,
          action: "",
        }))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
    : [];

  const tbodyData = tbodyDt.map((itm, i) => ({ index: i + 1, ...itm }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnViewClick = (prodId: dataType) => {
    setSearchParams({ view: "true", id: `${prodId}` });
  };

  const handleOnEditClick = (prodId: dataType) => {
    setSearchParams({ edit: "true", id: `${prodId}` });
  };

  const handleOnDeleteClick = (prodId: dataType) => {
    setSearchParams({ del: "true", id: `${prodId}` });
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
            {/* Show the blacklist button only if the login user is BlacklistAdmin */}
            {role === "BlackListAdmin" && (
              <CustomButton
                isOutline
                title="blacklist"
                xtraStyle={styles.btn}
                onClick={() => setSearchParams({ list: "true", id: `${id}` })}
              />
            )}
            <IoEyeSharp onClick={() => handleOnViewClick(id)} />
            <MdOutlineEdit onClick={() => handleOnEditClick(id)} />
            <BiTrash onClick={() => handleOnDeleteClick(id)} />
          </span>
        ) : colIdx === 4 ? (
          formatDate(data as string)
        ) : colIdx === 3 ? (
          !row[colIdx] && (
            <span className={styles.checkIcon}>
              <FaCircleCheck size={15} />
            </span>
          )
        ) : colIdx === 2 ? (
          sliceText(data as string, 15)
        ) : (
          data
        )}
      </td>
    );
  };

  useEffect(() => {
    if (products?.data) {
      dispatch(setProducts(products.data.data));
    }
  }, [dispatch, products]);

  return (
    <>
      {showModalAdd && (
        <AddModal
          type="product"
          showModal={showModalAdd}
          title="Add Product"
          inputData={inputDataList}
        />
      )}
      {showListModalAdd && (
        <AddModal
          type="blacklist"
          showModal={showListModalAdd}
          title="Add Blacklist"
          inputData={inputDataList}
        />
      )}
      {showModalView && (
        <ViewProductModal showModal={showModalView} title="Product Details" />
      )}
      {showModalEdit && (
        <EditProductModal showModal={showModalEdit} title="Edit Product" />
      )}
      <DeleteModal
        type="Product"
        showModal={showModalDel}
        title={"Delete Product"}
        subtitle={"Are you sure you want to delete product?"}
      />
      <DashboardLayout title="Products">
        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.title}>All Products</h4>
            <CustomButton
              title="Add Product"
              onClick={() => setSearchParams({ add: "true" })}
            />
          </div>
          <Table
            isCustomTr={false}
            keysToRemove={["id", "updatedAt", "createdBy", "isDeleted"]}
            tableDataElem={(id, row, data, colIdx) =>
              tableData(id, row, data, colIdx)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={products?.data.totalCount || 0}
            resultsPerPage={perPage}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
            emptyText="No Product Added Yet!"
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

export const MemoizedProduct = memo(DashboardProducts);
