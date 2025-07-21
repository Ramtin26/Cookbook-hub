import { useNavigate } from "react-router-dom";
import { FaBowlFood, FaHeart } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { MdMenuBook, MdOutlineRestaurantMenu } from "react-icons/md";
import { format } from "date-fns";

import { useUser } from "../authentication/useUser";
import ButtonText from "../../ui/ButtonText";
import DataItem from "../../ui/DataItem";
import styled from "styled-components";

const StyledRecipeDataBox = styled.section`
  /* Box */
  background-color: var(--color-yellow-0);
  border: 1px solid var(--color-yellow-100);
  border-radius: 7px;

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-primary-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono San-serif";
    font-size: 2rem;
    margin-left: 7px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Ingredients = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-yellow-500);
`;

const Instructions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-yellow-500);

  p span {
    font-weight: 900;
    color: var(--color-yellow-700);
  }
`;

const PrepTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.3rem 3rem;
  gap: 1.2rem;
  border-radius: 5px;
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isLong ? "var(--color-beige-100)" : "var(--color-cream-100)"};
  color: ${(props) =>
    props.isLong ? "var(--color-beige-700)" : "var(--color-cream-700)"};

  & p:last-child {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1.4rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const LikeRecipe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.4rem;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-yellow-600);
  text-align: right;
`;

const VotedMessage = styled.p`
  text-align: center;
  margin-top: 2.4rem;
`;

function RecipeDataBox({ recipe }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    id: recipeId,
    name: recipeName,
    ingredients,
    instructions,
    prepTime,
    createdAt,
  } = recipe;

  const instructionLabels = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
  ];
  const steps = instructions.split(",").map((step) => step.trim());

  const isLong = prepTime >= 20;

  const hasAlreadyVoted = user.votedRecipes?.some(
    (v) => v.recipeId === recipeId
  );

  return (
    <StyledRecipeDataBox>
      <Header>
        <div>
          <FaBowlFood />
          <p>
            Recipe of <span>{recipeName}</span>
          </p>
        </div>
      </Header>

      <Section>
        <Ingredients>
          <DataItem icon={<MdOutlineRestaurantMenu />} label="Ingredients:">
            {ingredients.join(", ")}
          </DataItem>
        </Ingredients>

        <Instructions>
          <DataItem icon={<MdMenuBook />} label="Instructions:">
            {instructions.includes(",")
              ? steps.map((step, i) => (
                  <p key={i}>
                    <span>{instructionLabels[i] || `Step ${i + 1}`},</span>{" "}
                    {step}
                  </p>
                ))
              : instructions}
          </DataItem>
        </Instructions>

        <PrepTime isLong={isLong}>
          <DataItem icon={<GiDuration />} label="Preparation Duration:">
            {prepTime} min
          </DataItem>
          <p>{isLong ? "Long" : "Short"}</p>
        </PrepTime>

        {!hasAlreadyVoted ? (
          <LikeRecipe>
            <DataItem icon={<FaHeart />} label="Did you like this recipe?">
              <ButtonText
                onClick={() => navigate(`/vote?recipeId=${recipeId}`)}
              >
                Go vote now!
              </ButtonText>
            </DataItem>
          </LikeRecipe>
        ) : (
          <VotedMessage>You already voted this recipe!</VotedMessage>
        )}
      </Section>

      <Footer>
        <p>Created at {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledRecipeDataBox>
  );
}

export default RecipeDataBox;
