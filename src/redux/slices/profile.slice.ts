
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

interface Profile {
  accessToken: string,
  info: any,
  cart: {
    cartInfo: any[],
    selectedItems: any[]
  } | null
  checkoutState: string
}

const initialState = {
  accessToken: '',
  info: {},
  cart: null,
  checkoutState: ''
} as Profile

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    addInfo: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },
    addCart: (state, action: PayloadAction<any>) => {
      state.cart = {
        cartInfo: action.payload,
        selectedItems: []
      }
    },
    selectAllProducts: (state, action: PayloadAction<boolean>) => {
      let checked = action.payload;
      if (state.cart) {
        if (checked) {
          let items = state.cart.cartInfo.reduce((acc: any, cur: any) => [...acc, ...cur.items.map((i: any) => i.id)], []);
          state.cart.selectedItems = [...items];
        } else {
          state.cart.selectedItems = [];
        }
      }
    },
    selectAllShopProducts: (state, action: PayloadAction<{ checked: boolean, index: number }>) => {
      let { checked, index } = action.payload;
      if (state.cart) {
        let itemsWithShopId = state.cart.cartInfo[index].items.map((i: any) => i.id);
        let itemSlectedWithoutShopId = state.cart.selectedItems.filter(i => !itemsWithShopId.includes(i));
        if (checked) {
          state.cart.selectedItems = [...itemSlectedWithoutShopId, ...itemsWithShopId];
        } else {
          state.cart.selectedItems = [...itemSlectedWithoutShopId]
        }
      }
    },
    selectItem: (state, action: PayloadAction<{ checked: boolean, id: number, shop_id: number }>) => {
      let { checked, id, shop_id } = action.payload;
      if (state.cart) {
        if (checked) {
          state.cart.selectedItems.push(id)
        } else {
          const newItems = state.cart.selectedItems.filter(i => i !== id);
          state.cart.selectedItems = [...newItems];
        }
      }
    },
    changeQuantity: (state, action: PayloadAction<{ quantity: number, index: number, subIndex: number }>) => {
      let { index, quantity, subIndex } = action.payload;
      if (state.cart) {
        let item = state.cart.cartInfo[index].items[subIndex];
        if (quantity) {
          item.quantity = quantity.toString();
        } else if (quantity === 0) {
          state.cart.cartInfo[index].items.splice(subIndex, 1);
          let selectedItems = state.cart.selectedItems.filter(i => i !== item.id);
          state.cart.selectedItems = [...selectedItems];
          if (!state.cart.cartInfo[index].items.length) {
            state.cart.cartInfo.splice(index, 1);
          }
        }
      }
    },
    changeCheckoutState: (state, action: PayloadAction<string>) => {
      state.checkoutState = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher((state) => true, (state, action) => {
        // console.log('-----------------------');
        // state.cart?.selectedItems.forEach(i => {
        //   console.log(i.id);
        // })
        // console.log('-----------------------');

      })
      .addDefaultCase((state, action) => {
      })
  },
})

export const {
  addAccessToken,
  addInfo,
  addCart,
  selectAllProducts,
  selectAllShopProducts,
  selectItem,
  changeQuantity,
  changeCheckoutState
} = profileSlice.actions

export default profileSlice.reducer;