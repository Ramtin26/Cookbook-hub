import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useVoteRecipe } from "./useVoteRecipe";

import { useUser } from "../authentication/useUser";
import { useRecipe } from "../recipes/useRecipe";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledVoteRecipes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.6fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  background-color: var(--color-yellow-100);
  padding: 1.5rem;

  max-width: 80rem;
  margin: 3rem auto;
  border-radius: 1.2rem;
  box-shadow: var(--shadow-box-lg);
`;

const Img = styled.img`
  display: block;
  width: 25rem;
  border-radius: 3px;
  grid-column: 1;
  grid-row: 1 / span 2;
`;

const RecipeName = styled.span`
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
  align-self: center;
  text-align: center;
  grid-column: 2;
  grid-row: 1;
`;

const Diet = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
  width: fit-content;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  align-self: center;
  justify-self: start;
  grid-column: 3;
  grid-row: 1;

  background-color: ${(props) =>
    props.isVegetarian === "vegetarian"
      ? "var(--color-herbal-100)"
      : "var(--color-meaty-100)"};

  color: ${(props) =>
    props.isVegetarian === "vegetarian"
      ? "var(--color-herbal-700)"
      : "var(--color-meaty-700)"};
`;

const VoteRecipe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  grid-column: 2 / span 2;
  grid-row: 2;
`;

const VoteButtonList = styled.ul`
  display: flex;
  gap: 0.5rem;

  & li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  & span {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const VoteMessage = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

function VoteRecipes() {
  const [userVoteType, setUserVoteType] = useState(null);
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("recipeId");

  const { recipe, isLoading } = useRecipe(recipeId);
  const navigate = useNavigate();

  const { user } = useUser();
  const { vote, isPending } = useVoteRecipe();

  useEffect(
    function () {
      if (user?.votedRecipes) {
        const existingVote = user.votedRecipes.find(
          (v) => v.recipeId === recipeId
        );
        if (existingVote) {
          setUserVoteType(existingVote.voteType);
        }
      }
    },
    [user, recipeId]
  );

  if (isLoading) return <Spinner />;
  if (!user || !recipe) return null;

  const { name, diet, popularity, image } = recipe;

  const handleVote = (voteType) => {
    if (isPending) return;

    setUserVoteType(voteType); // Optimistic update

    vote({ recipeId, voteType, user });
  };

  return (
    <StyledVoteRecipes>
      <Img src={image} alt={`image of ${name}`} />
      <RecipeName>{name}</RecipeName>
      <Diet isVegetarian={diet}>{diet}</Diet>
      <VoteRecipe>
        {userVoteType ? (
          <VoteMessage>
            You {userVoteType === "like" ? "liked" : "disliked"} this recipe!
          </VoteMessage>
        ) : (
          <VoteButtonList>
            <li>
              <span>Like</span>
              <ButtonIcon
                onClick={() => handleVote("like")}
                disabled={isPending}
              >
                <BiSolidLike />
              </ButtonIcon>
            </li>
            <li>
              <ButtonIcon
                onClick={() => handleVote("dislike")}
                disabled={isPending}
              >
                <BiSolidDislike />
              </ButtonIcon>
              <span>Dislike</span>
            </li>
          </VoteButtonList>
        )}

        <span>Popularity ({popularity})</span>

        <Button variation="secondary" onClick={() => navigate("/recipes")}>
          Back
        </Button>
      </VoteRecipe>
    </StyledVoteRecipes>
  );
}

export default VoteRecipes;
