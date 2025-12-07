import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Users, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { CartItem, Reservation } from '../App';

type ReservationPageProps = {
  cart: CartItem[];
  onSubmit: (reservation: Reservation) => void;
  onBack: () => void;
};

type TableStatus = 'available' | 'reserved';

const tables: Array<{ number: number; capacity: number; status: TableStatus }> = [
  { number: 1, capacity: 2, status: 'available' },
  { number: 2, capacity: 2, status: 'available' },
  { number: 3, capacity: 4, status: 'available' },
  { number: 4, capacity: 4, status: 'reserved' },
  { number: 5, capacity: 4, status: 'available' },
  { number: 6, capacity: 6, status: 'available' },
  { number: 7, capacity: 6, status: 'reserved' },
  { number: 8, capacity: 8, status: 'available' },
  { number: 9, capacity: 8, status: 'available' },
  { number: 10, capacity: 10, status: 'available' },
];

export function ReservationPage({ cart, onSubmit, onBack }: ReservationPageProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    time: '',
    notes: ''
  });

  // Auto-fill user info if logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const fullUserData = savedUsers.find((u: any) => u.email === user.email);
      
      if (fullUserData) {
        setFormData(prev => ({
          ...prev,
          name: fullUserData.name || '',
          email: fullUserData.email || '',
          phone: fullUserData.phone || ''
        }));
      }
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('Vui lòng chọn ngày');
      return;
    }

    if (!selectedTable) {
      toast.error('Vui lòng chọn bàn');
      return;
    }

    if (!formData.name || !formData.phone || !formData.time) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const reservation: Reservation = {
      tableNumber: selectedTable,
      date,
      time: formData.time,
      guests: parseInt(formData.guests),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      notes: formData.notes
    };

    onSubmit(reservation);
  };

  const guestsCount = parseInt(formData.guests);
  const availableTables = tables.filter(
    table => table.status === 'available' && table.capacity >= guestsCount
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại giỏ hàng
      </Button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Chọn Bàn</CardTitle>
              <CardDescription>
                Chọn bàn phù hợp với số lượng khách của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableTables.map((table) => (
                  <button
                    key={table.number}
                    onClick={() => setSelectedTable(table.number)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTable === table.number
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-1">Bàn {table.number}</div>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Users className="h-3 w-3" />
                        <span>{table.capacity}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {availableTables.length === 0 && (
                <p className="text-center text-neutral-500 py-8">
                  Không có bàn phù hợp. Vui lòng thay đổi số lượng khách.
                </p>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-900 rounded"></div>
                    <span>Đã chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-200 rounded"></div>
                    <span>Còn trống</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-neutral-300 border-2 border-neutral-300 rounded"></div>
                    <span>Đã đặt</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Thông Tin Đặt Bàn</CardTitle>
              <CardDescription>
                Vui lòng điền thông tin để hoàn tất đặt bàn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912345678"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Ngày *</Label>
                    <Popover>
                      <PopoverTrigger className="inline-flex items-center justify-start whitespace-nowrap rounded-md border border-neutral-200 bg-white px-3 py-2 w-full text-left hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'dd/MM/yyyy', { locale: vi }) : 'Chọn ngày'}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Giờ *</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Chọn giờ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00</SelectItem>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                        <SelectItem value="22:00">22:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Số người *</Label>
                    <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                      <SelectTrigger id="guests">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'người' : 'người'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú đặc biệt</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Yêu cầu đặc biệt (chế độ ăn kiêng, dị ứng, vị trí ngồi...)"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-neutral-900 text-white hover:bg-neutral-800">
                  Xem lại đơn đặt bàn →
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-neutral-500 text-center py-4">Chưa có món ăn</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>Tạm tính</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>Thuế (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span>Tổng cộng</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
