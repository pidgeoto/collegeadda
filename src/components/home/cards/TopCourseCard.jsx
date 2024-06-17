import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const TopCourseCard = ({ data }) => {
  const {
    courseName,
    courseShortname,
    duration,
    department,
    colleges,
    specialization,
    cardImgUrl,
  } = data;

  const collegesCount = colleges ? colleges.length : 0;
  const specializationCount = specialization ? specialization.length : 0;

  return (
    <div className="group rounded-md border hover:border-purple-600 bg-gray-100 transition-all">
      <div>
        <Image
          // src={"/college.png"}
          src={cardImgUrl}
          height={1000}
          width={1000}
          alt={courseShortname}
          className="w-80 h-60 rounded-t-md object-cover"
        />
        <div className="h-40 pt-3 p-2">
          <div className="f-between-row">
            <h5 className="w-48 font-medium text-sm">
              {courseName}
              {courseShortname &&
                courseShortname !== courseName &&
                ` (${courseShortname})`}
            </h5>
            <h5 className="text-[13px] px-2 py-1 border shadow-sm rounded-md">
              Colleges: {collegesCount}+
            </h5>
          </div>

          <div className="f-between-row mt-4">
            <h5 className="text-[13px] px-2 py-1 border shadow-sm rounded-md">
              Duration: {duration} yrs
            </h5>
            <h5 className="text-[13px] px-2 py-1 border shadow-sm rounded-md">
              Specialization: {specializationCount}+
            </h5>
          </div>
          <div className="f-between-row mt-2">
            <h5 className="text-[13px] px-2 py-1 border shadow-sm rounded-md">
              Dpt: {department}
            </h5>
            <Button className="primary group-hover:bg-white group-hover:text-[#4f2e8e]">Explore More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCourseCard;
