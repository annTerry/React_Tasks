import SearchString from '../components/search';
import React from 'react';
import AllCards from '../components/CardsComponents/allCards';

export default class Home extends React.Component {
  render() {
    return (
      <section>
        <SearchString />
        <h1>Welcome to our Store!</h1>
        <p>Choose your favorite book</p>
        <AllCards />
      </section>
    );
  }
}
