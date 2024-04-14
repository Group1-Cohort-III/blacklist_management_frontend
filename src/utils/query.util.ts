import { GetAllBlacklistParams } from "../interfaces/services.interface";

export const queryString = ({
  page,
  pageSize,
  date,
  filterValue,
}: GetAllBlacklistParams) => {
  let queryString = "Blacklist/get-blacklisted-products";

  if (pageSize) {
    queryString += `?PageSize=${pageSize}`;
  }

  if (page) {
    queryString += `${pageSize ? "&" : "?"}Page=${page}`;
  }

  if (filterValue) {
    queryString += `${pageSize || page ? "&" : "?"}FilterValue=${filterValue}`;
  }

  if (date) {
    queryString += `${pageSize || page || filterValue ? "&" : "?"}Date=${date}`;
  }

  return queryString;
};
