import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import OneCard from '../src/components/formsComponents/orderCard';
import React from 'react';

describe('One Order test', () => {
  test('Property has value', () => {
    render(
      <OneCard
        name="test"
        quantity={2}
        country="Uk"
        presents={['wrapper']}
        send="post"
        invoice=" "
        address="some data"
      />
    );
    expect(screen.getByText(/Name/i)).toBeDefined();
    expect(screen.getByText(/Quantity/i)).toBeDefined();
  });
});
