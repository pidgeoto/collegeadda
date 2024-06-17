import React from "react";
import Image from "next/image";

const UniversityCard = ({ data }) => {
  const { name, colleges, city, state, country, imageUrl } = data;
  const collegeCount = colleges ? colleges.length : 0;

  return (
    <div className="rounded-md shadow-md border p-4 w-80 min-h-80">
      <div className="flex flex-col items-center">
        <Image
          src={imageUrl || "/ranking.svg"}
          width={1000}
          height={1000}
          alt={name}
          className="rounded-full w-32 h-32 object-cover"
        />
        <div className="text-center mt-3">
          <div>
            <h2 className="font-medium text-sm">{name}</h2>
            {city && state && country && (
              <h6 className="text-xs text-gray-400 mb-2">
                {city}, {state}, {country}
              </h6>
            )}
            <h6 className="text-gray-500 text-xs">{`Check ${collegeCount} Colleges`}</h6>
          </div>
        </div>
        <div className="flex gap-2 my-4">
          <div className="text-xs bg-gray-100 rounded-md p-2">
            <h2>{collegeCount}</h2>
            <h6 className="text-gray-400">No. of colleges</h6>
          </div>
          <div className="text-xs bg-gray-100 rounded-md p-2">
            {/* <h2>{avgCost}</h2> */}
            <h6 className="text-gray-400">Avg. Study Cost</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
