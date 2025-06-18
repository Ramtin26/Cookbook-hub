import RecipeRow from "./RecipeRow";
import { useRecipes } from "./useRecipes";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function RecipeTable() {
  const { isLoading, recipes, count } = useRecipes();

  if (isLoading) return <Spinner />;
  if (!recipes.length) return <Empty resourceName="recipes" />;

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1fr 1.3fr 0.7fr 0.7fr 1fr 0.7fr">
        <Table.Header>
          <div></div>
          <div>Food</div>
          <div>Ingredient</div>
          <div>Instruction</div>
          <div>Diet</div>
          <div>Prep-Time</div>
          <div>Popularity</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={recipes}
          render={(recipe) => <RecipeRow recipe={recipe} key={recipe.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RecipeTable;
