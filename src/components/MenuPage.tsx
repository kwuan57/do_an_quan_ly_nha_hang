import { useState } from 'react';
import { MenuItem } from './MenuItem';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import type { CartItem, Page } from '../App';
import { menuItems } from '../data/menuData';

type MenuPageProps = {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onNavigate: (page: Page, foodId?: string) => void;
};

type Category = 'all' | 'appetizers' | 'main' | 'desserts';

const ITEMS_PER_PAGE = 9;

export function MenuPage({ onAddToCart, onNavigate }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Thực Đơn</h1>
        <p className="text-neutral-600 mb-4">Khám phá các món ăn ngon của chúng tôi</p>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-3">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleCategoryChange('all')}
          >
            Tất cả món
          </Button>
          <Button
            variant={selectedCategory === 'appetizers' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleCategoryChange('appetizers')}
          >
            Khai vị
          </Button>
          <Button
            variant={selectedCategory === 'main' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleCategoryChange('main')}
          >
            Món chính
          </Button>
          <Button
            variant={selectedCategory === 'desserts' ? 'default' : 'outline'}
            className="w-full justify-start"
            onClick={() => handleCategoryChange('desserts')}
          >
            Tráng miệng
          </Button>
        </div>

        {/* Menu Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedItems.map((item) => (
              <div key={item.id} className="group">
                <div onClick={() => onNavigate('food-detail', item.id)} className="cursor-pointer">
                  <MenuItem 
                    name={item.name}
                    price={item.price}
                    isBestSeller={item.isBestSeller}
                    image={item.image}
                    category={item.category}
                    onAddToCart={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
