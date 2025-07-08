
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  gradient: string;
  onClick?: () => void;
}

const CategoryCard = ({ icon: Icon, title, count, gradient, onClick }: CategoryCardProps) => {
  return (
    <div
      className={`relative p-6 rounded-2xl cursor-pointer hover-scale transition-all duration-300 ${gradient} group`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <Icon className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{count} recipes</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default CategoryCard;
