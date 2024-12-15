'use client';

import Comment from "@/app/(guest)/_components/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function CommentProductSection({ id }: { id?: number }) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading khi fetch comments
  const [submitting, setSubmitting] = useState<boolean>(false); // Trạng thái loading khi gửi comment
  const token = useAppInfoSelector((state) => state.profile.accessToken);

  const fetchComments = async () => {
    setLoading(true); // Bật trạng thái loading
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comment?product_id=${id}&type=comment&sort=-created_at&page=${page}&per_page=8`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
          // signal
        }
      );

      if (!res.ok) throw new Error("Failed to fetch comments");

      const payload = await res.json();

      console.log({ payload });

      setComments((prev) => [...payload.comments.data]);
      setHasMore(payload.comments.data.length > 0);
    } catch (error) {
      // if (isMounted) {
      //   toast({
      //     title: "Error loading comments",
      //     variant: "destructive",
      //   });
      // }
    } finally {
      // if (isMounted) setLoading(false); // Tắt trạng thái loading
      setLoading(false)
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();



    if (id) {
      fetchComments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, page]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    let isMounted = true;
    const controller = new AbortController();

    setSubmitting(true); // Bật trạng thái submitting
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comments`, {
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
      });

      if (!res.ok) throw new Error("Error submitting comment");

      const newComment = await res.json(); // Lấy comment vừa tạo từ API


      await fetchComments()
    } catch (error) {
      toast({
        title: "Error submitting comment",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false); // Tắt trạng thái submitting
      setLoading(false)
      setComment('')
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const handleUpdateComments = useCallback((replyComment: any, index: number) => {
    console.log({ replyComment });
    setComments((prev) => {
      prev[index].chill.push(replyComment)
      return [...prev]
    })
  }, [comments])


  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Để lại bình luận {id || "abx"}</h2>
        <Textarea
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg"
          disabled={submitting} // Disable khi đang gửi comment
        ></Textarea>
        <div className="flex items-center justify-end mt-3">
          {token && (
            <Button
              type="submit"
              className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={submitting} // Disable khi đang gửi comment
            >
              {submitting ? "Đang gửi..." : "Gửi"}
            </Button>
          )}
          {!token && (
            <Button disabled type="button" className="px-5 py-2 text-white bg-blue-600 rounded-lg">
              Gửi
            </Button>
          )}
        </div>
      </form>

      <div className="w-full py-8 flex flex-col gap-6">
        {loading ? (
          <p>Đang tải bình luận...</p> // Hiển thị loading
        ) : (
          comments.map((c, index) => (
            <Comment key={index} c={c} product_id={id as number} fetchComments={fetchComments} index={index} />
          ))
        )}
      </div>

      {hasMore && !loading && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={loadMore}
            className="px-5 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            disabled={loading} // Disable khi đang tải
          >
            {loading ? "Đang tải..." : "Xem thêm bình luận"}
          </Button>
        </div>
      )}
    </>
  );
}
