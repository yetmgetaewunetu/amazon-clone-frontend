import React, { createContext, useReducer } from "react";
import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      const item = state.basket.find((it) => it.id == action.item.id);
      if (item) {
        // const index = state.basket.indexOf((item) => item.id === action.itemid);
        const updated = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return { ...state, basket: updated };
      }
      return {
        ...state,
        basket: [...state.basket, { ...action.item, amount: 1 }],
      };

    case Type.REMOVE_FROM_CART:
      //   const index = state.basket.indexOf();
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return { ...state, basket: newBasket };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case Type.SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
