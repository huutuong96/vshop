'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import NewProductVariantTableTest from "@/app/(shop)/shop/product/new/new-product-variant-table-test";
import VariantAttribute from "@/app/(shop)/shop/product/new/variant-attribute";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, ImagePlus, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import CategorySection from "@/app/(shop)/shop/product/new/category-section";
import { Button } from "@/components/ui/button";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import LoadingScreen from "@/app/(guest)/_components/loading-screen";

// let a = `{"name":"","description":"","base_price":0,"variant":{"variantAttributes":[{"attribute":"Màu sắc","values":[{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997693/fezssmr33wcbcxkmmdjo.jpg","value":"Đỏ","id":"KHEe7uPH2xNn"},{"id":"UvmWW-PShcR7","image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997701/wifesk9mwan06xbfch9f.jpg","value":"xanh"}]}],"variantProducts":[{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997693/fezssmr33wcbcxkmmdjo.jpg","sku":"sku","price":100000,"stock":10,"attributes":[{"id":"KHEe7uPH2xNn","attribute":"Màu sắc","value":"Đỏ"}]},{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997701/wifesk9mwan06xbfch9f.jpg","sku":"sku","price":100000,"stock":10,"attributes":[{"id":"UvmWW-PShcR7","attribute":"Màu sắc","value":"xanh"}]}]}}`

// Schema cho từng thuộc tính của biến thể (e.g., màu sắc, kích thước)
const AttributeSchema = z.object({
  attribute: z.string().min(1, "Attribute name is required"),
  values: z.array(z.object({
    id: z.string(),
    image: z.string().min(0),
    value: z.string().min(1)
  })),
});

// Schema cho từng biến thể của sản phẩm
const VariantSchema = z.object({
  image: z.string().min(0),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  attributes: z.array(z.object(
    {
      id: z.string().min(1),
      attribute: z.string().min(1),
      value: z.string().min(1)
    }
  )),

});

// Schema cho sản phẩm chính
const ProductSchema = z.object({
  name: z.string().min(1, "Lĩnh vực này là cần thiết"),
  category: z.number({ message: "Lĩnh vực này là cần thiết" }).min(1, "Lĩnh vực này là cần thiết"),
  description: z.string().min(1, "Lĩnh vực này là cần thiết"),
  price: z.coerce.number({ message: "Lĩnh vực này là cần thiết" }).nullable().refine(val => val?.toString() !== '', { message: "Lĩnh vực này là cần thiết" }).refine(val => val as number >= 1000 || val === null, { message: 'Giá phải từ 1000đ' }),
  stock: z.coerce.number({ message: "Lĩnh vực này là cần thiết" }).nullable().refine(val => val?.toString() !== '', { message: "Lĩnh vực này là cần thiết" }).refine(val => val as number >= 1 || val === null, { message: 'Số lượng phải từ 1' }),
  sku: z.string().nullable().refine(val => val !== '', { message: "Lĩnh vực này là cần thiết" }),
  weight: z.coerce.number().min(0.1, { message: "Lĩnh vực này là cần thiết" }).max(1600000, { message: "Khối lượng không vượt quá 1600000 gram" }),
  width: z.coerce.number().min(0.1, { message: "Lĩnh vực này là cần thiết" }).max(200, { message: "Chiều rộng không vượt quá 200 cm" }),
  length: z.coerce.number().min(0.1, { message: "Lĩnh vực này là cần thiết" }).max(200, { message: "Chiều dài không vượt quá 200 cm" }),
  height: z.coerce.number().min(0.1, { message: "Lĩnh vực này là cần thiết" }).max(200, { message: "Chiều cao không vượt quá 200 cm" }),
  shop_id: z.number().min(1),
  images: z.array(z.string()).refine(val => val.length > 0, { message: "Lĩnh vực này là cần thiết" }),
  variant: z.object({
    variantAttributes: z.array(AttributeSchema),
    variantProducts: z.array(VariantSchema)
  }).nullable(),
  isCreated: z.boolean(),
  variantMode: z.boolean(),
},).superRefine((data, ctx) => {
  // if (!data.price && data.price !== null) {
  //   console.log({ anx: data.price });
  //   ctx.addIssue({
  //     path: ['price'],
  //     message: "Price must be higher for bulk orders",
  //     code: z.ZodIssueCode.custom,
  //   });
  //   return
  // } else {
  //   ctx.addIssue({
  //     path: ['price'],
  //     message: undefined,
  //     code: z.ZodIssueCode.custom,
  //   });
  //   return
  // }
});

