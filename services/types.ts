export type T = any;

export type Account = {
  name: string;
  email: string;
  password: string | null;
};

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
