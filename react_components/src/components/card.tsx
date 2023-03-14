import React from "react";
import { Card } from "common/types";
import './card.css';
import OneCardProperty from "./cardProperty";


export default class OneCard extends React.Component<Card> {
  state: Card;  
  constructor(props:Card) {
    super(props);
    this.state = {
      bookName : props.bookName,
      author: props.author,
      popularity: props.popularity,
      year: props.year,
      translation: props.translation || "",
      cover: props.cover || "none.jpg",
      pages: props.pages,
      illustration : props.illustration || "",
      quantity : props.quantity,
      state : props.state || ""
    };
  }
  render() {
    const coverSrc = "src/assets/covers/" + this.state.cover; 
    return (
      <div className="one-card__wrapper">
        <div className="one-card__cover">
          <img src={coverSrc} alt={this.state.bookName}/>
        </div>
        <div className="one-card__info-wrapper">
          <h2>{this.state.bookName}</h2>
          <div className="one-card__info__props-wrapper">
            <OneCardProperty viewName="Author" value={this.state.author} key="author"/>
            <OneCardProperty viewName="Popularity" value={this.state.popularity} key="popularity"/>
            <OneCardProperty viewName="Publish year" value={this.state.year} key="year"/>
            <OneCardProperty viewName="Translation" value={this.state.translation} key="translation"/>
            <OneCardProperty viewName="Pages" value={this.state.pages} key="pages"/>                                    
            <OneCardProperty viewName="Illustration" value={this.state.illustration} key="illustration"/>            
            <OneCardProperty viewName="Quantity" value={this.state.quantity} key="quantity"/>            
            <OneCardProperty viewName="State" value={this.state.state} key="state"/>            
          </div>
        </div> 
      </div>
    );
  }  
}
