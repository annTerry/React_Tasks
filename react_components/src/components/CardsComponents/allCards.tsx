import { Card } from 'common/types';
import React, { useState } from 'react';
import OneCard from './card';
import './allCards.css';
import { DATA_PATH } from '../../common/const';

export default function AllCards() {
  const [cards, setOrders] = useState<Card[]>([]);

  fetch(DATA_PATH)
    .then((res) => res.json())
    .then((data) => {
      const cards = data as Card[];
      setOrders(cards);
    })
    .catch((e) => {
      console.log(e.message);
    });

  let i = 0;
  const allCardsRender = cards.map((card) => {
    return <OneCard key={i++} {...card} />;
  });

  return <div className="all-cards__wrapper">{allCardsRender}</div>;
}
