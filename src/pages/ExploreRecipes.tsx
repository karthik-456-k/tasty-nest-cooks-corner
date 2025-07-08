
import { useState } from 'react';
import { Search, Filter, Clock, Users, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExploreRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const allRecipes = [
    {
      id: '1',
      title: 'Creamy Mushroom Risotto with Fresh Herbs',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
      cookTime: '35 min',
      servings: 4,
      rating: 4.8,
      category: 'Dinner',
      difficulty: 'Medium'
    },
    {
      id: '2',
      title: 'Fresh Berry Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
      cookTime: '10 min',
      servings: 2,
      rating: 4.6,
      category: 'Breakfast',
      difficulty: 'Easy'
    },
    {
      id: '3',
      title: 'Grilled Salmon with Lemon Butter',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      cookTime: '25 min',
      servings: 3,
      rating: 4.9,
      category: 'Lunch',
      difficulty: 'Easy'
    },
    {
      id: '4',
      title: 'Chocolate Chip Cookies',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80',
      cookTime: '20 min',
      servings: 12,
      rating: 4.7,
      category: 'Desserts',
      difficulty: 'Easy'
    },
    {
      id: '5',
      title: 'Spicy Thai Green Curry',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
      cookTime: '45 min',
      servings: 4,
      rating: 4.5,
      category: 'Dinner',
      difficulty: 'Hard'
    },
    {
      id: '6',
      title: 'Avocado Toast with Poached Egg',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80',
      cookTime: '15 min',
      servings: 1,
      rating: 4.3,
      category: 'Breakfast',
      difficulty: 'Easy'
    },
    {
      id: '7',
      title: 'Classic Tiramisu',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      cookTime: '30 min',
      servings: 8,
      rating: 4.9,
      category: 'Desserts',
      difficulty: 'Medium'
    },
    {
      id: '8',
      title: 'Mango Smoothie',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
      cookTime: '5 min',
      servings: 2,
      rating: 4.4,
      category: 'Drinks',
      difficulty: 'Easy'
    }
  ];

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Explore <span className="bg-gradient-to-r from-peach-500 to-peach-600 bg-clip-text text-transparent">Recipes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover amazing recipes from our community of passionate cooks
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-background border-border focus:border-peach-300 rounded-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full ${
                      selectedCategory === category 
                        ? 'bg-peach-500 hover:bg-peach-600 text-white' 
                        : 'hover:bg-peach-50 hover:border-peach-300'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2">
                <Filter className="w-5 h-5 text-muted-foreground self-center" />
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`rounded-full ${
                      selectedDifficulty === difficulty 
                        ? 'bg-mint-500 hover:bg-mint-600 text-white' 
                        : 'hover:bg-mint-50 hover:border-mint-300'
                    }`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredRecipes.length} of {allRecipes.length} recipes
            </p>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <RecipeCard
                  {...recipe}
                  isFavorited={favoriteRecipes.includes(recipe.id)}
                  onFavorite={handleFavorite}
                />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-cream-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                }}
                className="bg-peach-500 hover:bg-peach-600 text-white rounded-full"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExploreRecipes;
