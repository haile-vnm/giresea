import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce, useIsFirstRender } from 'usehooks-ts';
import { USER_TYPING_TIME } from '../../lib/constant';

const { Search } = Input;

interface DebounceInputProps {
  placeholder?: string;
  time?: number; // in milliseconds
  commit?: (value: string) => void;
}

export default function DebounceSearchInput({ time, commit, placeholder }: DebounceInputProps) {
  const [value, setValue] = useState('');
  const isFirstRender = useIsFirstRender();
  const debouncedValue = useDebounce<string>(value, time || USER_TYPING_TIME);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    commit && commit(debouncedValue);
  }, [debouncedValue]);

  return (
    <Search
      onChange={onSearch}
      placeholder={placeholder}
    />
  );
}
