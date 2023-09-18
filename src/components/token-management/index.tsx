import { Button, Input, Modal } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { getField, setField } from '../../lib/localstorage';
import If from '../if';
import { LockFilled } from '@ant-design/icons';

interface TokenManagementProps {
  onSave?: (value: string) => void;
}
export default function TokenManagement({ onSave }: TokenManagementProps) {
  const [token, setToken] = useState('');
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value.trim();
    setToken(token);
  };

  const saveToken = () => {
    setField('github-personal-token', token);
    onSave && onSave(token);
    hideModal();
  };

  const cancel = () => {
    setToken(getField('github-personal-token') || '');
    hideModal();
  };

  useEffect(() => {
    setToken(getField('github-personal-token') || '');
  }, []);

  return (
    <>
      <Button icon={<LockFilled />} onClick={showModal}>
        Authenticate
      </Button>
      <If condition={show}>
        <Modal
          cancelText="Discard"
          okText="Save"
          onCancel={cancel}
          onOk={saveToken}
          open={true}
          title="Authentication"
        >
          <Input.Password onChange={onChange} placeholder="Github Personal Token" value={token} />
        </Modal>
      </If>
    </>
  );
}
