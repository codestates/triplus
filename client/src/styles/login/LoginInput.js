import styled from 'styled-components';

export const InputBlock = styled.div`
  max-width: 100%;
  height: 11vh;
  display: flex;
  flex-direction: column;
`;

export const LoginLabel = styled.label`
  margin-top: 1.5rem;
`;

export const LoginInput = styled.input`
  height: 5vh;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  outline: none;
  &::-webkit-input-placeholder {
    font-size: 1rem;
  }
`;