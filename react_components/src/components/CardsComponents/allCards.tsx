import { BookResponse, MiniCard, SearchValue } from '../../common/types';
import React, { useState, useEffect } from 'react';
import './allCards.css';
import { DATA_PATH } from '../../common/const';
import MiniCardElement from './miniCard';
import ModalCard from '../ModalCard/ModalCard';
import LoadWaiter from '../Waiter';

export default function AllCards({ searchValue }: SearchValue) {
  const [cards, setCards] = useState<MiniCard[]>([]);
  const [modalCardId, setModal] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [waitForData, setWaitForData] = useState<boolean>(true);

  useEffect(() => {
    setWaitForData(true);
    const baseSearch = searchValue ? '?search=' + searchValue : '';
    fetch(DATA_PATH + baseSearch)
      .then((res) => {
        if (!res.ok) {
          throw Error('Error on request');
        }
        return res.json();
      })
      .then((data) => {
        const receivedData = data as BookResponse;
        if (!receivedData || receivedData.count < 1) throw Error('No result for request');
        const newCards = receivedData.results.map((oneBookData) => {
          return {
            id: oneBookData.id.toString(),
            bookName: oneBookData.title,
            author: oneBookData.authors.map((authorData) => authorData.name).join(', '),
            cover: oneBookData.formats['image/jpeg'],
          };
        });
        setError('');
        setWaitForData(false);
        setCards(newCards);
      })
      .catch((e) => {
        setCards([]);
        setWaitForData(false);
        setError(e.message);
        console.log(e);
      });
  }, [searchValue]);

  function openThisModal(id: string) {
    setModal(id);
  }

  function closeAllModal() {
    setModal('');
  }

  function allCardsRender(): JSX.Element[] {
    let i = 0;
    const allCardsRender = cards.map((card) => {
      return <MiniCardElement key={i++} card={card} openModal={openThisModal} />;
    });
    return allCardsRender;
  }

  return (
    <div className="all-cards__wrapper mini-cards__wrapper">
      {error && <div className="error-on">{error}</div>}
      {modalCardId && <ModalCard cardId={modalCardId} onClose={closeAllModal} />}
      {waitForData && <LoadWaiter />}
      {allCardsRender()}
    </div>
  );
}
