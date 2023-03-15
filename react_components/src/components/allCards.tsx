import { Card } from 'common/types';
import React from 'react';
import OneCard from './card';
import './allCards.css';
import { DATA_PATH } from '../common/const';

export default class AllCards extends React.Component {
  state: { cards: Card[] } = { cards: [] };
  constructor(props: PropertyDecorator) {
    super(props);
  }
  componentDidMount() {
    fetch(DATA_PATH)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ cards: data as Card[] });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
  render() {
    let i = 0;
    const allCardsRender = this.state.cards.map((card) => {
      return <OneCard key={i++} {...card} />;
    });
    return <div className="all-cards__wrapper">{allCardsRender}</div>;
  }
}
