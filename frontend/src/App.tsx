import React from 'react';

import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { ItemProvider } from './context/ProductContext';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ItemProvider>
        <div className="max-w-xl mx-auto p-6">
          <nav className="mb-6 flex gap-4">
            <Link to="/" className="text-blue-500 hover:underline">List</Link>
            <Link to="/add" className="text-blue-500 hover:underline">Add Item</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/add" element={<ItemForm />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </ItemProvider>
    </BrowserRouter>

  );
};

export default App;
