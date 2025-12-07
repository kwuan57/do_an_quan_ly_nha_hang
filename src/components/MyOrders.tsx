import { useMemo } from 'react'; // Import useMemo
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { CartItem } from '../App';

type MyOrdersProps = {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  onProceedToReservation: () => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

export function MyOrders({ cart, onUpdateQuantity, onClearCart, onProceedToReservation }: MyOrdersProps) {
  
  // TỐI ƯU: Tính toán totals bằng useMemo
  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const t = sub * 0.1;
    return {
      subtotal: sub,
      tax: t,
      total: sub + t
    };
  }, [cart]); // Chỉ tính lại khi cart thay đổi

  const handleClearCart = () => {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả món ăn?')) {
      onClearCart();
      toast.success('Đã xóa tất cả món ăn');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Giỏ hàng của bạn</h1>
          <p className="text-neutral-600">
            {cart.length > 0 ? `Bạn đang có ${cart.length} món trong giỏ` : 'Giỏ hàng đang trống'}
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <Card className="text-center py-16 bg-neutral-50 border-dashed">
          <CardContent className="flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Chưa có món ăn nào</h3>
            <p className="text-neutral-500 mb-6">Hãy quay lại thực đơn để chọn món ngon nhé</p>
            {/* Nút quay lại sẽ được xử lý bởi component cha hoặc thêm prop onNavigate */}
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex p-4 gap-4">
                  <div className="h-24 w-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                        title="Xóa món này"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center gap-3 bg-neutral-50 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md hover:bg-white hover:shadow-sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-lg">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg border-neutral-200">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-neutral-600">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Thuế (10%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t border-dashed border-neutral-300 pt-3 mt-3 flex justify-between items-center">
                    <span className="font-medium text-lg">Tổng cộng</span>
                    <span className="font-bold text-xl text-neutral-900">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={onProceedToReservation}
                  className="w-full bg-neutral-900 text-white hover:bg-neutral-800 py-6 text-base mt-4 group"
                >
                  Tiếp tục đặt bàn
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleClearCart}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Xóa giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}