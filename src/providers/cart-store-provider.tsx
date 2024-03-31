"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type CartStore,
  createCartStore,
  initCartStore,
} from "@/stores/cart-store";

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

export interface CartStoreProviderProps {
  children: ReactNode;
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const store = useRef(createCartStore(initCartStore()));

  return (
    <CartStoreContext.Provider value={store.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T) => {
  const store = useContext(CartStoreContext);
  if (!store) {
    throw new Error("useCartStore must be used within a CartStoreProvider");
  }
  return useStore(store, selector);
};
