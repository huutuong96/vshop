import AttributesTable from "@/app/(guest)/_components/attributes-table";
import Comment from "@/app/(guest)/_components/comment";
import { GuestBreadCrumb } from "@/app/(guest)/_components/guest-breadcrumb";
import ProductDetailSection from "@/app/(guest)/_components/product-detail-section";
import TestAbx from "@/app/(guest)/products/test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import envConfig from "@/config";
import { Heart, PhoneCall, ShoppingBasket, SquareCheckBig, Star, Store } from "lucide-react";
import Head from "next/head";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/products/slug/${slug}`, {
    cache: "no-cache"
  });
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
    const payloadProduct = await resProduct.json();
    if (!resProduct.ok) {
      throw new Error();
    }
    const product = payloadProduct.data;
    const resVariant = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/variantattribute/${product.shop_id}/${product.id}`);
    const payloadVariant = await resVariant.json();
    // const { attribute, value, variant, variantattribute } = payloadVariant.data;

    // const variantsString = attribute.map((a: any) => {
    //   const valuesVariant = value.filter((v: any) => +v[0].attribute_id === a[0].id).map((v: any) => v[0]);
    //   return {
    //     name: `Chọn ${a[0].name}`,
    //     values: valuesVariant
    //   }
    // });

    const variant = payloadVariant.json ? { json: payloadVariant.json, variantProducts: payloadVariant.variants.product_variants } : null;

    return (

      <div className="w-full ">
        <Head>
          <title>{product.name}</title>
        </Head>
        <GuestBreadCrumb />
        <ProductDetailSection product={payloadProduct.data} variant={variant} />
      </div>
    )
  } catch (error) {
    console.log(error);
    notFound();
  }

}
