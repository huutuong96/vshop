import { Button } from "@/components/ui/button";
import { Pen, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ListProductItem from "@/app/(shop)/_components/list-product-item";
import ListProductPagination from "@/app/(shop)/_components/list-product-pagination";
import Link from "next/link";
import ListProductPopupCategory from "@/app/(shop)/_components/list-product-popup-category";
import ProductListSection from "@/app/(shop)/_components/product-list-section";




export default function ListProductPage() {
  return (
    <div className="w-full overflow-auto">
      <div className="flex p-4 items-center justify-between">
        <span className="text-[20px] font-semibold">Sản phẩm</span>
        <div className="flex items-center gap-2">
          <Link href={'/shop/product/new'}>
            <Button className="flex items-center gap-2" variant={"outline"}>
              <Plus strokeWidth={1.25} size={16} />
              Thêm 1 sản phẩm mới
            </Button>
          </Link>
        </div>
      </div>
      <ProductListSection />
    </div>
  )
}
