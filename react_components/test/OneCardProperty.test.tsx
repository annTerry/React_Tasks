import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import OneCardProperty from '../src/components/cardProperty';
import React from 'react';

describe('One card property test', () => {
  test('Property has value', () => {
    render(<OneCardProperty value="Name" viewName="Show" />);
    expect(screen.getByText(/Name/i)).toBeDefined();
    expect(screen.getByText(/Show/i)).toBeDefined();
  });

  test('Property Popularity has no visible value', () => {
    render(<OneCardProperty value={3} viewName="Popularity" />);
    const allDivs = screen.getAllByRole('generic');
    const cardValueDiv = Array.from(allDivs).filter((div) => div.classList.contains('card-value'));
    expect(cardValueDiv).toBeDefined();
    expect(cardValueDiv.length).toBeGreaterThan(0);
    expect(cardValueDiv[0].textContent).toEqual('');
  });
});
