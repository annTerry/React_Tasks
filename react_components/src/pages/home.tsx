import SearchString from '../components/search';
import React, { useState } from 'react';
import AllCards from '../components/CardsComponents/allCards';

export default function Home() {
  const defaultValue = localStorage.getItem('searchString') || '';
  const [searchValue, setSearchValue] = useState<string>(defaultValue);

  function renewSearchValue(value: string) {
    setSearchValue(value);
  }

  return (
    <section>
      <SearchString searchString={renewSearchValue} searchValue={searchValue} />
      <h1>Welcome to our Store!</h1>
      <p>Choose your favorite book</p>
      <AllCards searchValue={searchValue} />
    </section>
  );
}
