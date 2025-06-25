import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { Item } from '../types';


axios.defaults.baseURL = 'http://localhost:8082/api/products';
axios.defaults.headers.common['Content-Type'] = 'application/json';

interface ItemContextType {
  items: Item[];
  fetchItems: () => void;
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: number) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItems must be used within an ItemProvider');
  return context;
};

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const res = await axios.get<Item[]>('');
    setItems(res.data);
  };

  const addItem = async (item: Omit<Item, 'id'>) => {
    const res = await axios.post<Item>('', item);
    setItems((prev) => [...prev, res.data]);
  };

  const updateItem = async (item: Item) => {
    const res = await axios.put<Item>(`/${item.id}`, item);
    setItems((prev) => prev.map((i) => (i.id === item.id ? res.data : i)));
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`/${id}`);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, fetchItems, addItem, updateItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};