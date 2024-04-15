import { createStore } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export type CartState = {
  items: CartItem[];
  total: number;
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  updateItem: (id: string, item: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => ({
  items: [],
  total: 0,
});

export const defaultInitState: CartState = {
  items: [],
  total: 0,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>((set, get) => ({
    ...initState,
    addItem: (item) =>
      set((state) => {
        const newItems = [...state.items, item];
        const newTotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { items: newItems, total: newTotal };
      }),
    updateItem: (id, item) =>
      set((state) => {
        const newItems = state.items.map((oldItem) =>
          oldItem.id === id ? { ...oldItem, ...item } : oldItem
        );
        const newTotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { items: newItems, total: newTotal };
      }),
    removeItem: (id) =>
      set((state) => {
        const newItems = state.items.filter((item) => item.id !== id);
        const newTotal = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { items: newItems, total: newTotal };
      }),
  }));
};
