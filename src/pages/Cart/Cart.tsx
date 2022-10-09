import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import CartItem from "../../components/CartItem/CartItem";
import {
  SelectTotalPriceAndQuantity,
  TReceiptDetails,
} from "../../redux/selectors";
import { addItem, removeItem } from "../../redux/slices/cart";
import { TState } from "../../redux/state.types";

import "./Cart.scss";

interface Props {
  addItem: ActionCreatorWithPayload<any, string>;
  removeItem: ActionCreatorWithPayload<any, string>;
  filters: TState["filters"];
  cartItems: TState["cart"]["items"];
  receiptDetails: TReceiptDetails;
}

export class Cart extends Component<Props> {
  render() {
    return (
      <div className="cart-page">
        <div className="page-title">CART</div>
        <div className="divider"></div>

        <div className="cart-items-container">
          {this.props.cartItems.map((item) => (
            <div>
              <CartItem item={item} />
              <div className="divider"></div>
            </div>
          ))}
        </div>
        <div>Tax 21%: {this.props.receiptDetails.tax.toFixed(2)}</div>
        <div>Quantity: {this.props.receiptDetails.quantity}</div>
        <div>Total: {this.props.receiptDetails.totalPrice}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => ({
  filters: state.filters,
  cartItems: state.cart.items,
  receiptDetails: SelectTotalPriceAndQuantity(
    state.filters.currency,
    state.cart.items
  ),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      addItem,
      removeItem,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
