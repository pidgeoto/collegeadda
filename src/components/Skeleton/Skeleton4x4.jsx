import React from "react";
import { Skeleton } from "../ui/skeleton";

const Skeleton4x4 = () => {
  return (
    <div>
      <div className="w-80 h-72 flex flex-col overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <div className="p-2">
          <Skeleton className="h-48 w-full mb-3" />
          <Skeleton className="h-4 mb-2" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton4x4;