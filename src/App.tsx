
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExploreRecipes from "./pages/ExploreRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import CookingMode from "./pages/CookingMode";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import ShoppingList from "./pages/ShoppingList";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<ExploreRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/cooking/:id" element={<CookingMode />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
