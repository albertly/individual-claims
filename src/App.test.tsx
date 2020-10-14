import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

test('renders first page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const t1 = getByText(/הגשת תביעה לביטוח שיניים/i);
  const t2 = getByText(/רגע לפני שמתחילים.../i);
  const t3 = getByText(/טופס התביעה/i);

  expect(t1).toBeInTheDocument();
  expect(t2).toBeInTheDocument();
  expect(t3).toBeInTheDocument();
});
