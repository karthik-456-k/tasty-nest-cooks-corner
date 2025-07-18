import { create } from 'zustand';
import { Recipe, User, ShoppingListItem } from '@/types/recipe';

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    image: '/images/margherita-pizza.jpg',
    cookTime: '20 mins',
    servings: 4,
    rating: 4.5,
    category: 'Lunch',
    difficulty: 'Easy',
    ingredients: [
      { id: '1', name: 'Pizza dough', amount: '1', unit: 'lb' },
      { id: '2', name: 'Tomato sauce', amount: '1', unit: 'cup' },
      { id: '3', name: 'Fresh mozzarella', amount: '8', unit: 'oz' },
      { id: '4', name: 'Fresh basil', amount: '1/4', unit: 'cup' },
      { id: '5', name: 'Olive oil', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      { id: '1', step: 1, description: 'Preheat oven to 450°F.' },
      { id: '2', step: 2, description: 'Roll out pizza dough.' },
      { id: '3', step: 3, description: 'Spread tomato sauce over dough.' },
      { id: '4', step: 4, description: 'Add mozzarella and basil.' },
      { id: '5', step: 5, description: 'Drizzle with olive oil.' },
      { id: '6', step: 6, description: 'Bake for 12-15 minutes.' },
    ],
  },
  {
    id: '2',
    title: 'Spicy Chicken Tacos',
    image: '/images/spicy-chicken-tacos.jpg',
    cookTime: '30 mins',
    servings: 6,
    rating: 4.2,
    category: 'Dinner',
    difficulty: 'Medium',
    ingredients: [
      { id: '6', name: 'Chicken breast', amount: '1.5', unit: 'lb' },
      { id: '7', name: 'Taco seasoning', amount: '2', unit: 'tbsp' },
      { id: '8', name: 'Tortillas', amount: '12' },
      { id: '9', name: 'Salsa', amount: '1', unit: 'cup' },
      { id: '10', name: 'Sour cream', amount: '1/2', unit: 'cup' },
      { id: '11', name: 'Shredded cheese', amount: '1', unit: 'cup' },
    ],
    instructions: [
      { id: '7', step: 1, description: 'Cut chicken into small pieces.' },
      { id: '8', step: 2, description: 'Cook chicken with taco seasoning.' },
      { id: '9', step: 3, description: 'Warm tortillas.' },
      { id: '10', step: 4, description: 'Fill tortillas with chicken, salsa, sour cream, and cheese.' },
    ],
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    image: '/images/chocolate-chip-cookies.jpg',
    cookTime: '25 mins',
    servings: 24,
    rating: 4.8,
    category: 'Desserts',
    difficulty: 'Easy',
    ingredients: [
      { id: '12', name: 'All-purpose flour', amount: '3', unit: 'cups' },
      { id: '13', name: 'Butter', amount: '1', unit: 'cup' },
      { id: '14', name: 'Sugar', amount: '1', unit: 'cup' },
      { id: '15', name: 'Brown sugar', amount: '1', unit: 'cup' },
      { id: '16', name: 'Eggs', amount: '2' },
      { id: '17', name: 'Vanilla extract', amount: '2', unit: 'tsp' },
      { id: '18', name: 'Chocolate chips', amount: '2', unit: 'cups' },
    ],
    instructions: [
      { id: '11', step: 1, description: 'Preheat oven to 375°F.' },
      { id: '12', step: 2, description: 'Cream together butter, sugar, and brown sugar.' },
      { id: '13', step: 3, description: 'Beat in eggs and vanilla.' },
      { id: '14', step: 4, description: 'Gradually add flour.' },
      { id: '15', step: 5, description: 'Stir in chocolate chips.' },
      { id: '16', step: 6, description: 'Drop by spoonfuls onto baking sheet.' },
      { id: '17', step: 7, description: 'Bake for 10-12 minutes.' },
    ],
  },
  {
    id: '4',
    title: 'Refreshing Summer Salad',
    image: '/images/summer-salad.jpg',
    cookTime: '15 mins',
    servings: 4,
    rating: 4.6,
    category: 'Lunch',
    difficulty: 'Easy',
    ingredients: [
      { id: '19', name: 'Mixed greens', amount: '8', unit: 'oz' },
      { id: '20', name: 'Cherry tomatoes', amount: '1', unit: 'pint' },
      { id: '21', name: 'Cucumber', amount: '1' },
      { id: '22', name: 'Red onion', amount: '1/2' },
      { id: '23', name: 'Feta cheese', amount: '4', unit: 'oz' },
      { id: '24', name: 'Olive oil', amount: '3', unit: 'tbsp' },
      { id: '25', name: 'Lemon juice', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      { id: '18', step: 1, description: 'Combine mixed greens, tomatoes, cucumber, and red onion.' },
      { id: '19', step: 2, description: 'Crumble feta cheese over the salad.' },
      { id: '20', step: 3, description: 'Drizzle with olive oil and lemon juice.' },
    ],
  },
  {
    id: '5',
    title: 'Hearty Beef Stew',
    image: '/images/beef-stew.jpg',
    cookTime: '120 mins',
    servings: 6,
    rating: 4.3,
    category: 'Dinner',
    difficulty: 'Medium',
    ingredients: [
      { id: '26', name: 'Beef chuck', amount: '2', unit: 'lb' },
      { id: '27', name: 'Potatoes', amount: '3', unit: 'medium' },
      { id: '28', name: 'Carrots', amount: '4' },
      { id: '29', name: 'Celery', amount: '3', unit: 'stalks' },
      { id: '30', name: 'Beef broth', amount: '6', unit: 'cups' },
      { id: '31', name: 'Tomato paste', amount: '2', unit: 'tbsp' },
      { id: '32', name: 'Bay leaf', amount: '1' },
    ],
    instructions: [
      { id: '21', step: 1, description: 'Cut beef into 1-inch cubes.' },
      { id: '22', step: 2, description: 'Brown beef in a large pot.' },
      { id: '23', step: 3, description: 'Add potatoes, carrots, and celery.' },
      { id: '24', step: 4, description: 'Pour in beef broth and tomato paste.' },
      { id: '25', step: 5, description: 'Add bay leaf.' },
      { id: '26', step: 6, description: 'Simmer for 2 hours.' },
    ],
  },
  {
    id: '6',
    title: 'Quick Chicken Noodle Soup',
    image: '/images/chicken-noodle-soup.jpg',
    cookTime: '45 mins',
    servings: 6,
    rating: 4.4,
    category: 'Lunch',
    difficulty: 'Easy',
    ingredients: [
      { id: '33', name: 'Chicken breast', amount: '1', unit: 'lb' },
      { id: '34', name: 'Egg noodles', amount: '8', unit: 'oz' },
      { id: '35', name: 'Carrots', amount: '2' },
      { id: '36', name: 'Celery', amount: '2', unit: 'stalks' },
      { id: '37', name: 'Chicken broth', amount: '8', unit: 'cups' },
      { id: '38', name: 'Onion', amount: '1/2' },
    ],
    instructions: [
      { id: '27', step: 1, description: 'Boil chicken in chicken broth.' },
      { id: '28', step: 2, description: 'Remove chicken and shred.' },
      { id: '29', step: 3, description: 'Add noodles, carrots, celery, and onion to broth.' },
      { id: '30', step: 4, description: 'Cook until noodles are tender.' },
      { id: '31', step: 5, description: 'Add chicken back to soup.' },
    ],
  },
  {
    id: '7',
    title: 'Blueberry Pancakes',
    image: '/images/blueberry-pancakes.jpg',
    cookTime: '20 mins',
    servings: 4,
    rating: 4.7,
    category: 'Breakfast',
    difficulty: 'Easy',
    ingredients: [
      { id: '39', name: 'All-purpose flour', amount: '1', unit: 'cup' },
      { id: '40', name: 'Baking powder', amount: '2', unit: 'tsp' },
      { id: '41', name: 'Sugar', amount: '2', unit: 'tbsp' },
      { id: '42', name: 'Milk', amount: '1', unit: 'cup' },
      { id: '43', name: 'Egg', amount: '1' },
      { id: '44', name: 'Butter', amount: '2', unit: 'tbsp' },
      { id: '45', name: 'Blueberries', amount: '1/2', unit: 'cup' },
    ],
    instructions: [
      { id: '32', step: 1, description: 'Mix flour, baking powder, and sugar.' },
      { id: '33', step: 2, description: 'Add milk and egg.' },
      { id: '34', step: 3, description: 'Melt butter in a pan.' },
      { id: '35', step: 4, description: 'Pour batter onto pan.' },
      { id: '36', step: 5, description: 'Add blueberries.' },
      { id: '37', step: 6, description: 'Cook until golden brown.' },
    ],
  },
  {
    id: '8',
    title: 'Avocado Toast with Egg',
    image: '/images/avocado-toast.jpg',
    cookTime: '10 mins',
    servings: 1,
    rating: 4.6,
    category: 'Breakfast',
    difficulty: 'Easy',
    ingredients: [
      { id: '46', name: 'Bread', amount: '2', unit: 'slices' },
      { id: '47', name: 'Avocado', amount: '1/2' },
      { id: '48', name: 'Egg', amount: '1' },
      { id: '49', name: 'Salt', amount: '1', unit: 'pinch' },
      { id: '50', name: 'Pepper', amount: '1', unit: 'pinch' },
    ],
    instructions: [
      { id: '38', step: 1, description: 'Toast bread.' },
      { id: '39', step: 2, description: 'Mash avocado and spread on toast.' },
      { id: '40', step: 3, description: 'Fry egg.' },
      { id: '41', step: 4, description: 'Place egg on avocado toast.' },
      { id: '42', step: 5, description: 'Add salt and pepper.' },
    ],
  },
  {
    id: '9',
    title: 'Mango Smoothie',
    image: '/images/mango-smoothie.jpg',
    cookTime: '5 mins',
    servings: 1,
    rating: 4.5,
    category: 'Drinks',
    difficulty: 'Easy',
    ingredients: [
      { id: '51', name: 'Mango', amount: '1' },
      { id: '52', name: 'Yogurt', amount: '1', unit: 'cup' },
      { id: '53', name: 'Milk', amount: '1/2', unit: 'cup' },
      { id: '54', name: 'Honey', amount: '1', unit: 'tbsp' },
    ],
    instructions: [
      { id: '43', step: 1, description: 'Peel and chop mango.' },
      { id: '44', step: 2, description: 'Combine mango, yogurt, milk, and honey in a blender.' },
      { id: '45', step: 3, description: 'Blend until smooth.' },
    ],
  },
  {
    id: '10',
    title: 'Iced Coffee',
    image: '/images/iced-coffee.jpg',
    cookTime: '5 mins',
    servings: 1,
    rating: 4.3,
    category: 'Drinks',
    difficulty: 'Easy',
    ingredients: [
      { id: '55', name: 'Coffee', amount: '1', unit: 'cup' },
      { id: '56', name: 'Ice', amount: '1', unit: 'cup' },
      { id: '57', name: 'Milk', amount: '1/4', unit: 'cup' },
      { id: '58', name: 'Sugar', amount: '1', unit: 'tbsp' },
    ],
    instructions: [
      { id: '46', step: 1, description: 'Brew coffee.' },
      { id: '47', step: 2, description: 'Let coffee cool.' },
      { id: '48', step: 3, description: 'Fill glass with ice.' },
      { id: '49', step: 4, description: 'Pour coffee over ice.' },
      { id: '50', step: 5, description: 'Add milk and sugar.' },
    ],
  },
];

