import { StylesConfig } from "react-select";
import { ReactElement } from "react";

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
}

export interface TableProps {
  title: string;
  btnTitle?: string;
  showBtn?: boolean;
  isCustomTr?: boolean;
  showFilter?: boolean;
  tableDataElem?: (
    row: string[],
    data: string,
    index: number
  ) => ReactElement<HTMLTableCellElement>;
  theadData: string[];
  tbodyData: string[][];
  totalResults: number;
  resultsPerPage: number;
  maxVisiblePages: number;
  xtraStyle?: string;
  handlePageChange: (page: number) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
