'use client'

import SortableItem from "@/app/(guest)/test/sortable-item";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";


let mockImages = [
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732933580/ok1rf7xcdaogdobypa7c.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732888561/oyha63khk6yx1gv8ypgn.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732866659/i2lyspcfbg1xialug65d.webp'
]

export default function TestPage() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }


  return (
    <>
      <div className="flex gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map(id => <SortableItem key={id} id={id} />)}
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}
