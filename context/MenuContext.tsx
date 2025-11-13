import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Course, MenuContextType } from '../types';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    //  STARTERS
    {
      id: '1',
      name: 'Tomato Soup',
      description: 'Creamy tomato soup with fresh herbs and garlic croutons',
      course: 'starter',
      price: 165.00,
    },
    {
      id: '2',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan, and Caesar dressing',
      course: 'starter',
      price: 175.00,
    },
    {
      id: '3',
      name: 'Garlic Bread',
      description: 'Toasted ciabatta bread with garlic butter and parsley',
      course: 'starter',
      price: 130.00,
    },
    {
      id: '4',
      name: 'Bruschetta',
      description: 'Grilled bread topped with tomato, basil, and olive oil',
      course: 'starter',
      price: 150.00,
    },

    // MAINS
    {
      id: '5',
      name: 'Grilled Ribeye Steak',
      description: 'Juicy ribeye served with roasted vegetables and peppercorn sauce',
      course: 'main',
      price: 465.00,
    },
    {
      id: '6',
      name: 'Chicken Alfredo',
      description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken',
      course: 'main',
      price: 370.00,
    },
    {
      id: '7',
      name: 'Vegetable Stir-Fry',
      description: 'Assorted vegetables sautéed in soy-ginger sauce with rice',
      course: 'main',
      price: 325.00,
    },
    {
      id: '8',
      name: 'Beef Burger',
      description: 'Classic beef burger with cheddar cheese, lettuce, and fries',
      course: 'main',
      price: 295.00,
    },
    {
      id: '9',
      name: 'Grilled Salmon',
      description: 'Fresh salmon fillet with lemon butter sauce and mashed potatoes',
      course: 'main',
      price: 425.00,
    },

    //  DESSERTS
    {
      id: '10',
      name: 'Chocolate Mousse',
      description: 'Rich chocolate mousse topped with whipped cream and berries',
      course: 'dessert',
      price: 130.00,
    },
    {
      id: '11',
      name: 'Cheesecake',
      description: 'Creamy vanilla cheesecake with strawberry coulis',
      course: 'dessert',
      price: 140.00,
    },
    {
      id: '12',
      name: 'Ice Cream Trio',
      description: 'Three scoops of assorted flavors with chocolate drizzle',
      course: 'dessert',
      price: 115.00,
    },
    {
      id: '13',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone and espresso',
      course: 'dessert',
      price: 150.00,
    },
  ]);

  //  FUNCTIONS
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const getMenuItemsByCourse = (course: Course): MenuItem[] => {
    return menuItems.filter(item => item.course === course);
  };

  const getTotalMenuItems = (): number => {
    return menuItems.length;
  };

  const value: MenuContextType = {
    menuItems,
    addMenuItem,
    removeMenuItem,
    getMenuItemsByCourse,
    getTotalMenuItems,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};


/////added more items on menu 
