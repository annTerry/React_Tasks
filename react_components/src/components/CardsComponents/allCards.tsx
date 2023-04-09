import { BookResponse, MiniCard } from '../../common/types';
import React, { useState, useEffect } from 'react';
import './allCards.css';
import { DATA_PATH } from '../../common/const';
import MiniCardElement from './miniCard';
import ModalCard from '../ModalCard/ModalCard';

export default function AllCards() {
  const [cards, setOrders] = useState<MiniCard[]>([]);
  const [stateSearch, setStateSearch] = useState<string>('');
  const [modalCardId, setModal] = useState<string>('');

  let oldStateSearch: string;

  useEffect(() => {
    console.log(oldStateSearch);
    if (!oldStateSearch || oldStateSearch != stateSearch) {
      fetch(DATA_PATH)
        .then((res) => res.json())
        .then((data) => {
          const receivedData = data as BookResponse;
          const newCards = receivedData.results.map((oneBookData) => {
            return {
              id: oneBookData.id.toString(),
              bookName: oneBookData.title,
              author: oneBookData.authors.map((authorData) => authorData.name).join(', '),
              cover: oneBookData.formats['image/jpeg'],
            };
          });
          setOrders(newCards);
        })
        .catch((e) => {
          console.log(e.message);
        });
      oldStateSearch = stateSearch;
    }
  }, []);

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
      {modalCardId && <ModalCard cardId={modalCardId} onClose={closeAllModal} />}
      {allCardsRender()}
    </div>
  );
}
