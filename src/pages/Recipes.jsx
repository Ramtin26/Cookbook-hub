import AddRecipe from "../features/recipes/AddRecipe";
import RecipeTable from "../features/recipes/RecipeTable";
import RecipeTableOperation from "../features/recipes/RecipeTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Recipes() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Recipes</Heading>
        <RecipeTableOperation />
      </Row>

      <Row>
        <RecipeTable />
        <AddRecipe />
      </Row>
    </>
  );
}

export default Recipes;
