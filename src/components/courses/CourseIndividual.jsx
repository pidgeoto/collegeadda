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
import { sanitizeTitleForURL } from "@/lib/utils";
import TopExamCard from "../home/cards/TopExamCard";

const CourseIndividual = ({ course }) => {
  return (
    <div className="my-4">
      <div className="f-row lg:items-start w-full shadow-sm border gap-4 p-4 rounded-md">
        <div>
          <div className="h-60 w-60">
            <Image
              src="/ranking.svg"
              className="w-full object-fit"
              height={1000}
              width={1000}
              alt="exam icon"
            />
          </div>
        </div>
        <div className="w-3/4">
          <h2 className="font-medium text-lg">
            {course.courseName}
            {course.courseShortname &&
              course.courseShortname !== course.courseName &&
              ` (${course.courseShortname})`}
          </h2>
          <h6 className="text-sm py-2">{course.description}</h6>

          <div className="f-between-row">
            <h5 className="text-sm">Colleges</h5>
            <h5 className="text-sm">{course.colleges ? course.colleges.length + "+" : 0}</h5>
          </div>
          <div className="f-between-row">
            <h5 className="text-sm">Duration</h5>
            <h5 className="text-sm">{course.duration} yrs</h5>
          </div>

          <div className="f-between-row">
            <h5 className="text-sm">Specialization</h5>
            <h5 className="text-sm">
              {course.specialization ? course.specialization.length + "+" : 0}
            </h5>
          </div>
          <div className="f-between-row">
            <h5 className="text-sm">Department</h5>
            <h5 className="text-sm">{course.department}</h5>
          </div>
        </div>
      </div>
      <div>
        {course.specialization?.length > 0 && (
          <div className="f-row flex-wrap">
            {course.specialization?.map((spz, index) => (
              <div key={index}>
                <h6 className="p-2">{spz.name}</h6>
              </div>
            ))}
          </div>
        )}
      </div>
      {course.keyArticle?.content && (
        <div className="w-full shadow-sm border gap-4 p-4 rounded-md mt-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                More about {course?.courseName}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: course.keyArticle?.content,
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      {course.colleges?.length > 0 && (
        <>
          <h3 className="my-6">
            Colleges accepting {course.courseShortname}
          </h3>
          <div className="flex flex-wrap mt-4">
            {course.colleges.map((clg, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-4">
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
        </>
      )}
      {course.applicableExams?.length > 0 && (
        <>
          <h3 className="my-6">Colleges accepting {course.courseShortname} </h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {course.applicableExams.map((exam, index) => (
              <div key={index}>
                <Link
                  href={`/exams/${sanitizeTitleForURL(exam.examName)}/${
                    exam.customId
                  }`}
                >
                  <TopExamCard data={exam} />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseIndividual;