const initialUser: User = {
  id: 'user-1',
  name: 'Chef Lily',
  bio: 'Passionate about creating delicious and healthy recipes for everyone to enjoy.',
  avatar: '/images/user-avatar.png',
  favoriteRecipes: ['3', '4', '7'],
  myRecipes: ['1', '2', '5', '6', '8', '9', '10'],
};

const initialShoppingList: ShoppingListItem[] = [
  {
    id: 'sli-1',
    name: 'Pizza dough',
    amount: '1',
    unit: 'lb',
    checked: false,
    recipeId: '1',
    recipeName: 'Classic Margherita Pizza',
  },
  {
    id: 'sli-2',
    name: 'Fresh mozzarella',
    amount: '8',
    unit: 'oz',
    checked: true,
    recipeId: '1',
    recipeName: 'Classic Margherita Pizza',
  },
  {
    id: 'sli-3',
    name: 'Chicken breast',
    amount: '1.5',
    unit: 'lb',
    checked: false,
    recipeId: '2',
    recipeName: 'Spicy Chicken Tacos',
  },
];

interface RecipeStore {
  recipes: Recipe[];
  user: User;
  shoppingListItems: ShoppingListItem[];
  currentPage: number;
  recipesPerPage: number;
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'rating' | 'time' | 'difficulty';
  duplicatesRemoved: number;
  
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  
  updateUser: (userData: Partial<User>) => void;
  
