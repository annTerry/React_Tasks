import React from 'react';
import { Card } from 'common/types';
import './card.css';
import OneCardProperty from './cardProperty';
import { COVERS_URL, NO_COVER } from '../common/const';

export default class OneCard extends React.Component<Card> {
  state: Card;
  constructor(props: Card) {
    super(props);
    this.state = {
      bookName: props.bookName,
      author: props.author,
      popularity: props.popularity,
      year: props.year,
      translation: props.translation || '',
      cover: props.cover || NO_COVER,
      pages: props.pages,
      illustration: props.illustration || '',
      quantity: props.quantity,
      state: props.state || '',
    };
  }

  render() {
    const coverSrc = COVERS_URL + this.state.cover;
    return (
      <div className="one-card__wrapper">
        <div className="one-card__cover">
          <img src={coverSrc} alt={this.state.bookName} />
        </div>
        <div className="one-card__info-wrapper">
          <h2>{this.state.bookName}</h2>
          <div className="one-card__info__props-wrapper">
            <OneCardProperty viewName="Author" value={this.state.author} />
            <OneCardProperty viewName="Popularity" value={this.state.popularity} />
            <OneCardProperty viewName="Publish year" value={this.state.year} />
            <OneCardProperty
              viewName="Translation"
              value={this.state.translation}
              key="translation"
            />
            <OneCardProperty viewName="Pages" value={this.state.pages} />
            <OneCardProperty
              viewName="Illustration"
              value={this.state.illustration}
              key="illustration"
            />
            <OneCardProperty viewName="Quantity" value={this.state.quantity} />
            <OneCardProperty viewName="Status" value={this.state.state} />
          </div>
        </div>
      </div>
    );
  }
}
