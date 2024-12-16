'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { formatTimeDifference } from '@/app/(guest)/_components/product-detail-section';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, Store } from 'lucide-react';
import { useAppInfoSelector } from '@/redux/stores/profile.store';
import Link from 'next/link';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { formattedPrice } from '@/lib/utils';
import { useState } from 'react';


export default function ShopInfoSection({ shop, shopIdWithProduct }: { shop: any, shopIdWithProduct: any }) {
  const info = useAppInfoSelector(state => state.profile.info);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="w-2/5 pr-4 ">
      <div className="shadow bg-white border p-4 w-full">
        <div className="font-bold text-[16px]">Thông tin nhà cung cấp</div>
        <div className="flex mt-4 gap-4">
          <div className="size-16">
            <div className="size-full ">
              <img className="size-full border-2 rounded-full" src={shop?.image || 'https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png'} alt="" />
            </div>
          </div>
          <div>
            <div className="font-bold text-[16px]">{shop.shop_name}</div>
            <span className="text-[12px] text-gray-400">
              {shop?.province || 'Đồng Nai'} |
              <span> 4.7 <span className="text-[#f0ce11] text-[14px]">★</span></span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <div className="text-center">
            <div className="text-[12px] font-normal">Đã tham gia</div>
            <span className="text-[16px] font-bold mb-2">{formatTimeDifference(shop.created_at)}</span>
          </div>
          <div className="text-center">
            <span className="text-[16px] font-bold mb-2">{shop.countProduct}</span>
            <div className="text-[12px] font-normal">Sản phẩm</div>
          </div>
        </div>
        <div className="w-full flex gap-2 mt-4">
          <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 flex-1 text-black"
          >
            <Heart size={20} />
            {info?.followers ? (info.followers.some((c: any) => c.shop_id === shopIdWithProduct) ? (
              <span className="ml-2">Đã theo dõi</span>
            ) : (
              <span className="ml-2">Theo dõi</span>
            )) : <span className="ml-2">Theo dõi</span>}
          </Button>

          <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 flex-1 text-black">
            <Link className="flex items-center" href={`/vendors/${shop.id}`}>
              <Store size={20} />
              <span className="ml-2">Vào shop</span>
            </Link>
          </Button>
          {/* <Button className="bg-gray-100 h-10 p-2 rounded-none hover:bg-gray-100 w-[10%] text-black">
                <PhoneCall size={20} />
              </Button> */}
        </div>
        <div className="mt-4 border-t">
          <div className="mt-4 text-[14px] font-bold">
            Gợi ý thêm từ shop
          </div>
          <div className="mt-4 w-full bg-gradient-to-b p-2 from-white to-blue-200 relative">
            {/* Nút điều hướng trái */}
            <button
              className={`z-50 absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition ${isBeginning ? 'hidden' : ''
                }`}
              id="custom-prev"
              disabled={isBeginning}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Nút điều hướng phải */}
            <button
              className={`z-50 absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition ${isEnd ? 'hidden' : ''
                }`}
              id="custom-next"
              disabled={isEnd}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <Swiper
              modules={[Autoplay, EffectFade, Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={3}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning); // Cập nhật trạng thái nút prev
                setIsEnd(swiper.isEnd); // Cập nhật trạng thái nút next
              }}
              navigation={{
                prevEl: '#custom-prev',
                nextEl: '#custom-next',
              }}
              className='w-full '
            >
              {shop.products.map((product: any, index: number) => {
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
                  <SwiperSlide key={index} className="mb-3 w-[140px] shadow-sm bg-white rounded-sm">
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
                      <span className="text-[12px] text-red-500 font-bold">{show_price}</span>
                    </div>
                  </SwiperSlide>
                )
              })}

            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}
