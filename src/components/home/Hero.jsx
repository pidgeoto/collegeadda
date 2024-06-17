"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import carouselData from "@/static/carouselData.json";
import { SearchTab } from "./SearchTab";

export function Hero() {
  const heroImages = carouselData.heroCarousel;

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div>
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      className="w-full"
    >
      <CarouselContent>
        {heroImages.map((imageSrc, index) => (
          <CarouselItem key={index}>
            <div>
              <Image src={imageSrc} height={400} width={1600} alt="Hero Image" layout="responsive" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    <div className="f-center relative mb-6 lg:mb-24">
    <SearchTab />
  </div>
  </div>
  );
}
