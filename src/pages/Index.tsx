
import { useState } from 'react';
import { Utensils, Coffee, Sun, Moon, Cookie, Wine, Salad, Soup, Leaf, Baby, Zap, Search, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { 
    recipes, 
    user, 
    currentPage,
    totalPages,
    searchQuery,
    selectedCategory,
    sortBy,
    totalRecipes,
    filteredCount,
    toggleFavorite,
    setCurrentPage,
    setSearch,
    setCategory,
    setSortBy,
    getRandomRecipe
  } = useRecipeStore();
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { icon: Coffee, title: 'Breakfast', count: Math.floor(totalRecipes * 0.15), gradient: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { icon: Sun, title: 'Lunch', count: Math.floor(totalRecipes * 0.18), gradient: 'bg-gradient-to-br from-yellow-400 to-amber-500' },
    { icon: Utensils, title: 'Dinner', count: Math.floor(totalRecipes * 0.22), gradient: 'bg-gradient-to-br from-peach-400 to-peach-600' },
    { icon: Cookie, title: 'Desserts', count: Math.floor(totalRecipes * 0.12), gradient: 'bg-gradient-to-br from-pink-400 to-rose-500' },
    { icon: Moon, title: 'Snacks', count: Math.floor(totalRecipes * 0.08), gradient: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
    { icon: Wine, title: 'Drinks', count: Math.floor(totalRecipes * 0.06), gradient: 'bg-gradient-to-br from-mint-400 to-emerald-500' },
    { icon: Salad, title: 'Salads', count: Math.floor(totalRecipes * 0.07), gradient: 'bg-gradient-to-br from-green-400 to-emerald-500' },
    { icon: Soup, title: 'Soups', count: Math.floor(totalRecipes * 0.05), gradient: 'bg-gradient-to-br from-orange-400 to-red-500' },
    { icon: Leaf, title: 'Vegan', count: Math.floor(totalRecipes * 0.04), gradient: 'bg-gradient-to-br from-green-500 to-teal-500' },
    { icon: Baby, title: 'Kids', count: Math.floor(totalRecipes * 0.03), gradient: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    { icon: Zap, title: 'Quick Meals', count: Math.floor(totalRecipes * 0.05), gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
  ];

  const categoryButtons = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks', 'Salads', 'Soups', 'Vegan', 'Kids', 'Quick Meals'];

  const handleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
  };

  const handleCategoryClick = (category: string) => {
    setIsLoading(true);
    setCategory(category);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearch(query);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleSurpriseMe = () => {
    const randomRecipe = getRandomRecipe();
    navigate(`/recipe/${randomRecipe.id}`);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    setTimeout(() => setIsLoading(false), 200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-gradient-to-b from-transparent to-cream-50/50">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by recipe name, ingredient, or tag..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white border-2 border-cream-200 focus:border-peach-300 rounded-full shadow-sm"
                />
              </div>
            </div>

            {/* Results Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {recipes.length} of {filteredCount.toLocaleString()} recipes
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleSurpriseMe}
                  className="border-peach-300 text-peach-600 hover:bg-peach-50 rounded-full"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Surprise Me!
                </Button>
                <Select value={sortBy} onValueChange={(value: 'rating' | 'time' | 'difficulty') => setSortBy(value)}>
                  <SelectTrigger className="w-40 rounded-full border-cream-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Best Rated</SelectItem>
                    <SelectItem value="time">Quickest</SelectItem>
                    <SelectItem value="difficulty">Easiest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categoryButtons.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategoryClick(category)}
                  className={`rounded-full px-6 py-2 transition-all ${
                    selectedCategory === category 
                      ? 'bg-peach-500 hover:bg-peach-600 text-white shadow-lg' 
                      : 'hover:bg-peach-50 hover:border-peach-300 border-2'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-b from-cream-50/50 to-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Browse by Category
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find the perfect recipe for any time of day or special occasion
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {categories.map((category, index) => (
                <div key={category.title} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <CategoryCard 
                    {...category} 
                    onClick={() => handleCategoryClick(category.title)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {selectedCategory === 'All' ? 'All Recipes' : `${selectedCategory} Recipes`}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {searchQuery ? `Results for "${searchQuery}"` : 'Discover amazing recipes from our community'}
                </p>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {recipes.map((recipe, index) => (
                    <div key={recipe.id} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <RecipeCard
                        {...recipe}
                        isFavorited={user.favoriteRecipes.includes(recipe.id)}
                        onFavorite={handleFavorite}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-full ${
                              pageNum === currentPage 
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
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="rounded-full"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-cream-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse different categories
                </p>
                <Button
                  onClick={() => {
                    handleSearch('');
                    handleCategoryClick('All');
                  }}
                  className="bg-peach-500 hover:bg-peach-600 text-white rounded-full"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 bg-gradient-to-r from-peach-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-peach-600 mb-2">{totalRecipes.toLocaleString()}+</div>
                <div className="text-muted-foreground font-medium">Recipes</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-mint-600 mb-2">45k+</div>
                <div className="text-muted-foreground font-medium">Home Cooks</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-peach-600 mb-2">4.8★</div>
                <div className="text-muted-foreground font-medium">Avg Rating</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-mint-600 mb-2">2M+</div>
                <div className="text-muted-foreground font-medium">Meals Cooked</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-peach-400 to-peach-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold">TastyNest</span>
          </div>
          <p className="text-gray-400 mb-4">Your cooking companion for delicious everyday meals</p>
          <p className="text-gray-500 text-sm">© 2024 TastyNest. Made with ❤️ for food lovers everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
