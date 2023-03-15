import React, { ReactElement } from 'react';
import { CardProperty } from 'common/types';
import PopularityComponent from './popularity';
import StatusComponent from './status';

export default class OneCardProperty extends React.Component<CardProperty> {
  state: CardProperty;
  constructor(props: CardProperty) {
    super(props);
    this.state = {
      value: props.value,
      viewName: props.viewName,
    };
  }
  render() {
    let valueView: string | number | ReactElement | undefined = this.state.value;
    if (this.state.viewName === 'Popularity') {
      valueView = <PopularityComponent value={this.state.value as number} />;
    }
    if (this.state.viewName === 'Status') {
      valueView = <StatusComponent value={this.state.value as string} />;
    }

    return (
      <>
        <div className="card-key">{this.state.viewName}:</div>
        <div className="card-value">{valueView}</div>
      </>
    );
  }
}
