import { TableProps, dataType } from "../../interfaces/props.interface";
import { PropagateLoader } from "react-spinners";
import styles from "./styles.module.scss";
import Pagination from "../Pagination";

export default function Table({
  theadData,
  tbodyData,
  xtraStyle,
  isCustomTr = true,
  tableDataElem,
  handlePageChange,
  totalResults,
  resultsPerPage,
  emptyText,
  showLoader = false,
  isError = false,
  errMsg,
  getUniqIdCallback,
  keysToRemove,
}: TableProps) {
  const handleOnTrClick = (id: dataType) => {
    getUniqIdCallback && getUniqIdCallback(id);
  };
  return (
    <div className={`${styles.table} ${xtraStyle}`}>
      {showLoader ? (
        <div className={styles.loader}>
          <PropagateLoader color="#18425D" size={10} />
        </div>
      ) : isError ? (
        <h2 className={styles.errTxt}>{errMsg}</h2>
      ) : tbodyData.length === 0 ? (
        <h2 className={styles.empty_text}>{emptyText}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              {theadData.map((data, idx) => (
                <th key={idx} scope="col">
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbodyData.map(({ id, ...rest }, rowIdx) => {
              const removedKey = keysToRemove ? rest[keysToRemove[0]] : id;
              const newObj = { ...rest };
              if (keysToRemove) {
                keysToRemove.forEach((key) => delete newObj[key]);
              }
              return (
                <tr
                  key={rowIdx}
                  onClick={() => handleOnTrClick(removedKey || id)}
                >
                  {Object.values(newObj).map((data, colIdx) =>
                    isCustomTr ? (
                      <td key={colIdx}>{data}</td>
                    ) : (
                      tableDataElem &&
                      tableDataElem(
                        removedKey || id,
                        Object.values(newObj),
                        data,
                        colIdx,
                        rowIdx
                      )
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {totalResults > 0 && (
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      )}
    </div>
  );
}
