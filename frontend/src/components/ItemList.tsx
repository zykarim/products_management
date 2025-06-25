import { useState } from 'react';
import { useDeleteItem, useItems, useUpdateItem } from '../hooks/useItems';
import type { Item } from '../types';
import EditModal from './EditModal';



export default function ItemList() {
  const { data: items = [] } = useItems();
  const deleteItem = useDeleteItem();
  const updateItem = useUpdateItem();
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  return (
    <div className="mt-6 grid gap-4">
       <h2 className="text-2xl font-bold mb-4">Products List</h2>
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded bg-gray-50">
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
          <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => deleteItem.mutate(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setEditingItem(item)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      {editingItem && 
      <EditModal
        itemToEdit={editingItem?? { id: 0, name: '', description: '', price: 0 }}
        onClose={() => setEditingItem(null)}
        onSave={(item) => {
          updateItem.mutate(item);
          setEditingItem(null);
        }}
      />}
    </div>
  );
};

