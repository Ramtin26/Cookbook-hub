import ShareRecipeForm from "../features/share-recipe/ShareRecipeForm";
import Heading from "../ui/Heading";

function ShareRecipes() {
  return (
    <>
      <Heading as="h4">Share recipes with your friends!</Heading>
      <ShareRecipeForm />
    </>
  );
}

export default ShareRecipes;
