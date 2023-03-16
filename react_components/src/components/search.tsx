import React, { ChangeEvent } from 'react';
import './search.css';

export default class SearchString extends React.Component {
  state = { value: '' };
  constructor(props: PropertyDecorator) {
    super(props);
    const value = localStorage.getItem('searchString') || '';
    this.state.value = value;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    this.setState({ value: value });
  }

  componentWillUnmount() {
    localStorage.setItem('searchString', this.state.value);
  }

  render() {
    return (
      <div className="search-wrapper">
        <input
          placeholder="Search"
          className="search-string"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button className="search-button">Search</button>
      </div>
    );
  }
}
