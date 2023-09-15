import { render, screen } from '@testing-library/react';
import App from './App';

test('Make sure the app always renders at least one page', () => {
  render(<App />);
  const mainElement = screen.getByTestId('app-container');
  expect(mainElement).not.toBeEmptyDOMElement();
});
