import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { getField, setField } from '../../lib/localstorage';

export default function TokenManagement() {
  const [token, setToken] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value.trim();
    setToken(token);
    setField('github-personal-token', token);
  };

  useEffect(() => {
    setToken(getField('github-personal-token') || '');
  }, []);

  return (
    <Input.Password onChange={onChange} placeholder="Github Personal Token" value={token} />
  );
}
