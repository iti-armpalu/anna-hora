import type { Address } from "./address-normalized";
import type { Order } from "./order-normalized";

export interface Customer {
  id: string;
  email: string;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;

  defaultAddress: Address | null;
  addresses: Address[];
  orders: Order[];

  accessToken: string; // important for cart buyer identity
}
