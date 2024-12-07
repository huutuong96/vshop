
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

interface Profile {
  accessToken: string,
  info: any,
  cart: {
    cartInfo: any[],
    selectedItems: any[],
    mainVouchers: any[],
    mainVoucherSelected: any
  } | null,
  addresses: any[] | null
  checkoutState: string
  checkout: {
    checkoutItems: any[],
    mainVouchers: any[],
    mainVoucherSelected: null
    originPrice: number
    totalShipFee: number,
    voucherPrice: number,
    rankPrice: number,
    address: any
    // shopVouchers: any[]
  } | null
}

const initialState = {
  accessToken: '',
  info: {},
  cart: null,
  checkoutState: '',
  addresses: null,
  checkout: null
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
        selectedItems: [],
        mainVouchers: [],
        mainVoucherSelected: null
      }
    },
    addVouchers: (state, action: PayloadAction<{ mainVouchers: any[], shopVouchers: any[] }>) => {
      let { shopVouchers, mainVouchers } = action.payload;
      if (state.cart) {
        let newCart = state.cart.cartInfo.map(c => ({
          ...c,
          vouchers: shopVouchers.filter((v: any) => +v.shop_id === c.id),
          voucherSelected: null
        }))
        state.cart.cartInfo = [...newCart];
        state.cart.mainVouchers = [...mainVouchers]
      }
    },
    addAddresses: (state, action: PayloadAction<any[]>) => {
      state.addresses = action.payload;
    },
    addMainVoucher: (state, action: PayloadAction<any>) => {
      if (state.cart) {
        state.cart.mainVoucherSelected = action.payload;
      }
    },
    addCheckout: (state, action: PayloadAction<{
      checkoutItems: any[],
      mainVouchers: any[],
      originPrice: number,
      totalShipFee: number,
      voucherPrice: number,
      rankPrice: number,
      mainVoucherSelected: any
      // shopVouchers: any[]
    }>) => {
      state.checkout = {
        ...action.payload, address: null
      }
    },
    selectShopVoucher: (state, action: PayloadAction<{ index: number, voucher: any }>) => {
      let { index, voucher } = action.payload;
      if (state.cart?.cartInfo) {
        state.cart.cartInfo[index].voucherSelected = voucher;
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
      .addMatcher((state) => (state.type as string).endsWith('addCheckout'), (state, action) => {
        // console.log('-----------------------');
        // if (false) {
        //   const address = state.addresses?.find(a => +a.default);
        //   if (address) {
        //     state.checkout.address = address;
        //   }
        // }

      })
      .addDefaultCase((state, action) => {
      })
  },
})

export const {
  addAccessToken,
  addInfo,
  addCart,
  addMainVoucher,
  addAddresses,
  addVouchers,
  addCheckout,
  selectShopVoucher,
  selectAllProducts,
  selectAllShopProducts,
  selectItem,
  changeQuantity,
  changeCheckoutState
} = profileSlice.actions

export default profileSlice.reducer;