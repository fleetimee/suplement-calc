"use client";

import { useCartStore } from "@/providers/cart-store-provider";

export function HomeClient() {
  const { ...cartStore } = useCartStore((state) => state);

  return (
    <div>
      Count: {cartStore.total}
      <hr />
      <button
        type="button"
        onClick={() =>
          void cartStore.addItem({
            id: "1",
            name: "Item 1",
            price: 100,
            quantity: 1,
          })
        }
      >
        Increment Count
      </button>
      <button type="button" onClick={() => void cartStore.removeItem("1")}>
        Decrement Count
      </button>
    </div>
  );
}
