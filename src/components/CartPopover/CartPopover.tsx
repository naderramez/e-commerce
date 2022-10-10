import React, { Component } from "react";
import { TReceiptDetails } from "../../redux/selectors";
import { TState } from "../../redux/state.types";
import CartItem from "../CartItem/CartItem";

import "./CartPopover.scss";

interface Props {
  cartItems: TState["cart"]["items"];
  receiptDetails: TReceiptDetails;
  // reference: any;
}

export class CartPopover extends Component<Props> {
  render() {
    if (this.props.cartItems.length === 0) return <div>Cart is empty</div>;
    return (
      // <div className="container" ref={this.props.reference}>
      <div className="container">
        <div className="title-container">
          <div className=" me-2">My Bag</div>
          <span>
            {this.props.receiptDetails.quantity}{" "}
            {this.props.receiptDetails.quantity > 1 ? "items" : "item"}
          </span>
        </div>

        <div>
          {this.props.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="d-flex justify-content-between">
          <div>Total</div>
          <div>
            {this.props.receiptDetails.currency?.symbol}
            {this.props.receiptDetails.totalPrice}
          </div>
        </div>

        <div className="btns-container">
          <div className="cart-btn first-btn">VIEW BAG</div>
          <div className="cart-btn second-btn">CHECK OUT</div>
        </div>
      </div>
    );
  }
}

export default CartPopover;
