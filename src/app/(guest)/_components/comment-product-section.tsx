'use client'
import Comment from "@/app/(guest)/_components/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { number } from "zod";

export default function CommentProductSection({ id }: { id?: number }) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Kiểm tra còn dữ liệu không
  const token = useAppInfoSelector((state) => state.profile.accessToken);

  // Fetch dữ liệu comment
  const getData = useCallback(async (pageNumber: number) => {
    const controller = new AbortController(); // Tạo AbortController mới
    const signal = controller.signal;
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comment?product_id=${id}&type=comment&sort=-created_at&page=${pageNumber}&per_page=2`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
          signal
        }
      );
      const payload = await res.json();

      if (payload.comments.data.length > 0) {
        setComments((prev) => [...prev, ...payload.comments.data]); // Nối thêm comment
        setHasMore(true);
      } else {
        setHasMore(false); // Không còn dữ liệu
      }
    } catch (error) {
      // toast({
      //   title: "Error loading comments",
      //   variant: "destructive",
      // });
    }
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const controller = new AbortController(); // Tạo AbortController mới
    const signal = controller.signal;
    const getData = async () => {

      try {
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comment?product_id=${id}&type=comment&sort=-created_at&page=${page}&per_page=2`,
          {
            headers: {
              Authorization: `Bearer ${clientAccessToken.value}`,
            },
            signal
          }
        );
        const payload = await res.json();

        if (payload.comments.data.length > 0) {
          setComments((prev) => [...prev, ...payload.comments.data]); // Nối thêm comment
          setHasMore(true);
        } else {
          setHasMore(false); // Không còn dữ liệu
        }
      } catch (error) {
        // toast({
        //   title: "Error loading comments",
        //   variant: "destructive",
        // });
      }
    }
    if (id) {
      getData()
    }
    return () => {
      controller.abort();
    };
  }, [id, page]);

  // Submit comment mới
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (clientAccessToken.value) {
      try {
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comments`,
          {
            headers: {
              Authorization: `Bearer ${clientAccessToken.value}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              title: "comment",
              content: comment,
              status: 1,
              parent_id: null,
              product_id: id,
            }),
          }
        );
        if (!res.ok) throw new Error("Error submitting comment");

        setComment("");
        setComments([]);
        setPage(1); // Reset phân trang
        await getData(1); // Load lại trang đầu
      } catch (error) {
        toast({
          title: "Error submitting comment",
          variant: "destructive",
        });
      }
    }
  };

  // Tải thêm comment khi nhấn nút "Xem thêm"
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {/* Form bình luận */}
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-4 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">
          Để lại bình luận {id || "abx"}
        </h2>
        <Textarea
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg"
        ></Textarea>
        <div className="flex items-center justify-end mt-3">
          {token && (
            <Button
              type="submit"
              className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Gửi
            </Button>
          )}
          {!token && (
            <Button
              disabled
              type="button"
              className="px-5 py-2 text-white bg-blue-600 rounded-lg"
            >
              Gửi
            </Button>
          )}
        </div>
      </form>

      {/* Danh sách bình luận */}
      <div className="w-full py-8 flex flex-col gap-6">
        {comments.map((c, index) => (
          <Comment key={index} c={c} product_id={id as number} />
        ))}
      </div>

      {/* Nút Xem Thêm */}
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={loadMore}
            className="px-5 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Xem thêm bình luận
          </Button>
        </div>
      )}
    </>
  );
}
