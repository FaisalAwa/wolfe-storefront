"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Vertical thumbnails — left on desktop, horizontal row on mobile */}
        {images.length > 1 ? (
          <ul className="flex flex-row md:flex-col gap-2 order-last md:order-first">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              return (
                <li key={image.src} className="w-[60px] md:w-[72px] aspect-square flex-shrink-0">
                  <button
                    formAction={() => updateImage(index.toString())}
                    aria-label="Select product image"
                    className={`h-full w-full bg-[#0A0A0A] p-1 border-2 transition-colors ${
                      isActive
                        ? 'border-brand-primary bg-[rgba(255,255,255,0.05)]'
                        : 'border-[rgba(255,255,255,0.15)] opacity-60 hover:opacity-100 hover:border-[rgba(255,255,255,0.4)]'
                    }`}
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={72}
                      height={72}
                      active={isActive}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        {/* Main image */}
        <div className="relative aspect-square flex-1 overflow-hidden bg-[#0A0908]">
          {images[imageIndex] && (
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          )}

          {images.length > 1 ? (
            <div className="absolute bottom-4 flex w-full justify-center">
              <div className="mx-auto flex h-10 items-center border border-[rgba(255,255,255,0.3)] bg-black/70 backdrop-blur-sm">
                <button
                  formAction={() => updateImage(previousImageIndex.toString())}
                  aria-label="Previous product image"
                  className={buttonClassName}
                >
                  <ArrowLeftIcon className="h-4 text-white" />
                </button>
                <div className="mx-1 h-5 w-px bg-[rgba(255,255,255,0.2)]"></div>
                <button
                  formAction={() => updateImage(nextImageIndex.toString())}
                  aria-label="Next product image"
                  className={buttonClassName}
                >
                  <ArrowRightIcon className="h-4 text-white" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
