'use client'
import { Button } from '@/components/ui/button';
import envConfig from '@/config';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function ProductActions() {
    const info = useAppInfoSelector(state => state.profile.info);
    console.log(info);
    
  return (
    <div className="flex p-4 items-center justify-between">
        <span className="text-[20px] font-semibold">Sản phẩm</span>
        <div className="flex items-center gap-2">
        <Link target="_blank" href={`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/export/data?data=products&status=2&shop_id=${info.shop_id}`}>
          <Button className="flex items-center gap-2" variant={"outline"}>
            <Plus strokeWidth={1.25} size={16} />
            Xuất Excel
          </Button>
        </Link>
          <Link href={'/shop/product/new'}>
            <Button className="flex items-center gap-2" variant={"outline"}>
              <Plus strokeWidth={1.25} size={16} />
              Thêm 1 sản phẩm mới
            </Button>
          </Link>
        </div>
      </div> 
  )
}
