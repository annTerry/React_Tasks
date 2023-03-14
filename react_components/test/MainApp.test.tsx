import {describe, expect, test, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import  App from '../src/App'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe("MainApp", () => {
    test("App rendering", async () => {
        render(<BrowserRouter>
            <App />
          </BrowserRouter>);
        const header = screen.getByRole("heading", { level: 1 });
        expect(header).toBeDefined();
        expect(header.textContent).toContain("Welcome to Store!");
    });
});