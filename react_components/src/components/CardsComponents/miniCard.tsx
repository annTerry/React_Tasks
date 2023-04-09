import React from 'react';
import { MiniCardSet } from '../../common/types';
import './card.css';
import OneCardProperty from '../CardsPropertyComponents/cardProperty';
import { COVERS_URL, NO_COVER } from '../../common/const';

export default function MiniCardElement({ card, openModal }: MiniCardSet) {
  const coverSrc = card.cover ? card.cover : COVERS_URL + NO_COVER;

  function clickHandler() {
    openModal(card.id);
  }

  return (
    <div className="one-card__wrapper" onClick={clickHandler}>
      <div className="one-card__cover">
        <img src={coverSrc} alt={card.bookName} />
      </div>
      <div className="one-card__info-wrapper">
        <h2>{card.bookName}</h2>
        <div className="one-card__info__props-wrapper">
          <OneCardProperty viewName="Author" value={card.author} />
        </div>
      </div>
    </div>
  );
}
