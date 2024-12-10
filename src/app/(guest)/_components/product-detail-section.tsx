'use client'

import AttributesTable from "@/app/(guest)/_components/attributes-table"
import Comment from "@/app/(guest)/_components/comment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { formattedPrice } from "@/lib/utils"
import { addCart } from "@/redux/slices/profile.slice"
import { useAppDispatch } from "@/redux/store"
import { Check, Heart, PhoneCall, ShoppingBasket, SquareCheckBig, Star, Store } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { Label } from "@/components/ui/label";
import { useAppInfoSelector } from "@/redux/stores/profile.store"
import { isSet } from "lodash"
import Link from "next/link"
function formatTimeDifference(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const now = new Date();

  // Tính khoảng cách thời gian (theo milliseconds)
  const diffInMs = now.getTime() - createdDate.getTime();

  // Quy đổi milliseconds sang ngày, tháng, năm
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInMonths / 12;

  if (diffInMonths < 1) {
    return '1 Tháng Trước';
  } else if (diffInMonths < 13) {
    const months = Math.floor(diffInMonths);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInYears);
    return `${years} năm trước`;
  }
}


export default function ProductDetailSection({ product, variant, test }: { product: any, variant: any, test?: any }) {

  const [variantSelected, setVariantSelected] = useState<any[]>(() => {
    if (variant) {
      return variant.variantItems.map((a: any, index: number) => ({ index, id: "" }))
    }
    return []
  });

  const dispatch = useAppDispatch();


  const [rootProduct, setRootProduct] = useState<any>({ ...product });
  const [selectedProduct, setSelectedProduct] = useState<any>(
    {
      ...rootProduct,
      stock: variant ? variant.variantProductsBE.reduce((acc: number, cur: any) => acc + (+cur.stock), 0) : +rootProduct.quantity
    }
  );
  const [imageHoverSelected, setImageHoverSelected] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const info = useAppInfoSelector(state => state.profile.info);

  useEffect(() => {
    if (variant) {
      // const variantProductsMe = variant.json.variantProducts;
      const variantProductBE = variant.variantProductsBE;

      const findProduct = variantProductBE.find((p: { variants: { id: string }[] }) => {
        if (variantSelected.length !== p.variants.length) return false;
        const setA = new Set(variantSelected.map(item => item.id));
        const setB = new Set(p.variants.map(item => item.id));
        return (
          setA.size === setB.size &&
          Array.from(setA).every((id) => setB.has(id))
        );
      });
      if (findProduct) {
        setSelectedProduct((prev: any) => {
          return { ...prev, image: findProduct.images, show_price: formattedPrice(findProduct.price), variant_id: +findProduct.id, stock: +findProduct.stock }
        })
      }
    }


  }, [variantSelected])




  const handleAddToCart = async () => {
    if (!clientAccessToken.value) {
      router.push('/auth/login')
    }
    let data: any = { shop_id: +selectedProduct.shop_id, product_id: selectedProduct.id, quantity }
    if (variant) {
      const isValid = variantSelected.every(v => v.id);
      if (!isValid) {
        setErrorMessage("Vui lòng chọn phân loại hàng");
        return
      }
      if (!selectedProduct.stock) {
        return
      }
      data = { ...data, variant_id: selectedProduct.variant_id };

    }
    if (selectedProduct.stock <= 0) { return }
    try {
      setLoading(true);
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const payload = await res.json();
      if (!res.ok) {
        throw 'Error'
      }
      const resToServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts`, {
        headers: {
          "Authorization": `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        },
      });

      if (!resToServer.ok) {
        throw 'Error'
      }
      const cartPayload = await resToServer.json();
      const newCart = cartPayload.shop.map((shop: any) => {
        const shop_id = shop.id;
        const items = cartPayload.cart.filter((p: any) => +p.shop_id === shop_id);

        return {
          ...shop,
          items
        }
      })
      dispatch(addCart(newCart))
      setSuccess(true)
    } catch (error) {
      toast({ title: "Error", variant: "destructive" })
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 1000)

    }
  }






  return (
    <>
      {success && (
        <div className="fixed inset-0 flex justify-center items-center z-[1000] font-[sans-serif]">
          <div className="relative w-[300px] bg-black bg-opacity-70 shadow-lg rounded-lg p-6 flex flex-col items-center">
            {/* Vòng tròn chứa icon */}
            <div className="w-16 h-16 bg-[#16d8a5] rounded-full flex items-center justify-center shadow-md">
              <Check color="#ffffff" size={36} />
            </div>
            {/* Nội dung thông báo */}
            <h4 className="text-center text-white text-sm font-medium mt-4">
              Sản phẩm đã được thêm vào giỏ hàng
            </h4>
          </div>
        </div>
      )}


      <div className="w-full flex border shadow bg-white rounded">
        <div className="w-2/5 p-4">
          <div className="w-full">
            <div className="w-full h-[450px]">
              <img className="border size-full object-cover" src={imageHoverSelected ? imageHoverSelected : selectedProduct.image} alt="" />
            </div>
            <div className=" my-[5px] -mx-[5px] flex">
              {selectedProduct.images.map((i: { url: string }, index: number) => (
                <div key={index} className="p-[5px] size-[92px]">
                  <div
                    onMouseEnter={() => setImageHoverSelected(i.url)}
                    onMouseLeave={() => setImageHoverSelected('')}
                    onClick={() => setSelectedProduct({ ...selectedProduct, image: i.url })}
                    className={`size-full cursor-pointer border ${i.url === selectedProduct.image ? "border-blue-500" : "border-white"}`}>
                    <img className="border size-full object-cover" src={i.url} alt="" />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        <div className="w-3/5 p-4">
          <div className="w-full">
            <div className="w-full h-[180px] relative">
              <div className="w-full mb-2">
                <span className="text-[20px] font-bold">{selectedProduct.name}</span>
              </div>
              <div className="w-full">
                <span className="text-[14px] font-normal">Thương hiệu: OEM</span>
              </div>
              <div className="w-full">
                <span className="text-[24px] font-bold text-red-500">{selectedProduct.show_price}</span>
              </div>
              <div className="absolute bottom-0 w-full left-0">
                <div className="w-full flex gap-3 items-center">
                  <div className="flex gap-1">
                    <Star size={16} className="text-yellow-500" />
                    <Star size={16} className="text-yellow-500" />
                    <Star size={16} className="text-yellow-500" />
                    <Star size={16} className="text-yellow-500" />
                    <Star size={16} className="text-yellow-500" />
                  </div>
                  <span className="text-[14px] text-blue-500">71 đánh giá</span>
                  <div className="flex gap-1 items-center">
                    <ShoppingBasket size={16} className="text-gray-400" />
                    <span className="text-[14px] text-gray-400">{selectedProduct.sold_count} lượt mua</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-4 py-[5px] border-t">
              <div className="w-full mt-2">
                {
                  variant ? variant.variantItems.map((va: any, index: number) => {

                    return (
                      <div key={index} className="flex w-full mb-6 mr-2 items-center">
                        <div className="w-[200px] text-gray-500 text-[14px] leading-8">
                          Chọn {va.name}
                        </div>
                        <div className="w-[calc(100%-160px)] flex gap-1 flex-wrap">
                          {va.values.map((v: any, subIndex: number) => {
                            return (
                              <div
                                onClick={() => {
                                  setVariantSelected((prev) => {
                                    prev[index].id = v.id;
                                    return [...prev]
                                  });
                                  setErrorMessage('')
                                }}
                                key={subIndex}
                                className={`inline-flex items-center justify-center
                                        hover:border-blue-700 hover:text-blue-700 min-w-[60px] border-2
                                        text-[14px] rounded p-2 mt-2 mr-2 relative cursor-pointer
                                        ${variantSelected.some((x: any) => x.id === v.id) ? "border-blue-700 text-blue-700 " : "text-gray-500 "} 
                                        flex gap-3
                                        `
                                }
                                onMouseEnter={() => setImageHoverSelected(v.image)}
                                onMouseLeave={() => setImageHoverSelected('')}
                              >
                                {v.image && (
                                  <img src={v.image} alt="" className="size-8" />
                                )}
                                <p>{v.value}</p>
                                {variantSelected.some((x: any) => x.id === v.id) && (
                                  <div className="absolute -top-[2px] -right-[1px]">
                                    <img className="size-4" src="https://salt.tikicdn.com/ts/upload/6d/62/b9/ac9f3bebb724a308d710c0a605fe057d.png" alt="" />
                                  </div>
                                )}

                              </div>
                            )
                          })}

                        </div>
                      </div>
                    )
                  }) : ""
                }
              </div>
              <div className="w-full flex mb-6 items-center">
                <div className="w-[200px] text-gray-500 text-[14px] leading-8">
                  Chọn số lượng:
                </div>
                {variantSelected.every(v => v.id) && (
                  <div className="flex">
                    <div className="p-[5px]">
                      <Button onClick={() => {
                        if (quantity !== 1) setQuantity(prev => prev - 1)
                      }} className="bg-gray-100 size-8 hover:bg-gray-100 text-gray-500">-</Button>
                    </div>
                    <div className="p-[5px]">
                      <Input min={1} onChange={(e) => setQuantity(+e.target.value)} className="w-12 text-center h-8 text-[14px]" type="number" value={quantity} />
                    </div>
                    <div className="p-[5px]">
                      <Button onClick={() => setQuantity(prev => prev + 1)} className="bg-gray-100 size-8 hover:bg-gray-100 text-gray-500">+</Button>
                    </div>
                  </div>
                )}
                {!variantSelected.every(v => v.id) && (
                  <div className="flex">
                    <div className="p-[5px]">
                      <Button className="bg-gray-100 size-8 hover:bg-gray-100 text-gray-500">-</Button>
                    </div>
                    <div className="p-[5px]">
                      <Input readOnly defaultValue={1} className="w-12 text-center h-8 text-[14px]" type="number" />
                    </div>
                    <div className="p-[5px]">
                      <Button className="bg-gray-100 size-8 hover:bg-gray-100 text-gray-500">+</Button>
                    </div>
                  </div>
                )}
                <div className="ml-8 w-[200px] text-gray-500 text-[14px] leading-8">{selectedProduct.stock} sản phẩm sẵn có</div>
              </div>
              {info?.shop_id && +info.shop_id === +product.shop_id ? '' : (
                <>
                  {errorMessage && (<div className="text-red-600 text-sm">{errorMessage}</div>)}
                  <div className="w-full flex my-2">
                    <>
                      <Button disabled={loading || selectedProduct.stock <= 0} onClick={handleAddToCart} className={`bg-white h-12 w-60 flex gap-4 font-semibold text-blue-700 border-blue-700 border-2 rounded hover:bg-white mr-4`}>
                        {loading && (
                          <img className="size-5 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
                        )}
                        Thêm vào giỏ
                      </Button>
                      <Button className="bg-[#ff424e] h-12 w-60 font-semibold  rounded text-white hover:bg-[#ff424e]">Mua ngay</Button>
                    </>

                  </div>
                </>
              )}


            </div>
            {/* <div className="w-full border-t">
              <div className="font-bold py-5 text-[16px]">Ưu đãi dành cho bạn</div>
              <div className="w-full flex flex-wrap">
                <div className="w-1/2 mb-4 flex gap-2">
                  <img className="size-6" src="https://media3.scdn.vn/img4/2023/08_29/HDgWOVQr93hTWAFmecC3.png" alt="" />
                  <span className="text-[14px] font-normal">Trả góp qua AFTEE</span>
                </div>
                <div className="w-1/2 mb-4 flex gap-2">
                  <img src="https://media3.scdn.vn/img4/2023/04_17/9wtTH9rjcQ4CVH1s7SeW.png" className="size-6" />
                  <span className="text-[14px] font-normal">Trả góp Muadee</span>
                </div>
                <div className="w-1/2 mb-4 flex gap-2">
                  <img src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png" className="size-6" />
                  <span className="text-[14px] font-normal">Trả góp Kredivo</span>
                </div>
              </div>
            </div> */}
            <div className="w-full border-t">
              <div className="font-bold py-5 text-[16px]">Quyền lợi khách hàng & Bảo hành</div>
              <div className="flex gap-8">
                <div className="flex gap-2">
                  <SquareCheckBig size={20} color="green" />
                  <span className="text-[14px]">48 giờ hoàn trả</span>
                </div>
                <div className="flex gap-2">
                  <SquareCheckBig size={20} color="green" />
                  <span className="text-[14px]">Bảo hành theo chính sách từ Nhà bán hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-6">
        <div className="w-2/5 pr-4 ">
          <div className="shadow border p-4 w-full">
            <div className="font-bold text-[16px]">Thông tin nhà cung cấp</div>
            <div className="flex mt-4 gap-4">
              <div className="size-16">
                <div className="size-full border-2 rounded-full">
                  <img src="https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png" alt="" />
                </div>
              </div>
              <div>
                <div className="font-bold text-[16px]">{selectedProduct.shop.shop_name}</div>
                <span className="text-[12px] text-gray-400">
                  Đồng Nai |
                  <span> 4.7 <span className="text-[#f0ce11] text-[14px]">★</span></span>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4">
              <div className="text-center">
                <div className="text-[12px] font-normal">Đã tham gia</div>
                <span className="text-[16px] font-bold mb-2">{formatTimeDifference(selectedProduct.shop.created_at)}</span>
              </div>
              <div className="text-center">
                <span className="text-[16px] font-bold mb-2">{selectedProduct.shop.countProduct}</span>
                <div className="text-[12px] font-normal">Sản phẩm</div>
              </div>
            </div>
            <div className="w-full flex gap-2 mt-4">
              {selectedProduct.shop.is_follow === null ? (
                <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 w-[45%] text-black"
                  onClick={async () => {
                    try {
                      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/follows/${selectedProduct.shop.id}`, {
                        method: 'DELETE',
                        headers: {
                          Authorization: `Bearer ${clientAccessToken.value}`,
                          'Content-Type': 'application/json',
                        },
                      });
                      console.log(response);

                      if (!response.ok) {
                        throw new Error('Follow cửa hàng thất bại');
                      };
                      toast({ title: 'Follow cửa hàng thành công', variant: 'success' });
                    } catch (error) {
                      toast({ title: 'Error', variant: 'destructive' });
                    }
                  }}
                >
                  <Heart size={20} />
                  <span className="ml-2">Đã theo dõi</span>
                </Button>
              ) : (
                <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 w-[45%] text-black"
                  onClick={async () => {
                    try {
                      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/up_follow/${selectedProduct.shop.id}`, {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${clientAccessToken.value}`,
                          'Content-Type': 'application/json',
                        },
                      });
                      console.log(response);

                      if (!response.ok) {
                        throw new Error('Follow cửa hàng thất bại');
                      };
                      toast({ title: 'Follow cửa hàng thành công', variant: 'success' });
                    } catch (error) {
                      toast({ title: 'Error', variant: 'destructive' });
                    }
                  }}
                >
                  <Heart size={20} />
                  <span className="ml-2">Theo dõi shop</span>
                </Button>
              )}

              <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 w-[45%] text-black">
                <Link className="flex items-center" href={`/vendors/${selectedProduct.shop_id}`}>
                  <Store size={20} />
                  <span className="ml-2">Vào shop</span>
                </Link>
              </Button>
              <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 w-[10%] text-black">
                <PhoneCall size={20} />
              </Button>
            </div>
            <div className="mt-4 border-t">
              <div className="mt-4 text-[14px] font-bold">
                Gợi ý thêm từ shop
              </div>
              <div className="mt-4 w-full bg-gradient-to-b from-white to-blue-200">
                <div className="w-full border overflow-hidden">
                  <div className="w-[600px] translate-x-2 flex gap-2">
                    {selectedProduct.shop.products.map((product: any, index: number) => {
                      let length = product.show_price ? (product.show_price as string).split(' - ').length : null;
                      let show_price = ''
                      if (length) {
                        if (length > 1) {
                          show_price = (product.show_price as string).split(' - ').map((p: any) => formattedPrice(+p)).join(' - ');
                        } else {
                          show_price = formattedPrice(+product.show_price)
                        }
                      } else {
                        show_price = formattedPrice(+product.price)
                      }
                      return (
                        <div key={index} className="mb-3 w-[120px] shadow-sm bg-white rounded-sm">
                          <div className="size-[120px]">
                            <Link href={`/products/${product.slug}`}>
                              <img className="size-full object-cover" src={product.image} alt="" />
                            </Link>
                          </div>
                          <div className="p-2">
                            <p className="text-[14px] font-normal text-ellipsis">
                              {product.name.length > 20 ? `${product.name.substring(0, 13)}...` : product.name}
                            </p>
                            <div className="w-full h-4"></div>
                            <span className="text-[12px] text-red-500 font-bold">{formattedPrice(product.show_price)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5">
          <div className="w-full p-4 shadow border mb-4">
            <div className="text-[16px] font-bold mb-4">
              Mô tả sản phẩm
            </div>
            <p className="text-[14px] font-normal mb-4">
              {selectedProduct.description}
            </p>
            {/* <div className="text-[16px] font-bold mb-4">
              Thông tin cơ bản
            </div>
            <div className="mb-4">
              <AttributesTable />
            </div>
            <div className="text-[16px] font-bold mb-4">
              Chi tiết sản phẩm
            </div>
            <p className="text-[14px] font-normal">
              Chi tiết sản phẩm
            </p> */}
          </div>
          <div className="w-full p-4 shadow border">
            <span className="text-[16px] font-bold mb-4">
              Đánh giá và nhận xét sản phẩm <span className="text-gray-400 font-normal text-[14px] text-">( 71 lượt đánh giá)</span>
            </span>
            <div className="flex gap-8">
              <div className="w-1/2 flex flex-col justify-center">
                <span>
                  <span className="font-bold text-black text-[30px]">4.6</span>
                  <span className="font-bold text-black text-[22px]">/</span>
                  <span className="font-bold text-red-500 text-[22px]">5</span>
                  <span className="ml-4 text-[#f0ce11] text-[20px]">★★★★★</span>
                </span>
                <span className="italic text-[14px] text-gray-500">
                  Đây là thông tin người mua đánh giá shop bán sản
                  phẩm này có đúng mô tả không.
                </span>
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="flex">
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div className="w-40 h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"></div>
                    </div>
                    <span className="text-[14px] font-bold">10</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex">
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div className="w-40 h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"></div>
                    </div>
                    <span className="text-[14px] font-bold">10</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex">
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div className="w-40 h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"></div>
                    </div>
                    <span className="text-[14px] font-bold">10</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex">
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div className="w-40 h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"></div>
                    </div>
                    <span className="text-[14px] font-bold">10</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex">
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                    <span className="text-[#f0ce11]">★</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div className="w-40 h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"></div>
                    </div>
                    <span className="text-[14px] font-bold">10</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button>Tất cả</Button>
              <Button className="bg-gray-100 rounded-none hover:bg-gray-100 w-[10%] text-black">
                1 sao
              </Button>
              <Button className="bg-gray-100 rounded-none hover:bg-gray-100 w-[10%] text-black">
                2 sao
              </Button>
              <Button className="bg-gray-100 rounded-none hover:bg-gray-100 w-[10%] text-black">
                3 sao
              </Button>
              <Button className="bg-gray-100 rounded-none hover:bg-gray-100 w-[10%] text-black">
                4 sao
              </Button>
              <Button className="bg-gray-100 rounded-none hover:bg-gray-100 w-[10%] text-black">
                5 sao
              </Button>

            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-8 flex flex-col gap-6">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </>
  )

}
