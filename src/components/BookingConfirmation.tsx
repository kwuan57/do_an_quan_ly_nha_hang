import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Calendar, Clock, Users, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { CartItem, Reservation } from '../App';

type BookingConfirmationProps = {
  reservation: Reservation;
  cart: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
};

// Hàm tiện ích để format tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

export function BookingConfirmation({ reservation, cart, onConfirm, onCancel }: BookingConfirmationProps) {
  // Tính toán tổng tiền
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% VAT
  const total = subtotal + tax;

  // Đảm bảo date là đối tượng Date hợp lệ để tránh lỗi crash
  const reservationDate = typeof reservation.date === 'string' 
    ? new Date(reservation.date) 
    : reservation.date;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card>
        <CardHeader>=
          <CardTitle className="text-3xl font-bold">Xác nhận đơn đặt bàn</CardTitle>
          <CardDescription>
            Vui lòng kiểm tra kỹ thông tin trước khi xác nhận
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reservation Details */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Thông tin đặt bàn</h3>
            <div className="bg-neutral-50 rounded-lg p-6 space-y-3 border border-neutral-100">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Số bàn:</span>
                  <span className="ml-2 font-medium">Bàn {reservation.tableNumber}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Ngày:</span>
                  <span className="ml-2 font-medium">
                    {format(reservationDate, 'EEEE, dd MMMM yyyy', { locale: vi })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Giờ:</span>
                  <span className="ml-2 font-medium">{reservation.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Số người:</span>
                  <span className="ml-2 font-medium">{reservation.guests} người</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Thông tin khách hàng</h3>
            <div className="bg-neutral-50 rounded-lg p-6 space-y-3 border border-neutral-100">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Tên:</span>
                  <span className="ml-2 font-medium">{reservation.customerName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-neutral-600" />
                <div>
                  <span className="text-neutral-600">Số điện thoại:</span>
                  <span className="ml-2 font-medium">{reservation.customerPhone}</span>
                </div>
              </div>

              {reservation.customerEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-neutral-600" />
                  <div>
                    <span className="text-neutral-600">Email:</span>
                    <span className="ml-2 font-medium">{reservation.customerEmail}</span>
                  </div>
                </div>
              )}

              {reservation.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-neutral-600 mt-1" />
                  <div>
                    <span className="text-neutral-600">Ghi chú:</span>
                    <p className="ml-2 text-neutral-700 italic">{reservation.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Món ăn đã đặt</h3>
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-100">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm sm:text-base">
                      <span>{item.name} <span className="text-neutral-500">x{item.quantity}</span></span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2">
                    <div className="flex justify-between text-neutral-600">
                      <span>Tạm tính</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Thuế (10%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-200 text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-neutral-900">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-2">
             {/* Thêm icon cảnh báo nhỏ nếu muốn hoặc giữ nguyên */}
            <p className="text-sm text-amber-900">
              <strong>Lưu ý:</strong> Vui lòng đến đúng giờ. Nếu trễ quá 15 phút, chúng tôi có thể hủy đặt bàn của bạn.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Quay lại chỉnh sửa
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
          >
            Xác nhận đặt bàn
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}