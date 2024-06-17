"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "./cards/CourseCard";
import departmentsData from "@/static/department.json";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const HomeCourses = () => {
  const departments = departmentsData.department;
  const [isOpen, setIsOpen] = useState(false);
  const [initialCourseCount, setInitialCourseCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInitialCourseCount(13);
      } else {
        setInitialCourseCount(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="f-between flex-row">
          <div className="f-row gap-3">
            {departments.slice(0, initialCourseCount).map((department, index) => (
              <CourseCard key={index} department={department} />
            ))}
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="f-row gap-3">
            {departments.slice(initialCourseCount).map((department, index) => (
              <CourseCard key={index} department={department} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default HomeCourses;
