import React, {createContext, useContext, useState} from 'react';
import {Book} from '../data/books';

type CartItem = Book & {qty: number};

type CartContextType = {
  items: CartItem[];
  addToCart: (book: Book) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  total: number;
  itemCount: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) {
        return prev.map(i => i.id === book.id ? {...i, qty: i.qty + 1} : i);
      }
      return [...prev, {...book, qty: 1}];
    });
  };

  const increase = (id: string) =>
    setItems(prev => prev.map(i => i.id === id ? {...i, qty: i.qty + 1} : i));

  const decrease = (id: string) =>
    setItems(prev =>
      prev
        .map(i => i.id === id ? {...i, qty: i.qty - 1} : i)
        .filter(i => i.qty > 0),
    );

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{items, addToCart, increase, decrease, total, itemCount, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
