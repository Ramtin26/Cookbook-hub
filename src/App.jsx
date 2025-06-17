import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context/DarkModeContext";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Account";
import ProtectedRoute from "./ui/ProtectedRoute";
import Vote from "./pages/Vote";
import ShareRecipes from "./pages/ShareRecipes";
import Recipe from "./pages/Recipe";

// ✨ Project: "CookbookHub" – Social Recipe App
// Stack: React + React Query + JSON server (backend) + React Router (v6+) + React Hook Form  + styled components

/* Features:

  --Browse, search, and filter recipes
  --Like/favorite recipes
  --Add your own recipe (form + validation)
  --View recipe details (ingredients, steps)
  // --User profiles with saved recipes
  --Infinite scrolling or pagination
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:recipeId" element={<Recipe />} />
              <Route path="account" element={<Account />} />
              <Route path="users" element={<Users />} />
              <Route path="vote" element={<Vote />} />
              <Route path="share-recipe" element={<ShareRecipes />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-yellow-0)",
              color: "var(--color-yellow-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
