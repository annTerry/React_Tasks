export interface MiniCard {
  id: string;
  bookName: string;
  author: string;
  cover: string;
}

export interface SearchValue {
  searchValue: string;
}

export interface ModalCardType {
  cardId: string;
  onClose: () => void;
}

export interface MiniCardSet {
  card: MiniCard;
  openModal: (id: string) => void;
}

export interface SendSearch {
  searchString: (search: string) => void;
  searchValue: string;
}

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

export interface AuthorsData {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface BooksResults {
  id: number;
  title: string;
  authors: AuthorsData[];
  translators: AuthorsData[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: { [k: string]: string };
  download_count: number;
}

export interface BookResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BooksResults[];
}
