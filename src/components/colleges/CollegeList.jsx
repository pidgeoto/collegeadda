"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CollegeCard from "../home/cards/CollegeCard";
import { GET_COLLEGES } from "@/graphql/query";
import { sanitizeTitleForURL } from "@/lib/utils";
import { SearchField } from "../ui/searchField";
import CollegeFilter from "./CollegeFilter";
import Skeleton3x2 from "../Skeleton/Skeleton3x2";
import client from "@/app/apollo";

const CollegeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    affiliatedTo: "",
    tags: "",
    city: "",
    state: "",
    country: "",
  });

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: GET_COLLEGES,
      });
      setColleges(data?.colleges || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      affiliatedTo: "",
      tags: "",
      city: "",
      state: "",
      country: "",
    });
  };

  if (loading) {
    return (
      <div className="mx-auto">
        <h1 className="my-8 text-3xl font-bold">Colleges</h1>
        <div className="flex flex-wrap">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <Skeleton3x2 />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  let filteredColleges = colleges;

  filteredColleges = filteredColleges.filter((clg) => {
    const query = searchQuery.toLowerCase();
    const title = clg.name.toLowerCase();
    const shortTitle = clg.shortName?.toLowerCase() || "";
    return title.includes(query) || shortTitle.includes(query);
  });

  if (
    filters.state ||
    filters.city ||
    filters.country ||
    filters.affiliatedTo ||
    filters.tags
  ) {
    filteredColleges = filteredColleges.filter((clg) => {
      return (
        (!filters.state || clg.state.name === filters.state) &&
        (!filters.city || clg.city.name === filters.city) &&
        (!filters.country || clg.country.name === filters.country) &&
        (!filters.affiliatedTo ||
          clg.affiliatedto?.[0]?.name === filters.affiliatedTo) &&
        (!filters.tags ||
          clg.tags.some((tag) => tag.name.includes(filters.tags)))
      );
    });
  }

  const stateOptions = Array.from(
    new Set(filteredColleges.map((clg) => clg.state.name))
  ).sort();

  const cityOptions = Array.from(
    new Set(filteredColleges.map((clg) => clg.city.name))
  ).sort();

  const countryOptions = Array.from(
    new Set(filteredColleges.map((clg) => clg.country.name))
  ).sort();

  const affiliatedToOptions = Array.from(
    new Set(filteredColleges.map((clg) => clg.affiliatedto?.[0]?.name || ""))
  ).sort();
  // const tagOptions = Array.from(
  //   new Set(filteredColleges.flatMap((clg) => clg.tags.map((tag) => tag.name)))
  // ).sort();

  const handleStateFilterChange = (option) => {
    handleFilterChange("state", option);
  };

  const handleCityFilterChange = (option) => {
    handleFilterChange("city", option);
  };

  const handleCountryFilterChange = (option) => {
    handleFilterChange("country", option);
  };

  const handleAffiliatedToFilterChange = (option) => {
    handleFilterChange("affiliatedTo", option);
  };

  // const handleTagFilterChange = (option) => {
  //   handleFilterChange("tags", option);
  // };

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Colleges</h1>
        <div className="f-row gap-4">
          <SearchField
            placeholder="Search colleges here"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96"
          />
          <CollegeFilter
            affiliatedToOptions={affiliatedToOptions}
            // tagOptions={tagOptions}
            cityOptions={cityOptions}
            stateOptions={stateOptions}
            countryOptions={countryOptions}
            handleAffiliatedToFilterChange={handleAffiliatedToFilterChange}
            // handleTagFilterChange={handleTagFilterChange}
            handleCityFilterChange={handleCityFilterChange}
            handleStateFilterChange={handleStateFilterChange}
            handleCountryFilterChange={handleCountryFilterChange}
            resetFilters={resetFilters}
          />
        </div>
      </div>
      {filteredColleges.length === 0 ? (
        <p className="text-red-500">No colleges found.</p>
      ) : (
        <div className="flex flex-wrap">
          {filteredColleges.map((clg, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-8">
              <Link
                href={`/colleges/${sanitizeTitleForURL(clg.name)}/${
                  clg.customId
                }`}
              >
                <CollegeCard
                  data={{
                    name: clg.name,
                    imageUrl: clg.cardImgUrl,
                    course: clg.Courses,
                    accreditation: clg.accreditation,
                    city: clg.city.name,
                    state: clg.state.name,
                    country: clg.country.name,
                    year: clg.foundedYear,
                    university: clg.affiliatedto?.[0]?.name || "",
                    avgFees: clg.tuitionFee,
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeList;
