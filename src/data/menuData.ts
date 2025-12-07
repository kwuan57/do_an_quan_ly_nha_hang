export type MenuCategory = 'appetizers' | 'main' | 'desserts';

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  isBestSeller: boolean;
  image: string;
  description?: string;
};

export const menuItems: MenuItem[] = [
  { 
    id: '1', 
    name: 'Tôm Tempura Nhật Bản', 
    price: 24.00, 
    category: 'appetizers', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1715187935352-728a800d663d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBldGl6ZXIlMjBmb29kJTIwcGxhdGluZ3xlbnwxfHx8fDE3NjAxMTAxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tôm tươi được tuyển chọn kỹ lưỡng, chiên giòn với lớp bột tempura mỏng nhẹ theo công thức truyền thống Nhật Bản. Được phục vụ kèm sốt tentsuyu đặc biệt và rau củ tươi ngon.'
  },
  { 
    id: '2', 
    name: 'Súp Bí Đỏ Kem', 
    price: 16.00, 
    category: 'appetizers', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMDg1MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Súp bí đỏ béo ngậy được nấu từ bí đỏ tươi, kết hợp hoàn hảo với kem tươi cao cấp. Hương vị ngọt tự nhiên của bí đỏ hòa quyện cùng vị béo mịn của kem, tạo nên một món khai vị ấm áp và đầy dinh dưỡng.'
  },
  { 
    id: '3', 
    name: 'Salad Caesar Truyền Thống', 
    price: 18.00, 
    category: 'appetizers', 
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMDg1MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Xà lách romaine tươi với sốt Caesar đặc trưng'
  },
  { 
    id: '4', 
    name: 'Bò Bít Tết Wagyu', 
    price: 45.00, 
    category: 'main', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYwMDE2MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Thịt bò Wagyu A5 cao cấp nhập khẩu trực tiếp từ Nhật Bản, có độ marbling hoàn hảo. Được nướng chín vừa theo yêu cầu, mang đến độ mềm tan trong miệng cùng hương vị béo ngậy đặc trưng. Phục vụ kèm rau củ nướng và sốt tiêu đen đặc biệt.'
  },
  { 
    id: '5', 
    name: 'Cá Hồi Nướng Bơ Chanh', 
    price: 38.00, 
    category: 'main', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1625944226626-9bd664656506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBmaXNoJTIwZGlzaHxlbnwxfHx8fDE3NjAxMTAxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cá hồi tươi nướng với sốt bơ chanh thơm lừng'
  },
  { 
    id: '6', 
    name: 'Pasta Truffle Nấm', 
    price: 32.00, 
    category: 'main', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1667473775795-41f69ae72c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBnb3VybWV0fGVufDF8fHx8MTc2MDExMDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Mì fettuccine Ý được làm tươi mỗi ngày, xào cùng nhiều loại nấm cao cấp (nấm mỡ, nấm shiitake, nấm hương) trong sốt kem Parmesan đậm đà. Hoàn thiện với dầu truffle đen quý hiếm và phô mai Grana Padano bào mỏng.'
  },
  { 
    id: '7', 
    name: 'Gà Nướng Thảo Mộc', 
    price: 28.00, 
    category: 'main', 
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYwMDg1MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Gà nướng với các loại thảo mộc tươi'
  },
  { 
    id: '8', 
    name: 'Cơm Chiên Hải Sản', 
    price: 22.00, 
    category: 'main', 
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1715187935352-728a800d663d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBldGl6ZXIlMjBmb29kJTIwcGxhdGluZ3xlbnwxfHx8fDE3NjAxMTAxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cơm chiên đậm đà với hải sản tươi ngon'
  },
  { 
    id: '9', 
    name: 'Tiramisu Ý Truyền Thống', 
    price: 18.00, 
    category: 'desserts', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1662230791691-b77f85c5b43a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwdGlyYW1pc3UlMjBjaG9jb2xhdGV8ZW58MXx8fHwxNzYwMTEwMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tiramisu chính hiệu được làm theo công thức truyền thống của Ý với lớp bánh Savoiardi thấm cà phê espresso đắng, xen kẽ với kem mascarpone mịn màng. Rắc bột cacao nguyên chất và trang trí với chocolate đen cao cấp.'
  },
  { 
    id: '10', 
    name: 'Bánh Panna Cotta', 
    price: 15.00, 
    category: 'desserts', 
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1662230791691-b77f85c5b43a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwdGlyYW1pc3UlMjBjaG9jb2xhdGV8ZW58MXx8fHwxNzYwMTEwMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bánh Panna Cotta mềm mịn với sốt dâu'
  },
  { 
    id: '11', 
    name: 'Kem Vani Madagascar', 
    price: 12.00, 
    category: 'desserts', 
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1662230791691-b77f85c5b43a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwdGlyYW1pc3UlMjBjaG9jb2xhdGV8ZW58MXx8fHwxNzYwMTEwMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Kem vani Madagascar thượng hạng'
  },
  { 
    id: '12', 
    name: 'Bánh Chocolate Lava', 
    price: 16.00, 
    category: 'desserts', 
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1662230791691-b77f85c5b43a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwdGlyYW1pc3UlMjBjaG9jb2xhdGV8ZW58MXx8fHwxNzYwMTEwMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bánh chocolate nóng chảy bên trong'
  },
];
