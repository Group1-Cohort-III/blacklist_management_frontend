import { StylesConfig } from "react-select";
import { Dispatch, ReactElement, SetStateAction } from "react";

export interface PropTd {
  row: string[];
  index: number;
  data: string;
}

export interface IOpt {
  label: string;
  value: string;
}

export interface ICustomSelect {
  options: IOpt[];
  styles?: StylesConfig<unknown, false>;
  placeholder?: string;
  dropDownColor?: string;
  onSelect: (val: IOpt) => void;
  prefillId?: string | number;
  isAsync?: boolean;
  inProgress?: boolean;
  isError?: boolean;
  showBtn?: boolean;
  isDisabled?: boolean;
  loadMore?: Dispatch<SetStateAction<number>>
}

export type dataType = string | number | boolean | null;

export type Trow = {
  [key: string]: dataType;
};

export interface TableProps {
  isCustomTr?: boolean;
  tableDataElem?: (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIndex: number,
    rowIndex: number
  ) => ReactElement<HTMLTableCellElement>;
  theadData: string[];
  tbodyData: Trow[];
  totalResults: number;
  resultsPerPage: number;
  maxVisiblePages: number;
  xtraStyle?: string;
  handlePageChange: (page: number) => void;
  emptyText: string;
  showLoader?: boolean;
  isError?: boolean;
  errMsg?: string;
  getUniqIdCallback?: (id: dataType) => void;
  keysToRemove?: string[];
}
