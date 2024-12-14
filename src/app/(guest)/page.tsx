import GoiYSection from "@/app/(guest)/_components/goi-y-section";
import BannerHomeGuest from "./_components/banner";
import CategoriesGuest from "./_components/categories";
import Categories2 from "@/app/(guest)/_components/categories2";
import HangXinSection from "@/app/(guest)/_components/hang-xin-section";
import GoiYSanPhamSection from "./_components/product_release";
import envConfig from "@/config";
import Link from "next/link";
import CategoryListHomeSection from "@/app/(guest)/_components/category-list-home-section";



export default async function HomePage() {
  try {
    const categoriesRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/categories?limit=10`, {
      cache: 'no-cache'
    });
    if (!categoriesRes.ok) {
      throw 'Error'
    }
    const categoriesPayload = await categoriesRes.json();
    const categories = categoriesPayload.data.filter((c: any) => c.image);
    return (
      <>

        <div className="w-full -mt-5">
          <BannerHomeGuest />
          {/* <CategoriesGuest /> */}
        </div>
        <CategoryListHomeSection categories={categories} />
        <div className="w-content mt-5">
          <GoiYSanPhamSection />
          <HangXinSection />
          {/* <Categories2 /> */}
          <GoiYSection />
        </div>
      </>
    )
  } catch (error) {
    return (
      <div>he</div>
    )
  }

}
