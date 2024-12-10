'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { changeQuantity, selectItem } from "@/redux/slices/profile.slice";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from 'lodash/debounce';


export default function CartItem({ item, index, subIndex, itemsLength, checked }: { item: any, index: number, subIndex: number, itemsLength: number, checked: boolean }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempQuantity, setTempQuantity] = useState(+item.quantity);



  const debouncedUpdateQty = useCallback(
    debounce(async (quantity) => {
      try {
        setLoading(true);
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ quantity }),
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
            "Content-Type": "application/json",
          },
        });

        const payload = await res.json();
        if (!res.ok) {
          console.error(payload);
          throw new Error("Failed to update quantity");
        }

        // Dispatch action khi API thành công
        dispatch(changeQuantity({ index, subIndex, quantity }));
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [clientAccessToken, envConfig, item.id, index, subIndex, dispatch]
  );

  const handleChangeQty = (type: "increment" | "decrement") => {
    const newQuantity = type === "increment" ? tempQuantity + 1 : (tempQuantity >= 2 ? tempQuantity - 1 : 1);

    // Cập nhật state tạm
    setTempQuantity(newQuantity);

    // Gọi debounce để trì hoãn việc gọi API
    debouncedUpdateQty(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    // Cập nhật giá trị ngay lập tức cho giao diện
    setTempQuantity(newQuantity);

    // Gọi hàm debounce
    debouncedUpdateQty(newQuantity);
  };

  // Hủy debounce khi component unmount
  useEffect(() => {
    return () => {
      debouncedUpdateQty.cancel();
    };
  }, [debouncedUpdateQty]);




  const handleDeleteCartItem = async (index: number, subIndex: number, id: number) => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/carts/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        throw 'Error'
      }
      dispatch(changeQuantity({ index, quantity: 0, subIndex }))
    } catch (error) {
      toast({ title: "Error", variant: "destructive" })
    }
  }


  return (
    <div className={`w-full p-4 px-6 pl-14 ${item.quantity === 0 ? 'bg-gray-50' : ''}`}>
      <div className={`w-full flex items-center relative ${itemsLength !== subIndex + 1 ? "border-b" : ""}`}>
        <div className=' absolute top-8 -left-14'>
          {item.quantity === 0 ? (
            <div className="text-[12px] px-1 border rounded-xl ml-4 text-white bg-gray-400">Hết hàng</div>
          ) : (
            <Checkbox
              checked={checked}
              onCheckedChange={(c) => {
                let checked = c as boolean;
                dispatch(selectItem({ checked, id: item.id, shop_id: +item.shop_id }))
              }}
              className='size-4 ml-4 mr-2'
            />
          )}
        </div>
        <div className={`w-[317px] h-[109px] flex-col items-center ${item.quantity === 0 ? 'pl-8' : ''}`}>
          <div className='w-full h-[83px] flex items-center gap-2'>
            <div className='w-[80px] h-[80px]'>
              <img src={item.product_image ? item.product_image : item.variant_image} className='w-full h-full object-cover' alt="" />
            </div>
            <div className='w-[calc(100%-80px-8px)] h-full p-1 px-2'>
              <Link href={`/products/${item.product_slug}`} className='text-[14px] hover:text-blue-700'>{item.product_name}</Link>
            </div>
          </div>
          <div className='w-full h-[20px] flex items-center'>
            {item.quantity === 0 ? (
              <span className='text-[12px] text-red-500'>Sản phẩm này đã hết</span>
            ) : (
              // <span className='text-[12px] text-blue-500'>Fash Sale kết thúc lúc 23:59:00</span>
              ''
            )}
          </div>
        </div>
        <div className='w-[188px] h-[80px] flex flex-col justify-center text-[14px] text-[#0000008a]'>
          {item.variant_name && (
            <>
              <p >Phân loại hàng : </p>
              <span>{item.variant_name}</span>
            </>
          )}
        </div>
        <div className={` w-[173px] h-[80px] flex items-center justify-center text-[14px] `}>
          {item.quantity === 0 ? (
            <span>{formattedPrice(0)}</span>
          ) : (
            <span>{item.variant_price ? formattedPrice(+item.variant_price) : formattedPrice(+item.product_price)}</span>
          )}
        </div>
        <div className='w-[168px] h-[80px] flex justify-center items-center'>
          {item.quantity === 0 ? (
            <span className="text-sm">0</span>
          ) : loading ? (
            <>
              <span className='px-1 border rounded-tl-sm rounded-bl-sm w-[30px] text-center text-gray-300'>-</span>
              <span className='text-sm text-gray-300 border-b border-t w-[40px] h-[25.6px] flex items-center justify-center'>{tempQuantity}</span>
              <span className='px-1 border w-[30px] rounded-tr-sm rounded-br-sm text-gray-300 text-center'>+</span>
            </>
          ) : (
            <>
              <span
                onClick={() => handleChangeQty("decrement")}
                className='px-1 border rounded-tl-sm rounded-bl-sm w-[30px] text-center cursor-pointer'
              >
                -
              </span>
              <input
                ref={inputRef}
                // onChange={async (e) => handleChangeQty(+e.target.value, index, subIndex, item.id)}
                type="number"
                className='text-sm border-b border-t w-[40px] h-[25.6px] text-center'
                value={tempQuantity}
                onChange={handleInputChange}
              // defaultValue={item.quantity}
              />
              <span onClick={() => handleChangeQty("increment")} className='px-1 border rounded-tr-sm rounded-br-sm w-[30px] text-center cursor-pointer'>+</span>
            </>
          )}
          {/* <button disabled={loading || tempQuantity <= 1} onClick={() => handleChangeQty("decrement")}>
            -
          </button>
          <span>{tempQuantity}</span>
          <button disabled={loading} onClick={() => handleChangeQty("increment")}>
            +
          </button> */}

        </div>
        <div className='w-[113px] h-[80px] font-bold flex items-center justify-center text-[14px] text-[#ff424e]'>
          {item.variant_price ? formattedPrice(+item.variant_price * item.quantity) : formattedPrice(+item.product_price * item.quantity)}
        </div>
        <div className='w-[139px] h-[80px] flex justify-center items-center text-sm '>
          <span onClick={async () => await handleDeleteCartItem(index, subIndex, item.id)} className='hover:text-blue-700 cursor-pointer'>Xóa</span>
        </div>
      </div>
    </div>
  )
}
