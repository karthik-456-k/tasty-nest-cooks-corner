
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-peach-400 to-peach-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-peach-500 to-peach-600 bg-clip-text text-transparent">
              TastyNest
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search recipes, ingredients..."
              className="pl-10 pr-4 bg-cream-50 border-cream-200 focus:border-peach-300 rounded-full"
            />
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-cream-100 rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-cream-100 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-cream-100 rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search recipes..."
              className="pl-10 pr-4 bg-cream-50 border-cream-200 focus:border-peach-300 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
