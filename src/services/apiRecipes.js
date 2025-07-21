import { PAGE_SIZE } from "../utils/constants";
import { wait } from "../utils/helpers";

const API_URL_RECIPES = "http://localhost:3001/recipes";

export async function getRecipes({
  filter = "all",
  sortBy = "createdAt-asc",
  page = 1,
}) {
  // adding delay
  await wait(500);
  const res = await fetch(API_URL_RECIPES);

  if (!res.ok) throw new Error("Recipes could not be loaded");

  const data = await res.json();

  // Filtering
  let filtered =
    filter === "all" ? data : data.filter((r) => r.diet === filter);

  // Sorting
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  filtered = filtered.sort((a, b) => {
    if (field === "name") return a.name.localeCompare(b.name) * modifier;
    if (field === "createdAt")
      return (new Date(a.createdAt) - new Date(b.createdAt)) * modifier;
    return (a[field] - b[field]) * modifier;
  });

  // Pagination
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return { recipes: paginated, count: filtered.length };
}

export async function getAllRecipes() {
  const res = await fetch(API_URL_RECIPES);

  if (!res.ok) throw new Error("Could not fetch all recipes");

  return await res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${API_URL_RECIPES}/${id}`);

  if (!res.ok) throw new Error("Recipe not found");

  return await res.json();
}

export async function getRecipesbyIds(ids) {
  const res = await fetch(API_URL_RECIPES);

  if (!res.ok) throw new Error("Recipes not found");

  const data = await res.json();

  return data.filter((recipe) => ids.includes(String(recipe.id)));
}

export async function createEditRecipe(newRecipe, id) {
  await wait(700);

  const options = {
    method: id ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  };

  const url = id ? `${API_URL_RECIPES}/${id}` : API_URL_RECIPES;

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(id ? "Failed to edit recipe" : "Failed to create recipe");
  }

  return await res.json();
}

export async function deleteRecipe(id) {
  await wait(500);
  const res = await fetch(`${API_URL_RECIPES}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Recipe could not be deleted");

  return true;
}
