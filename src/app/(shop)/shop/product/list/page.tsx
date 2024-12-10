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
import ProductActions from "../product-actions";



export default function ListProductPage() {


  return (
    <div className="w-full overflow-auto">
      <ProductActions />
      <ProductListSection />
    </div>
  )
}
