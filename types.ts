export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'starter' | 'main' | 'dessert';
  price: number;
  image?: string;
}

export type Course = 'starter' | 'main' | 'dessert';

export interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  getMenuItemsByCourse: (course: Course) => MenuItem[];
  getTotalMenuItems: () => number;
}


