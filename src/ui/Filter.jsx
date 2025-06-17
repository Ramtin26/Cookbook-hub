import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-border);
  background-color: var(--color-yellow-0);
  box-shadow: var(--shadow-box-sm);
  border-radius: 5px;
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-yellow-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-primary-600);
      color: var(--color-primary-100);
    `}

  border-radius: 5px;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-600);
    color: var(--color-primary-100);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    // This block will be for pagination later
    if (searchParams.get("page")) searchParams.set("page", 1) || 1;

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
