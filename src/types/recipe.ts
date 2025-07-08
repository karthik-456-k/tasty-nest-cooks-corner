
export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  rating: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Desserts' | 'Snacks' | 'Drinks';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: Instruction[];
  authorId?: string;
  createdAt?: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
  checked?: boolean;
}

export interface Instruction {
  id: string;
  step: number;
  description: string;
  image?: string;
  duration?: string;
}

export interface User {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  favoriteRecipes: string[];
  myRecipes: string[];
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  unit?: string;
  checked: boolean;
  recipeId: string;
  recipeName: string;
}
