import React from 'react';
import { Card } from 'common/types';
import './card.css';
import OneCardProperty from '../CardsPropertyComponents/cardProperty';
import { COVERS_URL, NO_COVER } from '../../common/const';

export default function OneCard(card: Card) {
  const coverSrc = COVERS_URL + (card.cover ? card.cover : NO_COVER);
  return (
    <div className="one-card__wrapper">
      <div className="one-card__cover">
        <img src={coverSrc} alt={card.bookName} />
      </div>
      <div className="one-card__info-wrapper">
        <h2>{card.bookName}</h2>
        <div className="one-card__info__props-wrapper">
          <OneCardProperty viewName="Author" value={card.author} />
          <OneCardProperty viewName="Popularity" value={card.popularity} />
          <OneCardProperty viewName="Publish year" value={card.year} />
          <OneCardProperty viewName="Translation" value={card.translation} />
          <OneCardProperty viewName="Pages" value={card.pages} />
          <OneCardProperty viewName="Illustration" value={card.illustration} />
          <OneCardProperty viewName="Quantity" value={card.quantity} />
          <OneCardProperty viewName="Status" value={card.state} />
        </div>
      </div>
    </div>
  );
}
