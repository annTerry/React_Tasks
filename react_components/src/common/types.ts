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
  saveOrder?: (data: Order) => void;
};

export interface OrderData {
  saveOrder: (data: Order) => void;
}
