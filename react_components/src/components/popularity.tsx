import React from "react";
import { Popularity } from "../common/types";
import "./popularity.css";

export default class PopularityComponent extends React.Component<Popularity> {
    state: Popularity;
    maxPopularity = Array(5).fill('');
    constructor(props:Popularity) {
      super(props);
      this.state = {
          value:props.value
      };
    }
    render() { 
      const valueView = this.maxPopularity.map((data, index) => {        
        let className = index <= (this.state.value - 1) ? "full-star" : "empty-star";
        className += " popularity-star"
        return <div key={index} className={className}></div>
      });
      return (
          <div className="popularity-stars__wrapper">
            {valueView}
          </div>
      );
    }
  }