import React, {
  Component,
  createRef,
  forwardRef,
  MouseEventHandler,
} from "react";
import { bindActionCreators, Dispatch } from "redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { client } from "../../ApolloClient/client";
import { TState } from "../../redux/state.types";
import "./Header.scss";
import {
  setCategoryFilter,
  setCurrencyFilter,
} from "../../redux/slices/filters";
import { GET_CATEGORIES_NAMES } from "../../ApolloClient/queries/categories";
import {
  CurrenciesQuery,
  GetCategoriesNamesQuery,
} from "../../graphql/generated/graphql";

import CART from "../../assets/Empty Cart.png";
import LOGO from "../../assets/logo transparent.png";
import ARROW_UP from "../../assets/up-arrow.png";
import ARROW_DOWN from "../../assets/down-arrow.png";
import { GET_CURRENCIES } from "../../ApolloClient/queries";
import CurrenciesPopover from "./CurrenciesPopover";

interface Props {
  setCategoryFilter: ActionCreatorWithPayload<any, string>;
  setCurrencyFilter: ActionCreatorWithPayload<any, string>;
  filters: TState["filters"];
}

interface IState {
  categories: {
    data: GetCategoriesNamesQuery["categories"];
    loading: boolean;
    errors: any;
  };
  currencies: {
    data: CurrenciesQuery["currencies"];
    loading: boolean;
    errors: any;
  };
  isCurrencyPopupDisplayed: boolean;
  isCartPopupDisplayed: boolean;
}

export class Header extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: {
        data: [],
        loading: false,
        errors: null,
      },
      currencies: {
        data: [],
        loading: false,
        errors: null,
      },
      isCurrencyPopupDisplayed: false,
      isCartPopupDisplayed: false,
    };

    this.currencyPopoverRef = createRef();
  }
  currencyPopoverRef;

  toggleCurrencyPopup = () => {
    if (this.state.currencies.data?.length) {
      this.setState((prevState) => ({
        isCurrencyPopupDisplayed: !prevState.isCurrencyPopupDisplayed,
      }));
    }

    console.log("this.currencyPopoverRef", this.currencyPopoverRef);
  };

  closeCurrencyPopup = () => {
    this.setState({
      isCurrencyPopupDisplayed: false,
    });
  };

  getCategoriesNames = () => {
    this.setState({ categories: { ...this.state.categories, loading: true } });
    client
      .query({ query: GET_CATEGORIES_NAMES })
      .then((res) => {
        this.setState({
          categories: {
            ...this.state.categories,
            loading: res.loading,
            data: res.data.categories,
          },
        });

        const { setCategoryFilter } = this.props;
        if (res.data.categories?.length) {
          setCategoryFilter(res.data.categories[0]?.name);
        }
      })
      .catch((err) => {
        this.setState((prevState) => ({
          categories: {
            ...prevState.categories,
            errors: true,
          },
        }));
      })
      .finally(() => {
        this.setState((prevState) => ({
          categories: {
            ...prevState.categories,
            loading: false,
          },
        }));
      });
  };

  getCurrencies = () => {
    this.setState({ currencies: { ...this.state.currencies, loading: true } });
    client
      .query({ query: GET_CURRENCIES })
      .then((res) => {
        this.setState({
          currencies: {
            ...this.state.currencies,
            loading: res.loading,
            data: res.data.currencies,
          },
        });

        const { setCurrencyFilter } = this.props;
        if (res.data.currencies?.length) {
          setCurrencyFilter(res.data.currencies[0]);
        }
      })
      .catch((err) => {
        this.setState((prevState) => ({
          currencies: {
            ...prevState.currencies,
            errors: true,
          },
        }));
      })
      .finally(() => {
        this.setState((prevState) => ({
          currencies: {
            ...prevState.currencies,
            loading: false,
          },
        }));
      });
  };

  handleClickOutside: MouseEventHandler = (event) => {
    if (
      this.currencyPopoverRef.current &&
      !(this.currencyPopoverRef.current as any).contains(event.target)
    ) {
      this.closeCurrencyPopup();
    }
  };

  componentDidMount(): void {
    this.getCategoriesNames();
    this.getCurrencies();

    document.addEventListener("mousedown", this.handleClickOutside as any);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside as any);
  }
  onCategoryChange = (categoryName?: string | null) => {
    const { setCategoryFilter } = this.props;
    setCategoryFilter(categoryName);
  };

  render() {
    return (
      <div className="header_container d-flex row justify-content-between">
        <div className="header_container-categories d-flex col">
          {this.state.categories.loading
            ? "Loading"
            : this.state.categories.errors
            ? "Something went wrong"
            : this.state.categories.data?.map((category) => (
                <div
                  key={category?.name}
                  className={`category-btn ${
                    this.props.filters.category === category?.name
                      ? "category-active"
                      : ""
                  }`}
                  onClick={() => this.onCategoryChange(category?.name)}
                >
                  {category?.name}
                </div>
              ))}
        </div>
        <div className="header_container-actions d-flex flex-row-reverse col align-items-center">
          <div>
            <img src={CART} alt="cart" />
          </div>
          <div
            className="currency-btn-container"
            onClick={this.toggleCurrencyPopup}
          >
            {this.state.currencies.loading ? (
              "Loading"
            ) : this.state.currencies.errors ? (
              "Something went wrong"
            ) : (
              <>
                <span>{this.props.filters.currency?.symbol}</span>
                <img
                  src={
                    this.state.isCurrencyPopupDisplayed ? ARROW_UP : ARROW_DOWN
                  }
                  alt="arrow"
                />
              </>
            )}
            {this.state.isCurrencyPopupDisplayed && (
              <div ref={this.currencyPopoverRef as any}>
                <CurrenciesPopover currencies={this.state.currencies.data} />
              </div>
            )}
          </div>
        </div>
        <div className="header_container-logo">
          <img src={LOGO} alt="logo" />
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
      setCategoryFilter,
      setCurrencyFilter,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
