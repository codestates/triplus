import React, { useState } from 'react';
import { Container } from '../styles/common/index';
import styled from 'styled-components';
import SignupTemplete from '../components/signup/SignupTemplete';
import SignupModal from '../components/signup/SignupModal';
import ConfirmModal from '../components/signup/ConfirmModal';
import { useNavigate } from 'react-router';

const PageContainer = styled(Container)`
  max-width: ${({ theme }) => theme.size.maxWidth};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default function SignupPage() {
  const [isconfirmModalOpen, setisConfirmModalOpen] = useState(false);
  const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <SignupTemplete
          isOpenConfirmModal={() => {
            setisConfirmModalOpen(true);
          }}
          onCancelButtonClick={() => setIsCancelConfirmModalOpen(true)}
        />
      </PageContainer>
      {isconfirmModalOpen && (
        <ConfirmModal
          onConfirmButtonClick={() => {
            setisConfirmModalOpen(false);
            navigate('/login');
          }}
        />
      )}
      {isCancelConfirmModalOpen && (
        <SignupModal
          onOkclick={() => {
            setIsCancelConfirmModalOpen(false);
            navigate('/login');
          }}
          onCancelClick={() => setIsCancelConfirmModalOpen(false)}
        />
      )}
    </>
  );
}
