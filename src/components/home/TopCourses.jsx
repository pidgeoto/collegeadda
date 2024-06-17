"use client"
import React, { useEffect, useState } from "react";
import TopCourseCard from "./cards/TopCourseCard";
import { GET_COURSES } from "@/graphql/query";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";
import client from "@/app/apollo";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";

const TopCourses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: GET_COURSES });
        const filteredCourses = data?.courses
          .slice(0, 8)
          .filter((course) => course.courseName !== "none");
        setCourses(filteredCourses);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div>
      <h2>Top Courses</h2>
      <div className="f-between flex-wrap gap-2 my-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton4x4 key={index} />
        ))}
      </div>
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Top Courses</h1>
        <Link href="/courses" className="text-sm font-normal">
          View More
        </Link>
      </div>
      <div className="f-center flex-wrap gap-4">
        {courses.map((course, index) => (
          <div key={index}>
            <Link
              href={`/courses/${sanitizeTitleForURL(course.courseName)}/${
                course.customId
              }`}
            >
              <TopCourseCard data={course} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
