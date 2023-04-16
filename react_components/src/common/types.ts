import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface Card {
  bookName: string;
  author: string;
  popularity: number;
  year: string;
  translation?: string;
  cover: string;
  pages: number;
  illustration?: string;
  quantity: number;
  state?: string;
}

export interface CardProperty {
  viewName: string;
  value?: string | number;
}

export interface Popularity {
  value: number;
}

export interface Simple {
  value: string;
}

export interface Order {
  name: string;
  quantity: number;
  presents: string[];
  send: string;
  country: string;
  address: string;
  invoice: string;
  date: string;
}

export type StateOrder = {
  orders: Order[];
};

export interface OrderData {
  saveOrder: (data: Order) => void;
}