export type Product = z.infer<typeof ProductSchema>;
export type Variant = z.infer<typeof VariantSchema>;
export type Attribute = z.infer<typeof AttributeSchema>;

function generateVariantProducts(attributes: Array<z.infer<typeof AttributeSchema>>) {
  const combinations: Array<z.infer<typeof VariantSchema>> = [];

  // Helper function để lấy tổ hợp giá trị
  function combineValues(index: number, currentCombination: any) {
    if (index === attributes.length) {
      combinations.push({
        image: currentCombination.find((item: any) => item.image)?.image || "", // Lấy ảnh từ giá trị đầu tiên có `image`
        sku: "", // Hàm tạo SKU tùy thuộc vào tổ hợp
        price: 0, // Giá có thể được xác định tùy ý
        stock: 0, // Số lượng có thể được xác định tùy ý
        attributes: currentCombination.map((value: any) => ({
          id: value.id,
          attribute: value.attribute,
          value: value.value
        }))
      });
      return;
    }

    attributes[index].values.forEach(value => {
      combineValues(index + 1, [...currentCombination, {
        id: value.id,
        attribute: attributes[index].attribute,
        value: value.value,
        image: value.image
      }]);
    });
  }

  if (attributes.length > 0) {
    combineValues(0, []);
    return combinations;
  } else {
    return []
  }

}



