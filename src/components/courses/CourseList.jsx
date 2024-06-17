"use client";
import React, { useState, useEffect } from "react";
import { GET_COURSES } from "@/graphql/query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";
import dynamic from 'next/dynamic';
import client from "@/app/apollo";

const TopCourseCard = dynamic(() => import("../home/cards/TopCourseCard"));

const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState(16);
  const [durationFilter, setDurationFilter] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [courseTypeFilter, setCourseTypeFilter] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: GET_COURSES,
      });
      setData(data.courses);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto">
        <h1 className="my-8 text-3xl font-bold">Courses</h1>
        <div className="flex flex-wrap">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <Skeleton4x4 />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const courses = data;

  const durationOptions = Array.from(
    new Set(
      courses
        .filter((course) => course.courseName !== "none")
        .map((course) => course.duration)
    )
  ).sort();

  const departmentOptions = Array.from(
    new Set(
      courses
        .filter((course) => course.courseName !== "none")
        .map((course) => course.department)
    )
  ).sort();

  const courseTypeOptions = Array.from(
    new Set(courses.map((course) => course.courseType[0]?.name))
  ).sort();

  const filteredCourses = courses.filter((course) => {
    const matchesDuration =
      durationFilter.length === 0 || durationFilter.includes(course.duration);
    const matchesDepartment =
      !departmentFilter || course.department === departmentFilter;
    const matchesCourseType =
      courseTypeFilter.length === 0 ||
      courseTypeFilter.includes(course.courseType[0]?.name);

    const isVisible = course.courseName !== "none";

    return (
      matchesDuration && matchesDepartment && matchesCourseType && isVisible
    );
  });

  const handleDurationFilterChange = (option) => {
    setDurationFilter((prevFilter) =>
      prevFilter.includes(option)
        ? prevFilter.filter((item) => item !== option)
        : [...prevFilter, option]
    );
  };
  const handleCourseTypeFilterChange = (option) => {
    setCourseTypeFilter((prevFilter) =>
      prevFilter.includes(option)
        ? prevFilter.filter((item) => item !== option)
        : [...prevFilter, option]
    );
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleViewMore = () => {
    setDisplayedCourses((prevCount) => prevCount + 8);
  };

  return (
    <div>
      <div>
        <div className="f-between flex-row">
          <h1 className="my-8 text-3xl font-bold">Courses</h1>
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
                      <p className="text-base">Course Type</p>
                      {courseTypeOptions.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            id={`course-type-${index}`}
                            checked={courseTypeFilter.includes(option)}
                            onChange={() =>
                              handleCourseTypeFilterChange(option)
                            }
                            className="accent-[#4f2e8e]"
                          />
                          <label
                            htmlFor={`course-type-${index}`}
                            className="text-sm font-light"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <p className="text-base">Duration</p>
                      {durationOptions.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            id={`duration-${index}`}
                            checked={durationFilter.includes(option)}
                            onChange={() => handleDurationFilterChange(option)}
                            className="accent-[#4f2e8e]"
                          />

                          <label
                            htmlFor={`duration-${index}`}
                            className="text-sm font-light"
                          >
                            {option} years
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <p className="text-base">Department</p>
                      <Command>
                        <CommandInput placeholder="Search Department..." />
                        <CommandEmpty>No department found.</CommandEmpty>
                        <CommandGroup className="overflow-y-scroll h-[375px]">
                          {departmentOptions.map((option, index) => (
                            <CommandItem
                              key={index}
                              onSelect={() => setDepartmentFilter(option)}
                            >
                              {option}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="f-row gap-4">
          {filteredCourses.slice(0, displayedCourses).map((course, index) => (
            <div key={index}>
              <Link
                href={`/courses/${sanitizeTitleForURL(course.courseName)}/${course.customId}`}
              >
                <TopCourseCard data={course} />
              </Link>
            </div>
          ))}
        </div>
        {filteredCourses.length > displayedCourses && (
          <button
            onClick={handleViewMore}
            className="text-[#4f2e8e] hover:text-[#7e2e7e] focus:outline-none"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseList;

