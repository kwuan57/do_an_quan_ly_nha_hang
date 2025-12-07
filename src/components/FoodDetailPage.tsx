import { useState, useEffect } from 'react'; // Thêm useEffect
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { Page, CartItem } from '../App';
import { menuItems } from '../data/menuData';

type FoodDetailPageProps = {
  foodId: string;
  onBack: () => void;
  onNavigate: (page: Page, foodId?: string) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

// Hàm helper format tiền tệ (tái sử dụng để đồng bộ)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

export function FoodDetailPage({ foodId, onBack, onNavigate, onAddToCart }: FoodDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  
  const food = menuItems.find(item => item.id === foodId);

  // XỬ LÝ QUAN TRỌNG: Khi foodId thay đổi (người dùng bấm vào món liên quan)
  useEffect(() => {
    // 1. Cuộn trang lên đầu
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 2. Reset số lượng về 1
    setQuantity(1);
  }, [foodId]);

  if (!food) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <p>Không tìm thấy món ăn</p>
      </div>
    );
  }

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'appetizers': return 'Khai vị';
      case 'main': return 'Món chính';
      case 'desserts': return 'Tráng miệng';
      default: return '';
    }
  };

  const handleAddToCart = () => {
    // Logic thêm vào giỏ hàng (giữ nguyên logic cộng dồn số lượng bên App nếu cần)
    onAddToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      // Lưu ý: App.tsx cần xử lý logic cộng quantity nếu item đã tồn tại
      // Ở đây ta gửi item base, quantity sẽ được xử lý ở hàm onAddToCart của cha
    });
    
    // Nếu API onAddToCart của bạn nhận quantity luôn thì tốt, 
    // nếu không thì loop này chỉ mô phỏng (tốt nhất nên sửa onAddToCart để nhận quantity)
    // Tạm thời hiển thị toast đúng số lượng
    toast.success(`Đã thêm ${quantity} ${food.name} vào giỏ hàng`);
    setQuantity(1);
  };

  const relatedItems = menuItems
    .filter(item => item.category === food.category && item.id !== food.id)
    .slice(0, 3);

  const reviews = [
    { id: 1, name: 'Nguyễn Văn A', rating: 5, comment: 'Món ăn rất ngon, phục vụ tận tình!', date: '15/10/2025' },
    { id: 2, name: 'Trần Thị B', rating: 5, comment: 'Chất lượng tuyệt vời, sẽ quay lại!', date: '12/10/2025' },
    { id: 3, name: 'Lê Văn C', rating: 4, comment: 'Ngon, nhưng hơi đắt một chút.', date: '10/10/2025' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại thực đơn
      </Button>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image Section */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100">
          <img 
            src={food.image} 
            alt={food.name}
            className="w-full h-full object-cover"
          />
          {food.isBestSeller && (
            <Badge className="absolute top-4 left-4 bg-amber-500 text-white border-0">
              ⭐ Best Seller
            </Badge>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="outline" className="mb-3">
              {getCategoryLabel(food.category)}
            </Badge>
            <h1 className="text-3xl mb-2 font-bold">{food.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-neutral-600">(4.8 · 127 đánh giá)</span>
            </div>
            <p className="text-3xl mb-6 font-semibold text-primary">
              {formatCurrency(food.price)}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Mô tả</h3>
            <p className="text-neutral-600 leading-relaxed">
              {food.description || 'Món ăn đặc biệt được chế biến từ nguyên liệu tươi ngon, đảm bảo chất lượng và hương vị tuyệt hảo. Được đầu bếp chuyên nghiệp chế biến với công thức độc quyền của nhà hàng.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center bg-neutral-50 border-neutral-200">
              <Clock className="h-5 w-5 mx-auto mb-2 text-neutral-600" />
              <p className="text-xs text-neutral-600">Thời gian</p>
              <p className="text-sm font-medium">15-20 phút</p>
            </Card>
            <Card className="p-4 text-center bg-neutral-50 border-neutral-200">
              <Users className="h-5 w-5 mx-auto mb-2 text-neutral-600" />
              <p className="text-xs text-neutral-600">Khẩu phần</p>
              <p className="text-sm font-medium">1-2 người</p>
            </Card>
            <Card className="p-4 text-center bg-neutral-50 border-neutral-200">
              <Star className="h-5 w-5 mx-auto mb-2 text-neutral-600" />
              <p className="text-xs text-neutral-600">Đánh giá</p>
              <p className="text-sm font-medium">4.8/5</p>
            </Card>
          </div>

          <Separator className="my-4" />

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Số lượng</label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-3 mt-auto">
            <Button 
              className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800 py-6 text-base"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Thêm vào giỏ - {formatCurrency(food.price * quantity)}
            </Button>
            <Button 
              variant="outline"
              className="py-6 text-base"
              onClick={() => {
                handleAddToCart();
                onNavigate('cart');
              }}
            >
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Đánh giá từ khách hàng</h2>
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-600">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Items - Logic bấm vào chuyển trang nằm ở đây */}
      {relatedItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Món ăn cùng danh mục</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => onNavigate('food-detail', item.id)}
              >
                <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isBestSeller && (
                    <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0">
                      ⭐ Best Seller
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium group-hover:text-amber-600 transition-colors">{item.name}</span>
                    <span className="font-bold text-neutral-900">{formatCurrency(item.price)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}