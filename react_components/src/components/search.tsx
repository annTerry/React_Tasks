import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './search.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../common/store';
import { setNewString } from '../slices/searchStringSlice';
import { Simple } from '../common/types';

export default function SearchString() {
  const searchString = useSelector((state: RootState) => state.searchString.value);
  const dispatch = useDispatch();

  const [searchStringValue, setSearchStringValue] = useState<string>(searchString);

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
    const newValue: Simple = { value: searchStringValue };
    dispatch(setNewString(newValue));
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
