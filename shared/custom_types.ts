export type T = any;

export type APIResponse<T> = {
  message: string;
  status: string;
  data: T;
};

export type ObjectIdName = {
  id: string;
  name: string;
};

export type ObjectKeyValue = {
  key: string;
  value: string;
};

export type Records<T> = {
  records: T[];
  filtered: number;
  total: number;
};
