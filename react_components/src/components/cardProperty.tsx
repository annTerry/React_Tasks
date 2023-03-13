import React from "react";
import { CardProperty } from "common/types";
import PopularityComponent from "./popularity"

export default class OneCardProperty extends React.Component<CardProperty> {
  state: CardProperty;  
  constructor(props:CardProperty) {
    super(props);
    this.state = {
        value:props.value,
        viewName: props.viewName
    };
  }
  render() { 
    const valueView = this.state.viewName === "Popularity" ? <PopularityComponent value={this.state.value as number}/> : this.state.value;
    return (
        <>
        <div className="card-key">{this.state.viewName}</div><div className="card-value">        
            {valueView}
        </div>
        </>
    );
  }
}