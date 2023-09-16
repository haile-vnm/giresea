import { act, render, screen } from '@testing-library/react';
import DebounceSearchInput from '.';
import userEvent from '@testing-library/user-event';

describe('Debounce Input with 200ms', () => {
  const DEBOUNCE_TIME = 200;
  const REACHED_DEBOUNCE_TIME = DEBOUNCE_TIME + 10;
  const NOT_REACHED_DEBOUNCE_TIME = DEBOUNCE_TIME - 10;
  const mockCommitFn = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    render(<DebounceSearchInput commit={mockCommitFn} time={DEBOUNCE_TIME} />);
  });

  test('should not emit when nothing changes in the input', () => {
    expect(mockCommitFn).toBeCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(REACHED_DEBOUNCE_TIME);
    });

    expect(mockCommitFn).toBeCalledTimes(0);
  });

  test('should not emit the value when it not reached the debounce time', () => {
    const linkElement = screen.getByRole('textbox');
    const typedText = 'giresea';

    userEvent.type(linkElement, typedText);
    expect(linkElement).toHaveAttribute('value', typedText);

    act(() => {
      jest.advanceTimersByTime(NOT_REACHED_DEBOUNCE_TIME);
    });
    expect(mockCommitFn).toBeCalledTimes(0);
  });

  test('should emit only latest value after reaching the debounce time', () => {
    const linkElement = screen.getByRole('textbox');
    const typedText = 'giresea';

    userEvent.type(linkElement, typedText);
    act(() => {
      jest.advanceTimersByTime(REACHED_DEBOUNCE_TIME);
    });

    expect(mockCommitFn).toBeCalledTimes(1);
    expect(mockCommitFn.mock.calls[0][0]).toBe(typedText);
  });

  test('should emit combined value when user appends the new text', () => {
    const input = screen.getByRole('textbox');
    const typedText = 'welcome';

    userEvent.type(input, typedText);
    act(() => {
      jest.advanceTimersByTime(REACHED_DEBOUNCE_TIME);
    });

    expect(mockCommitFn).toBeCalledTimes(1);
    expect(mockCommitFn.mock.calls[0][0]).toBe(typedText);

    // continue editing new content to the input
    const appendText = ' to giresea';
    userEvent.type(input, appendText);

    act(() => {
      jest.advanceTimersByTime(REACHED_DEBOUNCE_TIME);
    });

    expect(mockCommitFn).toBeCalledTimes(2);
    expect(mockCommitFn.mock.calls[1][0]).toBe(typedText + appendText);
  });
});
