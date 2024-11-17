'use client'

import { CreateProductFormData } from "@/app/(shop)/_components/new-product-form";
import NewProductPopupCategory from "@/app/(shop)/_components/new-product-popup-category";
import { clientAccessToken } from "@/lib/http";
import { addImage, changeProductName } from "@/redux/slices/shop-new-product.slice";
import { useAppSelector } from "@/redux/store";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { ImagePlus, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closestCenter, DndContext, DragEndEvent, MeasuringStrategy } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import ProductImage from "@/app/(shop)/_components/product-image";
import envConfig from "@/config";


export default function NewProductFirstSection({ register, errors, getValues, watch, setValue, control, setError }:
  {
    register: UseFormRegister<CreateProductFormData>,
    errors: FieldErrors<CreateProductFormData>
    getValues: UseFormGetValues<CreateProductFormData>,
    watch: UseFormWatch<CreateProductFormData>
    setValue: UseFormSetValue<CreateProductFormData>
    setError: UseFormSetError<CreateProductFormData>
    control: Control<CreateProductFormData>
  }
) {
  const [isShowPopupCategory, setIsShowPopupCategory] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const images = useAppSelector(state => state.shopListProduct.images);
  // const images = getValues('images');
  const images = useWatch({ control, name: "images" });
  const [imagesLimit, setImagesLimit] = useState<number>(9)
  const productName = useAppSelector(state => state.shopListProduct.name);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const accessToken = clientAccessToken.value;


  const handleImageClick = () => {
    if (images.length < 9) {
      fileInputRef.current?.click(); // Trigger sự kiện click của input file
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setLoading(true);
        console.log({ accessToken });
        let length = images.length;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images[]', files[i])
        }
        const upload = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/product/uploadImage`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const res: { status: boolean, message: string, images: string[] } = await upload.json();
        dispatch(addImage(res.images));
        setValue('images', [...getValues('images'), ...res.images]);
        setError('images', { message: undefined })
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    dispatch(changeProductName(name));
  }

  const handleDeleteImg = (i: number) => {
    const newImages = getValues('images').filter((_, index) => index !== i);
    setValue('images', [...newImages]);
  }

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('handle drag end: ', e);

    const { active, over, delta } = e;
    if (over) {
      if (active.id !== over.id) {
        const oldIndex = images.findIndex((_, index) => index === active.id);
        const newIndex = images.findIndex((_, index) => index === over.id);

        const newImages = arrayMove(images, oldIndex, newIndex);
        setValue('images', newImages);
      }
    } else {
      return
    }
    // if (delta.x === delta.y && delta.x === 0) {
    //   const id = active.id;
    //   const newImages = images.filter((_, index) => id !== index);
    //   setValue('images', newImages);
    // }
  }


  return (
    <div className="px-6 py-6 bg-white shadow rounded">
      <div className="text-[20px] font-semibold mb-6">Thông tin bán hàng</div>
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">Hình ảnh sản phẩm</div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex gap-2 h-10">
            <input type="radio" defaultChecked={true} />
            <div className="text-[14px] font-medium f-full flex items-center">Ảnh tỷ lệ 1:1</div>
          </div>
          <div className="flex gap-5 w-full">

            <DndContext
              measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
              onDragStart={(e) => {
                console.log('handle drg start: ', e);
              }}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-5 relative">
                {images.length > 0 && images.map((it, index) => (
                  <SortableContext key={index} items={images.map((_, index) => index)} strategy={horizontalListSortingStrategy}>
                    <ProductImage handleDeleteImg={handleDeleteImg} id={index} image={it} />
                  </SortableContext>
                ))}
              </div>
            </DndContext>
            {/* <div className="flex gap-5">
              {images.length > 0 && images.map((it, index) => (
                <div className="size-20 relative" draggable>
                  <img key={index} src={it} className="object-cover size-full border rounded shadow-sm" alt="" />
                  <div
                    onClick={() => handleDeleteImg(index)}
                    className="rounded-full bg-red-400 size-4 absolute flex items-center justify-center -top-1 -right-1 cursor-pointer"
                  >
                    <X strokeWidth={1.25} className="size-3" color="white" />
                  </div>
                </div>
              ))}
            </div> */}

            {loading && (
              <div
                className="border-dashed border-gray-400 border size-20 cursor-pointer hover:bg-blue-100 rounded">
                <div className="size-full flex justify-center items-center">
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {!loading && (
              <div
                onClick={handleImageClick}
                className="border-dashed border-gray-400 border size-20 cursor-pointer hover:bg-blue-100 rounded">
                <div className="size-full flex justify-center items-center">
                  <div className="px-1/2 flex flex-col justify-center items-center">
                    <input type="file" className="hidden" />
                    <ImagePlus color="#3389e6" strokeWidth={1} />
                    <div className="text-[12px] text-blue-600 text-center">Thêm hình ảnh ({images.length}/{imagesLimit})</div>
                  </div>
                </div>
              </div>
            )}

            <input ref={fileInputRef} accept=".jpg, .jpeg, .png, .webp" onChange={handleFileChange} type="file" multiple className="hidden" name="" id="" />
          </div>
        </div>
      </div>
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">Ảnh bìa</div>
          </div>
        </div>
        <div className="">
          {images[0] && (
            <div className="size-20">
              <img src={images[0]} className="object-cover size-full border rounded shadow-sm" alt="" />
            </div>
          )}
          {!images[0] && (
            loading ? (
              <div
                className="border-dashed border-gray-400 border size-20 cursor-pointer hover:bg-blue-100 rounded">
                <div className="size-full flex justify-center items-center">
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-dashed border-gray-400 border size-20 cursor-pointer hover:bg-blue-100 rounded">
                  <div className="size-full flex justify-center items-center">
                    <div className="px-1/2 flex flex-col justify-center items-center">
                      <input type="file" className="hidden" />
                      <ImagePlus color="#3389e6" strokeWidth={1} />
                      <div className="text-[12px] text-blue-600 text-center">(0/1)</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {errors.images && <p className="text-sm text-red-500 ml-[102px] mt-1">{errors.images.message}</p>}
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">Tên sản phẩm</div>
          </div>
        </div>
        <div className="w-full">
          <div className={`h-10 w-full px-3 border rounded-sm flex `}>
            <input
              {...register('name')}
              className="h-full w-full outline-none text-[14px]"
              placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
            />
            <div className="pl-2 h-full flex items-center">
              <div className="h-6 border-l pl-2 text-[14px] text-gray-400">{0}/120</div>
            </div>
          </div>
        </div>
      </div>
      {errors.name && <p className="text-sm text-red-500 ml-[102px] mt-1">{errors.name.message?.toString()}</p>}
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">
              Ngành hàng
            </div>
          </div>
        </div>
        <div className="w-full">
          <NewProductPopupCategory
            setError={setError}
            setValue={setValue}
            isShowPopupCategory={isShowPopupCategory}
            setIsShowPopupCategory={setIsShowPopupCategory}
          />
        </div>
      </div>
      {errors.category_id && <p className="text-sm text-red-500 ml-[102px] mt-1">{errors.category_id.message?.toString()}</p>}
      <div className="w-full flex mb-6">
        <div>
          <div className="w-[144px] h-10 mr-6 flex justify-end items-center gap-1">
            <span className="text-[12px] text-blue-700">*</span>
            <div className="text-[14px] h-full font-medium flex items-center">Mô tả sản phẩm</div>
          </div>
        </div>
        <div className="w-full">
          {/* <div className="w-full px-2 py-[5px] border rounded-sm flex">
            <textarea className="h-40 w-full border rounded-sm outline-none text-[14px]" />
          </div> */}
          <textarea {...register('description')} className="h-40 px-2 py-[5px] w-full border rounded-sm text-[14px] focus:border-black" />

        </div>
      </div>
      {errors.description && <p className="text-sm text-red-500 ml-[102px] mt-1">{errors.description.message?.toString()}</p>}
    </div>
  )
}
