import { Badge } from './ui/badge';
import { Button } from './ui/button';
import React, { memo } from 'react';

type MenuItemProps = {
  name: string;
  price: number;
  isBestSeller?: boolean;
  image: string;
  category?: string; // Sửa type string cho linh hoạt hơn
  onAddToCart: (e: React.MouseEvent) => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

// TỐI ƯU: Bọc component trong memo
export const MenuItem = memo(function MenuItem({ name, price, isBestSeller, image, category, onAddToCart }: MenuItemProps) {
  const getCategoryLabel = (cat?: string) => {
    switch (cat) {
      case 'appetizers': return 'Khai vị';
      case 'main': return 'Món chính';
      case 'desserts': return 'Tráng miệng';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative aspect-square bg-neutral-100 overflow-hidden">
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isBestSeller && (
            <Badge className="bg-amber-500 text-white border-0">
              ⭐ Best Seller
            </Badge>
          )}
          {category && (
            <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">
              {getCategoryLabel(category)}
            </Badge>
          )}
        </div>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" // Thêm hiệu ứng zoom nhẹ
          loading="lazy" // Tối ưu tải ảnh
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="text-neutral-900 font-medium line-clamp-2">{name}</span>
          <span className="font-bold text-lg whitespace-nowrap ml-2">{formatCurrency(price)}</span>
        </div>
        <div className="mt-auto">
          <Button 
            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-transform"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onAddToCart(e);
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
});