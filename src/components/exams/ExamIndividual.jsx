import { formatDate, sanitizeTitleForURL } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CollegeCard from "../home/cards/CollegeCard";
import Link from "next/link";
import TopCourseCard from "../home/cards/TopCourseCard";

const ExamIndividual = ({ exam }) => {
  return (
    <div className="my-4">
      <div className="f-row w-full shadow-sm border gap-4 p-4 rounded-md">
        <div>
          <div className="h-60 w-60">
            <Image
              // src="/examIco.svg"
              src={exam.cardImgUrl}
              className="w-full object-fit"
              height={1000}
              width={1000}
              alt="exam icon"
            />
          </div>
        </div>
        <div className="w-3/4">
          <h4 className="text-xl font-semibold mb-2">
            {exam.examName}({exam.examShortname})
          </h4>
          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Exam Level</h5>
            </div>
            <h6 className="text-sm">{exam.levelOfExam}</h6>
          </div>
          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Application Starts</h5>
            </div>
            <h6 className="text-sm">{formatDate(exam.applicationStartDate)}</h6>
          </div>
          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Exam Date</h5>
            </div>
            <h6 className="text-sm">{formatDate(exam.examDate)}</h6>
          </div>
          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Exam Duration</h5>
            </div>
            <h6 className="text-sm">{exam.examDuration} min</h6>
          </div>

          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Participating Colleges</h5>
            </div>
            <h6 className="text-sm">
              {exam.colleges ? exam.colleges.length + "+" : 0}
            </h6>
          </div>
          <div className="f-between-row mb-1">
            <div>
              <h5 className="text-gray-400">Exam Centers</h5>
            </div>
            <h6 className="text-sm">
              {exam.examCenterCity ? exam.examCenterCity.length + "+" : 0}
            </h6>
          </div>
        </div>
      </div>
      {exam.keyArticle?.content && (
        <div className="w-full shadow-sm border gap-4 p-4 rounded-md mt-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                More about {exam?.examName}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{ __html: exam.keyArticle?.content }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      <h3 className="my-6">Colleges accepting {exam.examShortname} score</h3>
      <div className="flex flex-wrap mt-4">
        {exam.colleges?.map((clg, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-1 mb-4">
            <Link
              href={`/colleges/${sanitizeTitleForURL(clg.name)}/${
                clg.customId
              }`}
            >
              <CollegeCard
                data={{
                  name: clg.name,
                  course: clg.Courses,
                  imageUrl: clg.cardImgUrl,
                  accreditation: clg.accreditation,
                  city: clg.city ? clg.city.name : "",
                  state: clg.state ? clg.state.name : "",
                  country: clg.country ? clg.country.name : "",
                  year: clg.foundedYear,
                  university: clg.affiliatedto?.[0]?.name || "",
                  avgFees: clg.tuitionFee,
                  // tags: clg.tags?.[0]?.name || "",
                }}
              />
            </Link>
          </div>
        ))}
      </div>
      <h3 className="my-6">Course Available</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {exam.courses?.map((course, index) => (
          <div key={index} className="mb-4">
            <Link
              href={`/courses/${sanitizeTitleForURL(course.courseName)}/${
                course.customId
              }`}
            >
              <TopCourseCard data={course} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamIndividual;
