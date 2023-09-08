import { Input } from 'antd';
const { Search } = Input;

interface DebounceInputProps {
  time?: number; // in milisecond
  commit?: (value: string) => void;
}

export default function DebounceInput({ time, commit }: DebounceInputProps) {
  const onSearch = (value: string) => {};

  return (
    <Search onSearch={onSearch} placeholder="Search by repository name" style={{ width: '50%' }} />
  );
}
