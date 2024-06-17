"use client";
import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import UniversityCard from "@/components/home/cards/UniversityCard";
import { GET_UNIVERSITY } from "@/graphql/query";
import { sanitizeTitleForURL } from "@/lib/utils";
import { SearchField } from "@/components/ui/searchField";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";

const UniversityList = () => {
  const client = useApolloClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_UNIVERSITY,
        });
        setUniversities(data.affiliatedUniversities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [client]);
  if (loading)
    return (
      <div className="mx-auto">
        <h1 className="my-8 text-3xl font-bold">University</h1>
        <div className="flex flex-wrap">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <Skeleton4x4 />
            </div>
          ))}
        </div>
      </div>
    );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (university.shortName &&
        university.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">University</h1>

        <SearchField
          placeholder="Search Universities here"
          onChange={handleSearch}
          className="w-96"
        />
      </div>
      <div className="f-row gap-7">
        {filteredUniversities.map((university, index) => (
          <div key={index}>
            <Link
              href={`university/${sanitizeTitleForURL(university.name)}/${
                university.customId
              }`}
            >
              <UniversityCard
                data={{
                  name: university.name,
                  colleges: university.collegesSet,
                  imageUrl: university.cardImgUrl,
                  city: university.cityKey ? university.cityKey.name : "",
                  state: university.stateKey ? university.stateKey.name : "",
                  country: university.countryKey
                    ? university.countryKey.name
                    : "",
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityList;
