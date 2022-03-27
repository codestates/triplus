import React from 'react';
import Modal from '../common/Modal';

export default function SignupModal({ onOkClick, onCancelClick }) {
  return <Modal content={'정말 취소하시겠습니까?'} yesClick={onOkClick} noClick={onCancelClick} />;
}
