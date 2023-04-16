import React, { MouseEvent } from 'react';
import './ModalCard.css';
import OneCard from '../CardsComponents/card';
import LoadWaiter from '../Waiter';
import { useGetOneBookQuery } from '../../common/queries';
import { Card, ModalCardType } from '../../common/types';

export default function ModalCard({ cardId, onClose }: ModalCardType) {
  const { data, error, isFetching } = useGetOneBookQuery(cardId);
  const someINumber = parseInt(cardId) % 10;
  let cardData: Card | null = null;
  if (data) {
    cardData = {
      bookName: data.title,
      author: data.authors.map((authorData) => authorData.name).join(', '),
      popularity: Math.min(Math.floor(data.download_count / 5000), 5),
      year: (2020 - Math.ceil(someINumber * 10)).toString(),
      translation: data.translators.map((authorData) => authorData.name).join(', '),
      cover: data.formats['image/jpeg'],
      pages: 1000 - Math.ceil(someINumber * 5),
      illustration: data.formats['application/octet-stream'] ? 'yes' : 'no',
      quantity: Math.ceil(someINumber * 2) + 1,
      state: data.copyright ? 'hot' : '',
    };
  }

  function clickHandler() {
    onClose();
  }
  function stopHandler(event: MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div className="blackScreen" onClick={clickHandler}>
      <div className="blackScreen__one-card__wrapper" onClick={stopHandler}>
        {isFetching && <LoadWaiter />}
        {!data && <div className="error-on">No data for {cardId}</div>}
        {error && <div className="error-on">{error.toString()}</div>}
        <button className="one-card__close-button" onClick={clickHandler} />
        {cardData && <OneCard {...cardData}></OneCard>}
      </div>
    </div>
  );
}
