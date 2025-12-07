import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { QrCode, CheckCircle2, Clock, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import type { Reservation, CartItem } from '../App';

type PaymentPageProps = {
  reservation: Reservation;
  cart: CartItem[];
  totalAmount: number;
  onPaymentComplete: () => void;
  onCancel: () => void;
};

export function PaymentPage({ reservation, cart, totalAmount, onPaymentComplete, onCancel }: PaymentPageProps) {
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  // Payment information
  const bankInfo = {
    bankName: 'Ngân hàng TMCP Á Châu (ACB)',
    accountNumber: '123456789',
    accountName: 'NHA HANG LOGOIPSUM',
    amount: totalAmount.toFixed(2),
    content: `RES${Date.now().toString().slice(-8)} ${reservation.customerName}`
  };

  // Generate QR content (VietQR format)
  const qrContent = `00020101021238570010A00000072701270006970436011${bankInfo.accountNumber}0208QRIBFTTA53037045802VN62${String(bankInfo.content.length).padStart(2, '0')}${bankInfo.content}6304`;

  useEffect(() => {
    if (countdown > 0 && paymentStatus === 'pending') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      toast.error('Hết thời gian thanh toán');
      onCancel();
    }
  }, [countdown, paymentStatus, onCancel]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = () => {
    setPaymentStatus('processing');
    // Simulate payment verification
    setTimeout(() => {
      setPaymentStatus('completed');
      toast.success('Thanh toán thành công!');
      setTimeout(() => {
        onPaymentComplete();
      }, 1500);
    }, 2000);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Thanh toán đặt bàn</h1>
        <p className="text-neutral-600">Quét mã QR để hoàn tất thanh toán</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quét mã QR để thanh toán</span>
              <div className="flex items-center gap-2 text-sm font-normal">
                <Clock className="h-4 w-4" />
                <span className={countdown < 60 ? 'text-red-600' : 'text-neutral-600'}>
                  {formatTime(countdown)}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentStatus === 'pending' && (
              <>
                <div className="bg-white p-6 rounded-lg flex justify-center mb-6 border-2 border-neutral-200">
                  <div className="relative">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrContent)}`}
                      alt="QR Code thanh toán"
                      className="w-64 h-64"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <QrCode className="h-8 w-8 text-neutral-900" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <QrCode className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Cách thanh toán:</p>
                      <ol className="text-blue-800 space-y-1">
                        <li>1. Mở app Banking của bạn</li>
                        <li>2. Chọn "Quét mã QR" hoặc "Chuyển khoản"</li>
                        <li>3. Quét mã QR hoặc nhập thông tin bên dưới</li>
                        <li>4. Xác nhận và hoàn tất thanh toán</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-medium mb-3">Thông tin chuyển khoản</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between p-3 bg-neutral-50 rounded">
                      <span className="text-neutral-600">Ngân hàng:</span>
                      <span className="font-medium">{bankInfo.bankName}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-neutral-50 rounded">
                      <span className="text-neutral-600">Số tài khoản:</span>
                      <span className="font-medium">{bankInfo.accountNumber}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-neutral-50 rounded">
                      <span className="text-neutral-600">Chủ tài khoản:</span>
                      <span className="font-medium">{bankInfo.accountName}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-amber-50 rounded">
                      <span className="text-neutral-600">Số tiền:</span>
                      <span className="font-medium text-amber-600">${bankInfo.amount}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-red-50 rounded">
                      <span className="text-neutral-600">Nội dung CK:</span>
                      <span className="font-medium text-red-600">{bankInfo.content}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Lưu ý:</strong> Vui lòng giữ ĐÚNG nội dung chuyển khoản để đơn hàng được xử lý tự động.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Tôi đã thanh toán
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                </div>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="text-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full mx-auto mb-4"></div>
                <p className="text-lg mb-2">Đang xác nhận thanh toán...</p>
                <p className="text-neutral-600 text-sm">Vui lòng đợi trong giây lát</p>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-lg mb-2">Thanh toán thành công!</p>
                <p className="text-neutral-600 text-sm">Đang chuyển đến trang xác nhận...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đặt bàn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Số bàn:</span>
                  <span className="font-medium">Bàn {reservation.tableNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ngày:</span>
                  <span className="font-medium">{reservation.date.toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Giờ:</span>
                  <span className="font-medium">{reservation.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Số khách:</span>
                  <span className="font-medium">{reservation.guests} người</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-neutral-600">Tên:</span> {reservation.customerName}</p>
                  <p><span className="text-neutral-600">SĐT:</span> {reservation.customerPhone}</p>
                  <p><span className="text-neutral-600">Email:</span> {reservation.customerEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-neutral-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Tạm tính:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Thuế (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="text-xl font-medium">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Thanh toán an toàn</p>
                <p>Giao dịch được mã hóa và bảo mật. Chúng tôi không lưu trữ thông tin thẻ của bạn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
