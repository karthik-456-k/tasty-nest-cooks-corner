
import { useState } from 'react';
import { Utensils, Coffee, Sun, Moon, Cookie, Wine } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRecipeStore } from '@/hooks/useRecipeStore';

const Index = () => {
  const { recipes, user, toggleFavorite } = useRecipeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { icon: Coffee, title: 'Breakfast', count: 145, gradient: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { icon: Sun, title: 'Lunch', count: 289, gradient: 'bg-gradient-to-br from-yellow-400 to-amber-500' },
    { icon: Utensils, title: 'Dinner', count: 367, gradient: 'bg-gradient-to-br from-peach-400 to-peach-600' },
    { icon: Cookie, title: 'Desserts', count: 156, gradient: 'bg-gradient-to-br from-pink-400 to-rose-500' },
    { icon: Moon, title: 'Snacks', count: 234, gradient: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
    { icon: Wine, title: 'Drinks', count: 89, gradient: 'bg-gradient-to-br from-mint-400 to-emerald-500' },
  ];

  const categoryButtons = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
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
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search recipes by name or ingredient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white border-2 border-cream-200 focus:border-peach-300 rounded-full shadow-sm"
                />
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
                <div key={category.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <div key={recipe.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <RecipeCard
                      {...recipe}
                      isFavorited={user.favoriteRecipes.includes(recipe.id)}
                      onFavorite={handleFavorite}
                    />
                  </div>
                ))}
              </div>
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
                    setSearchQuery('');
                    setSelectedCategory('All');
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
                <div className="text-3xl md:text-4xl font-bold text-peach-600 mb-2">{recipes.length}+</div>
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
