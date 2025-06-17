import styled from "styled-components";

const ButtonText = styled.button`
  color: var(--color-primary-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: 5px;

  &:hover,
  &:active {
    color: var(--color-primary-700);
  }
`;

export default ButtonText;
