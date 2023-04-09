import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './search.css';
import { SendSearch } from '../common/types';

export default function SearchString({ searchString, searchValue }: SendSearch) {
  const [searchStringValue, setSearchStringValue] = useState<string>(searchValue);

  function handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setSearchStringValue(value);
  }

  function handleKeyClick(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      searchIt();
    }
  }

  function searchIt() {
    localStorage.setItem('searchString', searchStringValue);
    searchString(searchStringValue);
  }

  return (
    <div className="search-wrapper">
      <input
        placeholder="Search"
        className="search-string"
        type="text"
        value={searchStringValue}
        onChange={handleChange}
        onKeyUp={handleKeyClick}
      />
      <button className="search-button" onClick={searchIt}>
        Search
      </button>
    </div>
  );
}
