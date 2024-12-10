'use client'

import SortableItem from "@/app/(guest)/test/sortable-item";
import envConfig from "@/config";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";


let mockImages = [
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732933580/ok1rf7xcdaogdobypa7c.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732888561/oyha63khk6yx1gv8ypgn.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732866659/i2lyspcfbg1xialug65d.webp'
]

export default function TestPage() {



  return (
    <>
      <div className="flex gap-4">
        {envConfig.NEXT_PUBLIC_MODE || 'khong cos'}
      </div>
    </>
  )
}
