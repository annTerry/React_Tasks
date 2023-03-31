import React from 'react';
import { Simple } from '../../common/types';
import './status.css';

export default function StatusComponent(status: Simple) {
  const styleClass = 'status__icon icon__' + status.value;
  return <div className={styleClass}></div>;
}
