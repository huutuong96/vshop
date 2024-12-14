'use client';
import { useState, useCallback, useEffect, useRef, FormEvent } from 'react';
import { Search } from "lucide-react";
import { debounce } from 'lodash';
import envConfig from '@/config';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  slug: string;
};

export default function SearchAbx() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement | null>(null); // Reference để kiểm tra click ngoài

  // Fetch dữ liệu tìm kiếm
  const fetchSearchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) return; // Bỏ qua nếu input rỗng
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_1}/api/test/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: searchTerm }), // Chuyển searchTerm vào body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const payload = await response.json();
      setResults(payload.products.data || []); // Lưu kết quả trả về nếu có
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng debounce để gọi API
  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      fetchSearchResults(searchTerm);
    }, 500), // Delay 500ms
    []
  );

  useEffect(() => {
    if (!query) {
      setResults([]);
    }
  }, [query]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value); // Gọi hàm debounce
  };

  // Xử lý khi click vào kết quả tìm kiếm
  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShow(false); // Ẩn kết quả khi click ra ngoài
    }
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query) {
      setShow(false);
      router.push(`/search?search=${query}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-nav h-10 flex relative">
      <input
        placeholder="Tìm trên VNShop"
        className="w-[550px] h-full px-5 border rounded-tl-[16px] rounded-bl-[16px] outline-none text-sm bg-gray-50"
        value={query}
        onChange={onInputChange}
        onFocus={() => setShow(true)}
      />
      <div onClick={handleSubmit} className="icon-input flex items-center justify-center w-[42px] h-full border-b border-t border-r  rounded-tr-[16px] rounded-br-[16px] bg-gray-50">
        <Search size={20} />
      </div>
      {show && (
        <div className='w-[95%] absolute left-0 top-12 bg-white border rounded-sm' ref={searchRef}>
          <div className='my-2'>
            {loading && (
              <div className='w-full flex items-center justify-center py-4'>
                <img className="size-6 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
              </div>
            )}
            {!loading && query ? results.length === 0 && <div className="text-sm w-full flex items-center justify-center">
              Không có kết quả
            </div> : ""}
            {!loading && query && results.length > 0 && results.map((re) => (
              <div onClick={() => setShow(false)} className='text-sm px-4 py-2 hover:bg-gray-50 cursor-pointer' key={re.id}>
                <Link href={`/products/${re.slug}`} onClick={() => setShow(false)}>
                  {re.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
