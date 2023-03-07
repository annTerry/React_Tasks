import React, { ChangeEvent } from "react";

export default class SearchString extends React.Component {
  state = {value: ''};
  constructor(props:PropertyDecorator) {
    super(props);
    const value = localStorage.getItem('searchString') || '';
    this.state.value = value;
    this.handleChange = this.handleChange.bind(this);    
  }

  handleChange(event: ChangeEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value
    localStorage.setItem('searchString', value);
    this.setState({value: value});
  }

  render() {
    return (
      <div>
      <input type="text" value={this.state.value} onChange={this.handleChange} />
      <button>Search</button>
    </div>
    );
  }  
}
