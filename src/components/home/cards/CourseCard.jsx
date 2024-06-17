import { MoveUpRight } from "lucide-react";
import React from "react";

export default function CourseCard({ department }) {
  return (
    <div>
      <div className="f-between flex-row group rounded-md border hover:border-purple-600  bg-gray-100 p-2 lg:p-3 transition-all cursor-pointer">
        <div className="rounded-md p-2">
          <h3>{department}</h3>
        </div>
        <div className="bg-white rounded-full p-2 transition-all group-hover:bg-purple-600">
          <MoveUpRight
            size={20}
            strokeWidth={2}
            className="text-purple-600 group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
