'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import Link from "next/link"

export default function CategoryListHomeSection({ categories }: { categories: any }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-content mt-5 bg-white rounded-tl-sm rounded-tr-sm">
        <div className="px-5 h-[60px] flex items-center text-lg text-gray-600">
          DANH MỤC
        </div>
        <div className="w-full">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={10}
            slidesPerView={10}
            // slidesPerGroup={2}
            // pagination={{ clickable: true }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            loop
            className='w-full grid grid-cols-2 grid-rows-1 gap-2'
          >
            {categories.map((c: any, index: number) => (
              <SwiperSlide key={c.id}>
                <Link href={`categories/${c.id}`}>
                  <div className={`w-[120px] flex flex-col items-center hover:bg-gray-50`}>
                    <div className="w-[82px] h-[88px] mt-3">
                      <img className="size-full" src={c.image} alt="" />
                    </div>
                    <div className="mb-[10px] h-10 px-1">
                      <div className="text-sm text-center">{c.title}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>

            ))}
          </Swiper>

        </div>
      </div>
    </div>
  )
}
