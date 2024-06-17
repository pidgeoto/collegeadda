"use client";
import React, { useEffect, useState } from "react";
import client from "@/app/apollo";
import TagsCard from "../home/cards/TagsCard";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";
import { GET_TAGS_HOME } from "@/graphql/query";
import { SearchField } from "../ui/searchField";
import Image from "next/image";
import { useInView } from "framer-motion";

const CollegeByTag = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [tagsToShow, setTagsToShow] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: GET_TAGS_HOME,
      });
      setAllTags(data.tags);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allTags.filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered.sort((a, b) => {
      if (a.priorityBool && !b.priorityBool) {
        return -1;
      } else if (!a.priorityBool && b.priorityBool) {
        return 1;
      } else {
        return a.priorityRank - b.priorityRank;
      }
    });
    const priorityTags = filtered.filter((tag) => tag.priorityBool);
    const restTags = filtered.filter((tag) => !tag.priorityBool);
    restTags.sort((a, b) => a.priorityRank - b.priorityRank);
    const sortedTags = [...priorityTags, ...restTags];
    setTagsToShow(sortedTags.slice(0, 40));
  }, [allTags, searchQuery]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      const currentLength = tagsToShow.length;
      const nextTags = allTags.slice(currentLength, currentLength + 40);
      setTagsToShow([...tagsToShow, ...nextTags]);
    }
  }, [inView]);

  // const handleLoadMore = () => {
  //   const currentLength = tagsToShow.length;
  //   const nextTags = allTags.slice(currentLength, currentLength + 40);
  //   setTagsToShow([...tagsToShow, ...nextTags]);
  // };

  if (loading && !allTags.length) {
    return (
      <div className="flex flex-wrap">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <Skeleton4x4 />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Tags</h1>
        <div className="f-row gap-4">
          <SearchField
            placeholder="Search Tags here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[320px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-7">
        {tagsToShow.map((tag, index) => (
          <div key={tag.customId} className="tag">
            <Link href={`/${sanitizeTitleForURL(tag.name)}/${tag.customId}`}>
              <TagsCard
                data={{
                  name: tag.name,
                  imageUrl: tag.cardImgUrl,
                  tag: tag.customId,
                  index,
                }}
              />
            </Link>
          </div>
        ))}
      </div>
      {loading && (
        <div className="w-full text-center py-4">
          <Image
            src="/spinner.svg"
            height={1000}
            width={1000}
            alt="spinner"
            className="h-20 w-20"
          />
        </div>
      )}
      {!loading && allTags.length > tagsToShow.length && (
        // <div className="w-full text-center py-4">
        //   <button onClick={handleLoadMore}>
        //     <Image
        //       className="h-20 w-20"
        //       src="/spinner.svg"
        //       height={1000}
        //       width={1000}
        //       alt="spinner"
        //     />
        //   </button>
        // </div>
        <div className="w-full text-center py-4">
          <div ref={ref}>
            <Image
              src="/spinner.svg"
              height={1000}
              width={1000}
              alt="spinner"
              className="h-20 w-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeByTag;
