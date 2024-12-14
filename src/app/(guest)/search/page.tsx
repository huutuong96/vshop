import SearchProductSection from "@/app/(guest)/search/search-product-section";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function SearchProductPage({ searchParams: { page, sort, filter, search } }: { searchParams: { page?: string, filter?: string, sort?: string, search?: string } }) {
  return (
    <div className='w-content'>
      <Breadcrumb className="pb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold'>Danh mục sản phẩm</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchProductSection filter1={filter} page1={page} sort1={sort} search1={search} />
    </div>
  );
}
