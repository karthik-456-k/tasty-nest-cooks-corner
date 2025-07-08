
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useToast } from '@/hooks/use-toast';
import { Recipe, Ingredient, Instruction } from '@/types/recipe';
import Navigation from '@/components/Navigation';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipeStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: '' as Recipe['category'] | '',
    difficulty: '' as Recipe['difficulty'] | '',
    cookTime: '',
    servings: 1,
    image: ''
  });

  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id' | 'checked'>[]>([
    { name: '', amount: '', unit: '' }
  ]);

  const [instructions, setInstructions] = useState<Omit<Instruction, 'id'>[]>([
    { step: 1, description: '', duration: '' }
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { 
      step: instructions.length + 1, 
      description: '', 
      duration: '' 
    }]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const updated = instructions.filter((_, i) => i !== index);
      // Reorder steps
      const reordered = updated.map((inst, i) => ({ ...inst, step: i + 1 }));
      setInstructions(reordered);
    }
  };

  const updateInstruction = (index: number, field: keyof Instruction, value: string) => {
    const updated = [...instructions];
    updated[index] = { ...updated[index], [field]: value };
    setInstructions(updated);
  };

  const handleSubmit = (isDraft = false) => {
    if (!formData.title || !formData.category || !formData.difficulty) {
      toast({
        title: "Please fill in all required fields",
        description: "Title, category, and difficulty are required",
        variant: "destructive"
      });
      return;
    }

    const recipe = {
      title: formData.title,
      category: formData.category,
      difficulty: formData.difficulty,
      cookTime: formData.cookTime || '30 min',
      servings: formData.servings,
      image: formData.image || 'https://images.unsplash.com/photo-1495521821757-a2efb71c10ce?auto=format&fit=crop&w=600&q=80',
      rating: 0,
      ingredients: ingredients.map((ing, i) => ({
        ...ing,
        id: `ing-${i}`,
        checked: false
      })),
      instructions: instructions.map((inst, i) => ({
        ...inst,
        id: `inst-${i}`
      }))
    };

    addRecipe(recipe);
    
    toast({
      title: isDraft ? "Recipe saved as draft" : "Recipe published!",
      description: isDraft ? "Your recipe has been saved" : "Your recipe is now live"
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-cream-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>

          <div className="bg-card rounded-3xl p-8 shadow-sm">
            {/* Basic Info */}
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="title" className="text-lg font-semibold">Recipe Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter recipe title..."
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value as Recipe['category']})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                      <SelectItem value="Drinks">Drinks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value as Recipe['difficulty']})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cookTime" className="text-sm font-medium">Cook Time</Label>
                  <Input
                    id="cookTime"
                    value={formData.cookTime}
                    onChange={(e) => setFormData({...formData, cookTime: e.target.value})}
                    placeholder="e.g., 30 min"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servings" className="text-sm font-medium">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value) || 1})}
                    min="1"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="image" className="text-sm font-medium">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ingredients</h2>
                <Button onClick={addIngredient} size="sm" className="bg-mint-500 hover:bg-mint-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <Input
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="w-24"
                    />
                    <Input
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      placeholder="Unit"
                      className="w-24"
                    />
                    <Input
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      placeholder="Ingredient name"
                      className="flex-1"
                    />
                    <Button
                      onClick={() => removeIngredient(index)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Instructions</h2>
                <Button onClick={addInstruction} size="sm" className="bg-peach-500 hover:bg-peach-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </Button>
              </div>

              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-peach-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {instruction.step}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={instruction.description}
                        onChange={(e) => updateInstruction(index, 'description', e.target.value)}
                        placeholder="Describe this step..."
                        className="min-h-[60px]"
                      />
                      <Input
                        value={instruction.duration}
                        onChange={(e) => updateInstruction(index, 'duration', e.target.value)}
                        placeholder="Duration (optional)"
                        className="w-32"
                      />
                    </div>
                    <Button
                      onClick={() => removeInstruction(index)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => handleSubmit(true)}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Save Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                className="bg-peach-500 hover:bg-peach-600 text-white"
              >
                Publish Recipe
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRecipe;
