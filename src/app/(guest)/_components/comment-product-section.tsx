import Comment from "@/app/(guest)/_components/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useEffect, useState } from "react";

export default function CommentProductSection({ id }: { id?: number }) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/Comments?product_id=${id}&per_page=1`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`
          }
        })
      } catch (error) {

      }
    }
    if (id) {
      getData()
    }
  }, [id, comments])

  return (
    <>
      <form className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Để lại bình luận {id || 'abx'}</h2>
        <Textarea
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg "
        ></Textarea>
        <div className="flex items-center justify-end mt-3">
          <Button
            disabled={!clientAccessToken.value}
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 "
          >
            Gửi
          </Button>
        </div>
      </form>
      <div className="w-full py-8 flex flex-col gap-6">
        {comments.map(c => (
          <Comment key={c.id} />
        ))}
      </div>
    </>

  )
}
