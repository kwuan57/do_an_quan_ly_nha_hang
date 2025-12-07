import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Users, MapPin, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Page, Reservation, CartItem } from '../App';

type BookingHistoryProps = {
  history: Array<{
    reservation: Reservation;
    cart: CartItem[];
    code: string;
    timestamp: Date;
  }>;
  onNavigate: (page: Page) => void;
};

export function BookingHistory({ history, onNavigate }: BookingHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Lịch sử đặt bàn</CardTitle>
            <CardDescription>
              Xem lại các đơn đặt bàn của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-6">Bạn chưa có đơn đặt bàn nào</p>
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Xem thực đơn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Lịch sử đặt bàn</h1>
        <p className="text-neutral-600">Xem lại các đơn đặt bàn của bạn</p>
      </div>

      <div className="space-y-6">
        {history.map((booking, index) => {
          const subtotal = booking.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
          const tax = subtotal * 0.1;
          const total = subtotal + tax;
          
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Mã đặt bàn: {booking.code}</CardTitle>
                    <CardDescription>
                      Đặt lúc {format(booking.timestamp, 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Đã xác nhận
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Reservation Details */}
                  <div className="space-y-3">
                    <h3 className="mb-3">Thông tin đặt bàn</h3>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-neutral-600" />
                      <span>Bàn {booking.reservation.tableNumber}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-neutral-600" />
                      <span>{format(booking.reservation.date, 'dd/MM/yyyy', { locale: vi })}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-neutral-600" />
                      <span>{booking.reservation.time}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Users className="h-4 w-4 text-neutral-600" />
                      <span>{booking.reservation.guests} người</span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Món ăn đã đặt
                    </h3>
                    
                    {booking.cart.length > 0 ? (
                      <div className="space-y-2">
                        {booking.cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t flex justify-between">
                          <span>Tổng cộng</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500">Không có món ăn</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => onNavigate('menu')}
          className="bg-neutral-900 text-white hover:bg-neutral-800"
        >
          Đặt bàn mới
        </Button>
      </div>
    </div>
  );
}
