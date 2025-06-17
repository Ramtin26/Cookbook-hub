import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: 5px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 5px;
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-primary-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-primary-700);
    }
  }
`;

export default FileInput;
