import {describe, expect, test, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent  from '@testing-library/user-event'
import  App from '../src/App'
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe("Router", () => {    
    test('Click the about router link', async () => {
        render(<App />, {wrapper: BrowserRouter})
    
        expect(screen.getByText('About')).toBeDefined();        
        const user = userEvent.setup();
        const about = vi.spyOn(user, 'click');
        const aboutLink = screen.getByText(/About/i)
    
        await user.click(aboutLink)
        expect(about).toHaveBeenCalledTimes(1);
      });
      test('Go to 404 page', async () => {
        render(<App />, {wrapper: BrowserRouter});

        const wrongRoute = '/wrong/page'
        
        render(
          <MemoryRouter initialEntries={[wrongRoute]}>
            <App />
          </MemoryRouter>,
        )              
        expect(screen.getByText(/404. Not Found/i)).toBeDefined();
      })  
});