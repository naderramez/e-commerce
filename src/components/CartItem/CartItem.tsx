import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { TPrice } from "../../ApolloClient/types";
import { addItem, removeItem, updateCartItem } from "../../redux/slices/cart";
import { TAttributeSet, TCartItem, TState } from "../../redux/state.types";

import "./CartItem.scss";

interface Props {
  item: TCartItem;
  filters: TState["filters"];
  mode?: string;
  addItem: ActionCreatorWithPayload<any, string>;
  removeItem: ActionCreatorWithPayload<any, string>;
  updateCartItem: ActionCreatorWithPayload<any, string>;
}

interface IState {
  currentImageIndex: number;
}

export class CartItem extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }
  productPrice: TPrice | undefined | null = null;

  selectAttribute = (attrID: string, itemID: string) => {
    if (this.props.item.attributes) {
      const newSelectedAttributes: any = [];
      this.props.item.attributes.forEach((attr, index) => {
        const newAttribute: any = { ...attr };
        if (attr?.id === attrID) {
          const newItems = attr.items?.map((item) => ({
            ...item,
            selected: item?.id === itemID ? true : false,
          }));
          newAttribute.items = newItems;
        }
        newSelectedAttributes.push(newAttribute);
      });
      const newItem = { ...this.props.item, attributes: newSelectedAttributes };
      this.props.updateCartItem(newItem);
    }
  };

  nextImage = () => {
    if (this.props.item.gallery?.length) {
      if (
        this.state.currentImageIndex ===
        this.props.item.gallery?.length - 1
      ) {
        this.setState((prevState) => ({
          currentImageIndex: 0,
        }));
      } else {
        this.setState((prevState) => ({
          currentImageIndex: prevState.currentImageIndex + 1,
        }));
      }
    }
  };

  prevImage = () => {
    if (this.props.item.gallery?.length && this.props.item.gallery.length > 0) {
      if (this.state.currentImageIndex === 0) {
        this.setState((prevState) => ({
          currentImageIndex: (this.props.item.gallery?.length as number) - 1,
        }));
      } else {
        this.setState((prevState) => ({
          currentImageIndex: prevState.currentImageIndex - 1,
        }));
      }
    }
  };

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    if (this.props.filters.currency !== nextProps.filters.currency) {
      this.productPrice = this.props.item.prices.find(
        (price) => price.currency.label === nextProps.filters.currency?.label
      );
    }
    return true;
  }

  componentDidMount(): void {
    this.productPrice = this.props.item.prices.find(
      (price) => price.currency.label === this.props.filters.currency?.label
    );
  }

  render() {
    return (
      <div className="cart-item-container">
        <div className="details-container">
          <div className="brand">{this.props.item.brand}</div>
          <div className="name">{this.props.item.name}</div>
          <div className="price">
            {this.productPrice?.currency.symbol}
            {this.productPrice?.amount}
          </div>

          <div className="attributes-container">
            {(this.props.item.attributes as TAttributeSet[])?.map(
              (attribute) => {
                return (
                  <div className="attribute-container">
                    <div className="attribute-name">{attribute?.name}:</div>
                    <div className="attribute-items-container">
                      {attribute?.items?.map((item) => (
                        <div
                          className={
                            attribute.type === "swatch"
                              ? "attribute-item-swatch"
                              : `attribute-item ${
                                  item?.selected
                                    ? "attribute-item-selected"
                                    : ""
                                }`
                          }
                          style={{
                            backgroundColor: (attribute.type === "swatch"
                              ? item?.value || "white"
                              : "") as string,
                            border:
                              attribute.type === "swatch"
                                ? item?.selected
                                  ? "solid 1px black"
                                  : "none"
                                : "none",
                          }}
                          onClick={() =>
                            this.selectAttribute(
                              attribute.id as string,
                              item?.id as string
                            )
                          }
                        >
                          {attribute.type === "swatch"
                            ? ""
                            : item?.displayValue}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="preview-container">
          <div className="btns-container">
            <div
              className="quantity-btn"
              onClick={() => this.props.addItem(this.props.item)}
            >
              +
            </div>
            <div
              className="quantity-btn"
              onClick={() => this.props.removeItem(this.props.item)}
            >
              -
            </div>
            <div className="quantity">{this.props.item.quantity}</div>
          </div>
          <div className="image-container">
            <img
              src={
                this.props.item.gallery?.[this.state.currentImageIndex] || ""
              }
              alt="main"
            />
            <div
              className="img-navigator-btn backward-btn"
              onClick={this.prevImage}
            >
              &lt;
            </div>
            <div
              className="img-navigator-btn forward-btn"
              onClick={this.nextImage}
            >
              &gt;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      addItem,
      removeItem,
      updateCartItem,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
