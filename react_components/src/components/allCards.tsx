import { Card } from "common/types";
import React from "react";
import OneCard from "./card";
import './allCards.css'

export default class AllCards extends React.Component {
  creationDataArray:Card[] = [];
  constructor(props:PropertyDecorator) {
    super(props);
    fetch("/src/assets/data/cards.json")
            .then(res => res.json())
            .then(data => {                              
              this.creationDataArray = data as Card[];
              this.forceUpdate();
            }).catch(e => { console.log(e.message) });            
  }

  render() {        
    let i=0;
    const allCardsRender=this.creationDataArray.map( (card) => {                    
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