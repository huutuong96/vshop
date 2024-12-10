'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import envConfig from "@/config"
import { clientAccessToken } from "@/lib/http"
import { memo, useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"


function FilterCategoryProductSection({ onChangeCategory }: { onChangeCategory: (id: number) => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_categories_for_shop/39`, {
          headers: {
            "Authorization": `Bearer ${clientAccessToken.value}`
          }
        });
        if (!res.ok) {
          throw "Error"
        }
        const payload = await res.json();
        let a = payload.data;
        a.unshift({ id: 0, title: 'Mặc định', slug: 'none' })
        setCategories([...a])
      } catch (error) {
        toast({
          title: "error",
          variant: "destructive"
        })
      }
    }
    getData()
  }, []);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((c: any) => c.title === value)?.title
            : "Chọn danh mục..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm danh mục..." />
          <CommandList>
            <CommandEmpty>Không có danh mục</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px] w-48 ">
                {categories.map((c: any) => {
                  return (
                    <CommandItem
                      key={c.id}
                      value={c.title}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        onChangeCategory(c.id)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === c.title ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c.title}
                    </CommandItem>
                  )
                })}
              </ScrollArea>

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default memo(FilterCategoryProductSection)
