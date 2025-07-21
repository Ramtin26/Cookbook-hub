import {
  eachDayOfInterval,
  endOfDay,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardBox from "./DashboardBox";
import { useRecipeByIds } from "../recipes/useRecipeByIds";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const StyledShareVoteChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-yellow-300);
  }
`;

function RecipeEngagementChart({ sharedRecipes, allUsers, numDays }) {
  const { isDarkMode } = useDarkMode();

  const recipesShared = sharedRecipes?.map((shared) => shared.recipeId);
  const { recipesById } = useRecipeByIds(recipesShared);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const startDate = startOfDay(subDays(new Date(), numDays - 1));
  const endDate = endOfDay(new Date());

  const filteredSharedRecipes = sharedRecipes?.filter((shared) => {
    const sharedDate = new Date(shared.sharedAt);
    return sharedDate >= startDate && sharedDate <= endDate;
  });

  const sharesByRecipe = {};
  for (const shared of filteredSharedRecipes) {
    const id = shared.recipeId;
    sharesByRecipe[id] = (sharesByRecipe[id] || 0) + 1;
  }

  const data = Object.entries(sharesByRecipe).map(([id, totalShares]) => {
    const recipe = recipesById?.find((r) => r.id === id);

    const totalLikes = allUsers?.reduce((acc, user) => {
      return (
        acc +
        (user.votedRecipes?.some(
          (vote) => vote.recipeId === id && vote.voteType === "like"
        )
          ? 1
          : 0)
      );
    }, 0);

    const totalDislikes = allUsers?.reduce((acc, user) => {
      return (
        acc +
        (user.votedRecipes?.some(
          (vote) => vote.recipeId === id && vote.voteType === "dislike"
        )
          ? 1
          : 0)
      );
    }, 0);

    return {
      name: recipe?.name || "Unknown Recipe",
      totalShares,
      totalLikes,
      totalDislikes,
    };
  });

  const colors = isDarkMode
    ? {
        totalShares: { stroke: "#4f46e5", fill: "#4f46e5" },
        totalLikes: { stroke: "#34d399", fill: "#065f46" },
        totalDislikes: { stroke: "#fb923c", fill: "#7c2d12" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalShares: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalLikes: { stroke: "#10b981", fill: "#d1fae5" },
        totalDislikes: { stroke: "#f97316", fill: "#ffedd5" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledShareVoteChart>
      <Heading as="h2">
        Number of shared and voted recipes from{" "}
        {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="name"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalShares"
            type="monotone"
            stroke={colors.totalShares.stroke}
            fill={colors.totalShares.fill}
            strokeWidth={2}
            name="Total shares"
          />
          <Area
            dataKey="totalLikes"
            type="monotone"
            stroke={colors.totalLikes.stroke}
            fill={colors.totalLikes.fill}
            strokeWidth={2}
            name="Total likes"
          />
          <Area
            dataKey="totalDislikes"
            type="monotone"
            stroke={colors.totalDislikes.stroke}
            fill={colors.totalDislikes.fill}
            strokeWidth={2}
            name="Total dislikes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledShareVoteChart>
  );
}

export default RecipeEngagementChart;
