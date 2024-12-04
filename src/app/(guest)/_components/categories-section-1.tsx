'use client'

import envConfig from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function CategoriesSection1() {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/categories?limit=10`);
        const payload = await res.json();
        if (!res.ok) {
          console.log(payload);
          throw 'Error'
        }
        console.log({ payload });
        setCategories([...payload.data]);
      } catch (error) {

      }
    }
    getData()
  }, [])
  return (
    <div className="w-full flex justify-center">
      <div className="w-content mt-5 bg-white rounded-tl-sm rounded-tr-sm">
        <div className="px-5 h-[60px] flex items-center text-lg text-gray-600">
          DANH MỤC
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
  )
}
