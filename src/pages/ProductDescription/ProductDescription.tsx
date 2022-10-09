import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { client } from "../../ApolloClient/client";
import { GET_PRODUCT_BY_ID } from "../../ApolloClient/queries";
import { TPrice } from "../../ApolloClient/types";
import { GetProductQuery } from "../../graphql/generated/graphql";
import { addItem } from "../../redux/slices/cart";
import { TAttributeSet, TState } from "../../redux/state.types";
import router from "../../router";

import "./ProductDescription.scss";

interface IState {
  product: GetProductQuery["product"] | null;
  isLoading: boolean;
  errors: any;
  selectedImage: string;
  selectedAttributes: TAttributeSet[] | null;
}

interface Props {
  filters: TState["filters"];
  addItem: ActionCreatorWithPayload<any, string>;
  cartItems: TState["cart"]["items"];
}

export class ProductDescription extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      product: null,
      isLoading: false,
      errors: null,
      selectedImage: "",
      selectedAttributes: null,
    };
  }

  setSelectedImage = (image: string) => {
    this.setState({ selectedImage: image });
  };

  productPrice: TPrice | undefined | null = null;
  isItemInCart = false;

  onCartBtnClick = () => {
    if (this.isItemInCart === false) {
      const item = {
        ...this.state.product,
        attributes: this.state.selectedAttributes,
      };
      this.props.addItem(item);
      this.isItemInCart = true;
    } else {
      router.navigate("/cart");
    }
  };

  checkIfItemInCart = (product: IState["product"]) => {
    if (this.props.cartItems.length === 0) return false;
    this.props.cartItems.forEach((item) => {
      if (item.id === product?.id) return true;
    });
    return false;
  };

  selectAttribute = (attrID: string, itemID: string) => {
    if (this.state.selectedAttributes) {
      const newSelectedAttributes: any = [];
      this.state.selectedAttributes.forEach((attr, index) => {
        const newAttribute = { ...attr };
        if (attr.id === attrID) {
          const newItems = attr.items.map((item) => ({
            ...item,
            selected: item.id === itemID ? true : false,
          }));
          newAttribute.items = newItems;
        }
        newSelectedAttributes.push(newAttribute);
      });
      this.setState({ selectedAttributes: newSelectedAttributes });
    }
  };

  getProduct = () => {
    const productID = router.state.matches[0].params.productID;
    if (productID) {
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      client
        .query({ query: GET_PRODUCT_BY_ID, variables: { id: productID } })
        .then((res) => {
          const selectedAttributes: any = [];
          res.data.product?.attributes?.forEach((attribute) => {
            const attributeItems = attribute?.items?.map((item, index) => ({
              ...item,
              selected: index === 0 ? true : false,
            }));
            const mappedAttribute = {
              ...attribute,
              items: attributeItems,
            };
            selectedAttributes.push(mappedAttribute);
          });
          this.setState((prevState) => ({
            ...prevState,
            product: res.data.product,
            errors: res.errors,
            selectedImage: res.data.product?.gallery?.[0] || "",
            selectedAttributes: selectedAttributes as TAttributeSet[],
          }));

          this.productPrice = res.data.product?.prices.find(
            (price) =>
              price.currency.label === this.props.filters.currency?.label
          );

          this.isItemInCart = this.checkIfItemInCart(res.data.product);
        })
        .catch((err) => {
          this.setState((prevState) => ({ ...prevState, errors: true }));
        })
        .finally(() => {
          this.setState((prevState) => ({ ...prevState, isLoading: false }));
        });
    }
  };
  componentDidMount(): void {
    this.getProduct();
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<IState>,
    nextContext: any
  ): boolean {
    if (this.props.filters.currency !== nextProps.filters.currency) {
      this.productPrice = this.state.product?.prices.find(
        (price) => price.currency.label === nextProps.filters.currency?.label
      );
    }
    return true;
  }
  render() {
    if (this.state.isLoading) return <div>Loading...</div>;
    if (this.state.errors) return <div>Something Went Wrong</div>;
    return (
      <div className="product-description-page">
        <div className="preview-product-container">
          <div className="small-images-container">
            {this.state.product?.gallery?.map((image) => (
              <img
                key={image}
                src={image || ""}
                alt={image || ""}
                onClick={() => this.setSelectedImage(image || "")}
              />
            ))}
          </div>
          <div className="main-image-container">
            <img src={this.state.selectedImage} alt="main" />
          </div>
        </div>
        <div className="details-container">
          <div className="brand">{this.state.product?.brand}</div>
          <div className="name">{this.state.product?.name}</div>
          <div className="attributes-container">
            {this.state.selectedAttributes?.map((attribute) => {
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
                                item.selected ? "attribute-item-selected" : ""
                              }`
                        }
                        style={{
                          backgroundColor: (attribute.type === "swatch"
                            ? item.value || "white"
                            : "") as string,
                          border:
                            attribute.type === "swatch"
                              ? item.selected
                                ? "solid 1px black"
                                : "none"
                              : "none",
                        }}
                        onClick={() =>
                          this.selectAttribute(
                            attribute.id as string,
                            item.id as string
                          )
                        }
                      >
                        {attribute.type === "swatch" ? "" : item?.displayValue}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price-container">
            <div className="title">Price:</div>
            <div className="amount">
              {this.productPrice && this.productPrice.currency.symbol}
              {this.productPrice && this.productPrice.amount}
            </div>
          </div>

          <div className="addToCart-btn" onClick={this.onCartBtnClick}>
            {this.isItemInCart ? "ITEM IN CART >" : "ADD TO CART"}
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: this.state.product?.description || "",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => ({
  filters: state.filters,
  cartItems: state.cart.items,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      addItem,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
