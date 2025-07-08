
import { useState, useEffect, useMemo } from 'react';
import { Recipe, User, ShoppingListItem } from '@/types/recipe';

// Generate a comprehensive dataset of 1000+ recipes
const generateRecipes = (): Recipe[] => {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks', 'Salads', 'Soups', 'Vegan', 'Kids', 'Quick Meals'] as const;
  const difficulties = ['Easy', 'Medium', 'Hard'] as const;
  const authors = ['Chef Maria', 'Cook John', 'Baker Sarah', 'Chef Alex', 'Home Cook Lisa', 'Chef David', 'Baker Emma', 'Cook Tom'];
  
  const recipeTemplates = [
    // Breakfast
    { title: 'Fluffy Pancakes', category: 'Breakfast', cookTime: '15 min', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80', tags: ['sweet', 'quick'] },
    { title: 'Avocado Toast', category: 'Breakfast', cookTime: '10 min', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'quick'] },
    { title: 'Oatmeal Bowl', category: 'Breakfast', cookTime: '8 min', image: 'https://images.unsplash.com/photo-1571197119275-324837ba5ce7?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'fiber'] },
    
    // Lunch
    { title: 'Caesar Salad', category: 'Lunch', cookTime: '20 min', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80', tags: ['fresh', 'light'] },
    { title: 'Grilled Sandwich', category: 'Lunch', cookTime: '12 min', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', tags: ['quick', 'comfort'] },
    { title: 'Quinoa Bowl', category: 'Lunch', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'protein'] },
    
    // Dinner
    { title: 'Spaghetti Carbonara', category: 'Dinner', cookTime: '30 min', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=600&q=80', tags: ['pasta', 'creamy'] },
    { title: 'Grilled Salmon', category: 'Dinner', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', tags: ['fish', 'healthy'] },
    { title: 'Beef Stir Fry', category: 'Dinner', cookTime: '20 min', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', tags: ['quick', 'asian'] },
    
    // Desserts
    { title: 'Chocolate Cake', category: 'Desserts', cookTime: '60 min', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', tags: ['sweet', 'celebration'] },
    { title: 'Fruit Tart', category: 'Desserts', cookTime: '45 min', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80', tags: ['fresh', 'elegant'] },
    { title: 'Ice Cream', category: 'Desserts', cookTime: '120 min', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', tags: ['cold', 'sweet'] },
    
    // Snacks
    { title: 'Trail Mix', category: 'Snacks', cookTime: '5 min', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'nuts'] },
    { title: 'Popcorn', category: 'Snacks', cookTime: '8 min', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80', tags: ['quick', 'movie'] },
    
    // Drinks
    { title: 'Green Smoothie', category: 'Drinks', cookTime: '5 min', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'green'] },
    { title: 'Iced Coffee', category: 'Drinks', cookTime: '3 min', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', tags: ['caffeine', 'cold'] },
    
    // Salads
    { title: 'Greek Salad', category: 'Salads', cookTime: '15 min', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', tags: ['mediterranean', 'fresh'] },
    { title: 'Kale Salad', category: 'Salads', cookTime: '12 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', tags: ['superfood', 'healthy'] },
    
    // Soups
    { title: 'Tomato Soup', category: 'Soups', cookTime: '30 min', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', tags: ['comfort', 'warm'] },
    { title: 'Chicken Noodle', category: 'Soups', cookTime: '45 min', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', tags: ['comfort', 'protein'] },
    
    // Vegan
    { title: 'Buddha Bowl', category: 'Vegan', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', tags: ['plant-based', 'colorful'] },
    { title: 'Veggie Burger', category: 'Vegan', cookTime: '20 min', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80', tags: ['plant-based', 'protein'] },
    
    // Kids
    { title: 'Mac and Cheese', category: 'Kids', cookTime: '20 min', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80', tags: ['kid-friendly', 'cheese'] },
    { title: 'Chicken Nuggets', category: 'Kids', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', tags: ['kid-friendly', 'crispy'] },
    
    // Quick Meals
    { title: '5-Minute Pasta', category: 'Quick Meals', cookTime: '5 min', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=600&q=80', tags: ['quick', 'pasta'] },
    { title: 'Instant Noodles', category: 'Quick Meals', cookTime: '3 min', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', tags: ['quick', 'asian'] }
  ];

  const recipes: Recipe[] = [];
  
  // Generate 1000+ recipes by creating variations
  for (let i = 0; i < 1200; i++) {
    const template = recipeTemplates[i % recipeTemplates.length];
    const variation = Math.floor(i / recipeTemplates.length) + 1;
    
    const recipe: Recipe = {
      id: (i + 1).toString(),
      title: variation > 1 ? `${template.title} ${getVariationSuffix(variation)}` : template.title,
      image: template.image,
      cookTime: template.cookTime,
      servings: Math.floor(Math.random() * 6) + 2,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      category: template.category as Recipe['category'],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      ingredients: generateIngredients(template.category, variation),
      instructions: generateInstructions(template.category, variation),
      authorId: authors[Math.floor(Math.random() * authors.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    };
    
    recipes.push(recipe);
  }
  
  return recipes;
};

const getVariationSuffix = (variation: number): string => {
  const suffixes = ['Supreme', 'Deluxe', 'Classic', 'Gourmet', 'Special', 'Traditional', 'Modern', 'Fusion', 'Spicy', 'Mild', 'Extra', 'Light', 'Rich', 'Creamy', 'Crispy'];
  return suffixes[variation % suffixes.length];
};

const generateIngredients = (category: string, variation: number) => {
  const baseIngredients = {
    'Breakfast': ['eggs', 'milk', 'flour', 'butter', 'vanilla'],
    'Lunch': ['lettuce', 'tomato', 'cheese', 'bread', 'olive oil'],
    'Dinner': ['onion', 'garlic', 'salt', 'pepper', 'herbs'],
    'Desserts': ['sugar', 'flour', 'butter', 'vanilla', 'chocolate'],
    'Snacks': ['nuts', 'dried fruit', 'seeds', 'honey', 'spices'],
    'Drinks': ['water', 'ice', 'fruit', 'honey', 'mint'],
    'Salads': ['greens', 'vegetables', 'dressing', 'nuts', 'cheese'],
    'Soups': ['broth', 'vegetables', 'herbs', 'cream', 'seasoning'],
    'Vegan': ['vegetables', 'grains', 'legumes', 'nuts', 'spices'],
    'Kids': ['cheese', 'pasta', 'chicken', 'bread', 'milk'],
    'Quick Meals': ['pasta', 'sauce', 'vegetables', 'protein', 'seasoning']
  };

  const ingredients = baseIngredients[category as keyof typeof baseIngredients] || baseIngredients['Dinner'];
  return ingredients.map((name, index) => ({
    id: `${variation}-${index}`,
    name: name,
    amount: (Math.random() * 3 + 0.5).toFixed(1),
    unit: ['cup', 'tbsp', 'tsp', 'lb', 'oz', 'piece'][Math.floor(Math.random() * 6)]
  }));
};

const generateInstructions = (category: string, variation: number) => {
  const steps = [
    'Prepare all ingredients and preheat oven if needed.',
    'Mix dry ingredients in a large bowl.',
    'Combine wet ingredients in a separate bowl.',
    'Gradually combine wet and dry ingredients.',
    'Cook according to recipe specifications.',
    'Season to taste and serve hot.'
  ];

  return steps.map((description, index) => ({
    id: `${variation}-step-${index}`,
    step: index + 1,
    description,
    duration: index === steps.length - 1 ? undefined : `${Math.floor(Math.random() * 10) + 5} min`
  }));
};

const SAMPLE_USER: User = {
  id: '1',
  name: 'Sarah Johnson',
  bio: 'Home cook passionate about healthy and delicious meals. Love experimenting with new flavors!',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
  favoriteRecipes: [],
  myRecipes: []
};

export const useRecipeStore = () => {
  const [allRecipes] = useState<Recipe[]>(() => generateRecipes());
  const [user, setUser] = useState<User>(SAMPLE_USER);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'difficulty'>('rating');
  
  const recipesPerPage = 24;

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tastyNest_user');
    const savedShoppingList = localStorage.getItem('tastyNest_shoppingList');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedShoppingList) {
      setShoppingList(JSON.parse(savedShoppingList));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('tastyNest_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tastyNest_shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    let filtered = allRecipes.filter(recipe => {
      const matchesSearch = searchQuery === '' || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.authorId?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort recipes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'time':
          return parseInt(a.cookTime) - parseInt(b.cookTime);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [allRecipes, searchQuery, selectedCategory, sortBy]);

  // Paginated recipes
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
  }, [filteredRecipes, currentPage, recipesPerPage]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'authorId' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: (allRecipes.length + 1).toString(),
      authorId: user.id,
      createdAt: new Date()
    };
    
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

  const setSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const setCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const getRecipeById = (id: string) => {
    return allRecipes.find(recipe => recipe.id === id);
  };

  const getRandomRecipe = () => {
    return allRecipes[Math.floor(Math.random() * allRecipes.length)];
  };

  return {
    recipes: paginatedRecipes,
    allRecipes,
    filteredRecipes,
    user,
    shoppingList,
    currentPage,
    totalPages,
    searchQuery,
    selectedCategory,
    sortBy,
    totalRecipes: allRecipes.length,
    filteredCount: filteredRecipes.length,
    addRecipe,
    toggleFavorite,
    addToShoppingList,
    toggleShoppingListItem,
    clearShoppingList,
    updateUser,
    setCurrentPage,
    setSearch,
    setCategory,
    setSortBy,
    getRecipeById,
    getRandomRecipe
  };
};
