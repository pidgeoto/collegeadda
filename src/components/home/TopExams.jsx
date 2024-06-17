"use client";
import React, { useEffect, useState } from "react";
import TopExamCard from "./cards/TopExamCard";
import { GET_EXAMS } from "@/graphql/query";
import Link from "next/link";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";
import client from "@/app/apollo";
import { sanitizeTitleForURL } from "@/lib/utils";

const TopExams = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: GET_EXAMS });
        const filteredExams = data?.exams.slice(0, 8);
        setExams(filteredExams);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto">
        <h1 className="my-8 text-3xl font-bold">Top Exams</h1>
        <div className="flex flex-wrap">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <Skeleton4x4 />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  if (!exams || exams.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Top Exams</h1>
        <Link href="/exams" className="text-sm font-normal">
          View More
        </Link>
      </div>
      <div className="f-between flex-wrap gap-4">
        {exams.map((exam, index) => (
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
      </div>
    </div>
  );
};

export default TopExams;
