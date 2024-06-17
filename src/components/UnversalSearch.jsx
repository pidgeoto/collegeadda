"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_ARTICLES,
  GET_COLLEGES,
  GET_COURSES,
  GET_EXAMS,
} from "@/graphql/query";
import { SearchField } from "./ui/searchField";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BookCheck,
  BookOpenCheck,
  Pencil,
  School,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";

function UniversalSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading: collegesLoading,
    error: collegesError,
    data: collegesData,
  } = useQuery(GET_COLLEGES);
  const {
    loading: examsLoading,
    error: examsError,
    data: examsData,
  } = useQuery(GET_EXAMS);
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(GET_COURSES);
  const {
    loading: articleLoading,
    error: articleError,
    data: articleData,
  } = useQuery(GET_ARTICLES);

  if (collegesLoading || examsLoading || coursesLoading || articleLoading)
    return (
      <SearchField
        type="text"
        placeholder="Search colleges, exams, courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-80 lg:w-80 mb-2 lg:mb-0"
      />
    );

  if (collegesError || examsError || coursesError || articleError)
    return (
      <p>
        Error:{" "}
        {collegesError?.message || examsError?.message || coursesError?.message}
      </p>
    );

  const allData = [
    ...(collegesData?.colleges?.map((college) => ({
      name: college.name,
      shortName: college.shortName,
      customId: college.customId,
      type: "college",
    })) || []),
    ...(examsData?.exams?.map((exam) => ({
      name: exam.examName,
      shortName: exam.examShortname,
      customId: exam.customId,
      type: "exam",
    })) || []),
    ...(coursesData?.courses?.map((course) => ({
      name: course.courseName,
      shortName: course.courseShortname,
      customId: course.customId,
      type: "course",
    })) || []),
    ...articleData?.articles?.map((article) => ({
      name: article.title,
      customId: article.customId,
      type: "article",
    })),
  ];

  let filteredData;

  if (searchTerm) {
    const preprocessInput = (input) => {
      return new RegExp(
        input
          .toLowerCase()
          .replace(/[\W_]+/g, "")
          .split("")
          .join(".*"),
        "i"
      );
    };

    filteredData = allData.filter(
      (item) =>
        (item.name &&
          preprocessInput(searchTerm).test(
            item.name.toLowerCase().replace(/[\W_]+/g, "")
          )) ||
        (item.shortName &&
          preprocessInput(searchTerm).test(
            item.shortName.toLowerCase().replace(/[\W_]+/g, "")
          ))
    );
  } else {
    filteredData = [];
    const randomIndexes = [];
    while (filteredData.length < 15) {
      const randomIndex = Math.floor(Math.random() * allData.length);
      if (!randomIndexes.includes(randomIndex)) {
        filteredData.push(allData[randomIndex]);
        randomIndexes.push(randomIndex);
      }
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <SearchField
            type="text"
            placeholder="Search colleges, exams, courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 lg:w-80 mb-2 lg:mb-0"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[480px] max-h-96 h-full overflow-y-scroll">
          <div>
            <ul>
              {filteredData.length === 0 ? (
                <li className="text-red-700">No results found.</li>
              ) : (
                filteredData.map((item, index) => (
                  <li
                    key={index}
                    className="my-2 hover:text-blue-400 text-sm flex items-center gap-2"
                  >
                    {searchTerm ? (
                      item.type === "college" ? (
                        <School size={16} strokeWidth={1} />
                      ) : item.type === "course" ? (
                        <BookCheck size={16} strokeWidth={1} />
                      ) : item.type === "exam" ? (
                        <BookOpenCheck size={16} strokeWidth={1} />
                      ) : item.type === "article" ? (
                        <Pencil size={16} strokeWidth={1} />
                      ) : (
                        <TrendingUp size={14} strokeWidth={1.5} />
                      )
                    ) : (
                      <TrendingUp size={14} strokeWidth={1.5} />
                    )}
                    <Link
                      href={
                        item.type === "college"
                          ? `/colleges/${sanitizeTitleForURL(item.name)}/${
                              item.customId
                            }`
                          : item.type === "course"
                          ? `/courses/${sanitizeTitleForURL(item.name)}/${
                              item.customId
                            }`
                          : `/exams/${sanitizeTitleForURL(item.name)}/${
                              item.customId
                            }`
                      }
                      prefetch={false}
                    >
                      {item.name}
                      {item.shortName && ` (${item.shortName})`}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UniversalSearch;
