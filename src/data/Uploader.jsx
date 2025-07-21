import { useState } from "react";
import Button from "../ui/Button";
import { generateSharedRecipes } from "../data/data-sharedRecipes";

export default function Uploader() {
  const [loading, setLoading] = useState(false);

  async function refreshSharedRecipes() {
    setLoading(true);
    // 1. fetch all to get their ids
    const existing = await fetch("http://localhost:3001/shared-recipes").then(
      (r) => r.json()
    );

    // 2. delete them one by one
    await Promise.all(
      existing.map((item) =>
        fetch(`http://localhost:3001/shared-recipes/${item.id}`, {
          method: "DELETE",
        })
      )
    );

    // 3. generate new ones
    const fresh = generateSharedRecipes();

    // 4. post each
    await Promise.all(
      fresh.map((item) =>
        fetch("http://localhost:3001/shared-recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })
      )
    );

    setLoading(false);
  }

  return (
    <div
      style={{ padding: "1rem", background: "#f9f9f9", textAlign: "center" }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={refreshSharedRecipes} disabled={loading}>
        {loading ? "Updating…" : "Upload Shared Recipes"}
      </Button>
    </div>
  );
}
