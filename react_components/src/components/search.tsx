import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import './search.css';

export default function SearchString() {
  const defaultValue = localStorage.getItem('searchString') || '';
  const [searchStringValue, setSearchStringValue] = useState<string>(defaultValue);
  const valueRef: React.MutableRefObject<string> = useRef() as React.MutableRefObject<string>;

  useEffect(() => {
    valueRef.current = searchStringValue;
  }, [searchStringValue]);

  useEffect(() => {
    return function cleanup() {
      localStorage.setItem('searchString', valueRef.current);
    };
  }, []);

  function handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setSearchStringValue(value);
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
