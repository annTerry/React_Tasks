import { Card } from "common/types";
import React from "react";
import OneCard from "./card";
import './allCards.css'

export default class AllCards extends React.Component {
  state:{cards:Card[]} = {cards: []};  
  constructor(props:PropertyDecorator) {
    super(props);            
  }
  componentDidMount() {
    fetch("/src/assets/data/cards.json")
    .then(res => res.json())
    .then(data => {     
      this.setState({cards: data as Card[]});        
    }).catch(e => { console.log(e.message) });
  }
  render() {        
    let i=0;
    console.log(JSON.stringify(this.state.cards));
    const allCardsRender=this.state.cards.map( (card) => {                    
      return <OneCard key={i++} {...card}/>
    });    
    return (
      <div className="all-cards__wrapper">        
        {          
        allCardsRender    
        }        
      </div>
    );
  }  
}