  addShoppingListItem: (item: ShoppingListItem) => void;
  updateShoppingListItem: (itemId: string, updates: Partial<ShoppingListItem>) => void;
  deleteShoppingListItem: (itemId: string) => void;
  
  toggleFavorite: (recipeId: string) => void;
  
  setCurrentPage: (page: number) => void;
  setRecipesPerPage: (perPage: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: 'rating' | 'time' | 'difficulty') => void;
  initializeRecipes: () => void;
}

const isDuplicateRecipe = (recipe: Recipe, existingRecipes: Recipe[]): boolean => {
  return existingRecipes.some(existing => {
    // Check for exact title match
    if (existing.title.toLowerCase() === recipe.title.toLowerCase()) {
      return true;
    }
    
    // Check for similar titles (fuzzy matching)
    const similarity = calculateTitleSimilarity(existing.title, recipe.title);
    if (similarity > 0.8) {
      return true;
    }
    
    // Check for similar ingredient combinations
    const recipeIngredients = Array.isArray(recipe.ingredients) 
      ? recipe.ingredients.map(ing => typeof ing === 'string' ? ing : ing.name)
      : [];
    const existingIngredients = Array.isArray(existing.ingredients)
      ? existing.ingredients.map(ing => typeof ing === 'string' ? ing : ing.name)
      : [];
    
    const ingredientSimilarity = calculateIngredientSimilarity(recipeIngredients, existingIngredients);
    if (ingredientSimilarity > 0.9) {
      return true;
    }
    
    return false;
  });
};

