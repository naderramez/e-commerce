import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { CurrenciesQuery } from "../../graphql/generated/graphql";
import { setCurrencyFilter } from "../../redux/slices/filters";
import { TState } from "../../redux/state.types";

interface Props {
  currencies: CurrenciesQuery["currencies"];
  setCurrencyFilter: ActionCreatorWithPayload<any, string>;
}

export class CurrenciesPopover extends Component<Props> {
  selectCurrency = (currency: TState["filters"]["currency"]) => {
    this.props.setCurrencyFilter(currency);
  };
  render() {
    return (
      <div className="currencies-popover-container">
        {this.props.currencies?.map((currency) => (
          <div
            key={currency?.label}
            className="currency-item"
            onClick={() => this.selectCurrency(currency)}
          >
            <span>{currency?.symbol}</span>
            <span>{currency?.label}</span>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      setCurrencyFilter,
    },
    dispatch
  );
};

export default connect(undefined, mapDispatchToProps)(CurrenciesPopover);
