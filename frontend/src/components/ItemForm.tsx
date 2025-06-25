import React, { useState } from 'react';
import type { Item } from '../types';
import { useAddItem } from '../hooks/useItems';
import { useNavigate } from 'react-router-dom';

export default function ItemForm() {
  const  addItem = useAddItem();
  const [form, setForm] = useState<Omit<Item, 'id'>>({ name: '', description: '', price: 0 });
  const navigate= useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem.mutate(form);
    setForm({ name: '', description: '', price: 0 });
    navigate('/');
  };

  return (
    <>
     <h2 className="text-2xl font-bold mb-4">Insert New Product</h2>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <label htmlFor='price'>Price</label>
      <input
        id="price"
        type="number"
        className="border p-2 w-full"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
    </form>
    </>
  );
};

