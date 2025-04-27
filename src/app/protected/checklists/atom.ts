import { ChecklistType } from './custom_types';
import { atom } from 'jotai';
import { CrudAtom, initialAtom } from '@/shared/components/crud/atom';

export const crudAtom = atom<CrudAtom<ChecklistType>>(initialAtom);