"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/app/(dashboard)/pos/_components/cart-panel"

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
type CartUpdater = CartItem[] | ((prev: CartItem[]) => CartItem[])

interface CartState {
  cart: CartItem[]
  setCart: (cart: CartUpdater) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      setCart: (cart) =>
        set((state) => ({
          cart: typeof cart === "function" ? cart(state.cart) : cart,
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "pos-cart" },
  ),
)
