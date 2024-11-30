import ProductDetailShopSection from "@/app/(shop)/shop/product/list/[id]/product-detail-shop-section";
import NewProductTestForm from "@/app/(shop)/shop/product/new/new-product-test-form";
import envConfig from "@/config";
import { notFound } from "next/navigation";


export default async function ProductDetailShopPage({ params: { id } }: { params: { id: string } }) {
  try {
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/${id}`, {
      cache: "no-cache"
    });
    if (!res.ok) {
      throw 'Error'
    }
    const payload = await res.json();
    const product = {
      ...payload.data, images: payload.data.images.map((a: any) => a.url),
      variantMode: (payload.data.variants || payload.data.variants.length > 0) ? true : false,
      category: payload.data.category_id,
    }


    let variant = product.variants.length > 0 ? JSON.parse(product.json_variants) : null;
    let a = {
      ...product, variant: (product.variants && product.variants.length > 0) ? {
        variantAttributes: variant.variantItems.map((v: any) => ({ ...v, attribute: v.name, name: undefined })),
        variantProducts: [...product.variants.map((v: any, index: number) => ({ ...v, variants: JSON.parse(product.json_variants).variantProducts[index].variants }))],
      } : null,
      json_variants: (product.variants && product.variants.length > 0) ? JSON.parse(product.json_variants) : null,
      // isCreated: true,
      variantMode: (product.variants && product.variants.length > 0) ? true : false,
      price: (!product.variants || product.variants.length === 0) ? +product.price : null,
      stock: (!product.variants || product.variants.length === 0) ? +product.quantity : null,
      sku: (!product.variants || product.variants.length === 0) ? product.sku : null,
    }


    return (
      <ProductDetailShopSection product={{ ...a }} />
    )
  } catch (error) {
    console.log(error);
    return notFound()
  }
}
