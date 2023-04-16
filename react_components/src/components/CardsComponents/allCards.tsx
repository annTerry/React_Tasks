import React, { useState } from 'react';
import './allCards.css';
import MiniCardElement from './miniCard';
import ModalCard from '../ModalCard/ModalCard';
import LoadWaiter from '../Waiter';
import { useSelector } from 'react-redux';
import type { RootState } from '../../common/store';
import { useGetBooksResultQuery } from '../../common/queries';

export default function AllCards() {
  const [modalCardId, setModal] = useState<string>('');
  const searchString = useSelector((state: RootState) => state.searchString.value);
  const { data, error, isFetching } = useGetBooksResultQuery(searchString);
  const newCards = data?.results.map((oneBookData) => {
    return {
      id: oneBookData.id.toString(),
      bookName: oneBookData.title,
      author: oneBookData.authors.map((authorData) => authorData.name).join(', '),
      cover: oneBookData.formats['image/jpeg'],
    };
  });

  function openThisModal(id: string) {
    setModal(id);
  }

  function closeAllModal() {
    setModal('');
  }

  function allCardsRender(): JSX.Element[] {
    let i = 0;
    let allCardsRender: JSX.Element[] = [];
    if (newCards && newCards.length > 0) {
      allCardsRender = newCards.map((card) => {
        i++;
        return <MiniCardElement key={i + searchString} card={card} openModal={openThisModal} />;
      });
    } else {
      allCardsRender.push(
        <div key={i + 'error'} className="error-on">
          No result for request
        </div>
      );
    }

    return allCardsRender;
  }

  return (
    <div className="all-cards__wrapper mini-cards__wrapper">
      {isFetching && <LoadWaiter />}
      {error && <div className="error-on">{error.toString()}</div>}
      {modalCardId && <ModalCard cardId={modalCardId} onClose={closeAllModal} />}
      {allCardsRender()}
    </div>
  );
}
