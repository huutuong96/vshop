'use client'

import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import NewProductVariantSection from "@/app/(shop)/_components/new-product-variant-section";
import { getListCategoryNested } from "@/redux/slices/shop-new-product.slice";
import NewProductFirstSection from "@/app/(shop)/_components/new-product-first-section";
import NewProductDetailSection from "@/app/(shop)/_components/new-product-detail-section";
import NewProductOtherInfoSection from "@/app/(shop)/_components/new-product-other-info-section";
import NewProductShippingSection from "@/app/(shop)/_components/new-product-shipping-section";
import NewProductFooterSection from "@/app/(shop)/_components/new-product-footer-section";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NewProductVariantSectionTest from "@/app/(shop)/_components/new-product-variant-section-test";
import { clientAccessToken, shop_id } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import LoadingScreen from "@/app/(guest)/_components/loading-screen";
import { useRouter } from "next/navigation";
import envConfig from "@/config";



const createProductFormSchema = z.object({
  images: z.array(z.string()).refine(val => val.length > 0, { message: "Vui lòng tải ảnh sản phẩm" }),
  name: z.string().min(5).max(120),
  category_id: z.number().min(-1).refine(val => val > 0, { message: "Vui long chon danh muc" }),
  description: z.string().min(1),
  variant: z.any(),
  price: z.coerce.number().nullable(),
  stock: z.coerce.number().nullable(),
  weight: z.coerce.number().min(1, { message: "Vui lòng nhập cân nặng" }),
  width: z.coerce.number().min(1, { message: "Vui lòng nhập chiều dài" }),
  length: z.coerce.number().min(1, { message: "Vui lòng nhập chiều rộng" }),
  height: z.coerce.number().min(1, { message: "Vui lòng nhập chiều cao" }),
  sku: z.string().min(1, { message: "Vui lòng nhập sku sản phẩm" }),
  shop_id: z.number().min(1),
  changeVariantMode: z.boolean()
}).superRefine((data, ctx) => {
  if (!data.changeVariantMode) {
    console.log('variant mode: false');
    if (!data.stock) {
      ctx.addIssue({
        message: "Vui lòng nhập số lượng kho sản phẩm",
        code: z.ZodIssueCode.custom,
        path: ['stock']
      })
    }
    if (!data.price) {
      ctx.addIssue({
        message: "Vui lòng nhập giá sản phẩm",
        code: z.ZodIssueCode.custom,
        path: ['price']
      })
    }
  } else {
    if (!data.variant) {
      ctx.addIssue({
        message: "Vui lòng nhập các giá trị ở phần biến thể1",
        code: z.ZodIssueCode.custom,
        path: ['variant']
      })
    }
  }
});

export type CreateProductFormData = z.infer<typeof createProductFormSchema>;

export default function NewProductForm() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const changeVariantMode = useAppSelector(state => state.shopListProduct.varriant.isChangeVariantMode);
  const { register, getValues, control, handleSubmit, setValue, setError, formState: { errors }, watch } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      images: [],
      name: '',
      category_id: 0,
      description: '',
      variant: null,
      price: null,
      stock: null,
      sku: '',
      shop_id: shop_id.value,
      changeVariantMode: false
    },
    mode: 'all',  // Thực hiện validate khi mất focus
    reValidateMode: 'onChange',
  });
  const router = useRouter();

  const onSubmit = async (data: CreateProductFormData) => {
    const newData = { ...data, infomation: [] }
    try {
      setLoading(true);
      const resToServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          'Content-type': "application/json"
        }
      })
      const payload = await resToServer.json();
      if (resToServer.ok) {
        console.log(payload);
        setLoading(false)
        toast({
          variant: 'success',
          title: "Tao san pham thanh cong!"
        })
        // router.push('/shop/product/list')
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVariant = (data: any) => {
    if (data !== null) {
      setValue('price', null);
      setValue('stock', null);
    }
    setValue('variant', data);
  }


  useEffect(() => {
    const promise = dispatch(getListCategoryNested());
    return () => {
      promise.abort()
    }
  }, [dispatch])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <NewProductFirstSection
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
          setError={setError}
        />
        <NewProductDetailSection />
        <NewProductVariantSection setValue={setValue} errors={errors} handleVariant={handleVariant} register={register} setError={setError} />
        <NewProductShippingSection errors={errors} register={register} />
        <NewProductOtherInfoSection register={register} errors={errors} />
        <NewProductFooterSection />

        <button onClick={() => {
          console.log(JSON.stringify(getValues()));
        }} type="button">log data</button>
        <button onClick={() => {
          console.log({ a: errors });
        }} type="button">log errors</button>
      </div>
      {loading && (<LoadingScreen />)}
    </form>
  )
}
