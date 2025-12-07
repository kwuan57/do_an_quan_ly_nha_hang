import { Button } from './ui/button';
import { FeaturedDish } from './FeaturedDish';
import type { Page } from '../App';
import { menuItems } from '../data/menuData';

const heroImage = 'https://images.unsplash.com/photo-1731941465921-eb4285693713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NjAwMzQ3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const restaurantImage = 'https://images.unsplash.com/photo-1759419038843-29749ac4cd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2MDEwOTI3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

type HomePageProps = {
  onNavigate: (page: Page, foodId?: string) => void;
};

// Get featured dishes from menuData (best sellers only, limit to 4)
const featuredDishes = menuItems.filter(item => item.isBestSeller).slice(0, 4);

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl mb-6">Trải nghiệm ẩm thực tuyệt vời</h1>
            <p className="mb-8 text-neutral-200 text-lg">
              Hương vị tinh tế từ những nguyên liệu tươi ngon nhất, kết hợp cùng không gian sang trọng và phục vụ tận tâm.
            </p>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => onNavigate('menu')}
                className="bg-white text-neutral-900 hover:bg-neutral-200"
                size="lg"
              >
                Xem thực đơn
              </Button>
              <Button 
                onClick={() => onNavigate('menu')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-neutral-900"
                size="lg"
              >
                Đặt bàn ngay
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-4">Featured Dishes</h2>
        <p className="text-neutral-600 mb-8">
          Delicious and earth, signature dishes, crafted with rice from ingredients and passion
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div key={dish.id} onClick={() => onNavigate('food-detail', dish.id)} className="cursor-pointer">
              <FeaturedDish {...dish} />
            </div>
          ))}
        </div>

        <div className="text-right mt-8">
          <button 
            onClick={() => onNavigate('menu')}
            className="text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View all →
          </button>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Giờ mở cửa</h2>
            <p className="text-neutral-300">Chúng tôi chào đón bạn trong khung giờ sau</p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg">
              <span>Thứ hai - Thứ sáu</span>
              <span className="bg-amber-600 px-4 py-2 rounded">08:00 - 22:00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg">
              <span>Thứ bảy</span>
              <span className="px-4 py-2">09:00 - 22:00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg">
              <span>Chủ nhật</span>
              <span className="text-neutral-400 px-4 py-2">Nghỉ</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="bg-neutral-900 h-80 rounded-lg bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${restaurantImage})`
            }}
          >
            <div className="p-8 text-white">
              <h2 className="text-3xl mb-4">VỀ CHÚNG TÔI</h2>
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-4">Nghệ thuật ẩm thực kết hợp với sự hiếu khách ấm áp</h3>
            <p className="text-neutral-600 mb-4">
              Niềm đam mê về sự hoàn hảo trong ẩm thực của chúng tôi đã được hun đúc qua nhiều thế hệ, kết hợp kỹ thuật truyền thống với sự sáng tạo hiện đại. Mỗi món ăn được chế biến từ những nguyên liệu địa phương tươi ngon nhất.
            </p>
            <div className="space-y-2 text-neutral-600">
              <p><strong>Địa chỉ:</strong> 123 Gourmet Street, Food District, City 55245</p>
              <p><strong>Điện thoại:</strong> +1 (555) 123-4567</p>
              <p><strong>Website:</strong> www.labellecuisine.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Dine */}
      <section 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h2 className="text-4xl mb-4">Sẵn sàng thưởng thức?</h2>
            <p className="mb-6 text-neutral-200">Đặt bàn ngay để trải nghiệm những món ăn tuyệt vời nhất</p>
            <Button 
              onClick={() => onNavigate('menu')}
              className="bg-white text-neutral-900 hover:bg-neutral-200"
              size="lg"
            >
              Bắt đầu đặt món
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
