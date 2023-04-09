import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchString from '../src/components/search';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Search string', () => {
  test('Property has value', async () => {
    function searchIt() {}
    render(<SearchString searchValue="" searchString={searchIt} />);
    const input = await screen.findByPlaceholderText('Search');
    expect(input).toBeDefined();
    expect(input?.textContent).toBe('');
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('test');
    const button = await screen.findByRole('button');
    await user.click(button);
    expect(input?.textContent).toBe('');
  });
});
