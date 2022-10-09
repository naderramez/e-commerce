import { TProduct } from "../ApolloClient/types";

export type TCurrency = {
  __typename?: "Currency";
  label: string;
  symbol: string;
};

export type TAttributeItem = {
  displayValue: String;
  value: String;
  selected: boolean;
  id: String | null;
};

export type TAttributeSet = {
  id: String | null;
  name: String;
  type: String;
  items: TAttributeItem[];
};

export type TCartItem = TProduct & {
  attributes: TAttributeSet[];
  quantity: number;
};

export type TState = {
  filters: {
    category: string | null;
    currency: TCurrency | null;
  };
  cart: {
    items: TCartItem[];
  };
};
