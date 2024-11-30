import GoiYSection from "@/app/(guest)/_components/goi-y-section";
import BannerHomeGuest from "./_components/banner";
import CategoriesGuest from "./_components/categories";
import Categories2 from "@/app/(guest)/_components/categories2";
import HangXinSection from "@/app/(guest)/_components/hang-xin-section";
import envConfig from "@/config";
import Link from "next/link";



export default async function HomePage() {
  try {
    const categoriesRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/categories?limit=10`);
    const categoriesPayload = await categoriesRes.json();
    if (!categoriesRes.ok) {
      throw 'Error'
    }
    const categories = categoriesPayload.data.data;
    return (
      <>

        <div className="w-full -mt-5">
          <BannerHomeGuest />
          <CategoriesGuest />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-content mt-5 bg-white rounded-tl-sm rounded-tr-sm">
            <div className="px-5 h-[60px] flex items-center text-lg text-gray-600">
              DANH MỤC production
            </div>
            <div className="w-full grid grid-cols-10">
              {categories.map((c: any, index: number) => (
                <Link key={c.id} href={`categories/${c.id}`}>
                  <div className={`w-[120px] flex flex-col items-center hover:bg-gray-50`}>
                    <div className="w-[82px] h-[88px] mt-3">
                      <img className="size-full" src={c.image} alt="" />
                    </div>
                    <div className="mb-[10px] h-10 px-1">
                      <div className="text-sm text-center">{c.title}</div>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </div>
        <div className="w-content mt-5">
          <HangXinSection />
          <Categories2 />
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
