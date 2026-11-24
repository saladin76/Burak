"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; slug: string; amount: number; freq: "once" | "monthly" };
type Ctx = {
  items: CartItem[];
  add: (i: Omit<CartItem, "id">) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<CartItem>) => void;
  clear: () => void;
  total: number;
  count: number;
  ready: boolean;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "burak-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((i: Omit<CartItem, "id">) => {
    setItems((s) => {
      const same = s.find((x) => x.slug === i.slug && x.freq === i.freq);
      if (same) return s.map((x) => (x === same ? { ...x, amount: x.amount + i.amount } : x));
      return [...s, { ...i, id: `${i.slug}-${Date.now().toString(36)}` }];
    });
  }, []);
  const remove = useCallback((id: string) => setItems((s) => s.filter((x) => x.id !== id)), []);
  const update = useCallback((id: string, p: Partial<CartItem>) => setItems((s) => s.map((x) => (x.id === id ? { ...x, ...p } : x))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, add, remove, update, clear, total: items.reduce((a, b) => a + b.amount, 0), count: items.length, ready }),
    [items, add, remove, update, clear, ready]
  );
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
