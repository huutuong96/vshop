import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash } from 'lucide-react';

type Props = {
  id: number,
  image: string
  onDelete: (id: number) => void
}

export default function SortableItem(props: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border size-20 flex items-center justify-center rounded-sm group relative"
    >
      <img
        src={props.image}
        className="size-20 object-contain rounded-sm"
        alt={`Image ${props.id}`}
      />

      {/* Lớp phủ */}
      <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-40 rounded-sm'></div>

      {/* Nút sửa */}
      <button
        type="button"
        className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        title="Edit"
        onClick={() => {
          console.log(props.id);
        }
        }
      >
        <Pencil size={16} color="#000" strokeWidth={2} />
      </button>

      {/* Nút xóa */}
      <button
        type="button"
        onClick={() => props.onDelete(props.id)}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete"
      >
        <Trash size={16} color="#000" strokeWidth={2} />
      </button>
    </div>
  );
}