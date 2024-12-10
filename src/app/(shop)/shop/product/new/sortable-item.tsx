import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
        className="size-full rounded-sm"
        alt={`Image ${props.id}`}
      />

      {/* Nút xóa */}
      <button
        onClick={() => props.onDelete(props.id)}
        className="absolute top-1 right-1 bg-white text-red-500 border border-red-500 rounded-full p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete"
        type='button'
      >
        ✕
      </button>
    </div>
  );
}