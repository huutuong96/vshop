'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ListProductPagination() {
  return (
    <div className="p-6 flex justify-end">
      <div className="flex gap-6">
        <div className="flex gap-4 items-center">
          <ChevronLeft size={20} strokeWidth={1.25} />
          <span>1</span>
          <ChevronRight size={20} strokeWidth={1.25} />
        </div>
        <div>
          <Select defaultValue="apple">
            <SelectTrigger className="flex gap-1">
              <SelectValue />
              <span>/ page</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">12</SelectItem>
                <SelectItem value="banana">24</SelectItem>
                <SelectItem value="blueberry">28</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

