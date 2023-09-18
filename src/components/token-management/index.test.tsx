import { render, screen } from '@testing-library/react';
import TokenManagement from '.';
import userEvent from '@testing-library/user-event';
import { getField, removeField, setField } from '../../lib/localstorage';

const PERSONAL_TOKEN = 'old-token';

describe ('User not enter token before', () => {
  let tokenInput: HTMLElement;
  let mockSaveFn: jest.Mock;

  beforeEach(() => {
    removeField('github-personal-token');

    mockSaveFn = jest.fn();
    render(<TokenManagement onSave={mockSaveFn}></TokenManagement>);

    userEvent.click(screen.getByRole('button', { name: /authenticate/i }));

    tokenInput = screen.getByPlaceholderText(/github personal token/i);
  });

  it ('should allow user to save new token and call save function', () => {
    userEvent.type(tokenInput, PERSONAL_TOKEN);
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(getField('github-personal-token')).toBe(PERSONAL_TOKEN);
    expect(mockSaveFn).toBeCalledTimes(1);
    expect(mockSaveFn.mock.calls[0][0]).toBe(PERSONAL_TOKEN);
  });
});

describe ('User entered token before', () => {
  let tokenInput: HTMLElement;
  let mockSaveFn: jest.Mock;
  
  beforeEach(() => {
    setField('github-personal-token', PERSONAL_TOKEN);

    mockSaveFn = jest.fn();
    render(<TokenManagement onSave={mockSaveFn}></TokenManagement>);

    userEvent.click(screen.getByRole('button', { name: /authenticate/i }));

    tokenInput = screen.getByPlaceholderText(/github personal token/i);
  });
  
  it ('should prefill saved token', () => {
    expect(tokenInput).toHaveAttribute('value', PERSONAL_TOKEN);
  });

  it ('should allow to update the current token', () => {
    const appendToken = 'xyz';

    userEvent.type(tokenInput, appendToken);
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    expect(getField('github-personal-token')).toBe(PERSONAL_TOKEN + appendToken);
    expect(mockSaveFn).toBeCalledTimes(1);
    expect(mockSaveFn.mock.calls[0][0]).toBe(PERSONAL_TOKEN + appendToken);
  });

  it ('should allow user to delete their token', () => {
    userEvent.clear(tokenInput);
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(getField('github-personal-token')).toBeFalsy();
    expect(mockSaveFn).toBeCalledTimes(1);
    expect(mockSaveFn.mock.calls[0][0]).toBe('');
  });

  it ('should allow user to discard the token changes, and keep the previous saved token', () => {
    userEvent.type(tokenInput, 'xyz');
    userEvent.click(screen.getByRole('button', { name: /discard/i }));

    expect(getField('github-personal-token')).toBe(PERSONAL_TOKEN);
    expect(mockSaveFn).toBeCalledTimes(0);
  });
});
