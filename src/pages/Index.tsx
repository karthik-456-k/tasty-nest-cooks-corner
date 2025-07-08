
import { useState } from 'react';
import { Utensils, Coffee, Sun, Moon, Cookie, Wine } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';

const Index = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const categories = [
    { icon: Coffee, title: 'Breakfast', count: 145, gradient: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { icon: Sun, title: 'Lunch', count: 289, gradient: 'bg-gradient-to-br from-yellow-400 to-amber-500' },
    { icon: Utensils, title: 'Dinner', count: 367, gradient: 'bg-gradient-to-br from-peach-400 to-peach-600' },
    { icon: Cookie, title: 'Desserts', count: 156, gradient: 'bg-gradient-to-br from-pink-400 to-rose-500' },
    { icon: Moon, title: 'Snacks', count: 234, gradient: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
    { icon: Wine, title: 'Drinks', count: 89, gradient: 'bg-gradient-to-br from-mint-400 to-emerald-500' },
  ];

  const featuredRecipes = [
    {
      id: '1',
      title: 'Creamy Mushroom Risotto with Fresh Herbs',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
      cookTime: '35 min',
      servings: 4,
      rating: 4.8,
      category: 'Dinner'
    },
    {
      id: '2',
      title: 'Fresh Berry Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
      cookTime: '10 min',
      servings: 2,
      rating: 4.6,
      category: 'Breakfast'
    },
    {
      id: '3',
      title: 'Grilled Salmon with Lemon Butter',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      cookTime: '25 min',
      servings: 3,
      rating: 4.9,
      category: 'Lunch'
    },
    {
      id: '4',
      title: 'Chocolate Chip Cookies',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80',
      cookTime: '20 min',
      servings: 12,
      rating: 4.7,
      category: 'Dessert'
    }
  ];

  const handleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-cream-50/50">
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
                  <CategoryCard {...category} />
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
                  Today's Featured Recipes
                </h2>
                <p className="text-muted-foreground text-lg">
                  Hand-picked by our community of food lovers
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRecipes.map((recipe, index) => (
                <div key={recipe.id} className="animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <RecipeCard
                    {...recipe}
                    isFavorited={favoriteRecipes.includes(recipe.id)}
                    onFavorite={handleFavorite}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 bg-gradient-to-r from-peach-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-peach-600 mb-2">1,280+</div>
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
