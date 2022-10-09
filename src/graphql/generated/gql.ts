/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getCategories {\n    categories {\n      name\n      products {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getCategoriesNames {\n    categories {\n      name\n    }\n  }\n": types.GetCategoriesNamesDocument,
    "\n  query currencies {\n    currencies {\n      label\n      symbol\n    }\n  }\n": types.CurrenciesDocument,
    "\n  query getProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n      brand\n    }\n  }\n": types.GetProductDocument,
};

export function graphql(source: "\n  query getCategories {\n    categories {\n      name\n      products {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategories {\n    categories {\n      name\n      products {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getCategoriesNames {\n    categories {\n      name\n    }\n  }\n"): (typeof documents)["\n  query getCategoriesNames {\n    categories {\n      name\n    }\n  }\n"];
export function graphql(source: "\n  query currencies {\n    currencies {\n      label\n      symbol\n    }\n  }\n"): (typeof documents)["\n  query currencies {\n    currencies {\n      label\n      symbol\n    }\n  }\n"];
export function graphql(source: "\n  query getProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n      brand\n    }\n  }\n"): (typeof documents)["\n  query getProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      inStock\n      gallery\n      description\n      category\n      attributes {\n        id\n        name\n        type\n        items {\n          displayValue\n          value\n          id\n        }\n      }\n      prices {\n        currency {\n          label\n          symbol\n        }\n        amount\n      }\n      brand\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;