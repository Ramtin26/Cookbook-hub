// import { useSharedRecipes } from "./useSharedRecipes";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  // const { sharedRecipes, isLoading } = useSharedRecipes();

  // const { recipeId, shareBy, sharedWith, relation, sharedAt } = sharedRecipes;

  // if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      {/* <Stats sharedRecipes={sharedRecipes} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
