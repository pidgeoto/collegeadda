import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const StudyAbroadCard = ({ title, collegeCount, avgCost }) => {
  const guideTopics = [
    "Why Study in the USA?",
    "SOP for USA",
    "Exams for studying in USA",
    "Post Study opportunities in USA",
  ];

  return (
    <div className="rounded-md shadow-md border p-4 w-80">
      <div className="flex flex-col items-center">
        <Image
          src="/ranking.svg"
          width={1000}
          height={1000}
          alt={`Study in ${title} ranking`}
          className="rounded-full w-24 h-24 object-cover"
        />
        <div className="text-center mt-3">
          <div>
            <h2 className="font-medium">{`Study in ${title}`}</h2>
            <h6 className="text-gray-500 text-xs">{`Check ${collegeCount} Colleges`}</h6>
          </div>
        </div>
        <div className="flex gap-2 my-4">
          <div className="text-xs bg-gray-100 rounded-md p-2">
            <h2>{collegeCount}</h2>
            <h6 className="text-gray-400">No. of colleges</h6>
          </div>
          <div className="text-xs bg-gray-100 rounded-md p-2">
            <h2>{avgCost}</h2>
            <h6 className="text-gray-400">Avg. Study Cost</h6>
          </div>
        </div>
      </div>
      <div>
        <h4>Guide</h4>
        <ul>
          {guideTopics.map((topic, index) => (
            <li key={index} className="flex items-center justify-between pb-2 border-b-[1px] text-xs mt-2">
              <div>
                <h5>{topic}</h5>
              </div>
              <div>
                <ChevronRight size={16} strokeWidth={1} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyAbroadCard;
