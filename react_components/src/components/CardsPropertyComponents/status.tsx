import React from 'react';
import { Simple } from '../common/types';
import './status.css';

export default class StatusComponent extends React.Component<Simple> {
  state: Simple;
  constructor(props: Simple) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  render() {
    const styleClass = 'status__icon icon__' + this.state.value;
    return <div className={styleClass}></div>;
  }
}
