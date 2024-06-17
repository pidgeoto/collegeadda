import React from "react";
import client from "@/app/apollo";
import { GET_EXAM_BY_CUSTOM_ID } from "@/graphql/query";
import dynamic from 'next/dynamic';
const ExamIndividual = dynamic(() => import("@/components/exams/ExamIndividual"));

const IndividualExams = ({ params: { customId } }) => {
  const custom_Id = customId;

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: GET_EXAM_BY_CUSTOM_ID,
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

    const exam = data?.examByCustomId;

    return (
      <div>
        <ExamIndividual exam={exam} />
      </div>
    );
  };

  return renderContent();
};

export default IndividualExams;
