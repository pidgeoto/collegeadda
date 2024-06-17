"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_COLLEGES, GET_COURSES, GET_EXAMS, GET_UNIVERSITY } from "@/graphql/query";
import { sanitizeTitleForURL } from "@/lib/utils";

const SubFooter = () => {
  const {
    loading: collegesLoading,
    error: collegesError,
    data: collegesData,
  } = useQuery(GET_COLLEGES);
  const {
    loading: universitiesLoading,
    error: universitiesError,
    data: universitiesData,
  } = useQuery(GET_UNIVERSITY);
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

  if (collegesError || universitiesError || examsError || coursesError) {
    return (
      <p>
        Error:
        {collegesError?.message ||
          universitiesError?.message ||
          examsError?.message ||
          coursesError?.message}
      </p>
    );
  }

  const topColleges =
    collegesData?.colleges
      ?.filter((college) => college.priorityRank === 1 && college.priorityBool)
      .slice(0, 7)
      .map((college, index) => (
        <Link className="text-xs font-normal hover:text-blue-400" key={index} href={`/colleges/${sanitizeTitleForURL(college.shortName || college.name)}/${college.customId}`} passHref>
          <p>{college.shortName || college.name}</p>
        </Link>
      )) || [];

  const topUniversities =
    universitiesData?.affiliatedUniversities
      ?.filter(
        (university) => university.priorityRank === 1 && university.priorityBool
      )
      .slice(0, 7)
      .map((university, index) => (
        <Link className="text-xs font-normal hover:text-blue-400"
          key={index}
          href={`/university/${sanitizeTitleForURL(university.shortName || university.name)}/${university.customId}`}
          passHref
        >
          <p>{university.shortName || university.name}</p>
        </Link>
      )) || [];

  const topExams =
    examsData?.exams
      ?.filter((exam) => exam.priorityRank === 1 && exam.priorityBool)
      .slice(0, 7)
      .map((exam, index) => (
        <Link className="text-xs font-normal hover:text-blue-400" key={index} href={`/exams/${sanitizeTitleForURL(exam.examShortname || exam.examName)}/${exam.customId}`} passHref>
          <p>{exam.examShortname || exam.examName} 2024</p>
        </Link>
      )) || [];

  const topCourses =
    coursesData?.courses
      ?.filter((course) => course.priorityRank === 1 && course.priorityBool)
      .slice(0, 7)
      .map((course, index) => (
        <Link className="text-xs font-normal hover:text-blue-400" key={index} href={`/courses/${sanitizeTitleForURL(course.courseShortname || course.courseName)}/${course.customId}`} passHref>
          <p>{course.courseShortname || course.courseName} 2024</p>
        </Link>
      )) || [];

  return (
    <div className="px-2 lg:px-8 py-3 lg:pt-6 mt-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-full gap-4">
        <div>
          <h2 className="font-semibold text-sm mb-2">Top Colleges</h2>
          <div>{topColleges}</div>
        </div>
        <div>
          <h2 className="font-semibold text-sm mb-2">Top Universities</h2>
          <div>{topUniversities}</div>
        </div>
        <div>
          <h2 className="font-semibold text-sm mb-2">Top Exams</h2>
          <div>{topExams}</div>
        </div>
        <div>
          <h2 className="font-semibold text-sm mb-2">Top Courses</h2>
          <div>{topCourses}</div>
        </div>
        <div>
          <h2 className="font-semibold text-sm mb-2">Others</h2>
          <div>
            <p className="text-xs font-normal hover:text-blue-400">About</p>
            <p className="text-xs font-normal hover:text-blue-400">Contact Us</p>
            <p className="text-xs font-normal hover:text-blue-400">Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
