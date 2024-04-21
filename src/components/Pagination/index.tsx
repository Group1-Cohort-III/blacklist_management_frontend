import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import styles from "./styles.module.scss";
import { useState } from "react";

interface Props {
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
}

const Pagination = ({
  totalResults,
  resultsPerPage,
  onPageChange,
  maxVisiblePages,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(null);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(null);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageClick = (page: number | null) => {
    if (page !== null) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination_container}>
      <div>
        <p>
          Showing {startResult}-{endResult} of {totalResults} results
        </p>
      </div>
      <div className={styles.pagination_btn_wrapper}>
        <div className={styles.content}>
          <button
            className={styles.btn_prev}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <PiCaretLeftBold />
          </button>
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              className={
                pageNumber === currentPage ? styles.active : styles.btn_paginate
              }
              onClick={() => handlePageClick(pageNumber)}
              disabled={pageNumber === null}
            >
              {pageNumber === null ? "..." : pageNumber}
            </button>
          ))}
          <button
            className={styles.btn_nxt}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <PiCaretRightBold />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
