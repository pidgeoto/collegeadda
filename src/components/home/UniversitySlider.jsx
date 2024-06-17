"use client"
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import LogoImg from "@/static/universityLogo"

export function UniversitySlider() {

  const universityLogo = LogoImg.universityLogo;

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    plugins={[plugin.current]}
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.play}
      className="m-8"
    >
      <CarouselContent>
      {universityLogo.map((imageUrl, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/6">
            <div>
              <div className="rounded-full">
                <Image
                  src={imageUrl}
                  height={1600}
                  width={1600}
                  alt="uni"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
