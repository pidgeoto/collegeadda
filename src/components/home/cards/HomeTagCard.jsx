import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";

export default function HomeTagCard({ data }) {
  const { name, imageUrl } = data;

  return (
    <div className="w-80 p-2 rounded-xl border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-xl">
      <Image
        className="w-80 h-60 object-contain rounded-xl"
        src={imageUrl}
        alt="Product Image"
        width={1000}
        height={1000}
      />
      <div className="f-between pt-2">
        <h6 className="capitalize text-sm font-medium">
          {name.length > 33 ? name.slice(0, 33) + "..." : name}
        </h6>
        {/* <h6 className="text-xs">{`${collegeCount}+ Colleges`}</h6> */}
        {/* <div className="f-center rounded-full border-2 border-orange-300 h-7 w-7 relative">
          <Image
            src="/rating.svg"
            width={10}
            height={10}
            alt="rating"
            className="absolute top-[2px] right-[-5px]"
          />
          <h6>{rating}</h6>
        </div> */}
      </div>
      <div className="f-between my-3">
        <div>
          <Button className="primary">Explore More</Button>
        </div>
      </div>
    </div>
  );
}
