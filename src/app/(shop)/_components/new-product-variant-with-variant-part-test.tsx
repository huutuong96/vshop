'use client'
import './table.css';
import { Input } from '@/components/ui/input';
import { ImageUp, Plus, Trash2, X } from "lucide-react";
import { Controller, FieldArrayWithId, useFieldArray, useForm, UseFormSetError, UseFormSetValue, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useEffect, useRef, useState } from 'react';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { clientAccessToken } from '@/lib/http';
import NewProductVariantTable from '@/app/(shop)/_components/new-product-variant-table';
import slugify from 'slugify';
import { useAppDispatch } from '@/redux/store';
import { changeVariantMode, changeVariantMode1 } from '@/redux/slices/shop-new-product.slice';
import { CreateShopFormData } from '@/app/(shop)/_components/create-shop-form-test';
import { CreateProductFormData } from '@/app/(shop)/_components/new-product-form';
import { nanoid } from 'nanoid';
import envConfig from '@/config';



type VariantItem = {
  name: string;
  values: { value: string; image: string }[];
};
type VariantProduct = {
  price: number;
  inStock: number;
  sku: string;
  image: string;
  variants: { name: string; value: string }[];
};
const variantItemSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên biến thể" }).refine(v => v.length > 0, { message: "Vui lòng nhập tên biến thể" }),
  values: z.array(
    z.object({
      value: z.string().min(1, { message: "Vui lòng nhập giá trị biến thể" }).refine(v => v.length > 0, { message: "Vui lòng nhập giá trị biến thể" }),
      image: z.string().min(0)
    })
  ).nonempty({ message: "At least one value is required for each variant item" })
});

type VariantItemFormData = z.infer<typeof variantItemSchema>

const variantProductSchema = z.object({
  price: z.coerce.number({ message: "Vui lòng nhập giá" }),
  stock: z.coerce.number({ message: "Vui lòng nhập số lượng" }).int().min(0, { message: "InStock must be a positive integer" }),
  sku: z.string().min(1, { message: "Vui lòng nhập sku" }),
  image: z.string().min(0, { message: "Image must be a valid URL" }),
  variants: z.array(
    z.object({
      name: z.string().min(1, { message: "Variant name is required" }),
      value: z.string().min(1, { message: "Variant value is required" })
    })
  ).nonempty({ message: "At least one variant is required" })
});

type VariantProductFormData = z.infer<typeof variantProductSchema>

const formSchema = z.object({
  variantItems: z.array(variantItemSchema).nonempty({ message: "At least one variant item is required" }),
  variantProducts: z.array(variantProductSchema).nonempty({ message: "At least one variant product is required" })
});

export type FormData = z.infer<typeof formSchema>;

