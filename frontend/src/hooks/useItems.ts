import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Item } from "../types";
import toast from "react-hot-toast";


axios.defaults.baseURL = "http://localhost:8082/api/products";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Fetch all items
export function useItems() {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axios.get<Item[]>("");
      return res.data;
    },
  });
}

// Add item
export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Omit<Item, "id">) => axios.post("", item),
    onSuccess: () => {
    toast.success("Item added successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => toast.error('Failed to add item'),
  });
}

// Update item
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Item) => axios.put(`/${item.id}`, item),
    onSuccess: () => {
      toast.success("Item updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => toast.error('Failed to update item'),
  });
}

// Delete item
export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axios.delete(`/${id}`),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => toast.error('Failed to delete item'),
  });
}
