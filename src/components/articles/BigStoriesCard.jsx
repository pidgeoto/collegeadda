import { formatDate, trimText } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";

const BigStoriesCard = ({article}) => {
  return (
    <div className="flex w-full gap-4 border-b-2 p-4">
      <div className="w-40 f-center">
        <Image
          src={article.cardImgUrl}
          height={1000}
          width={1000}
          alt={article.title}
        />
      </div>
      <div>
        <h3 className="text-sm w-64">{trimText(article.title, 53)}</h3>
        <h6 className="text-xs font-normal text-gray-500 my-1">
          {trimText(article.metaDesc, 58)}
        </h6>
        <h6 className="text-xs font-normal f-row items-center gap-1 text-gray-500">
          <CalendarDays size={13} strokeWidth={1.5} />
          {formatDate(article.publicationDate)}
        </h6>
      </div>
    </div>
  );
};

export default BigStoriesCard;
