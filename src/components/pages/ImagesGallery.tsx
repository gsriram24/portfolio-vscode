"use client";

import Image from "next/image";
import { useState } from "react";

export function ImagesGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div className="flex flex-col gap-2 max-w-7xl">
      {/* Hero */}
      <div className="border-2 border-accent rounded-sm overflow-hidden">
        <Image
          src={images[selected]}
          alt={`${title} screenshot ${selected + 1}`}
          width={960}
          height={600}
          className="w-full h-auto block"
        />
      </div>

      {/* Thumbnail strip — horizontal below hero */}
      {hasMultiple && (
        <div className="flex flex-row gap-2 mt-2">
          {images.map((src, i) => (
            <div key={i} className="flex-1 max-w-50 cursor-pointer" onClick={() => setSelected(i)}>
              <div
                className={`rounded-sm overflow-hidden bg-side transition-[border-color,opacity] duration-(--duration-fast) ease-vscode ${
                  i === selected
                    ? "border border-accent outline-1 outline-accent outline-offset-1 opacity-100"
                    : "border border-border opacity-50 hover:opacity-75"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} thumbnail ${i + 1}`}
                  width={200}
                  height={120}
                  className="w-full h-16 sm:h-30 object-cover block"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
