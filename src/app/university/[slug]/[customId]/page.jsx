import React from "react";
import client from "@/app/apollo";
import { GET_UNIVERSITY_BY_CUSTOM_ID } from "@/graphql/query";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";
import dynamic from 'next/dynamic';
const CollegeCard = dynamic(() => import("@/components/home/cards/CollegeCard"));

const IndividualCollege = ({ params: { customId } }) => {
  const custom_Id = customId;

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: GET_UNIVERSITY_BY_CUSTOM_ID,
        variables: { custom_Id },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  const renderContent = async () => {
    let data, loading, error;

    try {
      data = await fetchData();
    } catch (err) {
      error = err;
    }

    if (!data) {
      loading = true;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const tags = data?.affiliatedUniversityByCustomId;

    return (
      <div>
        <div key={tags?.customId}>
          <h4 className="text-lg font-semibold mb-2">{tags?.name}</h4>
          {tags?.collegesSet && tags.collegesSet.length > 0 ? (
            <div className="f-row flex-wrap">
              {tags.collegesSet.map((college) => (
                <div key={college.customId} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <Link
                    href={`/colleges/${sanitizeTitleForURL(college.name)}/${
                      college.customId
                    }`}
                  >
                    <CollegeCard
                      data={{
                        name: college.name,
                        imageUrl: college.cardImgUrl,
                        course: college.Courses,
                        accreditation: college.accreditation,
                        city: college.city.name,
                        state: college.state.name,
                        country: college.country.name,
                        year: college.foundedYear,
                        university: college.affiliatedto?.[0]?.name || "",
                        avgFees: college.tuitionFee,
                        // tags: college.tags?.[0]?.name || "",
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-400">No colleges listed yet.</p>
          )}
        </div>
      </div>
    );
  };

  return renderContent();
};

export default IndividualCollege;
