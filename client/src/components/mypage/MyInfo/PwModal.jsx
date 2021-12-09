/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { putPassword } from '../../../network/my/http';
import { ModalTitle } from '../../../styles/common/modal';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';
import PwInput from './PwInput';

const BtnSelect = styled(SelectBtn)`
  color: #fff;
  background: ${({ theme }) => theme.color.red};
  border: 1px solid ${({ theme }) => theme.color.red};

  &:hover {
    background: none;
    border: 1px solid ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.red};
  }
`;
export default function PwModal({ closeModal }) {
  const [currentPw, currentChange] = useInput('');
  const [newPw, newChange] = useInput('');
  const [checkPw, checkChange] = useInput('');
  const [alertMsg, setAlertMsg] = useState(null);

  const submitPw = () => {
    if (!currentPw || !newPw || !checkPw) {
      setAlertMsg('*모든 입력창을 기입해 주세요');
    } else if (newPw !== checkPw) {
      setAlertMsg('*새로운 비밀번호와 일치하지 않습니다');
    } else {
      setAlertMsg(null);
      //TODO 새로운 비밀번호 갱신
      putPassword({ oldPassword: currentPw, password: newPw }).then((res) => {
        console.log(res);
      });
    }
  };

  const sameCheckPw = () => {
    if (newPw !== checkPw) {
      setAlertMsg('*새로운 비밀번호와 일치하지 않습니다');
    } else {
      setAlertMsg(null);
    }
  };

  return (
    <Modal width='auto'>
      <ModalTitle fontSize='1.1rem'>비밀번호 변경</ModalTitle>
      <PwInput subTitle='현재 비밀번호' pwNum={currentPw} onChange={currentChange} />
      <PwInput subTitle='새 비밀번호' pwNum={newPw} onChange={newChange} />
      <PwInput
        subTitle='비밀번호 확인'
        pwNum={checkPw}
        onChange={checkChange}
        alertMsg={alertMsg}
        onBlur={sameCheckPw}
      />
      <BtnWrapper>
        <BtnSelect onClick={submitPw}>수정</BtnSelect>
        <SelectBtn onClick={closeModal}>취소</SelectBtn>
      </BtnWrapper>
    </Modal>
  );
}