import React from "react";
import { Skeleton } from "../ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row gap-2 w-full mb-8">
        <div className="lg:w-2/3 h-[600px] pr-4">
          <Skeleton className="w-full h-[440px]" />
          <Skeleton className="w-96 h-6 mt-4" />
          <Skeleton className="w-32 h-6 my-4" />
          <Skeleton className="w-full h-16 my-4" />
        </div>
        <div className="lg:w-1/3 border shadow-sm rounded-md p-4 bg-white">
          <Skeleton className="h-8 w-32 mb-8" />
          <div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="mt-4 flex gap-2">
                <Skeleton className="w-1/4 h-[86px]" />
                <Skeleton className="w-3/4 h-[86px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-48" />
      <Skeleton className="mx-auto h-9 md:rounded-3xl w-[540px] my-12" />

      <div className="f-between flex-wrap gap-7">
        {[...Array(40)].map((_, index) => (
          <div key={index} className="w-80 shadow-md rounded-md p-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-4 my-2" />
            <Skeleton className="h-8 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSkeleton;
