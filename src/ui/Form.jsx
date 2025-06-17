import styled, { css } from "styled-components";

const Form = styled.form`
  ${({ type = "regular" }) =>
    type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-yellow-0);
      border: 1px solid var(--color-border);
      border-radius: 7px;
    `}

  ${({ type = "regular" }) =>
    type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
