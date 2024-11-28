import CategorySection from '@/app/(guest)/_components/category-section';
import ProductsCategoryDetailSection from '@/app/(guest)/_components/products-category-detail-section';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';


const CategoryDetailPage = ({ params: { slug } }: { params: { slug: string } }) => {
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
      <ProductsCategoryDetailSection />
    </div>
  );
};

export default CategoryDetailPage;