const combineVariants = (variants: FormData['variantItems']): FormData['variantProducts'] => {
  const init: { name: string; value: string }[][] = [[]];

  // Lấy tên và giá trị từ các biến thể, lọc những giá trị không có
  const a = variants.map(item => ({
    name: item.name,
    values: item.values
      .filter(i => i.value) // Lọc các giá trị không rỗng
      .map(i => i.value) // Lấy giá trị
  }));

  // Kết hợp các biến thể
  const b = a.reduce((acc, curr) => {
    const result: { name: string; value: string }[][] = [];
    acc.forEach(a => {
      curr.values.forEach(v => {
        result.push([...a, { name: curr.name, value: v }]);
      });
    });
    return result;
  }, init);

  // Tạo danh sách sản phẩm biến thể
  return b.map(item => {
    let c = '';

    // Nếu tên của item đầu tiên trùng với tên biến thể đầu tiên
    if (item[0]?.name === variants[0]?.name) {
      const i = variants[0].values.find(it => it.value === item[0].value);
      if (i) c = i.image || ''; // Nếu có hình ảnh, sử dụng, nếu không thì để trống
    }

    // Trả về đối tượng VariantProduct
    return {
      price: 0,      // Giá mặc định
      stock: 0,    // Số lượng có sẵn mặc định
      sku: '',       // SKU mặc định
      image: c,      // Hình ảnh
      variants: item  // Biến thể
    }; // Chuyển đổi kiểu
  }) as FormData['variantProducts'];
};
const combineVariants1 = (variants: any): any => {
  const init: { name: string; value: string }[][] = [[]];

  // Lấy tên và giá trị từ các biến thể, lọc những giá trị không có
  // const a = variants.map((item: any) => ({
  //   name: item.name,
  //   values: item.values
  //     .filter((i: any) => i.value) // Lọc các giá trị không rỗng
  //     .map(i => i.value) // Lấy giá trị
  // }));

  // Kết hợp các biến thể
  const b = variants.reduce((acc: any, curr: any) => {
    const result: { name: string; value: string }[][] = [];
    acc.forEach((a: any) => {
      curr.values.forEach((v: any) => {
        result.push([...a, { ...v }]);
      });
    });
    return result;
  }, init);

  // Tạo danh sách sản phẩm biến thể
  return b.map((item: any) => {
    let c = '';

    // Nếu tên của item đầu tiên trùng với tên biến thể đầu tiên
    if (item[0]?.name === variants[0]?.name) {
      const i = variants[0].values.find((it: any) => it.value === item[0].value);
      if (i) c = i.image || ''; // Nếu có hình ảnh, sử dụng, nếu không thì để trống
    }

    // Trả về đối tượng VariantProduct
    return {
      id: nanoid(12),
      price: 0,      // Giá mặc định
      stock: 0,    // Số lượng có sẵn mặc định
      sku: '',       // SKU mặc định
      image: c,      // Hình ảnh
      variants: item  // Biến thể
    }; // Chuyển đổi kiểu
  });
};

