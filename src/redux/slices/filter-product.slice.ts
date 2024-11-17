
import { Product } from '@/app/(public)/_components/row-product';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export type IproductInFilter = {
  "_id": string,
  "name": string,
  "slug": string,
  "price": number,
  "thumbnail": string
}
export type IFilter = { name: string, value: string }

const initialState: {
  items: IproductInFilter[],
  filter: IFilter[],
  queryString: string
} = {
  items: [],
  filter: [],
  queryString: ''
}

const filterProductSlice = createSlice({
  name: 'filterProduct',
  initialState,
  reducers: {
    // increment: (state) => state + 1,
    // decrement: (state) => state - 1
    getProduct: (state, action: PayloadAction<IproductInFilter[]>) => {
      state.items = action.payload;
    },
    addFilter: (state, action: PayloadAction<IFilter>) => {
      let index = state.filter.findIndex(item => item.name === action.payload.name && item.value !== action.payload.value)
      if (index !== -1) {
        state.filter[index].value = action.payload.value
      } else {
        state.filter.push(action.payload);
      }
      state.queryString = state.filter.map(item => `${item.name}=${item.value}`).join('&');
      console.log(state.queryString);
    }
  },
  extraReducers(builder) {
    builder.addDefaultCase((state, action) => {
      // console.log(`action type: ${action.type} `, current(state));
    })
  },
})

export const {
  getProduct,
  addFilter
} = filterProductSlice.actions

export default filterProductSlice.reducer;