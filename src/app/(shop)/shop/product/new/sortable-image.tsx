'use client'

import { Button } from "@/components/ui/button"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

let mockImages = [
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732933580/ok1rf7xcdaogdobypa7c.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732888561/oyha63khk6yx1gv8ypgn.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732866659/i2lyspcfbg1xialug65d.webp'
]



export default function SortableImage({ id, image }: { id: number, image: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    tranform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border size-20 rounded-sm relative"
    >
      <img
        src={image}
        className="size-full object-cover rounded-sm"
        alt={`Uploaded ${id}`}
      />
      <Button
        type="button"
        // onClick={() => handleDeleteImage(index)}
        className="size-4 absolute text-[8px] top-0 right-0"
      >
        Xóa
      </Button>
    </div>
  )
}
