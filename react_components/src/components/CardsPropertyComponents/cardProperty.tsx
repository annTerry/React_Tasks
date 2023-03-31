import React, { ReactElement } from 'react';
import { CardProperty } from 'common/types';
import PopularityComponent from './popularity';
import StatusComponent from './status';

export default function OneCardProperty(cardProperty: CardProperty) {
  let valueView: string | number | ReactElement | undefined = cardProperty.value;
  if (cardProperty.viewName === 'Popularity') {
    valueView = <PopularityComponent value={cardProperty.value as number} />;
  }
  if (cardProperty.viewName === 'Status') {
    valueView = <StatusComponent value={cardProperty.value as string} />;
  }

  return (
    <>
      <div className="card-key">{cardProperty.viewName}:</div>
      <div className="card-value">{valueView}</div>
    </>
  );
}