export default function NewProductTestForm() {
  const info = useAppInfoSelector(state => state.profile.info);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const productFormHandle = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      variant: null,
      images: [],
      shop_id: info.shop_id,
      isCreated: false
    },
    // defaultValues: { ...JSON.parse(a), isCreated: true, variantMode: (JSON.parse(a) as any).variant ? true : false } as Product,
    mode: "all"
  });

  const watchedAttributes = useWatch({
    control: productFormHandle.control,
    name: "variant.variantAttributes",
  });

  const variantProducts = productFormHandle.watch("variant.variantProducts")
  const attributeFormHandle = useFieldArray({
    control: productFormHandle.control,
    name: "variant.variantAttributes",
  });
  const { fields: variantFields, append: addVariant, remove: deleteVariant } = attributeFormHandle;
  const { fields: variantProductFields } = useFieldArray({
    control: productFormHandle.control,
    name: "variant.variantProducts",
  });

  const onSubmit = async (data: Product) => {
    const newData = {
      ...data,
      variant: data.variant ? {
        variantItems: data.variant?.variantAttributes.map((v) => ({ ...v, name: v.attribute, attribute: undefined })),
        variantProducts: data.variant?.variantProducts.map((p) => ({ ...p, id: nanoid(12), variants: p.attributes, attributes: undefined }))
      } : null,
      infomation: [],
      category_id: data.category,
      category: undefined
    }
    try {
      setLoading(true);
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          'Content-type': "application/json"
        }
      })
      const payload = await res.json();
      if (!res.ok) {
        console.log('error: ', payload);
        throw 'Error';
      }
      console.log(payload);
      toast({
        variant: 'success',
        title: "Tao san pham thanh cong!"
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Error"
      })
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (watchedAttributes && !productFormHandle.formState.errors.variant?.variantAttributes) {
      if (!productFormHandle.getValues('isCreated')) {

        setTimeout(() => {
          const a = generateVariantProducts(productFormHandle.getValues('variant.variantAttributes'));
          // productFormHandle.setValue('variantMode', true);
          productFormHandle.setValue('variantMode', a.length > 0 ? true : false);
          productFormHandle.setValue('variant.variantProducts', a);
          productFormHandle.trigger('variant.variantProducts');

        }, 100)

      }
    }
  }, [watchedAttributes, productFormHandle.formState.errors.variant?.variantAttributes]);

  const handleImageClick = () => {
    let images = productFormHandle.getValues('images');
    if (images.length < 9) {
      fileInputRef.current?.click(); // Trigger sự kiện click của input file
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setLoadingImage(true);
        let length = productFormHandle.getValues('images').length;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images[]', files[i])
        }
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        if (!res.ok) {
          throw 'Error'
        }
        const payload: { status: boolean, message: string, images: string[] } = await res.json();
        const productImages = productFormHandle.getValues('images')
        productFormHandle.setValue('images', [...productImages, ...payload.images]);
        productFormHandle.setError('images', { message: undefined })

      } catch (error) {
        // setLoading(false);
        toast({ title: 'Error', variant: 'destructive' })
      } finally {
        setLoadingImage(false);
      }
    }
  };


  return (
    <form className="flex flex-col gap-4" onSubmit={productFormHandle.handleSubmit(onSubmit)}>
      <div className="w-full bg-white rounded">
        <div className="p-6 w-full">
          <div className="w-full">
            <div className="text-xl font-semibold">
              <span>Thông tin cơ bản</span>
            </div>
            <div className="my-6">
              <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
                Tên sản phẩm
              </div>
              <span className="">
                <input
                  {...productFormHandle.register('name')}
                  className={` border outline-none h-[30px] px-4 py-1 text-sm rounded focus:ring-1 w-full`}
                  type="text"
                  placeholder="Ex. Nikon Coolpix A300 Máy Ảnh Kỹ Thuật Số"
                />
                {/* <span>he</span> */}
              </span>
              {productFormHandle.formState.errors?.name?.message && <p className="text-sm text-red-500 mt-1">{productFormHandle.formState.errors.name.message}</p>}
            </div>
            <CategorySection productFormHandle={productFormHandle} setShowMore={setShowMore} />
            <div className="my-3">
              <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                Ảnh sản phẩm
              </div>
              <div className="w-full p-4 bg-[#f5f8fd] rounded flex gap-2">
                {productFormHandle.getValues('images').map((img, index) => (
                  <div key={index} className="border size-20">
                    <img src={img} className="size-full object-cover" alt="" />
                  </div>
                ))}
                {loadingImage ? (
                  <div className="">
                    <div className="border-dashed bg-white border group border-[#c4c4c4] cursor-pointer size-20 rounded flex items-center justify-center hover:border-blue-500">
                      <img className="size-4 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />

                    </div>
                  </div>

                ) : (
                  <div onClick={handleImageClick} className="">
                    <div className="border-dashed bg-white border group border-[#c4c4c4] cursor-pointer size-20 rounded flex items-center justify-center hover:border-blue-500">
                      <Plus size={32} strokeWidth={1.5} className="group-hover:text-blue-500 text-[#858585]" />
                    </div>
                  </div>
                )}

              </div>
              <input ref={fileInputRef} accept=".jpg, .jpeg, .png, .webp" onChange={handleFileChange} type="file" multiple hidden />
              {productFormHandle.formState.errors?.images?.message && <p className="text-sm text-red-500 mt-1">{productFormHandle.formState.errors.images.message}</p>}

            </div>

            <div className="mt-0">
              <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                Ảnh nền sản phẩm
              </div>
              <div className="w-1/2 p-4 bg-[#f5f8fd] rounded">
                {/* <div className="w-1/2">
                  <div className="border-dashed bg-white border group border-[#c4c4c4] cursor-pointer size-[60px] rounded flex items-center justify-center hover:border-blue-500">
                    <Plus size={32} strokeWidth={1.5} className="group-hover:text-blue-500 text-[#858585]" />
                  </div>
                </div> */}
                {productFormHandle.getValues('images').length > 0 && (
                  <div className="border size-20">
                    <img src={productFormHandle.getValues('images')[0]} className="size-full object-cover" alt="" />
                  </div>
                )}
                {productFormHandle.getValues('images').length === 0 && (
                  <div
                    className="border-dashed border-gray-400 border size-20 bg-white rounded">
                    <div className="size-full flex justify-center items-center">
                      <div className="px-1/2 flex flex-col justify-center items-center">
                        <input type="file" className="hidden" />
                        <ImagePlus color="#3389e6" strokeWidth={1} />
                        <div className="text-[12px] text-blue-600 text-center">Ảnh nền</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      {showMore && (
        <>
          <div className="w-full bg-white rounded">
            <div className="p-6 w-full">
              <div className="w-full">
                <div className="text-xl font-semibold">
                  <span>Thông tin chi tiết</span>
                </div>
              </div>
              <div>Update later</div>
            </div>
          </div>
          <div className="w-full bg-white rounded">
            <div className="p-6">
              <div className="text-xl font-semibold">
                <span>Giá bán, Kho hàng và Biến thể</span>
                <div className="text-[13px] text-gray-400 font-normal">
                  Tạo biến thể nếu sản phẩm có hơn một tùy chọn, ví dụ như về kích thước hay màu sắc.
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {variantFields.map((v, index) => (
                  <VariantAttribute
                    key={v.id}
                    attributeFormHandle={attributeFormHandle}
                    productFormHandle={productFormHandle}
                    index={index}
                  />
                ))}
              </div>
              {variantFields.length < 2 && (
                <button onClick={() => {
                  if (!productFormHandle.getValues('variant')) {
                    productFormHandle.setValue('variant', { variantAttributes: [], variantProducts: [] })
                  }
                  productFormHandle.setValue('price', null);
                  productFormHandle.setValue('stock', null);
                  productFormHandle.setValue('sku', null);
                  productFormHandle.setValue('variantMode', true);
                  addVariant({ attribute: "", values: [{ image: "", value: "", id: nanoid(12) }] })
                  productFormHandle.trigger()
                }} className="my-6 border p-2 px-3 flex items-center gap-1 rounded-xl text-sm" type="button">
                  <Plus size={16} strokeWidth={1.5} className="group-hover:text-blue-500 text-[#858585]" />
                  Thêm Loại biến thể ({variantFields.length}/2)
                </button>
              )}
              <div className="font-semibold mt-6 mb-6 flex items-center gap-2">
                <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
                Giá bán & Kho hàng
              </div>

              {productFormHandle.getValues('variantMode') && (
                <NewProductVariantTableTest
                  variantProductFields={variantProducts}
                  variantFields={productFormHandle.getValues('variant.variantAttributes')}
                  productFormHandle={productFormHandle}
                />
              )}

              {!productFormHandle.getValues('variantMode') && (
                <Table>
                  <TableHeader >
                    <TableRow className="bg-[#f5f8fe] hover:bg-[#f5f8fe] ">
                      <TableHead className="w-1/3 text-center text-black font-semibold">Giá</TableHead>
                      <TableHead className="w-1/3 text-center text-black font-semibold">Kho hàng</TableHead>
                      <TableHead className="w-1/3 text-center text-black font-semibold">SKU</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className=" hover:bg-white">
                      <TableCell className="w-1/3">
                        <div className="w-full px-1 py-3">
                          <div className="w-full flex items-center justify-center">
                            <div>
                              <div className={`
                           w-56 h-8 px-3 py-1 flex rounded
                          ${productFormHandle.formState.errors?.price?.message ? 'ring-1 ring-red-500' : 'border'}
                          `}>
                                <div className="flex items-center text-[12px] pr-2 text-gray-400">
                                  ₫
                                  <div className="ml-2 border-r h-full" />
                                </div>
                                <input
                                  {...productFormHandle.register('price', {
                                    valueAsNumber: true,
                                  })}
                                  className={`
                              w-full h-full outline-none text-[14px] 
                              `}
                                  placeholder="Giá" type="number" />
                              </div>
                              <div className="mt-1 text-sm text-red-500 h-5 flex items-center">{
                                productFormHandle.formState.errors?.price?.message ?
                                  productFormHandle.formState.errors.price.message : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-1/3">
                        <div className="w-full px-1 py-3">
                          <div className="w-full flex items-center justify-center">
                            <div>
                              <div className={`
                           w-56 h-8 px-3 py-1 flex rounded
                          ${productFormHandle.formState.errors?.stock?.message ? 'ring-1 ring-red-500' : 'border'}
                          `}>
                                <input
                                  {...productFormHandle.register('stock', { valueAsNumber: true })}
                                  className="w-full h-full outline-none text-[14px]"
                                  placeholder="Số lượng kho hàng" type="number" />
                              </div>
                              <div className="mt-1 text-sm text-red-500 h-5 flex items-center">{
                                productFormHandle.formState.errors?.stock?.message ?
                                  productFormHandle.formState.errors.stock.message : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-1/3">
                        <div className="w-full px-1 py-3">
                          <div className="w-full flex items-center justify-center">
                            <div>
                              <div className={`
                           w-56 h-8 px-3 py-1 flex rounded
                          ${productFormHandle.formState.errors?.sku?.message ? 'ring-1 ring-red-500' : 'border'}
                          `}>
                                <input
                                  {...productFormHandle.register('sku')}
                                  className="w-full h-full outline-none text-[14px]"
                                  placeholder="Giá" type="string" />
                              </div>
                              <div className="mt-1 text-sm text-red-500 h-5 flex items-center">{
                                productFormHandle.formState.errors?.sku?.message ?
                                  productFormHandle.formState.errors.sku.message : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}



            </div>
          </div>
          <div className="w-full bg-white rounded">
            <div className="p-6 w-full">
              <div className="w-full">
                <div className="text-xl font-semibold">
                  <span>Mô tả sản phẩm</span>
                </div>
                <div className="my-4">
                  <textarea
                    {...productFormHandle.register('description')}
                    placeholder="input"
                    className={`w-full p-2 text-sm rounded h-40 border outline-none 
                  ${productFormHandle.formState.errors?.description?.message ? 'border-red-500' : ''}`}
                  />
                  {productFormHandle.formState.errors?.description?.message && <p className="text-sm text-red-500 mt-1">{productFormHandle.formState.errors.description.message}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded">
            <div className="p-6 w-full">
              <div className="w-full">
                <div className="text-xl font-semibold">
                  <span>Vận chuyển</span>
                </div>
                <div className="my-6">
                  <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                    <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
                    Khối lượng kiện hàng (gram)
                  </div>
                  <span className="">
                    <input
                      {...productFormHandle.register('weight', { valueAsNumber: true })}
                      className={` border outline-none h-[30px] px-4 py-1 text-sm rounded  w-1/2 
                     ${productFormHandle.formState.errors?.weight?.message ? 'border-red-500' : 'focus:ring-1'}
                     `}
                      type="number"
                      placeholder="0.1 ~ 1600000 gram"
                      max={1600000}
                    />
                    {/* <span>he</span> */}
                  </span>
                </div>
                <div className="my-6">
                  <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                    <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
                    Kiện hàng Dài (cm) * Rộng (cm) * Cao (cm)
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/3 flex">
                      <input
                        {...productFormHandle.register('length', { valueAsNumber: true })}
                        className={` border outline-none h-[30px] px-4 py-1 text-sm rounded  w-full 
                      ${productFormHandle.formState.errors?.length?.message ? 'border-red-500' : 'focus:ring-1'}
                      `}
                        type="number"
                        placeholder="0.01 ~ 200 cm"
                        max={200}
                      />
                      <div className="px-3">x</div>
                    </div>
                    <div className="w-1/3 flex">
                      <input
                        {...productFormHandle.register('width', { valueAsNumber: true })}
                        className={` border outline-none h-[30px] px-4 py-1 text-sm rounded  w-full 
                    ${productFormHandle.formState.errors?.width?.message ? 'border-red-500' : 'focus:ring-1'}
                    `}
                        type="number"
                        placeholder="0.01 ~ 200 cm"
                        max={200}
                      />
                      <div className="px-3">x</div>
                    </div>
                    <div className="w-1/3 flex">
                      <input
                        {...productFormHandle.register('height', { valueAsNumber: true })}
                        className={` border outline-none h-[30px] px-4 py-1 text-sm rounded  w-full 
                      ${productFormHandle.formState.errors?.height?.message ? 'border-red-500' : 'focus:ring-1'}
                      `}
                        type="number"
                        placeholder="0.01 ~ 200 cm"
                        max={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
      <div className="w-full bg-white rounded">
        <div className="p-6 w-full flex justify-end items-center">
          <div className="flex gap-4">
            <Button onClick={() => {
              console.log(productFormHandle.getValues());
            }} className=" border p-2" type="button">log data</Button>
            <Button onClick={() => {
              console.log(productFormHandle.formState.errors);
            }} className=" border p-2" type="button">log error</Button>
            <Button type="submit">Gửi đi</Button>
          </div>
        </div>
      </div>
      {loading && (<LoadingScreen />)}
    </form>

  )
}



