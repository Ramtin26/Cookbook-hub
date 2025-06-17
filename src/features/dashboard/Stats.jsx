import { HiMiniChartPie } from "react-icons/hi2";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FaCrown, FaChartBar } from "react-icons/fa";
// import { useUser } from "../authentication/useUser";

function Stats({ sharedRecipes }) {
  // const { recipeId, shareBy, sharedWith, relation, sharedAt } = sharedRecipes;
  // const { user } = useUser();
  // const userId = user?.id;

  // 1.
  const numSharedRecipes = sharedRecipes.length;
  console.log(sharedRecipes);

  // 2.
  // const sharedByCurrentUser = sharedRecipes.filter(
  //   (recipe) => recipe.sharedBy === userId
  // );
  // console.log(sharedByCurrentUser);

  // const uniqueRecipients = sharedByCurrentUser.reduce((arr, recipe) => {
  //   if (!arr.map((el) => el.sharedWith).includes(recipe.sharedWith))
  //     return [...arr, { sharedWith: recipe.sharedWith }];
  //   else return arr;
  // }, []);
  // console.log(uniqueRecipients);

  // 3.
  // const topShared = sharedRecipes;

  return <div>HI</div>;
}

export default Stats;
