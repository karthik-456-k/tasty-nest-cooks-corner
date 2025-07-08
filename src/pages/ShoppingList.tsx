
import { Trash2, ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const ShoppingList = () => {
  const { shoppingList, toggleShoppingListItem, clearShoppingList } = useRecipeStore();
  const { toast } = useToast();

  const handleClearList = () => {
    clearShoppingList();
    toast({
      title: "Shopping list cleared",
      description: "All items have been removed from your shopping list"
    });
  };

  const checkedItems = shoppingList.filter(item => item.checked);
  const uncheckedItems = shoppingList.filter(item => !item.checked);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shopping List</h1>
              <p className="text-muted-foreground">
                {shoppingList.length} items • {checkedItems.length} completed
              </p>
            </div>
            {shoppingList.length > 0 && (
              <Button
                onClick={handleClearList}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear List
              </Button>
            )}
          </div>

          {shoppingList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-cream-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your shopping list is empty</h3>
              <p className="text-muted-foreground mb-4">
                Add ingredients from recipes to start building your shopping list
              </p>
              <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Browse Recipes
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Unchecked Items */}
              {uncheckedItems.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">To Buy ({uncheckedItems.length})</h2>
                  <div className="space-y-3">
                    {uncheckedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleShoppingListItem(item.id)}
                        />
                        <div className="flex-1">
                          <div className="font-medium">
                            {item.amount} {item.unit} {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            From: {item.recipeName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checked Items */}
              {checkedItems.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
                    Completed ({checkedItems.length})
                  </h2>
                  <div className="space-y-3">
                    {checkedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors opacity-60"
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleShoppingListItem(item.id)}
                        />
                        <div className="flex-1">
                          <div className="font-medium line-through">
                            {item.amount} {item.unit} {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            From: {item.recipeName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingList;
