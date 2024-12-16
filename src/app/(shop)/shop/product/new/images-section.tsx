'use client'

import { Product } from "@/app/(shop)/shop/product/new/new-product-test-form";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { closestCenter, defaultDropAnimationSideEffects, DndContext, DragEndEvent, DragOverlay, DragStartEvent, DropAnimation, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableImage from "@/app/(shop)/shop/product/new/sortable-image";
import SortableItem from "@/app/(shop)/shop/product/new/sortable-item";

type Props = {
  watchedImages: string[],
  productFormHandle: UseFormReturn<Product>,
  tag?: boolean,
  setTag?: any
}

let mockImages = [
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732933580/ok1rf7xcdaogdobypa7c.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732888561/oyha63khk6yx1gv8ypgn.webp',
  'https://res.cloudinary.com/dg5xvqt5i/image/upload/v1732866659/i2lyspcfbg1xialug65d.webp'
]

export default function ImagesSection(props: Props) {
  const { productFormHandle, watchedImages, tag, setTag } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageBlobs, setImageBlobs] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [images, setImages] = useState(watchedImages);


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleImageClick = () => {
    let images = productFormHandle.getValues('images');
    if (images.length < 9) {
      fileInputRef.current?.click(); // Trigger sự kiện click của input file
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setLoadingImage(true);

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("images[]", files[i]);
        }

        // Tạo blob URL cho preview
        const newBlobs = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setImageBlobs((prevBlobs) => [...prevBlobs, ...newBlobs]);

        // Gửi request upload ảnh
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${clientAccessToken.value}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload images");
        }

        const payload: { status: boolean; message: string; images: string[] } = await res.json();

        // Cập nhật ảnh vào form
        const productImages = productFormHandle.getValues("images");
        productFormHandle.setValue("images", [
          ...productImages,
          ...payload.images,
        ]);
        productFormHandle.setError("images", { message: undefined });

        // Dọn dẹp blob URLs khi upload thành công
        setImageBlobs([]);
      } catch (error) {
        toast({ title: "Error uploading images", variant: "destructive" });
      } finally {
        setLoadingImage(false);
        event.target.value = ""; // Reset input file
        setTag(true)
      }
    }
  };


  // useEffect(() => {
  //   productFormHandle.setValue('images', mockImages)
  // }, [])


  useEffect(() => {
    return () => {
      imageBlobs.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, [imageBlobs]);


  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    let { active, over } = event;
    setActiveId(null);
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = watchedImages.findIndex((_, index) => index === active.id)
      const newIndex = watchedImages.findIndex((_, index) => index === over.id)
      productFormHandle.setValue('images', [...arrayMove(watchedImages, oldIndex, newIndex)])

    }
  }

  const handleDelete = (id: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated.splice(id, 1);
      return updated;
    });



    const updatedImages = watchedImages.filter((_, index) => index !== id);
    productFormHandle.setValue("images", [...updatedImages]);
  };


  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <div className="my-3">
      <div className="text-sm mb-2 font-semibold flex items-center gap-1">
        Ảnh sản phẩm
      </div>

      <div className="w-full p-4 bg-[#f5f8fd] rounded flex gap-2">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >

          <SortableContext
            items={watchedImages.map((img, index) => index)}
            strategy={horizontalListSortingStrategy}
          >
            {watchedImages.map((img, index) => <SortableItem image={img} key={index} id={index} onDelete={handleDelete}
            />)}
            <DragOverlay dropAnimation={dropAnimation}>
              {activeId !== null && (
                <div className="border size-20 flex items-center justify-center rounded-sm">
                  <img
                    src={watchedImages[activeId]}
                    className="size-full object-cover rounded-sm"
                    alt={`Dragging ${activeId}`}
                  />
                </div>
              )}
            </DragOverlay>
          </SortableContext>

          {loadingImage &&
            imageBlobs.map((blob, index) => (
              <div key={index} className="border size-20 rounded-sm relative">
                <img
                  src={blob}
                  className="size-full object-cover rounded-sm"
                  alt={`Loading ${index}`}
                />
                <div className="size-full bg-black opacity-10 rounded-sm absolute top-0 left-0 flex items-center justify-center">
                  <img
                    className="size-4 animate-spin"
                    src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                    alt="Loading icon"
                  />
                </div>
              </div>
            ))}

          {!loadingImage && (
            <div onClick={handleImageClick}>
              <div className="border-dashed bg-white border group border-[#c4c4c4] cursor-pointer size-20 rounded flex items-center justify-center hover:border-blue-500">
                <Plus
                  size={32}
                  strokeWidth={1.5}
                  className="group-hover:text-blue-500 text-[#858585]"
                />
              </div>
            </div>
          )}
        </DndContext>
      </div>


      <input
        ref={fileInputRef}
        accept=".jpg, .jpeg, .png, .webp"
        onChange={handleFileChange}
        type="file"
        multiple
        hidden
      />
      {productFormHandle.formState.errors?.images?.message && (
        <p className="text-sm text-red-500 mt-1">
          {productFormHandle.formState.errors.images.message}
        </p>
      )}
    </div>
  )
}
