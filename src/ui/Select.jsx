import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.9rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-yellow-100)"
        : "var(--color-yellow-300)"};
  border-radius: 5px;
  background-color: var(--color-yellow-0);
  font-weight: 500;
  box-shadow: var(--shadow-box-sm);
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
