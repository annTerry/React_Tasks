import React from "react";
import { Card } from "common/types";


export default class OneCard extends React.Component<Card> {
  stat: Card;  
  constructor(props:Card) {
    super(props);
    this.stat = {
      bookName :"",
      author: "",
      popularity: 0,
      year: "",      
      cover: "",
      pages: 0,      
      quantity : 0,
    };      
    const data = props as unknown as Card;
    this.stat.bookName = data.bookName;
    this.stat.author = data.author;
    this.stat.popularity = data.popularity;
  }
  render() {
    return (
      <div>
      <h2>{this.stat.bookName}</h2>
      <div>
        <div>Author:</div><div>{this.stat.author}</div>        
      </div>
    </div>
    );
  }  
}
