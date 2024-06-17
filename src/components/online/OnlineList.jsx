"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_COLLEGES,
  GET_COURSES,
  GET_EXAMS,
  GET_UNIVERSITY,
} from "@/graphql/query";
import Link from "next/link";
import UniversityCard from "../home/cards/UniversityCard";
import { sanitizeTitleForURL } from "@/lib/utils";
import TopExamCard from "../home/cards/TopExamCard";
import TopCourseCard from "../home/cards/TopCourseCard";
import CollegeCard from "../home/cards/CollegeCard";

const OnlineList = () => {
  const {
    loading: loadingCourses,
    error: errorCourses,
    data: dataCourses,
  } = useQuery(GET_COURSES);
  const {
    loading: loadingExams,
    error: errorExams,
    data: dataExams,
  } = useQuery(GET_EXAMS);
  const {
    loading: loadingColleges,
    error: errorColleges,
    data: dataColleges,
  } = useQuery(GET_COLLEGES);
  const {
    loading: loadingUniversities,
    error: errorUniversities,
    data: dataUniversities,
  } = useQuery(GET_UNIVERSITY);

  if (loadingCourses || loadingExams || loadingColleges || loadingUniversities)
    return <p>Loading...</p>;
  if (errorCourses || errorExams || errorColleges || errorUniversities)
    return (
      <p>
        Error:
        {errorCourses?.message ||
          errorExams?.message ||
          errorColleges?.message ||
          errorUniversities?.message}
      </p>
    );

  const onlineData = {
    courses: dataCourses?.courses.filter((course) => course.priorityBool),
    exams: dataExams?.exams.filter((exam) => exam.priorityBool),
    colleges: dataColleges?.colleges.filter((college) => college.priorityBool),
    affiliatedUniversities: dataUniversities?.affiliatedUniversities.filter(
      (university) => university.priorityBool
    ),
  };

  return (
    <div>
      <div className="my-4">
        <h2>Courses</h2>
        <div className="f-between flex-wrap gap-2">
          {onlineData.courses.map((course, index) => (
            <div key={index}>
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
      <div className="my-4">
        <h2>Exams</h2>
        <div className="f-between flex-wrap gap-2">
          {onlineData.exams.map((exam, index) => (
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
      </div>
      <div className="my-4">
        <h2>Colleges</h2>
        <div className="f-between flex-wrap gap-2">
          {onlineData.colleges.map((clg, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-8">
              <Link
                href={`/colleges/${sanitizeTitleForURL(clg.name)}/${
                  clg.customId
                }`}
              >
                <CollegeCard
                  data={{
                    name: clg.name,
                    imageUrl: clg.cardImgUrl,
                    course: clg.Courses,
                    accreditation: clg.accreditation,
                    city: clg.city.name,
                    state: clg.state.name,
                    country: clg.country.name,
                    year: clg.foundedYear,
                    university: clg.affiliatedto?.[0]?.name || "",
                    avgFees: clg.tuitionFee,
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <h2>Universities</h2>
        <div className="f-between flex-wrap gap-2">
          {onlineData.affiliatedUniversities.map((university, index) => (
            <div key={index}>
              <Link
                href={`university/${sanitizeTitleForURL(university.name)}/${
                  university.customId
                }`}
              >
                <UniversityCard
                  data={{
                    name: university.name,
                    colleges: university.collegesSet,
                    imageUrl: university.cardImgUrl,
                    city: university.cityKey ? university.cityKey.name : "",
                    state: university.stateKey ? university.stateKey.name : "",
                    country: university.countryKey
                      ? university.countryKey.name
                      : "",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineList;
