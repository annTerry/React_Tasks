import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import OneCard from '../src/components/card';
import React from 'react';

describe('One card property test', () => {
  test('Property has value', () => {
    render(
      <OneCard
        bookName="Some_name"
        author="some_author"
        popularity={2}
        year="1990"
        cover=""
        pages={100}
        quantity={25}
      />
    );
    expect(screen.getByText(/Some_name/i)).toBeDefined();
  });
});
