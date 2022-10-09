import React, { Component } from "react";
import { connect } from "react-redux";
import { client } from "../../ApolloClient/client";
import { GET_CATEGORIES } from "../../ApolloClient/queries";
import { TCategory } from "../../ApolloClient/types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { GetCategoriesQuery } from "../../graphql/generated/graphql";
import { SelectSelectedCategory } from "../../redux/selectors";
import { TState } from "../../redux/state.types";

import "./Categories.scss";

interface Props {
  filters: TState["filters"];
}

interface IState {
  categories: {
    data: GetCategoriesQuery["categories"];
    loading: boolean;
    errors: any;
  };
}

export class Categories extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: {
        data: [],
        loading: false,
        errors: null,
      },
    };
  }

  selectedCategory: TCategory | null = null;

  getCategories = () => {
    this.setState((prevState) => ({
      categories: {
        ...prevState.categories,
        loading: true,
      },
    }));
    client
      .query({ query: GET_CATEGORIES })
      .then((res) => {
        const categories = res.data.categories;
        this.setState((prevState) => ({
          categories: {
            ...prevState.categories,
            data: categories,
            errors: res.error,
          },
        }));
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

  componentDidMount(): void {
    this.getCategories();
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<IState>,
    nextContext: any
  ): boolean {
    const selectedCategory = SelectSelectedCategory(
      nextProps.filters.category,
      nextState.categories.data
    );
    if (this.selectedCategory !== selectedCategory) {
      this.selectedCategory = selectedCategory;
    }
    return true;
  }
  render() {
    if (this.state.categories.loading) return <div>Loading</div>;
    if (this.state.categories.errors) return <div>Something went wrong</div>;
    return (
      <div className="categories-page">
        <div className="category-title">
          {this.props.filters.category || "Loading..."}
        </div>

        <div className="products-cards-container">
          {this.selectedCategory !== null &&
            this.selectedCategory.products.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                selectedCurrency={this.props.filters.currency}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(Categories);
