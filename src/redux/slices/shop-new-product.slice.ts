
import categoryApiRequest from '@/apiRequest/category'
import { combineVariants } from '@/helpers'
import http from '@/lib/http';
import { AsyncThunk, createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { boolean } from 'zod';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export enum CategoryTypeValue {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}

export type Category = {
  id: number
  title: string
  parent_id: number | null
  slug: string
  image: null | string,
}

export type CategoryAttribute = {
  id: number
  key: string,
  values: {
    value: string,
    label: string
  }[]
  categoryId: number
  categoryTypeValue: CategoryTypeValue
}

export type VariantItem = {
  name: string,
  values: {
    image: string,
    value: string,
  }[]
}

export type VariantProduct = {
  price: number,
  inStock: number,
  sku: string,
  image: string
  variants: {
    name: string,
    value: string
  }[]
}

interface InitialState {
  name: string
  infomation: { label: string, value: string }[]
  category: {
    rootCategories: Category[]
    categories: { data: Category[] }[],
    selectedCategories: Category[]
    selectedCategories1: Category[]
    isConfirmCategories: boolean
    rootCategoryAttributes: CategoryAttribute[],
    categoryAttributesSelected: CategoryAttribute[],
    categoryAttributesIndex: null | number
  }
  varriant: {
    isChangeVariantMode: boolean,
    variantItems: VariantItem[]
    variantProducts: VariantProduct[]
  }
  currentRequestId: undefined | string
  images: string[]
  sku: string
  price: number | null
  stock: number | null
  weight: number | null
  height: number | null
  width: number | null
  length: number | null
}



const b: CategoryAttribute[] = [
  { id: 0, key: 'Thương hiệu', values: [{ value: 'no-brand', label: 'No Brand' }, { value: 'adam-store', label: 'Adam Store' }], categoryId: 8, categoryTypeValue: CategoryTypeValue.MULTIPLE },
  { id: 1, key: 'Xuất xứ', values: [{ value: 'japan', label: 'Nhật Bản' }, { value: 'vietnam', label: 'Việt Nam' }, { value: 'china', label: 'Trung Quốc' }], categoryId: 8, categoryTypeValue: CategoryTypeValue.SINGLE }
]


export const getListCategoryNested = createAsyncThunk(
  'shopListProduct/getListCategoryNested',
  async (_, thunkAPI) => {
    const response = await http.get<{
      message: string,
      data: Category[]
    }
    >(`api/categories`, {
      signal: thunkAPI.signal,
      cache: 'no-cache'
    })
    return response
  }
)
// export const findCategoryList = createAsyncThunk(
//   'shopListProduct/findCategoryList',
//   async (_, thunkAPI) => {
//     const response = await categoryApiRequest.findAll();
//     return response
//   }
// )


const initialState: InitialState = {
  name: '',
  infomation: [],
  category: {
    rootCategories: [],
    categories: [],
    selectedCategories: [],
    selectedCategories1: [],
    isConfirmCategories: false,
    rootCategoryAttributes: [],
    categoryAttributesSelected: [],
    categoryAttributesIndex: null,
  },
  varriant: {
    isChangeVariantMode: false,
    variantItems: [
      // {
      //   name: 'Màu sắc',
      //   values: [
      //     {
      //       image: '',
      //       value: 'Đỏ',
      //     },
      //     {
      //       image: '',
      //       value: 'Xanh',
      //     }
      //   ]
      // },
    ],
    variantProducts: []
  },
  currentRequestId: undefined,
  images: [],
  price: 1000000,
  stock: 100,
  weight: 1,
  height: 1,
  width: 1,
  length: 1,
  sku: 'SKU ABX'
}

const shopNewProductSlice = createSlice({
  name: 'shopNewProduct',
  initialState,
  reducers: {
    /* -------------------Name -----------------**/
    changeProductName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    /* -------------------Images----------------**/
    addImage: (state, action: PayloadAction<string[]>) => {
      let images = action.payload;
      state.images.push(...images);
    },
    /* ------------------Infomation-------------**/
    addProductDetail: (state, action: PayloadAction<string>) => {
      state.infomation.push({ label: action.payload, value: '' })
    },
    deleteProductDetail: (state, action: PayloadAction<number>) => {
      let index = action.payload;
      state.infomation.splice(index, 1);
    },
    changeProductDetailValue: (state, action: PayloadAction<{ index: number, value: string }>) => {
      let { index, value } = action.payload;
      state.infomation[index].value = value;
    },
    /* -------------------price, stock -----------------**/
    changeProductPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    changeProductStock: (state, action: PayloadAction<number>) => {
      state.stock = action.payload;
    },
    /* -------------------witdh, height, length, weight -----------------**/
    changeProductWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    changeProductHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    changeProductLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload;
    },
    changeProductWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
    /* -------------------witdh, height, length, weight -----------------**/
    changeProductSku: (state, action: PayloadAction<string>) => {
      state.sku = action.payload;
    },
    /* -------------------category -----------------**/
    addToSelectedCategories: (state, action: PayloadAction<{ i: number, j: number }>) => {
      const { i, j } = action.payload;
      const category = state.category.rootCategories.find(it => it.id === j);
      const categoriesWithParentId = state.category.rootCategories.filter(it => it.parent_id === j);
      if (categoriesWithParentId.length === 0) {
        state.category.isConfirmCategories = true;
      } else {
        state.category.isConfirmCategories = false;
      }
      state.category.categories.splice(i + 1, 10);
      state.category.categories.push({ data: categoriesWithParentId });
      if (category) {
        state.category.selectedCategories.splice(i, 10);
        state.category.selectedCategories.push(category);
      }
    },
    confirmCategory: (state, action: PayloadAction<number>) => {
      const categoryAttributes = b.filter(item => item.categoryId === action.payload);
      state.category.categoryAttributesSelected = [...categoryAttributes];
    },
    /* -------------------Attributes -----------------**/
    showAttributesByIndex: (state, action: PayloadAction<number>) => {
      state.category.categoryAttributesIndex = action.payload;
    },

    /* -------------------Variants -----------------**/
    changeVariantMode: (state) => {
      if (!state.varriant.isChangeVariantMode) {
        state.varriant.isChangeVariantMode = true;
        state.varriant.variantItems.push({
          name: '',
          values: [
            {
              image: '',
              value: ''
            }
          ]
        })
      }
    },
    changeVariantMode1: (state, action: PayloadAction<boolean>) => {
      state.varriant.isChangeVariantMode = action.payload;
    },
    addVariant: (state) => {
      if (state.varriant.variantItems.length < 2) {
        state.varriant.variantItems.push({
          name: '',
          values: [
            {
              image: '',
              value: ''
            }
          ]
        })
      }
    },
    addValueInVariantItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.varriant.variantItems[index].values.push({
        image: '',
        value: ''
      })
    },
    changeInputNameVariant: (state, action: PayloadAction<{ index: number, name: string }>) => {
      const { index, name } = action.payload
      if (name) {
        state.varriant.variantItems[index].name = name;

      }
    },
    changeInputNameVariantValue: (state, action: PayloadAction<{ parentIndex: number, index: number, name: string }>) => {
      const { parentIndex, index, name } = action.payload;
      state.varriant.variantItems[parentIndex].values[index].value = name;
    },
    addImageVariantValue: (state, action: PayloadAction<{ parentIndex: number, index: number, image: string }>) => {
      let { parentIndex, index, image } = action.payload;
      state.varriant.variantItems[parentIndex].values[index].image = image;
    },
    changeInputPriceVariantProduct: (state, action: PayloadAction<{ index: number, value: number }>) => {
      const { index, value } = action.payload;
      state.varriant.variantProducts[index].price = value;
    },
    changeInputInStockVariantProduct: (state, action: PayloadAction<{ index: number, value: number }>) => {
      const { index, value } = action.payload;
      state.varriant.variantProducts[index].inStock = value;
    },
    changeInputSkuVariantProduct: (state, action: PayloadAction<{ index: number, value: string }>) => {
      const { index, value } = action.payload;
      state.varriant.variantProducts[index].sku = value;
    },
    changePriceInStockSkuVariantProducts: (state, action: PayloadAction<{ price: number, inStock: number, sku: string }>) => {
      const { price, inStock, sku } = action.payload;
      state.varriant.variantProducts.forEach(item => {
        item.price = price;
        item.inStock = inStock;
        item.sku = sku;
      })
    },
    deleteVariant: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.varriant.variantItems.splice(index, 1);
      if (state.varriant.variantItems.length === 0) {
        state.varriant.isChangeVariantMode = false;
      }
    },
    deleteVariantValueInItem: (state, action: PayloadAction<{ parentIndex: number, index: number }>) => {
      const { parentIndex, index } = action.payload;
      if (state.varriant.variantItems[parentIndex].values.length > 1) {
        state.varriant.variantItems[parentIndex].values.splice(index, 1);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getListCategoryNested.fulfilled, (state, action) => {
        const categories = action.payload.payload.data
        state.category.rootCategories = [...categories];
        state.category.categories = [{ data: categories.filter(i => !i.parent_id) }];
      })
      .addCase(getListCategoryNested.pending, (state, action) => {

      })
      // .addCase(findCategoryListByParentId.fulfilled, (state, action) => {
      //   state.rootCategories = action.payload;
      // })
      .addMatcher((action) => {
        return ['changeInputNameVariantValue', 'deleteVariantValueInItem', 'addValueInVariantItem', 'deleteVariant'].some(prefix => (action.type as string).endsWith(prefix))
      }, (state, action) => {
        state.varriant.variantProducts = combineVariants(state.varriant.variantItems);
        console.log({ a: state.varriant.variantProducts });
      })
      .addMatcher((state) => true, (state, action) => {
        if (!state.varriant.isChangeVariantMode) {
          state.varriant.variantProducts = []
        }
      })

      .addDefaultCase((state, action) => {
        console.log({ name: state.name });
      })
  },
})

export const {
  addProductDetail,
  addImage,
  changeProductPrice,
  changeVariantMode1,
  changeProductSku,
  changeProductStock,
  deleteProductDetail,
  changeProductDetailValue,
  changeProductName,
  addToSelectedCategories,
  confirmCategory,
  showAttributesByIndex,
  changeVariantMode,
  addVariant,
  addValueInVariantItem,
  addImageVariantValue,
  changeInputNameVariant,
  changeInputNameVariantValue,
  changeInputInStockVariantProduct,
  changeInputPriceVariantProduct,
  changeInputSkuVariantProduct,
  changePriceInStockSkuVariantProducts,
  deleteVariant,
  deleteVariantValueInItem
} = shopNewProductSlice.actions

export default shopNewProductSlice.reducer;
