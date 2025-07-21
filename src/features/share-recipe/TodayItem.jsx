import { Link } from "react-router-dom";
import { useRecipe } from "../recipes/useRecipe";
import Button from "../../ui/Button";
import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;

  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-yellow-100);
`;

const Message = styled.p`
  font-size: 1.4rem;
  & strong:first-of-type {
    font-weight: 700;
    text-decoration: underline;
  }
  & strong:last-of-type {
    font-weight: 700;
    text-transform: uppercase;
  }
  em {
    font-style: italic;
    font-weight: 700;
  }
`;

function TodayItem({ shared, usersById }) {
  const { sharedBy, message, recipeId, relation } = shared;
  const { recipe } = useRecipe(recipeId);

  const userNames = usersById?.find((user) => user.id === sharedBy);

  return (
    <StyledTodayItem>
      <Message>
        Your <strong>{relation}</strong>,{" "}
        <strong>{userNames?.username},</strong> shared
        <em> {recipe?.name}</em>: {message}
      </Message>

      <Button
        variation="primary"
        size="small"
        as={Link}
        to={`/recipes/${recipeId}`}
      >
        Check out
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