const calculateTitleSimilarity = (title1: string, title2: string): number => {
  const words1 = title1.toLowerCase().split(' ');
  const words2 = title2.toLowerCase().split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

const calculateIngredientSimilarity = (ingredients1: string[], ingredients2: string[]): number => {
  if (ingredients1.length === 0 || ingredients2.length === 0) return 0;
  const common = ingredients1.filter(ing => ingredients2.includes(ing));
  return common.length / Math.max(ingredients1.length, ingredients2.length);
};

const generateRecipe = (id: string): Recipe => {
  const randomRating = Math.random() * (5 - 3) + 3;
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  return {
    id: id,
    title: `Generated Recipe ${id}`,
    image: `/images/recipe-${Math.floor(Math.random() * 6) + 1}.jpg`,
    cookTime: `${Math.floor(Math.random() * 60) + 10} mins`,
    servings: Math.floor(Math.random() * 4) + 1,
    rating: parseFloat(randomRating.toFixed(1)),
    category: categories[Math.floor(Math.random() * categories.length)] as 'Breakfast' | 'Lunch' | 'Dinner' | 'Desserts' | 'Snacks' | 'Drinks',
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'Easy' | 'Medium' | 'Hard',
    ingredients: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
      id: `ing-${id}-${i}`,
      name: `Ingredient ${i + 1}`,
      amount: `${Math.floor(Math.random() * 10) + 1}`,
      unit: 'oz',
    })),
    instructions: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
      id: `inst-${id}-${i}`,
      step: i + 1,
      description: `Step ${i + 1}: Do something`,
    })),
  };
};

const generateRecipes = (): Recipe[] => {
  return Array.from({ length: 5 }, (_, i) => generateRecipe(`gen-${i + 1}`));
};

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: initialRecipes,
  user: initialUser,
  shoppingListItems: initialShoppingList,
  currentPage: 1,
  recipesPerPage: 8,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'rating',
  duplicatesRemoved: 0,
  
  addRecipe: (recipe) => set(state => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (recipe) => set(state => ({
    recipes: state.recipes.map(r => r.id === recipe.id ? recipe : r)
  })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(r => r.id !== recipeId)
  })),
  
  updateUser: (userData) => set(state => ({
    user: { ...state.user, ...userData }
  })),
  
  addShoppingListItem: (item) => set(state => ({
    shoppingListItems: [...state.shoppingListItems, item]
  })),
  updateShoppingListItem: (itemId, updates) => set(state => ({
    shoppingListItems: state.shoppingListItems.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    )
  })),
  deleteShoppingListItem: (itemId) => set(state => ({
    shoppingListItems: state.shoppingListItems.filter(item => item.id !== itemId)
  })),
  
  toggleFavorite: (recipeId) => set(state => ({
    user: {
      ...state.user,
      favoriteRecipes: state.user.favoriteRecipes.includes(recipeId)
        ? state.user.favoriteRecipes.filter(id => id !== recipeId)
        : [...state.user.favoriteRecipes, recipeId]
    }
  })),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setRecipesPerPage: (perPage) => set({ recipesPerPage: perPage }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sortBy) => set({ sortBy: sortBy }),
  initializeRecipes: () => {
    const generatedRecipes = generateRecipes();
    const uniqueRecipes: Recipe[] = [];
    let duplicateCount = 0;
    
    generatedRecipes.forEach(recipe => {
      if (!isDuplicateRecipe(recipe, uniqueRecipes)) {
        uniqueRecipes.push(recipe);
      } else {
        duplicateCount++;
      }
    });
    
    set({ 
      recipes: uniqueRecipes,
      duplicatesRemoved: duplicateCount
    });
  }
}));
