import { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { Page } from '../App';
import { useIsMobile } from './ui/use-mobile';

type NavbarProps = {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  cartItemCount: number;
  isLoggedIn: boolean;
  currentUser: { email: string; name: string } | null;
  onLogin: () => void;
  onLogout: () => void;
};

export function Navbar({ currentPage, onPageChange, cartItemCount, isLoggedIn, currentUser, onLogin, onLogout }: NavbarProps) {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleMobileNavClick = (page: Page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    // [CHANGE 1]: Xóa padding (py-4 px-6) ở thẻ nav này. 
    // Chỉ giữ lại màu nền và sticky position.
    <nav className="bg-neutral-900 text-white sticky top-0 z-50 w-full border-b border-neutral-800 ">
      
      {/* [CHANGE 2]: Thêm padding (py-4 px-6) vào thẻ div container bên trong này.
         Điều này giúp nội dung cách lề, nhưng khung nav bên ngoài vẫn giữ nguyên cấu trúc chuẩn. */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:grid md:grid-cols-3 relative">
        
        {/* --- 1. LOGO --- */}
        <div className="flex items-center gap-2 md:justify-self-start">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
          <span className="tracking-wider">LOGOIPSUM</span>
        </div>

        {/* --- 2. DESKTOP MENU --- */}
        {!isMobile ? (
          // [FIX]: Dùng "space-x-12" thay cho "gap" để đảm bảo các nút cách nhau
          // space-x-12 tương đương khoảng cách 48px
          <div className="hidden md:flex items-center justify-center md:justify-self-center space-x-12">
            <button onClick={() => onPageChange('home')} className={`hover:text-neutral-300 transition-colors ${currentPage === 'home' ? 'text-white' : 'text-neutral-400'}`}>
              Trang chủ
            </button>
            <button onClick={() => onPageChange('menu')} className={`hover:text-neutral-300 transition-colors ${currentPage === 'menu' ? 'text-white' : 'text-neutral-400'}`}>
              Thực đơn
            </button>
            <button onClick={() => onPageChange('cart')} className={`hover:text-neutral-300 transition-colors relative ${currentPage === 'cart' ? 'text-white' : 'text-neutral-400'}`}>
              Giỏ hàng
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => onPageChange('history')} className={`hover:text-neutral-300 transition-colors ${currentPage === 'history' ? 'text-white' : 'text-neutral-400'}`}>
              Lịch sử
            </button>
          </div>
        ) : <div className="hidden"></div>}

        {/* --- 3. ACTIONS --- */}
        <div className="flex items-center gap-3 justify-end md:justify-self-end">
          {!isMobile && (
            isLoggedIn && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-neutral-900">
                    <User className="mr-2 h-4 w-4" />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm">{currentUser.name}</p>
                    <p className="text-xs text-neutral-500">{currentUser.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange('history')}>Lịch sử đặt bàn</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-neutral-900" onClick={onLogin}>
                Đăng nhập / Đăng ký
              </Button>
            )
          )}

          {isMobile && (
            <button className="text-white p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {/* [CHANGE 3]: Menu này nằm NGOÀI thẻ div container (thẻ có padding), 
         nhưng nằm TRONG thẻ nav (thẻ cha).
         -> Kết quả: Menu sẽ rộng 100% màn hình (w-full) và bắt đầu ngay mép dưới của Nav (top-full), 
            không bị padding làm ảnh hưởng.
      */}
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-800 shadow-xl flex flex-col p-4 animate-in slide-in-from-top-2 z-40">
           <div className="flex flex-col space-y-4 items-start">
            <button onClick={() => handleMobileNavClick('home')} className="py-2 text-neutral-400 hover:text-white w-full text-start flex items-start justify-start">Trang chủ</button>
            <button onClick={() => handleMobileNavClick('menu')} className="py-2 text-neutral-400 hover:text-white w-full text-start flex items-start justify-start">Thực đơn</button>
            <button onClick={() => handleMobileNavClick('cart')} className="py-2 text-neutral-400 hover:text-white w-full text-start flex items-start justify-start gap-2">
              Giỏ hàng {cartItemCount > 0 && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">{cartItemCount}</span>}
            </button>
            <button onClick={() => handleMobileNavClick('history')} className="py-2 text-neutral-400 hover:text-white w-full text-start flex items-start justify-start">Lịch sử</button>
            
            <div className="h-px bg-neutral-800 my-2 w-full"></div>
            
            {isLoggedIn && currentUser ? (
               <Button variant="outline" className="w-full border-neutral-700 text-neutral-300" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                 <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
               </Button>
            ) : (
               <Button variant="outline" className="w-full bg-white text-neutral-900" onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}>Đăng nhập</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}