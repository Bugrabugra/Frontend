import { Product } from "../api/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(devtools((set) => ({
    products: [],
    total: 0,
    addProduct: (product: Product) => (
      set((state) => {
        const hasProduct = state.products.find((p) => p.id === product.id);
        state.total += +product.product_price;

        if (hasProduct) {
          return {
            products: state.products.map((p) => {
              if (p.id === product.id) {
                return { ...p, quantity: p.quantity + 1 }
              }
              return p
            })
          }
        } else {
          return {
            products: [...state.products, { ...product, quantity: 1 }]
          }
        }
      })
    ),
    reduceProduct: (product: Product) => (
      set((state) => {
        return {
          total: state.total - product.product_price,
          products: state.products.map((p) => {
            if (p.id === product.id) {
              return { ...p, quantity: p.quantity - 1 }
            }
            return p;
          }).filter((p) => p.quantity > 0)
        }
      })
    ),
    clearCart: () => (
      set(() => {
        return {
          total: 0,
          products: []
        }
      })
    )
  }),
  { name: 'CounterZustandStore', serialize: { options: false } }
))
