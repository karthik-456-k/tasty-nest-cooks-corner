
import { useState, useEffect } from 'react';
import { Recipe, User, ShoppingListItem } from '@/types/recipe';

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Mushroom Risotto with Fresh Herbs',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
    cookTime: '35 min',
    servings: 4,
    rating: 4.8,
    category: 'Dinner',
    difficulty: 'Medium',
    ingredients: [
      { id: '1', name: 'Arborio rice', amount: '1', unit: 'cup' },
      { id: '2', name: 'Mixed mushrooms', amount: '300', unit: 'g' },
      { id: '3', name: 'Vegetable broth', amount: '4', unit: 'cups' },
      { id: '4', name: 'Parmesan cheese', amount: '1/2', unit: 'cup' },
      { id: '5', name: 'Fresh herbs', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Heat broth in a separate pot and keep warm.' },
      { id: '2', step: 2, description: 'Sauté mushrooms in olive oil until golden.' },
      { id: '3', step: 3, description: 'Add rice and toast for 2 minutes.' },
      { id: '4', step: 4, description: 'Add warm broth one ladle at a time, stirring constantly.' },
      { id: '5', step: 5, description: 'Finish with cheese and herbs.' }
    ]
  },
  {
    id: '2',
    title: 'Fresh Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
    cookTime: '10 min',
    servings: 2,
    rating: 4.6,
    category: 'Breakfast',
    difficulty: 'Easy',
    ingredients: [
      { id: '1', name: 'Mixed berries', amount: '2', unit: 'cups' },
      { id: '2', name: 'Banana', amount: '1', unit: 'large' },
      { id: '3', name: 'Greek yogurt', amount: '1/2', unit: 'cup' },
      { id: '4', name: 'Honey', amount: '2', unit: 'tbsp' },
      { id: '5', name: 'Granola', amount: '1/4', unit: 'cup' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Blend berries, banana, and yogurt until smooth.' },
      { id: '2', step: 2, description: 'Pour into bowl and drizzle with honey.' },
      { id: '3', step: 3, description: 'Top with granola and fresh berries.' }
    ]
  },
  {
    id: '3',
    title: 'Grilled Salmon with Lemon Butter',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    cookTime: '25 min',
    servings: 3,
    rating: 4.9,
    category: 'Lunch',
    difficulty: 'Easy',
    ingredients: [
      { id: '1', name: 'Salmon fillets', amount: '3', unit: 'pieces' },
      { id: '2', name: 'Butter', amount: '3', unit: 'tbsp' },
      { id: '3', name: 'Lemon', amount: '1', unit: 'large' },
      { id: '4', name: 'Fresh dill', amount: '2', unit: 'tbsp' },
      { id: '5', name: 'Salt and pepper', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Season salmon with salt and pepper.' },
      { id: '2', step: 2, description: 'Grill salmon for 4-5 minutes per side.' },
      { id: '3', step: 3, description: 'Melt butter with lemon juice and dill.' },
      { id: '4', step: 4, description: 'Serve salmon with lemon butter sauce.' }
    ]
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80',
    cookTime: '20 min',
    servings: 12,
    rating: 4.7,
    category: 'Desserts',
    difficulty: 'Easy',
    ingredients: [
      { id: '1', name: 'All-purpose flour', amount: '2', unit: 'cups' },
      { id: '2', name: 'Butter', amount: '1', unit: 'cup' },
      { id: '3', name: 'Brown sugar', amount: '3/4', unit: 'cup' },
      { id: '4', name: 'Chocolate chips', amount: '1', unit: 'cup' },
      { id: '5', name: 'Vanilla extract', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      { id: '1', step: 1, description: 'Cream butter and sugar together.' },
      { id: '2', step: 2, description: 'Add flour and vanilla, mix well.' },
      { id: '3', step: 3, description: 'Fold in chocolate chips.' },
      { id: '4', step: 4, description: 'Bake at 350°F for 10-12 minutes.' }
    ]
  }
];

const SAMPLE_USER: User = {
  id: '1',
  name: 'Sarah Johnson',
  bio: 'Home cook passionate about healthy and delicious meals. Love experimenting with new flavors!',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
  favoriteRecipes: [],
  myRecipes: []
};

export const useRecipeStore = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [user, setUser] = useState<User>(SAMPLE_USER);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem('tastyNest_recipes');
    const savedUser = localStorage.getItem('tastyNest_user');
    const savedShoppingList = localStorage.getItem('tastyNest_shoppingList');

    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedShoppingList) {
      setShoppingList(JSON.parse(savedShoppingList));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('tastyNest_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('tastyNest_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tastyNest_shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'authorId' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      authorId: user.id,
      createdAt: new Date()
    };
    setRecipes(prev => [...prev, newRecipe]);
    setUser(prev => ({ ...prev, myRecipes: [...prev.myRecipes, newRecipe.id] }));
    return newRecipe;
  };

  const toggleFavorite = (recipeId: string) => {
    setUser(prev => ({
      ...prev,
      favoriteRecipes: prev.favoriteRecipes.includes(recipeId)
        ? prev.favoriteRecipes.filter(id => id !== recipeId)
        : [...prev.favoriteRecipes, recipeId]
    }));
  };

  const addToShoppingList = (recipe: Recipe) => {
    const newItems: ShoppingListItem[] = recipe.ingredients.map(ingredient => ({
      id: `${recipe.id}-${ingredient.id}`,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      checked: false,
      recipeId: recipe.id,
      recipeName: recipe.title
    }));

    setShoppingList(prev => {
      const existingIds = prev.map(item => item.id);
      const filteredNewItems = newItems.filter(item => !existingIds.includes(item.id));
      return [...prev, ...filteredNewItems];
    });
  };

  const toggleShoppingListItem = (itemId: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return {
    recipes,
    user,
    shoppingList,
    addRecipe,
    toggleFavorite,
    addToShoppingList,
    toggleShoppingListItem,
    clearShoppingList,
    updateUser
  };
};
