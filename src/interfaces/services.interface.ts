export interface ValidateTokenResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: null;
  statusCode: number;
  v: boolean;
  value: null;
}

export interface CreateUserParams {
  emailAddress: string;
  roles: number[];
}

export interface CreateUserResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: null;
  statusCode: number;
  v: boolean;
  value: null;
}

export interface GetUserResp {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  roles: number;
  createdAt: string;
  isDeleted: boolean;
  isPasswordSet: boolean;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string | null;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  gender: number;
  email: string;
  roles: number;
  phoneNumber: string | null;
  isPasswordSet: boolean;
}

export interface GetAllUsersParams {
  perPage: number;
  page: number;
}

export interface GetAllUsersResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: {
    data: User[];
    totalPageCount: number;
    currentPage: number;
    perPage: number;
    totalCount: number;
  };
  statusCode: number;
  v: boolean;
  value: null;
}

export interface UpdateUserParams {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateProductParams {
  productName: string;
  productDescription: string;
}

export interface CreateProductResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: {
    id: string;
    productName: string;
    productDescription: string;
  };
  statusCode: number;
  v: boolean;
  value: null;
}

export interface GetAllProductsParams {
  perPage: number;
  page: number;
}

export interface Product {
  productName: string;
  isBlacklisted: boolean;
  productDescription: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: null;
  isDeleted: boolean;
}

export interface GetAllProductsResp {
  succeeded: true;
  message: null;
  errors: [];
  data: {
    data: Product[];
    totalPageCount: number;
    currentPage: number;
    perPage: number;
    totalCount: number;
  };
  statusCode: number;
  v: boolean;
  value: null;
}

export interface GetAProductResp {
  succeeded: true;
  message: string;
  errors: [];
  data: {
    id: string;
    productName: string;
    productDescription: string;
  };
  statusCode: number;
  v: boolean;
  value: null;
}

export interface UpdateProductParams extends CreateProductParams {
  id: string;
}

export interface UpdateProductResp extends CreateUserResp {}

export interface DeleteProductResp {
  succeeded: boolean;
  message: string;
  errors: null;
  data: null;
  statusCode: number;
  v: boolean;
  value: null;
}

export interface BlacklistParams {
  productId: string;
  criteriaId: string;
  reason: string;
  userId: string;
}

export interface BlacklistResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: boolean;
  statusCode: number;
  v: boolean;
  value: null;
}

export interface Blacklist {
  blacklistId: string;
  productName: string;
  criteriaName: string;
  createdAt: string;
}

export interface GetAllBlacklistParams {
  page?: number;
  pageSize?: number;
  filterValue?: string;
  date?: string;
}

export interface GetAllBlacklistResp {
  data: Blacklist[];
  totalPageCount: number;
  currentPage: number;
  perPage: number;
  totalCount: number;
}

export interface GetABlacklistResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: {
    blacklistId: string;
    productName: string;
    criteriaName: string;
    criteriaDescription: string;
    createdBy: string;
    createdAt: string;
    reason: string;
  };
  statusCode: number;
  v: boolean;
  value: null;
}

export interface RemoveBlacklistParam {
  id: string;
  reason: string;
  userId: string;
}

export interface RemoveBlacklistResp {
  succeeded: boolean;
  message: string;
  errors: [];
  data: boolean;
  statusCode: number;
  v: boolean;
  value: null;
}

export interface BlacklistCriteria {
  id: string;
  categoryName: string;
  categoryDescription: string;
}
