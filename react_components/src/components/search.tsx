import React, { ChangeEvent, useState, useEffect } from 'react';
import './search.css';

export default function SearchString() {
  const defaultValue = localStorage.getItem('searchString') || '';
  const [searchStringValue, setOrders] = useState<string>(defaultValue);

  useEffect(() => {
    localStorage.setItem('searchString', searchStringValue);
  });

  function handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setOrders(value);
  }

  return (
    <div className="search-wrapper">
      <input
        placeholder="Search"
        className="search-string"
        type="text"
        value={searchStringValue}
        onChange={handleChange}
      />
      <button className="search-button">Search</button>
    </div>
  );
}
