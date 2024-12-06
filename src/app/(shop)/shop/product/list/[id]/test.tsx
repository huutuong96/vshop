'use client'

export default function Test12335({ variant, product }: { variant: any, product: any }) {
  // let a = {
  //   ...product, variant: (product.variants && product.variants.length > 0) ? {
  //     variantAttributes: variant.variantItems.map((v: any) => ({ ...v, attribute: v.name, name: undefined })),
  //     variantProducts: [...product.variants.map((v: any, index: number) => ({ ...v, variants: JSON.parse(product.json_variants).variantProducts[index].variants }))],
  //   } : null,
  //   json_variants: (product.variants && product.variants.length > 0) ? JSON.parse(product.json_variants) : null,
  //   // isCreated: true,
  //   variantMode: (product.variants && product.variants.length > 0) ? true : false,
  //   price: (!product.variants || product.variants.length === 0) ? +product.price : null,
  //   stock: (!product.variants || product.variants.length === 0) ? +product.quantity : null,
  //   sku: (!product.variants || product.variants.length === 0) ? product.sku : null,
  // }
  console.log({ product, a: JSON.parse(product.json_variants) });
  return (
    <div>test</div>
  )
}
