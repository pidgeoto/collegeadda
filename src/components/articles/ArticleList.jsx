"use client";
import React, { useState, useEffect } from "react";
import { GET_ARTICLES } from "@/graphql/query";
import { Button } from "../ui/button";
import { formatDate, sanitizeTitleForURL, trimText } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Sparkles } from "lucide-react";
import ArticleCard from "./ArticleCard";
import BigStoriesCard from "./BigStoriesCard";
import ArticleSkeleton from "../Skeleton/ArticleSkeleton";
import client from "@/app/apollo";

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlesData, setArticlesData] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: GET_ARTICLES,
      });
      setArticlesData(data.articles);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  let sortedArticles = [...articlesData].sort((a, b) => {
    const dateComparison = new Date(b.publicationDate) - new Date(a.publicationDate);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.priorityRank - b.priorityRank;
  });

  const mostRecentArticle = sortedArticles.find(
    (article) => article.priorityRank === 1 && article.promoted && article.priority
  );

  const bigStoriesArticles = sortedArticles.filter(
    (article) => article !== mostRecentArticle && article.priorityRank === 1 && article.promoted && article.priority
  );

  const filteredArticles = sortedArticles.filter((article) => {
    if (filter === "All") return true;
    return article.relatedTo.includes(filter);
  });

  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row w-full mb-8">
        <div className="lg:w-2/3 pr-4">
          {mostRecentArticle && (
            <Link href={`/articles/${sanitizeTitleForURL(mostRecentArticle.title)}/${mostRecentArticle.customId}`}>
              <div className="p-4 bg-white rounded-md shadow-sm">
                <Image src={mostRecentArticle.cardImgUrl} height={5000} width={9000} className="w-full h-[500px]" alt={mostRecentArticle.title} />
                <h2 className="text-md mt-4">{trimText(mostRecentArticle.title, 89)}</h2>
                <h6 className="text-md font-normal f-row items-center gap-1 my-2 text-gray-400">
                  <CalendarDays size={13} strokeWidth={1.5} />
                  {formatDate(mostRecentArticle.publicationDate)}
                </h6>
                <h6 className="text-md font-normal text-slate-500">{trimText(mostRecentArticle.metaDesc, 210)}</h6>
              </div>
            </Link>
          )}
        </div>
        <div className="lg:w-1/3 border shadow-sm rounded-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-purple-800 flex  gap-1 uppercase">
            The Big Stories
            <Sparkles color="#ffb700" size={16} strokeWidth={1.5} />
          </h2>
          <div className="h-[600px] overflow-x-hidden overflow-y-scroll">
            {bigStoriesArticles.map((article, index) => (
              <Link key={index} href={`/articles/${sanitizeTitleForURL(article.title)}/${article.customId}`}>
                <BigStoriesCard article={article} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {articlesData.filter(article => article.relatedTo.includes("OTHER") && article.priorityRank === 1 && article.promoted && article.priority).length > 0 && (
        <div className="border border-orange-300 h-fit w-full bg-orange-50 my-10 p-4">
          <h2 className="text-xl font-semibold text-orange-300">Featured News</h2>
          <div className="flex f-col md:flex-row">
            {articlesData.filter(article => article.relatedTo.includes("OTHER") && article.priorityRank === 1 && article.promoted && article.priority).slice(0, 4).map((article, index) => (
              <Link key={index} href={`/articles/${sanitizeTitleForURL(article.title)}/${article.customId}`}>
                <div className={`my-4 ${index === 3 ? "border-b-0" : "border-b-[1px] md:border-b-0 md:border-r-[1px]"} p-4`}>
                  <h6 className="text-sm font-medium">{trimText(article.title, 75)}</h6>
                  <h6 className="text-xs font-normal text-gray-500 my-2">{trimText(article.metaDesc, 52)}</h6>
                  <h6 className="text-xs font-normal f-row items-center gap-1 mt-2 text-gray-400">
                    <CalendarDays size={13} strokeWidth={1.5} />
                    {formatDate(article.publicationDate)}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="mx-auto gap-2 mb-8 border bg-purple-800 md:rounded-3xl w-[349px] md:w-fit overflow-x-scroll whitespace-pre md:px-4 ">
        <Button variant="link" className={`text-white ${filter === "All" ? "underline" : ""}`} onClick={() => setFilter("All")}>All Articles</Button>
        <Button variant="link" className={`text-white ${filter === "COLLEGE" ? "underline" : ""}`} onClick={() => setFilter("COLLEGE")}>College Articles</Button>
        <Button variant="link" className={`text-white ${filter === "COURSE" ? "underline" : ""}`} onClick={() => setFilter("COURSE")}>Course Articles</Button>
        <Button variant="link" className={`text-white ${filter === "EXAM" ? "underline" : ""}`} onClick={() => setFilter("EXAM")}>Exam Articles</Button>
        <Button variant="link" className={`text-white ${filter === "OTHER" ? "underline" : ""}`} onClick={() => setFilter("OTHER")}>Latest News</Button>
      </div>
      <div className="f-between flex-wrap gap-7">
        {filteredArticles.length === 0 ? (
          <p className="uppercase text-red-400">No articles found for the {filter}.</p>
        ) : (
          <div className="f-between flex-wrap gap-7">
            {filteredArticles.map((article, index) => (
              <Link key={index} href={`/articles/${sanitizeTitleForURL(article.title)}/${article.customId}`}>
                <ArticleCard article={article} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
