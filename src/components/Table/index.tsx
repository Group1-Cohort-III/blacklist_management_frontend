import { selectStyles } from "../../utils/selector.style.util";
import { IOpt, TableProps } from "../../utils/interfaces";
import { filterOpts } from "../../utils/data.util";
import CustomButton from "../common/CustomButton";
import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import styles from "./styles.module.scss";
import Pagination from "../Pagination";

export default function Table({
  title,
  btnTitle,
  showBtn,
  showFilter,
  theadData,
  tbodyData,
  xtraStyle,
  isCustomTr = true,
  tableDataElem,
  handlePageChange,
  onClick,
}: TableProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windoWidth, setWindoWidth] = useState(window.innerWidth);

  const onSelect = (newVal: IOpt) => {};

  useEffect(() => {
    const handleResize = () => {
      setWindoWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${styles.table} ${xtraStyle}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.btnContainer}>
          {showFilter && (
            <CustomSelect
              options={filterOpts}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              onSelect={onSelect}
              prefillId={"all"}
              styles={selectStyles(isMenuOpen, "120px", "0.92rem", windoWidth)}
            />
          )}
          {showBtn && (
            <CustomButton title={btnTitle ? btnTitle : ""} onClick={onClick} />
          )}
        </div>
      </div>

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
          {tbodyData.map((row, i) => (
            <tr key={i}>
              {row.map((data, idx) =>
                isCustomTr ? (
                  <td key={idx}>{data}</td>
                ) : (
                  tableDataElem && tableDataElem(row, data, idx)
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalResults={100}
        resultsPerPage={10}
        onPageChange={handlePageChange}
        maxVisiblePages={5}
      />
    </div>
  );
}
