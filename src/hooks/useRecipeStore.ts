import { useState, useEffect, useMemo } from 'react';
import { Recipe, User, ShoppingListItem } from '@/types/recipe';

// Fuzzy matching function for recipe titles
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

const getEditDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

// Check if two recipes are duplicates
const isDuplicateRecipe = (recipe1: Recipe, recipe2: Recipe): boolean => {
  // Title similarity check (80% threshold)
  const titleSimilarity = calculateSimilarity(
    recipe1.title.toLowerCase().trim(),
    recipe2.title.toLowerCase().trim()
  );
  
  if (titleSimilarity > 0.8) return true;
  
  // Ingredient similarity check
  const ingredients1 = recipe1.ingredients.map(ing => ing.name.toLowerCase()).sort();
  const ingredients2 = recipe2.ingredients.map(ing => ing.name.toLowerCase()).sort();
  
  if (ingredients1.length === ingredients2.length) {
    const matchingIngredients = ingredients1.filter(ing => ingredients2.includes(ing));
    const ingredientSimilarity = matchingIngredients.length / ingredients1.length;
    
    if (ingredientSimilarity > 0.85) return true;
  }
  
  return false;
};

// Generate a comprehensive dataset of unique recipes
const generateUniqueRecipes = (): Recipe[] => {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks', 'Salads', 'Soups', 'Vegan', 'Kids', 'Quick Meals'] as const;
  const difficulties = ['Easy', 'Medium', 'Hard'] as const;
  const authors = ['Chef Maria', 'Cook John', 'Baker Sarah', 'Chef Alex', 'Home Cook Lisa', 'Chef David', 'Baker Emma', 'Cook Tom'];
  
  const uniqueRecipeTemplates = [
    // Breakfast (Enhanced variety)
    { title: 'Classic Buttermilk Pancakes', category: 'Breakfast', cookTime: '15 min', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80', tags: ['sweet', 'fluffy'] },
    { title: 'Avocado Toast Supreme', category: 'Breakfast', cookTime: '10 min', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80', tags: ['healthy', 'trendy'] },
    { title: 'Steel Cut Oats Bowl', category: 'Breakfast', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1571197119275-324837ba5ce7?auto=format&fit=crop&w=600&q=80', tags: ['nutritious', 'filling'] },
    { title: 'French Toast Brioche', category: 'Breakfast', cookTime: '12 min', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80', tags: ['indulgent', 'weekend'] },
    { title: 'Breakfast Burrito Bowl', category: 'Breakfast', cookTime: '18 min', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', tags: ['protein-rich', 'mexican'] },
    
    // Lunch (More diverse options)
    { title: 'Mediterranean Quinoa Salad', category: 'Lunch', cookTime: '20 min', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80', tags: ['mediterranean', 'grain-bowl'] },
    { title: 'Panini Caprese Sandwich', category: 'Lunch', cookTime: '12 min', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', tags: ['italian', 'pressed'] },
    { title: 'Buddha Power Bowl', category: 'Lunch', cookTime: '25 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', tags: ['plant-based', 'colorful'] },
    { title: 'Chicken Caesar Wraps', category: 'Lunch', cookTime: '15 min', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=600&q=80', tags: ['handheld', 'classic'] },
    { title: 'Asian Fusion Noodle Bowl', category: 'Lunch', cookTime: '22 min', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', tags: ['asian', 'umami'] },
    
    // Dinner (Expanded variety)
    { title: 'Spaghetti Aglio e Olio', category: 'Dinner', cookTime: '15 min', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=600&q=80', tags: ['italian', 'simple'] },
    { title: 'Herb-Crusted Salmon', category: 'Dinner', cookTime: '28 min', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', tags: ['omega-3', 'elegant'] },
    { title: 'Korean Beef Bulgogi', category: 'Dinner', cookTime: '35 min', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', tags: ['korean', 'marinated'] },
    { title: 'Moroccan Tagine Chicken', category: 'Dinner', cookTime: '45 min', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80', tags: ['moroccan', 'aromatic'] },
    { title: 'Thai Green Curry', category: 'Dinner', cookTime: '30 min', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', tags: ['thai', 'coconut'] },
    
    // Continue with more unique templates for other categories...
    { title: 'Tiramisu Classico', category: 'Desserts', cookTime: '240 min', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', tags: ['italian', 'coffee'] },
    { title: 'Fresh Berry Tart', category: 'Desserts', cookTime: '60 min', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80', tags: ['seasonal', 'pastry'] },
    { title: 'Salted Caramel Ice Cream', category: 'Desserts', cookTime: '180 min', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', tags: ['frozen', 'indulgent'] },
    
    // Add more unique recipes across all categories
  ];

  const recipes: Recipe[] = [];
  const usedTitles = new Set<string>();
  const duplicateCount = { total: 0 };

  // Generate base recipes
  uniqueRecipeTemplates.forEach((template, index) => {
    const recipe: Recipe = {
      id: (index + 1).toString(),
      title: template.title,
      image: template.image,
      cookTime: template.cookTime,
      servings: Math.floor(Math.random() * 6) + 2,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      category: template.category as Recipe['category'],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      ingredients: generateUniqueIngredients(template.category, index),
      instructions: generateUniqueInstructions(template.category, index),
      authorId: authors[Math.floor(Math.random() * authors.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    };
    
    recipes.push(recipe);
    usedTitles.add(recipe.title.toLowerCase());
  });

  // Generate additional variations ensuring uniqueness
  let recipeId = uniqueRecipeTemplates.length + 1;
  const targetCount = 1000;
  
  while (recipes.length < targetCount && recipeId < targetCount * 2) {
    const template = uniqueRecipeTemplates[Math.floor(Math.random() * uniqueRecipeTemplates.length)];
    const variationSuffix = getUniqueVariationSuffix(recipeId);
    const newTitle = `${template.title} ${variationSuffix}`;
    
    // Check for duplicates
    const titleKey = newTitle.toLowerCase();
    if (usedTitles.has(titleKey)) {
      duplicateCount.total++;
      recipeId++;
      continue;
    }
    
    const newRecipe: Recipe = {
      id: recipeId.toString(),
      title: newTitle,
      image: template.image,
      cookTime: template.cookTime,
      servings: Math.floor(Math.random() * 6) + 2,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      category: template.category as Recipe['category'],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      ingredients: generateUniqueIngredients(template.category, recipeId),
      instructions: generateUniqueInstructions(template.category, recipeId),
      authorId: authors[Math.floor(Math.random() * authors.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    };
    
    // Final duplicate check against existing recipes
    const isDuplicate = recipes.some(existingRecipe => isDuplicateRecipe(newRecipe, existingRecipe));
    
    if (!isDuplicate) {
      recipes.push(newRecipe);
      usedTitles.add(titleKey);
    } else {
      duplicateCount.total++;
    }
    
    recipeId++;
  }
  
  console.log(`✅ Generated ${recipes.length} unique recipes (${duplicateCount.total} duplicates prevented)`);
  return recipes;
};

const getUniqueVariationSuffix = (id: number): string => {
  const suffixes = [
    'Supreme', 'Deluxe', 'Classic', 'Gourmet', 'Special', 'Traditional', 'Modern', 'Fusion', 
    'Spicy', 'Mild', 'Extra', 'Light', 'Rich', 'Creamy', 'Crispy', 'Rustic', 'Artisan',
    'Homestyle', 'Restaurant Style', 'Signature', 'Premium', 'Ultimate', 'Perfect', 'Golden',
    'Authentic', 'Original', 'Fresh', 'Zesty', 'Hearty', 'Comfort', 'Elevated', 'Twisted'
  ];
  return suffixes[id % suffixes.length];
};

const generateUniqueIngredients = (category: string, seed: number) => {
  const ingredientSets = {
    'Breakfast': [
      ['eggs', 'milk', 'flour', 'butter', 'vanilla extract'],
      ['oats', 'berries', 'honey', 'almonds', 'cinnamon'],
      ['bread', 'avocado', 'lime', 'salt', 'pepper'],
      ['yogurt', 'granola', 'banana', 'maple syrup', 'chia seeds']
    ],
    'Lunch': [
      ['quinoa', 'cucumber', 'tomatoes', 'feta cheese', 'olive oil'],
      ['chicken breast', 'lettuce', 'caesar dressing', 'parmesan', 'croutons'],
      ['mixed greens', 'chickpeas', 'carrots', 'tahini', 'lemon juice'],
      ['rice noodles', 'vegetables', 'soy sauce', 'ginger', 'garlic']
    ],
    'Dinner': [
      ['pasta', 'garlic', 'olive oil', 'red pepper flakes', 'parsley'],
      ['salmon fillet', 'herbs', 'lemon', 'asparagus', 'potatoes'],
      ['beef', 'onions', 'bell peppers', 'soy sauce', 'sesame oil'],
      ['chicken thighs', 'coconut milk', 'curry paste', 'vegetables', 'jasmine rice']
    ],
    'Desserts': ['sugar', 'flour', 'butter', 'vanilla', 'chocolate'],
    'Snacks': ['nuts', 'dried fruit', 'seeds', 'honey', 'spices'],
    'Drinks': ['water', 'ice', 'fruit', 'honey', 'mint'],
    'Salads': ['greens', 'vegetables', 'dressing', 'nuts', 'cheese'],
    'Soups': ['broth', 'vegetables', 'herbs', 'cream', 'seasoning'],
    'Vegan': ['vegetables', 'grains', 'legumes', 'nuts', 'spices'],
    'Kids': ['cheese', 'pasta', 'chicken', 'bread', 'milk'],
    'Quick Meals': ['pasta', 'sauce', 'vegetables', 'protein', 'seasoning']
  };

  const baseIngredients = ingredientSets[category as keyof typeof ingredientSets] || ingredientSets['Dinner'];
  const selectedSet = baseIngredients[seed % baseIngredients.length];
  
  return selectedSet.map((name, index) => ({
    id: `${seed}-${index}`,
    name: name,
    amount: (Math.random() * 3 + 0.5).toFixed(1),
    unit: ['cup', 'tbsp', 'tsp', 'lb', 'oz', 'piece', 'clove', 'bunch'][Math.floor(Math.random() * 8)]
  }));
};

const generateUniqueInstructions = (category: string, seed: number) => {
  const instructionSets = {
    'Breakfast': [
      'Preheat your pan or griddle over medium heat.',
      'Mix all dry ingredients in a large bowl.',
      'Whisk wet ingredients in a separate bowl until smooth.',
      'Combine wet and dry ingredients until just mixed.',
      'Cook until bubbles form on surface, then flip.',
      'Serve immediately while hot and fluffy.'
    ],
    'Lunch': [
      'Prepare all fresh ingredients and wash thoroughly.',
      'Cook grains or pasta according to package directions.',
      'Prepare dressing by whisking all components together.',
      'Combine all salad ingredients in a large bowl.',
      'Toss with dressing just before serving.',
      'Garnish with fresh herbs and serve chilled.'
    ],
    'Dinner': [
      'Preheat oven to required temperature if needed.',
      'Season protein with salt, pepper, and desired spices.',
      'Heat oil in a large skillet over medium-high heat.',
      'Cook protein until golden brown and cooked through.',
      'Add vegetables and aromatics to the pan.',
      'Finish cooking and let rest before serving.'
    ],
    'Desserts': [
      'Preheat oven to the specified temperature.',
      'Grease and flour a baking pan.',
      'Cream together butter and sugar until light and fluffy.',
      'Incorporate eggs one at a time, mixing well after each.',
      'Gradually add dry ingredients to wet ingredients.',
      'Bake until a toothpick comes out clean.'
    ],
    'Snacks': [
      'Combine nuts, seeds, and dried fruit in a bowl.',
      'Drizzle with honey and spices.',
      'Mix well to coat evenly.',
      'Spread on a baking sheet.',
      'Bake until golden brown and fragrant.',
      'Let cool completely before serving.'
    ],
    'Drinks': [
      'Fill a glass with ice cubes.',
      'Add fruit and herbs to the glass.',
      'Pour liquid over ice and fruit.',
      'Stir gently to combine flavors.',
      'Garnish with a sprig of mint.',
      'Serve immediately and enjoy.'
    ],
    'Salads': [
      'Wash and chop all vegetables.',
      'Combine greens and vegetables in a large bowl.',
      'Prepare dressing by whisking ingredients together.',
      'Drizzle dressing over salad.',
      'Toss gently to coat.',
      'Serve immediately or chill for later.'
    ],
    'Soups': [
      'Sauté vegetables in a pot until softened.',
      'Add broth and bring to a boil.',
      'Simmer until vegetables are tender.',
      'Stir in herbs and seasoning.',
      'Blend until smooth if desired.',
      'Serve hot with a dollop of cream.'
    ],
    'Vegan': [
      'Prepare grains or legumes according to package directions.',
      'Roast vegetables until tender and slightly caramelized.',
      'Prepare sauce or dressing.',
      'Combine grains, vegetables, and sauce in a bowl.',
      'Toss gently to coat.',
      'Garnish with nuts and spices.'
    ],
    'Kids': [
      'Cook pasta according to package directions.',
      'Melt cheese in a saucepan.',
      'Stir in milk until smooth.',
      'Combine pasta and cheese sauce.',
      'Mix well to coat.',
      'Serve warm and enjoy.'
    ],
    'Quick Meals': [
      'Cook pasta according to package directions.',
      'Heat sauce in a saucepan.',
      'Add vegetables and protein to the sauce.',
      'Simmer until heated through.',
      'Combine pasta and sauce.',
      'Serve immediately and enjoy.'
    ]
  };

  const steps = instructionSets[category as keyof typeof instructionSets] || instructionSets['Dinner'];
  
  return steps.map((description, index) => ({
    id: `${seed}-step-${index}`,
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
  const [allRecipes] = useState<Recipe[]>(() => generateUniqueRecipes());
  const [user, setUser] = useState<User>(SAMPLE_USER);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'difficulty'>('rating');
  
  const recipesPerPage = 24;

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

  useEffect(() => {
    localStorage.setItem('tastyNest_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tastyNest_shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const filteredRecipes = useMemo(() => {
    let filtered = allRecipes.filter(recipe => {
      const matchesSearch = searchQuery === '' || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.authorId?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

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

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    return filteredRecipes.slice(startIndex, startIndex + recipesPerPage);
  }, [filteredRecipes, currentPage, recipesPerPage]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'authorId' | 'createdAt'>) => {
    // Check for duplicates before adding
    const isDuplicate = allRecipes.some(existingRecipe => 
      isDuplicateRecipe({ ...recipe, id: '', authorId: user.id, createdAt: new Date() } as Recipe, existingRecipe)
    );
    
    if (isDuplicate) {
      throw new Error('Recipe already exists or is too similar to an existing recipe');
    }
    
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
