'use client'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, StarOff } from "lucide-react"; // Import icon từ lucide-react

// Zod schema
const reviewSchema = z.object({
  reviews: z.array(
    z.object({
      productId: z.number(),
      productName: z.string(),
      rating: z.number().min(1, "Please provide a rating").max(5),
      comment: z.string().optional(),
    })
  ),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ProductReviewForm = ({ products }: { products: { id: number; name: string }[] }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviews: products.map((product) => ({
        productId: product.id,
        productName: product.name,
        rating: 5,
        comment: "",
      })),
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    console.log("Review data submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write Review</Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>Product Reviews</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {products.map((product, index) => (
            <div key={product.id} className="border-b pb-4">
              <Label>{product.name}</Label>
              <Controller
                name={`reviews.${index}.rating` as const}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-1">
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
                    {errors.reviews?.[index]?.rating && (
                      <p className="text-red-500 text-sm">
                        {errors.reviews[index]?.rating?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Textarea
                placeholder="Write your review..."
                {...register(`reviews.${index}.comment` as const)}
              />
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">Submit Reviews</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ProductReviewForm