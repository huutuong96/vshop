import React from 'react';
import LoadingScreen from '../../_components/loading-screen';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingProductDetailPage = () => {
  return (
    <div className="w-content flex border shadow bg-white rounded animate-pulse">
      {/* Left Section */}
      <div className="w-2/5 p-4">
        <div className="w-full">
          <Skeleton className="w-full h-[450px] rounded" />
          <div className="my-[5px] -mx-[5px] flex gap-1">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="p-[5px] size-[92px] rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 p-4">
        <div className="w-full">
          {/* Product Info */}
          <Skeleton className="w-full h-[24px] mb-2 rounded" />
          <Skeleton className="w-1/2 h-[16px] mb-2 rounded" />
          <Skeleton className="w-1/3 h-[32px] mb-4 rounded" />

          {/* Ratings and Actions */}
          <div className="w-full flex gap-3 items-center mb-4">
            <Skeleton className="w-[100px] h-[16px] rounded" />
            <Skeleton className="w-[80px] h-[16px] rounded" />
          </div>


          {/* Quantity Selector */}
          <div className="w-full flex mb-6 items-center">
            <Skeleton className="w-[200px] h-[20px] text-gray-500 rounded" />
            <Skeleton className="w-[60px] h-[32px] rounded" />
          </div>

          {/* Buttons */}
          <div className="w-full flex gap-4 mb-4">
            <Skeleton className="h-12 w-60 rounded" />
            <Skeleton className="h-12 w-60 rounded" />
          </div>

          {/* Promotions */}
          <Skeleton className="w-full h-[20px] mb-4 rounded" />
          <div className="w-full flex flex-wrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-1/2 mb-4 flex gap-2 items-center">
                <Skeleton className="size-6 rounded" />
                <Skeleton className="w-[100px] h-[16px] rounded" />
              </div>
            ))}
          </div>

          {/* Customer Rights */}
          <Skeleton className="w-full h-[20px] mb-4 rounded" />
          <div className="flex gap-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className="w-[20px] h-[20px] rounded" />
                <Skeleton className="w-[200px] h-[16px] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProductDetailPage;