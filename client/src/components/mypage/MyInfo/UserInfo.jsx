import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { postInfo } from '../../../network/my/http';
import EmailModal from './EmailModal';
import { nickValidation } from '../../../utils/validation';
import { useError } from '../../../hooks/useError';
import { ColorBtn } from '../../../styles/common';

export const LiWrapper = styled.li`
  flex-grow: 1;
  flex-basis: ${({ user }) => user && '50%'};

  & .title {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 1.2em;
    & .title {
      font-size: 0.92rem;
    }
  }
`;

const NameWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const ChangeInput = styled.input.attrs({ type: 'text' })`
  width: ${({ user }) => (user ? '60%' : '70%')};
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
    width: ${({ user }) => (user ? '60%' : '70%')};
  }
`;

const DivInput = styled.div`
  word-break: break-word;
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
  flex-shrink: 0;
  margin-left: 0.5rem;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.color.gray};
      border: 1px solid ${({ theme }) => theme.color.gray};
      &:hover {
        cursor: not-allowed;
        color: #fff;
        background: ${({ theme }) => theme.color.gray};
        border: 1px solid ${({ theme }) => theme.color.gray};
      }
    `}

  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: ${({ twoBtn }) => twoBtn && '0.5rem'};
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.red};
  top: 2.1rem;
  left: 0;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.73rem;
    top: 1.9rem;
  }
`;

export const UserInfo = ({ title, content, marginRight, noBtn, user, social }) => {
  const [inputValue, inputChange, setInputValue] = useInput(content);
  const [fixValue, setFixValue] = useState(content);
  const [isChange, setIsChange] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clickBtn, setClickBtn] = useState(false);
  const [isAlert, setIsAlert] = useState(null);

  const inputRef = useRef();
  const [isError] = useError();

  useEffect(() => {
    if (isChange) {
      inputRef.current.focus();
    }
  }, [isChange, clickBtn]);

  //* ????????? ?????? ?????? POST ?????? ??????
  const changeContent = (e) => {
    if (isChange) {
      setClickBtn(true);
      // if (title === 'e-mail' && !inputValue.length) return setIsAlert('*?????? ?????? ??????');
      if (title === 'nickname' && !nickValidation(inputValue))
        return setIsAlert('*3~8????????? ??????, ??????, ????????? ???????????????.');

      // TODO POST /???????????? ??????
      postInfo(inputValue.trim(), title).then((res) => {
        if (res === 401) return isError();
        else if (res === 204) {
          setClickBtn(false);
          return setIsAlert(`*?????? ???????????? ${title === 'nickname' ? '?????????' : title}?????????.`);
        } else if (res === 201) {
          setFixValue(inputValue.trim());
          setInputValue(inputValue.trim());
        } else {
          setInputValue(fixValue);
          alert('????????? ??????????????????. ?????? ????????? ?????????.');
        }
        setIsAlert(null);
        setClickBtn(false);
        setIsChange(false);
      });
    } else {
      setIsChange(true);
    }
  };

  const inputBlur = () => {
    if (!clickBtn) {
      setIsAlert(null);
      setInputValue(fixValue);
      setIsChange(false);
    }
  };

  return (
    <LiWrapper marginRight={marginRight} user={user}>
      <div className='title'>{`${title}`}</div>
      <NameWrapper>
        {isChange ? (
          <ChangeInput
            ref={inputRef}
            user={user}
            value={inputValue}
            onChange={inputChange}
            maxLength={user && '8'}
            placeholder={title}
            onBlur={inputBlur}
          />
        ) : (
          <DivInput>{fixValue}</DivInput>
        )}
        {noBtn || (
          <BtnColor
            palette='blue'
            onMouseDown={title === 'e-mail' ? () => setOpenModal(true) : changeContent}
            disabled={social}
            title={social && '???????????? ????????? ??? ????????????'}
          >
            {isChange ? '??????' : '??????'}
          </BtnColor>
        )}
        {isAlert && <AlertMsg>{isAlert}</AlertMsg>}
      </NameWrapper>
      {openModal && (
        <EmailModal
          clickModal={() => setOpenModal(false)}
          emailFixValue={(email) => setFixValue(email)}
        />
      )}
    </LiWrapper>
  );
};
