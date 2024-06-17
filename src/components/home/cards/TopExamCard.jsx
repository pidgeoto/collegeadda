import { formatDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopExamCard = ({ data }) => {
  const {
    examName,
    examShortname,
    examDate,
    cardImgUrl,
    examDuration,
    resultDate,
    applicationStartDate,
    applicationEndDate,
    colleges,
    levelOfExam,
    examCenterCity,
    modeOfExam,
  } = data;

  let modeColorClass;

  switch (modeOfExam) {
    case "ONLINE":
      modeColorClass = "text-green-500";
      break;
    case "OFFLINE":
      modeColorClass = "text-orange-400";
      break;
    default:
      modeColorClass = "text-purple-400";
      break;
  }

  return (
    <div className="rounded-md shadow-md border p-4 w-72 sm:w-[330px] relative">
      <div className="flex flex-row mb-3 h-20 w-full">
        <div className="w-1/4">
          <div className="bg-gray-200 px-2 py-1 rounded-lg mb-2 absolute top-1 left-7">
            <h6 className={`text-[9px] font-medium ${modeColorClass}`}>
              {modeOfExam}
            </h6>
          </div>
          <Image
            // src="/examIco.svg"
            src={cardImgUrl}
            className="w-full object-fit"
            height={1000}
            width={1000}
            alt="exam icon"
          />
        </div>
        <div className="w-3/4 f-between flex-col items-start ml-2">
          <h4 className="font-semibold text-sm">
            {examName}({examShortname})
          </h4>
        </div>
      </div>
      <div>
        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Exam Level</h5>
          </div>
          <h6 className="text-sm">{levelOfExam}</h6>
        </div>
        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Application Starts</h5>
          </div>
          <h6 className="text-sm">{formatDate(applicationStartDate)}</h6>
        </div>
        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Exam Date</h5>
          </div>
          <h6 className="text-sm">{formatDate(examDate)}</h6>
        </div>
        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Exam Duration</h5>
          </div>
          <h6 className="text-sm">{examDuration} min</h6>
        </div>

        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Participating Colleges</h5>
          </div>
          <h6 className="text-sm">{colleges ? colleges.length + "+" : 0}</h6>
        </div>
        <div className="f-between-row mb-1">
          <div>
            <h5 className="text-gray-400">Exam Centers</h5>
          </div>
          <h6 className="text-sm">
            {examCenterCity ? examCenterCity.length + "+" : 0}
          </h6>
        </div>
      </div>
      <div className="mt-2">
        <div className="f-between-row pt-2 border-t-[1px]">
          <div>
            <h5>Exam Info</h5>
          </div>
          <div>
            <ChevronRight size={16} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopExamCard;
