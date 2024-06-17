import { formatDate, trimText } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="p-2 bg-white rounded-md border shadow-md w-80 min-h-80  overflow-hidden relative">
      <Image
        src={article.cardImgUrl}
        height={500}
        width={500}
        alt={article.title}
        className="w-ful rounded-md max-h-48 object-cover"
      />
      <div className="mt-3">
        <h6 className="text-sm font-semibold">{trimText(article.title, 75)}</h6>
        <div className="absolute bottom-4">
          <h6 className="text-xs font-normal text-gray-500 my-1">
            {trimText(article.metaDesc, 88)}
          </h6>
          <h6 className="text-xs font-normal f-row items-center gap-1 text-gray-400">
            <CalendarDays size={13} strokeWidth={1.5} />
            {formatDate(article.publicationDate)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
