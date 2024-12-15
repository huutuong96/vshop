'use client';

import { timeAgo } from "@/app/(shop)/_components/shop-header";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useState, useEffect } from "react";

export default function Comment({ c, product_id }: { c: any, product_id: number }) {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<any[]>(c?.chill ? [...c.chill] : []);
  const [loadingReplies, setLoadingReplies] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  // const [childCount, setChillCout] = useState<number>(c?.chill?.length || 0);


  // Fetch replies
  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comment?parent_id=${c.id}&product_id=${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch replies");

      const data = await res.json();
      setReplies(data.comments || []);
    } catch (error) {
      toast({
        title: "Error loading replies",
        variant: "destructive",
      });
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comments`, {
        headers: {
          Authorization: `Bearer ${clientAccessToken.value}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: "comment",
          content: reply,
          status: 1,
          parent_id: c.id,
          product_id,
        }),
      });

      if (!res.ok) throw new Error("Error submitting reply");

      const newReply = await res.json();
      setReplies((prev) => [...prev, newReply.data]); // Thêm comment con vào danh sách
      setReply("");
      setShowReplyInput(false);
    } catch (error) {
      toast({
        title: "Error submitting reply",
        variant: "destructive",
      });
    }
  };

  const toggleReplies = async () => {
    // if (!showReplies) {
    //   await fetchReplies();
    // }
    setShowReplies((prev) => !prev);
  };

  const handleReplyClick = (username: string) => {
    setShowReplyInput(true);
    setReply(`@${username} `); // Gán giá trị mặc định cho textarea
  };

  console.log({ replies });

  return (
    <div className="w-full">
      <div className="bg-white rounded-md p-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={c?.user?.avatar || "https://via.placeholder.com/40"} // Avatar user
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{c?.user?.fullname || "Unknown"}</p>
            <p className="text-sm text-gray-500">{timeAgo(c.created_at)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-800 my-4">{c.content}</div>

        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
            <span>👍</span>
            <span>0 Thích</span>
          </div>
          <button
            onClick={() => handleReplyClick(c.user.fullname)}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
          >
            💬 <span>Trả lời</span>
          </button>
          {replies.length > 0 && (
            <button
              onClick={toggleReplies}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
            >
              {showReplies ? "Ẩn" : "Xem"} trả lời ({replies.length})
            </button>
          )}
        </div>






      </div>
      {/* Replies */}
      {showReplies && (
        <div className="mt-4 border-t border-gray-200 pt-2">
          {loadingReplies ? (
            <p>Đang tải...</p>
          ) : (
            <div className="w-full flex items-end flex-col">
              {replies.map((rep) => (
                <div key={rep.id} className="w-[95%] bg-white mb-2 p-4 rounded-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <img
                      src={rep.user?.avatar || "https://via.placeholder.com/30"} // Avatar reply
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{rep.user?.fullname || "Unknown"}</p>
                      <p className="text-sm text-gray-500">{timeAgo(rep.created_at)}</p>
                      <p className="text-sm text-gray-800">{rep.content}</p>
                    </div>

                  </div>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button
                      onClick={() => handleReplyClick(rep.user.fullname)}
                      className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
                    >
                      💬 <span>Trả lời</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}
        </div>
      )}
      {/* Reply Input */}
      {showReplyInput && (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Viết câu trả lời..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <div className="flex gap-2 mt-2 justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Gửi
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
              onClick={() => setShowReplyInput(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>

  );
}
