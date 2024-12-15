import ProductReviewForm from "@/app/(guest)/test/product-review-form";


// Example Usage
export default function Page() {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];

  return (
    <div className="p-4">
      <ProductReviewForm products={products} />
    </div>
  );
}
