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
  isMenuOpen: boolean;
  dropDownColor?: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (val: IOpt) => void;
  prefillId?: string | number;
  isAsync?: boolean;
  inProgress?: boolean;
  isError?: boolean;
  showBtn?: boolean;
  loadMore?: Dispatch<SetStateAction<number>>
}

export type Trow = string | number | boolean;

export interface TableProps {
  title: string;
  btnTitle?: string;
  showBtn?: boolean;
  isCustomTr?: boolean;
  showFilter?: boolean;
  tableDataElem?: (
    row: Trow[],
    data: Trow,
    colIndex: number,
    rowIndex: number
  ) => ReactElement<HTMLTableCellElement>;
  theadData: string[];
  tbodyData: Trow[][];
  totalResults: number;
  resultsPerPage: number;
  maxVisiblePages: number;
  xtraStyle?: string;
  handlePageChange: (page: number) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  emptyText: string;
  showLoader?: boolean;
  isError?: boolean;
  errMsg?: string;
}
