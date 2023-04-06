import { Card, BookResponse } from 'common/types';
import React, { useState } from 'react';
import OneCard from './card';
import './allCards.css';
import { DATA_PATH } from '../../common/const';

export default function AllCards() {
  const [cards, setOrders] = useState<Card[]>([]);

  fetch(DATA_PATH)
    .then((res) => res.json())
    .then((data) => {
      const receivedData = data as BookResponse;
      const newCards = receivedData.results.map((oneBookData, index) => {
        const someINumber = index % 10;
        return {
          bookName: oneBookData.title,
          author: oneBookData.authors.map((authorData) => authorData.name).join(', '),
          popularity: Math.min(Math.floor(oneBookData.download_count / 5000), 5),
          year: (2020 - Math.ceil(someINumber * 10)).toString(),
          translation: oneBookData.translators.map((authorData) => authorData.name).join(', '),
          cover: oneBookData.formats['image/jpeg'],
          pages: 1000 - Math.ceil(someINumber * 5),
          illustration: oneBookData.formats['application/octet-stream'] ? 'yes' : 'no',
          quantity: Math.ceil(someINumber * 2) + 1,
          state: oneBookData.copyright ? 'hot' : '',
        };
      });
      setOrders(newCards);
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
