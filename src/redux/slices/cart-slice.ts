
import { Product } from '@/app/(public)/_components/row-product';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  product: {
    "_id": string,
    "name": string,
    "price": number,
    "thumbnail": string,
    "priceSale"?: number
  },
  qty: number
}

const initialState: {
  items: CartItem[],
  totalPrice: number,
  totalQty: number,
} = {
  items: [],
  totalQty: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // increment: (state) => state + 1,
    // decrement: (state) => state - 1
    getCart: (state, action: PayloadAction<{ cart: CartItem[], totalPrice: number, totalQty: number }>) => {
      state.items = [...action.payload.cart];
      state.totalPrice = action.payload.totalPrice
      state.totalQty = action.payload.totalQty
    },
    addProduct: (state, action: PayloadAction<CartItem>) => {
      // const index = state.items.findIndex(item => item._id === action.payload._id);

      // if (index !== -1) {
      //   state.items[index].qty += action.payload.qty;
      // } else {
      //   state.items.push(action.payload);
      // }
    },
    updateQty: (state, action: PayloadAction<{ ['_id']: string, qty: number }>) => {
      // const index = state.items.findIndex(item => item._id === action.payload._id);

      // state.items[index].qty = action.payload.qty;
    },
    deleteProduct: (state, action: PayloadAction<{ ['_id']: string }>) => {
      // const index = state.items.findIndex(item => item._id === action.payload._id);

      // state.items.splice(index, 1);
    }
  },
  extraReducers(builder) {
    builder.addDefaultCase((state, action) => {
      if (typeof window !== 'undefined') {
        console.log(`action type: ${action.type} `, current(state));
      }
    })
  },
})

export const {
  getCart
} = cartSlice.actions

export default cartSlice.reducer;