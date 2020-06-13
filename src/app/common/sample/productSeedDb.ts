import { IProduct } from '../../models/product';

export const product: IProduct[] = [
  {
    id: '001',
    name: 'Coke',
    category: 'drinks',
    brand: 'Coca Cola',
    price: 2,
    importPrice: 1,
    stock: 99,
    dateAdded: new Date('2012-10-20'),
  },
  {
    id: '002',
    name: '7Up',
    category: 'drinks',
    brand: 'Pepsi Co',
    price: 2.5,
    importPrice: 1.2,
    stock: 90,
    dateAdded: new Date('2012-11-20'),
  },
  {
    id: '003',
    name: 'Pepsi',
    category: 'drinks',
    brand: 'Pepsi Co',
    price: 1.9,
    importPrice: 1,
    stock: 99,
    dateAdded: new Date('2012-10-21'),
  },
  {
    id: '004',
    name: 'Sprite',
    category: 'drinks',
    brand: 'Coca Cola',
    price: 1.5,
    importPrice: 1,
    stock: 90,
    dateAdded: new Date('2012-11-20'),
  },
];
