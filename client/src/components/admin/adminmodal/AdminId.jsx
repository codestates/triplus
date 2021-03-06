import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../../styles/login/LoginInput';

export default function AdminId(props) {
  const { adminId, handleIdChange } = props;
  return (
    <InputBlock>
      <LoginLabel htmlFor='adminId'>ID</LoginLabel>
      <LoginInput id='adminId' placeholder='아이디' onChange={handleIdChange} value={adminId} />
    </InputBlock>
  );
}
