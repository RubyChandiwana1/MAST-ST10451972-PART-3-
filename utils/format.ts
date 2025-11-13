import { Course } from '../types';

export const formatPrice = (value: number): string => {
  return `R${value.toFixed(2)}`;
};

export const getCourseName = (course: Course): string => {
  switch (course) {
    case 'starter':
      return 'STARTER';
    case 'main':
      return 'MAIN';
    case 'dessert':
      return 'DESSERT';
    default:
      return String(course).toUpperCase();
  }
};


