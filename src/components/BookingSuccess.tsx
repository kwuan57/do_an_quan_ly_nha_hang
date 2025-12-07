import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { CheckCircle, Copy, Home, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import type { Page } from '../App';

type BookingSuccessProps = {
  bookingCode: string;
  onComplete: () => void;
  onNavigate: (page: Page) => void; // Thêm prop để chuyển trang
};

export function BookingSuccess({ bookingCode, onComplete, onNavigate }: BookingSuccessProps) {
  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingCode);
    toast.success('Đã sao chép mã đặt bàn');
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Card className="text-center shadow-lg border-green-100">
        <CardHeader>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-neutral-900">Đặt bàn thành công!</h1>
            <p className="text-neutral-600">
              Cảm ơn bạn đã lựa chọn nhà hàng chúng tôi.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Mã đặt bàn của bạn</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-bold tracking-wider text-neutral-900">{bookingCode}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyBookingCode}
                className="hover:bg-neutral-200"
                title="Sao chép"
              >
                <Copy className="h-5 w-5 text-neutral-600" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-neutral-600 space-y-2 bg-blue-50 p-4 rounded-lg text-left">
            <p>📧 Một email xác nhận đã được gửi đến hộp thư của bạn.</p>
            <p>📸 Vui lòng chụp màn hình hoặc lưu mã này để check-in.</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={() => onNavigate('history')}
            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 h-12 text-base"
          >
            <Receipt className="mr-2 h-4 w-4" /> Xem đơn đặt bàn
          </Button>
          <Button
            variant="ghost"
            onClick={onComplete}
            className="w-full h-12 text-base"
          >
            <Home className="mr-2 h-4 w-4" /> Quay về trang chủ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}