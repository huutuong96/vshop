'use client'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, StarOff } from "lucide-react"; // Import icon từ lucide-react
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

// Zod schema
const reviewSchema = z.object({
  reviews: z.array(
    z.object({
      product_id: z.number(),
      rate: z.number().min(1, "Please provide a rating").max(5),
      content: z.string().optional(),
      images: z.array(z.string()),
      title: z.string(),
      variant: z.string().nullable()
    })
  ),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ProductReviewForm = ({ products, order_id, index, handleChangeFeedbackOrder }: { products: any[], order_id: number, index: number, handleChangeFeedbackOrder: any }) => {
  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviews: products.map((p) => ({
        product_id: p.product.id,
        rate: 5,
        content: "",
        title: 'ratting',
        images: [],
        variant: p?.variant?.name || null
      })),
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/feedback`, {
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ order_id, data: data.reviews })
      })
      if (!res.ok) {
        throw 'Error'
      }
      setOpen(false);
      toast({
        title: 'Success',
        variant: 'success'
      })
      handleChangeFeedbackOrder(index)
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive'
      })
    }


  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" onClick={() => setOpen(true)}>Đánh giá</Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {products.map((p, index) => (
            <div key={p.product.id} className="border-b pb-4">
              <div className="flex gap-3 mb-2">
                <div className="">
                  <img src={p?.variant ? p.variant.images : p.product.image} className="size-12 border rounded-sm" alt="" />
                </div>
                <div>
                  <div className="text-sm">{p.product.name}</div>
                  {p?.variant && (
                    <div className="text-sm text-gray-600">Phân loại: {p.variant.name}</div>
                  )}
                </div>
              </div>
              <Controller
                name={`reviews.${index}.rate` as const}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => field.onChange(starValue)}
                        className="focus:outline-none"
                      >
                        {starValue <= field.value ? (
                          <Star className="text-yellow-500 w-6 h-6" />
                        ) : (
                          <StarOff className="text-gray-400 w-6 h-6" />
                        )}
                      </button>
                    ))}
                    {errors.reviews?.[index]?.rate && (
                      <p className="text-red-500 text-sm">
                        {errors.reviews[index]?.rate?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Textarea
                placeholder="Write your review..."
                {...register(`reviews.${index}.content` as const)}
              />
              <div>Thêm ảnh</div>
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">Đánh giá</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ProductReviewForm