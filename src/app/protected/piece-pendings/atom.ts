import { atom } from 'jotai';
import { CrudAtom, initialAtom } from '@/shared/components/crud/atom';
import { PiecePendingType } from './custom_types';

export const crudAtom = atom<CrudAtom<PiecePendingType>>(initialAtom);