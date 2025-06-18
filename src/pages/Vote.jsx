import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useRecipe } from "../features/recipes/useRecipe";
import VoteRecipes from "../features/voting/VoteRecipes";
import Heading from "../ui/Heading";

function Vote() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const recipeId = searchParams.get("recipeId");
  const hasRedirected = useRef(false);

  const { recipe, isLoading } = useRecipe(recipeId);

  useEffect(() => {
    // 1. If there's no recipeId at all
    if (!recipeId && !hasRedirected.current) {
      toast.error("Please choose a recipe to vote on first.");
      hasRedirected.current = true;
      navigate("/recipes");
    }

    // 2. If recipeId exists but the recipe doesn't
    if (recipeId && !isLoading && !recipe && !hasRedirected.current) {
      toast.error("That recipe doesn't exist.");
      hasRedirected.current = true;
      navigate("/recipes");
    }
  }, [recipeId, isLoading, recipe, navigate]);

  return (
    <>
      <Heading as="h4">Vote for your favorite recipes here!</Heading>
      <VoteRecipes />
    </>
  );
}

export default Vote;
