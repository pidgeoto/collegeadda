import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { MotionDiv } from "@/components/MotionDiv";

export default function TagsCard({ data, index }) {
  const { name, imageUrl } = data;
  // const collegeCount = collegesSet.length;
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      className="w-80 rounded-xl border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-xl"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.5, ease: "easeInOut", duration: 0.5 }}
      viewport={{ amount: 0 }}
    >
      <Image
        className="w-full object-contain rounded-xl"
        src={imageUrl}
        alt="Product Image"
        width={1000}
        height={1000}
      />
      <div className="p-2">
        <div className="f-between">
          <h6 className="capitalize text-sm font-medium">
            {name.length > 33 ? name.slice(0, 33) + "..." : name}
          </h6>
          {/* <h6 className="text-xs">{`${collegeCount}+ Colleges`}</h6> */}
        </div>
        <Button className="primary my-3 w-full">Explore More</Button>
      </div>
    </MotionDiv>
  );
}
