import React from "react";
import StudyAbroadCard from "./cards/StudyAbroadCard";

const StudyAbroad = () => {
  const studyAbroadOptions = [
    { id: 1, title: "Study in USA", collegeCount: 1021, avgCost: "33.91 K USD/Year" },
    { id: 2, title: "Study in UK", collegeCount: 1021, avgCost: "33.91 K USD/Year" },
    { id: 3, title: "Study in Canada", collegeCount: 1021, avgCost: "33.91 K USD/Year" },
    { id: 4, title: "Study in Austraila", collegeCount: 1021, avgCost: "33.91 K USD/Year" },
  ];

  return (
    <div>
      <div>
        <h1 className="my-8 text-3xl font-bold">Study Abroad</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {studyAbroadOptions.map((option) => (
            <StudyAbroadCard
              key={option.id}
              title={option.title}
              collegeCount={option.collegeCount}
              avgCost={option.avgCost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;
