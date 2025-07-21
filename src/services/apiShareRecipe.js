import { getToday } from "../utils/helpers";

const API_URL_SHARE_RECIPES = "http://localhost:3001/shared-recipes";

export async function getSharedRecipesAfterDate(date) {
  const start = date;
  const end = getToday({ end: true });

  const res = await fetch(API_URL_SHARE_RECIPES);
  if (!res.ok) throw new Error("Shared recipes couldn't loaded");

  const data = await res.json();

  const filteredShared = data.filter((item) => {
    const sharedAt = new Date(item.sharedAt);
    return sharedAt >= start && sharedAt <= end;
  });

  return filteredShared;
}

export async function shareRecipes(shareData) {
  const res = await fetch(API_URL_SHARE_RECIPES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shareData),
  });

  if (!res.ok) throw new Error("Failed to share recipe");

  return await res.json();
}

export async function checkAlreadyShared({
  senderId,
  recipientEmail,
  recipeId,
}) {
  const res = await fetch(
    `${API_URL_SHARE_RECIPES}?sharedBy=${senderId}&sharedWith=${recipientEmail}&recipeId=${recipeId}`
  );

  if (!res.ok) throw new Error("Failed to check existing share");

  const data = await res.json();

  return data.length > 0;
}

export async function getSharedRecipesFor(email) {
  const res = await fetch(`${API_URL_SHARE_RECIPES}?sharedWith=${email}`);

  if (!res.ok) throw new Error("Failed to fetch shared recipes");

  return await res.json();
}

export async function getPrevRelation({ senderId, recipientEmail }) {
  const res = await fetch(
    `${API_URL_SHARE_RECIPES}?sharedBy=${senderId}&sharedWith=${recipientEmail}`
  );

  const data = await res.json();

  return data?.[0]?.relation || null;
}

export async function getRecipesTodayShared() {
  const start = getToday();
  const end = getToday({ end: true });

  const res = await fetch(API_URL_SHARE_RECIPES);
  if (!res.ok) throw new Error("Shared recipes could not get loaded");

  const data = await res.json();

  const todayShared = data.filter((item) => {
    const sharedAt = new Date(item.sharedAt);
    return sharedAt >= start && sharedAt <= end;
  });

  return todayShared;
}
