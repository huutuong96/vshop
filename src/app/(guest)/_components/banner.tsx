'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const arrayBanner = [
  { id: 1, image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/d0/92/f9/fec2f5a2d44bef09a26ffbd8a65a47fa.png.webp', title: 'banner1' },
  { id: 2, image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/a6/09/ab/f9ef8f222038884c6387524a65f23525.png.webp', title: 'banner2' },
  { id: 3, image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/97/af/de/03c85cacdea94e2eee4d02dca29a4645.png.webp', title: 'banner3' },
  { id: 4, image: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/98/e6/f0/04ef25bbbc11628e5bd9d55973163f92.jpg.webp', title: 'banner4' },
];

const BannerHomeGuest = () => {
  const [banners, setBanners] = useState<{ id: number, image: string, title: string }[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setBanners([...arrayBanner]);
    }, 500)
  }, [])

  return (
    <div className="banner-home w-full">
      {banners.length > 0 && (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          slidesPerGroup={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop
          className='w-full h-[335px] grid grid-cols-2 grid-rows-1 gap-2'
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img src={banner.image} className="rounded-[5px]" alt={banner.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {banners.length === 0 && (
        <div className="w-full h-[335px] grid grid-cols-2 grid-rows-1 gap-2">

          <div className='flex-1'>
            <Skeleton className='w-full h-full items-center justify-center flex'>
              <div className="flex items-center justify-center size-40 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </Skeleton>
          </div>
          <div className='flex-1'>
            <Skeleton className='w-full h-full items-center justify-center flex'>
              <div className="flex items-center justify-center size-40 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </Skeleton>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerHomeGuest;
