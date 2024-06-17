"use client"
import React, { useState, useEffect } from "react";
import client from "@/app/apollo";
import { GET_TAGS_BY_ID } from "@/graphql/query";

const CollegeByCustomId = ({ customId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.query({
          query: GET_TAGS_BY_ID,
          variables: { customId },
        });
        setData(result.data.tagsByCustomId);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [customId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      Individual College
      <div key={data?.customId}>
        <h4 className="text-lg font-semibold mb-2">{data?.name}</h4>
        {data?.collegesSet && data.collegesSet.length > 0 ? (
          <ul className="mb-4">
            {data.collegesSet.map((college) => (
              <li key={college.customId} className="flex justify-between">
                <h6 className="text-sm text-gray-500">{college.customId}</h6>
                <h6 className="text-blue-500">{college.name}</h6>
                <h6 className="text-blue-500">Ranking: {college.ranking}</h6>
                <h6 className="text-blue-500">Estd: {college.foundedYear}</h6>
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

export default CollegeByCustomId;
