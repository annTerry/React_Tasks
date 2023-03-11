import React from "react";
import { Card } from "common/types";
import './card.css';


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
    this.stat.year = data.year;
    this.stat.cover = data.cover;
    this.stat.pages = data.pages;
    this.stat.quantity = data.quantity;
  }
  render() {
    const coverSrc = "src/assets/covers/" + this.stat.cover; 
    return (
      <div className="one-card__wrapper">
        <div className="one-card__cover">
          <img src={coverSrc} alt={this.stat.bookName}/>
        </div>
        <div className="one-card__info-wrapper">
          <h2>{this.stat.bookName}</h2>
          <div className="one-card__info__props-wrapper">
            <div className="card-key">Author:</div><div className="card-value">{this.stat.author}</div>
            <div className="card-key">Popularity:</div><div className="card-value">{this.stat.popularity}</div>
            <div className="card-key">Publish year:</div><div className="card-value">{this.stat.year}</div>
            <div className="card-key">Translation:</div><div className="card-value">{this.stat.translation}</div>
            <div className="card-key">Pages Quantity:</div><div className="card-value">{this.stat.pages}</div>
            <div className="card-key">Illustration:</div><div className="card-value">{this.stat.illustration}</div>
            <div className="card-key">Quantity:</div><div className="card-value">{this.stat.quantity}</div>
            <div className="card-key">State:</div><div className="card-value">{this.stat.state}</div>
          </div>
        </div> 
      </div>
    );
  }  
}
