"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { sanitizeTitleForURL } from "@/lib/utils";
import Link from "next/link";
import { GET_TAGS_HOME } from "@/graphql/query";
import Skeleton4x4 from "../Skeleton/Skeleton4x4";
import { motion } from "framer-motion";
import HomeTagCard from "./cards/HomeTagCard";

const Tags = () => {
  const { loading, error, data } = useQuery(GET_TAGS_HOME);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(
        Array.from(carousel.current.children).reduce(
          (acc, child) => acc + child.offsetWidth,
          0
        )
      );
    }
  }, [data]);

  const handleWheel = (event) => {
    if (carousel.current) {
      const delta = event.deltaY || event.detail || event.wheelDelta;
      const currentScrollLeft = carousel.current.scrollLeft;
      const maxScrollLeft = carousel.current.scrollWidth - carousel.current.clientWidth;
      let newScrollLeft = currentScrollLeft + delta;
      newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
      carousel.current.scrollLeft = newScrollLeft;
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (carousel.current) {
      carousel.current.addEventListener("wheel", handleWheel);
      return () => {
        if (carousel.current) {
          carousel.current.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [carousel]);

  if (loading)
    return (
      <div>
        <h2>Tags</h2>
        <div className="f-between flex-wrap gap-2">
          {Array.from({ length: 4 }).map((index) => [
            <Skeleton4x4 key={index} />,
          ])}
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const tags = data?.tags;

  if (!tags || tags.length === 0) {
    return null;
  }
  const filteredTags = tags.filter(tag => tag.priorityRank === 1 && tag.priorityBool);

  return (
    <div>
      <div className="f-between flex-row">
        <h1 className="my-8 text-3xl font-bold">Tags</h1>
        <Link href="/tags" className="text-sm font-normal">
          View More
        </Link>
      </div>
      <div ref={carousel} className="overflow-hidden w-80 sm:w-[480px] md:w-[680px] lg:w-full">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width || 0 }}
          className="flex gap-6"
        >
          {filteredTags.map((tag, index) => (
            <Link
              href={`/${sanitizeTitleForURL(tag.name)}/${tag.customId}`}
              key={index}
            >
              <HomeTagCard
                data={{
                  name: tag.name,
                  imageUrl: tag.cardImgUrl,
                  // collegesSet: tag.collegesSet,
                }}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tags;