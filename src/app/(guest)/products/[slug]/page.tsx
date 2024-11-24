import AttributesTable from "@/app/(guest)/_components/attributes-table";
import Comment from "@/app/(guest)/_components/comment";
import { GuestBreadCrumb } from "@/app/(guest)/_components/guest-breadcrumb";
import ProductDetailSection from "@/app/(guest)/_components/product-detail-section";
import TestAbx from "@/app/(guest)/products/test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import envConfig from "@/config";
import { formattedPrice } from "@/lib/utils";
import { Heart, PhoneCall, ShoppingBasket, SquareCheckBig, Star, Store } from "lucide-react";
import Head from "next/head";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/slug/${slug}`, {
    cache: "no-cache"
  });
  if (!res.ok) {
    return {
      title: `404 Not found`,
    };
  }
  const payload = await res.json();

  return {
    title: `${payload.data.name}`,
  };
}

export default async function ProductDetailPage({ params: { slug } }: { params: { slug: string } }) {
  try {
    const resProduct = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/slug/${slug}`, {
      cache: "no-cache"
    });
    const productPayload = await resProduct.json();
    if (!resProduct.ok) {
      return notFound()
    }
    const product = productPayload.data;
    const resVariant = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/variantattribute/${product.shop_id}/${product.id}`);
    const payloadVariant = await resVariant.json();
    const variant = payloadVariant.json ? {
      variantItems: payloadVariant.json.variantItems,
      variantProductsBE: payloadVariant.variants.product_variants.map((v: any, index: number) => ({
        ...v,
        variants: payloadVariant.json.variantProducts[index].variants,
        price: +v.price,
        stock: +v.stock
      }))
    } : null;

    let show_price = (productPayload.data.show_price as string).split(' - ').length > 1 ?
      (productPayload.data.show_price as string).split(' - ').map(p => formattedPrice(+p)).join(" - ") : formattedPrice(+productPayload.data.show_price);


    return (

      <div className="w-content">
        <div className="w-full ">
          <Head>
            <title>{product.name}</title>
          </Head>
          <GuestBreadCrumb />
          <ProductDetailSection product={{ ...productPayload.data, show_price }} variant={variant} />
        </div>
      </div>
    )
  } catch (error) {
    console.log(error);
    notFound();
  }

}
