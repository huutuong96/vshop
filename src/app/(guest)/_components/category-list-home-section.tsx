'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import Link from "next/link"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryListHomeSection({ categories }: { categories: any }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="w-full flex justify-center">
      <div className="w-content mt-5 bg-white rounded-tl-sm rounded-tr-sm">
        <div className="px-5 h-[60px] flex items-center text-lg text-gray-600">
          DANH MỤC
        </div>
        <div className="w-full relative">
          <button
            className={`z-50 absolute top-1/2  -left-4 -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition ${isBeginning ? 'hidden' : ''
              }`}
            id="custom-prev"
            disabled={isBeginning}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Nút điều hướng phải */}
          <button
            className={`z-50 absolute top-1/2 -right-4 -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition ${isEnd ? 'hidden' : ''
              }`}
            id="custom-next"
            disabled={isEnd}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <Swiper
            modules={[EffectFade, Navigation]}
            spaceBetween={10}
            slidesPerView={10}
            // slidesPerGroup={2}
            // pagination={{ clickable: true }}
            // autoplay={{ delay: 1500, disableOnInteraction: false }}
            // loop
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
