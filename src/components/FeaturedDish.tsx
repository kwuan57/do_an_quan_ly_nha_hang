import { Badge } from './ui/badge';
import { Button } from './ui/button';

type FeaturedDishProps = {
  name: string;
  price: number;
  isBestSeller?: boolean;
  image: string;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

export function FeaturedDish({ name, price, isBestSeller, image }: FeaturedDishProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-neutral-100">
        {isBestSeller && (
          <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0">
            ⭐ Best Seller
          </Badge>
        )}
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-neutral-900">{name}</span>
          <span className="font-medium">{formatCurrency(price)}</span>
        </div>
        <Button className="w-full bg-neutral-900 text-white hover:bg-neutral-800">
          Thêm vào đơn đặt
        </Button>
      </div>
    </div>
  );
}
