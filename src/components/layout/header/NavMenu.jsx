"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavUniversitySlider } from "./slider/NavUniversitySlider";
import {
  GET_COLLEGES,
  GET_COURSES,
  GET_EXAMS,
  GET_UNIVERSITY,
} from "@/graphql/query";
import { cn, sanitizeTitleForURL } from "@/lib/utils";

const menuStyles =
  "grid gap-3 h-[240px] overflow-x-hidden md:w-[400px] lg:w-[660px] lg:grid-cols-2";
const listItemStyles =
  "block select-none space-y-1 bg-slate-200 rounded-md p-2 mb-1 leading-none no-underline outline-none transition-colors hover:bg-gray-600 hover:text-white focus:bg-accent focus:text-accent-foreground";

const ListItem = React.forwardRef(({ className, title, ...props }, ref) => (
  <div>
    <NavigationMenuLink asChild>
      <Link ref={ref} className={cn(listItemStyles, className)} {...props}>
        <div className="text-sm font-medium leading-none">{title}</div>
      </Link>
    </NavigationMenuLink>
  </div>
));
ListItem.displayName = "ListItem";

const renderListItem = (title, href, description, index) => (
  <ListItem key={`${title}-${index}`} title={title} href={href}>
    {description}
  </ListItem>
);

export function NavMenu() {
  const {
    loading: collegesLoading,
    error: collegesError,
    data: collegesData,
  } = useQuery(GET_COLLEGES);
  const {
    loading: examsLoading,
    error: examsError,
    data: examsData,
  } = useQuery(GET_EXAMS);
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(GET_COURSES);
  const {
    loading: universityLoading,
    error: universityError,
    data: universityData,
  } = useQuery(GET_UNIVERSITY);

  if (collegesError || examsError || coursesError || universityError)
    return (
      <p>
        Error:
        {collegesError?.message ||
          examsError?.message ||
          coursesError?.message ||
          universityError?.message}
      </p>
    );

  const colleges =
    collegesData?.colleges.filter(
      (college) => college.priorityRank === 1 && college.priorityBool
    ) || [];
  const exams =
    examsData?.exams.filter(
      (exam) => exam.priorityRank === 1 && exam.priorityBool
    ) || [];
  const courses =
    coursesData?.courses.filter(
      (course) => course.priorityRank === 1 && course.priorityBool
    ) || [];
  const affiliatedUniversities =
    universityData?.affiliatedUniversities.filter(
      (university) => university.priorityRank === 1 && university.priorityBool
    ) || [];

  const universityMenu = (affiliatedUniversities) => (
    <div className={menuStyles}>
      <NavigationMenuLink asChild className="overflow-hidden">
        <NavUniversitySlider images={affiliatedUniversities.map(university => university.cardImgUrl)} />
      </NavigationMenuLink>
      <div className="m-2 overflow-y-scroll overflow-x-hidden">
      {universityLoading ? (
          Array.from(Array(6).keys()).map((index) => (
            <Skeleton key={index} className="h-8 mb-1" />
          ))
        ) : (affiliatedUniversities.map((university, index) =>
          renderListItem(
            university.name,
            `/university/${sanitizeTitleForURL(university.name)}/${
              university.customId
            }`,
            university.shortName,
            index
          )
        ))}
      </div>
    </div>
  );
  const collegeMenu = (colleges) => (
    <div className={menuStyles}>
      <NavigationMenuLink asChild>
        <NavUniversitySlider images={colleges.map(college => college.cardImgUrl)} />
      </NavigationMenuLink>
      <div className="m-2 overflow-y-scroll overflow-x-hidden">
        {collegesLoading ? (
          Array.from(Array(6).keys()).map((index) => (
            <Skeleton key={index} className="h-8 mb-1" />
          ))
        ) : (
          colleges.map((college, index) =>
            renderListItem(
              college.name,
              `/colleges/${sanitizeTitleForURL(college.name)}/${college.customId}`,
              college.shortName,
              index
            )
          )
        )}
      </div>
    </div>
  );
  
  const examMenu = (exams) => (
    <div className={menuStyles}>
      <NavigationMenuLink asChild>
        <NavUniversitySlider images={exams.map(exam => exam.cardImgUrl)} />
      </NavigationMenuLink>
      <div className="m-2 overflow-y-scroll overflow-x-hidden">
        {examsLoading ? (
          Array.from(Array(6).keys()).map((index) => (
            <Skeleton key={index} className="h-8 mb-1" />
          ))
        ) : (
          exams.map((exam, index) =>
            renderListItem(
              exam.examName,
              `/exams/${sanitizeTitleForURL(exam.examName)}/${exam.customId}`,
              exam.shortName,
              index
            )
          )
        )}
      </div>
    </div>
  );
  
  const courseMenu = (courses) => (
    <div className={menuStyles}>
      <NavigationMenuLink asChild>
        <NavUniversitySlider images={courses.map(course => course.cardImgUrl)} />
      </NavigationMenuLink>
      <div className="m-2 overflow-y-scroll overflow-x-hidden">
        {coursesLoading ? (
          Array.from(Array(6).keys()).map((index) => (
            <Skeleton key={index} className="h-8 mb-1" />
          ))
        ) : (
          courses.map((course, index) =>
            renderListItem(
              course.courseName,
              `/courses/${sanitizeTitleForURL(course.courseName)}/${course.customId}`,
              course.shortName,
              index
            )
          )
        )}
      </div>
    </div>
  );
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link href="/university" legacyBehavior passHref>
          <NavigationMenuItem>
            <NavigationMenuTrigger>University</NavigationMenuTrigger>
            <NavigationMenuContent>
              {universityMenu(affiliatedUniversities)}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </Link>
        <NavigationMenuList>
          <Link href="/colleges" legacyBehavior passHref>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Colleges</NavigationMenuTrigger>
              <NavigationMenuContent>
                {collegeMenu(colleges)}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </Link>
        </NavigationMenuList>

        <Link href="/exams" legacyBehavior passHref>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Exams</NavigationMenuTrigger>
            <NavigationMenuContent>{examMenu(exams)}</NavigationMenuContent>
          </NavigationMenuItem>
        </Link>

        <Link href="/courses" legacyBehavior passHref>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>{courseMenu(courses)}</NavigationMenuContent>
          </NavigationMenuItem>
        </Link>

        <NavigationMenuItem>
          <Link href="/articles" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Articles
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
