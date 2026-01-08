
import { Vehicle } from './types';

export const ADMIN_CREDENTIALS = {
  email: 'rlimports254@outlook.com',
  password: 'rlimports2456'
};

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: '1',
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    mileage: 1200,
    price: 980000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    description: 'Estado de zero. Cor Chalk Grey, interior em couro bordeaux.'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    mileage: 500,
    price: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    description: 'Pack M Carbon, som Harman Kardon, cor Isle of Man Green.'
  },
  {
    id: '3',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2022,
    mileage: 15000,
    price: 620000,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    description: 'Blindagem Nível III-A, revisões na concessionária.'
  },
  {
    id: '4',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2023,
    mileage: 2300,
    price: 1850000,
    imageUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
    description: 'A lenda off-road com luxo incomparável. Black Pack completo.'
  }
];
