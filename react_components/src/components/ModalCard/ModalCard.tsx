import React, { useState, useEffect, MouseEvent } from 'react';
import './ModalCard.css';
import { BooksResults, Card, ModalCardType } from '../../common/types';
import { DATA_PATH } from '../../common/const';
import OneCard from '../CardsComponents/card';
import LoadWaiter from '../Waiter';

export default function ModalCard({ cardId, onClose }: ModalCardType) {
  const [data, dataSet] = useState<Card | null>(null);
  const [waitForData, setWaitForData] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log(DATA_PATH + cardId);
    fetch(DATA_PATH + cardId)
      .then((res) => {
        if (!res.ok) {
          throw Error(`No data for id ${cardId}`);
        }
        return res.json();
      })
      .then((data) => {
        const oneBookData = data as BooksResults;
        const someINumber = parseInt(cardId) % 10;
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
      })
      .then((cardData: Card) => {
        setError('');
        setWaitForData(false);
        dataSet(cardData);
      })
      .catch((err) => {
        setError(err.message);
        setWaitForData(false);
      });
  }, [cardId]);
  function clickHandler() {
    onClose();
  }
  function stopHandler(event: MouseEvent) {
    event.stopPropagation();
  }
  return (
    <div className="blackScreen" onClick={clickHandler}>
      <div className="blackScreen__one-card__wrapper" onClick={stopHandler}>
        {error && <div className="error-on">{error}</div>}
        <button className="one-card__close-button" onClick={clickHandler} />
        {data && <OneCard {...data}></OneCard>}
        {waitForData && <LoadWaiter />}
      </div>
    </div>
  );
}
