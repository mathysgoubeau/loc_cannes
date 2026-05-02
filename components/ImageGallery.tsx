"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  priorityFirst?: boolean;
};

export function ImageGallery({ images, priorityFirst = false }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((current) => nextIndex(current, images.length));
      if (event.key === "ArrowLeft") setActiveIndex((current) => previousIndex(current, images.length));
    }

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`luxury-focus group relative overflow-hidden border border-white/10 bg-white/[0.02] ${
              index === 0 ? "col-span-2 aspect-[1.42/1] md:col-span-2 md:row-span-2" : "aspect-[0.9/1]"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ouvrir ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={index === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 18vw, 50vw"}
              className="object-cover opacity-[0.85] transition duration-[1600ms] ease-out group-hover:scale-105 group-hover:opacity-100"
              priority={priorityFirst && index === 0}
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-50 bg-black" role="dialog" aria-modal="true">
          <Image src={activeImage.src} alt={activeImage.alt} fill sizes="100vw" className="object-contain" priority />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/70 p-4 backdrop-blur">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/60">{activeImage.alt}</p>
            <button
              type="button"
              className="luxury-focus grid h-11 w-11 place-items-center border border-white/20 text-white transition duration-500 hover:border-gold hover:text-gold"
              onClick={() => setActiveIndex(null)}
              aria-label="Fermer"
            >
              X
            </button>
          </div>
          <button
            type="button"
            className="luxury-focus absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/60 text-white transition duration-500 hover:border-gold hover:text-gold"
            onClick={() => setActiveIndex((current) => previousIndex(current, images.length))}
            aria-label="Image précédente"
          >
            {"<"}
          </button>
          <button
            type="button"
            className="luxury-focus absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/60 text-white transition duration-500 hover:border-gold hover:text-gold"
            onClick={() => setActiveIndex((current) => nextIndex(current, images.length))}
            aria-label="Image suivante"
          >
            {">"}
          </button>
        </div>
      ) : null}
    </>
  );
}

function nextIndex(current: number | null, length: number) {
  if (current === null) return 0;
  return (current + 1) % length;
}

function previousIndex(current: number | null, length: number) {
  if (current === null) return 0;
  return (current - 1 + length) % length;
}
