import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperation";

function RecipeTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="diet"
        options={[
          { value: "all", label: "All" },
          { value: "vegetarian", label: "Vegetarian" },
          { value: "not-vegetarian", label: "Not Vegetarian" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "prepTime-asc",
            label: "Sort by prep time (Shortest first)",
          },
          {
            value: "prepTime-desc",
            label: "Sort by prep time (Longest first)",
          },
          { value: "popularity-desc", label: "Sort by popularity" },
          { value: "createdAt-desc", label: "Newest first" },
          { value: "createdAt-asc", label: "Oldest first" },
        ]}
      />
    </TableOperations>
  );
}

export default RecipeTableOperation;
