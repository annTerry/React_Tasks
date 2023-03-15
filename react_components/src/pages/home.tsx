import SearchString from '../components/search';
import React from 'react';
import AllCards from '../components/allCards';

export default function Home() {
  return (
    <section>
      <SearchString />
      <h1>Welcome to our Store!</h1>
      <p>Choose your favorite book</p>
      <AllCards />
    </section>
  );
}
