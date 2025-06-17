import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: 5px;
  transition: all 0.2s;

  &:not(:disabled):hover {
    background-color: var(--color-yellow-50);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-primary-600);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;

    & svg {
      color: var(--color-yellow-400);
    }
  }
`;

export default ButtonIcon;
