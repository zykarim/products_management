export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ItemContextType {
  items: Item[];
  fetchItems: () => void;
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: number) => void;
}
