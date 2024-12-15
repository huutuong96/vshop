'use client'

import { Button } from "@/components/ui/button";
import envConfig from "@/config";
import { Star, StarHalf, StarOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react"

const FullStar = () => (
  <svg className="w-6 h-6 text-[#f0ce11]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.476 8.332 1.197-6.04 5.873 1.426 8.314L12 18.897l-7.386 3.874L6.04 15.133 0 9.26l8.332-1.197z" />
  </svg>
);

// Half Star Component
const HalfStar = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="#f0ce11" />
        <stop offset="50%" stopColor="#e0e0e0" /> {/* Màu xám sáng hơn */}
      </linearGradient>
    </defs>
    <path
      d="M12 .587l3.668 7.476 8.332 1.197-6.04 5.873 1.426 8.314L12 18.897l-7.386 3.874L6.04 15.133 0 9.26l8.332-1.197z"
      fill="url(#half-grad)"
    />
  </svg>
);

// Empty Star Component
const EmptyStar = () => (
  <svg className="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.476 8.332 1.197-6.04 5.873 1.426 8.314L12 18.897l-7.386 3.874L6.04 15.133 0 9.26l8.332-1.197z" />
  </svg>
);

export default function RateSection({ productId }: { productId: number }) {
  const [rating, setRating] = useState<number>(0);
  const [ratings, setRatings] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const totalReviews = useMemo(() => {
    return ratings.reduce((acc, curr) => acc + curr, 0)
  }, [ratings]);
  const avaRateConfig = useMemo(() => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return {
      fullStars, hasHalfStar, emptyStars
    }
  }, [rating])




  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/rating/${productId}`);
        if (!res.ok) {
          throw 'Error'
        }
        const payload = await res.json();
        setRatings([...payload.data])
        setRating((prev) => {
          const sum = payload.data.reduce((total: number, cur: number, index: number) => total + cur, 0);
          const count = payload.data.reduce((total: number, cur: number, index: number) => total + cur / (index + 1), 0);
          if (count === 0) return 0
          const avg = sum / count;
          return avg;
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      getData();
    }
  }, [productId]);


  return (
    <div className="w-full p-4 shadow border bg-white">
      <span className="text-[16px] font-bold mb-4">
        Đánh giá và nhận xét sản phẩm <span className="text-gray-400 font-normal text-[14px] text-">( 71 lượt đánh giá)</span>
      </span>
      <div className="flex gap-8">
        <div className="w-1/2 flex flex-col justify-center">
          <div className="flex items-center">
            {isLoading ? (
              <span>Đang tải...</span>
            ) : (
              <span className="font-bold text-black text-[30px]">{rating.toFixed(1)}</span>
            )}
            <span className="font-bold text-black text-[22px] mx-1">/</span>
            <span className="font-bold text-red-500 text-[22px]">5</span>
            <div className="flex items-center ml-4">
              {/* Render Full Stars */}
              {Array.from({ length: avaRateConfig.fullStars }).map((_, i) => (
                <FullStar key={`full-${i}`} />
              ))}
              {/* Render Half Star */}
              {avaRateConfig.hasHalfStar && <HalfStar />}
              {/* Render Empty Stars */}
              {Array.from({ length: avaRateConfig.emptyStars }).map((_, i) => (
                <EmptyStar key={`empty-${i}`} />
              ))}
            </div>
          </div>
          <span className="italic text-[14px] text-gray-500">
            Đây là thông tin người mua đánh giá shop bán sản
            phẩm này có đúng mô tả không.
          </span>
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          {/* Lặp từ 5 sao đến 1 sao */}
          {ratings
            .slice()
            .reverse()
            .map((count, index) => {
              const starValue = 5 - index; // Tính lại giá trị sao
              const percentage = totalReviews
                ? Math.round((count / totalReviews) * 100)
                : 0;

              return (
                <div key={index} className="flex gap-2 items-center">
                  {/* Hiển thị ngôi sao */}
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={
                            starIndex < starValue
                              ? "text-[#f0ce11]" // Sao màu vàng
                              : "text-gray-300" // Sao màu xám
                          }
                        >
                          ★
                        </span>
                      ))}
                  </div>

                  {/* Thanh tiến trình và số lượng đánh giá */}
                  <div className="flex gap-4 items-center">
                    <div className="w-56 h-3 bg-gray-200 rounded-sm">
                      <div
                        className="h-3 bg-red-500 rounded-bl-sm rounded-tl-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[14px] font-bold">{count / starValue}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-center">
        <span className="text-sm text-blue-800 underline cursor-pointer">Xem thêm</span>
      </div>
    </div>
  )
}
