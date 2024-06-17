"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import AdsData from "@/static/HomeAds.json";

export function HomeAd() {
  const HomeAds = AdsData.HomeAds;

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <div className="my-8">
      <Carousel className="w-full"opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}>
        <CarouselContent>
          {HomeAds.map((imageUrl, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div>
                <Image
                  src={imageUrl}
                  height={400}
                  width={2000}
                  alt={index + 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeAd;
