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
import NewProductVariantTableTest from "@/app/(shop)/shop/product/new-test/new-product-variant-table-test";
import VariantAttribute from "@/app/(shop)/shop/product/new-test/variant-attribute";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useFieldArray, UseFieldArrayReturn, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import CategorySection from "@/app/(shop)/shop/product/new-test/category-section";

let a = `{"name":"","description":"","base_price":0,"variant":{"variantAttributes":[{"attribute":"Màu sắc","values":[{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997693/fezssmr33wcbcxkmmdjo.jpg","value":"Đỏ","id":"KHEe7uPH2xNn"},{"id":"UvmWW-PShcR7","image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997701/wifesk9mwan06xbfch9f.jpg","value":"xanh"}]}],"variantProducts":[{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997693/fezssmr33wcbcxkmmdjo.jpg","sku":"sku","price":100000,"stock":10,"attributes":[{"id":"KHEe7uPH2xNn","attribute":"Màu sắc","value":"Đỏ"}]},{"image":"https://res.cloudinary.com/dg5xvqt5i/image/upload/v1730997701/wifesk9mwan06xbfch9f.jpg","sku":"sku","price":100000,"stock":10,"attributes":[{"id":"UvmWW-PShcR7","attribute":"Màu sắc","value":"xanh"}]}]}}`

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
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  base_price: z.number().min(0, "Base price must be a non-negative number"),
  variant: z.object({
    variantAttributes: z.array(AttributeSchema),
    variantProducts: z.array(VariantSchema)
  }).nullable(),
  isCreated: z.boolean(),
  variantMode: z.boolean()
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

  const productFormHandle = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    // defaultValues: {
    //   name: "",
    //   description: "",
    //   base_price: 0,
    //   variant: { variantAttributes: [], variantProducts: [] }
    // },
    defaultValues: { ...JSON.parse(a), isCreated: true, variantMode: (JSON.parse(a) as any).variant ? true : false } as Product,
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

  const onSubmit = (data: Product) => {
    console.log(data);
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
  }, [watchedAttributes, productFormHandle.formState.errors.variant?.variantAttributes])

  return (
    <form className="flex flex-col gap-4" onSubmit={productFormHandle.handleSubmit(onSubmit)}>
      <div className="w-full bg-white rounded-xl">
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
                  className={` border outline-none h-[30px] px-4 py-1 text-sm rounded-xl focus:ring-1 w-full`}
                  type="text"
                  placeholder="Ex. Nikon Coolpix A300 Máy Ảnh Kỹ Thuật Số"
                />
                {/* <span>he</span> */}
              </span>
            </div>
            <CategorySection />
            <div className="my-6">
              <div className="text-sm mb-2 font-semibold flex items-center gap-1">
                Ảnh sản phẩm
                <Asterisk size={16} color="#e83030" strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl">
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
                        <div className="border w-56 h-8 px-3 py-1 flex rounded">
                          <div className="flex items-center text-[12px] pr-2 text-gray-400">
                            ₫
                            <div className="ml-2 border-r h-full" />
                          </div>
                          <input className="w-full h-full outline-none text-[14px]" placeholder="Giá" type="number" defaultValue={0} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/3">
                    <div className="w-full px-1 py-3">
                      <div className="w-full flex items-center justify-center">
                        <div className="border w-56 h-8 px-3 py-1 flex rounded">
                          <input className="w-full h-full outline-none text-[14px]" placeholder="Giá" type="number" defaultValue={0} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/3">
                    <div className="w-full px-1 py-3">
                      <div className="w-full flex items-center justify-center">
                        <div className="border w-56 h-8 px-3 py-1 flex rounded">
                          <input className="w-full h-full outline-none text-[14px]" placeholder="Giá" type="number" defaultValue={0} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}


          <button onClick={() => {
            console.log(productFormHandle.getValues());
          }} className="mt-6 border p-2" type="button">log data</button>
          <button onClick={() => {
            console.log(productFormHandle.formState.errors);
          }} className="mt-6 border p-2" type="button">log error</button>
          <button className="mt-6 border p-2" type="submit">Them san pham</button>
        </div>
      </div>
    </form>

  )
}



