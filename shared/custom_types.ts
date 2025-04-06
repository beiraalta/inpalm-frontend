export type T = any;

export type APIResponse<T> = {
  message: string;
  status: string;
  data: T;
};

export type Records<T> = {
  records: T[];
  filtered: number;
  total: number;
};

export type ObjectIdName = {
  id: string;
  name: string;
};
