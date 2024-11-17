'use client'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

export default function ProductImage({ id, image, handleDeleteImg }: { id: number, image: string, handleDeleteImg: (index: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { image }
  });
  const dndKitImageStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  return (
    <>
      <div
        ref={setNodeRef}
        style={dndKitImageStyles}
        {...attributes}
        {...listeners}
        className="size-20 relative z-20"
      >
        <img src={image} className="object-cover size-full border rounded shadow-sm z-10" alt="" />
        <div
          onClick={(e) => {
            handleDeleteImg(id);
          }}
          className="rounded-full z-20 bg-red-400 size-4 absolute flex items-center justify-center -top-1 -right-4 cursor-pointer"
        >
          <X strokeWidth={1.25} className="size-3" color="white" />
        </div>
      </div>
    </>

  )
}
