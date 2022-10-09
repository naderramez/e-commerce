import React, { Component } from "react";
import { TPrice, TProduct } from "../../ApolloClient/types";
import { TState } from "../../redux/state.types";

import CART_ICON from "../../assets/Circle Icon.png";
import router from "../../router";

interface Props {
  product: TProduct;
  selectedCurrency: TState["filters"]["currency"];
}

interface IState {
  price: TPrice | undefined;
}

export class ProductCard extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      price: this.getPriceForSelectedCurrency(this.props.selectedCurrency),
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
      const price = this.getPriceForSelectedCurrency(
        nextProps.selectedCurrency
      );
      this.setState({ price });
    }
    return true;
  }

  getPriceForSelectedCurrency = (
    selectedCurrency: TState["filters"]["currency"]
  ) => {
    const price = this.props.product?.prices.find(
      (price) => price.currency.label === selectedCurrency?.label
    );
    return price;
  };

  goToProduct = () => {
    if (this.props.product?.id) {
      router.navigate(`/product/${this.props.product.id}`);
    }
  };
  render() {
    return (
      <div className="product-card" onClick={this.goToProduct}>
        <div className="image-container">
          <img
            src={this.props.product?.gallery?.[0] || ""}
            alt={this.props.product?.name}
          />
          <img src={CART_ICON} alt="Cart" className="cart-icon" />
          {this.props.product?.inStock === false && (
            <div className="out-of-stock">Out Of Stock</div>
          )}
        </div>
        <div className="product-name">{this.props.product?.name}</div>
        <div className="product-price">
          {this.state.price?.currency.symbol}
          {this.state.price?.amount}
        </div>
      </div>
    );
  }
}

export default ProductCard;
