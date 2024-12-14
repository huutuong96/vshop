'use state'
import { timeAgo } from "@/app/(shop)/_components/shop-header";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { Flag, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Comment({ c, product_id }: { c: any, product_id: number }) {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<string[]>([]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientAccessToken.value) {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comments`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            title: 'comment',
            content: reply,
            status: 1,
            parent_id: c.id,
            product_id
          })
        })
        if (!res.ok) {
          throw 'Error';
        }
        setReply('')
        // await getData();
      } catch (error) {
        toast({
          title: 'Error',
          variant: 'destructive'
        })
      }
    }
  };

  return (
    <div className="bg-white rounded-md p-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={c?.user?.avatar || "https://via.placeholder.com/40"} // Thay ảnh avatar tại đây
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-gray-800">{c?.user?.fullname || 'khang'}</p>
          <p className="text-sm text-gray-500">{timeAgo(c.updated_at)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-800 my-4">
        {c.content}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-6 text-gray-500 text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
          <span>👍</span>
          <span>0 Thích</span>
        </div>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
        >
          💬 <span>Trả lời</span>
        </button>
      </div>
      {showReplyInput && (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Viết câu trả lời..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <div className="flex gap-2 mt-2">
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
      {replies.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-2">
          {replies.map((rep, index) => (
            <div key={index} className="flex items-start gap-2 mb-2">
              <img
                src="https://via.placeholder.com/30" // Avatar người trả lời
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-800">{rep}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
