'use client'

import { useEffect, useState } from "react"

export default function TestPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showCategories, setShowCategories] = useState<(any[])[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/categories');
        const payload = await res.json();
        setCategories(payload);
        setShowCategories([payload.map((c: any) => ({ ...c, children: undefined }))])
      } catch (error) {

      }
    };
    getData()
  }, []);
  const handleClick = () => {

  }
  return (
    <div className="border w-content bg-white h-screen p-2">
      <div className="flex">
        {showCategories.map((l, index: number) => (
          <div key={index}>
            {l.map((c, subIndex) => (
              <div key={subIndex}>{c.name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
