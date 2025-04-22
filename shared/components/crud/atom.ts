import { T } from '@/shared/custom_types';

export type CrudAtom<T> = {
  formData: T | null;
  items: T[];
  isEditing: boolean;
  onAdd: (formData: T) => Promise<T>;
  onEdit: (targetValue: number | string, formData: T, targetKey?: string) => Promise<T>;
  onFind: (searchParams: any) => Promise<T[]>;
  onRemove: (targetValues: number[] | string[], targetKey?: string) => Promise<void>;
  onSubmit: (formData: any) => Promise<void>;
};

export const initialAtom: CrudAtom<T>  = {
  formData: {},
  isEditing: false,
  items: [],
  onAdd: async () => {
    throw new Error("onAdd not implemented");
  },
  onEdit: async () => {
    throw new Error("onEdit not implemented");
  },
  onFind: async () => {
    throw new Error("onFind not implemented");
  },
  onRemove: async () => {
    throw new Error("onRemove not implemented");
  },
  onSubmit: async (formData: any) => {
    throw new Error("onSubmit not implemented");
  },
}