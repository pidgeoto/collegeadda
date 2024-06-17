import React from "react";
import client from "@/app/apollo";
import { GET_TAGS_BY_CUSTOM_ID } from "@/graphql/query";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";

const IndividualTag = ({ params: { customId } }) => {
  const custom_Id = customId;

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: GET_TAGS_BY_CUSTOM_ID,
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

    const tags = data?.tagsByCustomId;

    return (
      <div>
        Tag
        <div key={tags?.customId}>
          <h4 className="text-lg font-semibold mb-2">{tags?.name}</h4>
          {tags?.collegesSet && tags.collegesSet.length > 0 ? (
            <ul className="mb-4">
              {tags.collegesSet.map((college) => (
                <li key={college.customId} className="f-between">
                  <h6 className="text-sm text-gray-500">{college.customId}</h6>
                  <Link
                    href={`/colleges/${sanitizeTitleForURL(college.name)}/${
                      college.customId
                    }`}
                  >
                    <h6 className="text-blue-500">{college.name}</h6>
                  </Link>
                  <h6 className="text-blue-500">Ranking : {college.ranking}</h6>
                  <h6 className="text-blue-500">
                    Estd : {college.foundedYear}
                  </h6>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-400">No colleges listed yet.</p>
          )}
        </div>
      </div>
    );
  };

  return renderContent();
};

export default IndividualTag;
