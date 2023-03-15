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
