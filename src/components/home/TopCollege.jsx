"use client";
import React, { useEffect, useState } from "react";
import CollegeCard from "./cards/CollegeCard";
import { GET_COLLEGES } from "@/graphql/query";
import Link from "next/link";
import Skeleton3x2 from "../Skeleton/Skeleton3x2";
import { sanitizeTitleForURL } from "@/lib/utils";
import client from "@/app/apollo";

const TopCollege = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: GET_COLLEGES });
        const priorityColleges = data.colleges.filter(
          (college) => college.priorityBool
        );
        const sortedColleges = [...priorityColleges].sort(
          (a, b) => a.priorityRank - b.priorityRank
        );
        const topNineColleges = sortedColleges.slice(0, 9);
        setColleges(topNineColleges);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <h2>Top Colleges</h2>
        <div className="f-between flex-wrap my-4 gap-2">
          {[...Array(6)].map((_, index) => (
            <Skeleton3x2 key={index} />
          ))}
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto">
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Top Colleges</h1>
        <Link href="/colleges" className="text-sm font-normal">
          View More
        </Link>
      </div>
      <div className="flex flex-wrap">
        {colleges.map((clg, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <Link
              href={`/colleges/${sanitizeTitleForURL(clg.name)}/${
                clg.customId
              }`}
            >
              <CollegeCard
                data={{
                  name: clg.name,
                  course: clg.Courses,
                  accreditation: clg.accreditation,
                  imageUrl: clg.cardImgUrl,
                  city: clg.city.name,
                  state: clg.state.name,
                  country: clg.country.name,
                  year: clg.foundedYear,
                  university: clg.affiliatedto ? clg.affiliatedto[0]?.name : "",
                  avgFees: clg.tuitionFee,
                  // tags: clg.tags?.[0]?.name || "",
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCollege;
