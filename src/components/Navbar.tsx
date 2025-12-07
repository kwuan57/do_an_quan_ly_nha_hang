import { useState, useEffect } from 'react';
import { User, LogOut, Menu, X } from 'lucide-react'; // Đã bỏ ShoppingCart thừa nếu không dùng icon này ở nav
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

  // [GIẢI PHÁP MỚI]: Thêm trực tiếp px-4 (padding) và mx-2 (margin) vào class của nút
  // Điều này ép buộc các chữ phải cách nhau ra bất kể flex container có lỗi hay không.
  const getNavLinkClass = (page: Page) => 
    `text-sm font-medium transition-colors hover:text-neutral-300 px-4 py-2 mx-1 ${
      currentPage === page ? 'text-white' : 'text-neutral-400'
    }`;

  return (
    <nav className="bg-neutral-900 text-white sticky top-0 z-50 w-full border-b border-neutral-800">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:grid md:grid-cols-3 relative">
        
        {/* --- 1. LOGO --- */}
        <div className="flex items-center gap-2 justify-self-start">
          <span className="tracking-wider font-bold">Kwuan Restaurant</span>
        </div>

        {/* --- 2. DESKTOP MENU --- */}
        {/* [THAY ĐỔI]: Xóa gap/space ở đây. Để các button tự đẩy nhau bằng class bên trong */}
        {!isMobile && (
          <div className="hidden md:flex items-center justify-center justify-self-center w-full">
            <button onClick={() => onPageChange('home')} className={getNavLinkClass('home')}>
              Trang chủ
            </button>
            <button onClick={() => onPageChange('menu')} className={getNavLinkClass('menu')}>
              Thực đơn
            </button>
            <button onClick={() => onPageChange('cart')} className={`relative ${getNavLinkClass('cart')}`}>
              Giỏ hàng
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => onPageChange('history')} className={getNavLinkClass('history')}>
              Lịch sử
            </button>
          </div>
        )}

        {/* --- 3. ACTIONS --- */}
        <div className="flex items-center gap-3 justify-end justify-self-end">
          {!isMobile && (
            isLoggedIn && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent border-neutral-700 text-white hover:bg-white hover:text-neutral-900 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-neutral-900 border-neutral-800 text-white">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-neutral-400">{currentUser.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  <DropdownMenuItem className="focus:bg-neutral-800 focus:text-white cursor-pointer" onClick={() => onPageChange('history')}>
                    Lịch sử đặt bàn
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  <DropdownMenuItem className="focus:bg-neutral-800 focus:text-white cursor-pointer text-red-400 focus:text-red-400" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="bg-white text-neutral-900 hover:bg-neutral-200 border-transparent font-medium" onClick={onLogin}>
                Đăng nhập
              </Button>
            )
          )}

          {isMobile && (
            <button className="text-white p-1 hover:bg-neutral-800 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-900 border-t border-neutral-800 shadow-xl flex flex-col p-4 animate-in slide-in-from-top-2 z-40">
           <div className="flex flex-col space-y-4">
            <button onClick={() => handleMobileNavClick('home')} className="py-2 text-neutral-400 hover:text-white text-left font-medium">Trang chủ</button>
            <button onClick={() => handleMobileNavClick('menu')} className="py-2 text-neutral-400 hover:text-white text-left font-medium">Thực đơn</button>
            <button onClick={() => handleMobileNavClick('cart')} className="py-2 text-neutral-400 hover:text-white text-left font-medium flex items-center gap-2">
              Giỏ hàng {cartItemCount > 0 && <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{cartItemCount}</span>}
            </button>
            <button onClick={() => handleMobileNavClick('history')} className="py-2 text-neutral-400 hover:text-white text-left font-medium">Lịch sử</button>
            
            <div className="h-px bg-neutral-800 my-2 w-full"></div>
            
            {isLoggedIn && currentUser ? (
              <div className="flex flex-col gap-3">
                 <div className="text-sm text-neutral-500 px-1">
                    Xin chào, <span className="text-neutral-300">{currentUser.name}</span>
                 </div>
                 <Button variant="outline" className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white justify-start" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                   <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                 </Button>
              </div>
            ) : (
               <Button className="w-full bg-white text-neutral-900 hover:bg-neutral-200 font-medium" onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}>Đăng nhập / Đăng ký</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}