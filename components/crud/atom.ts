import { atom } from 'jotai';
import { T } from '@/shared/custom_types';

type CrudAtom<T> = {
  formData: T | null;
  items: T[];
  onAdd: (formData: T) => Promise<T>;
  onChangeFormData: (key: string, value: any) => void;
  onEdit: (targetValue: number | string, formData: T, targetKey?: string) => Promise<T>;
  onFind: (searchParams: any) => Promise<T[]>;
  onRemove: (targetValues: number[] | string[], targetKey?: string) => Promise<void>;
};

export const crudAtom = atom<CrudAtom<T>>({
  formData: {},
  items: [],
  onAdd: async () => {
    throw new Error("onAdd not implemented");
  },
  onChangeFormData: () => {
    throw new Error("onChangeFormData not implemented");
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
});