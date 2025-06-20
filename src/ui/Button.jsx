import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);

    &:hover {
      background-color: var(--color-primary-700);
    }
  `,
  secondary: css`
    color: var(--color-yellow-600);
    background: var(--color-yellow-0);
    border: 1px solid var(--color-yellow-200);

    &:hover {
      background-color: var(--color-yellow-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: var(--shadow-box-sm);

  ${({ size = "medium" }) => sizes[size]}
  ${({ variation = "primary" }) => variations[variation]}
`;

export default Button;
