
import { ChefHat, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-peach-50 to-mint-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-peach-500" />
            <span className="text-sm font-medium text-gray-700">Trending recipes this week</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-peach-500 via-peach-600 to-mint-500 bg-clip-text text-transparent">
              Favorite Recipe
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of home cooks sharing delicious recipes, cooking tips, and culinary adventures. 
            From quick weeknight dinners to special occasion treats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-peach-500 hover:bg-peach-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover-scale">
              <ChefHat className="w-5 h-5 mr-2" />
              Explore Recipes
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-peach-300 text-peach-600 hover:bg-peach-50 px-8 py-3 rounded-full font-semibold">
              Create Recipe
            </Button>
          </div>

          {/* Featured Recipe Preview */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-2 animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
                alt="Featured Recipe"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="p-6 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-mint-100 text-mint-700 px-3 py-1 rounded-full text-sm font-medium">
                    Trending
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="text-yellow-400 mr-1">★★★★★</span>
                    <span>4.8 (124)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Mediterranean Quinoa Bowl</h3>
                <p className="text-gray-600 text-sm">Fresh, healthy, and packed with flavor - perfect for lunch or dinner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
