"use client";

import type { CartItem } from "./cart";

export type Dedication =
  | { type: "teacher"; title: string; teacher: string; subject?: string; student: string; msg?: string; slug: string }
  | { type: "lamp"; count: number; mode: 0 | 1 | 2; name: string; slug: string };

export type Order = {
  ref: string;
  date: string;
  items: CartItem[];
  total: number;
  pay: "card" | "bank";
  donor: { name: string; email?: string; anon: boolean };
  gift?: { to: string; from: string; email?: string; msg?: string; design: number } | null;
  dedications?: Dedication[];
};

const OKEY = "burak-orders-v1";
const DKEY = "burak-pending-dedications";

const read = <T,>(k: string, store: Storage, d: T): T => {
  try {
    const r = store.getItem(k);
    return r ? (JSON.parse(r) as T) : d;
  } catch {
    return d;
  }
};
const write = (k: string, store: Storage, v: unknown) => {
  try {
    store.setItem(k, JSON.stringify(v));
  } catch {}
};

export const saveOrder = (o: Order) => write(OKEY, localStorage, [o, ...read<Order[]>(OKEY, localStorage, [])].slice(0, 20));
export const getOrder = (ref: string) => read<Order[]>(OKEY, localStorage, []).find((o) => o.ref === ref);
export const lastOrder = () => read<Order[]>(OKEY, localStorage, [])[0];

export const addDedication = (d: Dedication) => write(DKEY, localStorage, [...read<Dedication[]>(DKEY, localStorage, []), d]);
export const takeDedications = () => {
  const d = read<Dedication[]>(DKEY, localStorage, []);
  write(DKEY, localStorage, []);
  return d;
};
export const peekDedications = () => read<Dedication[]>(DKEY, localStorage, []);

export const newRef = () => "BRK-" + new Date().getFullYear() + "-" + Date.now().toString(36).toUpperCase().slice(-6);
