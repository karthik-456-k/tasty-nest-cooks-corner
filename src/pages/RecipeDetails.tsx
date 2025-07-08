
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Heart, ShoppingCart, ChefHat, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleFavorite, addToShoppingList, getRecipeById } = useRecipeStore();
  const { toast } = useToast();
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const recipe = getRecipeById(id || '');

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
            <Button onClick={() => navigate('/')} className="bg-peach-500 hover:bg-peach-600">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isFavorited = user.favoriteRecipes.includes(recipe.id);

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Recipe removed from your favorites" : "Recipe saved to your favorites"
    });
  };

  const handleAddToShoppingList = () => {
    addToShoppingList(recipe);
    toast({
      title: "Added to shopping list",
      description: "All ingredients have been added to your shopping list"
    });
  };

  const toggleIngredientCheck = (ingredientId: string) => {
    setCheckedIngredients(prev => 
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-cream-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Recipe Header */}
        <div className="bg-card rounded-3xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-80 md:h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFavorite}
                className={`bg-white/90 hover:bg-white rounded-full ${
                  isFavorited ? 'text-red-500' : 'text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Badge className="bg-peach-500 hover:bg-peach-600 text-white">
                {recipe.category}
              </Badge>
              <Badge variant="secondary" className="bg-white/90 text-gray-700">
                <Tag className="w-3 h-3 mr-1" />
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            {recipe.authorId && (
              <p className="text-muted-foreground mb-4">by {recipe.authorId}</p>
            )}
            
            {/* Recipe Meta */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{recipe.rating}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToShoppingList}
                className="bg-mint-500 hover:bg-mint-600 text-white flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Shopping List
              </Button>
              <Button
                variant="outline"
                className="border-peach-300 text-peach-600 hover:bg-peach-50 flex-1"
              >
                <ChefHat className="w-4 h-4 mr-2" />
                Start Cooking Mode
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={ingredient.id}
                    checked={checkedIngredients.includes(ingredient.id)}
                    onCheckedChange={() => toggleIngredientCheck(ingredient.id)}
                  />
                  <label
                    htmlFor={ingredient.id}
                    className={`flex-1 cursor-pointer ${
                      checkedIngredients.includes(ingredient.id) 
                        ? 'line-through text-muted-foreground' 
                        : ''
                    }`}
                  >
                    <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.map((instruction) => (
                <div key={instruction.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-peach-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {instruction.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{instruction.description}</p>
                    {instruction.duration && (
                      <p className="text-xs text-muted-foreground mt-1">⏱️ {instruction.duration}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