export default function NewProductVariantWithVariantPartTest({ handleVariant, setValueProduct, setErrorProduct }:
  {
    handleVariant: (data: any) => void,
    setValueProduct: UseFormSetValue<CreateProductFormData>
    setErrorProduct: UseFormSetError<CreateProductFormData>
  }) {
  const accessToken = clientAccessToken.value;
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [sku, setSku] = useState<string>('');
  const [isConfirm, setIsComfirm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { control, register, handleSubmit, trigger, setValue, getValues, clearErrors, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variantItems: [
        {
          name: "",
          values: [{ value: "", image: "" }]
        }
      ],
      variantProducts: []
    },
    mode: "all"
  });
  const watchedVariantItems = useWatch({ control, name: "variantItems" });
  const watchedVariantProducts = useWatch({ control, name: "variantProducts" });

  const { fields: variantItems, append, remove, update } = useFieldArray({
    control,
    name: "variantItems"
  });
  const {
    fields: variantProducts,
    append: appendVariantProduct,
    remove: removeVariantProduct,
    update: updateVariantProduct,
    replace
  } = useFieldArray({
    control,
    name: "variantProducts",
  });

  useEffect(() => {
    const validateVariantItems = async () => {
      const isValidVariantItems = await trigger("variantItems");
      const isValidVariantProducts = await trigger("variantProducts");

      if (isValidVariantItems) {
        const a = getValues('variantItems');
        const c = combineVariants(a);
        // removeVariantProduct()
        // setValue('variantProducts', c);
        // appendVariantProduct(c);
        replace(c);
      } else {
        console.log('in useEffect =>>>>, ', false);
      }
    };

    validateVariantItems();
  }, [watchedVariantItems, trigger, replace, errors])

  useEffect(() => {
    const a = async () => {
      const b = await trigger('variantItems');
      const c = await trigger('variantProducts');
      console.log({ variantProducts: getValues('variantProducts') });
      if (errors.variantItems || errors.variantProducts) {
        setIsComfirm(false);
        handleVariant(null);
      } else {
        setIsComfirm(true);
        const a = getValues('variantItems').map(x => ({ ...x, id: nanoid(12), values: x.values.map(z => ({ ...z, id: nanoid(12) })) }));
        handleVariant({ variantItems: a, variantProducts: combineVariants1(a) });
      }
    }
    a()
  }, [watchedVariantProducts, trigger, variantItems, errors])

  const createVariantProductsTable = async () => {
    // Kiểm tra lỗi trong variantItems
    trigger();
    const isValid = await trigger("variantItems");
    console.log(watchedVariantItems);
    if (isValid) {
      console.log('ko loi~', getValues('variantItems'));
    } else {
      console.log("Variant Items contain errors. Please fix them first.", errors);
    }
  };

  const handleUploadImage = async (index: number, subIndex: number, image: File, item: FieldArrayWithId<FormData, "variantItems", "id">) => {
    const formData = new FormData();
    formData.append('images[]', image);
    try {
      const resToServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const payload = await resToServer.json();
      if (!resToServer.ok) {
        throw 'Error!'
      }
      const newItem = { ...item };
      newItem.values[subIndex].image = payload.images[0];
      update(index, newItem);
      trigger();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickUploadImage = (index: number) => {
    fileInputRefs.current[index]?.click();
  };


  const onSubmit = (data: FormData) => {
    if (isConfirm) {
      handleVariant(data);
    }
  };

  return (
    <div className="">
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">
              Phân loại hàng
            </div>
          </div>
        </div>
        <div className='w-full'>
          {variantItems.map((item, index) => {
            // const { fields: values, append: addValue, remove: removeValue } = useFieldArray({
            //   control,
            //   name: `variantItems.${index}.values`
            // });
            return (
              <div key={index} className="w-full bg-[#f5f8fe] p-4 rounded-lg relative mb-4">
                <div onClick={() => {
                  remove(index);
                  if (getValues('variantItems').length === 0) {
                    remove();
                    removeVariantProduct();
                    dispatch(changeVariantMode1(false));
                    handleVariant(null);
                    setValueProduct('changeVariantMode', false);
                    setErrorProduct('variant', { message: undefined })
                  }
                  console.log({ a: getValues('variantItems'), b: getValues('variantProducts') });
                }} className='absolute top-4 right-4'><X /></div>
                <div>
                  <div>
                    <div className='py-2 border-b text-[16px] font-medium'>Biến thể {index + 1}</div>
                    <div className='py-2'>
                      <div className='text-sm mb-1'>Tên biến thể</div>
                      <div>
                        <Controller
                          control={control}
                          name={`variantItems.${index}.name`}
                          render={({ field }) => (
                            <input {...field} placeholder="Input" className='border text-sm w-[300px] px-3 py-1' />
                          )}
                        />
                      </div>
                      {errors.variantItems?.[index]?.name && <span className='text-sm text-red-600'>{errors.variantItems[index].name.message}</span>}
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='mb-2 text-sm'>Tổng số biến thể</div>
                    {item.values.map((_, subIndex) => (
                      <div className='mb-2 p-3 bg-white'>
                        <div className=' w-full flex items-center justify-between'>

                          <Controller
                            control={control}
                            name={`variantItems.${index}.values.${subIndex}.value`}
                            render={({ field }) => (
                              <input {...field} placeholder="Value" className='w-[300px] border rounded px-2 py-1 text-sm' />
                            )}
                          />
                          <div className='border border-dashed flex items-center'>
                            <img className='size-10' src={variantItems[index].values[subIndex].image} alt="" />
                            <input type="file" placeholder='Chọn ảnh' className='w-[400px]' onChange={async (e) => {
                              const file = e.target.files;
                              if (file && file.length > 0) {
                                await handleUploadImage(index, subIndex, file[0], item);
                              }
                            }} />
                          </div>
                          <div className='cursor-pointer' onClick={() => {
                            const a = { ...getValues(`variantItems.${index}`) };
                            if (a.values.length > 1) {
                              a.values.splice(subIndex, 1);
                              setValue(`variantItems.${index}.values`, [...a.values]);
                              update(index, a);
                              // remove();
                              trigger();
                            }
                          }}>
                            <Trash2 strokeWidth={1.25} width={20} />
                          </div>
                        </div>
                        {errors.variantItems?.[index]?.values?.[subIndex]?.value && (
                          <span className='text-sm text-red-500 mt-1'>{errors.variantItems[index].values[subIndex].value.message}</span>
                        )}
                      </div>
                    ))}

                  </div>
                  <div className='border inline-block p-2 bg-white text-black rounded text-sm cursor-pointer' onClick={async () => {
                    // clearErrors('variantItems')
                    // update(index, newItem);
                    // await trigger(`variantItems.${index}.values.${variantItems[index].values.length - 1}`);
                    // console.log({ variantItems });
                    const a = getValues(`variantItems.${index}`);
                    a.values.push({ image: "", value: "" });
                    update(index, a);
                    const x = getValues('variantItems');
                    const z = combineVariants(x);
                    setValue('variantProducts', z);
                    await trigger();
                  }}>Thêm value</div>
                </div>
              </div>
            )
          })}
          {variantItems.length < 2 && (
            <div onClick={() => {
              append({ name: "", values: [{ value: "", image: "" }] })
              trigger();
            }} className='inline-block border mt-4 p-2 rounded text-sm cursor-pointer'>Thêm biến thể</div>
          )}

        </div>
      </div>

      {/* <div onClick={async () => {
        await createVariantProductsTable()
      }} className='border inline-block p-4'>Tạo sản phẩm biến thể</div> */}

      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">
              Danh sách phân loại hàng
            </div>
          </div>
        </div>
        <div className="w-full mt-1 flex flex-wrap">
          <div className="w-full flex mb-4">
            <div className="flex h-8">
              <div className="border border-r-0 w-56 h-full px-3 py-1 flex rounded-tl rounded-bl">
                <div className="flex items-center text-[12px] pr-2">
                  ₫
                  <div className="ml-2 border-r h-full"></div>
                </div>
                <input type='number' value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full h-full outline-none text-[14px]" placeholder="Giá" />
              </div>
              <div className="border border-r-0 w-56 h-full px-3 py-1 flex">
                <input type='number' value={stock} onChange={(e) => setStock(+e.target.value)} className="w-full h-full outline-none text-[14px]" placeholder="Kho hàng" />
              </div>
              <div className="border w-56 h-full px-3 py-1 flex rounded-tr rounded-br">
                <input value={sku} onChange={(e) => setSku(e.target.value)} type="text" className="w-full h-full outline-none text-[14px]" placeholder="SKU phân loại" />
              </div>
            </div>
            <div onClick={(e) => {
              e.preventDefault();
              if (price && stock && sku) {
                removeVariantProduct()
                appendVariantProduct(variantProducts.map(p => ({ ...p, price: price, stock: stock, sku: sku })))
              }
            }} className={`w-full inline-flex items-center justify-center cursor-pointer h-8 ml-6 border text-[14px] bg-blue-500 text-white rounded hover:opacity-80 ${variantProducts.length === 0 && 'cursor-not-allowed opacity-80'}`}>
              Áp dụng cho tất cả sản phẩm phân loại
            </div>
          </div>
          {/* <NewProductVariantTable
            variantProducts={getValues('variantProducts')}
            variantItems={getValues('variantItems')}
            control={control}
            errros={errors}
            register={register}
          /> */}
          <div onClick={() => {
            console.log(getValues('variantProducts'));
            console.log({ errors });
          }} className='border inline-block p-2 bg-blue-500 text-white'>click</div>
        </div>
      </div>
      <div>
        <div onClick={handleSubmit(onSubmit)} className='border p-2'>click</div>
      </div>
    </div >
  )
}