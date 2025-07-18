
import { useState } from 'react';
import { Search, Filter, ChefHat, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RecipeCard from '@/components/RecipeCard';

const Index = () => {
  const navigate = useNavigate();
  const {
    recipes,
    totalRecipes,
    filteredCount,
    currentPage,
    totalPages,
    searchQuery,
    selectedCategory,
    sortBy,
    user,
    setCurrentPage,
    setSearch,
    setCategory,
    setSortBy,
    toggleFavorite,
    getRandomRecipe
  } = useRecipeStore();

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 
    'Drinks', 'Salads', 'Soups', 'Vegan', 'Kids', 'Quick Meals'
  ];

  const handleCategoryClick = (category: string) => {
    setIsLoading(true);
    setCategory(category);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearch(query);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleSurpriseMe = () => {
    const randomRecipe = getRandomRecipe();
    if (randomRecipe) {
      navigate(`/recipe/${randomRecipe.id}`);
    }
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-card rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search recipes, ingredients, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 text-base border-0 bg-accent/50 focus:bg-accent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="time">Cook Time</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSurpriseMe}
                className="bg-mint-500 hover:bg-mint-600 h-12 px-6"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Surprise Me!
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
              className={`rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-peach-500 hover:bg-peach-600 text-white shadow-lg scale-105'
                  : 'hover:bg-peach-50 hover:border-peach-300 hover:text-peach-700'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Recipe Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-card rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              <span>📊 Displaying {filteredCount} Unique Recipes</span>
            </div>
            <div className="hidden sm:block">•</div>
            <span className="hidden sm:inline">Total: {totalRecipes} recipes</span>
          </div>
          <div className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full">
            ✅ Duplicates Removed
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-accent/50"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-accent/50 rounded w-3/4"></div>
                  <div className="h-3 bg-accent/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recipes Grid */}
        {!isLoading && (
          <>
            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    cookTime={recipe.cookTime}
                    servings={recipe.servings}
                    rating={recipe.rating}
                    category={recipe.category}
                    isFavorited={user.favoriteRecipes.includes(recipe.id)}
                    onFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => {
                  setSearch('');
                  setCategory('All');
                }} className="bg-peach-500 hover:bg-peach-600">
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="hover:bg-peach-50"
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                if (pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 ${
                      currentPage === pageNum 
                        ? 'bg-peach-500 hover:bg-peach-600' 
                        : 'hover:bg-peach-50'
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="hover:bg-peach-50"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
