import RecipeEngagementChart from "./RecipeEngagementChart";
import RelationshipChart from "./RelationshipChart";
import Stats from "./Stats";
import { useSharedRecipes } from "./useSharedRecipes";
import { useAllUsers } from "./useAllUsers";

import TodayShared from "../share-recipe/TodayShared";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { sharedRecipes, isLoading: isLoading1, numDays } = useSharedRecipes();
  const { allUsers, isLoading: isLoading2 } = useAllUsers();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats sharedRecipes={sharedRecipes} />
      <TodayShared />
      <RelationshipChart sharedRecipes={sharedRecipes} />
      <RecipeEngagementChart
        sharedRecipes={sharedRecipes}
        allUsers={allUsers}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
