import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-yellow-0);
  border: 1px solid var(--color-yellow-100);
  border-radius: 5px;

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    relation: "friend",
    value: 0,
    color: "#2ee2d9",
  },
  {
    relation: "coworker",
    value: 0,
    color: "#3953e8",
  },
  {
    relation: "family",
    value: 0,
    color: "#e2b52c",
  },
];

const startDataDark = [
  {
    relation: "friend",
    value: 0,
    color: "#27a29c",
  },
  {
    relation: "coworker",
    value: 0,
    color: "#263aa7",
  },
  {
    relation: "family",
    value: 0,
    color: "#a48321",
  },
];

function prepareData(startData, shared) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.relation === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = shared
    .reduce((arr, cur) => {
      const rel = cur.relation;
      if (rel === "friend") return incArrayValue(arr, "friend");
      if (rel === "coworker") return incArrayValue(arr, "coworker");
      if (rel === "family") return incArrayValue(arr, "family");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function RelationshipChart({ sharedRecipes }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, sharedRecipes);

  return (
    <ChartBox>
      <Heading as="h2">Relationship summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="relation"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.relation}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default RelationshipChart;
