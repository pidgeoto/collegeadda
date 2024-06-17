import React from "react";
import client from "@/app/apollo";
import { GET_ARTICLES_BY_CUSTOM_ID, GET_ARTICLES } from "@/graphql/query";
import "./article.css";
import ArticleIndividual from "@/components/articles/ArticleIndividual";

const IndividualArticle = ({ params: { customId } }) => {
  const custom_Id = customId;

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: GET_ARTICLES_BY_CUSTOM_ID,
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

    const article = data?.articleByCustomId;

    const relatedArticlesResult = await client.query({
      query: GET_ARTICLES,
    });

    const relatedArticles = relatedArticlesResult.data.articles.filter(
      (a) =>
        a.relatedTo === article.relatedTo && a.customId !== article.customId
    );

    return (
      <div>
        <ArticleIndividual
          article={article}
          relatedArticles={relatedArticles}
        />
      </div>
    );
  };

  return renderContent();
};

export default IndividualArticle;
