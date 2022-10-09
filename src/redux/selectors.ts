import { TCategory } from "../ApolloClient/types";
import { Category, GetCategoriesQuery } from "../graphql/generated/graphql";
import { TState } from "./state.types";

export const SelectSelectedCategory = (
  selectedCategoryName: TState["filters"]["category"],
  categories: GetCategoriesQuery["categories"]
): TCategory | null => {
  if (!selectedCategoryName) return null;
  if (!categories?.length) return null;
  const selectedCategory = categories.find(
    (category) => category?.name === selectedCategoryName
  );
  if (!selectedCategory) return null;
  else return selectedCategory;
};

export type TReceiptDetails = {
  totalPrice: number;
  quantity: number;
  tax: number;
  currency: TState["filters"]["currency"];
};

export const SelectTotalPriceAndQuantity = (
  currency: TState["filters"]["currency"],
  cartItems: TState["cart"]["items"]
): TReceiptDetails => {
  let receiptDetails = {
    totalPrice: 0,
    quantity: 0,
    tax: 0,
    currency,
  };
  if (cartItems.length === 0) return receiptDetails;
  else {
    const pricesAndQuantities: { price: number; quantity: number }[] = [];
    cartItems.forEach((item) => {
      const price = item.prices.find(
        (item) => item.currency.label === currency?.label
      );
      let priceAndQuantity = { itemPrice: 0, itemQuantity: 0 };
      if (price) priceAndQuantity.itemPrice = price.amount;
      priceAndQuantity.itemQuantity = item.quantity;
      pricesAndQuantities.push({
        price: priceAndQuantity.itemPrice,
        quantity: priceAndQuantity.itemQuantity,
      });
    });
    const totalPriceAndQuantity = pricesAndQuantities.reduce(
      (prevVal, currentVal) => {
        return {
          price:
            prevVal.price * prevVal.quantity +
            currentVal.price * currentVal.quantity,
          quantity: prevVal.quantity + currentVal.quantity,
        };
      },
      { price: 0, quantity: 0 }
    );
    const tax = (totalPriceAndQuantity.price * 21) / 100;
    receiptDetails = {
      totalPrice: totalPriceAndQuantity.price,
      quantity: totalPriceAndQuantity.quantity,
      tax,
      currency,
    };
    return receiptDetails;
  }
};
