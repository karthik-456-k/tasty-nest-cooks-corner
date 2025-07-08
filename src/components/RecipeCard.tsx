
import { Heart, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  rating: number;
  category: string;
  isFavorited?: boolean;
  onFavorite?: (id: string) => void;
}

const RecipeCard = ({
  id,
  title,
  image,
  cookTime,
  servings,
  rating,
  category,
  isFavorited = false,
  onFavorite
}: RecipeCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div 
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className={`bg-white/90 hover:bg-white rounded-full transition-colors ${
              isFavorited ? 'text-red-500' : 'text-gray-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(id);
            }}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-peach-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-peach-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{cookTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
