"use client";
import React from "react";
import Image from "next/image";
import { CalendarDays, CircleUserRound } from "lucide-react";
import { formatDate, sanitizeTitleForURL } from "@/lib/utils";
import { MotionDiv } from "../MotionDiv";
import Link from "next/link";
import BigStoriesCard from "./BigStoriesCard";
import { useScroll } from "framer-motion";

const ArticleIndividual = ({ article, relatedArticles }) => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="relative">
      <MotionDiv
        className="fixed bottom-1 right-0 left-0 h-1 bg-purple-900 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="w-full flex gap-2">
        <div className="lg:w-2/3 my-8">
          <Image
            src={article.cardImgUrl}
            height={5000}
            width={9000}
            className="w-full h-[470px]"
            alt={article.title}
          />
          <h1 className="font-semibold text-slate-700 mt-4">{article.title}</h1>
          <div className="f-between my-2">
            <p className="text-md font-normal f-row items-center gap-2 text-gray-500">
              <CalendarDays size={18} strokeWidth={1.5} />
              {formatDate(article.publicationDate)}
            </p>
            <p className="text-md font-normal f-row items-center gap-1 text-gray-500">
              <CircleUserRound size={18} strokeWidth={1.5} />
              {article.authorName}
            </p>
          </div>

          {/* <h2 className="font-semibold text-slate-700 mt-4" dangerouslySetInnerHTML={{ __html: article.introTitle }} /> */}
          <div
            className="text-md font-normal text-slate-600 mt-6"
            dangerouslySetInnerHTML={{ __html: article.introContent }}
          />
          <article
            className="text-md font-normal text-slate-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div
            className="font-semibold text-slate-700 my-2"
            dangerouslySetInnerHTML={{ __html: article.conclusionTitle }}
          />
          <div
            className="text-md font-normal text-slate-600"
            dangerouslySetInnerHTML={{ __html: article.conclusionContent }}
          />
        </div>
        <div className="lg:w-1/3 h-[780px] border  shadow-sm rounded-md p-4 bg-white my-8">
          <h2 className="text-lg font-semibold text-purple-800">
            Related Articles
          </h2>
          <div className="h-[700px] overflow-x-hidden overflow-y-scroll">
            {relatedArticles.map((relatedArticle) => (
              <div key={relatedArticle.customId}>
                <Link
                  href={`/articles/${sanitizeTitleForURL(
                    relatedArticle.title
                  )}/${relatedArticle.customId}`}
                >
                  <BigStoriesCard article={relatedArticle} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleIndividual;
