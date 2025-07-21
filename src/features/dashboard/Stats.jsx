import { HiMiniChartPie } from "react-icons/hi2";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FaCrown, FaChartBar } from "react-icons/fa";

import Stat from "./Stat";
import { useUser } from "../authentication/useUser";
import { useRecipeByIds } from "../recipes/useRecipeByIds";
import { useAllRecipes } from "../share-recipe/useAllRecipes";

function Stats({ sharedRecipes }) {
  const { allRecipes } = useAllRecipes();
  const { user } = useUser();
  const userId = user?.id;

  // 1.
  const totalShares = sharedRecipes.length;

  // 2.
  const sharedByCurrentUser = sharedRecipes.filter(
    (recipe) => recipe.sharedBy === userId
  );

  const uniqueRecipients = sharedByCurrentUser
    .reduce((arr, recipe) => {
      if (!arr.map((el) => el.sharedWith).includes(recipe.sharedWith))
        return [...arr, { sharedWith: recipe.sharedWith }];
      else return arr;
    }, [])
    .map((s) => s.sharedWith).length;

  // 3.
  const topShared = sharedRecipes.reduce(
    (acc, item) => {
      const key = item.recipeId;
      acc.counts[key] = (acc.counts[key] || 0) + 1;

      if (acc.counts[key] > acc.maxCount) {
        acc.maxCount = acc.counts[key];
        acc.maxRecipeIds = [key];
      } else if (acc.maxCount === acc.counts[key]) {
        acc.maxRecipeIds.push(key);
      }

      return acc;
    },
    { counts: {}, maxCount: 0, maxRecipeIds: [] }
  );

  const { recipesById } = useRecipeByIds(topShared.maxRecipeIds);
  const recipeNames = recipesById?.map((r) => r.name).join(" - ");

  // 4.
  const totalRecipes = allRecipes?.length || 0;

  const uniqueSharedRecipeIds = new Set(sharedRecipes.map((r) => r.recipeId));
  const numSharedRecipes = uniqueSharedRecipeIds.size;

  const engagementRate = totalRecipes > 0 ? numSharedRecipes / totalRecipes : 0;

  return (
    <>
      <Stat
        title="Total Shared Recipes"
        color="cream"
        icon={<HiMiniChartPie />}
        value={totalShares}
      />
      <Stat
        title="Unique Recipients"
        color="herbal"
        icon={<RiUserReceived2Fill />}
        value={uniqueRecipients}
      />
      <Stat
        title="Top Shared Recipes"
        color="indigoish"
        icon={<FaCrown />}
        value={recipeNames}
      />
      <Stat
        title="Recipe Reach Rate"
        color="yellow"
        icon={<FaChartBar />}
        value={`${Math.round(engagementRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
