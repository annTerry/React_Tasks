export interface Card {
    bookName :string,
    author: string,
    popularity: number,
    year: string,
    translation?: string,
    cover: string,
    pages: number,
    illustration? : string,
    quantity : number,
    state? : string
};