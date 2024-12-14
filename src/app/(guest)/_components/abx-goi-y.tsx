'use client'
import CardProduct from "@/app/(guest)/_components/card-product";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from "next/link";


export default function AbxGoiY({ products }: { products: any }) {
  return (
    <>
      <Swiper
        modules={[EffectFade]}
        spaceBetween={10}
        slidesPerView={5}
        // slidesPerGroup={2}
        // pagination={{ clickable: true }}
        // autoplay={{ delay: 1500, disableOnInteraction: false }}
        // loop
        className='w-full'
      >
        {products.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <CardProduct key={index} p={item} />
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  )
}
