import { subDays, addDays, set } from "date-fns";

function withRelativeDate(template, offsetDays, atHour = 10) {
  const date = subDays(new Date(), offsetDays);
  // bump to a fixed hour if you want
  return {
    ...template,
    sharedAt: set(date, {
      hours: atHour,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
  };
}

// a bare‐bones list of _templates_ (without id’s or sharedAt):
const TEMPLATES = [
  {
    recipeId: "12",
    sharedBy: "…",
    sharedWith: "john@example.com",
    relation: "friend",
    message: "Hey, try this!",
  },
  {
    recipeId: "14",
    sharedBy: "…",
    sharedWith: "jane@example.com",
    relation: "coworker",
    message: "Lunch idea",
  },
  // …etc
];

export function generateSharedRecipes() {
  return TEMPLATES.map((t, i) =>
    // send each with a fake id, and date offset by “i” days ago
    withRelativeDate({ ...t, id: `${1000 + i}` }, i % 7)
  );
}
