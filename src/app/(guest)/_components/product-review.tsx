import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import envConfig from "@/config";
import { useEffect, useState, useCallback } from "react";

interface Review {
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  productId: number;
}

const tabs = [
  { label: 'Tất cả', value: 0 },
  { label: '1 sao', value: 1 },
  { label: '2 sao', value: 2 },
  { label: '3 sao', value: 3 },
  { label: '4 sao', value: 4 },
  { label: '5 sao', value: 5 },
];

const handleChangeSearchParams = (rate: number, page: string) => {
  return `page=${page}${rate ? `&rate=${rate}` : ''}`;
};

const formatDate = (date: string) => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên phải cộng thêm 1
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0); // Tab hiện tại
  const [page, setPage] = useState<string>('1');
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comment?product_id=${productId}&type=rating&sort=-created_at&${handleChangeSearchParams(selectedTab, page)}`);
      if (!res.ok) throw new Error('Error fetching reviews');
      const payload = await res.json();
      setReviews(payload.comments.data);
    } catch (error) {
      console.error(error);
    }
  }, [productId, selectedTab, page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <Dialog>
      {/* Nút để mở Dialog */}
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-800 text-white rounded-lg">Xem đánh giá</button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="w-[500px] max-w-full h-auto p-4 rounded-lg shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Đánh giá sản phẩm</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={String(selectedTab)} onValueChange={(value) => setSelectedTab(Number(value))}>
          <TabsList className="flex justify-between gap-3 mb-4">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={String(t.value)}
                className={`py-2 px-4 text-sm font-medium ${selectedTab === t.value ? 'bg-blue-800 text-white' : 'bg-gray-200 text-black'} rounded-lg transition-all duration-300`}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Danh sách đánh giá */}
          <TabsContent value={String(selectedTab)} className="space-y-4">
            {reviews.length > 0 ? (
              <ScrollArea className="h-[400px]">
                {reviews.map((review, index) => {
                  const greyStar = 5 - review.rate
                  return (
                    <div key={index} className="flex gap-2 p-4 border-b border-gray-300">
                      <div className="">
                        <img className="size-10 rounded-full" src={review?.user?.avatar || ''} alt="" />
                      </div>
                      <div>
                        <div className="text-sm">{review.user.fullname}</div>
                        <div className="flex items-center gap-1">
                          {/* Hiển thị sao */}
                          {[...Array(review.rate)].map((_, i) => (
                            <span key={i} className={`text-yellow-400`}>★</span>
                          ))}
                          {[...Array(greyStar)].map((_, i) => (
                            <span key={i} className={`text-gray-400`}>★</span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 flex gap-2">
                          {formatDate(review.created_at)}
                          {review.variant && (
                            <>
                              <span>|</span>
                              <span>Phân loại sản phẩm: {review.variant}</span>
                            </>
                          )}

                        </div>
                        <p className="text-sm text-gray-600 mt-2">{review.content}</p>
                      </div>
                    </div>
                  )
                })}
              </ScrollArea>

            ) : (
              <div className="text-center text-gray-500">Không có đánh giá nào</div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductReviews;
