export type TPrice = {
  __typename?: "Price";
  amount: number;
  currency: { __typename?: "Currency"; label: string; symbol: string };
};

export type TProduct = {
  __typename?: "Product";
  id: string;
  name: string;
  inStock?: boolean | null;
  gallery?: Array<string | null> | null;
  description: string;
  category: string;
  brand: string;
  attributes?: Array<{
    __typename?: "AttributeSet";
    id: string;
    name?: string | null;
    type?: string | null;
    items?: Array<{
      __typename?: "Attribute";
      displayValue?: string | null;
      value?: string | null;
      id: string;
    } | null> | null;
  } | null> | null;
  prices: Array<{
    __typename?: "Price";
    amount: number;
    currency: { __typename?: "Currency"; label: string; symbol: string };
  }>;
} | null;

export type TCategory = {
  __typename?: "Category";
  name?: string | null;
  products: Array<TProduct>;
} | null;
