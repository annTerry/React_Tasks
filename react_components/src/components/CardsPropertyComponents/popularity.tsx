import React from 'react';
import { Popularity } from '../../common/types';
import './popularity.css';

export default function PopularityComponent(popularity: Popularity) {
  const maxPopularity = Array(5).fill('');
  const valueView = maxPopularity.map((data, index) => {
    let className = index <= popularity.value - 1 ? 'full-star' : 'empty-star';
    className += ' popularity-star';
    return <div key={index} className={className}></div>;
  });
  return <div className="popularity-stars__wrapper">{valueView}</div>;
}
