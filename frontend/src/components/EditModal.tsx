import { useState } from "react";
import type { Item } from "../types";

export default function EditModal({itemToEdit, 
                                   onClose, 
                                   onSave}
                                   :{itemToEdit:Item, 
                                     onClose: ()=>void, 
                                     onSave: (item:Item)=>void }){
                                        
   const [item, setItem] = useState<Item>(itemToEdit);
                                    
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(item);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            value={item.name}
            onChange={(e) =>(setItem({...item, name:e.target.value})) }
            className="border p-2 w-full"
            placeholder="Name"
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) => (setItem({...item, description:e.target.value}))}
            className="border p-2 w-full"
            placeholder="Description"
          />
          <input
            type="number"
            value={item.price}
            onChange={(e) => (setItem({...item, price:Number(e.target.value)}))}
            className="border p-2 w-full"
            placeholder="Price"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}