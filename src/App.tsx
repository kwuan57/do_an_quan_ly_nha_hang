import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { ReservationPage } from './components/ReservationPage';
import { MyOrders } from './components/MyOrders';
import { BookingConfirmation } from './components/BookingConfirmation';
import { PaymentPage } from './components/PaymentPage';
import { BookingSuccess } from './components/BookingSuccess';
import { BookingHistory } from './components/BookingHistory';
import { LoginDialog } from './components/LoginDialog';
import { FoodDetailPage } from './components/FoodDetailPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Page = 'home' | 'menu' | 'reservation' | 'cart' | 'confirmation' | 'payment' | 'success' | 'history' | 'food-detail';

export type Reservation = {
  tableNumber: number;
  date: Date;
  time: string;
  guests: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [bookingHistory, setBookingHistory] = useState<Array<{ reservation: Reservation; cart: CartItem[]; code: string; timestamp: Date }>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const proceedToReservation = () => {
    if (!isLoggedIn) {
      toast.error('Vui lòng đăng nhập để đặt bàn');
      setShowLoginDialog(true);
      return;
    }
    
    if (cart.length === 0) {
      setCurrentPage('menu');
    } else {
      setCurrentPage('reservation');
    }
  };

  const handleLogin = (email: string, name: string) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name });
    localStorage.setItem('currentUser', JSON.stringify({ email, name }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCart([]);
    setReservation(null);
    setCurrentPage('home');
    toast.success('Đã đăng xuất');
  };

  const openLoginDialog = () => {
    setShowLoginDialog(true);
  };

  const navigateToPage = (page: Page, foodId?: string) => {
    setCurrentPage(page);
    if (foodId) {
      setSelectedFoodId(foodId);
    }
  };

  const submitReservation = (reservationData: Reservation) => {
    setReservation(reservationData);
    setCurrentPage('confirmation');
  };

  const confirmBooking = () => {
    setCurrentPage('payment');
  };

  const completePayment = () => {
    const code = `RES${Date.now().toString().slice(-8)}`;
    setBookingCode(code);
    
    if (reservation) {
      setBookingHistory(prev => [...prev, {
        reservation,
        cart: [...cart],
        code,
        timestamp: new Date()
      }]);
    }
    
    setCurrentPage('success');
  };

  const cancelBooking = () => {
    setReservation(null);
    setCurrentPage('reservation');
  };

  const cancelPayment = () => {
    setCurrentPage('confirmation');
  };

  const completeBooking = () => {
    setCart([]);
    setReservation(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogin={openLoginDialog}
        onLogout={handleLogout}
      />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={navigateToPage} />
      )}
      
      {currentPage === 'menu' && (
        <MenuPage onAddToCart={addToCart} onNavigate={navigateToPage} />
      )}

      {currentPage === 'food-detail' && (
        <FoodDetailPage
          foodId={selectedFoodId}
          onBack={() => setCurrentPage('menu')}
          onNavigate={navigateToPage}
          onAddToCart={addToCart}
        />
      )}
      
      {currentPage === 'cart' && (
        <MyOrders 
          cart={cart} 
          onUpdateQuantity={updateCartQuantity}
          onClearCart={clearCart}
          onProceedToReservation={proceedToReservation}
        />
      )}

      {currentPage === 'reservation' && (
        <ReservationPage 
          cart={cart}
          onSubmit={submitReservation}
          onBack={() => setCurrentPage('cart')}
        />
      )}

      {currentPage === 'confirmation' && reservation && (
        <BookingConfirmation
          reservation={reservation}
          cart={cart}
          onConfirm={confirmBooking}
          onCancel={cancelBooking}
        />
      )}

      {currentPage === 'payment' && reservation && (
        <PaymentPage
          reservation={reservation}
          cart={cart}
          totalAmount={cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1}
          onPaymentComplete={completePayment}
          onCancel={cancelPayment}
        />
      )}

      {currentPage === 'success' && (
        <BookingSuccess
          bookingCode={bookingCode}
          onComplete={completeBooking} onNavigate={function (page: Page): void {
            throw new Error('Function not implemented.');
          } }        />
      )}

      {currentPage === 'history' && (
        <BookingHistory
          history={bookingHistory}
          onNavigate={setCurrentPage}
        />
      )}
      
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
      />
      
      <Toaster />
    </div>
  );
}
