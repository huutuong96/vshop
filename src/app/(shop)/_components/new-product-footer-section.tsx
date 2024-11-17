'use client'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

export default function NewProductFooterSection() {
  const state = useAppSelector(state => state.shopListProduct);
  const dispatch = useAppDispatch();
  const variantItems = useAppSelector(state => state.shopListProduct.varriant.variantItems);
  const variantProducts = useAppSelector(state => state.shopListProduct.varriant.variantProducts)

  const variant = { variantItems: variantItems.map(it => ({ name: it.name, values: it.values.map(i => i.value) })), variantProducts: variantProducts.map(it => ({ ...it, variants: undefined, attributes: it.variants })) };




  return (
    <div className={`w-full px-6 py-4 mb-10 sticky bottom-0 right-[16px] bg-white shadow rounded border`}>
      <div className="w-full flex justify-end">
        <div className="flex gap-6">
          <Button variant={'outline'}>Hủy</Button>
          <Button variant={'outline'}>Lưu & Ẩn</Button>
          <Button type='submit' variant={'ghost'} className="bg-[#286dcf] text-white hover:opacity-80 hover:bg-[#286dcf] hover:text-white">Lưu & Hiển thị</Button>
        </div>
      </div>
    </div>
  )
}
