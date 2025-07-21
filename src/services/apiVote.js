const API_URL_RECIPES = "http://localhost:3001/recipes";
const API_URL_USERS = "http://localhost:3001/users";

export async function updateUserVoteAndPopularity({
  recipeId,
  voteType,
  user,
}) {
  const userRes = await fetch(`${API_URL_USERS}/${user.id}`);
  const userData = await userRes.json();

  const prevVote = userData.votedRecipes.find((v) => v.recipeId === recipeId);
  if (prevVote) throw new Error("Already voted");

  const popularityChange = voteType === "like" ? 1 : -1;
  const updatedVotes = [...userData.votedRecipes, { recipeId, voteType }];

  const recipeRes = await fetch(`${API_URL_RECIPES}/${recipeId}`);
  const recipe = await recipeRes.json();

  await fetch(`${API_URL_RECIPES}/${recipeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      popularity: recipe.popularity + popularityChange,
    }),
  });

  await fetch(`${API_URL_USERS}/${user.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      votedRecipes: updatedVotes,
      hasVoted: updatedVotes.length > 0,
    }),
  });

  return true;
}
