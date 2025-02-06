export interface BaseResponse {
  status: string;
  message: string;
}

// Type untuk single item response
export interface SingleResponse<T> extends BaseResponse {
  data: T;
}

// Type untuk list response
export interface ListResponse<T> extends BaseResponse {
  data: T[];
}
