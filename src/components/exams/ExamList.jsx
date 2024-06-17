"use client";
import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_EXAMS } from "@/graphql/query";
import TopExamCard from "../home/cards/TopExamCard";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";

const ExamList = () => {
  const client = useApolloClient();
  const [examLevelFilters, setExamLevelFilters] = useState([]);
  const [modeOfExamFilters, setModeOfExamFilters] = useState([]);
  const [examLevels, setExamLevels] = useState([]);
  const [modesOfExam, setModesOfExam] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_EXAMS,
        });

        if (data?.exams) {
          const levels = new Set();
          const modes = new Set();
          data.exams.forEach((exam) => {
            levels.add(exam.levelOfExam);
            modes.add(exam.modeOfExam);
          });
          setExamLevels([...levels]);
          setModesOfExam([...modes]);
          setExams(data.exams);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [client]);

  const handleExamLevelFilterChange = (event) => {
    const value = event.target.value;
    setExamLevelFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const handleModeOfExamFilterChange = (event) => {
    const value = event.target.value;
    setModeOfExamFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 4); // Increase the number of items to display by 4
  };

  if (loading)
    return (
      <div className="mx-auto">
        <h1 className="my-8 text-3xl font-bold">Exams</h1>
        <div className="flex flex-wrap">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <Skeleton4x4 />
            </div>
          ))}
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const today = new Date();

  const upcomingExams = exams.filter((exam) => {
    const applicationEndDate = new Date(exam.applicationEndDate);
    return applicationEndDate > today;
  });

  const filteredExams = exams.filter((exam) => {
    const matchesExamLevel =
      examLevelFilters.length === 0 ||
      examLevelFilters.includes(exam.levelOfExam);
    const matchesModeOfExam =
      modeOfExamFilters.length === 0 ||
      modeOfExamFilters.includes(exam.modeOfExam);
    const isUpcoming = new Date(exam.applicationEndDate) > new Date();

    const isVisible = exam.examName !== "none" && isUpcoming;

    return matchesExamLevel && matchesModeOfExam && isVisible;
  });

  const filteredAndSortedExams = [
    ...filteredExams.filter((exam) => upcomingExams.includes(exam)),
    ...filteredExams.filter((exam) => !upcomingExams.includes(exam)),
  ];

  return (
    <div>
      <div>
        <div className="f-between flex-row">
          <h1 className="my-8 text-3xl font-bold">Exams</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Filter
                size={20}
                strokeWidth={1.75}
                className="p-2 rounded-md h-10 w-10 cursor-pointer bg-[#4f2e8e] text-white  border border-purple-800 hover:bg-white hover:text-[#4f2e8e]"
              />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                  <div>
                    <div className="mb-4">
                      <p className="text-base">Exam Level</p>
                      {examLevels.map((level, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            id={`examLevel-${index}`}
                            value={level}
                            checked={examLevelFilters.includes(level)}
                            onChange={handleExamLevelFilterChange}
                            className="accent-[#4f2e8e]"
                          />
                          <label
                            htmlFor={`examLevel-${index}`}
                            className="text-sm font-light"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <p className="text-base">Mode of Exam</p>
                      {modesOfExam.map((mode, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            id={`modeOfExam-${index}`}
                            value={mode}
                            checked={modeOfExamFilters.includes(mode)}
                            onChange={handleModeOfExamFilterChange}
                            className="accent-[#4f2e8e]"
                          />
                          <label
                            htmlFor={`modeOfExam-${index}`}
                            className="text-sm font-light"
                          >
                            {mode}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="f-col gap-4">
          {/* Filtered and sorted exams section */}
          {examLevelFilters.length > 0 || modeOfExamFilters.length > 0 ? (
            <div>
              <h2 className="my-4 text-2xl font-bold">Filtered Exams</h2>
              <div className="f-row gap-4">
                {filteredAndSortedExams.slice(0, displayCount).map((exam, index) => (
                  <div key={index}>
                    <Link
                      href={`/exams/${sanitizeTitleForURL(exam.examName)}/${
                        exam.customId
                      }`}
                    >
                      <TopExamCard data={exam} />
                    </Link>
                  </div>
                ))}
                {filteredAndSortedExams.length > displayCount && (
                  <button onClick={handleViewMore} className="text-purple-800 underline hover:text-[#4f2e8e]">View More</button>
                )}
              </div>
            </div>
          ) : null}
          {/* Upcoming exams section */}
          {upcomingExams.length > 0 && (
            <div>
              <h2 className="my-4 text-2xl font-bold">Upcoming Exams</h2>
              <div className="f-row gap-4">
                {upcomingExams.slice(0, displayCount).map((exam, index) => (
                  <div key={index}>
                    <Link
                      href={`/exams/${sanitizeTitleForURL(exam.examName)}/${
                        exam.customId
                      }`}
                    >
                      <TopExamCard data={exam} />
                    </Link>
                  </div>
                ))}
                {upcomingExams.length > displayCount && (
                  <button onClick={handleViewMore} className="text-purple-800 underline hover:text-[#4f2e8e]">View More</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamList;
